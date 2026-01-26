import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Calendar, Clock, MapPin, User, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import businessData from '@/config/business.json';


interface BookingConfirmationProps {
  bookingData: {
    service: {
      title: string;
      priceEUR: number;
      durationMin: number;
    };
    date: string;
    time: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
  onBookAnother: () => void;
}

export const BookingConfirmation = ({ bookingData, onBookAnother }: BookingConfirmationProps) => {
  const bookingId = `VNY-${Date.now().toString().slice(-8)}`;
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Cita Confirmada!
        </h2>
        <p className="text-gray-600">
          Hemos enviado un email de confirmación a <strong>{bookingData.email}</strong>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Booking ID: <span className="font-mono font-semibold">{bookingId}</span>
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 space-y-6">
          {/* Service */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <Calendar className="h-6 w-6 text-pink-600 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Servicio</p>
              <p className="text-xl font-semibold">{bookingData.service.title}</p>
              <p className="text-sm text-gray-500">{bookingData.service.durationMin} minutos</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-pink-600">
                {bookingData.service.priceEUR}€
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <Clock className="h-6 w-6 text-pink-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Fecha y hora</p>
              <p className="text-lg font-semibold">
                {format(new Date(bookingData.date), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
              </p>
              <p className="text-gray-700">{bookingData.time}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <MapPin className="h-6 w-6 text-pink-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Ubicación</p>
              <p className="text-lg font-semibold">{businessData.business.name} - {businessData.business.locations[0].name}</p>
              <p className="text-sm text-gray-700">Calle Olof Palme, esquina, Pl. Musico Diaz Cano, 8</p>
              <p className="text-sm text-gray-600">30009 Murcia, Spain</p>
            </div>
          </div>

          {/* Stylist */}
          <div className="flex items-start gap-4 pb-4 border-b">
            <User className="h-6 w-6 text-pink-600 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Estilista</p>
              <p className="text-lg font-semibold">No Preference</p>
              <p className="text-sm text-gray-500">Se te asignará el mejor disponible</p>
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Cliente</p>
                <p className="font-medium">{bookingData.firstName} {bookingData.lastName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{bookingData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-medium">{bookingData.phone}</p>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-pink-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">{bookingData.service.priceEUR}€</span>
            </div>
            <div className="flex justify-between items-center text-lg font-bold border-t border-pink-200 pt-2">
              <span>Total</span>
              <span className="text-pink-600">{bookingData.service.priceEUR}€</span>
            </div>
            <div className="text-center pt-2 border-t border-pink-200">
              <p className="text-sm font-medium text-pink-900">💳 Charged today: 0€</p>
              <p className="text-xs text-pink-800 mt-1">
                Pago en el salón después del servicio
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <Button onClick={onBookAnother} size="lg" className="px-8">
          Reservar otra cita
        </Button>
        <p className="text-sm text-gray-500">
          ¿Necesitas cambiar tu cita? Contáctanos al +34 663 491 339
        </p>
      </div>
    </div>
  );
};
