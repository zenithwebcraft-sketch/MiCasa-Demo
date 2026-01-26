// ========== IMPORTS ==========
import businessData from './business.json';
import servicesData from './services.json';
import staffData from './staff.json';
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


// ========== EXPORTS ==========
export const siteConfig = businessData.business;
export const services: Service[] = servicesData; // ✅ CORREGIDO: es array directo
export const staff: StaffMember[] = staffData;   // ✅ CORREGIDO: es array directo
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
    name: "Plan Básico",
    description: "Ideal para comenzar",
    price: "49€",
    period: "/mes",
    features: [
      "Servicio mensual incluido",
      "Descuento 10% en servicios adicionales",
      "Acceso a ofertas exclusivas",
      "Soporte por email",
    ],
    highlighted: false,
  },
  {
    name: "Plan Premium",
    description: "Nuestro plan más popular",
    price: "89€",
    period: "/mes",
    features: [
      "2 Servicios mensuales incluidos",
      "Descuento 20% en todos los servicios",
      "Reserva prioritaria",
      "Soporte preferente",
      "Productos de cortesía",
    ],
    highlighted: true,
  },
  {
    name: "Plan VIP",
    description: "Experiencia completa y premium",
    price: "149€",
    period: "/mes",
    features: [
      "Servicios ilimitados",
      "Descuento 30% en servicios adicionales",
      "Acceso VIP sin esperas",
      "Atención personalizada 24/7",
      "Productos premium mensuales",
      "Eventos exclusivos",
    ],
    highlighted: false,
  },
];


export const team = staff; // Alias para compatibilidad


export const testimonials = [
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
];
