/* =========================================================================
   MODUŁ SKLEPU TGN v18.0 (ELITE MOBILE UI):
   - Poziomy, przewijany pasek kategorii (Slider) oszczędzający miejsce na telefonie
   - Czysty, minimalistyczny nagłówek i siatka produktowa klasy Premium
   - Szuflada koszyka i wybór wariantów
   ========================================================================= */

(function injectStoreV18Styles() {
  ['tgnStoreAiStyles', 'tgnStoreV13Styles', 'tgnStoreV14Styles', 'tgnStoreV15Styles', 'tgnStoreV16Styles', 'tgnStoreV17Styles'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
  if (document.getElementById('tgnStoreV18Styles')) return;

  const style = document.createElement('style');
  style.id = 'tgnStoreV18Styles';
  style.textContent = `
    /* Koszyk szufladowy (Slide-Over) */
    #tgnCartDrawerBackdrop {
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px); z-index: 9990; display: none; justify-content: flex-end;
    }
    .cart-drawer-panel {
      width: 100%; max-width: 480px; height: 100vh; height: 100dvh;
      background: linear-gradient(165deg, #0d1f24, #061014); border-left: 2px solid var(--accent);
      display: flex; flex-direction: column; box-shadow: -15px 0 50px rgba(0, 0, 0, 0.9);
      animation: slideInRight 0.25s ease-out;
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .cart-drawer-header {
      padding: 1.1rem 1.25rem; background: rgba(0, 0, 0, 0.45); border-bottom: 1px solid var(--glass-border);
      display: flex; justify-content: space-between; align-items: center;
    }
    .cart-drawer-body {
      flex: 1; overflow-y: auto; padding: 1.1rem 1.25rem; display: flex; flex-direction: column; gap: 0.85rem;
    }
    .cart-drawer-footer {
      padding: 1rem 1.25rem; background: rgba(5, 14, 18, 0.96); border-top: 1px solid var(--glass-border);
    }
    .cart-item-row {
      background: rgba(255, 255, 255, 0.045); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px; padding: 0.75rem; display: grid; grid-template-columns: 60px 1fr; gap: 0.75rem; align-items: center;
    }
    .cart-item-thumb {
      width: 60px; height: 60px; background: #fff; border-radius: 8px; overflow: hidden;
      display: flex; align-items: center; justify-content: center; border: 1px solid var(--glass-border);
    }
    .cart-item-thumb img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }

    #tgnFloatingCartBtn {
      position: fixed; bottom: 22px; right: 22px; background: var(--accent); color: #052e16;
      border: 2px solid #ffffff; border-radius: 30px; padding: 0.7rem 1.2rem; font-size: 0.85rem; font-weight: 900;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.75); cursor: pointer; z-index: 8500;
      display: flex; align-items: center; gap: 8px; transition: transform 0.2s;
    }
    #tgnFloatingCartBtn:hover { transform: scale(1.06); }

    .prod-variant-box {
      background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 8px; padding: 0.45rem 0.6rem; margin-bottom: 0.55rem;
    }
    .prod-variant-box label { display: block; font-size: 0.62rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 3px; }
    .prod-variant-box select, .prod-variant-box input {
      width: 100%; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(114, 214, 150, 0.35);
      border-radius: 5px; padding: 0.35rem 0.5rem; color: #fff; font-size: 0.74rem; outline: none;
    }
    .prod-variant-box select option { background: #091519; color: #fff; }

    /* Nowy, kompaktowy i elegancki poziomy slider kategorii na telefonie */
    .store-category-slider {
      display: flex;
      gap: 0.5rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
      scrollbar-width: thin;
      scrollbar-color: var(--accent) rgba(0,0,0,0.2);
    }
    .store-category-slider::-webkit-scrollbar {
      height: 4px;
    }
    .store-category-slider::-webkit-scrollbar-thumb {
      background: var(--accent);
      border-radius: 4px;
    }
    .cat-pill-chip {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.14);
      color: var(--text-main);
      padding: 0.45rem 0.95rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      transition: 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .cat-pill-chip:hover {
      background: rgba(74, 222, 128, 0.15);
      border-color: var(--accent);
      color: var(--accent);
    }
    .cat-pill-chip.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #052e16;
      font-weight: 800;
    }

    .elite-store-bar {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(56, 189, 248, 0.08));
      border: 1px solid rgba(74, 222, 128, 0.35); border-radius: 12px; padding: 0.75rem 1.1rem; margin-bottom: 1rem;
    }
    .elite-badge-pill {
      display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 0, 0, 0.5);
      border: 1px solid var(--accent); padding: 4px 11px; border-radius: 20px; font-size: 0.74rem; font-weight: 800; color: var(--accent);
    }

    .store-ai-assistant-box {
      background: linear-gradient(145deg, rgba(16, 38, 44, 0.96), rgba(8, 20, 24, 0.98));
      border: 2px solid rgba(56, 189, 248, 0.55); border-radius: 16px; padding: 1.1rem 1.25rem; margin-bottom: 1.2rem;
    }
    .store-ai-header {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;
      gap: 0.5rem; padding-bottom: 0.65rem; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .ai-pulse-dot { width: 10px; height: 10px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 12px #4ade80; display: inline-block; }
    .store-ai-messages { max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem; }
    .store-ai-msg { font-size: 0.78rem; line-height: 1.45; padding: 0.55rem 0.85rem; border-radius: 10px; }
    .store-ai-msg.bot { background: rgba(56, 189, 248, 0.12); border-left: 3px solid #38bdf8; color: #f1f5f9; }
    .store-ai-msg.user { background: rgba(74, 222, 128, 0.18); border-right: 3px solid #4ade80; color: #4ade80; align-self: flex-end; }
    .store-ai-quick-prompts { display: flex; gap: 0.45rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
    .store-ai-input-row { display: flex; gap: 0.5rem; }
    .store-ai-input-row input {
      flex: 1; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 8px; padding: 0.55rem 0.85rem; color: #fff; font-size: 0.78rem; outline: none;
    }
    .store-ai-input-row button {
      background: #38bdf8; color: #041e2b; border: none; border-radius: 8px; padding: 0 1.1rem;
      font-size: 0.76rem; font-weight: 800; cursor: pointer; white-space: nowrap;
    }

    #tgnGlobalPromoOverlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh;
      background: rgba(0, 0, 0, 0.82); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      display: none; align-items: center; justify-content: center; z-index: 9999; padding: 1rem;
    }
    .promo-modal-box {
      width: 100%; max-width: 400px; max-height: 88dvh; overflow-y: auto;
      background: linear-gradient(160deg, #102428, #081317); border: 2px solid #4ade80;
      border-radius: 20px; padding: 1.4rem 1.25rem; text-align: center;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9); position: relative; margin: auto;
    }
    .promo-info-circle {
      width: 54px; height: 54px; border-radius: 50%; border: 3px solid #38bdf8; color: #38bdf8;
      display: flex; align-items: center; justify-content: center; font-size: 1.7rem; font-weight: 800;
      margin: 0 auto 0.75rem; background: rgba(56, 189, 248, 0.1);
    }
    .rabat-code-pill {
      display: inline-block; background: rgba(250, 204, 21, 0.18); border: 2px dashed #facc15;
      color: #facc15; font-size: 1.15rem; font-weight: 900; padding: 0.4rem 1.1rem; border-radius: 10px;
      letter-spacing: 1.5px; margin: 0.5rem 0; cursor: pointer;
    }

    .store-admin-add-box {
      background: rgba(8, 22, 26, 0.98); border: 2px solid var(--gold); border-radius: 16px;
      padding: 1.15rem; margin-bottom: 1.25rem; box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75);
    }
    .store-add-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; }
    .store-add-grid label { display: block; font-size: 0.65rem; color: #94a3b8; text-transform: uppercase; margin-bottom: 3px; }
    .store-add-grid input, .store-add-grid select {
      width: 100%; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 6px; padding: 0.45rem 0.6rem; color: #fff; font-size: 0.75rem; outline: none;
    }
    .store-add-grid select option { background: #091519; color: #fff; }

    .checkout-form-box {
      background: rgba(5, 14, 18, 0.95); border: 2px solid var(--accent); border-radius: 14px; padding: 1.2rem; margin-top: 0.9rem;
    }
    .checkout-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.7rem; margin-bottom: 0.8rem; }
    .checkout-grid label { display: block; font-size: 0.66rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 3px; }
    .checkout-grid input, .checkout-grid select {
      width: 100%; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 7px; padding: 0.55rem 0.7rem; color: #fff; font-size: 0.78rem; outline: none;
    }

    @media (max-width: 1024px) {
      .store-add-grid, .checkout-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .store-add-grid, .checkout-grid { grid-template-columns: 1fr; gap: 0.4rem; }
      .store-ai-input-row { flex-direction: column; }
      .store-ai-input-row button { padding: 0.55rem; }
      .cart-drawer-panel { max-width: 100vw; }
      #tgnFloatingCartBtn { bottom: 15px; right: 15px; padding: 0.6rem 1rem; font-size: 0.78rem; }
    }
  `;
  document.head.appendChild(style);
})();

const StoreComponent = {
  previewTimer: null,
  editingProductId: null,

  ensureStoreDataInitialized: () => {
    AppData.storeCategories = [
      { id: "ALL", label: "Wszystkie", icon: "🏬" },
      { id: "PILKI", label: "Piłki & Lake Balls", icon: "⚪" },
      { id: "PERSONALIZACJA", label: "Personalizacja", icon: "🖨️" },
      { id: "KIJE_NOWE", label: "Kije Nowe", icon: "🏌️" },
      { id: "UZYWANE_KIJE", label: "Używane CPO", icon: "♻️" },
      { id: "UZYWANY_SPRZET", label: "Sprzęt CPO", icon: "🛠️" },
      { id: "TRENING", label: "Trening", icon: "🏋️" },
      { id: "PREZENTY", label: "Prezenty", icon: "🎁" },
      { id: "TORBY", label: "Torby", icon: "🎒" },
      { id: "WOZKI", label: "Wózki", icon: "🛒" },
      { id: "ODZIEZ", label: "Odzież & Buty", icon: "👕" },
      { id: "GPS", label: "Elektronika & GPS", icon: "🔭" },
      { id: "AKCESORIA", label: "Akcesoria", icon: "🧤" }
    ];

    const extraProducts = [
      {
        id: 251, section: "BALLS", cat: "PERSONALIZACJA", brand: "Titleist", flex: "N/A", hand: "ALL", loft: "Tuzin (12 szt.) + Twój Nadruk",
        condition: "Nowe z personalizacją UV", condDetails: "Nadruk Twojego logo, inicjałów lub numeru w cenie!", tag: "PERSONALIZACJA PIŁEK", tagGold: true,
        name: "Personalizowane Piłki Titleist Pro V1 z Twoim Logo / Tekstem (12 szt.)",
        spec: "Trwały nadruk UV w pełnym kolorze • Czas realizacji: 48h",
        desc: "Idealne na turnieje firmowe lub jako unikalny identyfikator na polu. Wpisz tekst nadruku przed dodaniem do koszyka.",
        oldPrice: 299, price: 249, tradeInPrice: 249, stock: 30, imgUrl: null,
        variants: ["Pro V1 (Białe)", "Pro V1x (Białe)", "Pro V1 High Optic Yellow"]
      },
      {
        id: 252, section: "NEW", cat: "PREZENTY", brand: "Titleist", flex: "N/A", hand: "ALL", loft: "Box Prezentowy VIP",
        condition: "Zestaw Prezentowy", condDetails: "Zapakowane w eleganckie pudełko prezentowe", tag: "POMYSŁ NA PREZENT", tagGold: true,
        name: "Golfowy Zestaw Prezentowy VIP (Piłki Pro V1 + Pitchmark + Marker + Ręcznik)",
        spec: "Gotowy upominek dla każdego golfisty • Możliwość dodania dedykacji",
        desc: "Kompletny zestaw prezentowy najwyższej jakości, który ucieszy zarówno początkującego, jak i niskiego handicapowca.",
        oldPrice: 390, price: 319, tradeInPrice: 319, stock: 12, imgUrl: null,
        variants: ["Zestaw Standard VIP", "Zestaw VIP + Kartka z dedykacją"]
      },
      {
        id: 253, section: "NEW", cat: "TRENING", brand: "Wellputt", flex: "N/A", hand: "ALL", loft: "Długość: 3m / 4m",
        condition: "Fabrycznie nowa", condDetails: "Prędkość greenu 10 / 11.5 ft • Aplikacja treningowa", tag: "TRENING W DOMU", tagGold: false,
        name: "Mata Treningowa do Putowania Wellputt Mat Pro (10/11.5 ft)",
        spec: "Zatwierdzona przez trenera Camerona McCormicka • Ponad 50 ćwiczeń",
        desc: "Najlepsza mata treningowa odwzorowująca realną prędkość szybkiego greenu turniejowego.",
        oldPrice: 790, price: 649, tradeInPrice: 450, stock: 7, imgUrl: null,
        variants: ["Długość 3 metry (649 PLN)", "Długość 4 metry Pro"]
      },
      {
        id: 254, section: "NEW", cat: "TRENING", brand: "SuperSpeed", flex: "N/A", hand: "ALL", loft: "Zestaw 3 trenażerów",
        condition: "Fabrycznie nowy", condDetails: "Zwiększa prędkość swingu o +5% w 6 tygodni", tag: "TRENING PRĘDKOŚCI", tagGold: true,
        name: "Trenażer Prędkości Swingu SuperSpeed Golf Training System (3 kije)",
        spec: "3 specjalnie wyważone shafty (Lekki, Średni, Ciężki) + Program treningowy",
        desc: "Trening overspeed pozwoli Ci przejść z obecnych 96 mph na ponad 102 mph prędkości główki drivera!",
        oldPrice: 1090, price: 899, tradeInPrice: 590, stock: 5, imgUrl: null,
        variants: ["Zestaw Męski (Men's Set)", "Zestaw Senior / Damski"]
      },
      {
        id: 255, section: "USED", cat: "UZYWANY_SPRZET", brand: "Garmin", flex: "N/A", hand: "ALL", loft: "Launch Monitor + GPS",
        condition: "Używany 9.0/10 (CPO)", condDetails: "Pełen komplet z futerałem i gwarancją rozruchową 12 mies.", tag: "UŻYWANY SPRZĘT CPO", tagGold: true,
        name: "Używany Radar / Symulator Golfowy Garmin Approach R10 Launch Monitor",
        spec: "Mierzy prędkość kija, piłki, Smash Factor, Spin i kąt natarcia • Przenośny",
        desc: "Przetestowany egzemplarz komisowy. Pozwala grać na wirtualnych polach na driving range lub w domu.",
        oldPrice: 2590, price: 1690, tradeInPrice: 890, stock: 1, imgUrl: null,
        variants: ["Egzemplarz CPO #1 (Stan 9/10)"]
      },
      {
        id: 256, section: "NEW", cat: "AKCESORIA", brand: "FootJoy", flex: "N/A", hand: "RH", loft: "2-Pack (M / ML / L)",
        condition: "Fabrycznie nowe", condDetails: "Na każdą pogodę • Wstawki ze skóry Cabretta", tag: "NIEZBĘDNIK GRACZA", tagGold: false,
        name: "Rękawiczki Golfowe FootJoy WeatherSof (2-Pack) + Zestaw Tee Drewnianych",
        spec: "Na lewą dłoń (dla praworęcznych RH) • Oddychający materiał FiberSof",
        desc: "Najlepiej sprzedająca się rękawiczka golfowa na świecie w pakiecie z 50 drewnianymi kołeczkami tee.",
        oldPrice: 149, price: 119, tradeInPrice: 119, stock: 25, imgUrl: null,
        variants: ["Rozmiar S (Na lewą dłoń RH)", "Rozmiar M (Na lewą dłoń RH)", "Rozmiar ML (Na lewą dłoń RH)", "Rozmiar L (Na lewą dłoń RH)", "Rozmiar XL (Na lewą dłoń RH)"]
      }
    ];

    extraProducts.forEach(ep => {
      if (!AppData.storeProducts.some(p => p.id === ep.id)) {
        AppData.storeProducts.push(ep);
      }
    });

    try {
      const savedCart = localStorage.getItem('tgn_persistent_cart');
      if (savedCart && (!AppData.cart || AppData.cart.length === 0)) {
        AppData.cart = JSON.parse(savedCart);
      }
      const savedCustom = JSON.parse(localStorage.getItem('tgn_custom_store_products') || '[]');
      savedCustom.forEach(cp => {
        const existingIdx = AppData.storeProducts.findIndex(p => p.id === cp.id);
        if (existingIdx >= 0) AppData.storeProducts[existingIdx] = cp;
        else AppData.storeProducts.unshift(cp);
      });
      const deletedIds = JSON.parse(localStorage.getItem('tgn_deleted_prod_ids') || '[]');
      if (deletedIds.length > 0) {
        AppData.storeProducts = AppData.storeProducts.filter(p => !deletedIds.includes(p.id));
      }
    } catch (e) {}

    if (!AppData.storeState) {
      AppData.storeState = {
        section: "ALL", category: "ALL", brand: "ALL", flex: "ALL", hand: "ALL",
        search: "", sortBy: "RECOMMENDED", cartOpen: false, checkoutStep: false, deliveryMethod: "KURIER_DPD"
      };
    }

    if (typeof AppData.storeState.aiAssistantOpen === 'undefined') AppData.storeState.aiAssistantOpen = true;
    if (typeof AppData.storeState.addProductOpen === 'undefined') AppData.storeState.addProductOpen = false;
    if (typeof AppData.storeState.checkoutStep === 'undefined') AppData.storeState.checkoutStep = false;
    if (typeof AppData.storeState.promoModalMode === 'undefined') {
      const alreadySeen = sessionStorage.getItem('tgn_promo_seen');
      AppData.storeState.promoModalMode = alreadySeen ? null : 'RABAT3';
    }
    if (typeof AppData.storeState.discountCodeApplied === 'undefined') {
      AppData.storeState.discountCodeApplied = false;
    }
    if (!AppData.storeState.aiChatHistory) {
      AppData.storeState.aiChatHistory = [
        {
          sender: "TGN AI Pro Fitter",
          text: "Witaj w elitarnym sklepie TGN Pro Shop! Wybierz wariant sprzętu i dodaj go do koszyka. Szuflada zamówień otwiera się po prawej stronie."
        }
      ];
    }
  },

  saveCartToStorage: () => {
    try {
      localStorage.setItem('tgn_persistent_cart', JSON.stringify(AppData.cart || []));
    } catch (e) {}
  },

  getProductVariants: (prod) => {
    if (prod.variants && Array.isArray(prod.variants) && prod.variants.length > 0) return prod.variants;
    if (prod.section === "USED") return [`Egzemplarz CPO (${prod.loft} • ${prod.flex} • ${prod.hand})`];
    if (prod.cat === "DRIVERY") return [`${prod.loft} • Shaft Stiff (S) • RH`, `9.0° • Shaft Stiff (S) • RH`, `10.5° • Shaft Regular (R) • RH`];
    if (prod.cat === "WEDGE") return [`52° / 12F Gap Wedge`, `56° / 10S Sand Wedge`, `60° / 08M Lob Wedge`];
    if (prod.cat === "IRONY") return [`Zestaw 5-PW • Shaft Stiff (S)`, `Zestaw 5-PW • Shaft Regular (R)`];
    if (prod.cat === "PUTTERY") return [`Długość 34 cale (Standard)`, `Długość 35 cali`, `Długość 33 cale`];
    if (prod.cat === "PILKI") return [`Klasa AAAA Pearl (${prod.loft})`, `Klasa AAA Treningowe`];
    if (prod.cat === "ODZIEZ") return [`Rozmiar 42 EU`, `Rozmiar 43 EU`, `Rozmiar 44 EU`, `Rozmiar 45 EU`];
    return [`Wersja Standard (${prod.loft})`];
  },

  syncGlobalCartDrawer: () => {
    StoreComponent.ensureStoreDataInitialized();
    const st = AppData.storeState;

    let fab = document.getElementById('tgnFloatingCartBtn');
    if (!fab) {
      fab = document.createElement('button');
      fab.id = 'tgnFloatingCartBtn';
      fab.onclick = () => StoreComponent.openCartDrawer();
      document.body.appendChild(fab);
    }

    const totalItemsCount = (AppData.cart || []).reduce((sum, i) => sum + (i.qty || 1), 0);
    const rawCartValue = (AppData.cart || []).reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);
    const discountAmount = st.discountCodeApplied ? Math.round(rawCartValue * 0.03) : 0;
    const hasOversize = StoreComponent.cartHasOversizeClub();
    const shippingCost = rawCartValue >= 300 || rawCartValue === 0 ? 0 : (hasOversize ? 29 : 16);
    const finalCartValue = Math.max(0, rawCartValue - discountAmount + shippingCost);

    const isLoggedIn = document.getElementById('mainNav')?.style.display !== 'none';
    fab.style.display = isLoggedIn ? 'flex' : 'none';
    fab.innerHTML = `🛒 Koszyk (${totalItemsCount}) • ${finalCartValue} PLN`;

    let backdrop = document.getElementById('tgnCartDrawerBackdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'tgnCartDrawerBackdrop';
      backdrop.onclick = () => StoreComponent.closeCartDrawer();
      document.body.appendChild(backdrop);
    }

    if (!st.cartOpen) {
      backdrop.style.display = 'none';
      return;
    }

    const itemsHTML = AppData.cart.length === 0 ? `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <div style="font-size:3rem; margin-bottom:0.8rem;">🛒</div>
        <strong style="color:var(--text-main); font-size:0.95rem; display:block; margin-bottom:0.4rem;">Twój koszyk jest pusty</strong>
        <p style="font-size:0.78rem; margin-bottom:1.2rem;">Wybierz sprzęt PGA Tour, używane kije CPO lub akcesoria z katalogu.</p>
        <button class="btn-primary" style="width:auto; padding:0.6rem 1.4rem;" onclick="StoreComponent.closeCartDrawer()">Przeglądaj sklep</button>
      </div>
    ` : AppData.cart.map((item, idx) => {
      const thumbUrl = ClubImageEngine.getClubVisualUrl(item.name, item.imgUrl);
      const fallbackUrl = ClubImageEngine.getFallbackPhoto(item.name);
      return `
        <div class="cart-item-row">
          <div class="cart-item-thumb">
            <img src="${thumbUrl}" alt="${item.name}" onerror="this.onerror=null; this.src='${fallbackUrl}';">
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:6px;">
              <strong style="font-size:0.8rem; color:var(--text-main); line-height:1.25;">${item.name}</strong>
              <button class="btn-mini-tool" style="color:#fca5a5; border-color:rgba(239,68,68,0.35); padding:1px 6px;" onclick="StoreComponent.removeItem(${idx})">✕</button>
            </div>
            <p style="font-size:0.68rem; color:var(--accent); margin:3px 0;">Wariant: ${item.variant || 'Standard'} ${item.modeLabel || ''}</p>
            ${item.customPrint ? `<p style="font-size:0.66rem; color:var(--gold);">🖨️ Nadruk: "${item.customPrint}"</p>` : ''}
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.4rem;">
              <div style="display:flex; align-items:center; gap:0.4rem;">
                <button class="btn-mini-tool" onclick="StoreComponent.changeQty(${idx}, -1)">-</button>
                <strong style="font-size:0.78rem;">${item.qty || 1} szt.</strong>
                <button class="btn-mini-tool" onclick="StoreComponent.changeQty(${idx}, 1)">+</button>
              </div>
              <strong style="font-size:0.88rem; color:var(--gold);">${item.price * (item.qty || 1)} PLN</strong>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const checkoutSectionHTML = (AppData.cart.length > 0 && st.checkoutStep) ? `
      <div style="background:rgba(0,0,0,0.45); border:1px solid var(--accent); border-radius:12px; padding:1rem; margin-top:0.5rem;">
        <h4 style="color:var(--accent); font-size:0.84rem; margin-bottom:0.7rem; text-transform:uppercase;">📦 Dane odbiorcy i dostawa</h4>
        <div style="display:flex; flex-direction:column; gap:0.55rem;">
          <input type="text" id="chkName" value="${AppData.user.name || ''}" placeholder="Imię i Nazwisko *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.78rem;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
            <input type="tel" id="chkPhone" placeholder="Telefon dla kuriera *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.78rem;">
            <input type="email" id="chkEmail" value="${AppData.user.email || ''}" placeholder="E-mail *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.78rem;">
          </div>
          <input type="text" id="chkAddress" placeholder="Ulica i nr domu / Kod Paczkomatu *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.78rem;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
            <input type="text" id="chkCity" value="${AppData.user.city || ''}" placeholder="Kod i Miasto *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.78rem;">
            <input type="text" id="chkNip" placeholder="NIP (opcjonalnie do FV)" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.78rem;">
          </div>
          <select id="chkDelivery" onchange="StoreComponent.setDelivery(this.value)" style="background:#091519; border:1px solid var(--glass-border); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.76rem;">
            <option value="KURIER_DPD">🚚 Kurier DPD Dłużyca Golf (Ubezpieczony)</option>
            ${!hasOversize ? `<option value="INPOST">📦 Paczkomat InPost 24/7</option>` : ''}
            <option value="ODBIOR_TRACKMAN">🎯 Odbiór osobisty + Test na TrackManie (0 PLN)</option>
          </select>
          <select id="chkPayment" style="background:#091519; border:1px solid var(--glass-border); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.76rem;">
            <option value="BLIK">📱 Szybki BLIK (0 PLN)</option>
            <option value="P24">🏦 Przelew Przelewy24 / PayNow</option>
            <option value="CARD">💳 Karta Visa / Mastercard</option>
            <option value="COD">💵 Płatność przy odbiorze</option>
          </select>
          <input type="text" id="chkNotes" placeholder="Uwagi do zamówienia..." style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.55rem; color:#fff; font-size:0.76rem;">
          <label style="font-size:0.7rem; color:var(--text-muted); display:flex; align-items:center; gap:6px; margin-top:2px;">
            <input type="checkbox" id="chkTerms" checked> Akceptuję Regulamin Sklepu TGN oraz Politykę Prywatności.
          </label>
        </div>
      </div>
    ` : '';

    backdrop.innerHTML = `
      <div class="cart-drawer-panel" onclick="event.stopPropagation()">
        <div class="cart-drawer-header">
          <div>
            <strong style="color:var(--accent); font-size:0.95rem;">🛒 Twój Koszyk (${totalItemsCount})</strong>
            <p style="font-size:0.68rem; color:var(--text-muted);">Darmowa wysyłka od 300 PLN • Gwarancja TGN Elite</p>
          </div>
          <button style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:32px; height:32px; border-radius:50%; font-size:1rem; cursor:pointer;" onclick="StoreComponent.closeCartDrawer()">✕</button>
        </div>

        <div class="cart-drawer-body">
          ${itemsHTML}
          ${AppData.cart.length > 0 ? `
            <div style="background:rgba(250,204,21,0.07); border:1px dashed rgba(250,204,21,0.4); border-radius:10px; padding:0.65rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem;">
                <input type="text" id="cartPromoCodeInput" placeholder="Kod rabatowy (np. RABAT3)" value="${st.discountCodeApplied ? 'RABAT3' : ''}" style="flex:1; background:rgba(0,0,0,0.5); border:1px solid var(--gold); border-radius:6px; padding:0.4rem 0.65rem; color:#fff; font-size:0.75rem;">
                <button class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold); padding:0.42rem 0.75rem;" onclick="StoreComponent.checkCartPromoCode()">Aktywuj -3%</button>
              </div>
              ${st.discountCodeApplied ? `<span style="font-size:0.68rem; color:var(--accent); display:block; margin-top:4px;">✓ Zastosowano kod RABAT3 (-3% jak "Par 3"): -${discountAmount} PLN</span>` : ''}
            </div>

            ${hasOversize ? `
              <div style="font-size:0.68rem; color:var(--gold); background:rgba(250,204,21,0.08); padding:0.45rem 0.65rem; border-radius:6px;">
                📦 Koszyk zawiera długi sprzęt (>120cm) – wysyłka ubezpieczonym kurierem dłużycowym.
              </div>
            ` : ''}

            ${checkoutSectionHTML}
          ` : ''}
        </div>

        ${AppData.cart.length > 0 ? `
          <div class="cart-drawer-footer">
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-bottom:3px;">
              <span>Wartość produktów:</span>
              <span>${rawCartValue} PLN</span>
            </div>
            ${discountAmount > 0 ? `
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--accent); margin-bottom:3px;">
                <span>Rabat (RABAT3 -3%):</span>
                <span>-${discountAmount} PLN</span>
              </div>
            ` : ''}
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); margin-bottom:0.6rem;">
              <span>Koszt dostawy:</span>
              <span>${shippingCost === 0 ? '0 PLN (Gratis)' : shippingCost + ' PLN'}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; padding-top:0.45rem; border-top:1px solid rgba(255,255,255,0.12);">
              <strong style="font-size:0.9rem; color:var(--text-main);">Razem do zapłaty:</strong>
              <strong style="font-size:1.25rem; color:var(--gold);">${finalCartValue} PLN</strong>
            </div>

            ${!st.checkoutStep ? `
              <button class="btn-primary" style="margin:0; padding:0.75rem; font-size:0.86rem;" onclick="StoreComponent.toggleCheckoutStep()">
                💳 Przejdź do danych dostawy i płatności →
              </button>
            ` : `
              <div style="display:grid; grid-template-columns: 1fr 2fr; gap:0.5rem;">
                <button class="btn-action" style="margin:0;" onclick="StoreComponent.toggleCheckoutStep()">← Wróć</button>
                <button class="btn-primary" style="margin:0; padding:0.7rem;" onclick="StoreComponent.submitProductionOrder(${finalCartValue})">
                  🔒 Zamawiam i płacę (${finalCartValue} PLN)
                </button>
              </div>
            `}
          </div>
        ` : ''}
      </div>
    `;
    backdrop.style.display = 'flex';
  },

  syncGlobalPromoModal: () => {
    let overlay = document.getElementById('tgnGlobalPromoOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'tgnGlobalPromoOverlay';
      overlay.onclick = () => StoreComponent.closePromoModal();
      document.body.appendChild(overlay);
    }

    const st = AppData.storeState;
    const isStoreActive = document.querySelector('#mainNav button.active')?.dataset?.tab === 'sklep';

    if (!st || !st.promoModalMode || !isStoreActive) {
      overlay.style.display = 'none';
      return;
    }

    if (st.promoModalMode === 'RABAT3') {
      overlay.innerHTML = `
        <div class="promo-modal-box" onclick="event.stopPropagation()">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span style="font-size:0.82rem; font-weight:800; color:var(--accent); text-transform:uppercase; border-bottom:2px solid var(--accent); padding-bottom:2px;">Informacja</span>
            <button style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:30px; height:30px; border-radius:50%; font-size:1rem; cursor:pointer;" onclick="StoreComponent.closePromoModal()">✕</button>
          </div>
          <div class="promo-info-circle">i</div>
          <h3 style="font-size:1rem; color:#fff; margin-bottom:0.45rem; line-height:1.35;">Zrób zakupy w Sklepie TGN i odbierz 3% rabatu. <span style="color:var(--accent);">3 jak "Par 3"</span></h3>
          <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.25rem;">Wpisz lub kliknij kod rabatowy:</p>
          <div class="rabat-code-pill" onclick="StoreComponent.applyRabat3Code()">RABAT3</div>
          <p style="font-size:0.75rem; color:#cbd5e1; margin-bottom:1rem; line-height:1.4;">przy składaniu zamówienia i zapłać mniej za wybrany sprzęt golfowy!</p>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
            <button class="btn-primary" style="margin:0; padding:0.6rem;" onclick="StoreComponent.applyRabat3Code()">OK (Aktywuj -3%)</button>
            <button class="btn-action" style="margin:0; padding:0.6rem;" onclick="StoreComponent.openPromoModal('NEWSLETTER')">📩 Newsletter</button>
          </div>
        </div>
      `;
      overlay.style.display = 'flex';
    } else if (st.promoModalMode === 'NEWSLETTER') {
      overlay.innerHTML = `
        <div class="promo-modal-box" onclick="event.stopPropagation()">
          <div style="display:flex; justify-content:flex-end; margin-bottom:0.2rem;">
            <button style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:30px; height:30px; border-radius:50%; font-size:1rem; cursor:pointer;" onclick="StoreComponent.closePromoModal()">✕</button>
          </div>
          <h3 style="font-size:1.15rem; color:#fff; margin-bottom:0.5rem; line-height:1.3;">Dołącz do nas, aby otrzymywać aktualizacje! 📩</h3>
          <p style="font-size:0.76rem; color:var(--text-muted); margin-bottom:0.9rem; line-height:1.45;">
            Zapisz się podając swój adres e-mail, aby otrzymywać powiadomienia o dostawach używanych kijów CPO, piłek Lake Balls AAAA oraz kod <strong style="color:var(--gold);">RABAT3</strong>!
          </p>
          <input type="email" id="newsletterEmailInput" placeholder="Adres e-mail..." value="${AppData.user.email || ''}" style="width:100%; background:rgba(255,255,255,0.08); border:1px solid var(--glass-border); border-radius:8px; padding:0.65rem 0.85rem; color:#fff; font-size:0.82rem; margin-bottom:0.7rem; outline:none;">
          <button class="btn-primary" style="margin:0; padding:0.65rem;" onclick="StoreComponent.submitNewsletter()">Zapisz mnie</button>
        </div>
      `;
      overlay.style.display = 'flex';
    }
  },

  matchesCategory: (p, selectedCat) => {
    if (selectedCat === "ALL") return true;
    if (p.cat === selectedCat) return true;
    if (selectedCat === "KIJE_NOWE") return p.section === "NEW" && ["DRIVERY", "WOODS", "WOOD_HYB", "HYBRYDY", "IRONY", "WEDGE", "PUTTERY", "ZESTAWY"].includes(p.cat);
    if (selectedCat === "UZYWANE_KIJE") return p.section === "USED" && ["DRIVERY", "WOODS", "WOOD_HYB", "HYBRYDY", "IRONY", "WEDGE", "PUTTERY"].includes(p.cat);
    if (selectedCat === "UZYWANY_SPRZET") return p.section === "USED" || p.cat === "UZYWANY_SPRZET";
    if (selectedCat === "WOZKI") return p.name.toLowerCase().includes("wózek") || p.cat === "WOZKI";
    return false;
  },

  render: () => {
    StoreComponent.ensureStoreDataInitialized();
    const st = AppData.storeState;
    const isAdmin = AppData.user && AppData.user.role === 'ADMIN';

    setTimeout(() => {
      StoreComponent.syncGlobalPromoModal();
      StoreComponent.syncGlobalCartDrawer();
    }, 10);

    let filtered = AppData.storeProducts.filter(p => {
      if (st.section !== "ALL" && p.section !== st.section) return false;
      if (!StoreComponent.matchesCategory(p, st.category)) return false;
      if (st.brand !== "ALL" && p.brand.toLowerCase() !== st.brand.toLowerCase()) return false;
      if (st.flex !== "ALL" && p.flex !== st.flex) return false;
      if (st.hand !== "ALL" && p.hand !== "ALL" && p.hand !== st.hand) return false;

      if (st.search) {
        const q = st.search.toLowerCase();
        const match = p.name.toLowerCase().includes(q) ||
                      p.brand.toLowerCase().includes(q) ||
                      p.spec.toLowerCase().includes(q) ||
                      p.desc.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    if (st.sortBy === "PRICE_ASC") filtered.sort((a, b) => a.price - b.price);
    else if (st.sortBy === "PRICE_DESC") filtered.sort((a, b) => b.price - a.price);

    const totalItemsCount = (AppData.cart || []).reduce((sum, i) => sum + (i.qty || 1), 0);
    const brandsList = [...new Set(AppData.storeProducts.map(p => p.brand))];

    // Profesjonalna belka elitarna w stylu PGA Tour Elite
    const eliteStoreBarHTML = `
      <div class="elite-store-bar">
        <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
          <span class="elite-badge-pill">⭐ TGN ELITE PRO SHOP • PGA CERTIFIED</span>
          <span style="font-size:0.76rem; color:var(--text-main);">
            🎁 Akcja <strong style="color:var(--gold);">"3 jak Par 3"</strong> – odbierz <strong>3% rabatu</strong> z kodem <strong style="color:var(--accent); cursor:pointer; text-decoration:underline;" onclick="StoreComponent.applyRabat3Code()">RABAT3</strong>
            ${st.discountCodeApplied ? '<span style="color:var(--accent); font-weight:800; margin-left:6px;">(✓ KOD AKTYWNY!)</span>' : ''}
          </span>
        </div>
        <div style="display:flex; gap:0.45rem;">
          <button class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold);" onclick="StoreComponent.openPromoModal('RABAT3')">🏷️ Kod rabatowy -3%</button>
          <button class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="StoreComponent.openPromoModal('NEWSLETTER')">📩 Newsletter</button>
        </div>
      </div>
    `;

    const aiAssistantHTML = st.aiAssistantOpen ? `
      <div class="store-ai-assistant-box">
        <div class="store-ai-header">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="ai-pulse-dot"></span>
            <strong style="color:#38bdf8; font-size:0.9rem; letter-spacing:0.5px;">🤖 DORADCA SPRZĘTOWY AI (PRO FITTER)</strong>
          </div>
          <span style="font-size:0.72rem; color:var(--gold); font-weight:700;">Profil: HCP ${AppData.user.hcp} | Swing ${AppData.user.swingSpeed}</span>
        </div>

        <div class="store-ai-messages" id="storeAiMsgs">
          ${st.aiChatHistory.map(m => `
            <div class="store-ai-msg ${m.sender === 'Ty' ? 'user' : 'bot'}">
              <strong>${m.sender}:</strong> ${m.text}
            </div>
          `).join('')}
        </div>

        <div class="store-ai-quick-prompts">
          <button class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold);" onclick="StoreComponent.askAiPrompt('LUKA_52')">🎯 Wedge 52° pod lukę 15m</button>
          <button class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="StoreComponent.askAiPrompt('SWING_96')">⚡ Kije pod Swing 96 mph</button>
          <button class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="StoreComponent.askAiPrompt('PERSONALIZACJA')">🖨️ Piłki z logo</button>
          <button class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="StoreComponent.askAiPrompt('PREZENTY')">🎁 Prezent dla golfisty</button>
          <button class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="StoreComponent.askAiPrompt('TRENING')">🏋️ Trenażery do domu</button>
        </div>

        <div class="store-ai-input-row">
          <input type="text" id="storeAiInput" placeholder="Zapytaj doradcę AI (np. 'Jaki driver do 2500 zł?', 'Pokaż piłki')..." onkeypress="if(event.key==='Enter') StoreComponent.sendCustomAiQuestion()">
          <button onclick="StoreComponent.sendCustomAiQuestion()">Zapytaj AI</button>
        </div>
      </div>
    ` : '';

    const defaultPreviewImg = ClubImageEngine.buildDirectSearchPhotoUrl("Titleist TSR3 Driver", 0);
    const addProductModalHTML = (isAdmin && st.addProductOpen) ? `
      <div class="store-admin-add-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
          <h3 style="color:var(--gold); font-size:0.9rem;">
            ${StoreComponent.editingProductId ? '✏️ Edytuj produkt w katalogu' : '⚙️ [TRYB ADMINA] Dodaj nowy produkt do asortymentu'}
          </h3>
          <button class="btn-mini-tool" onclick="StoreComponent.toggleAddProduct()">✕ Zamknij</button>
        </div>

        <div class="live-preview-row">
          <div class="club-photo-frame" style="width:86px !important; height:86px !important;">
            <img id="newStoreProdPreviewImg" src="${defaultPreviewImg}" alt="Podgląd">
            <span class="live-photo-badge">FOTO</span>
          </div>
          <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:0.5rem;">
            <input type="text" id="addProdName" placeholder="Nazwa produktu (np. Callaway Paradym Driver)" oninput="StoreComponent.updateNewProductPreview(this.value)" style="background:rgba(255,255,255,0.08); border:1px solid var(--accent); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.8rem;">
            <input type="text" id="addProdBrand" placeholder="Marka (np. Callaway, Ping)" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.8rem;">
            <div style="grid-column: span 2; display:flex; gap:0.4rem;">
              <button class="btn-mini-tool" onclick="StoreComponent.updateNewProductPreview(document.getElementById('addProdName').value || 'Callaway Paradym', true)">📷 Inne zdjęcie z sieci</button>
              <input type="text" id="addProdCustomImg" placeholder="(Opcjonalnie) Własny link URL do zdjęcia..." style="flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:5px; padding:0.25rem 0.5rem; color:#fff; font-size:0.72rem;">
            </div>
          </div>
        </div>

        <div class="store-add-grid">
          <div>
            <label>Dział sklepu</label>
            <select id="addProdSection">
              <option value="NEW">🏆 Nowy Sprzęt (Pro Shop)</option>
              <option value="USED">♻️ Używany Kij / CPO</option>
              <option value="BALLS">⚪ Piłki / Personalizacja</option>
            </select>
          </div>
          <div>
            <label>Kategoria</label>
            <select id="addProdCat">
              ${AppData.storeCategories.filter(c => c.id !== 'ALL').map(c => `<option value="${c.id}">${c.icon} ${c.label}</option>`).join('')}
            </select>
          </div>
          <div>
            <label>Flex shaftu</label>
            <select id="addProdFlex">
              <option value="Stiff">Stiff (S)</option>
              <option value="Regular">Regular (R)</option>
              <option value="Wedge">Wedge Flex</option>
              <option value="N/A">Nie dotyczy</option>
            </select>
          </div>
          <div>
            <label>Ręka</label>
            <select id="addProdHand">
              <option value="RH">Praworęczny (RH)</option>
              <option value="LH">Leworęczny (LH)</option>
              <option value="ALL">Uniwersalny</option>
            </select>
          </div>
          <div>
            <label>Loft / Rozmiar</label>
            <input type="text" id="addProdLoft" value="Standard">
          </div>
          <div>
            <label>Stan</label>
            <input type="text" id="addProdCond" value="Fabrycznie nowy">
          </div>
          <div>
            <label>Cena (PLN)</label>
            <input type="number" id="addProdPrice" value="990">
          </div>
          <div>
            <label>Magazyn (szt.)</label>
            <input type="number" id="addProdStock" value="3">
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-top:0.5rem; margin-bottom:0.65rem;">
          <input type="text" id="addProdSpec" placeholder="Specyfikacja (np. Shaft Ventus Blue 6S)" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.76rem;">
          <input type="text" id="addProdDesc" placeholder="Krótki opis produktu..." style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.76rem;">
        </div>

        <button class="btn-primary" style="margin:0; padding:0.6rem;" onclick="StoreComponent.saveNewProductToStore()">✓ Zapisz produkt w bazie sklepu</button>
      </div>
    ` : '';

    let productsHTML = filtered.length === 0 ? `
      <div style="grid-column: 1 / -1; text-align:center; padding: 2.5rem; background:rgba(0,0,0,0.25); border-radius:14px; border:1px dashed rgba(255,255,255,0.15);">
        <p style="font-size:0.95rem; color:var(--text-main); margin-bottom:0.5rem;">Brak produktów w wybranej kategorii.</p>
        <button class="btn-action" style="width:auto; padding:0.45rem 1.2rem;" onclick="StoreComponent.resetFilters()">Pokaż cały asortyment</button>
      </div>
    ` : filtered.map(prod => {
      const imgId = `store_prod_img_${prod.id}`;
      const visualSrc = ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(prod.name);
      const safeName = prod.name.replace(/'/g, "");
      const isUsed = prod.section === "USED";
      const isBallsOrAcc = prod.section === "BALLS" || ["PREZENTY", "AKCESORIA", "PERSONALIZACJA"].includes(prod.cat);
      const savings = prod.oldPrice && prod.oldPrice > prod.price ? (prod.oldPrice - prod.price) : 0;
      const variantsList = StoreComponent.getProductVariants(prod);

      return `
        <div class="store-card ${isUsed ? 'used-cpo-card' : ''}">
          <div>
            <div class="store-img-box" onclick="app.openPhotoZoom('${safeName}', document.getElementById('${imgId}').src, '${prod.spec} • Cena: ${prod.price} PLN')">
              <img id="${imgId}" src="${visualSrc}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
              <span class="store-tag ${prod.tagGold ? 'gold' : ''}">${prod.tag}</span>
              ${savings > 0 ? `<span class="store-discount-badge">-${savings} PLN</span>` : ''}
            </div>

            <div class="store-tech-pills">
              <span class="tech-pill brand">${prod.brand}</span>
              ${prod.hand !== 'ALL' ? `<span class="tech-pill">${prod.hand === 'RH' ? 'RH' : 'LH'}</span>` : ''}
              ${prod.flex !== 'N/A' ? `<span class="tech-pill">Flex: ${prod.flex}</span>` : ''}
              <span class="tech-pill">${prod.loft}</span>
            </div>

            <h3 style="font-size: 0.92rem; color: var(--text-main); margin: 0.35rem 0 0.25rem; line-height:1.3;">${prod.name}</h3>
            <p style="font-size: 0.7rem; color: var(--accent); font-weight: 600; margin-bottom: 0.35rem;">${prod.spec}</p>

            <div class="store-condition-box ${isUsed ? 'cpo' : ''}">
              <strong>Stan: ${prod.condition}</strong>
              <span>${prod.condDetails}</span>
            </div>

            <p style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.5rem;">${prod.desc}</p>

            <div class="prod-variant-box">
              <label>Wybierz wariant / specyfikację:</label>
              <select id="variant_sel_${prod.id}">
                ${variantsList.map(v => `<option value="${v}">${v}</option>`).join('')}
              </select>
              ${prod.cat === 'PERSONALIZACJA' ? `
                <input type="text" id="custom_print_${prod.id}" placeholder="Wpisz tekst nadruku na piłkach..." style="margin-top:4px;">
              ` : ''}
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.55rem;">
              <div style="display:flex; gap:0.3rem; flex-wrap:wrap;">
                <button class="btn-mini-tool" onclick="app.openPhotoZoom('${safeName}', document.getElementById('${imgId}').src, '${prod.spec}')">🔍 HD</button>
                <button class="btn-mini-tool" onclick="app.nextWebSearchPhoto('${imgId}', '${safeName}')">📷 Foto</button>
                ${isAdmin ? `
                  <button class="btn-mini-tool" style="color:var(--gold); border-color:var(--gold);" onclick="StoreComponent.startEditProduct(${prod.id})">✏️ Edytuj</button>
                  <button class="btn-mini-tool" style="color:#fca5a5; border-color:rgba(239,68,68,0.4);" onclick="StoreComponent.deleteProduct(${prod.id})">🗑️</button>
                ` : ''}
              </div>
              <span style="font-size:0.65rem; color:${prod.stock <= 2 ? 'var(--gold)' : 'var(--accent)'}; font-weight:700;">
                ● Magazyn: ${prod.stock > 0 ? prod.stock + ' szt.' : 'Brak'}
              </span>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.6rem;">
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.2rem;">
              <span style="font-size:0.7rem; color:var(--text-muted);">Cena brutto:</span>
              <div>
                ${prod.oldPrice && prod.oldPrice > prod.price ? `<span style="font-size:0.72rem; color:var(--text-muted); text-decoration:line-through; margin-right:6px;">${prod.oldPrice} PLN</span>` : ''}
                <strong style="font-size:1.05rem; color:var(--text-main);">${prod.price} PLN</strong>
              </div>
            </div>

            ${!isBallsOrAcc ? `
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.55rem;">
                <span style="font-size:0.68rem; color:var(--gold);">Trade-In (dopłata):</span>
                <strong style="font-size:0.86rem; color:var(--gold);">${prod.tradeInPrice} PLN</strong>
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.4rem;">
                <button class="btn-action" style="margin:0; padding:0.48rem;" onclick="StoreComponent.addItem(${prod.id}, false)">🛒 Do koszyka</button>
                <button class="btn-action" style="margin:0; padding:0.48rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.1);" onclick="StoreComponent.addItem(${prod.id}, true)">🔄 Kup w Trade-In</button>
              </div>
            ` : `
              <button class="btn-action" style="margin:0.3rem 0 0; padding:0.5rem;" onclick="StoreComponent.addItem(${prod.id}, false)">🛒 Dodaj do koszyka</button>
            `}
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.85rem;">
          <h2 style="margin:0;">
            <span>🛍️ TGN Pro Shop & Komis CPO (${AppData.storeProducts.length} produktów)</span>
          </h2>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-action" style="width:auto; margin:0; padding:0.42rem 0.85rem; border-color:#38bdf8; color:#38bdf8; background:rgba(56,189,248,0.15);" onclick="StoreComponent.toggleAiAssistant()">
              🤖 ${st.aiAssistantOpen ? 'Ukryj Doradcę AI' : 'Doradca AI'}
            </button>
            ${isAdmin ? `
              <button class="btn-action" style="width:auto; margin:0; padding:0.42rem 0.9rem; background:var(--gold); color:#052e16; border-color:var(--gold);" onclick="StoreComponent.startAddNewProduct()">
                ⚙️ + Dodaj asortyment (Admin)
              </button>
            ` : ''}
          </div>
        </div>

        ${eliteStoreBarHTML}
        ${aiAssistantHTML}
        ${addProductModalHTML}

        <!-- POZIOMY SLIDER KATEGORII (ELEGANCJA PREMIUM) -->
        <div class="store-category-slider">
          ${AppData.storeCategories.map(catObj => {
            const countInCat = AppData.storeProducts.filter(p => StoreComponent.matchesCategory(p, catObj.id)).length;
            return `
              <button class="cat-pill-chip ${st.category === catObj.id ? 'active' : ''}" onclick="StoreComponent.setCategory('${catObj.id}')">
                <span>${catObj.icon}</span>
                <span>${catObj.label}</span>
                <span style="opacity:0.6; font-size:0.65rem;">(${countInCat})</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="store-MultiFilter-bar">
          <input type="text" id="storeSearchInput" placeholder="🔍 Szukaj produktu (np. Qi10, Pro V1, Prezent, Mata Wellputt)..." value="${st.search}" oninput="StoreComponent.setSearch(this.value)">
          
          <select onchange="StoreComponent.setBrand(this.value)">
            <option value="ALL" ${st.brand === 'ALL' ? 'selected' : ''}>Wszystkie marki (${brandsList.length})</option>
            ${brandsList.map(b => `<option value="${b}" ${st.brand === b ? 'selected' : ''}>${b}</option>`).join('')}
          </select>

          <select onchange="StoreComponent.setFlex(this.value)">
            <option value="ALL" ${st.flex === 'ALL' ? 'selected' : ''}>Dowolny Flex</option>
            <option value="Regular" ${st.flex === 'Regular' ? 'selected' : ''}>Regular (R)</option>
            <option value="Stiff" ${st.flex === 'Stiff' ? 'selected' : ''}>Stiff (S)</option>
            <option value="Wedge" ${st.flex === 'Wedge' ? 'selected' : ''}>Wedge Flex</option>
          </select>

          <select onchange="StoreComponent.setHand(this.value)">
            <option value="ALL" ${st.hand === 'ALL' ? 'selected' : ''}>Ręka: RH i LH</option>
            <option value="RH" ${st.hand === 'RH' ? 'selected' : ''}>Praworęczne (RH)</option>
            <option value="LH" ${st.hand === 'LH' ? 'selected' : ''}>Leworęczne (LH)</option>
          </select>

          <select onchange="StoreComponent.setSort(this.value)">
            <option value="RECOMMENDED" ${st.sortBy === 'RECOMMENDED' ? 'selected' : ''}>Sortuj: Polecane</option>
            <option value="PRICE_ASC" ${st.sortBy === 'PRICE_ASC' ? 'selected' : ''}>Cena: od najniższej</option>
            <option value="PRICE_DESC" ${st.sortBy === 'PRICE_DESC' ? 'selected' : ''}>Cena: od najwyższej</option>
          </select>
        </div>

        <div class="store-grid">
          ${productsHTML}
        </div>
      </section>
    `;
  },

  openCartDrawer: () => {
    StoreComponent.ensureStoreDataInitialized();
    AppData.storeState.cartOpen = true;
    StoreComponent.syncGlobalCartDrawer();
  },

  closeCartDrawer: () => {
    StoreComponent.ensureStoreDataInitialized();
    AppData.storeState.cartOpen = false;
    StoreComponent.syncGlobalCartDrawer();
  },

  toggleCartDrawer: () => {
    StoreComponent.ensureStoreDataInitialized();
    AppData.storeState.cartOpen = !AppData.storeState.cartOpen;
    StoreComponent.syncGlobalCartDrawer();
  },

  toggleCheckoutStep: () => {
    AppData.storeState.checkoutStep = !AppData.storeState.checkoutStep;
    StoreComponent.syncGlobalCartDrawer();
  },

  addItem: (prodId, useTradeIn) => {
    StoreComponent.ensureStoreDataInitialized();
    const prod = AppData.storeProducts.find(p => p.id === prodId);
    if (!prod) return;
    if (prod.stock <= 0) {
      app.showToast('⚠️ Ten egzemplarz został już wyprzedany!');
      return;
    }

    const varSelect = document.getElementById(`variant_sel_${prodId}`);
    const selectedVariant = varSelect ? varSelect.value : prod.loft;

    const printInput = document.getElementById(`custom_print_${prodId}`);
    const customPrintText = printInput ? printInput.value.trim() : '';

    const finalPrice = useTradeIn ? prod.tradeInPrice : prod.price;
    const modeLabel = useTradeIn ? "[W rozliczeniu Trade-In]" : (prod.section === "USED" ? "[Używany CPO]" : "[Nowy]");

    const existing = AppData.cart.find(i =>
      i.id === prodId &&
      i.useTradeIn === useTradeIn &&
      i.variant === selectedVariant &&
      i.customPrint === customPrintText
    );

    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      AppData.cart.push({
        id: prod.id,
        name: prod.name,
        price: finalPrice,
        qty: 1,
        useTradeIn: useTradeIn,
        modeLabel: modeLabel,
        variant: selectedVariant,
        customPrint: customPrintText,
        imgUrl: prod.imgUrl
      });
    }

    StoreComponent.saveCartToStorage();
    AppData.storeState.cartOpen = true;
    auth.updateHeaderBar();
    StoreComponent.syncGlobalCartDrawer();
    app.showToast(`🛒 Dodano do koszyka: ${prod.name}`);
  },

  changeQty: (idx, delta) => {
    if (!AppData.cart[idx]) return;
    AppData.cart[idx].qty = (AppData.cart[idx].qty || 1) + delta;
    if (AppData.cart[idx].qty <= 0) AppData.cart.splice(idx, 1);
    StoreComponent.saveCartToStorage();
    auth.updateHeaderBar();
    StoreComponent.syncGlobalCartDrawer();
    const activeTab = document.querySelector('#mainNav button.active')?.dataset?.tab;
    if (activeTab === 'sklep') app.switchTab('sklep');
  },

  removeItem: (idx) => {
    AppData.cart.splice(idx, 1);
    StoreComponent.saveCartToStorage();
    auth.updateHeaderBar();
    StoreComponent.syncGlobalCartDrawer();
    const activeTab = document.querySelector('#mainNav button.active')?.dataset?.tab;
    if (activeTab === 'sklep') app.switchTab('sklep');
  },

  submitProductionOrder: (finalTotal) => {
    const name = document.getElementById('chkName')?.value.trim();
    const phone = document.getElementById('chkPhone')?.value.trim();
    const email = document.getElementById('chkEmail')?.value.trim();
    const address = document.getElementById('chkAddress')?.value.trim();
    const city = document.getElementById('chkCity')?.value.trim();
    const nip = document.getElementById('chkNip')?.value.trim();
    const delivery = document.getElementById('chkDelivery')?.value;
    const payment = document.getElementById('chkPayment')?.value;
    const notes = document.getElementById('chkNotes')?.value.trim();
    const terms = document.getElementById('chkTerms')?.checked;

    if (!name || !phone || !email || !address || !city) {
      app.showToast('⚠️ Uzupełnij wymagane pola adresowe i telefon!');
      return;
    }
    if (!terms) {
      app.showToast('⚠️ Zaakceptuj Regulamin Sklepu!');
      return;
    }

    const orderNumber = 'TGN-2026-' + (Math.floor(Math.random() * 8999) + 1000);
    const newOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleString('pl-PL'),
      customerName: name, phone, email,
      address: `${address}, ${city}`,
      nip: nip || 'Paragon',
      delivery, payment,
      notes: notes || '-',
      items: [...AppData.cart],
      total: finalTotal,
      status: payment === 'COD' ? 'Do wysyłki (Za pobraniem)' : 'Opłacone (' + payment + ')'
    };

    AppData.cart.forEach(cartItem => {
      const prod = AppData.storeProducts.find(p => p.id === cartItem.id);
      if (prod && prod.stock > 0) {
        prod.stock = Math.max(0, prod.stock - (cartItem.qty || 1));
      }
    });

    try {
      const orders = JSON.parse(localStorage.getItem('tgn_orders_db') || '[]');
      orders.unshift(newOrder);
      localStorage.setItem('tgn_orders_db', JSON.stringify(orders));
    } catch (e) {}

    AppData.cart = [];
    StoreComponent.saveCartToStorage();
    AppData.storeState.cartOpen = false;
    AppData.storeState.checkoutStep = false;
    auth.updateHeaderBar();
    StoreComponent.syncGlobalCartDrawer();
    app.switchTab('sklep');
    app.showToast(`✅ Zamówienie #${orderNumber} zostało złożone pomyślnie!`);
  },

  startAddNewProduct: () => {
    StoreComponent.editingProductId = null;
    AppData.storeState.addProductOpen = true;
    app.switchTab('sklep');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  },

  startEditProduct: (prodId) => {
    StoreComponent.editingProductId = prodId;
    AppData.storeState.addProductOpen = true;
    app.switchTab('sklep');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  },

  toggleAddProduct: () => {
    StoreComponent.editingProductId = null;
    AppData.storeState.addProductOpen = !AppData.storeState.addProductOpen;
    app.switchTab('sklep');
  },

  updateNewProductPreview: (val, nextVariant = false) => {
    clearTimeout(StoreComponent.previewTimer);
    StoreComponent.previewTimer = setTimeout(() => {
      const imgEl = document.getElementById('newStoreProdPreviewImg');
      if (!imgEl) return;
      if (nextVariant) ClubImageEngine.searchVariantIndex += 1;
      const query = (val && val.trim().length > 2) ? val.trim() : "Titleist TSR3 Driver";
      imgEl.src = ClubImageEngine.buildDirectSearchPhotoUrl(query, ClubImageEngine.searchVariantIndex);
    }, 250);
  },

  saveNewProductToStore: () => {
    const name = document.getElementById('addProdName').value.trim();
    const brand = document.getElementById('addProdBrand').value.trim() || "TGN Pro";
    const section = document.getElementById('addProdSection').value;
    const cat = document.getElementById('addProdCat').value;
    const flex = document.getElementById('addProdFlex').value;
    const hand = document.getElementById('addProdHand').value;
    const loft = document.getElementById('addProdLoft').value.trim() || "Standard";
    const condition = document.getElementById('addProdCond').value.trim() || "Fabrycznie nowy";
    const price = parseInt(document.getElementById('addProdPrice').value, 10) || 990;
    const stock = parseInt(document.getElementById('addProdStock').value, 10) || 3;
    const spec = document.getElementById('addProdSpec').value.trim() || `${brand} • ${loft} • Flex: ${flex}`;
    const desc = document.getElementById('addProdDesc').value.trim() || "Produkt gotowy do wysyłki z magazynu TGN.";
    const customImg = document.getElementById('addProdCustomImg').value.trim();

    if (!name) {
      app.showToast("Wpisz nazwę produktu!");
      return;
    }

    const finalImgUrl = customImg || ClubImageEngine.buildDirectSearchPhotoUrl(name, ClubImageEngine.searchVariantIndex);

    const productObj = {
      id: StoreComponent.editingProductId || Date.now(),
      section, cat, brand, flex, hand, loft, condition,
      condDetails: section === "USED" ? "Zweryfikowany przez serwis CPO" : "Gwarancja 24 mies.",
      tag: section === "USED" ? "KOMIS CPO" : "OFERTA PRO SHOP",
      tagGold: true, name, spec, desc,
      oldPrice: Math.round(price * 1.18),
      price,
      tradeInPrice: Math.max(150, Math.round(price * 0.45)),
      stock,
      imgUrl: finalImgUrl,
      variants: [`${loft} • ${flex} (${hand})`]
    };

    if (StoreComponent.editingProductId) {
      const idx = AppData.storeProducts.findIndex(p => p.id === StoreComponent.editingProductId);
      if (idx >= 0) AppData.storeProducts[idx] = productObj;
    } else {
      AppData.storeProducts.unshift(productObj);
    }

    try {
      const prevCustom = JSON.parse(localStorage.getItem('tgn_custom_store_products') || '[]');
      const cIdx = prevCustom.findIndex(p => p.id === productObj.id);
      if (cIdx >= 0) prevCustom[cIdx] = productObj;
      else prevCustom.unshift(productObj);
      localStorage.setItem('tgn_custom_store_products', JSON.stringify(prevCustom));
    } catch (e) {}

    StoreComponent.editingProductId = null;
    AppData.storeState.addProductOpen = false;
    app.switchTab('sklep');
    app.showToast(`✓ Zapisano produkt w katalogu: ${name}`);
  },

  deleteProduct: (prodId) => {
    AppData.storeProducts = AppData.storeProducts.filter(p => p.id !== prodId);
    try {
      const deletedIds = JSON.parse(localStorage.getItem('tgn_deleted_prod_ids') || '[]');
      deletedIds.push(prodId);
      localStorage.setItem('tgn_deleted_prod_ids', JSON.stringify(deletedIds));
    } catch (e) {}
    app.switchTab('sklep');
    app.showToast('🗑️ Usunięto produkt z katalogu.');
  },

  openPromoModal: (mode) => {
    StoreComponent.ensureStoreDataInitialized();
    AppData.storeState.promoModalMode = mode;
    StoreComponent.syncGlobalPromoModal();
  },

  closePromoModal: () => {
    sessionStorage.setItem('tgn_promo_seen', '1');
    AppData.storeState.promoModalMode = null;
    StoreComponent.syncGlobalPromoModal();
  },

  applyRabat3Code: () => {
    sessionStorage.setItem('tgn_promo_seen', '1');
    AppData.storeState.discountCodeApplied = true;
    AppData.storeState.promoModalMode = null;
    StoreComponent.syncGlobalPromoModal();
    StoreComponent.syncGlobalCartDrawer();
    app.switchTab('sklep');
    app.showToast('🎉 Aktywowano kod RABAT3 (-3% jak "Par 3")!');
  },

  checkCartPromoCode: () => {
    const inp = document.getElementById('cartPromoCodeInput');
    const code = inp ? inp.value.trim().toUpperCase() : '';
    if (code === 'RABAT3' || code === 'PAR3' || code === 'TGN3') {
      AppData.storeState.discountCodeApplied = true;
      StoreComponent.syncGlobalCartDrawer();
      app.showToast('🎉 Kod RABAT3 przyjęty! Naliczono 3% zniżki.');
    } else {
      app.showToast('Wpisz kod: RABAT3 aby odebrać 3% zniżki!');
    }
  },

  submitNewsletter: () => {
    const inp = document.getElementById('newsletterEmailInput');
    const email = inp ? inp.value.trim() : '';
    if (!email || !email.includes('@')) {
      app.showToast('Podaj poprawny adres e-mail!');
      return;
    }
    try {
      const subs = JSON.parse(localStorage.getItem('tgn_newsletter_list') || '[]');
      if (!subs.includes(email)) subs.push(email);
      localStorage.setItem('tgn_newsletter_list', JSON.stringify(subs));
    } catch (e) {}
    AppData.storeState.discountCodeApplied = true;
    AppData.storeState.promoModalMode = 'RABAT3';
    StoreComponent.syncGlobalPromoModal();
    app.showToast(`📩 Zapisano ${email}! Kod RABAT3 został aktywowany!`);
  },

  toggleAiAssistant: () => {
    StoreComponent.ensureStoreDataInitialized();
    AppData.storeState.aiAssistantOpen = !AppData.storeState.aiAssistantOpen;
    app.switchTab('sklep');
  },

  askAiPrompt: (promptType) => {
    StoreComponent.ensureStoreDataInitialized();
    const st = AppData.storeState;
    st.section = "ALL"; st.category = "ALL"; st.brand = "ALL"; st.flex = "ALL"; st.hand = "ALL"; st.search = "";

    if (promptType === "LUKA_52") {
      st.category = "WEDGE";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Dobierz kij pod moją lukę 15m z Gapping AI." },
        { sender: "TGN AI Pro Fitter", text: "Wyfiltrowałem kategorię 🎯 Wedge! Polecam Titleist Vokey SM10 52°." }
      );
    } else if (promptType === "SWING_96") {
      st.flex = "Stiff";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Pokaż kije pod Swing 96 mph." },
        { sender: "TGN AI Pro Fitter", text: "Wyfiltrowałem sprzęt ze sztywnością shaftu Stiff (S)." }
      );
    } else if (promptType === "PERSONALIZACJA") {
      st.category = "PERSONALIZACJA";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Chcę zamówić piłki z nadrukiem." },
        { sender: "TGN AI Pro Fitter", text: "Otworzyłem dział 🖨️ Personalizacja piłek golfowych!" }
      );
    } else if (promptType === "PREZENTY") {
      st.category = "PREZENTY";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Szukam prezentu." },
        { sender: "TGN AI Pro Fitter", text: "Wyfiltrowałem dział 🎁 Prezenty & Zestawy prezentowe." }
      );
    } else if (promptType === "TRENING") {
      st.category = "TRENING";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Sprzęt do treningu." },
        { sender: "TGN AI Pro Fitter", text: "Włączyłem kategorię 🏋️ Trening golfowy i ćwiczenia." }
      );
    }

    app.switchTab('sklep');
    StoreComponent.scrollAiToBottom();
  },

  sendCustomAiQuestion: () => {
    StoreComponent.ensureStoreDataInitialized();
    const input = document.getElementById('storeAiInput');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    const st = AppData.storeState;

    st.aiChatHistory.push({ sender: "Ty", text: text });
    st.section = "ALL"; st.category = "ALL"; st.brand = "ALL"; st.flex = "ALL"; st.hand = "ALL"; st.search = text;

    st.aiChatHistory.push({ sender: "TGN AI Pro Fitter", text: `Przeszukuję katalog sklepu pod kątem: "${text}".` });
    app.switchTab('sklep');
    StoreComponent.scrollAiToBottom();
  },

  scrollAiToBottom: () => {
    setTimeout(() => {
      const box = document.getElementById('storeAiMsgs');
      if (box) box.scrollTop = box.scrollHeight;
    }, 40);
  },

  setSection: (sec) => { AppData.storeState.section = sec; app.switchTab('sklep'); },
  setCategory: (cat) => { AppData.storeState.category = cat; app.switchTab('sklep'); },
  setBrand: (brand) => { AppData.storeState.brand = brand; app.switchTab('sklep'); },
  setFlex: (flex) => { AppData.storeState.flex = flex; app.switchTab('sklep'); },
  setHand: (hand) => { AppData.storeState.hand = hand; app.switchTab('sklep'); },
  setSort: (sortBy) => { AppData.storeState.sortBy = sortBy; app.switchTab('sklep'); },
  setSearch: (val) => {
    AppData.storeState.search = val;
    app.switchTab('sklep');
    const input = document.getElementById('storeSearchInput');
    if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  },
  resetFilters: () => {
    AppData.storeState.section = "ALL";
    AppData.storeState.category = "ALL";
    AppData.storeState.brand = "ALL";
    AppData.storeState.flex = "ALL";
    AppData.storeState.hand = "ALL";
    AppData.storeState.search = "";
    app.switchTab('sklep');
  },
  setDelivery: (method) => { AppData.storeState.deliveryMethod = method; }
};
