// All interface text, in English and Telugu. Content that belongs to a
// specific record (product names, testimonials, cities…) lives next to that
// record in src/data/products.js as { en, te } pairs instead.
//
// Placeholders in {braces} are filled in by t(key, vars).

export const STRINGS = {
  en: {
    "meta.title": "Padmavathi Jewellery",

    // brand
    "brand.name": "PADMAVATHI",
    "brand.sub": "JEWELLERY · EST. 1971",

    // navigation
    "nav.collections": "Collections",
    "nav.bridal": "Bridal",
    "nav.rates": "Gold Rates",
    "nav.heritage": "Heritage",
    "nav.book": "Book a Visit",
    "search.placeholder": "Search jewellery",
    "search.aria": "Search jewellery",
    "aria.openMenu": "Open menu",
    "aria.closeMenu": "Close menu",
    "aria.bag": "Bag",
    "aria.close": "Close",

    // language toggle
    "lang.switchTo": "Switch to Telugu",
    "lang.current": "English",

    // hero
    "hero.tagline": "Timeless Beauty · Trusted Forever",
    "hero.necklaceCaption": "TEMPLE GOLD COLLECTION",
    "hero.alt.logo": "Padmavathi Jewellery logo",
    "hero.alt.necklace": "Temple gold necklace with Lakshmi motif and gold pearls",
    "hero.caption.poster": "Our Collections",
    "hero.alt.poster": "Padmavathi collections poster — temple gold, sterling silver, diamond and gemstone collections",
    "hero.alt.templeJewellery": "Temple Jewellery — three temple gold necklaces on velvet busts",
    "hero.alt.designerNecklaces": "Designer Necklaces — diamond and gemstone necklaces on black velvet busts",
    "hero.caption.sapphire": "Sapphire Drops · Cut for Candlelight",
    "hero.caption.amethyst": "Amethyst Bangles · Everyday Heirlooms",
    "aria.prevImage": "Previous image",
    "aria.nextImage": "Next image",
    "aria.goToSlide": "Go to slide {n}",

    // categories + catalogue
    "category.heading": "Shop by gemstone and category",
    "catalog.title": "The collection",
    "catalog.count.one": "{count} piece",
    "catalog.count.other": "{count} pieces",
    "catalog.all": "All",
    "catalog.sortAria": "Sort products",
    "sort.featured": "Featured",
    "sort.priceAsc": "Price: Low to High",
    "sort.priceDesc": "Price: High to Low",
    "sort.newest": "Newest",
    "catalog.empty.title": "Nothing matches yet",
    "catalog.empty.body": "Try a different category, metal, or clear the search.",
    "metal.All": "All",
    "metal.Gold": "Gold",
    "metal.Diamond": "Diamond",
    "metal.Platinum": "Platinum",
    "metal.Silver": "Silver",
    "tag.Bestseller": "Bestseller",
    "tag.New": "New",
    "unit.g": "g",
    "card.quickView": "Quick view",

    // quick view
    "quickview.video": "{name} video",
    "quickview.purity": "Purity",
    "quickview.add": "Add to bag",
    "aria.prev": "Previous",
    "aria.next": "Next",
    "aria.showImage": "Show image",
    "aria.showVideo": "Show video",

    // bag
    "cart.title": "Your bag",
    "cart.closeAria": "Close bag",
    "cart.empty": "Nothing here yet. Add a piece from the collection.",
    "cart.decrease": "Decrease quantity",
    "cart.increase": "Increase quantity",
    "cart.total": "Estimated total",
    "cart.cta": "Request a callback to finalise",
    "cart.note": "High-value pieces are confirmed in showroom, with hallmarking shown in person.",

    // appointment
    "appt.title": "Book a private visit",
    "appt.name": "Full name",
    "appt.phone": "Mobile number",
    "appt.date": "Preferred date",
    "appt.submit": "Confirm visit",
    "appt.done.title": "Visit booked",
    "appt.done.body": "We'll call {phone} to confirm a showroom near you for {date}.",
    "appt.done.dateFallback": "your chosen date",
    "appt.done.button": "Done",

    // toasts
    "toast.apptIncomplete": "Please fill every field to confirm a visit",
    "toast.added": "{name} added to your bag",

    // gold rates
    "rates.eyebrow": "TODAY'S RATE",
    "rates.title": "Gold & metal rates",
    "rates.body":
      "Indicative rates for {city}, updated through the day. Showroom prices include making charges and GST, shown separately at billing.",
    "rates.updated": "Updated {time}",
    "rates.cityAria": "Select city",
    "rates.k22": "22K Gold / g",
    "rates.k24": "24K Gold / g",
    "rates.platinum": "Platinum / g",
    "rates.silver": "Silver / g",

    // top ticker + trust strip
    "topbar.goldRate": "TODAY'S RATES",
    "trust.aria": "Our promises",
    "trust.bis": "100% BIS Hallmarked Gold",
    "trust.exchange": "Lifetime Exchange",
    "trust.cleaning": "Free Cleaning & Polishing",
    "trust.buyback": "Best Gold Buyback",
    "trust.packaging": "Premium Packaging",

    // heritage
    "heritage.eyebrow": "SINCE 1971",
    "heritage.title": "Built guild by guild, not factory by factory",
    "heritage.body":
      "Padmavathi began as a single workshop in Thanjavur. We still commission from the same nine artisan guilds today — each known for one craft: temple work, polki setting, filigree, enamel.",

    // testimonials
    "testimonials.prev": "Previous testimonial",
    "testimonials.next": "Next testimonial",
    "testimonials.rating": "Rated 5 out of 5",

    // newsletter
    "newsletter.title": "New collections, before they reach the showroom floor",
    "newsletter.body": "One email a month. Mostly Muhurat dates and new arrivals.",
    "newsletter.placeholder": "you@email.com",
    "newsletter.aria": "Email address",
    "newsletter.submit": "Subscribe",
    "newsletter.ok": "You're on the list.",
    "newsletter.error": "That doesn't look like an email address.",

    // footer
    "footer.about":
      "Fine jewellery, made by nine artisan guilds across South India, sold from 120 showrooms in three countries.",
    "footer.shop": "SHOP",
    "footer.company": "COMPANY",
    "footer.visit": "VISIT",
    "footer.aboutUs": "About Padmavathi",
    "footer.guilds": "Our artisan guilds",
    "footer.locator": "Showroom locator",
    "footer.careers": "Careers",
    "footer.book": "Book a private visit",
    "footer.copyright": "© 2026 Padmavathi Jewellery. A fictional brand built for demonstration.",
    "footer.legal": "Privacy · Terms · Hallmarking standards",
  },

  te: {
    "meta.title": "పద్మావతి జ్యువెలరీ",

    // brand
    "brand.name": "పద్మావతి",
    "brand.sub": "జ్యువెలరీ · స్థాపన 1971",

    // navigation
    "nav.collections": "కలెక్షన్లు",
    "nav.bridal": "పెళ్లి నగలు",
    "nav.rates": "బంగారం ధరలు",
    "nav.heritage": "మా వారసత్వం",
    "nav.book": "సందర్శన బుక్ చేయండి",
    "search.placeholder": "ఆభరణాలు వెతకండి",
    "search.aria": "ఆభరణాలు వెతకండి",
    "aria.openMenu": "మెనూ తెరవండి",
    "aria.closeMenu": "మెనూ మూసివేయండి",
    "aria.bag": "బ్యాగ్",
    "aria.close": "మూసివేయండి",

    // language toggle
    "lang.switchTo": "ఇంగ్లీష్‌కి మార్చండి",
    "lang.current": "తెలుగు",

    // hero
    "hero.tagline": "శాశ్వత సౌందర్యం · ఎప్పటికీ నమ్మకం",
    "hero.necklaceCaption": "టెంపుల్ గోల్డ్ కలెక్షన్",
    "hero.alt.logo": "పద్మావతి జ్యువెలరీ లోగో",
    "hero.alt.necklace": "లక్ష్మీదేవి రూపం, బంగారు ముత్యాలతో టెంపుల్ గోల్డ్ నెక్లెస్",
    "hero.caption.poster": "మా కలెక్షన్లు",
    "hero.alt.poster": "పద్మావతి కలెక్షన్ల పోస్టర్ — టెంపుల్ గోల్డ్, స్టెర్లింగ్ వెండి, వజ్రాలు, రత్నాల కలెక్షన్లు",
    "hero.alt.templeJewellery": "టెంపుల్ జ్యువెలరీ — వెల్వెట్ బొమ్మలపై మూడు టెంపుల్ గోల్డ్ నెక్లెస్‌లు",
    "hero.alt.designerNecklaces": "డిజైనర్ నెక్లెస్‌లు — నల్ల వెల్వెట్ బొమ్మలపై వజ్రాలు, రత్నాల నెక్లెస్‌లు",
    "hero.caption.sapphire": "నీలమణి లోలాకులు · దీపకాంతిలో మెరిసేలా",
    "hero.caption.amethyst": "అమెథిస్ట్ గాజులు · ప్రతిరోజూ ధరించే వారసత్వ నగలు",
    "aria.prevImage": "మునుపటి చిత్రం",
    "aria.nextImage": "తదుపరి చిత్రం",
    "aria.goToSlide": "స్లయిడ్ {n}కి వెళ్లండి",

    // categories + catalogue
    "category.heading": "రత్నాలు, రకాల వారీగా షాపింగ్ చేయండి",
    "catalog.title": "మా కలెక్షన్",
    "catalog.count.one": "{count} ఆభరణం",
    "catalog.count.other": "{count} ఆభరణాలు",
    "catalog.all": "అన్నీ",
    "catalog.sortAria": "ఆభరణాలను క్రమపరచండి",
    "sort.featured": "ప్రత్యేకమైనవి",
    "sort.priceAsc": "ధర: తక్కువ నుంచి ఎక్కువ",
    "sort.priceDesc": "ధర: ఎక్కువ నుంచి తక్కువ",
    "sort.newest": "సరికొత్తవి",
    "catalog.empty.title": "ఇంకా ఏవీ సరిపోలలేదు",
    "catalog.empty.body": "వేరే రకం లేదా లోహం ఎంచుకోండి, లేదా వెతుకులాటను తొలగించండి.",
    "metal.All": "అన్నీ",
    "metal.Gold": "బంగారం",
    "metal.Diamond": "వజ్రం",
    "metal.Platinum": "ప్లాటినం",
    "metal.Silver": "వెండి",
    "tag.Bestseller": "బెస్ట్‌సెల్లర్",
    "tag.New": "కొత్తది",
    "unit.g": " గ్రా.",
    "card.quickView": "త్వరిత వీక్షణ",

    // quick view
    "quickview.video": "{name} వీడియో",
    "quickview.purity": "స్వచ్ఛత",
    "quickview.add": "బ్యాగ్‌లో చేర్చండి",
    "aria.prev": "మునుపటి",
    "aria.next": "తదుపరి",
    "aria.showImage": "చిత్రం చూపించు",
    "aria.showVideo": "వీడియో చూపించు",

    // bag
    "cart.title": "మీ బ్యాగ్",
    "cart.closeAria": "బ్యాగ్ మూసివేయండి",
    "cart.empty": "ఇక్కడ ఇంకా ఏమీ లేదు. కలెక్షన్ నుంచి ఒక ఆభరణాన్ని చేర్చండి.",
    "cart.decrease": "పరిమాణం తగ్గించండి",
    "cart.increase": "పరిమాణం పెంచండి",
    "cart.total": "అంచనా మొత్తం",
    "cart.cta": "ఖరారు చేయడానికి కాల్‌బ్యాక్ కోరండి",
    "cart.note": "ఎక్కువ విలువైన ఆభరణాలను షోరూమ్‌లోనే ఖరారు చేస్తాం, హాల్‌మార్కింగ్ మీ ముందే చూపిస్తాం.",

    // appointment
    "appt.title": "ప్రైవేట్ సందర్శన బుక్ చేయండి",
    "appt.name": "పూర్తి పేరు",
    "appt.phone": "మొబైల్ నంబర్",
    "appt.date": "మీకు అనుకూలమైన తేదీ",
    "appt.submit": "సందర్శనను నిర్ధారించండి",
    "appt.done.title": "సందర్శన బుక్ అయింది",
    "appt.done.body": "{date} కోసం మీకు దగ్గరలోని షోరూమ్‌ను నిర్ధారించడానికి {phone} నంబర్‌కు కాల్ చేస్తాం.",
    "appt.done.dateFallback": "మీరు ఎంచుకున్న తేదీ",
    "appt.done.button": "సరే",

    // toasts
    "toast.apptIncomplete": "సందర్శన నిర్ధారించడానికి అన్ని వివరాలు నింపండి",
    "toast.added": "{name} మీ బ్యాగ్‌లో చేరింది",

    // gold rates
    "rates.eyebrow": "నేటి ధర",
    "rates.title": "బంగారం & లోహాల ధరలు",
    "rates.body":
      "{city} నగరానికి సూచిక ధరలు, రోజంతా అప్‌డేట్ అవుతాయి. షోరూమ్ ధరల్లో తయారీ ఛార్జీలు, GST ఉంటాయి — బిల్లులో వేరుగా చూపిస్తాం.",
    "rates.updated": "అప్‌డేట్: {time}",
    "rates.cityAria": "నగరం ఎంచుకోండి",
    "rates.k22": "22K బంగారం / గ్రా.",
    "rates.k24": "24K బంగారం / గ్రా.",
    "rates.platinum": "ప్లాటినం / గ్రా.",
    "rates.silver": "వెండి / గ్రా.",

    // top ticker + trust strip
    "topbar.goldRate": "నేటి ధరలు",
    "trust.aria": "మా హామీలు",
    "trust.bis": "100% BIS హాల్‌మార్క్ బంగారం",
    "trust.exchange": "జీవితకాల ఎక్స్ఛేంజ్",
    "trust.cleaning": "ఉచిత క్లీనింగ్ & పాలిషింగ్",
    "trust.buyback": "ఉత్తమ బంగారం బైబ్యాక్",
    "trust.packaging": "ప్రీమియం ప్యాకేజింగ్",

    // heritage
    "heritage.eyebrow": "1971 నుంచి",
    "heritage.title": "ఫ్యాక్టరీలతో కాదు, కళాకారుల సంఘాలతో నిర్మించినది",
    "heritage.body":
      "పద్మావతి తంజావూరులో ఒకే ఒక్క వర్క్‌షాప్‌గా ప్రారంభమైంది. ఈరోజుకీ అవే తొమ్మిది కళాకారుల సంఘాలతో నగలు చేయిస్తున్నాం — ఒక్కొక్కటి ఒక్కో కళకు ప్రసిద్ధి: టెంపుల్ వర్క్, పోల్కీ సెట్టింగ్, ఫిలిగ్రీ, ఎనామెల్.",

    // testimonials
    "testimonials.prev": "మునుపటి అభిప్రాయం",
    "testimonials.next": "తదుపరి అభిప్రాయం",
    "testimonials.rating": "5కి 5 రేటింగ్",

    // newsletter
    "newsletter.title": "కొత్త కలెక్షన్లు, షోరూమ్‌కి రాకముందే మీ కోసం",
    "newsletter.body": "నెలకు ఒక్క ఈమెయిల్. ఎక్కువగా ముహూర్తపు తేదీలు, కొత్త ఆభరణాలు.",
    "newsletter.placeholder": "you@email.com",
    "newsletter.aria": "ఈమెయిల్ చిరునామా",
    "newsletter.submit": "సబ్‌స్క్రైబ్ చేయండి",
    "newsletter.ok": "మీరు జాబితాలో చేరారు.",
    "newsletter.error": "ఇది సరైన ఈమెయిల్ చిరునామాలా లేదు.",

    // footer
    "footer.about":
      "దక్షిణ భారతదేశంలోని తొమ్మిది కళాకారుల సంఘాలు తయారుచేసిన నాణ్యమైన ఆభరణాలు, మూడు దేశాల్లోని 120 షోరూమ్‌లలో లభ్యం.",
    "footer.shop": "షాపింగ్",
    "footer.company": "సంస్థ",
    "footer.visit": "సందర్శన",
    "footer.aboutUs": "పద్మావతి గురించి",
    "footer.guilds": "మా కళాకారుల సంఘాలు",
    "footer.locator": "షోరూమ్ చిరునామాలు",
    "footer.careers": "ఉద్యోగాలు",
    "footer.book": "ప్రైవేట్ సందర్శన బుక్ చేయండి",
    "footer.copyright": "© 2026 పద్మావతి జ్యువెలరీ. ప్రదర్శన కోసం రూపొందించిన కల్పిత బ్రాండ్.",
    "footer.legal": "గోప్యత · నిబంధనలు · హాల్‌మార్కింగ్ ప్రమాణాలు",
  },
};
