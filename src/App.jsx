import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { PRODUCTS, CITIES } from "./data/products";
import { priceFor } from "./utils/format";

import AnnouncementBar from "./components/AnnouncementBar";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/Hero";
import CategoryShowcase from "./components/CategoryShowcase";
import Catalog from "./components/Catalog";
import GoldRateSection from "./components/GoldRateSection";
import HeritageStats from "./components/HeritageStats";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import AppointmentModal from "./components/AppointmentModal";
import ToastStack from "./components/ToastStack";

export default function App() {
  // navigation / layout
  const [mobileOpen, setMobileOpen] = useState(false);

  // catalogue state
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMetal, setActiveMetal] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");

  // commerce state
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState([]); // {id, purity, qty}
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState(null); // product id
  const [quickViewPurity, setQuickViewPurity] = useState(22);

  // gold rate
  const [city, setCity] = useState(CITIES[0].name);
  const [rates, setRates] = useState({ k22: 8250, k24: 9000, platinum: 3450, silver: 98 });
  const [rateDrift, setRateDrift] = useState({ k22: 0, k24: 0 });
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // appointment modal
  const [apptOpen, setApptOpen] = useState(false);
  const [apptForm, setApptForm] = useState({ name: "", phone: "", date: "" });
  const [apptDone, setApptDone] = useState(false);

  // toasts
  const [toasts, setToasts] = useState([]);

  const catalogRef = useRef(null);

  /* ---------------- effects ---------------- */

  useEffect(() => {
    const id = setInterval(() => {
      setRates((r) => {
        const dK22 = Math.round((Math.random() - 0.5) * 16);
        const dK24 = Math.round((Math.random() - 0.5) * 18);
        setRateDrift({ k22: dK22, k24: dK24 });
        return {
          k22: Math.max(7800, r.k22 + dK22),
          k24: Math.max(8500, r.k24 + dK24),
          platinum: r.platinum,
          silver: r.silver,
        };
      });
      setLastUpdated(new Date());
    }, 5000);
    return () => clearInterval(id);
  }, []);

  /* ---------------- derived ---------------- */

  const cityOffset = CITIES.find((c) => c.name === city)?.offset || 0;
  const displayRate22 = rates.k22 + cityOffset;
  const displayRate24 = rates.k24 + cityOffset;

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const catOk = activeCategory === "All" || p.category === activeCategory;
      const metalOk = activeMetal === "All" || p.metal === activeMetal;
      const searchOk =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      return catOk && metalOk && searchOk;
    });
    if (sortBy === "Price: Low to High") list = [...list].sort((a, b) => a.base22 - b.base22);
    if (sortBy === "Price: High to Low") list = [...list].sort((a, b) => b.base22 - a.base22);
    if (sortBy === "Newest") list = [...list].sort((a, b) => b.id - a.id);
    return list;
  }, [activeCategory, activeMetal, sortBy, searchTerm]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => {
    const p = PRODUCTS.find((pp) => pp.id === c.id);
    return s + priceFor(p, c.purity) * c.qty;
  }, 0);

  /* ---------------- handlers ---------------- */

  const addToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

  function toggleWishlist(id) {
    setWishlist((w) => {
      const next = new Set(w);
      if (next.has(id)) {
        next.delete(id);
        addToast("Removed from wishlist");
      } else {
        next.add(id);
        addToast("Saved to wishlist");
      }
      return next;
    });
  }

  function openQuickView(product) {
    setQuickView(product.id);
    setQuickViewPurity(22);
  }

  function addToCart(product, purity, qty = 1) {
    setCart((c) => {
      const existing = c.find((x) => x.id === product.id && x.purity === purity);
      if (existing) {
        return c.map((x) => (x === existing ? { ...x, qty: x.qty + qty } : x));
      }
      return [...c, { id: product.id, purity, qty }];
    });
    addToast(`${product.name} added to your bag`);
  }

  function updateQty(id, purity, delta) {
    setCart((c) =>
      c
        .map((x) => (x.id === id && x.purity === purity ? { ...x, qty: x.qty + delta } : x))
        .filter((x) => x.qty > 0)
    );
  }

  function scrollToCatalog(category) {
    if (category) setActiveCategory(category);
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goRates() {
    document.getElementById("rates-section")?.scrollIntoView({ behavior: "smooth" });
  }

  function goHeritage() {
    document.getElementById("heritage-section")?.scrollIntoView({ behavior: "smooth" });
  }

  function submitAppointment(e) {
    e.preventDefault();
    if (!apptForm.name || !apptForm.phone || !apptForm.date) {
      addToast("Please fill every field to confirm a visit");
      return;
    }
    setApptDone(true);
  }

  function closeAppointment() {
    setApptOpen(false);
    setApptDone(false);
  }

  function finishAppointment() {
    setApptOpen(false);
    setApptDone(false);
    setApptForm({ name: "", phone: "", date: "" });
  }

  const quickViewProduct = PRODUCTS.find((p) => p.id === quickView);

  /* ---------------- render ---------------- */

  return (
    <div className="vj-root">
      <AnnouncementBar />

      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        wishlistCount={wishlist.size}
        cartCount={cartCount}
        onOpenMobileMenu={() => setMobileOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onWishlistClick={() => addToast(wishlist.size ? `${wishlist.size} piece${wishlist.size > 1 ? "s" : ""} saved` : "Your wishlist is empty")}
        onGoCollections={() => scrollToCatalog("All")}
        onGoBridal={() => scrollToCatalog("Bridal Set")}
        onGoRates={goRates}
        onGoHeritage={goHeritage}
        onBookVisit={() => setApptOpen(true)}
      />

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onGoCollections={() => scrollToCatalog("All")}
        onGoBridal={() => scrollToCatalog("Bridal Set")}
        onGoRates={goRates}
        onGoHeritage={goHeritage}
        onBookVisit={() => setApptOpen(true)}
      />

      <Hero onExplore={() => scrollToCatalog("All")} onBookVisit={() => setApptOpen(true)} />

      <CategoryShowcase onSelectCategory={(key) => scrollToCatalog(key)} />

      <Catalog
        ref={catalogRef}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeMetal={activeMetal}
        setActiveMetal={setActiveMetal}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredProducts={filteredProducts}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
        onQuickView={openQuickView}
      />

      <GoldRateSection
        city={city}
        setCity={setCity}
        displayRate22={displayRate22}
        displayRate24={displayRate24}
        rates={rates}
        rateDrift={rateDrift}
        lastUpdated={lastUpdated}
      />

      <HeritageStats />

      <Testimonials />

      <Newsletter />

      <Footer onSelectCategory={(key) => scrollToCatalog(key)} onBookVisit={() => setApptOpen(true)} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        cartTotal={cartTotal}
        onCheckoutRequest={() => {
          setCartOpen(false);
          setApptOpen(true);
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        purity={quickViewPurity}
        setPurity={setQuickViewPurity}
        onClose={() => setQuickView(null)}
        onAddToCart={(product, purity) => {
          addToCart(product, purity);
          setQuickView(null);
        }}
      />

      <AppointmentModal
        open={apptOpen}
        form={apptForm}
        setForm={setApptForm}
        done={apptDone}
        onClose={closeAppointment}
        onSubmit={submitAppointment}
        onDoneClose={finishAppointment}
      />

      <ToastStack toasts={toasts} />
    </div>
  );
}
