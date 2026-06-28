# Padmavathi Jewellery

A dynamic jewellery e-commerce front end built with React + Vite + Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  data/products.js        Catalog, categories, testimonials, rates, stats
  utils/format.js         Price formatting + purity-based price calculation
  hooks/useCountUp.js      Animated count-up hook (stats section)
  hooks/useInView.js       IntersectionObserver hook (triggers count-up)
  components/
    AnnouncementBar.jsx    Rotating top banner
    TopUtilityBar.jsx      Gold rate marquee + city selector + contact
    Header.jsx             Logo, nav, search, wishlist/cart icons
    MobileMenu.jsx         Slide-in mobile nav
    Hero.jsx               Hero banner with CTAs
    CategoryShowcase.jsx   Horizontal scroll of category icons
    JewelGlyph.jsx         Hand-drawn line-art icon per jewellery category
    Catalog.jsx            Filters, sort, and product grid
    ProductCard.jsx         Single product card
    GoldRateSection.jsx    Live gold/platinum/silver rate cards
    HeritageStats.jsx      Animated stat counters
    StatCard.jsx           Single stat counter card
    Testimonials.jsx       Auto-rotating testimonial carousel
    Newsletter.jsx         Email signup with validation
    Footer.jsx             Site footer
    CartDrawer.jsx         Slide-in shopping bag
    QuickViewModal.jsx     Product quick view with purity selector
    AppointmentModal.jsx   "Book a visit" form + confirmation
    ToastStack.jsx         Bottom-right toast notifications
  App.jsx                  Composes all sections, owns shared state
  main.jsx                 React root
  index.css                Tailwind directives + brand design tokens/animations
```

## Notes

- All product data, prices, and gold rates are placeholder/illustrative — replace
  `src/data/products.js` with real data when connecting to a backend.
- "Add to bag" routes to a callback-request flow rather than real checkout, matching
  how most fine-jewellery retailers handle high-value purchases. Swap in real payment
  /checkout logic in `CartDrawer.jsx` and `App.jsx` if you want a direct purchase flow.
- Styling uses Tailwind for layout/spacing and CSS custom properties (defined in
  `index.css` under `.vj-root`) for the brand's vibrant multi-gemstone palette
  (ruby, emerald, sapphire, amethyst, gold on a cream base) and custom motifs
  (temple-arch shapes, marquee, fade transitions).
