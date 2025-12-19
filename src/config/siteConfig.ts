export const siteConfig = {
  name: "Vanyti Center Beauty",
  description: "Centro de Estética en Murcia especializado en cejas, pestañas, uñas y tratamientos faciales",
  contact: {
    phone: "+34 663 491 339",
    email: "comercial@byvanyti.com",
    whatsapp: "https://wa.me/34663491339",
  },
  hours: {
    weekdays: "Lun - Sáb: 10:00 - 20:00",
    sunday: "Domingo: Cerrado",
  },
  locations: [
    {
      name: "Nueva Condomina",
      address: "Centro Comercial Nueva Condomina",
      city: "30100 Murcia, Spain",
      mapUrl: "https://maps.google.com/?q=Centro+Comercial+Nueva+Condomina+Murcia",
    },
    {
      name: "Centro",
      address: "Calle Olof Palme, esquina, Pl. Musico Diaz Cano, 8",
      city: "30009 Murcia, Spain",
      mapUrl: "https://maps.google.com/?q=Calle+Olof+Palme+Murcia",
    },
  ],
  navigation: [
    { label: "Servicios", href: "#servicios" },
    { label: "Precios", href: "#precios" },
    { label: "Equipo", href: "#equipo" },
    { label: "Opiniones", href: "#opiniones" },
    { label: "Ubicación", href: "#ubicacion" },
  ],
  bookingUrl: "#booking",
};

export const services = [
  {
    id: "depilacion-hilo",
    title: "Depilación con Hilo",
    description: "Técnica ancestral para una depilación precisa y duradera. Ideal para cejas y rostro, respetando la piel sensible.",
    benefits: ["Sin químicos ni irritación", "Resultados duraderos hasta 4 semanas", "Definición perfecta de cejas"],
    icon: "Sparkles",
    image: "/images/vanyti/depilacion-con-hilo.jpg",
    imageAlt: "Depilación con hilo en Vanyti Center Beauty"

  },
  {
    id: "pestanas",
    title: "Tratamiento de Pestañas",
    description: "Realza tu mirada con nuestros tratamientos de pestañas. Desde lifting hasta extensiones de alta calidad.",
    benefits: ["Mirada más expresiva y natural", "Materiales hipoalergénicos", "Duración de 4-6 semanas"],
    icon: "Eye",
    image: "/images/vanyti/Tratamiento-de-pestanas.jpg",
    imageAlt: "Tratamiento de Pestañas en Vanyti Center Beauty"
  },
  {
    id: "cejas",
    title: "Tratamiento de Cejas",
    description: "Diseño, laminado y microblading para unas cejas perfectamente definidas que enmarquen tu rostro.",
    benefits: ["Diseño personalizado", "Resultados naturales", "Técnicas de última generación"],
    icon: "Brush",
    image: "/images/vanyti/Tratamiento-de-cejas.jpg",
    imageAlt: "Tratamiento de Cejas en Vanyti Center Beauty"
  },
  {
    id: "manicura",
    title: "Manicura",
    description: "Cuidado completo de manos y uñas. Desde manicura clásica hasta nail art y semipermanente.",
    benefits: ["Uñas fuertes y saludables", "Colores de tendencia", "Larga duración sin astillado"],
    icon: "Hand",
    image: "/images/vanyti/Manicura.jpg",
    imageAlt: "Manicura en Vanyti Center Beauty"
  },
  {
    id: "pedicura",
    title: "Pedicura",
    description: "Tratamiento integral para pies cansados. Incluye hidratación, exfoliación y esmaltado perfecto.",
    benefits: ["Pies suaves y renovados", "Tratamiento de callosidades", "Relajación completa"],
    icon: "Footprints",
    image: "/images/vanyti/Pedicura.jpg",
    imageAlt: "Pedicura en Vanyti Center Beauty"
  },
  {
    id: "tratamientos-faciales",
    title: "Tratamientos Faciales",
    description: "Limpieza profunda, hidratación y rejuvenecimiento para una piel radiante y saludable.",
    benefits: ["Piel más luminosa", "Hidratación profunda", "Anti-edad efectivo"],
    icon: "Flower2",
    image: "/images/vanyti/Tratamientos-faciales-corporales.jpg",
    imageAlt: "Tratamiento Faciales Corporales en Vanyti Center Beauty"
  },
  {
    id: "depilacion-laser",
    title: "Depilación Láser",
    description: "Tecnología avanzada para eliminación permanente del vello. Resultados visibles desde la primera sesión.",
    benefits: ["Resultados permanentes", "Sin dolor", "Apto para todo tipo de piel"],
    icon: "Zap",
    image: "/images/vanyti/Depilacion-laser.jpg",
    imageAlt: "Depilacion Laser en Vanyti Center Beauty"
  },
  {
    id: "tratamientos-corporales",
    title: "Tratamientos Corporales",
    description: "Masajes, envolturas y tratamientos reductores para un cuerpo tonificado y relajado.",
    benefits: ["Reducción de medidas", "Relajación muscular", "Piel más firme"],
    icon: "Heart",
    image: "/images/vanyti/Tratamientos-faciales-corporales.jpg",
    imageAlt: "Tratamiento Corporales en Vanyti Center Beauty"
  },
];

