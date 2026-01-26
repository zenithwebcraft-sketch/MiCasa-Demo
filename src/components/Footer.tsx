import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import logo from "@/assets/logo.png";
import businessData from '@/config/business.json';


export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt={siteConfig.name} className="h-10 w-auto invert" />
              <span className="font-display text-xl font-semibold">{businessData.business.name}</span>
            </div>
            <p className="text-background/70 text-sm">
              Centro de Estética en Murcia. Especialistas en cejas, pestañas, uñas 
              y tratamientos faciales desde 2014.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Enlaces</h4>
            <nav className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-background/70 hover:text-background transition-colors text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a 
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {siteConfig.contact.phone}
              </a>
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-background/70 hover:text-background transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-display font-semibold mb-4">Ubicaciones</h4>
            <div className="space-y-4">
              {siteConfig.locations.map((location) => (
                <div key={location.name} className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-background/70 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">{location.name}</p>
                    <p className="text-background/70">{location.address}</p>
                    <p className="text-background/70">{location.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-background/50 hover:text-background text-sm transition-colors">
              Política de privacidad
            </a>
            <a href="#" className="text-background/50 hover:text-background text-sm transition-colors">
              Términos y condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
