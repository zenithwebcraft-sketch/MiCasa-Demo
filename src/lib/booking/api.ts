import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface CreateBookingParams {
  serviceId: string;
  serviceTitle: string;
  dateTime: string;
  duration: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  price: number;
}

export interface BookingResponse {
  success: boolean;
  bookingId?: string;
  eventLink?: string;
  error?: { message: string };
}

export async function createBooking(params: CreateBookingParams): Promise<BookingResponse> {
  try {
    // 1. Guardar en Firestore
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...params,
      status: 'confirmed',
      createdAt: serverTimestamp(),
    });

    // 2. Llamar serverless function (Google Calendar + Emails)
    const response = await fetch('/api/booking/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...params,
        bookingId: docRef.id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Error al procesar la reserva');
    }

    return {
      success: true,
      bookingId: docRef.id,
      eventLink: data.eventLink,
    };

  } catch (error: any) {
    console.error('Error creating booking:', error);
    return {
      success: false,
      error: { message: error.message },
    };
  }
}
