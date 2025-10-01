import { Link, useLocation } from "react-router";
import { Car, Wrench, Heart, MapPin } from "lucide-react";

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Inicio", icon: null },
    { path: "/repuestos", label: "¿Necesitas un Repuesto?", icon: Wrench },
    { path: "/tienda", label: "Tienda Automotriz", icon: Car },
    { path: "/entusiastas", label: "Amantes de los Carros", icon: Heart },
    { path: "/talleres", label: "Talleres Recomendados", icon: MapPin },
  ];

  return (
    <header className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img 
              src="https://mocha-cdn.com/01986196-46d1-793b-bbea-8b7bd7460145/PROEZARGB_14_CompletoClaro.png"
              alt="Proeza Automotriz Logo"
              className="h-16 w-auto"
            />
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? "bg-teal-500 text-white shadow-lg"
                    : "text-teal-200 hover:bg-teal-800/50 hover:text-white"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  location.pathname === path
                    ? "bg-teal-500 text-white shadow-lg"
                    : "text-teal-200 hover:bg-teal-800/50 hover:text-white"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
