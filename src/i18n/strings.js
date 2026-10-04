// All interface text, in English and Telugu. Content that belongs to a
// specific record (product names, testimonials, cities…) lives next to that
// record in src/data/products.js as { en, te } pairs instead.
//
// Placeholders in {braces} are filled in by t(key, vars).

export const STRINGS = {
  en: {
    "meta.title": "Padmavathi Jewellers",

    // brand
    "brand.name": "PADMAVATHI",

    // navigation
    "nav.collections": "Collections",
    "nav.bridal": "Bridal",
    "nav.rates": "Gold Rates",
    "nav.heritage": "Why Us",
    "nav.book": "Book a Visit",
    "nav.visit": "Visit Us",
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
    "hero.alt.logo": "Padmavathi Jewellers logo",
    "hero.alt.necklace": "Temple gold necklace with Lakshmi motif and gold pearls",
    "hero.alt.goddess": "Sri Padmavathi Ammavaru seated in a golden lotus",
    "hero.goddessCaption": "WITH THE BLESSINGS OF SRI PADMAVATHI",
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
    "category.heading": "Shop by category",
    "category.showMore": "Show more",
    "catalog.showMore": "Show {count} more",
    "catalog.backToCategories": "All categories",
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
      "Today's rates at our showroom, per gram. Final prices include making charges and GST, shown separately on your bill.",
    "rates.updated": "Updated on {date}",
    "rates.cityAria": "Select city",
    "rates.k22": "22K Gold / g",
    "rates.k24": "24K Gold / g",
    "rates.k18": "18K Gold / g",
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

    // occasions, visit us, bottom bar
    "occasion.heading": "Shop by occasion",
    "occasion.explore": "Explore",
    "visit.eyebrow": "VISIT US",
    "visit.title": "Visit our showroom",
    "visit.directions": "Get directions",
    "visit.whatsapp": "WhatsApp us",
    "visit.mapTitle": "Map showing our showroom",
    "footer.tagline": "Crafted with devotion. Made for generations.",
    "footer.help": "HELP",
    "footer.follow": "Follow us",
    "bottom.aria": "Quick links",
    "bottom.home": "Home",
    "bottom.categories": "Categories",
    "bottom.rates": "Gold rate",
    "bottom.bag": "Bag",
    "bottom.whatsapp": "WhatsApp",
    "bottom.visit": "Visit",
    "aria.whatsapp": "Chat with us on WhatsApp",
    "social.whatsapp": "Chat on WhatsApp",
    "social.instagram": "Follow on Instagram",
    "social.youtube": "Watch on YouTube",
    "social.facebook": "Follow on Facebook",
    "lightbox.view": "View larger photo of {name}",
    "lightbox.tapToZoom": "Tap to zoom",
    "lightbox.zoomIn": "Zoom in",
    "lightbox.zoomOut": "Zoom out",
    "lightbox.hintDesktop": "Click or scroll to zoom · move the mouse to look around · Esc to close",
    "lightbox.hintPhone": "Pinch or double-tap to zoom · swipe down to close",

    // catalogue
    "nav.catalogue": "Catalogue",
    "catalogue.eyebrow": "OUR CATALOGUE",
    "catalogue.title": "Take the collection home",
    "catalogue.body": "Browse our catalogues by category — necklaces, bangles, bridal sets and more — right on your phone, before you visit.",
    "catalogue.browse": "Browse catalogues",
    "catalogue.modalTitle": "Our catalogues",
    "catalogue.all": "All",
    "catalogue.open": "View",
    "catalogue.count": "{count} catalogues",
    "catalogue.soon": "Our new catalogue is on its way. Visit us to see the full collection.",
    "catalogue.pages": "{count} pages",

    // why us (lightweight, affordable jewellery)
    "why.eyebrow": "OUR SPECIALITY",
    "why.title1": "Weighs less.",
    "why.title2": "Shines more.",
    "why.body":
      "At Padmavathi Jewellers we make lightweight jewellery that keeps the grand, traditional look. Each design uses fewer grams of gold — so it costs less, feels lighter and still turns heads.",
    "why.quote": "Pay for the beauty, not the extra grams.",
    "why.cta": "Explore the collection",
    "why.light.title": "Light as a feather",
    "why.light.text": "Grand designs in fewer grams",
    "why.price.title": "Easy on the pocket",
    "why.price.text": "Prices that fit every budget",
    "why.daily.title": "Made for every day",
    "why.daily.text": "Comfortable from morning to night",
    "why.detail.title": "Rich in detail",
    "why.detail.text": "The full traditional look, only lighter",

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
      "Temple gold, diamond, silver and gemstone jewellery — 100% BIS hallmarked.",
    "footer.shop": "SHOP",
    "footer.company": "COMPANY",
    "footer.visit": "VISIT",
    "footer.aboutUs": "About Padmavathi",
    "footer.locator": "Showroom locator",
    "footer.careers": "Careers",
    "footer.book": "Book a private visit",
    "footer.copyright": "© 2026 {name}. All rights reserved.",
    "footer.legal": "100% BIS Hallmarked jewellery",
  },

  te: {
    "meta.title": "పద్మావతి జ్యువెలర్స్",

    // brand
    "brand.name": "పద్మావతి",

    // navigation
    "nav.collections": "కలెక్షన్లు",
    "nav.bridal": "పెళ్లి నగలు",
    "nav.rates": "బంగారం ధరలు",
    "nav.heritage": "మా ప్రత్యేకత",
    "nav.book": "సందర్శన బుక్ చేయండి",
    "nav.visit": "మమ్మల్ని సందర్శించండి",
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
    "hero.alt.logo": "పద్మావతి జ్యువెలర్స్ లోగో",
    "hero.alt.necklace": "లక్ష్మీదేవి రూపం, బంగారు ముత్యాలతో టెంపుల్ గోల్డ్ నెక్లెస్",
    "hero.alt.goddess": "బంగారు కమలంలో కొలువైన శ్రీ పద్మావతి అమ్మవారు",
    "hero.goddessCaption": "శ్రీ పద్మావతి అమ్మవారి ఆశీస్సులతో",
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
    "category.heading": "రకాల వారీగా షాపింగ్ చేయండి",
    "category.showMore": "మరిన్ని చూడండి",
    "catalog.showMore": "మరో {count} చూపించు",
    "catalog.backToCategories": "అన్ని రకాలు",
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
      "మా షోరూమ్‌లో నేటి ధరలు, గ్రాముకు. తుది ధరల్లో తయారీ ఛార్జీలు, GST ఉంటాయి — మీ బిల్లులో వేరుగా చూపిస్తాం.",
    "rates.updated": "{date} న అప్‌డేట్ చేయబడింది",
    "rates.cityAria": "నగరం ఎంచుకోండి",
    "rates.k22": "22K బంగారం / గ్రా.",
    "rates.k24": "24K బంగారం / గ్రా.",
    "rates.k18": "18K బంగారం / గ్రా.",
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

    // occasions, visit us, bottom bar
    "occasion.heading": "సందర్భం వారీగా షాపింగ్ చేయండి",
    "occasion.explore": "చూడండి",
    "visit.eyebrow": "మమ్మల్ని సందర్శించండి",
    "visit.title": "మా షోరూమ్‌ను సందర్శించండి",
    "visit.directions": "దారి చూపించు",
    "visit.whatsapp": "వాట్సాప్ చేయండి",
    "visit.mapTitle": "మా షోరూమ్ మ్యాప్",
    "footer.tagline": "భక్తితో తీర్చిదిద్దినవి. తరతరాలకు నిలిచేవి.",
    "footer.help": "సహాయం",
    "footer.follow": "మమ్మల్ని ఫాలో అవ్వండి",
    "bottom.aria": "త్వరిత లింకులు",
    "bottom.home": "హోమ్",
    "bottom.categories": "రకాలు",
    "bottom.rates": "బంగారం ధర",
    "bottom.bag": "బ్యాగ్",
    "bottom.whatsapp": "వాట్సాప్",
    "bottom.visit": "సందర్శన",
    "aria.whatsapp": "వాట్సాప్‌లో మాతో మాట్లాడండి",
    "social.whatsapp": "వాట్సాప్‌లో మాట్లాడండి",
    "social.instagram": "ఇన్‌స్టాగ్రామ్‌లో ఫాలో అవ్వండి",
    "social.youtube": "యూట్యూబ్‌లో చూడండి",
    "social.facebook": "ఫేస్‌బుక్‌లో ఫాలో అవ్వండి",
    "lightbox.view": "{name} పెద్ద ఫోటో చూడండి",
    "lightbox.tapToZoom": "జూమ్ చేయడానికి నొక్కండి",
    "lightbox.zoomIn": "జూమ్ ఇన్",
    "lightbox.zoomOut": "జూమ్ అవుట్",
    "lightbox.hintDesktop": "జూమ్ చేయడానికి క్లిక్ లేదా స్క్రోల్ చేయండి · చుట్టూ చూడటానికి మౌస్ కదపండి · మూసివేయడానికి Esc",
    "lightbox.hintPhone": "జూమ్ చేయడానికి రెండు వేళ్లతో సాగదీయండి లేదా రెండుసార్లు నొక్కండి · మూసివేయడానికి కిందికి లాగండి",

    // catalogue
    "nav.catalogue": "కేటలాగ్",
    "catalogue.eyebrow": "మా కేటలాగ్",
    "catalogue.title": "కలెక్షన్‌ను ఇంటికి తీసుకెళ్లండి",
    "catalogue.body": "నెక్లెస్‌లు, గాజులు, పెళ్లి సెట్లు ఇంకా మరెన్నో — కేటగిరీ వారీగా మా కేటలాగ్‌లను మా షాప్‌కి రాకముందే మీ ఫోన్‌లోనే చూడండి.",
    "catalogue.browse": "కేటలాగ్‌లు చూడండి",
    "catalogue.modalTitle": "మా కేటలాగ్‌లు",
    "catalogue.all": "అన్నీ",
    "catalogue.open": "చూడండి",
    "catalogue.count": "{count} కేటలాగ్‌లు",
    "catalogue.soon": "మా కొత్త కేటలాగ్ త్వరలో వస్తుంది. పూర్తి కలెక్షన్ చూడటానికి మా షాప్‌కి రండి.",
    "catalogue.pages": "{count} పేజీలు",

    // why us (lightweight, affordable jewellery)
    "why.eyebrow": "మా ప్రత్యేకత",
    "why.title1": "బరువు తక్కువ.",
    "why.title2": "మెరుపు ఎక్కువ.",
    "why.body":
      "పద్మావతి జ్యువెలర్స్‌లో ఘనమైన సాంప్రదాయ అందాన్ని అలాగే ఉంచుతూ తేలికైన ఆభరణాలు తయారు చేస్తాం. ప్రతి డిజైన్‌లో బంగారం గ్రాములు తక్కువ — అందుకే ధర తక్కువ, ధరించడానికి తేలిక, అయినా చూపు తిప్పుకోలేని అందం.",
    "why.quote": "అదనపు గ్రాములకు కాదు, అందానికే మీ డబ్బు.",
    "why.cta": "కలెక్షన్ చూడండి",
    "why.light.title": "ఈకలా తేలిక",
    "why.light.text": "తక్కువ గ్రాముల్లో ఘనమైన డిజైన్లు",
    "why.price.title": "అందుబాటు ధరలు",
    "why.price.text": "ప్రతి బడ్జెట్‌కు తగిన ధరలు",
    "why.daily.title": "రోజూ ధరించేలా",
    "why.daily.text": "ఉదయం నుంచి రాత్రి వరకు సౌకర్యంగా",
    "why.detail.title": "నిండైన పనితనం",
    "why.detail.text": "పూర్తి సాంప్రదాయ అందం, తక్కువ బరువుతో",

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
      "టెంపుల్ గోల్డ్, వజ్రాలు, వెండి, రత్నాల ఆభరణాలు — 100% BIS హాల్‌మార్క్.",
    "footer.shop": "షాపింగ్",
    "footer.company": "సంస్థ",
    "footer.visit": "సందర్శన",
    "footer.aboutUs": "పద్మావతి గురించి",
    "footer.locator": "షోరూమ్ చిరునామాలు",
    "footer.careers": "ఉద్యోగాలు",
    "footer.book": "ప్రైవేట్ సందర్శన బుక్ చేయండి",
    "footer.copyright": "© 2026 {name}. సర్వ హక్కులు ప్రత్యేకించబడినవి.",
    "footer.legal": "100% BIS హాల్‌మార్క్ ఆభరణాలు",
  },
};
