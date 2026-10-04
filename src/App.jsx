import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { PRODUCTS, CATEGORIES } from "./data/products";
import { priceFor } from "./utils/format";

import TopUtilityBar from "./components/TopUtilityBar";
import TrustStrip from "./components/TrustStrip";
import Ornament from "./components/Ornament";
import OccasionShowcase from "./components/OccasionShowcase";
import FeaturedSpotlight from "./components/FeaturedSpotlight";
import VisitUs from "./components/VisitUs";
import BottomBar from "./components/BottomBar";
import Lightbox from "./components/Lightbox";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/Hero";
import CategoryShowcase from "./components/CategoryShowcase";
import Catalog from "./components/Catalog";
import GoldRateSection from "./components/GoldRateSection";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import AppointmentModal from "./components/AppointmentModal";
import ToastStack from "./components/ToastStack";
import { useLang } from "./i18n/LanguageContext";

// Search matches English and Telugu names/categories, so a query in either
// script finds the same piece regardless of the language currently shown.
function matchesSearch(product, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const cat = CATEGORIES.find((c) => c.key === product.category);
  const haystack = [product.name.en, product.name.te, product.category, cat?.label.en, cat?.label.te]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export default function App() {
  const { lang } = useLang();

  // navigation / layout
  const [mobileOpen, setMobileOpen] = useState(false);

  // catalogue state
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMetal, setActiveMetal] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");

  // commerce state
  const [cart, setCart] = useState([]); // {id, purity, qty}
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState(null); // product id
  const [quickViewPurity, setQuickViewPurity] = useState(22);
  const [lightbox, setLightbox] = useState(null); // full-screen photo {src, alt, rect, title, subtitle}

  // appointment modal
  const [apptOpen, setApptOpen] = useState(false);
  const [apptForm, setApptForm] = useState({ name: "", phone: "", date: "" });
  const [apptDone, setApptDone] = useState(false);

  // toasts — stored as translation keys so they follow the language toggle
  const [toasts, setToasts] = useState([]);

  const catalogRef = useRef(null);

  /* ---------------- effects ---------------- */

  // Sections fade up as they scroll into view. The hidden starting state is
  // only switched on once this runs (the "reveal-ready" class), so the page
  // still shows everything if JavaScript is slow or the observer is missing.
  useEffect(() => {
    const root = document.querySelector(".vj-root");
    if (!root || !("IntersectionObserver" in window)) return;
    root.classList.add("reveal-ready");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    root.querySelectorAll(".vj-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ---------------- derived ---------------- */


  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const catOk = activeCategory === "All" || p.category === activeCategory;
      const metalOk = activeMetal === "All" || p.metal === activeMetal;
      return catOk && metalOk && matchesSearch(p, searchTerm);
    });
    if (sortBy === "priceAsc") list = [...list].sort((a, b) => a.base22 - b.base22);
    if (sortBy === "priceDesc") list = [...list].sort((a, b) => b.base22 - a.base22);
    if (sortBy === "newest") list = [...list].sort((a, b) => b.id - a.id);
    return list;
  }, [activeCategory, activeMetal, sortBy, searchTerm]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const cartTotal = cart.reduce((s, c) => {
    const p = PRODUCTS.find((pp) => pp.id === c.id);
    return s + priceFor(p, c.purity) * c.qty;
  }, 0);

  /* ---------------- handlers ---------------- */

  const addToast = useCallback((key, vars) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, key, vars }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  }, []);

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
    addToast("toast.added", { name: product.name });
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

  function goVisit() {
    document.getElementById("visit-section")?.scrollIntoView({ behavior: "smooth" });
  }

  function goCategories() {
    document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goHeritage() {
    document.getElementById("heritage-section")?.scrollIntoView({ behavior: "smooth" });
  }

  function submitAppointment(e) {
    e.preventDefault();
    if (!apptForm.name || !apptForm.phone || !apptForm.date) {
      addToast("toast.apptIncomplete");
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
    <div className="vj-root pb-16 md:pb-0" data-lang={lang}>
      <TopUtilityBar />

      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
        onOpenMobileMenu={() => setMobileOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onGoCollections={() => scrollToCatalog("All")}
        onGoBridal={() => scrollToCatalog("Bridal Set")}
        onGoRates={goRates}
        onGoHeritage={goHeritage}
        onGoVisit={goVisit}
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
        onGoVisit={goVisit}
        onBookVisit={() => setApptOpen(true)}
      />

      <Hero />

      <TrustStrip />

      <div className="vj-reveal">
        <CategoryShowcase onSelectCategory={(key) => scrollToCatalog(key)} />
      </div>

      <div className="vj-reveal">
        <OccasionShowcase onSelect={(key) => scrollToCatalog(key)} />
      </div>

      <div className="vj-reveal">
        <FeaturedSpotlight onExplore={(key) => scrollToCatalog(key)} />
      </div>

      <Ornament className="pt-2" />

      <div className="vj-reveal">
      <Catalog
        ref={catalogRef}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeMetal={activeMetal}
        setActiveMetal={setActiveMetal}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredProducts={filteredProducts}
        onQuickView={openQuickView}
        onAddToCart={(product) => addToCart(product, 22)}
        onViewImage={setLightbox}
        onBackToCategories={() => {
          setActiveCategory("All");
          document.getElementById("categories-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />
      </div>

      <div className="vj-reveal">
      <GoldRateSection />
      </div>

      <div className="vj-reveal">
        <WhyUs onExplore={goCategories} />
      </div>

      <div className="vj-reveal">
        <Testimonials />
      </div>

      <div className="vj-reveal">
        <VisitUs onBookVisit={() => setApptOpen(true)} />
      </div>

      <div className="vj-reveal">
        <Newsletter />
      </div>

      <Footer
        onSelectCategory={(key) => scrollToCatalog(key)}
        onBookVisit={() => setApptOpen(true)}
        onGoVisit={goVisit}
        onGoRates={goRates}
      />

      <BottomBar
        cartCount={cartCount}
        onHome={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onCategories={goCategories}
        onRates={goRates}
        onBag={() => setCartOpen(true)}
        onVisit={goVisit}
      />

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
        onViewImage={setLightbox}
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

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />

      <ToastStack toasts={toasts} />
    </div>
  );
}
