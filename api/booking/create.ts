import { google } from 'googleapis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const calendar = google.calendar('v3');

const getCalendarClient = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL not configured');
  }
  
  if (!privateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY not configured');
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return { calendar, auth };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📝 Received booking request:', JSON.stringify(req.body, null, 2));

    const { serviceId, serviceTitle, dateTime, duration, email, phone, firstName, lastName } = req.body;

    // Validaciones
    if (!serviceId || !dateTime || !email || !phone || !firstName || !lastName) {
      console.error('❌ Missing required fields');
      return res.status(400).json({ 
        success: false,
        error: { code: 'MISSING_FIELDS', message: 'All fields are required' } 
      });
    }

    console.log('✅ Validation passed, initializing Google Calendar client...');

    const { auth } = getCalendarClient();

    console.log('✅ Google Calendar client initialized');

    // Calcular end time
    const startTime = new Date(dateTime);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    console.log(`📅 Booking time: ${startTime.toISOString()} to ${endTime.toISOString()}`);

    // Re-check availability (anti double-booking)
    console.log('🔍 Checking availability...');
    const freeBusyResponse = await calendar.freebusy.query({
      auth,
      requestBody: {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        items: [{ id: process.env.GOOGLE_CALENDAR_POOL_ID }],
      },
    });

    const busySlots = freeBusyResponse.data.calendars?.[process.env.GOOGLE_CALENDAR_POOL_ID!]?.busy || [];

    if (busySlots.length > 0) {
      console.warn('⚠️ Slot no longer available:', busySlots);
      return res.status(409).json({
        success: false,
        error: {
          code: 'SLOT_NO_LONGER_AVAILABLE',
          message: 'This time slot was just booked by someone else. Please select another time.',
        },
      });
    }

    console.log('✅ Slot is available, creating event...');

    // Crear evento en Google Calendar
    const event = await calendar.events.insert({
      auth,
      calendarId: process.env.GOOGLE_CALENDAR_POOL_ID?.trim(),
      requestBody: {
        summary: `${serviceTitle} – ${firstName} ${lastName}`,
        description: `📧 Email: ${email}\n📱 Tel: ${phone}\n\n🎯 Servicio: ${serviceTitle}\n💰 Cliente: ${firstName} ${lastName}`,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'Europe/Madrid',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'Europe/Madrid',
        },
        transparency: 'opaque', // Bloquea el slot
      },
    });

    const bookingId = `VNY-${Date.now().toString().slice(-8)}`;

    // Enviar email de confirmación
    try {
    const emailDate = new Date(startTime).toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    const emailTime = new Date(startTime).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });

    await fetch(`${process.env.VITE_APP_URL || ''}/api/booking/send-confirmation-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        email,
        firstName,
        lastName,
        serviceTitle,
        date: emailDate,
        time: emailTime,
        bookingId,
        price: req.body.price || '0',
        }),
    });
    
    console.log('✅ Confirmation email sent');
    } catch (emailError) {
    console.error('⚠️ Email sending failed (non-critical):', emailError);
    // No fallar el booking si el email falla
    }
    console.log('✅ Event created successfully:', event.data.id);

    return res.status(200).json({
      success: true,
      data: {
        bookingId,
        eventId: event.data.id,
        message: 'Booking created successfully',
      },
    });
  } catch (error: any) {
    console.error('❌ Error creating booking:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errors: error.errors,
    });
    
    return res.status(500).json({
      success: false,
      error: {
        code: 'BOOKING_ERROR',
        message: error.message || 'Failed to create booking',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
    });
  }
}
