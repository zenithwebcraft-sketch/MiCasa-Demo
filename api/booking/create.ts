import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:8080/auth/google/callback'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    bookingId,
    serviceTitle,
    dateTime,
    duration,
    email,
    phone,
    firstName,
    lastName,
    price,
  } = req.body;

  try {
    const startTime = new Date(dateTime);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // ── 1. Google Calendar Event ──────────────────────────────
    const event = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: {
        summary: `📋 ${serviceTitle} — ${firstName} ${lastName}`,
        description: [
          `🆔 Booking ID: ${bookingId}`,
          `📌 Service: ${serviceTitle}`,
          `👤 Client: ${firstName} ${lastName}`,
          `📧 Email: ${email}`,
          `📱 Phone: ${phone}`,
          `💵 Consultation Fee: $${price}`,
          ``,
          `📍 MiCasa MultiService, LLC`,
          `204 N Park Ave, Suites 100-102`,
          `Sanford, FL 32771`,
          `📞 +1 (757) 773-9271`,
        ].join('\n'),
        location: '204 N Park Ave Suites 100-102, Sanford, FL 32771',
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'America/New_York',
        },
        attendees: [{ email }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 },
          ],
        },
        colorId: '7', // Turquoise/Peacock color in Google Calendar
      },
    });

// ── 2. Email to Client ────────────────────────────────────
await resend.emails.send({
  from: 'MiCasa MultiService <onboarding@resend.dev>',
  to: process.env.BUSINESS_EMAIL!, // ← Temporal: siempre al email de testing
  subject: `✅ [CLIENT COPY] Appointment Confirmed — ${serviceTitle}`,
  html: clientEmailHTML({
    firstName,
    serviceTitle,
    startTime,
    duration,
    price,
    bookingId,
  }),
});

// ── 3. Email to MiCasa Office ─────────────────────────────
await resend.emails.send({
  from: 'MiCasa Booking System <onboarding@resend.dev>',
  to: process.env.BUSINESS_EMAIL!,
  subject: `🆕 [OFFICE COPY] New Appointment: ${serviceTitle} — ${firstName} ${lastName}`,
  html: officeEmailHTML({
    firstName,
    lastName,
    email,
    phone,
    serviceTitle,
    startTime,
    duration,
    price,
    bookingId,
  }),
});


    return res.status(200).json({
      success: true,
      eventId: event.data.id,
      eventLink: event.data.htmlLink,
    });

  } catch (error: any) {
    console.error('Booking creation error:', error);
    return res.status(500).json({
      success: false,
      error: { message: error.message },
    });
  }
}

// ── Email Templates ───────────────────────────────────────────

function formatDateTime(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/New_York',
    timeZoneName: 'short',
  });
}

