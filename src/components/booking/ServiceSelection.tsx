import { services } from '@/config/siteConfig';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, DollarSign } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface ServiceSelectionProps {
  onSelectService: (serviceId: string) => void;
  selectedServiceId?: string;
}

export const ServiceSelection = ({ onSelectService, selectedServiceId }: ServiceSelectionProps) => {
  const { translations } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {translations.booking.serviceSelection.title}
        </h2>
        <p className="text-gray-600">
          {translations.booking.serviceSelection.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services
          .filter((s) => s.priceEUR && s.priceEUR > 0)
          .map((service) => (
            <Card
              key={service.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedServiceId === service.id
                  ? 'ring-2 ring-[#e6d7ff] border-[#e6d7ff]'
                  : 'hover:border-[#e6d7ff]'
              }`}
              onClick={() => onSelectService(service.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <span>{service.title}</span>
                  <span className="text-[#9b7fd4] text-xl font-bold flex items-center gap-1">
                    ${service.priceEUR}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  {service.durationMin} {translations.booking.minutes}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">{service.description}</p>
                <Button
                  className="w-full"
                  variant={selectedServiceId === service.id ? 'default' : 'outline'}
                >
                  {selectedServiceId === service.id 
                    ? translations.booking.serviceSelection.selected 
                    : translations.booking.serviceSelection.select}
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};
