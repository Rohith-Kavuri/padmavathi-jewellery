import { Search, Heart, ShoppingBag, Menu } from "lucide-react";

export default function Header({
  searchTerm,
  setSearchTerm,
  wishlistCount,
  cartCount,
  onOpenMobileMenu,
  onOpenCart,
  onWishlistClick,
  onGoCollections,
  onGoBridal,
  onGoRates,
  onGoHeritage,
  onBookVisit,
}) {
  return (
    <header style={{ background: "var(--cream)", borderBottom: "1px solid var(--line)" }} className="sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <div className="flex items-center gap-3">
          <button className="md:hidden vj-focus" onClick={onOpenMobileMenu} aria-label="Open menu">
            <Menu size={22} />
          </button>
          <div>
            <div
              className="vj-display text-2xl md:text-3xl"
              style={{ letterSpacing: "0.04em", color: "var(--plum-900)", fontWeight: 600 }}
            >
              PADMAVATHI
            </div>
            <div className="vj-mono text-[10px] tracking-widest" style={{ color: "var(--gold-700)", marginTop: -4 }}>
              JEWELLERY · EST. 1971
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: "var(--ink)" }}>
          <button className="vj-underline vj-focus" onClick={onGoCollections}>
            Collections
          </button>
          <button className="vj-underline vj-focus" onClick={onGoBridal}>
            Bridal
          </button>
          <button className="vj-underline vj-focus" onClick={onGoRates}>
            Gold Rates
          </button>
          <button className="vj-underline vj-focus" onClick={onGoHeritage}>
            Heritage
          </button>
          <button className="vj-underline vj-focus" onClick={onBookVisit}>
            Book a Visit
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center border rounded-full px-3 py-1.5" style={{ borderColor: "var(--line)" }}>
            <Search size={15} style={{ color: "var(--gold-700)" }} />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jewellery"
              className="vj-focus bg-transparent border-none outline-none text-sm ml-2 w-36"
            />
          </div>
          <button className="relative vj-focus" onClick={onWishlistClick} aria-label="Wishlist">
            <Heart
              size={20}
              fill={wishlistCount ? "var(--ruby-500)" : "none"}
              style={{ color: wishlistCount ? "var(--ruby-500)" : "var(--ink)" }}
            />
            {wishlistCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: "var(--plum-900)", color: "var(--gold-100)" }}
              >
                {wishlistCount}
              </span>
            )}
          </button>
          <button className="relative vj-focus" onClick={onOpenCart} aria-label="Bag">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
                style={{ background: "var(--plum-900)", color: "var(--gold-100)" }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
