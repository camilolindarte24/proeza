import { useState, useEffect } from "react";
import { Car, Droplets, Sparkles, Wrench, Filter, ShoppingCart } from "lucide-react";
import type { Product } from "@/shared/types";

const categories = [
  { id: "aceites", name: "Aceites de Motor", icon: Droplets, color: "from-amber-500 to-orange-600" },
  { id: "lubricantes", name: "Lubricantes", icon: Droplets, color: "from-blue-500 to-indigo-600" },
  { id: "limpiadores", name: "Limpiadores", icon: Sparkles, color: "from-green-500 to-emerald-600" },
  { id: "herramientas", name: "Herramientas", icon: Wrench, color: "from-purple-500 to-pink-600" },
  { id: "filtros", name: "Filtros", icon: Filter, color: "from-red-500 to-rose-600" },
  { id: "accesorios", name: "Accesorios", icon: Car, color: "from-slate-500 to-gray-600" },
];

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState<string>("aceites");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProducts(selectedCategory);
  }, [selectedCategory]);

  const loadProducts = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products?category=${category}&limit=12`);
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Sample products for demonstration
  const sampleProducts = [
    {
      id: 1,
      name: "Aceite Motor Castrol GTX 15W-40",
      description: "Aceite mineral para motores a gasolina y diesel",
      category: "aceites",
      price: 45000,
      image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      stock_quantity: 25,
    },
    {
      id: 2,
      name: "Aceite Mobil 1 5W-30 Sintético",
      description: "Aceite sintético de alta performance",
      category: "aceites",
      price: 85000,
      image_url: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=300&fit=crop",
      stock_quantity: 15,
    },
    {
      id: 3,
      name: "Limpiador de Motor Gunk",
      description: "Desengrasante potente para motor",
      category: "limpiadores",
      price: 22000,
      image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=300&fit=crop",
      stock_quantity: 30,
    },
  ];

  const displayProducts = products.length > 0 ? products : sampleProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-6">
            <Car className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
            Tienda Automotriz
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Productos de calidad para el cuidado y mantenimiento de tu vehículo
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-white shadow-lg border-2 border-blue-500"
                    : "bg-white/70 hover:bg-white shadow-md hover:shadow-lg"
                }`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} mb-3 mx-auto`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm text-center">
                  {category.name}
                </h3>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              {categories.find(c => c.id === selectedCategory)?.name || "Productos"}
            </h2>
            {isLoading && (
              <div className="text-slate-500">Cargando productos...</div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=300&fit=crop"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-teal-600">
                        ${product.price?.toLocaleString('es-CO') || 'Consultar'}
                      </p>
                      <p className="text-xs text-slate-500">
                        Stock: {product.stock_quantity || 0}
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            ¿Por qué comprar en Proeza Automotriz?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Calidad Garantizada</h3>
              <p className="text-slate-600">
                Solo productos de marcas reconocidas y con garantía de fábrica
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Envío Rápido</h3>
              <p className="text-slate-600">
                Entrega a domicilio en toda Colombia en 24-48 horas
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 mb-4">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Asesoría Experta</h3>
              <p className="text-slate-600">
                Nuestros técnicos te ayudan a elegir el producto correcto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
