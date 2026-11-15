const ClubImageEngine = {
  cache: {},
  currentModalClub: "",
  searchVariantIndex: 0,

  buildDirectSearchPhotoUrl: (clubName, variant = 0) => {
    const cleanName = clubName
      .replace(/DRIVER:|IRON:|PUTTER:|WEDGE:|HYBRYDA:|WOOD:|TORBA:|DALMIERZ:|PIŁKI:|BUTY:|ZESTAW:|GRIP:|UŻYWANY:|NOWY:/gi, '')
      .replace(/\(.*?\)/g, '')
      .trim();

    const searchModifiers = [
      "golf product photo white background",
      "golf official studio photo",
      "golf equipment close up",
      "golf gear isolated photo"
    ];
    const modifier = searchModifiers[variant % searchModifiers.length];
    const serverNum = (variant % 4) + 1;
    const query = `${cleanName} ${modifier}`;

    return `https://tse${serverNum}.mm.bing.net/th?q=${encodeURIComponent(query)}&w=500&h=500&c=7&rs=1&p=0`;
  },

  getGoogleImagesUrl: (clubName) => {
    const cleanName = clubName.replace(/DRIVER:|IRON:|PUTTER:|WEDGE:|UŻYWANY:/gi, '').trim();
    return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(cleanName + ' golf')}`;
  },

  getFallbackPhoto: (clubName) => {
    const lower = clubName.toLowerCase();
    if (lower.includes("mizuno") || lower.includes("jpx") || lower.includes("iron")) {
      return "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=600&q=85";
    }
    if (lower.includes("putter") || lower.includes("odyssey") || lower.includes("scotty")) {
      return "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=600&q=85";
    }
    if (lower.includes("wedge") || lower.includes("vokey") || lower.includes("cleveland")) {
      return "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=600&q=85";
    }
    return "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=85";
  },

  getClubVisualUrl: (clubName, customUrl) => {
    if (customUrl && customUrl.startsWith('http')) return customUrl;
    if (ClubImageEngine.cache[clubName]) return ClubImageEngine.cache[clubName];

    const livePhotoUrl = ClubImageEngine.buildDirectSearchPhotoUrl(clubName, 0);
    ClubImageEngine.cache[clubName] = livePhotoUrl;
    return livePhotoUrl;
  }
};

const DefaultUser = {
  name: "Marek Kowalski",
  email: "marek.kowalski@tgngolf.pl",
  hcp: 12.4,
  level: "Średniozaawansowany",
  city: "Warszawa",
  lastRound: "82 (Amber Baltic Golf Club)",
  swingSpeed: "96 mph"
};

// Pełne drzewo kategorii sklepowych gotowe pod rozbudowę asortymentu
const StoreCategoriesList = [
  { id: "ALL", label: "Wszystkie kategorie", icon: "🏬" },
  { id: "DRIVERY", label: "Drivery", icon: "🏌️" },
  { id: "WOODS", label: "Fairway Woody", icon: "🚀" },
  { id: "HYBRYDY", label: "Hybrydy & Driving Irony", icon: "⚡" },
  { id: "IRONY", label: "Zestawy Ironów", icon: "⚙️" },
  { id: "WEDGE", label: "Wedge (48°–60°)", icon: "🎯" },
  { id: "PUTTERY", label: "Puttery", icon: "⛳" },
  { id: "ZESTAWY", label: "Kompletne Zestawy", icon: "📦" },
  { id: "PILKI", label: "Piłki Nowe & Lake Balls", icon: "⚪" },
  { id: "TORBY", label: "Torby & Wózki", icon: "🎒" },
  { id: "ODZIEZ", label: "Odzież, Buty & Rękawiczki", icon: "👟" },
  { id: "GPS", label: "Dalmierze, GPS & Launch Monitory", icon: "🔭" },
  { id: "AKCESORIA", label: "Gripy, Shafty & Akcesoria", icon: "🔧" }
];

const InitialStoreProducts = [
  {
    id: 201, section: "NEW", cat: "DRIVERY", brand: "TaylorMade", flex: "Stiff", hand: "RH", loft: "10.5°",
    condition: "Fabrycznie nowy", condDetails: "Gwarancja 24 mies. + Headcover", tag: "BESTSELLER PRO 2026", tagGold: false,
    name: "TaylorMade Qi10 Max Driver", spec: "MOI 10,000 g/cm² • Loft: 10.5° • Shaft: Fujikura Ventus TR Blue 6S",
    desc: "Maksymalna bezwładność główki 10K gwarantująca proste uderzenia z tee. Idealny pod Twój swing 96 mph.",
    oldPrice: 2890, price: 2590, tradeInPrice: 1140, stock: 4, imgUrl: null
  },
  {
    id: 202, section: "NEW", cat: "DRIVERY", brand: "Ping", flex: "Stiff", hand: "RH", loft: "9.0°",
    condition: "Fabrycznie nowy", condDetails: "Gwarancja 24 mies. + Klucz", tag: "REKOMENDACJA AI", tagGold: true,
    name: "Ping G430 Max 10K Carbonfly Driver", spec: "Loft: 9.0° (Regulowany ±1.5°) • Shaft: Ping Alta CB Black 65 Stiff",
    desc: "Karbonowa korona Carbonfly Wrap obniża środek ciężkości i daje najwyższą powtarzalność na rynku.",
    oldPrice: 2990, price: 2690, tradeInPrice: 1240, stock: 3, imgUrl: null
  },
  {
    id: 203, section: "NEW", cat: "WEDGE", brand: "Titleist", flex: "Wedge", hand: "RH", loft: "52°",
    condition: "Fabrycznie nowy", condDetails: "Nowy w folii", tag: "WYPEŁNIA LUKĘ GAPPINGU 15M", tagGold: true,
    name: "Titleist Vokey SM10 Tour Chrome 52° Wedge", spec: "Gap Wedge 52° / 12F Bounce • Rowki Spin Milled CNC",
    desc: "Rekomendowany przez Gapping AI do zamknięcia Twojej luki dystansowej pomiędzy Pitchingiem a Sand Wedge'em.",
    oldPrice: 890, price: 789, tradeInPrice: 340, stock: 9, imgUrl: null
  },
  {
    id: 204, section: "NEW", cat: "IRONY", brand: "Mizuno", flex: "Stiff", hand: "RH", loft: "5-PW (6 kijów)",
    condition: "Fabrycznie nowy", condDetails: "Darmowy Custom Fitting", tag: "KOLEKCJA KUTA", tagGold: false,
    name: "Mizuno Pro 245 Forged Irons (5-PW)", spec: "Konstrukcja Hollow Body Chromoly • Shaft: Dynamic Gold Mid 115 S300",
    desc: "Połączenie wyglądu klasycznego kutego blade'a z prędkością piłki znaną z modeli Hot Metal.",
    oldPrice: 5490, price: 4890, tradeInPrice: 2140, stock: 2, imgUrl: null
  },
  {
    id: 205, section: "NEW", cat: "PUTTERY", brand: "Titleist", flex: "N/A", hand: "RH", loft: "34\"",
    condition: "Fabrycznie nowy", condDetails: "Oryginalny Headcover w komplecie", tag: "KLASYK PGA TOUR", tagGold: true,
    name: "Scotty Cameron Super Select Newport 2 Putter", spec: "Długość: 34 cale • Podwójnie frezowane lico 303 Stainless Steel",
    desc: "Najbardziej utytułowany putter typu blade na świecie z ciężarkami wolframowymi w podeszwie.",
    oldPrice: 2190, price: 1950, tradeInPrice: 1000, stock: 3, imgUrl: null
  },
  {
    id: 206, section: "USED", cat: "DRIVERY", brand: "Callaway", flex: "Regular", hand: "RH", loft: "10.5°",
    condition: "Używany 9.0/10 (Mint)", condDetails: "Główka: 9/10 | Shaft: 9.5/10 | Grip: Nowy Golf Pride", tag: "UŻYWANY CPO • -1100 PLN", tagGold: true,
    name: "Używany Callaway Paradym Ai Smoke Max Driver", spec: "Loft: 10.5° • Shaft: Project X Cypher 50g Regular • Praworęczny (RH)",
    desc: "Zweryfikowany przez serwis TGN CPO. Lico Ai Smart Face w stanie idealnym, minimalne ślady na podeszwie.",
    oldPrice: 2490, price: 1390, tradeInPrice: 440, stock: 1, imgUrl: null
  },
  {
    id: 207, section: "USED", cat: "DRIVERY", brand: "TaylorMade", flex: "Stiff", hand: "RH", loft: "9.0°",
    condition: "Używany 8.5/10 (B. Dobry)", condDetails: "Główka: 8.5/10 | Shaft: 9/10 | Grip: 8.5/10", tag: "UŻYWANY CPO • HIT CENOWY", tagGold: false,
    name: "Używany TaylorMade Stealth 2 Plus Carbon Driver", spec: "Loft: 9.0° • Przesuwny ciężarek 15g • Shaft: Mitsubishi Kai'li Red 60S",
    desc: "Czerwone lico 60X Carbon Twist Face. Sprawdzony na TrackManie – pełne parametry fabryczne.",
    oldPrice: 2390, price: 1190, tradeInPrice: 350, stock: 1, imgUrl: null
  },
  {
    id: 208, section: "USED", cat: "HYBRYDY", brand: "Ping", flex: "Regular", hand: "RH", loft: "22° (4H)",
    condition: "Używany 9.0/10", condDetails: "Główka: 9/10 | Shaft: 9/10 | Grip: 9/10", tag: "UŻYWANA HYBRYDA CPO", tagGold: false,
    name: "Używana Hybryda Ping G425 #4 (22°) Rescue", spec: "Hybryda 4H (22°) • Shaft: Ping Alta CB Slate 70 Regular • RH",
    desc: "Niezwykle łatwa w grze z trudnego roughu i fairwaya. Zastępuje długie żelazo nr 4.",
    oldPrice: 1290, price: 690, tradeInPrice: 190, stock: 2, imgUrl: null
  },
  {
    id: 209, section: "USED", cat: "WOODS", brand: "TaylorMade", flex: "Stiff", hand: "RH", loft: "15° (3W)",
    condition: "Używany 8.5/10", condDetails: "Główka: 8.5/10 | Shaft: 9/10 | Grip: 9/10", tag: "UŻYWANY FAIRWAY WOOD", tagGold: false,
    name: "Używany TaylorMade SIM2 Max Fairway Wood #3 (15°)", spec: "3-Wood (15°) • Stalowa podeszwa V-Steel • Shaft: Fujikura Ventus Blue 6S",
    desc: "Kultowy 3-wood ze stalową płozą V-Steel, która gładko przechodzi przez trawę bez utraty prędkości.",
    oldPrice: 1450, price: 750, tradeInPrice: 250, stock: 1, imgUrl: null
  },
  {
    id: 210, section: "USED", cat: "HYBRYDY", brand: "Titleist", flex: "Stiff", hand: "LH", loft: "19° (3H)",
    condition: "Używany 9.0/10 (LH)", condDetails: "Wersja LEWORĘCZNA (LH) • Stan wzorowy", tag: "LEWORĘCZNY (LH) • CPO", tagGold: true,
    name: "Używana Hybryda Titleist TSR2 #3 (19°) LH", spec: "Leworęczna (Left Hand) • Loft: 19° • Shaft: Tensei Blue 65 HY Stiff",
    desc: "Rzadko spotykana na rynku wtórnym hybryda dla graczy leworęcznych w stanie gabinetowym.",
    oldPrice: 1390, price: 790, tradeInPrice: 290, stock: 1, imgUrl: null
  },
  {
    id: 211, section: "USED", cat: "IRONY", brand: "Titleist", flex: "Stiff", hand: "RH", loft: "5-PW (6 kijów)",
    condition: "Używane 8.5/10", condDetails: "Lica: 8.5/10 | Shafty: 9.5/10 | Gripy: Nowe Tour Velvet", tag: "ZESTAW UŻYWANY CPO", tagGold: true,
    name: "Używane Irony Titleist T200 (5-PW) Players Distance", spec: "6 kijów (5, 6, 7, 8, 9, PW) • Shaft: Project X IO 6.0 Stiff (110g)",
    desc: "Po przeglądzie w serwisie TGN: założone fabrycznie nowe gripy Golf Pride i sprawdzony kąt Lie/Loft.",
    oldPrice: 4690, price: 2890, tradeInPrice: 990, stock: 1, imgUrl: null
  },
  {
    id: 212, section: "USED", cat: "IRONY", brand: "Callaway", flex: "Regular", hand: "RH", loft: "6-PW + SW",
    condition: "Używane 8.0/10", condDetails: "Idealne na start / średni HCP", tag: "SUPER WYBACZALNE • CPO", tagGold: false,
    name: "Używane Irony Callaway Rogue ST Max OS (6-SW)", spec: "Grafitowe shafty Mitsubishi Tensei AV Blue Regular • 6 kijów",
    desc: "Szeroka podeszwa i niski środek ciężkości ułatwiają łatwe podnoszenie piłki w powietrze.",
    oldPrice: 3800, price: 1990, tradeInPrice: 690, stock: 1, imgUrl: null
  },
  {
    id: 213, section: "USED", cat: "WEDGE", brand: "Cleveland", flex: "Wedge", hand: "RH", loft: "56° / 10",
    condition: "Używany 9.0/10", condDetails: "Rowki: 95% głębokości fabrycznej", tag: "UŻYWANY WEDGE CPO", tagGold: false,
    name: "Używany Wedge Cleveland RTX 6 ZipCore 56° Mid", spec: "Sand Wedge 56° • Technologia HydraZip & UltiZip Grooves",
    desc: "Ostre rowki gwarantujące maksymalny backspin przy wyjściach z bunkra i mokrej trawy.",
    oldPrice: 750, price: 420, tradeInPrice: 150, stock: 3, imgUrl: null
  },
  {
    id: 214, section: "USED", cat: "PUTTERY", brand: "Odyssey", flex: "N/A", hand: "RH", loft: "35\"",
    condition: "Używany 9.5/10 (Jak nowy)", condDetails: "Lico White Hot: 10/10 | Shaft Stroke Lab", tag: "UŻYWANY PUTTER CPO", tagGold: false,
    name: "Używany Putter Odyssey White Hot OG #7 Bird (35\")", spec: "Długość: 35 cali • Shaft: Red Stroke Lab (Stal + Grafit)",
    desc: "Legendarne lico White Hot w połączeniu z wyważonym shaftem Stroke Lab poprawia tempo putowania.",
    oldPrice: 1290, price: 720, tradeInPrice: 250, stock: 2, imgUrl: null
  },
  {
    id: 215, section: "BALLS", cat: "PILKI", brand: "Titleist", flex: "N/A", hand: "ALL", loft: "24 szt. (2 tuziny)",
    condition: "Lake Balls Klasa AAAA / Pearl", condDetails: "Stan idealny • Połysk fabryczny • Bez rys", tag: "HIT! LAKE BALLS KLASA AAAA", tagGold: true,
    name: "Piłki Titleist Pro V1 / Pro V1x – Pakiet 24 szt. (Klasa AAAA Pearl)", spec: "24 sztuki • Wyselekcjonowane ręcznie z przeszkód wodnych • Stan jak z pudełka",
    desc: "Najwyższa klasa sortowania (Pearl/AAAA). Piłki zachowują 100% aerodynamiki za połowę ceny sklepowej!",
    oldPrice: 498, price: 219, tradeInPrice: 219, stock: 25, imgUrl: null
  },
  {
    id: 216, section: "BALLS", cat: "PILKI", brand: "TaylorMade", flex: "N/A", hand: "ALL", loft: "24 szt. (Mix)",
    condition: "Lake Balls Klasa AAA / AAAA", condDetails: "Idealne na rundy treningowe i turniejowe", tag: "LAKE BALLS • PAKIET EKONOMICZNY", tagGold: false,
    name: "Piłki TaylorMade TP5 / TP5x Pix – Pakiet 24 szt. (Klasa AAA+)", spec: "24 sztuki • 5-warstwowa piłka Tour z uretanową powłoką",
    desc: "Świetny zestaw dla graczy szukających miękkiego czucia wokół greenu bez obawy o zgubienie piłki w wodzie.",
    oldPrice: 460, price: 179, tradeInPrice: 179, stock: 18, imgUrl: null
  },
  {
    id: 217, section: "BALLS", cat: "PILKI", brand: "Callaway", flex: "N/A", hand: "ALL", loft: "50 szt. (Mega Pack)",
    condition: "Lake Balls Klasa AAA", condDetails: "Zaledwie 3.18 PLN za sztukę!", tag: "MEGA PAKA 50 SZTUK", tagGold: false,
    name: "Piłki Callaway Supersoft / Chrome Soft – Mega Pakiet 50 szt.", spec: "50 sztuk w worku siatkowym • Bardzo niska kompresja i prosty lot",
    desc: "Najlepszy wybór na cały sezon gry. Miękka piłka wybaczająca błędy z tee.",
    oldPrice: 420, price: 159, tradeInPrice: 159, stock: 14, imgUrl: null
  },
  {
    id: 218, section: "NEW", cat: "TORBY", brand: "Titleist", flex: "N/A", hand: "ALL", loft: "Wodoodporna",
    condition: "Fabrycznie nowa", condDetails: "Waga tylko 1.95 kg • Podwójne szelki", tag: "WODOODPORNA STADRY", tagGold: false,
    name: "Torba Golfowa Titleist Players 4 StaDry Stand Bag", spec: "4-komorowy top • Klejone zamki wodoodporne • Stelaż aluminiowy",
    desc: "Najpopularniejsza torba z nóżkami na polskich polach. Chroni sprzęt podczas ulewnego deszczu.",
    oldPrice: 1390, price: 1190, tradeInPrice: 790, stock: 5, imgUrl: null
  },
  {
    id: 219, section: "NEW", cat: "TORBY", brand: "Wilson", flex: "N/A", hand: "ALL", loft: "Składany 1-Click",
    condition: "Fabrycznie nowy", condDetails: "Uchwyt na parasol i kartę wyników", tag: "WÓZEK 3-KOŁOWY", tagGold: false,
    name: "Wózek Golfowy Clicgear Model 4.0 Push Cart (Matte Black)", spec: "System składania w kostkę • Hamulec ręczny • Silikonowe paski",
    desc: "Pancerny 3-kołowy wózek golfowy, który bez problemu radzi sobie na pagórkowatych polach.",
    oldPrice: 1450, price: 1290, tradeInPrice: 890, stock: 4, imgUrl: null
  },
  {
    id: 220, section: "NEW", cat: "GPS", brand: "Bushnell", flex: "N/A", hand: "ALL", loft: "Z kompensacją Slope",
    condition: "Fabrycznie nowy", condDetails: "Magnes BITE do wózka • Etui Tour", tag: "NR 1 NA PGA TOUR", tagGold: true,
    name: "Dalmierz Laserowy Bushnell Tour V6 Shift Slope", spec: "Zasięg do 1100m • PinSeeker z Visual JOLT • Przełącznik turniejowy Slope",
    desc: "Wibruje i błyska czerwoną obwódką po złapaniu flagi. Przełącznik Slope dozwolony w turniejach WHS.",
    oldPrice: 2090, price: 1850, tradeInPrice: 1250, stock: 6, imgUrl: null
  },
  {
    id: 221, section: "NEW", cat: "ZESTAWY", brand: "Wilson", flex: "Regular", hand: "RH", loft: "10 kijów + Torba",
    condition: "Fabrycznie nowy zestaw", condDetails: "Gotowy do wyjścia na pole (Driver, Fairway, Hybryda, Irony 6-SW, Putter)", tag: "KOMPLETNY BOX SET", tagGold: false,
    name: "Kompletny Zestaw Kijów Wilson Profile SGI Complete Set + Torba", spec: "Praworęczny (RH) • Shafty Grafit/Stal Regular • Headcovery w komplecie",
    desc: "Idealny kompletny zestaw startowy z technologią Super Game Improvement.",
    oldPrice: 2690, price: 2290, tradeInPrice: 1490, stock: 4, imgUrl: null
  },
  {
    id: 222, section: "NEW", cat: "ODZIEZ", brand: "FootJoy", flex: "N/A", hand: "ALL", loft: "Rozmiary 41–46",
    condition: "Fabrycznie nowe", condDetails: "100% Wodoodporna skóra Pittards", tag: "BUTY GOLFOWE PRO", tagGold: false,
    name: "Buty Golfowe FootJoy Pro/SLX Carbon Spikeless", spec: "Podeszwa PWR TRAX z wkładką karbonową • Bezkolcowe",
    desc: "Najwygodniejsze buty na 18 dołków marszu z trzymaniem bocznym podczas szybkiego swingu.",
    oldPrice: 990, price: 849, tradeInPrice: 849, stock: 8, imgUrl: null
  },
  {
    id: 223, section: "NEW", cat: "AKCESORIA", brand: "Golf Pride", flex: "N/A", hand: "ALL", loft: "Standard / Midsize",
    condition: "Fabrycznie nowy", condDetails: "Darmowy montaż w serwisie TGN", tag: "NR 1 WŚRÓD GRIPÓW", tagGold: false,
    name: "Grip Golf Pride MCC Plus4 (MultiCompound) – Sztuka lub Zestaw", spec: "Hybryda sznurka Cord w górnej części i miękkiej gumy na dole",
    desc: "Pogrubiona dolna część gripu redukuje napięcie w dłoniach i zwiększa płynność swingu.",
    oldPrice: 79, price: 65, tradeInPrice: 65, stock: 50, imgUrl: null
  }
];

// Wczytaj zapisane przez użytkownika własne produkty ze sklepu (jeśli dodawał je przez formularz)
const loadSavedStoreProducts = () => {
  try {
    const saved = localStorage.getItem('tgn_custom_store_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return [...parsed, ...InitialStoreProducts];
      }
    }
  } catch (e) {}
  return [...InitialStoreProducts];
};

const AppData = {
  activeForumFilter: "ALL",
  storeCategories: StoreCategoriesList,
  storeState: {
    section: "ALL",
    category: "ALL",
    brand: "ALL",
    flex: "ALL",
    hand: "ALL",
    maxPrice: 6000,
    search: "",
    sortBy: "RECOMMENDED",
    cartOpen: false,
    addProductOpen: false,
    aiAssistantOpen: true,
    deliveryMethod: "KURIER",
    aiChatHistory: [
      {
        sender: "TGN AI Pro Fitter",
        text: "Cześć Marek! Przeanalizowałem Twoją cyfrową torbę (Qi10 Driver, Mizuno JPX 923, Putter Odyssey #7) oraz parametry (HCP 12.4, Swing Speed 96 mph). W czym pomóc? Mogę wyfiltrować kije pod Twoją lukę 15m na Gap Wedge'u, znaleźć używane okazje CPO albo wyliczyć dopłatę Trade-In!",
        filterAction: null
      }
    ]
  },
  activeEventFilter: "ALL",
  activeCourseFilter: "ALL",
  courseSearchQuery: "",
  cart: [],
  user: { ...DefaultUser },
  bag: [
    { id: 1, name: "DRIVER: TAYLOR MADE Qi10", loft: "10.5°, Shaft: VENTUS Blue 6S", val: "1 800 PLN", cpoOffer: "1 450 PLN", speed: "145 mph", smash: "1.48", attack: "+3.2°", cond: "9/10", imgUrl: null },
    { id: 2, name: "IRON: MIZUNO JPX 923 HOT METAL", loft: "7-Iron, Steel Shaft DG 105 S", val: "3 400 PLN", cpoOffer: "2 750 PLN", speed: "118 mph", smash: "1.39", attack: "-4.1°", cond: "9.5/10", imgUrl: null },
    { id: 3, name: "PUTTER: ODYSSEY AI-ONE #7", loft: "34\", Grip: SUPERSTROKE Tour 2.0", val: "1 200 PLN", cpoOffer: "950 PLN", speed: "Green", smash: "1.02", attack: "+1.0°", cond: "Mint", imgUrl: null }
  ],
  storeProducts: loadSavedStoreProducts(),
  polishCourses: [
    { id: 1, name: "Modry Las Golf Resort (PGA National Poland)", city: "Choszczno", voivodeship: "Zachodniopomorskie", region: "POLNOC", holes: 18, holesLabel: "18 + 9 dołków", par: 72, cr: 72.8, slope: 136, length: "6 350 m", greenFee: "360 PLN", bookingUrl: "https://modrylas.pl/", desc: "Projekt Gary'ego Playera. Jedno z najwyżej ocenianych pól mistrzowskich w Europie Środkowej.", aiTip: "Wymaga kontrolowanego fade'u z tee na dołkach wzdłuż jeziora." },
    { id: 2, name: "Binowo Park Golf Club", city: "Szczecin / Binowo", voivodeship: "Zachodniopomorskie", region: "POLNOC", holes: 18, holesLabel: "18 + 9 dołków", par: 72, cr: 71.5, slope: 131, length: "6 014 m", greenFee: "290 PLN", bookingUrl: "https://binowopark.pl/", desc: "Położone w Szczecińskim Parku Krajobrazowym Puszcza Bukowa, niezwykle malownicze i pagórkowate.", aiTip: "Duże przewyższenia – używaj dalmierza z kompensacją nachylenia (Slope)." },
    { id: 3, name: "Amber Baltic Golf Club", city: "Kołczewo (Wolin)", voivodeship: "Zachodniopomorskie", region: "POLNOC", holes: 18, holesLabel: "18 + 9 dołków", par: 72, cr: 71.2, slope: 128, length: "5 960 m", greenFee: "280 PLN", bookingUrl: "https://amberbalticgolfclub.pl/", desc: "Najstarsze pole na Pomorzu Zachodnim tuż obok Międzyzdrojów i Bałtyku, gospodarz turniejów międzynarodowych.", aiTip: "Silny wiatr od morza – trzymaj niski kąt startu piłki (low punch)." },
    { id: 4, name: "Kamień Country Club", city: "Grębowo k. Kamienia Pom.", voivodeship: "Zachodniopomorskie", region: "POLNOC", holes: 18, holesLabel: "18 dołków", par: 72, cr: 71.8, slope: 129, length: "6 095 m", greenFee: "250 PLN", bookingUrl: "https://kamiencountryclub.pl/", desc: "Szerokie fairwaye i nowoczesny układ łączący cechy pola parkowego i otwartego.", aiTip: "Świetne pole na atakowanie driverem Qi10 na pełnej prędkości 96 mph." },
    { id: 5, name: "First Warsaw Golf & Country Club", city: "Rajszew k. Warszawy", voivodeship: "Mazowieckie", region: "CENTRUM", holes: 18, holesLabel: "18 dołków", par: 72, cr: 73.4, slope: 140, length: "6 265 m", greenFee: "380 PLN", bookingUrl: "https://firstwarsaw.pl/", desc: "Pierwsze pole w Polsce (zał. 1991), położone w starorzeczu Wisły, bardzo techniczne z wąskimi przesmykami.", aiTip: "Wysoki Slope (140) – na dołkach 11–16 lepsza hybryda lub 3-wood niż driver." },
    { id: 6, name: "Sobienie Królewskie Golf & Country Club", city: "Sobienie Jeziory", voivodeship: "Mazowieckie", region: "CENTRUM", holes: 18, holesLabel: "18 dołków", par: 71, cr: 71.6, slope: 132, length: "6 042 m", greenFee: "320 PLN", bookingUrl: "https://sobieniekrolewskie.pl/", desc: "Pole w stylu brytyjskiego heathland/links na piaszczystym podłożu, grywalne niemal cały rok.", aiTip: "Twarde fairwaye dają duży roll – celuj przed bunkry." },
    { id: 7, name: "Pole Golfowe Lisia Polana", city: "Pomocnia k. Warszawy", voivodeship: "Mazowieckie", region: "CENTRUM", holes: 18, holesLabel: "18 dołków", par: 72, cr: 72.1, slope: 130, length: "6 150 m", greenFee: "290 PLN", bookingUrl: "https://lisiapolana.pl/", desc: "Mistrzowskie pole nad Wkrą z szerokimi fairwayami i pofałdowanymi greenami.", aiTip: "Kluczowe podejścia z 90–110m – idealne pod Twój nowy Gap Wedge 52°." },
    { id: 8, name: "Sierra Golf Resort", city: "Pętkowice k. Wejherowa", voivodeship: "Pomorskie", region: "POLNOC", holes: 18, holesLabel: "18 + 9 dołków", par: 72, cr: 72.4, slope: 135, length: "6 210 m", greenFee: "350 PLN", bookingUrl: "https://sierragolf.pl/", desc: "Perfekcyjnie utrzymany obiekt parkowy z ponad 11 tysiącami drzew i szybkimi greenami.", aiTip: "Szybkość greenów powyżej 10.5 ft – uważaj na puty z góry." },
    { id: 9, name: "Postołowo Golf Club", city: "Postołowo k. Gdańska", voivodeship: "Pomorskie", region: "POLNOC", holes: 18, holesLabel: "18 dołków", par: 72, cr: 75.5, slope: 141, length: "7 113 m (Back Tee)", greenFee: "340 PLN", bookingUrl: "https://postolowo.com/", desc: "Drugie najdłuższe pole w Europie z białych/czarnych tee, otoczone kaszubskimi jeziorami.", aiTip: "Najtrudniejszy test dystansu w Polsce – maksymalizuj Smash Factor." },
    { id: 10, name: "Tokary Golf Club", city: "Przodkowo (Trójmiasto)", voivodeship: "Pomorskie", region: "POLNOC", holes: 18, holesLabel: "18 dołków", par: 72, cr: 70.1, slope: 126, length: "5 650 m", greenFee: "260 PLN", bookingUrl: "https://tokarygolf.pl/", desc: "Kaszubska Szwajcaria – duże różnice wzniesień i techniczne dołki leśne.", aiTip: "Gra na precyzję ironami Mizuno JPX ważniejsza niż dystans z tee." },
    { id: 11, name: "Sand Valley Golf Resort", city: "Pasłęk k. Elbląga", voivodeship: "Warmińsko-Mazurskie", region: "POLNOC", holes: 18, holesLabel: "18 + 6 dołków", par: 72, cr: 73.1, slope: 135, length: "6 285 m", greenFee: "360 PLN", bookingUrl: "https://sandvalley.pl/", desc: "Polski desert/links zaprojektowany przez Tilandera i Rauhala, rozległe waste bunkers.", aiTip: "Unikaj piaszczystych stref waste – celuj w środek szerokich greenów." },
    { id: 12, name: "Mazury Golf & Country Club", city: "Naterki k. Olsztyna", voivodeship: "Warmińsko-Mazurskie", region: "POLNOC", holes: 18, holesLabel: "18 dołków", par: 72, cr: 72.6, slope: 134, length: "6 231 m", greenFee: "280 PLN", bookingUrl: "https://mazurygolf.pl/", desc: "Dzieło Martina Hawtree w sercu Warmii i Mazur, naturalne przeszkody wodne i lasy.", aiTip: "Uważaj na ślepe uderzenia na drugiej dziewiątce." },
    { id: 13, name: "Rosa Private Golf Club", city: "Konopiska k. Częstochowy", voivodeship: "Śląskie", region: "POLUDNIE", holes: 18, holesLabel: "18 dołków", par: 72, cr: 73.8, slope: 138, length: "6 410 m", greenFee: "420 PLN", bookingUrl: "https://rosa.golf/", desc: "Luksusowe pole mistrzowskie, wielokrotny gospodarz turniejów zawodowych Challenge Tour.", aiTip: "Woda w grze na 14 z 18 dołków – zachowaj konserwatywny Course Management." },
    { id: 14, name: "Krakow Valley Golf & Country Club", city: "Paczółtowice", voivodeship: "Małopolskie", region: "POLUDNIE", holes: 18, holesLabel: "18 + 9 dołków", par: 72, cr: 73.9, slope: 137, length: "6 518 m", greenFee: "300 PLN", bookingUrl: "https://krakow-valley.com/", desc: "Zaprojektowane przez Ronalda Freama na Jurze Krakowsko-Częstochowskiej, głębokie bunkry.", aiTip: "Długie Par 4 pod wiatr – przygotuj dobrą grę hybrydą." },
    { id: 15, name: "Royal Kraków Golf & Country Club", city: "Ochmanów k. Wieliczki", voivodeship: "Małopolskie", region: "POLUDNIE", holes: 18, holesLabel: "18 dołków", par: 72, cr: 70.8, slope: 127, length: "5 890 m", greenFee: "260 PLN", bookingUrl: "https://royalkrakow.com/", desc: "Malownicze pole na wzgórzach pod Krakowem z piękną panoramą Pogórza Wielickiego.", aiTip: "Świetne pole na pobicie życiówki poniżej 80 uderzeń." },
    { id: 16, name: "Toya Golf & Country Club Wrocław", city: "Kryniczno k. Wrocławia", voivodeship: "Dolnośląskie", region: "POLUDNIE", holes: 18, holesLabel: "18 dołków", par: 72, cr: 72.3, slope: 133, length: "6 215 m", greenFee: "320 PLN", bookingUrl: "https://toyagolf.pl/", desc: "Pole zbudowane na dawnym poligonie, liczne stawy i perfekcyjny drenaż.", aiTip: "Zwróć uwagę na pozycję flagi na wielopoziomowych greenach." },
    { id: 17, name: "Gradi Golf Club", city: "Brzeźno k. Wrocławia", voivodeship: "Dolnośląskie", region: "POLUDNIE", holes: 18, holesLabel: "18 dołków", par: 71, cr: 70.4, slope: 128, length: "5 780 m", greenFee: "270 PLN", bookingUrl: "https://gradigolf.pl/", desc: "Pole przy Pałacu Brzeźno, gospodarz turniejów Pro Golf Tour, słynie z dołka nr 15 z wyspowym greenem.", aiTip: "Na 15. dołku (Par 3 na wyspę) dobierz kij o pół numeru większy przy wietrze." },
    { id: 18, name: "Śląski Klub Golfowy", city: "Siemianowice Śląskie", voivodeship: "Śląskie", region: "POLUDNIE", holes: 18, holesLabel: "18 dołków", par: 72, cr: 71.4, slope: 130, length: "6 010 m", greenFee: "260 PLN", bookingUrl: "https://skg.pl/", desc: "Klasyczne pole parkowe w sercu aglomeracji śląskiej z dojrzałym drzewostanem.", aiTip: "Wąskie wyjścia z tee na pierwszej dziewiątce." },
    { id: 19, name: "Kalinowe Pola Golf Village", city: "Niesulice k. Świebodzina", voivodeship: "Lubuskie", region: "POLUDNIE", holes: 18, holesLabel: "18 + 9 dołków", par: 72, cr: 72.2, slope: 131, length: "6 180 m", greenFee: "290 PLN", bookingUrl: "https://kalinowepola.pl/", desc: "Kompleks golfowy nad jeziorem Niesłysz, znany z fantastycznej atmosfery turniejowej.", aiTip: "Idealne pod dwudniowe turnieje społeczności TGN." },
    { id: 20, name: "Black Water Links", city: "Tarnowo Podgórne k. Poznania", voivodeship: "Wielkopolskie", region: "CENTRUM", holes: 18, holesLabel: "18 + 6 dołków", par: 72, cr: 72.9, slope: 134, length: "6 390 m", greenFee: "310 PLN", bookingUrl: "https://blackwaterlinks.pl/", desc: "Najnowsze pełnowymiarowe pole mistrzowskie w Wielkopolsce w czystym stylu szkockiego links.", aiTip: "Wietrzny, otwarty teren – prowadź piłkę nisko nad ziemią." },
    { id: 21, name: "A&A Arkadia Golf Club", city: "Pabianice k. Łodzi", voivodeship: "Łódzkie", region: "CENTRUM", holes: 18, holesLabel: "18 dołków", par: 72, cr: 70.9, slope: 125, length: "5 850 m", greenFee: "220 PLN", bookingUrl: "https://golf.com.pl/", desc: "Centralnie położone pole w Polsce, świetne do szybkich rund treningowych.", aiTip: "Przyjazny Slope (125) – świetne miejsce na testowanie nowych kijów." },
    { id: 22, name: "Gorzowski Klub Golfowy Zawarcie", city: "Gorzów Wielkopolski", voivodeship: "Lubuskie", region: "POLNOC", holes: 9, holesLabel: "9 dołków", par: 72, cr: 70.2, slope: 124, length: "2 822 m (9d)", greenFee: "150 PLN", bookingUrl: "https://golfgorzow.pl/", desc: "Miejskie 9-dołkowe pole nad Wartą skalibrowane do ciekawej 18-dołkowej rundy.", aiTip: "Szybki trening dokładności żelaz i krótkiej gry." },
    { id: 23, name: "Tatfort Golf Club", city: "Toruń", voivodeship: "Kujawsko-Pomorskie", region: "CENTRUM", holes: 9, holesLabel: "9 dołków", par: 70, cr: 68.5, slope: 119, length: "2 650 m (9d)", greenFee: "140 PLN", bookingUrl: "https://tatfortgolf.pl/", desc: "Pole zlokalizowane w granicach administracyjnych Torunia z rozbudowanym driving range.", aiTip: "Idealne na trening wedge'y 50°–58°." },
    { id: 24, name: "Golf Park Lipowy Most", city: "Supraśl k. Białegostoku", voivodeship: "Podlaskie", region: "POLNOC", holes: 9, holesLabel: "9 dołków", par: 70, cr: 69.1, slope: 123, length: "2 710 m (9d)", greenFee: "150 PLN", bookingUrl: "https://lipowymost.pl/", desc: "Kameralne pole w sercu Puszczy Knyszyńskiej.", aiTip: "Wąskie leśne korytarze wymagają prostej gry z tee." },
    { id: 25, name: "Karolinka Golf Park & Armada Golf", city: "Kamień Śląski / Bytom", voivodeship: "Opolskie / Śląskie", region: "POLUDNIE", holes: 9, holesLabel: "9 dołków", par: 72, cr: 69.8, slope: 125, length: "2 910 m (9d)", greenFee: "160 PLN", bookingUrl: "https://karolinkagolfpark.pl/", desc: "Nowoczesne obiekty 9-dołkowe na południu Polski z doskonałą infrastrukturą treningową.", aiTip: "Świetne na 2-godzinną rundę po pracy." }
  ],
  events2027: [
    { id: 301, cat: "SIM", title: "🏆 Wielki Finał Zimowej Ligi Symulatorowej TGN 2027", date: "23–24 Stycznia 2027", location: "Warszawa / Szczecin / Kraków (TrackMan Live Link)", format: "Stroke Play Netto + Gross (18 dołków)", fee: "Bezpłatne dla TGN Level 10+", xpReward: "+350 XP", spotsLeft: 8, maxSpots: 64, aiFit: "98% dopasowania (Twój Swing 96 mph daje przewagę na długich Par 5)", desc: "Zwieńczenie zimowego sezonu symulatorowego. Połączone studia TrackMan w całej Polsce w czasie rzeczywistym.", registered: true },
    { id: 302, cat: "FITTING", title: "🎯 TGN National Demo & AI Gapping Day 2027", date: "13 Marca 2027", location: "Binowo Park Golf Club (Szczecin) & First Warsaw", format: "Sesje indywidualne 45 min z certyfikowanym Fitterem PGA", fee: "0 PLN (Kaucja zwrotna w Sklepie TGN)", xpReward: "+200 XP", spotsLeft: 5, maxSpots: 30, aiFit: "Kluczowe wydarzenie: Test nowego Gap Wedge 52° pod Twoją lukę 15m", desc: "Oficjalne otwarcie wiosennych testów sprzętowych. Przetestuj pełną linię Wilson Dynapower, TaylorMade i Mizuno.", registered: false },
    { id: 303, cat: "MAJOR", title: "⛳ TGN Spring Open 2027 – Inauguracja Sezonu Polowego", date: "17–18 Kwietnia 2027", location: "Modry Las Golf Resort (Choszczno)", format: "Stableford Netto (Grupy HCP: 0–12, 12.1–20, 20.1–36)", fee: "420 PLN (W cenie Green Fee, pakiet Pro V1x i bankiet)", xpReward: "+500 XP", spotsLeft: 14, maxSpots: 90, aiFit: "Szansa na awans do grupy HCP Single Digit przed latem", desc: "Pierwszy wielkoszlemowy turniej społeczności TGN w sezonie 2027 na mistrzowskim polu projektu Gary'ego Playera.", registered: false },
    { id: 304, cat: "SIM", title: "👻 TGN Ghost Match Europe Tour – Turniej Letni", date: "1–30 Czerwca 2027", location: "Dowolne pole w Polsce z rejestracją GPS / TGN Smart Tags", format: "Asynchroniczny Match Play przeciwko duchowi rywala", fee: "50 PLN (Pula nagród Trade-In: 10 000 PLN)", xpReward: "+300 XP", spotsLeft: 42, maxSpots: 200, aiFit: "Zoptymalizowane pod Twoją częstotliwość gry w weekendy", desc: "Rozegraj rundę w dowolny dzień czerwca i zmierz się dołek po dołku z zapisem telemetrii innego gracza.", registered: false },
    { id: 305, cat: "CAMP", title: "☀️ Letnia Akademia Short Game & Bunkier Masterclass", date: "16–18 Lipca 2027", location: "Rosa Private Golf Club (Częstochowa)", format: "3-dniowy obóz treningowy + runda egzaminacyjna", fee: "1 490 PLN", xpReward: "+400 XP", spotsLeft: 4, maxSpots: 16, aiFit: "Rekomendowane przez Gapping AI: redukcja uderzeń poniżej 80m", desc: "Intensywne zgrupowanie skupione na grze wedge'ami (50°–58°) oraz strategii Course Management.", registered: false },
    { id: 306, cat: "MAJOR", title: "👑 TGN Polish Masters Championship – Finał Sezonu 2027", date: "11–12 Września 2027", location: "First Warsaw Golf & Country Club (Rajszew)", format: "2-dniowy Finał Order of Merit (Stroke Play Netto / Gross)", fee: "550 PLN (Dla Top 30 rankingu TGN – udział darmowy)", xpReward: "+1 000 XP", spotsLeft: 19, maxSpots: 80, aiFit: "Twoje domowe pole (Warszawa) – najwyższe prawdopodobieństwo podium!", desc: "Najważniejsze wydarzenie roku 2027. Zwycięzca otrzymuje pełny zestaw kijów Kolekcji 2027.", registered: false }
  ],
  forumPosts: [
    {
      id: 101, pinned: true, catKey: "PORADNIKI", category: "📌 PRZYPIĘTY PORADNIK • PGA PRO",
      title: "[KOMPENDIUM 2021–2026] Jak zejść z HCP 36 do jednocyfrowego – mapa drogowa treningu i gappingu",
      author: "Pro Adam Szymański", badge: "PGA PRO • 1 420 postów", badgeClass: "badge-pro",
      date: "Zaktualizowano: Listopad 2026 (Oryginał: Maj 2021)", views: "48 920", likes: 312,
      content: "Przez ostatnie 5 lat na forum TGN przeanalizowaliśmy ponad 3 000 raportów z TrackMana naszych klubowiczów. 80% graczy traci najwięcej uderzeń między 40 a 100 metrem oraz przez źle dobrany loft drivera. 1) Testuj carry, nie total distance. 2) Utrzymuj odstęp 12-15m między każdym kijem w torbie. 3) Zapisuj statystyki putów po każdej rundzie.",
      comments: [
        { author: "StaryWyga_Golf", badge: "TGN OG • 2021", badgeClass: "badge-og", date: "14.06.2021", text: "Klasyk tego forum! W 2021 zaczynałem z HCP 28 czytając ten wątek, dzisiaj kończę sezon 2026 z 8.4." },
        { author: "Kamil_Golf", badge: "WETERAN • 890 postów", badgeClass: "badge-vet", date: "03.09.2024", text: "Punkt o gappingu wedge'y zmienił u mnie wszystko. Dokupiłem 52° i od razu urwałem 4 uderzenia na rundę." },
        { author: "Marek Kowalski", badge: "HCP 12.4", badgeClass: "badge-vet", date: "2 dni temu", text: "Właśnie algorytm TGN wykrył u mnie lukę 15m na Gap Wedge – wracam do tego poradnika przed fittingiem!" }
      ]
    },
    {
      id: 102, pinned: false, catKey: "FITTING", category: "⚙️ Custom Fitting & Telemetria",
      title: "Shaft Stiff vs Regular przy swing speed 95-98 mph – wielki test społeczności TGN",
      author: "Marek Kowalski (HCP 12.4)", badge: "TRUSTED SELLER", badgeClass: "badge-vet",
      date: "Wczoraj, 18:45", views: "1 240", likes: 47,
      content: "Zauważyłem na symulatorze, że przy mojej średniej prędkości drivera 96 mph i dynamicznym przejściu z backswingu piłka ucieka w prawy push-fade. Czy przejście z Ventus Regular na Ventus Blue 6S (Stiff) w Wilsonie Dynapower ustabilizuje rozrzut?",
      comments: [
        { author: "Trener PGA Tomasz", badge: "FITTING MASTER", badgeClass: "badge-pro", date: "Wczoraj, 19:12", text: "Przy 96 mph jesteś dokładnie na granicy. Kluczowy jest tzw. transition (tempo). Jeśli agresywnie przyspieszasz z góry, 6S obniży spin o ok. 350 RPM i zacieśni dyspersję." },
        { author: "Janusz_G", badge: "TGN OG • 2021", badgeClass: "badge-og", date: "Dzisiaj, 08:30", text: "Miałem identyczne liczby na TrackManie w 2023 roku. Zmiana na Stiff 65g dała mi +11 metrów carry." }
      ]
    },
    {
      id: 103, pinned: false, catKey: "SPRZET", category: "🏌️ Sprzęt & Recenzje Graczy",
      title: "Mizuno JPX 923 Hot Metal vs Forged po 3 sezonach gry – wrażenia i zdjęcia główek",
      author: "Bartek_W", badge: "TGN OG • 2021", badgeClass: "badge-og",
      date: "3 dni temu", views: "3 410", likes: 89,
      content: "Od 2023 roku gram na Mizuno JPX 923 Hot Metal i jestem zachwycony wybaczaniem błędów, ale rozważam przesiadkę na model Forged lub nową serię 2026. Kto z Was robił taki przeskok przy HCP w okolicach 10-13?",
      comments: [
        { author: "Michał_Kraków", badge: "HCP 7.1", badgeClass: "badge-vet", date: "2 dni temu", text: "Zrobiłem ten ruch rok temu. Na początku straciłem ok. 4m na 7-ironie, ale kontrola odległości z roughu jest bezcenna." }
      ]
    }
  ],
  marketplace: [
    { title: "Wilson Dynapower Carbon Driver", seller: "Janusz_G (HCP 14)", price: "1 150 PLN", cond: "Stan: 9/10", desc: "Znakomity driver, Fujikura Ventus Regular, headcover w zestawie.", imgUrl: null },
    { title: "Mizuno JPX 923 Forged Irons", seller: "Kamil_Golf (HCP 8.2)", price: "3 690 PLN", cond: "Stan: 9/10", desc: "Shaft Project X IO Stiff. Kute żelaza, niesamowite czucie przy trafieniu.", imgUrl: null },
    { title: "Scotty Cameron Special Select Newport 2 Putter", seller: "Bartek_W (HCP 11)", price: "1 450 PLN", cond: "Stan: Mint", desc: "Długość 34 cale, oryginalny grip Pistolini Plus, stan kolekcjonerski.", imgUrl: null },
    { title: "Titleist Vokey SM10 52 Wedge", seller: "Piotr_T (HCP 15)", price: "520 PLN", cond: "Stan: 8.5/10", desc: "Idealny Gap Wedge do uzupełnienia luki dystansowej około 100 metrów.", imgUrl: null }
  ],
  chatMessages: [
    { sender: "Janusz_G", text: "Cześć! Czy oferta wymiany lub zakupu kijów z Twojej torby jest aktualna?", type: "incoming" },
    { sender: "Marek Kowalski", text: "Cześć! Tak, właśnie przeglądam wycenę Mizuno JPX 923 i Qi10 w kokpicie 3D.", type: "outgoing" },
    { sender: "Janusz_G", text: "Super, możemy się złapać w sobotę na symulatorze w Warszawie na testy!", type: "incoming" }
  ]
};
