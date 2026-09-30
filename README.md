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
  data/products.js        Catalog, categories, testimonials, rates, stats (bilingual { en, te } text)
  i18n/strings.js         Every interface string in English and Telugu
  i18n/LanguageContext.jsx  Language provider: lang, toggleLang, t(key, vars), tx({en,te})
  utils/format.js         Price/weight formatting + purity-based price calculation
  hooks/useCountUp.js      Animated count-up hook (stats section)
  hooks/useInView.js       IntersectionObserver hook (triggers count-up)
  components/
    AnnouncementBar.jsx    Rotating top banner
    TopUtilityBar.jsx      (unused) Gold rate marquee + city selector + contact
    Header.jsx             Wordmark, nav, search, EN/తె language toggle, bag icon
    LanguageToggle.jsx     EN | తె switch (saved in the browser, restored on reload)
    MobileMenu.jsx         Slide-in mobile nav
    Hero.jsx               Full-width hero wrapper
    HeroImageCarousel.jsx  Hero slides: logo + temple-gold necklace, poster, two gem illustrations
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

## Language (English / Telugu)

The EN | తె toggle in the header switches every piece of text on the site. The
choice is saved in the browser and restored on the next visit, and the page's
`lang` attribute and title update with it.

- Interface text lives in `src/i18n/strings.js`, one key per string, with an
  `en` and a `te` value. Components call `t("key")`, or `t("key", { name })`
  when the string has placeholders.
- Record text (product names and descriptions, categories, cities,
  testimonials, announcements, stats) sits beside each record in
  `src/data/products.js` as `{ en: "...", te: "..." }`, read with `tx(value)`.
- Search matches both English and Telugu names in either mode.
- Telugu uses Noto Sans Telugu / Noto Serif Telugu, loaded in `index.html`.
  Letter-spacing is turned off in Telugu mode so conjuncts render correctly.

To add a string, add the key to both `en` and `te` in `strings.js`. A missing
Telugu key falls back to the English text.

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
