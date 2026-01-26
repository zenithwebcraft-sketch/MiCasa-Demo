import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import businessData from "@/config/business.json";

export const Location = () => {
  const { business } = businessData;
  
  return (
    <section id="ubicacion" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Ubicación
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Encuéntranos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Estamos ubicados estratégicamente para tu comodidad.
          </p>
        </div>

        {/* Locations grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {business.locations.map((location) => (
            <Card key={location.id} className="overflow-hidden border-border">
              {/* Map placeholder */}
              <div className="aspect-video bg-gradient-to-br from-secondary to-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary/30 mx-auto mb-2" />
                    <span className="text-muted-foreground text-sm">Mapa interactivo</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {businessData.business.name} - {location.name}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-foreground">{location.address}</p>
                      <p className="text-muted-foreground">{location.city}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-foreground">{business.hours.weekdays}</p>
                      <p className="text-muted-foreground">{business.hours.sunday}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a 
                      href={`tel:${business.contact.phone.replace(/\s/g, "")}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {business.contact.phone}
                    </a>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-primary text-foreground hover:bg-primary/10"
                >
                  <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                    Cómo llegar
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
