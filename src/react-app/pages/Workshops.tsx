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
    name: "Corresponsal Pitalito (Huila)",
    description:
      "Punto de confianza PROEZA para la región del Huila. Facilitamos la compra de repuestos con asesoría personalizada.",
    address: "Calle 4 #3-45, Centro, Pitalito, Huila",
    phone: "573108712661",
    email: "proeza.autopartes@gmail.com",
    website: null,
    latitude: 1.8537, // Coordenadas aproximadas de Pitalito
    longitude: -76.0507,
    rating: 4.9,
    is_recommended: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Corresponsal Ortega (Tolima)",
    description:
      "Punto de confianza PROEZA en Tolima. Tu aliado local para repuestos automotrices de calidad.",
    address: "INVERSIONES FERREALBANO S.A.S, Km 8 via Guamo - Ortega",
    phone: "573108712661",
    email: "proeza.autopartes@gmail.com",
    website: null,
    latitude: 3.9373, // Coordenadas aproximadas de Ortega
    longitude: -75.2219,
    rating: 4.7,
    is_recommended: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Corresponsal Granada (Meta)",
    description:
      "Punto de confianza PROEZA en el Meta. Apoyamos a los trabajadores rurales con repuestos confiables.",
    address: "Calle 7 #6-23, Centro, Granada, Meta",
    phone: "573108712661",
    email: "proeza.autopartes@gmail.com",
    website: null,
    latitude: 3.5466, // Coordenadas aproximadas de Granada (Meta)
    longitude: -73.7069,
    rating: 4.8,
    is_recommended: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>(sampleWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [showOnlyRecommended, setShowOnlyRecommended] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const goFormDocs = () => {
    console.log("Entro a goFormDocs");
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSd1EnZXBV9FHaPMFqe8jN54gUEZ8Hdczj2kesdWT0VvgaxfrA/viewform?usp=dialog",
      "_blank"
    );
  };

  useEffect(() => {
    loadWorkshops();
  }, [showOnlyRecommended]);

  const loadWorkshops = async () => {
    setIsLoading(true);
    try {
      const url = showOnlyRecommended
        ? "/api/workshops?recommended=true"
        : "/api/workshops";
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok && data.workshops) {
        setWorkshops(data.workshops);
      } else {
        // Use sample data if API fails
        const filtered = showOnlyRecommended
          ? sampleWorkshops.filter((w) => w.is_recommended)
          : sampleWorkshops;
        setWorkshops(filtered);
      }
    } catch (error) {
      console.error("Error loading workshops:", error);
      const filtered = showOnlyRecommended
        ? sampleWorkshops.filter((w) => w.is_recommended)
        : sampleWorkshops;
      setWorkshops(filtered);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkshops = workshops.filter(
    (workshop) => !showOnlyRecommended || workshop.is_recommended
  );

  // Center map on Bogotá
  const mapCenter: [number, number] = [4.6097, -74.0817];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-slate-50 to-green-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex p-4 mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600">
            <MapPin className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
            Puntos de confianza
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            Encuentra talleres de confianza cerca de ti. Todos verificados por
            nuestro equipo.
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
              Puntos de confianza
            </button>
            <button
              onClick={() => goFormDocs()}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                !showOnlyRecommended
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-50 shadow-md"
              }`}
            >
              ¿Quieres ser corresponsal?
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Map */}
          <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Mapa de Talleres
              </h2>
              <p className="text-slate-600">
                Haz clic en los marcadores para ver detalles
              </p>
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
                  .filter((workshop) => workshop.latitude && workshop.longitude)
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
                          <h3 className="mb-1 font-bold text-slate-900">
                            {workshop.name}
                          </h3>
                          <p className="mb-2 text-sm text-slate-600">
                            {workshop.description}
                          </p>
                          <div className="flex items-center mb-2 space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
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
                {showOnlyRecommended
                  ? "Puntos de confianza"
                  : "¿Quieres ser corresponsal?"}
              </h2>
              {isLoading && <div className="text-slate-500">Cargando...</div>}
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
                      <div className="flex items-center mb-1 space-x-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {workshop.name}
                        </h3>
                        {workshop.is_recommended && (
                          <span className="flex items-center px-2 py-1 space-x-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                            <Award className="w-3 h-3" />
                            <span>Recomendado</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mb-2 space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-slate-700">
                          {workshop.rating}
                        </span>
                        <span className="text-sm text-slate-500">
                          ({Math.floor(Math.random() * 100) + 10} reseñas)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-slate-600 line-clamp-2">
                    {workshop.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{workshop.address}</span>
                    </div>
                    {workshop.phone && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{workshop.phone}</span>
                      </div>
                    )}
                    {workshop.email && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">{workshop.email}</span>
                      </div>
                    )}
                    {workshop.website && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Globe className="w-4 h-4" />
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

                  <div className="flex items-center pt-4 mt-4 space-x-4 border-t border-slate-200">
                    <div className="flex items-center space-x-1 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Lun-Vie 8:00-18:00</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-8 mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              ¿Porque es mejor comprar tu repuesto con PROEZA?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-slate-600">
              Todos nuestros puntos de confianza han sido cuidadosamente
              seleccionados. Son personas y negocios de tu comunidad que
              facilitan tu vida.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex p-4 mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-bold text-slate-900">
                Generas economía local
              </h3>
              <p className="text-slate-600">
                Parte del margen queda en tu municipio, apoyando empleo y
                progreso local.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-bold text-slate-900">
                Asesoría personalizada y real
              </h3>
              <p className="text-slate-600">
                Aquí siempre estarás en contacto con un asesor que te ayuda a
                validar compatibilidad, marca, referencia y calidad.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex p-4 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 font-bold text-slate-900">
                Entrega garantizada y sin riesgo de estafa
              </h3>
              <p className="text-slate-600">
                El Punto de Confianza recibe y entrega tu repuesto. No tienes
                que preocuparte por envíos fraudulentos o plataformas anónimas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
