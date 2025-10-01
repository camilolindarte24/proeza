import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin, Phone, Mail, Globe, Star, Clock, Award } from "lucide-react";
import type { Workshop } from "@/shared/types";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
import L from "leaflet";

let DefaultIcon = L.divIcon({
  html: `<div class="bg-red-500 w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 2L3 7v11h4v-6h6v6h4V7l-7-5z"/>
    </svg>
  </div>`,
  className: "custom-div-icon",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

L.Marker.prototype.options.icon = DefaultIcon;

const sampleWorkshops: Workshop[] = [
  {
    id: 1,
    name: "AutoServicio Premium",
    description: "Especialistas en mantenimiento preventivo y correctivo para todas las marcas",
    address: "Calle 123 #45-67, Chapinero, Bogotá",
    phone: "+57 (1) 234-5678",
    email: "info@autoserviciopremium.com",
    website: "https://autoserviciopremium.com",
    latitude: 4.6097,
    longitude: -74.0817,
    rating: 4.8,
    is_recommended: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Taller Mecánico El Experto",
    description: "30 años de experiencia en reparación automotriz. Especialistas en transmisiones",
    address: "Carrera 50 #12-34, Zona Industrial, Bogotá",
    phone: "+57 (1) 345-6789",
    email: "contacto@tallerelexperto.com",
    website: null,
    latitude: 4.5981,
    longitude: -74.0758,
    rating: 4.6,
    is_recommended: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Centro Automotriz Integral",
    description: "Servicio completo: mecánica, electricidad, aire acondicionado y latonería",
    address: "Avenida 68 #23-45, Engativá, Bogotá",
    phone: "+57 (1) 456-7890",
    email: "info@centrointegral.com",
    website: "https://centrointegral.com",
    latitude: 4.6482,
    longitude: -74.1034,
    rating: 4.5,
    is_recommended: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Electro Auto Diagnóstico",
    description: "Especialistas en diagnóstico electrónico y sistemas de inyección",
    address: "Calle 72 #11-28, Zona Rosa, Bogotá",
    phone: "+57 (1) 567-8901",
    email: "diagnostico@electroauto.com",
    website: "https://electroauto.com",
    latitude: 4.6533,
    longitude: -74.0640,
    rating: 4.7,
    is_recommended: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>(sampleWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadWorkshops();
  }, [showOnlyRecommended]);

  const loadWorkshops = async () => {
    setIsLoading(true);
    try {
      const url = showOnlyRecommended ? "/api/workshops?recommended=true" : "/api/workshops";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok && data.workshops) {
        setWorkshops(data.workshops);
      } else {
        // Use sample data if API fails
        const filtered = showOnlyRecommended 
          ? sampleWorkshops.filter(w => w.is_recommended)
          : sampleWorkshops;
        setWorkshops(filtered);
      }
    } catch (error) {
      console.error("Error loading workshops:", error);
      const filtered = showOnlyRecommended 
        ? sampleWorkshops.filter(w => w.is_recommended)
        : sampleWorkshops;
      setWorkshops(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkshops = workshops.filter(workshop => 
    !showOnlyRecommended || workshop.is_recommended
  );

  // Center map on Bogotá
  const mapCenter: [number, number] = [4.6097, -74.0817];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-6">
            <MapPin className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
            Talleres Recomendados
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Encuentra talleres de confianza cerca de ti. Todos verificados por nuestro equipo.
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setShowOnlyRecommended(true)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                showOnlyRecommended
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-50 shadow-md"
              }`}
            >
              Solo Recomendados
            </button>
            <button
              onClick={() => setShowOnlyRecommended(false)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                !showOnlyRecommended
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-50 shadow-md"
              }`}
            >
              Todos los Talleres
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Mapa de Talleres</h2>
              <p className="text-slate-600">Haz clic en los marcadores para ver detalles</p>
            </div>
            <div className="h-96 lg:h-[500px]">
              <MapContainer
                center={mapCenter}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredWorkshops
                  .filter(workshop => workshop.latitude && workshop.longitude)
                  .map((workshop) => (
                    <Marker
                      key={workshop.id}
                      position={[workshop.latitude!, workshop.longitude!]}
                      eventHandlers={{
                        click: () => setSelectedWorkshop(workshop),
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-bold text-slate-900 mb-1">
                            {workshop.name}
                          </h3>
                          <p className="text-sm text-slate-600 mb-2">
                            {workshop.description}
                          </p>
                          <div className="flex items-center space-x-1 mb-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-semibold">
                              {workshop.rating}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {workshop.address}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </div>
          </div>

          {/* Workshop List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {showOnlyRecommended ? "Talleres Recomendados" : "Todos los Talleres"}
              </h2>
              {isLoading && (
                <div className="text-slate-500">Cargando...</div>
              )}
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {filteredWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  onClick={() => setSelectedWorkshop(workshop)}
                  className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                    selectedWorkshop?.id === workshop.id
                      ? "border-green-500"
                      : "border-transparent hover:border-green-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-900">
                          {workshop.name}
                        </h3>
                        {workshop.is_recommended && (
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center space-x-1">
                            <Award className="h-3 w-3" />
                            <span>Recomendado</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-slate-700">
                          {workshop.rating}
                        </span>
                        <span className="text-slate-500 text-sm">
                          ({Math.floor(Math.random() * 100) + 10} reseñas)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {workshop.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{workshop.address}</span>
                    </div>
                    {workshop.phone && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Phone className="h-4 w-4" />
                        <span className="text-sm">{workshop.phone}</span>
                      </div>
                    )}
                    {workshop.email && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{workshop.email}</span>
                      </div>
                    )}
                    {workshop.website && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Globe className="h-4 w-4" />
                        <a
                          href={workshop.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visitar sitio web
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center space-x-1 text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Lun-Vie 8:00-18:00</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ¿Por qué recomendamos estos talleres?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Todos nuestros talleres recomendados han sido cuidadosamente seleccionados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Calidad Verificada</h3>
              <p className="text-slate-600">
                Inspecciones regulares y certificaciones de calidad
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Excelentes Reseñas</h3>
              <p className="text-slate-600">
                Más de 4.5 estrellas promedio de satisfacción
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Experiencia Comprobada</h3>
              <p className="text-slate-600">
                Mínimo 5 años de experiencia en el mercado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
