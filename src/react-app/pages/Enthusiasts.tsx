import { useState } from "react";
import { Heart, Shirt, Gamepad2, Wrench, Gift, ShoppingCart, Star } from "lucide-react";

const categories = [
  { id: "ropa", name: "Ropa", icon: Shirt, color: "from-purple-500 to-pink-600" },
  { id: "coleccionables", name: "Coleccionables", icon: Gift, color: "from-blue-500 to-indigo-600" },
  { id: "gadgets", name: "Gadgets", icon: Gamepad2, color: "from-green-500 to-emerald-600" },
  { id: "motores", name: "Motores a Escala", icon: Wrench, color: "from-red-500 to-rose-600" },
];

const featuredProducts = [
  {
    id: 1,
    name: "Camiseta Vintage Racing",
    description: "Camiseta de algodón premium con diseños clásicos de carreras",
    category: "ropa",
    price: 65000,
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Modelo Porsche 911 GT3",
    description: "Réplica a escala 1:18 del icónico Porsche 911 GT3",
    category: "coleccionables",
    price: 180000,
    image_url: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "OBD2 Scanner Bluetooth",
    description: "Escáner OBD2 con conectividad Bluetooth para diagnósticos",
    category: "gadgets",
    price: 125000,
    image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Motor V8 Funcional Escala",
    description: "Motor V8 a escala funcional con todos los componentes móviles",
    category: "motores",
    price: 450000,
    image_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",
    rating: 5.0,
    reviews: 23,
  },
  {
    id: 5,
    name: "Sudadera McLaren F1",
    description: "Sudadera oficial del equipo McLaren Fórmula 1",
    category: "ropa",
    price: 195000,
    image_url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 78,
  },
  {
    id: 6,
    name: "Set Autos Clásicos Die-Cast",
    description: "Colección de 5 autos clásicos en metal die-cast",
    category: "coleccionables",
    price: 320000,
    image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 92,
  },
];

export default function Enthusiasts() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ropa");

  const filteredProducts = featuredProducts.filter(product => 
    selectedCategory === "all" || product.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 mb-6">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
            Amantes de los Carros
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Para los verdaderos apasionados por los autos. Ropa, coleccionables y gadgets únicos.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Categorías</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                  : "bg-white text-slate-700 hover:bg-slate-50 shadow-md"
              }`}
            >
              Todos los Productos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : "bg-white text-slate-700 hover:bg-slate-50 shadow-md"
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 md:p-12 text-white mb-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Poppins']">
                Colección Exclusiva 2024
              </h2>
              <p className="text-xl text-purple-100 mb-6">
                Descubre nuestra línea premium de productos para entusiastas. 
                Desde ropa de alta calidad hasta réplicas de colección.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                  Edición Limitada
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                  Envío Gratis
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold">
                  Garantía Premium
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedCategory === "all" 
                ? "Todos los Productos" 
                : categories.find(c => c.id === selectedCategory)?.name || "Productos"
              }
            </h2>
            <p className="text-slate-600">
              {filteredProducts.length} productos encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-slate-700">
                      {product.rating}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-2 py-1 rounded-full">
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-teal-600">
                        ${product.price.toLocaleString('es-CO')}
                      </p>
                      <p className="text-sm text-slate-500">
                        {product.reviews} reseñas
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-slate-500 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Únete a la Comunidad
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Conecta con otros entusiastas, comparte tus proyectos y descubre las últimas tendencias
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Eventos Exclusivos</h3>
              <p className="text-slate-600">
                Accede a eventos y encuentros para entusiastas
              </p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Productos Exclusivos</h3>
              <p className="text-slate-600">
                Primero en acceder a lanzamientos y ediciones limitadas
              </p>
            </div>
            
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Descuentos VIP</h3>
              <p className="text-slate-600">
                Descuentos especiales y beneficios para miembros
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
