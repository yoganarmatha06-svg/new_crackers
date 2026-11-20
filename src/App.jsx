import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import About from './pages/About';
import QuickShopping from './pages/QuickShopping';
import PriceList from './pages/PriceList';
import Contact from './pages/Contact';
import { CartProvider, useCart } from './context/CartContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import './global.css';

// Scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Global Floating Toast
const GlobalToast = () => {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="toast-container no-print">
      <div className={`toast toast-${toast.type || 'success'}`}>
        {toast.type === 'info' ? (
          <Info size={20} color="#38bdf8" />
        ) : toast.type === 'error' ? (
          <AlertCircle size={20} color="#ef4444" />
        ) : (
          <CheckCircle2 size={20} color="#34d399" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="app-layout">
          {/* Main Top Navigation */}
          <Navbar />

          {/* Main Page Routing */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/quick-shopping" element={<QuickShopping />} />
              <Route path="/price-list" element={<PriceList />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Persistent Footer */}
          <Footer />

          {/* Global Interactive Elements */}
          <CartDrawer />
          <GlobalToast />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
