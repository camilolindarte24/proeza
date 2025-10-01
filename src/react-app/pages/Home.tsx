import { Link } from "react-router";
import { Car, Wrench, Heart, MapPin, Search, Shield, Truck, Users } from "lucide-react";
export default function Home() {
  const features = [{
    icon: Wrench,
    title: "¿Necesitas un Repuesto?",
    description: "Busca repuestos específicos para tu vehículo usando tu placa. Conexión directa con el RUNT.",
    link: "/repuestos",
    color: "from-teal-500 to-emerald-600"
  }, {
    icon: Car,
    title: "Tienda Automotriz",
    description: "Aceites, lubricantes, limpiadores y productos para el cuidado de tu vehículo.",
    link: "/tienda",
    color: "from-blue-500 to-indigo-600"
  }, {
    icon: Heart,
    title: "Amantes de los Carros",
    description: "Ropa, coleccionables, gadgets y accesorios para los apasionados por los autos.",
    link: "/entusiastas",
    color: "from-purple-500 to-pink-600"
  }, {
    icon: MapPin,
    title: "Talleres Recomendados",
    description: "Encuentra talleres de confianza cerca de ti con nuestro mapa interactivo.",
    link: "/talleres",
    color: "from-green-500 to-emerald-600"
  }];
  const benefits = [{
    icon: Search,
    title: "Búsqueda Precisa",
    description: "Encuentra exactamente lo que necesitas para tu vehículo"
  }, {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Productos originales y de las mejores marcas"
  }, {
    icon: Truck,
    title: "Envío Rápido",
    description: "Entrega a domicilio en toda Colombia"
  }, {
    icon: Users,
    title: "Atención Personalizada",
    description: "Expertos listos para ayudarte"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url('https://mocha-cdn.com/01986196-46d1-793b-bbea-8b7bd7460145/hero-farmer-toyota.jpg')`
      }}></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-['Poppins'] mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">PROEZA AUTOPARTES</span>
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 mb-8 max-w-3xl mx-auto">Tu aliado de confianza para repuestos automotrices en la Colombia Rural. Nuestro equipo te asesora para encontrar exactamente lo que necesitas.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/repuestos" className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Buscar Repuesto
              </Link>
              <a href="https://wa.me/573244277326" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-200">
                Habla con un Asesor
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expectativa Section */}
      <section style={{
      backgroundColor: '#285D60'
    }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-['Poppins']">
              Pronto repuestos a crédito para que no pares de trabajar por tu regiónkljklj
            </h2>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-slate-600">
              Todo lo que necesitas para tu vehículo en un solo lugar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <Link key={index} to={feature.link} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-slate-100">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </Link>)}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
              ¿Por qué elegir Proeza Automotriz?
            </h2>
            <p className="text-xl text-slate-600">
              Más de 10 años de experiencia en el mercado automotriz colombiano
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => <div key={index} className="text-center">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-6 shadow-lg">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Poppins']">
            ¿Listo para encontrar lo que necesitas?
          </h2>
          <p className="text-xl text-teal-200 mb-8">
            Empieza ahora mismo buscando repuestos para tu vehículo
          </p>
          <Link to="/repuestos" className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            <Search className="h-5 w-5" />
            <span>Buscar Repuestos</span>
          </Link>
        </div>
      </section>
    </div>;
}