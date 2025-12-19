import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Booking = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Reserva tu Cita
          </h1>
          <div className="w-32" /> {/* Spacer */}
        </div>

        {/* Placeholder content */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              🚀 Sistema de Booking en Desarrollo
            </h2>
            <p className="text-gray-600">
              Próximamente podrás reservar tus citas directamente aquí.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
