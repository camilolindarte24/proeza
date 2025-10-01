import { BrowserRouter as Router, Routes, Route } from "react-router";
import Header from "@/react-app/components/Header";
import Footer from "@/react-app/components/Footer";
import WhatsAppButton from "@/react-app/components/WhatsAppButton";
import HomePage from "@/react-app/pages/Home";
import PartsSearchPage from "@/react-app/pages/PartsSearch";
import StorePage from "@/react-app/pages/Store";
import EnthusiastsPage from "@/react-app/pages/Enthusiasts";
import WorkshopsPage from "@/react-app/pages/Workshops";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/repuestos" element={<PartsSearchPage />} />
            <Route path="/tienda" element={<StorePage />} />
            <Route path="/entusiastas" element={<EnthusiastsPage />} />
            <Route path="/talleres" element={<WorkshopsPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}
