import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/siteConfig";
import { useLanguage } from "@/hooks/useLanguage";

export const Hero = () => {
  const { translations: t } = useLanguage();
  
  return (
    <section className="relative min-h-screen w-full flex flex-col lg:flex-row">
      
      {/* 1. LADO IZQUIERDO: TEXTO Y CONTENIDO */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-background relative order-2 lg:order-1">
        {/* Elementos decorativos de fondo sutiles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="max-w-xl mx-auto z-10 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-sm font-medium text-primary tracking-wide">
              {t.hero.badge}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t.hero.title} <span className="text-primary italic">{t.hero.titleHighlight}</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full"
            >
              <a href={siteConfig.bookingUrl}>{t.hero.ctaPrimary}</a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-primary text-foreground hover:bg-primary/5 px-8 py-6 text-lg rounded-full"
            >
              <a href="#servicios">{t.hero.ctaSecondary}</a>
            </Button>
          </div>

          {/* Stats / Trust indicators */}
          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-border/50">
            <div>
              <div className="text-3xl font-display font-bold text-foreground">+10</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{t.hero.stats.experience}</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-3xl font-display font-bold text-foreground">+5k</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{t.hero.stats.clients}</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <div className="text-3xl font-display font-bold text-foreground">4.9</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{t.hero.stats.reviews}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LADO DERECHO: LA IMAGEN */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative order-1 lg:order-2">
        <img 
          src="/images/micasa/hero.jpg"
          alt="Hero image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay degradado sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent lg:from-background lg:via-transparent" />
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      </div>

    </section>
  );
};
