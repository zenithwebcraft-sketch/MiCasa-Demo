import { Check, Sparkles, Eye, Brush, Hand, Footprints, Flower2, Zap, Heart,Scissors, Palette, Star,
  FileText, CreditCard, Calculator, Wallet, Stamp, 
  Languages, Shield, Headphones, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/config/siteConfig";
import { siteConfig } from "@/config/siteConfig";
import { useLanguage } from "@/hooks/useLanguage";

const iconMap: Record<string, React.ReactNode> = {
  // Iconos originales de la plantilla
  check: <Check className="w-8 h-8" />,
  sparkles: <Sparkles className="w-8 h-8" />,
  eye: <Eye className="w-8 h-8" />,
  brush: <Brush className="w-8 h-8" />,
  hand: <Hand className="w-8 h-8" />,
  footprints: <Footprints className="w-8 h-8" />,
  Flower2: <Flower2 className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  // ⬇️ ICONOS NUEVOS PARA MICASA MULTISERVICE
  FileText: <FileText className="w-8 h-8" />,
  CreditCard: <CreditCard className="w-8 h-8" />,
  Calculator: <Calculator className="w-8 h-8" />,
  Wallet: <Wallet className="w-8 h-8" />,
  Stamp: <Stamp className="w-8 h-8" />,
  Languages: <Languages className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Headphones: <Headphones className="w-8 h-8" />,
  HardHat: <HardHat className="w-8 h-8" />,
};


export const Services = () => {
  const { translations: t } = useLanguage();
  
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            {t.services.badge}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
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
              {/* Image placeholder */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] bg-muted rounded-2xl overflow-hidden group shadow-lg">
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
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>

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
                  <a href={siteConfig.bookingUrl}>{t.services.cta}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
