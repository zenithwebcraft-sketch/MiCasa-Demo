import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useBookingFlow } from "@/lib/booking/useBookingFlow";
import { ServiceSelection } from "@/components/booking/ServiceSelection";
import { DateTimeSelection } from "@/components/booking/DateTimeSelection";
import { EmailCapture } from "@/components/booking/EmailCapture";
import { PersonalDetailsForm } from "@/components/booking/PersonalDetailsForm";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";
import { useState } from 'react';
import { createBooking } from '@/lib/booking/api';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Booking = () => {
  const { currentStep, formData, service, updateFormData, nextStep, previousStep, reset } = useBookingFlow();
  const { translations, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleServiceSelect = (serviceId: string) => {
    updateFormData({ serviceId });
    nextStep();
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    updateFormData({ date, time });
    nextStep();
  };

  const handleEmailSubmit = (email: string) => {
    updateFormData({ email });
    nextStep();
  };

  const handlePersonalDetailsSubmit = async (data: { phone: string; firstName: string; lastName: string }) => {
    if (!service || !formData.date || !formData.time || !formData.email) {
      toast({
        title: translations.booking.messages.error,
        description: translations.booking.messages.missingData,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const dateTime = `${formData.date}T${formData.time}:00+01:00`;

      const response = await createBooking({
        serviceId: service.id,
        serviceTitle: service.title,
        dateTime,
        duration: service.durationMin,
        email: formData.email,
        phone: data.phone,
        firstName: data.firstName,
        lastName: data.lastName,
        price: service.priceEUR,
      });

      if (response.success) {
        updateFormData(data);
        nextStep();
        
        toast({
          title: translations.booking.messages.confirmed,
          description: translations.booking.messages.confirmedDesc,
        });
      } else {
        throw new Error(response.error?.message || 'Error desconocido');
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      
      if (error.message.includes('SLOT_NO_LONGER_AVAILABLE')) {
        toast({
          title: translations.booking.messages.slotUnavailable,
          description: translations.booking.messages.slotUnavailableDesc,
          variant: "destructive",
        });
        updateFormData({ date: undefined, time: undefined });
        previousStep();
        previousStep();
      } else {
        toast({
          title: translations.booking.messages.bookingError,
          description: error.message || translations.booking.messages.bookingErrorDesc,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepNumber = () => {
    const stepMap = {
      service: 1,
      datetime: 2,
      email: 3,
      details: 4,
      confirmation: 5,
    };
    return stepMap[currentStep];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {translations.booking.navigation.backHome}
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {translations.booking.title}
            </h1>
            {currentStep !== 'confirmation' && (
              <p className="text-sm text-gray-600 mt-1">
                {translations.booking.stepper.step} {getStepNumber()} {translations.booking.stepper.of} 4
              </p>
            )}
          </div>
          <div className="w-32" />
        </div>

        {/* Progress bar */}
        {currentStep !== 'confirmation' && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'service' ? 'bg-primary text-white' : 
                  formData.serviceId ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-500'
                }`}>

                  1
                </div>
                <span className="text-sm font-medium hidden sm:inline">{translations.booking.stepper.service}</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2 sm:mx-4" />
              
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'datetime' ? 'bg-primary text-white' : 
                  formData.date ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-sm font-medium hidden sm:inline">{translations.booking.stepper.dateTime}</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2 sm:mx-4" />
              
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'email' ? 'bg-primary text-white' : 
                  formData.email ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <span className="text-sm font-medium hidden sm:inline">{translations.booking.stepper.email}</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-2 sm:mx-4" />
              
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'details' ? 'bg-primary text-white' : 
                  formData.firstName ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-500'
                }`}>
                  4
                </div>
                <span className="text-sm font-medium hidden sm:inline">{translations.booking.stepper.details}</span>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 ${currentStep === 'confirmation' ? '' : 'lg:grid-cols-3'} gap-8`}>
            {/* Left side - Main flow */}
            <div className={currentStep === 'confirmation' ? 'col-span-1' : 'lg:col-span-2'}>
              <div className="bg-white rounded-lg shadow-lg p-8">
                {currentStep === 'service' && (
                  <ServiceSelection
                    onSelectService={handleServiceSelect}
                    selectedServiceId={formData.serviceId}
                  />
                )}

                {currentStep === 'datetime' && service && (
                  <>
                    <DateTimeSelection
                      onSelectDateTime={handleDateTimeSelect}
                      selectedDate={formData.date}
                      selectedTime={formData.time}
                      serviceDuration={service.durationMin}
                      serviceId={service.id}
                    />
                    <div className="flex gap-4 mt-8">
                      <Button
                        variant="outline"
                        onClick={previousStep}
                        className="flex-1"
                      >
                        {translations.booking.navigation.back}
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={!formData.date || !formData.time}
                        className="flex-1"
                      >
                        {translations.booking.navigation.continue}
                      </Button>
                    </div>
                  </>
                )}

                {currentStep === 'email' && (
                  <EmailCapture
                    onSubmit={handleEmailSubmit}
                    onBack={previousStep}
                    initialEmail={formData.email}
                  />
                )}

                {currentStep === 'details' && (
                  <>
                    {isSubmitting && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg">
                        <div className="text-center">
                          <Loader2 className="h-12 w-12 animate-spin text-[#9b7fd4] mx-auto mb-4" />
                          <p className="text-gray-700 font-medium">{translations.booking.messages.creating}</p>
                        </div>
                      </div>
                    )}
                    <PersonalDetailsForm
                      onSubmit={handlePersonalDetailsSubmit}
                      onBack={previousStep}
                      initialData={{
                        phone: formData.phone,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                      }}
                    />
                  </>
                )}

                {currentStep === 'confirmation' && service && formData.email && formData.firstName && formData.lastName && (
                  <BookingConfirmation
                    bookingData={{
                      service: {
                        title: service.title,
                        priceEUR: service.priceEUR,
                        durationMin: service.durationMin,
                      },
                      date: formData.date!,
                      time: formData.time!,
                      email: formData.email,
                      phone: formData.phone!,
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                    }}
                    onBookAnother={reset}
                  />
                )}
              </div>
            </div>

            {/* Right side - Appointment summary */}
            {currentStep !== 'confirmation' && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
                  <h3 className="text-xl font-semibold mb-4 border-b pb-3">
                    {translations.booking.summary.title}
                  </h3>

                  {service ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">{translations.booking.summary.service}</p>
                        <p className="font-medium">{service.title}</p>
                        <p className="text-sm text-gray-500">{service.durationMin} {translations.booking.minutes}</p>
                      </div>

                      {formData.date && formData.time && (
                        <div className="border-t pt-4">
                          <p className="text-sm text-gray-600">{translations.booking.summary.dateTime}</p>
                          <p className="font-medium">
                            {new Date(formData.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-sm text-gray-500">{formData.time}</p>
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600">{translations.booking.summary.stylist}</p>
                        <p className="font-medium">{translations.booking.summary.noPreference}</p>
                      </div>

                      {formData.email && (
                        <div className="border-t pt-4">
                          <p className="text-sm text-gray-600">{translations.booking.summary.email}</p>
                          <p className="font-medium text-sm break-all">{formData.email}</p>
                        </div>
                      )}

                      {formData.firstName && formData.lastName && (
                        <div className="border-t pt-4">
                          <p className="text-sm text-gray-600">{translations.booking.summary.client}</p>
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                          {formData.phone && (
                            <p className="text-sm text-gray-500">{formData.phone}</p>
                          )}
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">{translations.booking.summary.subtotal}</span>
                          <span className="font-medium">${service.priceEUR}</span>
                        </div>
                        <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                          <span>{translations.booking.summary.total}</span>
                          <span className="text-[#9b7fd4]">${service.priceEUR}</span>
                        </div>
                      </div>

                      <div className="bg-[#f5f0ff] p-4 rounded-lg text-sm">
                        <p className="font-medium text-[#6b4ea3] mb-1">
                          💳 {translations.booking.summary.payInPerson}
                        </p>
                        <p className="text-[#7d5fb8]">
                          {translations.booking.summary.chargedToday}: $0
                        </p>
                        <p className="text-[#8a6ec4] text-xs mt-2">
                          {translations.booking.summary.paymentNote}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      {translations.booking.summary.selectServicePrompt}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
