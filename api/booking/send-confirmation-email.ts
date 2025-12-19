import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, serviceTitle, date, time, bookingId, price } = req.body;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899 0%, #f472b6 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #ffffff; padding: 30px 20px; border: 1px solid #e5e7eb; }
            .booking-details { background: #fef3f8; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #fce7f3; }
            .detail-label { font-weight: 600; color: #831843; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6b7280; }
            .button { display: inline-block; background: #ec4899; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">✨ ¡Cita Confirmada!</h1>
            </div>
            
            <div class="content">
              <p>Hola <strong>${firstName}</strong>,</p>
              
              <p>Tu cita ha sido confirmada exitosamente. Aquí están los detalles:</p>
              
              <div class="booking-details">
                <div class="detail-row">
                  <span class="detail-label">📋 Booking ID:</span>
                  <span>${bookingId}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">💅 Servicio:</span>
                  <span>${serviceTitle}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">📅 Fecha:</span>
                  <span>${date}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">🕐 Hora:</span>
                  <span>${time}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">📍 Ubicación:</span>
                  <span>Vanyti Center Beauty - Centro</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">💰 Precio:</span>
                  <span><strong>${price}€</strong></span>
                </div>
              </div>
              
              <p><strong>💳 Pago:</strong> Se realizará en el salón después del servicio (0€ hoy).</p>
              
              <p><strong>📍 Dirección:</strong><br>
              Calle Olof Palme, esquina, Pl. Musico Diaz Cano, 8<br>
              30009 Murcia, Spain</p>
              
              <p style="margin-top: 30px;">Si necesitas cambiar o cancelar tu cita, contáctanos:</p>
              <p>📱 <strong>+34 663 491 339</strong><br>
              📧 <strong>comercial@byvanyti.com</strong></p>
              
              <p>¡Esperamos verte pronto! 💖</p>
            </div>
            
            <div class="footer">
              <p><strong>Vanyti Center Beauty</strong></p>
              <p>Tu centro de estética de confianza en Murcia</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Vanyti Center Beauty <no-reply@zenithwebcraft.com>',
      to: [email],
      subject: `✨ Cita Confirmada - ${serviceTitle} | ${bookingId}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Error sending email:', error);
      return res.status(400).json({ success: false, error });
    }

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
