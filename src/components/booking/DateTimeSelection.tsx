import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { generateTimeSlots } from '@/lib/booking/dateUtils';
import { fetchAvailability } from '@/lib/booking/api';
import { Clock, Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface DateTimeSelectionProps {
  onSelectDateTime: (date: string, time: string) => void;
  selectedDate?: string;
  selectedTime?: string;
  serviceDuration: number;
  serviceId: string;
}

export const DateTimeSelection = ({
  onSelectDateTime,
  selectedDate,
  selectedTime,
  serviceDuration,
  serviceId,
}: DateTimeSelectionProps) => {
  const { translations, language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dateStr = date ? format(date, 'yyyy-MM-dd') : '';
  const timeSlots = dateStr ? generateTimeSlots(dateStr) : [];
  const locale = language === 'es' ? es : enUS;

  useEffect(() => {
    if (!dateStr) {
      setSlots([]);
      return;
    }

    const loadAvailability = async () => {
      setLoading(true);
      setError('');
      try {
        const availability = await fetchAvailability(dateStr, serviceId, serviceDuration);
        setSlots(availability.slots || []);
      } catch (err: any) {
        console.error('Error loading availability:', err);
        setError(translations.booking.dateTime.error);
        setSlots([]);
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, [dateStr, serviceId, serviceDuration, translations.booking.dateTime.error]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handleTimeSelect = (time: string) => {
    if (dateStr) {
      onSelectDateTime(dateStr, time);
    }
  };

  const isTimeSlotAvailable = (time: string): boolean => {
    if (!dateStr || slots.length === 0) return true;
    const slot = slots.find(s => s.time === time);
    return slot ? slot.available : true;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {translations.booking.dateTime.title}
        </h2>
        <p className="text-gray-600">
          {translations.booking.dateTime.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {translations.booking.dateTime.selectDate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const day = date.getDay();
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return day === 0 || date < today;
              }}
              className="rounded-md border"
              locale={locale}
            />
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader>
            <CardTitle>{translations.booking.dateTime.availableSlots}</CardTitle>
            {dateStr && (
              <p className="text-sm text-gray-600">
                {format(date!, "EEEE, d 'de' MMMM", { locale })}
              </p>
            )}
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            {!dateStr ? (
              <p className="text-center text-gray-500 py-8">
                {translations.booking.dateTime.noDateSelected}
              </p>
            ) : loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2">{translations.booking.dateTime.loading}</span>
              </div>
            ) : error ? (
              <div className="text-center py-8 space-y-4">
                <p className="text-red-600">{error}</p>
                <Button onClick={() => setDate(new Date(date!))} variant="outline" size="sm">
                  {translations.booking.dateTime.retry}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => {
                  const available = isTimeSlotAvailable(time);
                  return (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => available && handleTimeSelect(time)}
                      disabled={!available}
                    >
                      {time}
                      {!available && ' 🚫'}
                    </Button>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
