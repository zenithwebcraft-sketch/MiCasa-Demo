import { google } from 'googleapis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const calendar = google.calendar('v3');

// Inicializar cliente de Google Calendar
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, serviceId } = req.query;

    console.log('📅 Availability request:', { date, serviceId });

    if (!date || typeof date !== 'string') {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    // Construir rango de tiempo (todo el día seleccionado)
    const timeMin = new Date(`${date}T00:00:00+01:00`).toISOString();
    const timeMax = new Date(`${date}T23:59:59+01:00`).toISOString();

    console.log('🔍 Fetching availability from Google Calendar...');
    console.log('Calendar ID:', process.env.GOOGLE_CALENDAR_POOL_ID);

    const { auth } = getCalendarClient();

    // Obtener slots ocupados usando freebusy
    const freeBusyResponse = await calendar.freebusy.query({
      auth,
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: process.env.GOOGLE_CALENDAR_POOL_ID }],
      },
    });

    const busySlots = freeBusyResponse.data.calendars?.[process.env.GOOGLE_CALENDAR_POOL_ID!]?.busy || [];

    console.log('✅ Busy slots found:', busySlots.length);

    return res.status(200).json({
      success: true,
      data: {
        date,
        busyTimes: busySlots.map((slot) => ({
          start: slot.start,
          end: slot.end,
        })),
      },
    });
  } catch (error: any) {
    console.error('❌ Error fetching availability:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errors: error.errors,
    });
    
    return res.status(500).json({
      success: false,
      error: {
        code: 'AVAILABILITY_ERROR',
        message: error.message || 'Failed to fetch availability',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
    });
  }
}
