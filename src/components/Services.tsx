import { Check, Sparkles, Eye, Brush, Hand, Footprints, Flower2, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/config/siteConfig";
import { siteConfig } from "@/config/siteConfig";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-8 h-8" />,
  Eye: <Eye className="w-8 h-8" />,
  Brush: <Brush className="w-8 h-8" />,
  Hand: <Hand className="w-8 h-8" />,
  Footprints: <Footprints className="w-8 h-8" />,
  Flower2: <Flower2 className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
};

export const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Nuestros Servicios
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros Servicios Profesionales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia gama de tratamientos de belleza con las técnicas más avanzadas 
            y productos de primera calidad.
          </p>
        </div>

        {/* Services grid - alternating layout */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Image placeholder - REEMPLAZA DESDE AQUÍ */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden group shadow-lg">
                  {/* Lógica: Si hay imagen, muéstrala. Si no, muestra el icono de respaldo */}
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.imageAlt || service.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted text-primary/30">
                      {iconMap[service.icon]}
                    </div>
                  )}
                  
                  {/* Capa de brillo al pasar el mouse (opcional) */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
              {/* HASTA AQUÍ */}

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 text-primary">
                  {iconMap[service.icon]}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a href={siteConfig.bookingUrl}>Reservar ahora</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
