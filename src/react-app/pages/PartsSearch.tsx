import { useState } from "react";
import { Search, Car, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";



export default function PartsSearch() {
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [partDescription, setPartDescription] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const normalizePhone = (phone: string) => phone.replace(/\D/g, "");
  const configuredWhatsappNumber = normalizePhone(
    import.meta.env.VITE_WHATSAPP_NUMBER || ""
  );

  const getFallbackVehicle = (plate: string) => ({
    CarMake: "No disponible",
    CarModel: "No disponible",
    RegistrationYear: "No disponible",
    FuelType: "No disponible",
    VehicleType: "No disponible",
    Plate: plate.toUpperCase(),
  });

  const searchVehicle = async () => {
    if (!licensePlate.trim()) {
      setError("Por favor ingresa un número de placa válido.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const url = `https://www.regcheck.org.uk/api/reg.asmx/CheckColombia?RegistrationNumber=${licensePlate.toUpperCase()}&username=ProezaAutomotriz`;
      const response = await axios.get(url, { responseType: "text" });

      // ✅ Usamos DOMParser nativo del navegador
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const parserError = xmlDoc.getElementsByTagName("parsererror")[0];

      if (parserError) {
        setVehicleInfo(getFallbackVehicle(licensePlate));
        setError(
          "No fue posible leer la respuesta del servicio de placas. Puedes continuar con la cotización."
        );
        return;
      }

      const vehicleJsonNode = xmlDoc.getElementsByTagName("vehicleJson")[0];
      const vehicleJson = vehicleJsonNode?.textContent?.trim();

      if (!vehicleJson || /malformed\s+json/i.test(vehicleJson)) {
        setVehicleInfo(getFallbackVehicle(licensePlate));
        setError(
          "El proveedor de placas devolvió datos inválidos. Puedes continuar con la cotización."
        );
        return;
      }

      let vehicle: any = null;
      try {
        vehicle = JSON.parse(vehicleJson);
      } catch (_parseError) {
        setVehicleInfo(getFallbackVehicle(licensePlate));
        setError(
          "No se pudo procesar la información de la placa en este momento. Puedes continuar con la cotización."
        );
        return;
      }

      if (vehicle) {
        setVehicleInfo(vehicle);
      } else {
        setError("No se pudo encontrar información del vehículo");
      }
    } catch (err) {
      console.error("Error consultando vehículo:", err);
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitRequest = () => {
    if (!licensePlate.trim()) {
      setError("Por favor ingresa una placa válida.");
      return;
    }

    if (!partDescription.trim()) {
      setError("Por favor describe el repuesto que necesitas");
      return;
    }

    if (!configuredWhatsappNumber) {
      setError(
        "WhatsApp no está configurado. Define VITE_WHATSAPP_NUMBER en Netlify para enviar cotizaciones."
      );
      return;
    }

    setError("");

    const whatsappNumber = configuredWhatsappNumber;
    const createdAt = new Date().toLocaleString("es-CO", {
      timeZone: "America/Bogota",
      dateStyle: "short",
      timeStyle: "short",
    });

    const messageLines = [
      "Hola 👋, quiero cotizar un repuesto con Proeza Automotriz.",
      "",
      "Datos de la solicitud:",
      `• Placa: ${licensePlate.toUpperCase()}`,
      `• Repuesto: ${partDescription.trim()}`,
    ];

    if (customerPhone.trim()) {
      messageLines.push(`• Teléfono: ${customerPhone.trim()}`);
    }

    if (customerEmail.trim()) {
      messageLines.push(`• Email: ${customerEmail.trim()}`);
    }

    messageLines.push(
      "",
      `• Fecha: ${createdAt}`,
      "",
      "¿Me pueden confirmar precio y disponibilidad, por favor?",
      "Gracias 🙌"
    );

    const nextWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      messageLines.join("\n")
    )}`;

    setWhatsappUrl(nextWhatsappUrl);
    setRequestSent(true);
    window.open(nextWhatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (requestSent) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="p-8 text-center bg-white shadow-xl rounded-2xl">
            <div className="inline-flex p-4 mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-600">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              ¡Solicitud Enviada!
            </h2>
            <p className="mb-6 text-slate-600">
              Hemos recibido tu solicitud de repuesto para el vehículo con placa{" "}
              <strong>{licensePlate}</strong>. Nos pondremos en contacto contigo
              pronto.
            </p>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 mb-4 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl hover:shadow-lg"
              >
                Abrir WhatsApp
              </a>
            )}
            <button
              onClick={() => {
                setRequestSent(false);
                setLicensePlate("");
                setVehicleInfo(null);
                setPartDescription("");
                setCustomerEmail("");
                setCustomerPhone("");
                setWhatsappUrl("");
              }}
              className="px-6 py-3 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:shadow-lg"
            >
              Nueva Búsqueda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex p-4 mb-6 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600">
            <Search className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
            ¿Necesitas un Repuesto?
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600">
            Ingresa el número de placa de tu vehículo para obtener información
            precisa y solicitar el repuesto correcto.
          </p>
        </div>

        {/* Search Form */}
        <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Número de Placa
            </label>
            <div className="flex space-x-4">
              <input
                type="text"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                placeholder="ABC123 o ABC1234"
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={8}
              />
              <button
                onClick={searchVehicle}
                disabled={isLoading}
                className="flex items-center px-6 py-3 space-x-2 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span>Buscar</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center p-4 mb-6 space-x-2 text-red-600 bg-red-50 rounded-xl">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Vehicle Information */}
        {vehicleInfo && (
          <div className="p-8 mb-8 bg-white shadow-xl rounded-2xl">
            <div className="flex items-center mb-6 space-x-3">
              <Car className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold text-slate-900">
                Información del Vehículo
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
              <div>
                <label className="block mb-1 text-sm font-semibold text-slate-700">
                  Placa
                </label>
                <p className="text-lg font-semibold text-slate-900">
                  {licensePlate}
                </p>
              </div>
              {vehicleInfo.CarMake && (
                <div>
                  <label className="block mb-1 text-sm font-semibold text-slate-700">
                    Marca
                  </label>
                  <p className="text-lg text-slate-900">
                    {vehicleInfo.CarMake}
                  </p>
                </div>
              )}
              {vehicleInfo.CarModel && (
                <div>
                  <label className="block mb-1 text-sm font-semibold text-slate-700">
                    Modelo
                  </label>
                  <p className="text-lg text-slate-900">
                    {vehicleInfo.CarModel}
                  </p>
                </div>
              )}
              {vehicleInfo.RegistrationYear && (
                <div>
                  <label className="block mb-1 text-sm font-semibold text-slate-700">
                    Año
                  </label>
                  <p className="text-lg text-slate-900">
                    {vehicleInfo.RegistrationYear}
                  </p>
                </div>
              )}
              {vehicleInfo.FuelType && (
                <div>
                  <label className="block mb-1 text-sm font-semibold text-slate-700">
                    Tipo de Motor
                  </label>
                  <p className="text-lg text-slate-900">
                    {vehicleInfo.FuelType}
                  </p>
                </div>
              )}
              {vehicleInfo.VehicleType && (
                <div>
                  <label className="block mb-1 text-sm font-semibold text-slate-700">
                    Tipo de Vehículo
                  </label>
                  <p className="text-lg text-slate-900">
                    {vehicleInfo.VehicleType}
                  </p>
                </div>
              )}
            </div>

            {/* Parts Request Form */}
            <div className="pt-8 border-t border-slate-200">
              <h3 className="mb-6 text-lg font-bold text-slate-900">
                Solicitar Repuesto
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-slate-700">
                    Descripción del Repuesto *
                  </label>
                  <textarea
                    value={partDescription}
                    onChange={(e) => setPartDescription(e.target.value)}
                    placeholder="Describe el repuesto que necesitas (ej: filtro de aceite, pastillas de freno delanteras, etc.)"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Email de Contacto
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                      Teléfono de Contacto
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+57 300 123 4567"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={submitRequest}
                  disabled={isLoading || !partDescription.trim()}
                  className="flex items-center justify-center w-full py-4 space-x-2 font-semibold text-white transition-all duration-200 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl hover:shadow-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Car className="w-5 h-5" />
                  )}
                  <span>Enviar Solicitud</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
          <h2 className="mb-6 text-xl font-bold text-center text-slate-900">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-3 font-bold text-white bg-blue-500 rounded-full">
                1
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Busca tu Vehículo
              </h3>
              <p className="text-sm text-slate-600">
                Ingresa tu placa para obtener información del RUNT
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-3 font-bold text-white bg-blue-500 rounded-full">
                2
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Describe el Repuesto
              </h3>
              <p className="text-sm text-slate-600">
                Especifica qué repuesto necesitas para tu vehículo
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 mx-auto mb-3 font-bold text-white bg-blue-500 rounded-full">
                3
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Recibe tu Cotización
              </h3>
              <p className="text-sm text-slate-600">
                Te contactamos con precio y disponibilidad
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
