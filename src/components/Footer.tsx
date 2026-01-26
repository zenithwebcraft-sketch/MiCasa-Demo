import { MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import businessData from "@/config/business.json";
import { useLanguage } from "@/hooks/useLanguage";

export const Footer = () => {
  const { business } = businessData;
  const { translations: t } = useLanguage();
  
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src={logo} alt={business.name} className="h-10 w-auto invert" />
              <span className="font-display text-xl font-semibold">{business.name}</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              {business.description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">{t.footer.navigation}</h3>
            <ul className="space-y-3">
              {business.navigation.map((item) => (
                <li key={item.href}>
                  <a 
                    href={item.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">{t.footer.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-background/50" />
                <a 
                  href={`tel:${business.contact.phone.replace(/\s/g, "")}`}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {business.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-background/50" />
                <a 
                  href={`mailto:${business.contact.email}`}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {business.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">{t.footer.locations}</h3>
            <ul className="space-y-4">
              {business.locations.map((location) => (
                <li key={location.id} className="text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-background/50 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-background/90">{location.name}</p>
                      <p className="text-background/60 text-xs">{location.address}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-background/10 text-center">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} {business.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};
