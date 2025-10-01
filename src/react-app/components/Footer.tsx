import { Phone, Mail, MapPin } from "lucide-react";
export default function Footer() {
  return <footer className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="https://mocha-cdn.com/01986196-46d1-793b-bbea-8b7bd7460145/PROEZARGB_14_CompletoClaro.png" alt="Proeza Automotriz Logo" className="h-10 w-auto" />
              <div>
                <h3 className="text-xl font-bold font-['Poppins']">Proeza Automotriz</h3>
                <p className="text-teal-200 text-sm">Repuestos y Accesorios</p>
              </div>
            </div>
            <p className="text-teal-200 mb-4">
              Tu tienda de confianza para repuestos automotrices en Colombia. 
              Ofrecemos productos de calidad para mantener tu vehículo en perfectas condiciones.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-teal-200">
                <Phone className="h-4 w-4" />
                <span>+57  324 4277326</span>
              </div>
              <div className="flex items-center space-x-2 text-teal-200">
                <Mail className="h-4 w-4" />
                <span>info@proezaautomotriz.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="/repuestos" className="text-teal-200 hover:text-white transition-colors">Buscar Repuestos</a></li>
              <li><a href="/tienda" className="text-teal-200 hover:text-white transition-colors">Tienda Automotriz</a></li>
              <li><a href="/entusiastas" className="text-teal-200 hover:text-white transition-colors">Amantes de los Carros</a></li>
              <li><a href="/talleres" className="text-teal-200 hover:text-white transition-colors">Talleres</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 text-teal-200">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-sm">Calle 67 # 28 - 46 / Bogotá -
Barrio 7 de Agosto.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-teal-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-teal-200 text-sm">
              © 2024 Proeza Automotriz. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-teal-200 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-teal-200 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}