function clientEmailHTML({ firstName, serviceTitle, startTime, duration, price, bookingId }: any) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background:#f5f5f5; margin:0; padding:20px;">
  <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:#1BBED7; padding:30px; text-align:center;">
      <h1 style="color:white; margin:0; font-size:24px;">✅ Appointment Confirmed!</h1>
      <p style="color:rgba(255,255,255,0.9); margin:8px 0 0;">MiCasa MultiService, LLC</p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">
      <p style="font-size:16px; color:#333;">Hello <strong>${firstName}</strong>,</p>
      <p style="color:#555;">Your appointment has been successfully scheduled. Here are the details:</p>

      <!-- Appointment Card -->
      <div style="background:#f0fbfd; border-left:4px solid #1BBED7; border-radius:6px; padding:20px; margin:20px 0;">
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0; color:#666; width:40%;">📋 Service</td>
            <td style="padding:8px 0; color:#333; font-weight:bold;">${serviceTitle}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#666;">📅 Date & Time</td>
            <td style="padding:8px 0; color:#333; font-weight:bold;">${formatDateTime(startTime)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#666;">⏱️ Duration</td>
            <td style="padding:8px 0; color:#333;">${duration} minutes</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#666;">💵 Fee</td>
            <td style="padding:8px 0; color:#333;">$${price} (pay at office)</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#666;">🆔 Booking ID</td>
            <td style="padding:8px 0; color:#999; font-size:12px;">${bookingId}</td>
          </tr>
        </table>
      </div>

      <!-- Location -->
      <div style="background:#f9f9f9; border-radius:6px; padding:20px; margin:20px 0;">
        <h3 style="color:#1BBED7; margin:0 0 10px;">📍 Our Location</h3>
        <p style="margin:0; color:#555;">MiCasa MultiService, LLC<br>
        204 N Park Ave, Suites 100-102<br>
        Sanford, FL 32771<br>
        📞 +1 (757) 773-9271</p>
      </div>

      <!-- Cancellation Policy -->
      <div style="background:#fff8e6; border-radius:6px; padding:15px; margin:20px 0;">
        <p style="margin:0; color:#856404; font-size:14px;">
          ⚠️ <strong>Cancellation Policy:</strong> If you need to reschedule or cancel, 
          please contact us at least 24 hours in advance.
        </p>
      </div>

      <p style="color:#555;">We look forward to seeing you!</p>
      <p style="color:#555;">— The MiCasa MultiService Team</p>
    </div>

    <!-- Footer -->
    <div style="background:#f5f5f5; padding:20px; text-align:center; border-top:1px solid #eee;">
      <p style="margin:0; color:#999; font-size:12px;">
        MiCasa MultiService, LLC | 204 N Park Ave | Sanford, FL 32771<br>
        <a href="http://micasaworks4u.com" style="color:#1BBED7;">micasaworks4u.com</a> | 
        +1 (757) 773-9271
      </p>
    </div>
  </div>
</body>
</html>`;
}

function officeEmailHTML({ firstName, lastName, email, phone, serviceTitle, startTime, duration, price, bookingId }: any) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; background:#f5f5f5; margin:0; padding:20px;">
  <div style="max-width:600px; margin:0 auto; background:white; border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background:#1BBED7; padding:30px; text-align:center;">
      <h1 style="color:white; margin:0; font-size:24px;">🆕 New Appointment Booked</h1>
      <p style="color:rgba(255,255,255,0.9); margin:8px 0 0;">MiCasa Booking System</p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">
      <p style="font-size:16px; color:#333;">A new appointment has been scheduled:</p>

      <!-- Appointment Details -->
      <div style="background:#f0fbfd; border-left:4px solid #1BBED7; border-radius:6px; padding:20px; margin:20px 0;">
        <h3 style="color:#1BBED7; margin:0 0 15px;">📋 Appointment Details</h3>
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="padding:8px 0; color:#666; width:40%;">Service</td>
            <td style="padding:8px 0; color:#333; font-weight:bold;">${serviceTitle}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#666;">Date & Time</td>
            <td style="padding:8px 0; color:#333; font-weight:bold;">${formatDateTime(startTime)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#666;">Duration</td>
            <td style="padding:8px 0; color:#333;">${duration} minutes</td>
          </tr>
          <tr>
            <td style="padding:8px 0; color:#333; font-weight:bold;">Fee</td>
            <td style="padding:8px 0; color:#1BBED7; font-weight:bold; font-size:18px;">$${price}</td>
          </tr>
        </table>
      </div>

      <!-- Client Details -->
      <div style="background:#f9f9f9; border-radius:6px; padding:20px; margin:20px 0;">
        <h3 style="color:#333; margin:0 0 15px;">👤 Client Information</h3>
        <table style="width:100%; border-collapse:collapse;">
          <tr>
            <td style="padding:6px 0; color:#666; width:40%;">Name</td>
            <td style="padding:6px 0; color:#333; font-weight:bold;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding:6px 0; color:#666;">Email</td>
            <td style="padding:6px 0; color:#333;">${email}</td>
          </tr>
          <tr>
            <td style="padding:6px 0; color:#666;">Phone</td>
            <td style="padding:6px 0; color:#333;">${phone}</td>
          </tr>
        </table>
      </div>

      <!-- Booking ID -->
      <p style="color:#999; font-size:12px; text-align:center;">Booking ID: ${bookingId}</p>
    </div>

    <!-- Footer -->
    <div style="background:#f5f5f5; padding:20px; text-align:center; border-top:1px solid #eee;">
      <p style="margin:0; color:#999; font-size:12px;">MiCasa Booking System — Automated Notification</p>
    </div>
  </div>
</body>
</html>`;
}
