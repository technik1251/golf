const ClubImageEngine = {
  cache: {},
  currentModalClub: "",
  searchVariantIndex: 0,

  buildDirectSearchPhotoUrl: (clubName, variant = 0) => {
    const cleanName = clubName
      .replace(/DRIVER:|IRON:|PUTTER:|WEDGE:|HYBRYDA:/gi, '')
      .replace(/\(.*?\)/g, '')
      .trim();

    const searchModifiers = [
      "golf club head product photo white background",
      "golf club official studio photo",
      "golf club close up head",
      "golf equipment isolated photo"
    ];
    const modifier = searchModifiers[variant % searchModifiers.length];
    const serverNum = (variant % 4) + 1;
    const query = `${cleanName} ${modifier}`;

    return `https://tse${serverNum}.mm.bing.net/th?q=${encodeURIComponent(query)}&w=500&h=500&c=7&rs=1&p=0`;
  },

  getGoogleImagesUrl: (clubName) => {
    const cleanName = clubName.replace(/DRIVER:|IRON:|PUTTER:|WEDGE:/gi, '').trim();
    return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(cleanName + ' golf club')}`;
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

const AppData = {
  activeForumFilter: "ALL",
  activeStoreFilter: "ALL",
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
  storeProducts: [
    { id: 201, cat: "DRIVERY", tag: "REKOMENDACJA AI 2026", tagGold: true, name: "Wilson Dynapower Carbon Driver", spec: "Loft: 10.5° • Shaft: Fujikura Ventus Blue 6S (Stiff)", desc: "Zaprojektowany przez AI panel karbonowy. Daje +14m dystansu przy Twojej prędkości swingu 96 mph.", price: 2390, tradeInPrice: 940, imgUrl: null },
    { id: 202, cat: "WEDGE", tag: "WYPEŁNIA LUKĘ GAPPINGU", tagGold: true, name: "Titleist Vokey SM10 52 Wedge", spec: "Gap Wedge 52° • Frezowane rowki CNC Spin-Max", desc: "Idealnie wypełnia Twoją lukę 15m między Pitching Wedge a Sand Wedge wykrytą przez Gapping AI.", price: 790, tradeInPrice: 350, imgUrl: null },
    { id: 203, cat: "IRONY", tag: "KOLEKCJA 2026", tagGold: false, name: "Mizuno JPX 923 Forged Irons", spec: "Stal kuta 1025 • Shaft: Nippon Modus 105 Stiff", desc: "Wyższe wybaczanie błędów i powtarzalny carry co do metra. W zestawie darmowa sesja na TrackManie.", price: 4890, tradeInPrice: 2140, imgUrl: null },
    { id: 204, cat: "DRIVERY", tag: "BESTSELLER PRO", tagGold: false, name: "TaylorMade Qi10 Max Driver", spec: "MOI 10,000 g/cm² • Loft: 9.0° lub 10.5°", desc: "Maksymalna bezwładność główki gwarantująca proste strzały z tee nawet przy trafieniu poza środkiem.", price: 2690, tradeInPrice: 1240, imgUrl: null },
    { id: 205, cat: "AKCESORIA", tag: "EDYCJA TURNIEJOWA", tagGold: false, name: "Scotty Cameron Phantom Putter", spec: "34 cale • Frezowana stal 303 + Aluminium", desc: "Najpopularniejszy putter turniejowy z wysokim MOI i potrójną linią celowniczą.", price: 1890, tradeInPrice: 950, imgUrl: null },
    { id: 206, cat: "AKCESORIA", tag: "TELEMETRIA 3D", tagGold: false, name: "Cleveland RTX 6 ZipCore 56 Wedge", spec: "Sand Wedge 56° • UltiZip Grooves", desc: "Maksymalny spin z bunkra i głębokiego roughu w każdych warunkach pogodowych.", price: 690, tradeInPrice: 320, imgUrl: null }
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
