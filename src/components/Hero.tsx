import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/siteConfig";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
     {/* Hero image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/vanity/Tratamiento-de-pestanas-hero.jpg)" }}
      />

      {/* Overlay to keep text readable */}
      <div className="absolute inset-0 bg-secondary/70 mix-blend-multiply" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-taupe-light/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full animate-fade-in">
            <span className="text-sm font-medium text-primary">
              Centro de Estética en Murcia
            </span>
          </div>

          {/* Main heading */}
          <h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Descubre tu belleza{" "}
            <span className="text-primary">natural</span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Especialistas en cejas, pestañas, uñas y tratamientos faciales. 
            Te cuidamos con técnicas de vanguardia y un trato cercano en nuestros centros de Murcia.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              <a href={siteConfig.bookingUrl}>Reservar cita</a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-primary text-foreground hover:bg-primary/10 px-8 py-6 text-lg"
            >
              <a href="#servicios">Ver servicios</a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div 
            className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-foreground">+10</div>
              <div className="text-sm">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-foreground">2</div>
              <div className="text-sm">Centros en Murcia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-foreground">+5000</div>
              <div className="text-sm">Clientas satisfechas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
