import { Card, CardContent } from "@/components/ui/card";
import { team } from "@/config/siteConfig";

export const Team = () => {
  return (
    <section id="equipo" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            Nuestro Equipo
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Nuestro Equipo Profesional
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un equipo apasionado y altamente cualificado, dedicado a realzar tu belleza natural.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <Card 
              key={member.name} 
              className="group overflow-hidden border-border hover:border-primary/30 transition-colors"
            >
              {/* Photo section con Imagen Real */}
              <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Capas de estilo (brillo y degradado inferior) */}
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-card to-transparent pointer-events-none" />
              </div>
              
              <CardContent className="p-6 -mt-16 relative">
                <div className="bg-card rounded-lg p-4 shadow-sm">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};