export const pricingPlans = [
  {
    name: "Básico",
    description: "Ideal para mantenimiento mensual",
    price: "49€",
    period: "/mes",
    features: [
      "1 Depilación de cejas",
      "1 Manicura básica",
      "Descuento 10% en servicios",
      "Acceso a ofertas exclusivas",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    description: "Nuestro plan más popular",
    price: "89€",
    period: "/mes",
    features: [
      "2 Tratamientos de cejas o pestañas",
      "2 Manicuras o pedicuras",
      "1 Tratamiento facial básico",
      "Descuento 20% en servicios",
      "Reserva prioritaria",
    ],
    highlighted: true,
  },
  {
    name: "VIP",
    description: "Experiencia completa de belleza",
    price: "149€",
    period: "/mes",
    features: [
      "Tratamientos ilimitados de cejas",
      "4 Manicuras o pedicuras",
      "2 Tratamientos faciales premium",
      "Descuento 30% en todos los servicios",
      "Acceso VIP sin esperas",
      "Productos de regalo mensuales",
    ],
    highlighted: false,
  },
];

export const team = [
  {
    name: "Dayana Pestana",
    role: "Fundadora & Especialista en Cejas",
    bio: "Con más de 10 años de experiencia en el mundo de la belleza, Dayana lidera nuestro equipo con pasión y dedicación.",
    image: "/images/vanyti/0_Dayana1.jpg",
  },
  {
    name: "Isis Casique",
    role: "Especialista en Pestañas",
    bio: "Artista certificada en extensiones y lifting de pestañas. Transforma miradas con precisión y delicadeza.",
    image: "/images/vanyti/0_Isis1.jpg",
  },
  {
    name: "Leumin Boyer",
    role: "Nail Artist",
    bio: "Creativa y detallista, Leumin convierte cada uña en una obra de arte. Experta en tendencias internacionales.",
    image: "/images/vanyti/0_Leumin2.jpg",
  },
  {
    name: "Yersin Catherine Briceño",
    role: "Especialista en Tratamientos Faciales",
    bio: "Profesional dedicada al cuidado de la piel con formación avanzada en estética facial y corporal.",
    image: "/images/vanyti/Yersin-Briceno.jpg",
  },
];

export const testimonials = [
  {
    name: "María García",
    rating: 5,
    text: "¡Increíble experiencia! Dayana es una artista con las cejas. Nunca había quedado tan satisfecha con el resultado.",
    service: "Depilación con hilo",
  },
  {
    name: "Carmen López",
    rating: 5,
    text: "Las extensiones de pestañas de Isis son perfectas. Se ven súper naturales y duran muchísimo.",
    service: "Extensiones de pestañas",
  },
  {
    name: "Laura Martínez",
    rating: 5,
    text: "El mejor centro de estética de Murcia. El equipo es muy profesional y el ambiente es súper acogedor.",
    service: "Tratamiento facial",
  },
  {
    name: "Ana Sánchez",
    rating: 5,
    text: "Leumin hace magia con las uñas. Siempre salgo con diseños únicos que me encantan.",
    service: "Nail art",
  },
  {
    name: "Patricia Ruiz",
    rating: 5,
    text: "Llevo años viniendo y nunca me han decepcionado. Calidad y trato excepcional.",
    service: "Cliente habitual",
  },
];
