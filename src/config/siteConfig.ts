// ========== IMPORTS ==========
import businessData from './business.json';
import servicesDataES from './es/services.json';
import servicesDataEN from './en/services.json';
import staffDataES from './es/staff.json';
import staffDataEN from './en/staff.json';
import bookingData from './booking.json';

// ========== TYPES ==========
export interface Service {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  benefits: string[];
  icon: string;
  durationMin: number;
  priceEUR: number;
  image?: string;
  imageAlt?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  active: boolean;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  mapUrl: string;
}

export interface BookingConfig {
  timezone: string;
  slotIntervalMin: number;
  currency: string;
  defaultLocationId: string;
  openDays: string[];
  openHours: {
    start: string;
    end: string;
  };
  policies: {
    paymentMethod: string;
    cancellationWindow: string;
    depositRequired: boolean;
  };
  emailConfig: {
    fromAddress: string;
    fromName: string;
    replyTo: string;
  };
}

// ========== LANGUAGE DETECTION ==========
const getBrowserLanguage = (): 'es' | 'en' => {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('es') ? 'es' : 'en';
};

const currentLang = getBrowserLanguage();

// ========== EXPORTS ==========
export const siteConfig = businessData.business;
export const services: Service[] = currentLang === 'es' ? servicesDataES.services : servicesDataEN.services;
export const staff: StaffMember[] = currentLang === 'es' ? staffDataES.staff : staffDataEN.staff;
export const bookingConfig: BookingConfig = bookingData.bookingConfig;

// ========== HELPER FUNCTIONS ==========
export const getServiceById = (id: string): Service | undefined => {
  return services.find((s) => s.id === id);
};

export const getLocationById = (id: string): Location | undefined => {
  return siteConfig.locations.find((l) => l.id === id);
};

export const getActiveStaff = (): StaffMember[] => {
  return staff.filter((s) => s.active);
};

// ========== LEGACY EXPORTS (para compatibilidad) ==========
export const pricingPlans = [
  {
    name: currentLang === 'es' ? 'Plan Básico' : 'Basic Plan',
    description: currentLang === 'es' ? 'Ideal para comenzar' : 'Ideal to get started',
    price: "$49",
    period: currentLang === 'es' ? '/mes' : '/month',
    features: currentLang === 'es' ? [
      "Servicio mensual incluido",
      "Descuento 10% en servicios adicionales",
      "Acceso a ofertas exclusivas",
      "Soporte por email",
    ] : [
      "Monthly service included",
      "10% discount on additional services",
      "Access to exclusive offers",
      "Email support",
    ],
    highlighted: false,
  },
  {
    name: currentLang === 'es' ? 'Plan Premium' : 'Premium Plan',
    description: currentLang === 'es' ? 'Nuestro plan más popular' : 'Our most popular plan',
    price: "$89",
    period: currentLang === 'es' ? '/mes' : '/month',
    features: currentLang === 'es' ? [
      "2 Servicios mensuales incluidos",
      "Descuento 20% en todos los servicios",
      "Reserva prioritaria",
      "Soporte preferente",
      "Productos de cortesía",
    ] : [
      "2 Monthly services included",
      "20% discount on all services",
      "Priority booking",
      "Premium support",
      "Courtesy products",
    ],
    highlighted: true,
  },
  {
    name: currentLang === 'es' ? 'Plan VIP' : 'VIP Plan',
    description: currentLang === 'es' ? 'Experiencia completa y premium' : 'Complete premium experience',
    price: "$149",
    period: currentLang === 'es' ? '/mes' : '/month',
    features: currentLang === 'es' ? [
      "Servicios ilimitados",
      "Descuento 30% en servicios adicionales",
      "Acceso VIP sin esperas",
      "Atención personalizada 24/7",
      "Productos premium mensuales",
      "Eventos exclusivos",
    ] : [
      "Unlimited services",
      "30% discount on additional services",
      "VIP access without waiting",
      "24/7 personalized attention",
      "Monthly premium products",
      "Exclusive events",
    ],
    highlighted: false,
  },
];

export const team = staff; // Alias para compatibilidad

export const testimonials = currentLang === 'es' ? [
  {
    name: "Cliente Satisfecho 1",
    rating: 5,
    text: "Excelente servicio y atención. Muy profesionales y atentos a los detalles. Lo recomiendo totalmente.",
    service: "Servicio Premium",
  },
  {
    name: "Cliente Satisfecho 2",
    rating: 5,
    text: "Quedé encantada con los resultados. El equipo es muy profesional y el ambiente muy agradable.",
    service: "Servicio Estándar",
  },
  {
    name: "Cliente Satisfecho 3",
    rating: 5,
    text: "Siempre vuelvo porque la calidad es excepcional. Precios justos y excelente trato.",
    service: "Cliente Frecuente",
  },
  {
    name: "Cliente Satisfecho 4",
    rating: 5,
    text: "La mejor experiencia que he tenido. Todo el personal es increíblemente amable y competente.",
    service: "Paquete Completo",
  },
  {
    name: "Cliente Satisfecho 5",
    rating: 5,
    text: "Llevo años viniendo y nunca me han decepcionado. Calidad y profesionalismo en cada visita.",
    service: "Cliente Habitual",
  },
] : [
  {
    name: "Satisfied Customer 1",
    rating: 5,
    text: "Excellent service and attention. Very professional and detail-oriented. I totally recommend it.",
    service: "Premium Service",
  },
  {
    name: "Satisfied Customer 2",
    rating: 5,
    text: "I was delighted with the results. The team is very professional and the atmosphere is very pleasant.",
    service: "Standard Service",
  },
  {
    name: "Satisfied Customer 3",
    rating: 5,
    text: "I always come back because the quality is exceptional. Fair prices and excellent service.",
    service: "Regular Customer",
  },
  {
    name: "Satisfied Customer 4",
    rating: 5,
    text: "The best experience I've had. All staff are incredibly friendly and competent.",
    service: "Complete Package",
  },
  {
    name: "Satisfied Customer 5",
    rating: 5,
    text: "I've been coming for years and they've never disappointed me. Quality and professionalism on every visit.",
    service: "Regular Customer",
  },
];
