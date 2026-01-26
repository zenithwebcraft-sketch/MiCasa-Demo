import { Card, CardContent } from "@/components/ui/card";
import { getActiveStaff } from "@/config/siteConfig";
import { useLanguage } from "@/hooks/useLanguage";

export const Team = () => {
  const staff = getActiveStaff();
  const { translations: t } = useLanguage();
  
  return (
    <section id="equipo" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            {t.team.badge}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            {t.team.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.team.subtitle}
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {staff.map((member) => (
            <Card key={member.id} className="overflow-hidden border-border hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-secondary to-muted relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
