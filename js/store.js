/* =========================================================================
   MODUŁ SKLEPU TGN v15.0 (PRODUKCYJNY): PEŁNY CHECKOUT + GABARYTY + UKRYTY ADMIN + AI FITTER
   ========================================================================= */

(function injectStoreV15Styles() {
  ['tgnStoreAiStyles', 'tgnStoreV13Styles', 'tgnStoreV14Styles'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
  if (document.getElementById('tgnStoreV15Styles')) return;

  const style = document.createElement('style');
  style.id = 'tgnStoreV15Styles';
  style.textContent = `
    .store-ai-assistant-box {
      background: linear-gradient(145deg, rgba(16, 38, 44, 0.96), rgba(8, 20, 24, 0.98));
      border: 2px solid rgba(56, 189, 248, 0.55);
      border-radius: 16px;
      padding: 1.1rem 1.25rem;
      margin-bottom: 1.2rem;
      box-shadow: 0 14px 35px rgba(0, 0, 0, 0.55), inset 0 0 22px rgba(56, 189, 248, 0.12);
    }
    .store-ai-header {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;
      gap: 0.5rem; padding-bottom: 0.65rem; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .ai-pulse-dot {
      width: 10px; height: 10px; border-radius: 50%; background: #4ade80; box-shadow: 0 0 12px #4ade80; display: inline-block;
    }
    .store-ai-messages {
      max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.75rem; padding-right: 4px;
    }
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

    .trusted-promo-bar {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;
      background: linear-gradient(90deg, rgba(250, 204, 21, 0.14), rgba(74, 222, 128, 0.12));
      border: 1px solid rgba(250, 204, 21, 0.45); border-radius: 12px; padding: 0.7rem 1rem; margin-bottom: 1rem;
    }
    .trusted-badge-pill {
      display: inline-flex; align-items: center; gap: 8px; background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(250, 204, 21, 0.5); padding: 4px 10px; border-radius: 20px; font-size: 0.74rem; font-weight: 800; color: #facc15;
    }

    .category-Accordion-list {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.45rem; margin-bottom: 1.1rem;
    }
    .cat-menu-item {
      background: rgba(255, 255, 255, 0.045); border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 9px; padding: 0.55rem 0.75rem; color: #f1f5f9; font-size: 0.74rem; font-weight: 600;
      display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: 0.2s; text-align: left;
    }
    .cat-menu-item:hover, .cat-menu-item.active {
      background: rgba(74, 222, 128, 0.18); border-color: #4ade80; color: #4ade80; font-weight: 700;
    }
    .cat-menu-item span.arrow { opacity: 0.6; font-size: 0.7rem; }

    /* Modal przyklejony bezpośrednio do ekranu telefonu */
    #tgnGlobalPromoOverlay {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh;
      background: rgba(0, 0, 0, 0.82); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      display: none; align-items: center; justify-content: center; z-index: 9999; padding: 1rem;
    }
    .promo-modal-box {
      width: 100%; max-width: 400px; max-height: 88dvh; overflow-y: auto;
      background: linear-gradient(160deg, #102428, #081317); border: 2px solid #4ade80;
      border-radius: 20px; padding: 1.4rem 1.25rem; text-align: center;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), inset 0 0 25px rgba(74, 222, 128, 0.15);
      position: relative; margin: auto;
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

    /* Formularz Checkoutu (Produkcyjny Koszyk i Zamówienie) */
    .checkout-form-box {
      background: rgba(5, 14, 18, 0.95);
      border: 2px solid var(--accent);
      border-radius: 14px;
      padding: 1.2rem;
      margin-top: 0.9rem;
    }
    .checkout-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.7rem;
      margin-bottom: 0.8rem;
    }
    .checkout-grid label {
      display: block; font-size: 0.66rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 3px;
    }
    .checkout-grid input, .checkout-grid select {
      width: 100%; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 7px; padding: 0.55rem 0.7rem; color: #fff; font-size: 0.78rem; outline: none;
    }
    .checkout-grid input:focus, .checkout-grid select:focus { border-color: var(--accent); }

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
    .store-add-grid select option, .checkout-grid select option { background: #091519; color: #fff; }

    @media (max-width: 1024px) {
      .category-Accordion-list { grid-template-columns: repeat(2, 1fr); }
      .store-add-grid, .checkout-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .category-Accordion-list, .store-add-grid, .checkout-grid { grid-template-columns: 1fr; gap: 0.4rem; }
      .store-ai-input-row { flex-direction: column; }
      .store-ai-input-row button { padding: 0.55rem; }
      .promo-modal-box { padding: 1.15rem 1rem; max-width: 92vw; }
    }
  `;
  document.head.appendChild(style);
})();

const StoreComponent = {
  previewTimer: null,

  ensureStoreDataInitialized: () => {
    AppData.storeCategories = [
      { id: "ALL", label: "Wszystkie kategorie", icon: "🏬" },
      { id: "PILKI", label: "Piłki do golfa (Nowe & Lake Balls)", icon: "⚪" },
      { id: "PERSONALIZACJA", label: "Personalizacja piłek golfowych", icon: "🖨️" },
      { id: "KIJE_NOWE", label: "Kije golfowe (Nowe 2026)", icon: "🏌️" },
      { id: "UZYWANE_KIJE", label: "Używane kije golfowe (CPO)", icon: "♻️" },
      { id: "UZYWANY_SPRZET", label: "Używany sprzęt golfowy", icon: "🛠️" },
      { id: "TRENING", label: "Trening golfowy i ćwiczenia", icon: "🏋️" },
      { id: "PREZENTY", label: "Prezenty & Zestawy prezentowe", icon: "🎁" },
      { id: "TORBY", label: "Torby golfowe", icon: "🎒" },
      { id: "WOZKI", label: "Wózki golfowe", icon: "🛒" },
      { id: "ODZIEZ", label: "Odzież golfowa & Buty", icon: "👕" },
      { id: "GPS", label: "Elektronika (Dalmierze & GPS)", icon: "🔭" },
      { id: "AKCESORIA", label: "Akcesoria dla golfistów", icon: "🧤" }
    ];

    const extraProducts = [
      {
        id: 251, section: "BALLS", cat: "PERSONALIZACJA", brand: "Titleist", flex: "N/A", hand: "ALL", loft: "Tuzin (12 szt.) + Twój Nadruk",
        condition: "Nowe z personalizacją UV", condDetails: "Nadruk Twojego logo, inicjałów lub numeru w cenie!", tag: "PERSONALIZACJA PIŁEK", tagGold: true,
        name: "Personalizowane Piłki Titleist Pro V1 z Twoim Logo / Tekstem (12 szt.)",
        spec: "Trwały nadruk UV w pełnym kolorze • Czas realizacji: 48h",
        desc: "Idealne na turnieje firmowe lub jako unikalny identyfikator na polu. Wyślij tekst lub grafikę po zakupie.",
        oldPrice: 299, price: 249, tradeInPrice: 249, stock: 30, imgUrl: null
      },
      {
        id: 252, section: "NEW", cat: "PREZENTY", brand: "Titleist", flex: "N/A", hand: "ALL", loft: "Box Prezentowy VIP",
        condition: "Zestaw Prezentowy", condDetails: "Zapakowane w eleganckie pudełko prezentowe", tag: "POMYSŁ NA PREZENT", tagGold: true,
        name: "Golfowy Zestaw Prezentowy VIP (Piłki Pro V1 + Pitchmark + Marker + Ręcznik)",
        spec: "Gotowy upominek dla każdego golfisty • Możliwość dodania dedykacji",
        desc: "Kompletny zestaw prezentowy najwyższej jakości, który ucieszy zarówno początkującego, jak i niskiego handicapowca.",
        oldPrice: 390, price: 319, tradeInPrice: 319, stock: 12, imgUrl: null
      },
      {
        id: 253, section: "NEW", cat: "TRENING", brand: "Wellputt", flex: "N/A", hand: "ALL", loft: "Długość: 3 metry",
        condition: "Fabrycznie nowa", condDetails: "Prędkość greenu 10 / 11.5 ft • Aplikacja treningowa", tag: "TRENING W DOMU", tagGold: false,
        name: "Mata Treningowa do Putowania Wellputt Mat 3m Pro (10/11.5 ft)",
        spec: "Zatwierdzona przez trenera Camerona McCormicka • Ponad 50 ćwiczeń",
        desc: "Najlepsza mata treningowa odwzorowująca realną prędkość szybkiego greenu turniejowego.",
        oldPrice: 790, price: 649, tradeInPrice: 450, stock: 7, imgUrl: null
      },
      {
        id: 254, section: "NEW", cat: "TRENING", brand: "SuperSpeed", flex: "N/A", hand: "ALL", loft: "Zestaw 3 trenażerów",
        condition: "Fabrycznie nowy", condDetails: "Zwiększa prędkość swingu o +5% w 6 tygodni", tag: "TRENING PRĘDKOŚCI", tagGold: true,
        name: "Trenażer Prędkości Swingu SuperSpeed Golf Training System (3 kije)",
        spec: "3 specjalnie wyważone shafty (Lekki, Średni, Ciężki) + Program treningowy",
        desc: "Trening overspeed pozwoli Ci przejść z obecnych 96 mph na ponad 102 mph prędkości główki drivera!",
        oldPrice: 1090, price: 899, tradeInPrice: 590, stock: 5, imgUrl: null
      },
      {
        id: 255, section: "USED", cat: "UZYWANY_SPRZET", brand: "Garmin", flex: "N/A", hand: "ALL", loft: "Launch Monitor + GPS",
        condition: "Używany 9.0/10 (CPO)", condDetails: "Pełen komplet z futerałem i gwarancją rozruchową 12 mies.", tag: "UŻYWANY SPRZĘT CPO", tagGold: true,
        name: "Używany Radar / Symulator Golfowy Garmin Approach R10 Launch Monitor",
        spec: "Mierzy prędkość kija, piłki, Smash Factor, Spin i kąt natarcia • Przenośny",
        desc: "Przetestowany egzemplarz komisowy. Pozwala grać na wirtualnych polach na driving range lub w domu.",
        oldPrice: 2590, price: 1690, tradeInPrice: 890, stock: 1, imgUrl: null
      },
      {
        id: 256, section: "NEW", cat: "AKCESORIA", brand: "FootJoy", flex: "N/A", hand: "RH", loft: "2-Pack (M / ML / L)",
        condition: "Fabrycznie nowe", condDetails: "Na każdą pogodę • Wstawki ze skóry Cabretta", tag: "NIEZBĘDNIK GRACZA", tagGold: false,
        name: "Rękawiczki Golfowe FootJoy WeatherSof (2-Pack) + Zestaw Tee Drewnianych",
        spec: "Na lewą dłoń (dla praworęcznych RH) • Oddychający materiał FiberSof",
        desc: "Najlepiej sprzedająca się rękawiczka golfowa na świecie w pakiecie z 50 drewnianymi kołeczkami tee.",
        oldPrice: 149, price: 119, tradeInPrice: 119, stock: 25, imgUrl: null
      }
    ];

    extraProducts.forEach(ep => {
      if (!AppData.storeProducts.some(p => p.id === ep.id)) {
        AppData.storeProducts.push(ep);
      }
    });

    // Wczytaj zapisane lokalnie produkty dodane przez Admina oraz zaktualizowane stany magazynowe
    try {
      const savedCustom = JSON.parse(localStorage.getItem('tgn_custom_store_products') || '[]');
      savedCustom.forEach(cp => {
        if (!AppData.storeProducts.some(p => p.id === cp.id)) {
          AppData.storeProducts.unshift(cp);
        }
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
          text: "Witaj w oficjalnym sklepie TGN! Pomogę Ci dobrać sprzęt pod Twój Handicap i prędkość swingu. Kliknij jedną z kategorii poniżej lub zapytaj mnie o dowolny kij."
        }
      ];
    }
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

  // Sprawdza, czy w koszyku znajduje się długi kij golfowy / torba / wózek (powyżej gabarytu Paczkomatu InPost 64cm)
  cartHasOversizeClub: () => {
    const oversizeCats = ["DRIVERY", "WOODS", "WOOD_HYB", "HYBRYDY", "IRONY", "WEDGE", "PUTTERY", "ZESTAWY", "TORBY", "WOZKI", "KIJE_NOWE", "UZYWANE_KIJE"];
    return AppData.cart.some(item => {
      const prod = AppData.storeProducts.find(p => p.id === item.id);
      return prod && oversizeCats.includes(prod.cat);
    });
  },

  render: () => {
    StoreComponent.ensureStoreDataInitialized();
    const st = AppData.storeState;
    const isAdmin = AppData.user && AppData.user.role === 'ADMIN';

    setTimeout(() => StoreComponent.syncGlobalPromoModal(), 10);

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

    const totalItemsCount = AppData.cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    const rawCartValue = AppData.cart.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);
    const discountAmount = st.discountCodeApplied ? Math.round(rawCartValue * 0.03) : 0;
    const hasOversize = StoreComponent.cartHasOversizeClub();
    const shippingCost = rawCartValue >= 300 || rawCartValue === 0 ? 0 : (hasOversize ? 29 : 16);
    const finalCartValue = rawCartValue - discountAmount + shippingCost;

    const brandsList = [...new Set(AppData.storeProducts.map(p => p.brand))];

    const trustedPromoBarHTML = `
      <div class="trusted-promo-bar">
        <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
          <span class="trusted-badge-pill">🛡️ TRUSTED SHOP GUARANTEE • 4,95 ★</span>
          <span style="font-size:0.76rem; color:var(--text-main);">
            🎁 Akcja <strong style="color:var(--gold);">"3 jak Par 3"</strong> – odbierz <strong>3% rabatu</strong> z kodem <strong style="color:var(--accent); cursor:pointer; text-decoration:underline;" onclick="StoreComponent.applyRabat3Code()">RABAT3</strong>
            ${st.discountCodeApplied ? '<span style="color:var(--accent); font-weight:800; margin-left:6px;">(✓ AKTYWNY!)</span>' : ''}
          </span>
        </div>
        <div style="display:flex; gap:0.45rem;">
          <button class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold);" onclick="StoreComponent.openPromoModal('RABAT3')">🏷️ Kod Rabatowy -3%</button>
          <button class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="StoreComponent.openPromoModal('NEWSLETTER')">📩 Newsletter TGN</button>
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
          <button class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold);" onclick="StoreComponent.askAiPrompt('LUKA_52')">🎯 Wedge 52° pod moją lukę 15m</button>
          <button class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="StoreComponent.askAiPrompt('SWING_96')">⚡ Kije pod Swing 96 mph (Stiff)</button>
          <button class="btn-mini-tool" onclick="StoreComponent.askAiPrompt('PERSONALIZACJA')">🖨️ Personalizacja piłek z logo</button>
          <button class="btn-mini-tool" onclick="StoreComponent.askAiPrompt('PREZENTY')">🎁 Pomysł na prezent dla golfisty</button>
          <button class="btn-mini-tool" onclick="StoreComponent.askAiPrompt('TRENING')">🏋️ Trenażery i maty do domu</button>
        </div>

        <div class="store-ai-input-row">
          <input type="text" id="storeAiInput" placeholder="Zapytaj doradcę AI (np. 'Szukam prezentu do 350 zł', 'Chcę piłki z własnym logo', 'Pokaż używane drivery')..." onkeypress="if(event.key==='Enter') StoreComponent.sendCustomAiQuestion()">
          <button onclick="StoreComponent.sendCustomAiQuestion()">Zapytaj AI & Filtruj</button>
        </div>
      </div>
    ` : '';

    // Formularz dodawania produktu (Widoczny TYLKO dla Administratora!)
    const defaultPreviewImg = ClubImageEngine.buildDirectSearchPhotoUrl("Titleist TSR3 Driver", 0);
    const addProductModalHTML = (isAdmin && st.addProductOpen) ? `
      <div class="store-admin-add-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
          <h3 style="color:var(--gold); font-size:0.9rem;">⚙️ [TRYB ADMINA] Dodaj nowy produkt do bazy sklepu</h3>
          <button class="btn-mini-tool" onclick="StoreComponent.toggleAddProduct()">✕ Zamknij</button>
        </div>

        <div class="live-preview-row">
          <div class="club-photo-frame" style="width:86px !important; height:86px !important;">
            <img id="newStoreProdPreviewImg" src="${defaultPreviewImg}" alt="Podgląd produktu">
            <span class="live-photo-badge">AUTO FOTO</span>
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
              <option value="USED">♻️ Używany Kij / Sprzęt CPO</option>
              <option value="BALLS">⚪ Piłki / Personalizacja</option>
            </select>
          </div>
          <div>
            <label>Kategoria produktu</label>
            <select id="addProdCat">
              ${AppData.storeCategories.filter(c => c.id !== 'ALL').map(c => `<option value="${c.id}">${c.icon} ${c.label}</option>`).join('')}
            </select>
          </div>
          <div>
            <label>Twardość Shaftu (Flex)</label>
            <select id="addProdFlex">
              <option value="Stiff">Stiff (S)</option>
              <option value="Regular">Regular (R)</option>
              <option value="Wedge">Wedge Flex</option>
              <option value="N/A">Nie dotyczy (N/A)</option>
            </select>
          </div>
          <div>
            <label>Ręka gracza</label>
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
            <label>Stan (np. Nowy lub 9/10 CPO)</label>
            <input type="text" id="addProdCond" value="Fabrycznie nowy">
          </div>
          <div>
            <label>Cena w sklepie (PLN)</label>
            <input type="number" id="addProdPrice" value="990">
          </div>
          <div>
            <label>Cena katalogowa (PLN)</label>
            <input type="number" id="addProdOldPrice" value="1290">
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-top:0.5rem; margin-bottom:0.65rem;">
          <input type="text" id="addProdSpec" placeholder="Specyfikacja (np. Shaft Fujikura Ventus Blue 6S)" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.76rem;">
          <input type="text" id="addProdDesc" placeholder="Krótki opis produktu..." style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.76rem;">
        </div>

        <button class="btn-primary" style="margin:0; padding:0.6rem;" onclick="StoreComponent.saveNewProductToStore()">✓ Zapisz produkt w bazie sklepu</button>
      </div>
    ` : '';

    // --- PRODUKCYJNY KOSZYK + FORMULARZ CHECKOUTU (ADRES, INPOST/DPD, BLIK/P24, FAKTURA) ---
    const cartDrawerHTML = (st.cartOpen || AppData.cart.length > 0) ? `
      <div class="cart-summary-bar" style="flex-direction:column; align-items:stretch;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <strong style="color:var(--accent); font-size:0.92rem;">🛒 Twój Koszyk (${totalItemsCount} szt.)</strong>
            ${st.discountCodeApplied ? `<span style="font-size:0.72rem; color:var(--gold); margin-left:8px; font-weight:700;">🏷️ Kod RABAT3 (-${discountAmount} PLN)</span>` : ''}
            <span style="font-size:0.72rem; color:var(--text-muted); margin-left:8px;">
              ${shippingCost === 0 ? '✓ Darmowa dostawa (od 300 PLN)' : `Dostawa: +${shippingCost} PLN`}
            </span>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <strong style="font-size:1.15rem; color:var(--gold);">Do zapłaty: ${finalCartValue} PLN</strong>
            <button class="btn-mini-tool" onclick="StoreComponent.toggleCartDrawer()">
              ${st.cartOpen ? '▲ Zwiń koszyk' : '▼ Rozwiń koszyk i zamów (' + AppData.cart.length + ')'}
            </button>
          </div>
        </div>

        ${st.cartOpen && AppData.cart.length > 0 ? `
          <div style="margin-top:0.85rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:0.75rem; display:flex; flex-direction:column; gap:0.5rem;">
            ${AppData.cart.map((item, idx) => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); padding:0.5rem 0.75rem; border-radius:8px; font-size:0.78rem; flex-wrap:wrap; gap:0.5rem;">
                <div>
                  <strong style="color:var(--text-main);">${item.name}</strong>
                  <span style="color:var(--accent); font-size:0.7rem; margin-left:6px;">${item.modeLabel || ''}</span>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <button class="btn-mini-tool" onclick="StoreComponent.changeQty(${idx}, -1)">-</button>
                  <strong>${item.qty || 1} szt.</strong>
                  <button class="btn-mini-tool" onclick="StoreComponent.changeQty(${idx}, 1)">+</button>
                  <strong style="color:var(--gold); min-width:75px; text-align:right;">${item.price * (item.qty || 1)} PLN</strong>
                  <button class="btn-mini-tool" style="color:#fca5a5; border-color:rgba(239,68,68,0.4);" onclick="StoreComponent.removeItem(${idx})">✕</button>
                </div>
              </div>
            `).join('')}

            ${hasOversize ? `
              <div style="font-size:0.72rem; color:var(--gold); background:rgba(250,204,21,0.08); padding:0.45rem 0.75rem; border-radius:6px; border:1px solid rgba(250,204,21,0.3);">
                📦 <strong>Informacja gabarytowa:</strong> Koszyk zawiera kije golfowe / torbę (przesyłka dłużycowa powyżej 120 cm) – wysyłka realizowana ubezpieczonym Kurierem DPD/DHL lub odbiór osobisty.
              </div>
            ` : ''}

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-top:0.4rem; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);">
              <div style="display:flex; gap:0.4rem; align-items:center;">
                <input type="text" id="cartPromoCodeInput" placeholder="Kod rabatowy (RABAT3)" value="${st.discountCodeApplied ? 'RABAT3' : ''}" style="background:rgba(0,0,0,0.45); border:1px solid var(--gold); border-radius:6px; padding:0.4rem 0.65rem; color:#fff; font-size:0.75rem; width:165px;">
                <button class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold);" onclick="StoreComponent.checkCartPromoCode()">Aktywuj kod (-3%)</button>
              </div>

              <button class="btn-primary" style="width:auto; margin:0; padding:0.55rem 1.4rem;" onclick="StoreComponent.toggleCheckoutStep()">
                ${st.checkoutStep ? '▲ Ukryj formularz dostawy' : '💳 Przejdź do kasy i płatności (' + finalCartValue + ' PLN) →'}
              </button>
            </div>

            ${st.checkoutStep ? `
              <div class="checkout-form-box">
                <h3 style="color:var(--accent); font-size:0.88rem; margin-bottom:0.75rem;">📦 Dane do wysyłki i płatności (Bezpieczny Checkout SSL)</h3>
                <div class="checkout-grid">
                  <div>
                    <label>Imię i Nazwisko odbiorcy *</label>
                    <input type="text" id="chkName" value="${AppData.user.name || ''}" placeholder="Jan Kowalski">
                  </div>
                  <div>
                    <label>Telefon kontaktowy dla kuriera *</label>
                    <input type="tel" id="chkPhone" placeholder="np. 600 100 200">
                  </div>
                  <div>
                    <label>Adres E-mail (do faktury i śledzenia) *</label>
                    <input type="email" id="chkEmail" value="${AppData.user.email || ''}">
                  </div>
                  <div>
                    <label>Ulica i numer domu / Kod Paczkomatu *</label>
                    <input type="text" id="chkAddress" placeholder="np. ul. Golfowa 12/4 lub WAW123M">
                  </div>
                  <div>
                    <label>Kod pocztowy i Miasto *</label>
                    <input type="text" id="chkCity" value="${AppData.user.city || ''}" placeholder="00-001 Warszawa">
                  </div>
                  <div>
                    <label>NIP do Faktury VAT (opcjonalnie)</label>
                    <input type="text" id="chkNip" placeholder="Wpisz NIP jeśli potrzebujesz FV">
                  </div>
                  <div>
                    <label>Sposób dostawy</label>
                    <select id="chkDelivery" onchange="StoreComponent.setDelivery(this.value)">
                      <option value="KURIER_DPD">🚚 Kurier DPD Dłużyca Golf (Ubezpieczony)</option>
                      ${!hasOversize ? `<option value="INPOST">📦 Paczkomat InPost 24/7 (Piłki / Akcesoria)</option>` : ''}
                      <option value="ODBIOR_TRACKMAN">🎯 Odbiór osobisty + Test na TrackManie (0 PLN)</option>
                    </select>
                  </div>
                  <div>
                    <label>Metoda płatności</label>
                    <select id="chkPayment">
                      <option value="BLIK">📱 Szybki BLIK (0 PLN prowizji)</option>
                      <option value="P24">🏦 Szybki przelew Przelewy24 / PayNow</option>
                      <option value="CARD">💳 Karta płatnicza Visa / Mastercard / Apple Pay</option>
                      <option value="COD">💵 Płatność przy odbiorze u kuriera</option>
                    </select>
                  </div>
                  <div>
                    <label>Uwagi do zamówienia / Nadruk na piłkach</label>
                    <input type="text" id="chkNotes" placeholder="np. Tekst nadruku na piłkach lub godzina dostawy">
                  </div>
                </div>

                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; padding-top:0.65rem; border-top:1px solid rgba(255,255,255,0.1);">
                  <label style="font-size:0.72rem; color:var(--text-muted); display:flex; align-items:center; gap:6px; cursor:pointer;">
                    <input type="checkbox" id="chkTerms" checked> Akceptuję Regulamin Sklepu TGN oraz Politykę Prywatności.
                  </label>
                  <button class="btn-primary" style="width:auto; margin:0; padding:0.65rem 1.6rem; font-size:0.85rem;" onclick="StoreComponent.submitProductionOrder(${finalCartValue})">
                    🔒 Zamawiam z obowiązkiem zapłaty (${finalCartValue} PLN)
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        ` : ''}
      </div>
    ` : '';

    let productsHTML = filtered.length === 0 ? `
      <div style="grid-column: 1 / -1; text-align:center; padding: 2.5rem; background:rgba(0,0,0,0.25); border-radius:14px; border:1px dashed rgba(255,255,255,0.15);">
        <p style="font-size:0.95rem; color:var(--text-main); margin-bottom:0.5rem;">Brak produktów w tym widoku.</p>
        <button class="btn-action" style="width:auto; padding:0.45rem 1.2rem;" onclick="StoreComponent.resetFilters()">Pokaż cały asortyment sklepu</button>
      </div>
    ` : filtered.map(prod => {
      const imgId = `store_prod_img_${prod.id}`;
      const visualSrc = ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(prod.name);
      const safeName = prod.name.replace(/'/g, "");
      const isUsed = prod.section === "USED";
      const isBallsOrAcc = prod.section === "BALLS" || ["PREZENTY", "AKCESORIA", "PERSONALIZACJA"].includes(prod.cat);
      const savings = prod.oldPrice && prod.oldPrice > prod.price ? (prod.oldPrice - prod.price) : 0;

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
              ${prod.hand !== 'ALL' ? `<span class="tech-pill">${prod.hand === 'RH' ? 'Praworęczny (RH)' : 'Leworęczny (LH)'}</span>` : ''}
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

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.55rem;">
              <div style="display:flex; gap:0.35rem;">
                <button class="btn-mini-tool" onclick="app.openPhotoZoom('${safeName}', document.getElementById('${imgId}').src, '${prod.spec}')">🔍 Powiększ</button>
                ${isAdmin ? `
                  <button class="btn-mini-tool" onclick="app.nextWebSearchPhoto('${imgId}', '${safeName}')">📷 Foto</button>
                  <button class="btn-mini-tool" style="color:#fca5a5; border-color:rgba(239,68,68,0.4);" onclick="StoreComponent.deleteProduct(${prod.id})">🗑️ Usuń</button>
                ` : ''}
              </div>
              <span style="font-size:0.65rem; color:${prod.stock <= 2 ? 'var(--gold)' : 'var(--accent)'}; font-weight:700;">
                ● Dostępność: ${prod.stock > 0 ? prod.stock + ' szt.' : 'Wyprzedane'}
              </span>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.6rem;">
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.2rem;">
              <span style="font-size:0.7rem; color:var(--text-muted);">
                ${isUsed ? 'Cena nowego / Cena CPO:' : 'Cena brutto (z VAT):'}
              </span>
              <div>
                ${prod.oldPrice && prod.oldPrice > prod.price ? `<span style="font-size:0.72rem; color:var(--text-muted); text-decoration:line-through; margin-right:6px;">${prod.oldPrice} PLN</span>` : ''}
                <strong style="font-size:1.05rem; color:var(--text-main);">${prod.price} PLN</strong>
              </div>
            </div>

            ${!isBallsOrAcc ? `
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.55rem;">
                <span style="font-size:0.68rem; color:var(--gold);">W rozliczeniu Trade-In:</span>
                <strong style="font-size:0.86rem; color:var(--gold);">dopłata od ${prod.tradeInPrice} PLN</strong>
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
            <span>🛍️ Oficjalny Sklep TGN Pro Shop & Komis CPO (${AppData.storeProducts.length} produktów)</span>
          </h2>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-action" style="width:auto; margin:0; padding:0.42rem 0.85rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.12);" onclick="StoreComponent.openPromoModal('NEWSLETTER')">
              📩 Newsletter & Kod -3%
            </button>
            <button class="btn-action" style="width:auto; margin:0; padding:0.42rem 0.85rem; border-color:#38bdf8; color:#38bdf8; background:rgba(56,189,248,0.15);" onclick="StoreComponent.toggleAiAssistant()">
              🤖 ${st.aiAssistantOpen ? 'Ukryj Doradcę AI' : 'Doradca AI Sklepu'}
            </button>
            ${isAdmin ? `
              <button class="btn-action" style="width:auto; margin:0; padding:0.42rem 0.9rem; background:var(--gold); color:#052e16; border-color:var(--gold);" onclick="StoreComponent.toggleAddProduct()">
                ⚙️ + Dodaj produkt (Admin)
              </button>
            ` : ''}
          </div>
        </div>

        ${trustedPromoBarHTML}
        ${aiAssistantHTML}
        ${addProductModalHTML}
        ${cartDrawerHTML}

        <div class="category-Accordion-list">
          ${AppData.storeCategories.map(catObj => {
            const countInCat = AppData.storeProducts.filter(p => StoreComponent.matchesCategory(p, catObj.id)).length;
            return `
              <button class="cat-menu-item ${st.category === catObj.id ? 'active' : ''}" onclick="StoreComponent.setCategory('${catObj.id}')">
                <span>${catObj.icon} ${catObj.label} (${countInCat})</span>
                <span class="arrow">❯</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="store-MultiFilter-bar">
          <input type="text" id="storeSearchInput" placeholder="🔍 Szukaj produktu (np. Qi10, Personalizowane Pro V1, Prezent, Mata Wellputt, Garmin R10)..." value="${st.search}" oninput="StoreComponent.setSearch(this.value)">
          
          <select onchange="StoreComponent.setBrand(this.value)">
            <option value="ALL" ${st.brand === 'ALL' ? 'selected' : ''}>Wszystkie marki (${brandsList.length})</option>
            ${brandsList.map(b => `<option value="${b}" ${st.brand === b ? 'selected' : ''}>${b}</option>`).join('')}
          </select>

          <select onchange="StoreComponent.setFlex(this.value)">
            <option value="ALL" ${st.flex === 'ALL' ? 'selected' : ''}>Dowolny Flex shaftu</option>
            <option value="Regular" ${st.flex === 'Regular' ? 'selected' : ''}>Regular Flex (R)</option>
            <option value="Stiff" ${st.flex === 'Stiff' ? 'selected' : ''}>Stiff Flex (S)</option>
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

  toggleCheckoutStep: () => {
    AppData.storeState.checkoutStep = !AppData.storeState.checkoutStep;
    app.switchTab('sklep');
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
      app.showToast('⚠️ Uzupełnij wszystkie wymagane pola adresowe i telefon dla kuriera!');
      return;
    }
    if (!terms) {
      app.showToast('⚠️ Zaakceptuj Regulamin Sklepu, aby złożyć zamówienie!');
      return;
    }

    const orderNumber = 'TGN-2026-' + (Math.floor(Math.random() * 8999) + 1000);
    const newOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleString('pl-PL'),
      customerName: name,
      phone: phone,
      email: email,
      address: `${address}, ${city}`,
      nip: nip || 'Paragon',
      delivery: delivery,
      payment: payment,
      notes: notes || '-',
      items: [...AppData.cart],
      total: finalTotal,
      status: payment === 'COD' ? 'Do wysyłki (Za pobraniem)' : 'Opłacone (' + payment + ')'
    };

    // Pomniejsz stany magazynowe kupionych produktów
    AppData.cart.forEach(cartItem => {
      const prod = AppData.storeProducts.find(p => p.id === cartItem.id);
      if (prod && prod.stock > 0) {
        prod.stock = Math.max(0, prod.stock - (cartItem.qty || 1));
      }
    });

    // Zapisz zamówienie w lokalnej bazie produkcyjnej (widoczne w Panelu Admina i w Moim Koncie)
    try {
      const orders = JSON.parse(localStorage.getItem('tgn_orders_db') || '[]');
      orders.unshift(newOrder);
      localStorage.setItem('tgn_orders_db', JSON.stringify(orders));
    } catch (e) {}

    AppData.cart = [];
    AppData.storeState.cartOpen = false;
    AppData.storeState.checkoutStep = false;
    auth.updateHeaderBar();
    app.switchTab('sklep');
    app.showToast(`✅ Zamówienie #${orderNumber} przyjęte! Potwierdzenie wysłano na: ${email}`);
  },

  deleteProduct: (prodId) => {
    AppData.storeProducts = AppData.storeProducts.filter(p => p.id !== prodId);
    try {
      const deletedIds = JSON.parse(localStorage.getItem('tgn_deleted_prod_ids') || '[]');
      deletedIds.push(prodId);
      localStorage.setItem('tgn_deleted_prod_ids', JSON.stringify(deletedIds));
    } catch (e) {}
    app.switchTab('sklep');
    app.showToast('🗑️ Usunięto produkt z katalogu sklepu.');
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
    app.switchTab('sklep');
    app.showToast('🎉 Aktywowano kod RABAT3! Otrzymujesz 3% rabatu ("3 jak Par 3")!');
  },

  checkCartPromoCode: () => {
    const inp = document.getElementById('cartPromoCodeInput');
    const code = inp ? inp.value.trim().toUpperCase() : '';
    if (code === 'RABAT3' || code === 'PAR3' || code === 'TGN3') {
      AppData.storeState.discountCodeApplied = true;
      app.switchTab('sklep');
      app.showToast('🎉 Kod RABAT3 przyjęty! Naliczono 3% zniżki w koszyku.');
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
    app.showToast(`📩 Zapisano ${email}! Twój kod RABAT3 (-3%) został aktywowany!`);
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
        { sender: "TGN AI Pro Fitter", text: "Wyfiltrowałem kategorię 🎯 Wedge! Najlepszym wyborem na lukę 100–115m będzie nowy Titleist Vokey SM10 52° lub używany Cleveland RTX 6 ZipCore." }
      );
    } else if (promptType === "SWING_96") {
      st.flex = "Stiff";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Pokaż kije pod mój Swing Speed 96 mph." },
        { sender: "TGN AI Pro Fitter", text: "Przy 96 mph optymalną kontrolę daje shaft Stiff (S). Wyfiltrowałem wszystkie kije ze sztywnością Stiff!" }
      );
    } else if (promptType === "PERSONALIZACJA") {
      st.category = "PERSONALIZACJA";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Chcę zamówić piłki z własnym nadrukiem / logo." },
        { sender: "TGN AI Pro Fitter", text: "Otworzyłem dział 🖨️ Personalizacja piłek golfowych! Możesz zamówić tuzin Titleist Pro V1 z trwałym nadrukiem UV Twojego logo lub inicjałów." }
      );
    } else if (promptType === "PREZENTY") {
      st.category = "PREZENTY";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Szukam prezentu dla golfisty." },
        { sender: "TGN AI Pro Fitter", text: "Wyfiltrowałem dział 🎁 Prezenty & Zestawy prezentowe! Sprawdź nasz Zestaw Prezentowy VIP z piłkami Pro V1, ręcznikiem i pitchmarkiem." }
      );
    } else if (promptType === "TRENING") {
      st.category = "TRENING";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Pokaż sprzęt do treningu w domu i ćwiczeń." },
        { sender: "TGN AI Pro Fitter", text: "Włączyłem kategorię 🏋️ Trening golfowy i ćwiczenia! Polecam 3-metrową matę Wellputt oraz trenażer prędkości swingu SuperSpeed Golf." }
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
    const lower = text.toLowerCase();
    const st = AppData.storeState;

    st.aiChatHistory.push({ sender: "Ty", text: text });
    st.section = "ALL"; st.category = "ALL"; st.brand = "ALL"; st.flex = "ALL"; st.hand = "ALL"; st.search = "";

    let reply = "";
    if (lower.includes("prezent") || lower.includes("upominek")) {
      st.category = "PREZENTY";
      reply = "Wyfiltrowałem dział 🎁 Prezenty dla golfistów i zestawy prezentowe!";
    } else if (lower.includes("logo") || lower.includes("nadruk") || lower.includes("personaliz")) {
      st.category = "PERSONALIZACJA";
      reply = "Otworzyłem dział 🖨️ Personalizacja piłek golfowych!";
    } else if (lower.includes("trening") || lower.includes("mata") || lower.includes("ćwicz") || lower.includes("cwicz")) {
      st.category = "TRENING";
      reply = "Wyświetlam akcesoria z działu 🏋️ Trening golfowy i ćwiczenia!";
    } else if (lower.includes("używan") || lower.includes("uzywan") || lower.includes("cpo")) {
      st.category = "UZYWANE_KIJE";
      reply = "Włączyłem dział ♻️ Używanych kijów i sprzętu golfowego CPO!";
    } else if (lower.includes("rabat") || lower.includes("kod") || lower.includes("zniżk")) {
      StoreComponent.applyRabat3Code();
      return;
    } else {
      st.search = text;
      reply = `Przeszukuję katalog sklepu pod kątem frazy: "${text}". Sprawdź wyniki poniżej!`;
    }

    st.aiChatHistory.push({ sender: "TGN AI Pro Fitter", text: reply });
    app.switchTab('sklep');
    StoreComponent.scrollAiToBottom();
  },

  scrollAiToBottom: () => {
    setTimeout(() => {
      const box = document.getElementById('storeAiMsgs');
      if (box) box.scrollTop = box.scrollHeight;
    }, 40);
  },

  toggleAddProduct: () => {
    StoreComponent.ensureStoreDataInitialized();
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
    const oldPrice = parseInt(document.getElementById('addProdOldPrice').value, 10) || (price + 300);
    const spec = document.getElementById('addProdSpec').value.trim() || `${brand} • ${loft} • Flex: ${flex}`;
    const desc = document.getElementById('addProdDesc').value.trim() || "Produkt dodany do oficjalnego katalogu TGN Pro Shop.";
    const customImg = document.getElementById('addProdCustomImg').value.trim();

    if (!name) {
      app.showToast("Wpisz nazwę nowego produktu!");
      return;
    }

    const finalImgUrl = customImg || ClubImageEngine.buildDirectSearchPhotoUrl(name, ClubImageEngine.searchVariantIndex);

    const newProduct = {
      id: Date.now(), section, cat, brand, flex, hand, loft, condition,
      condDetails: section === "USED" ? "Zweryfikowany przez serwis TGN CPO" : "Gwarancja producenta 24 mies.",
      tag: section === "USED" ? "NOWOŚĆ W KOMISIE CPO" : "NOWOŚĆ W SKLEPIE",
      tagGold: true, name, spec, desc, oldPrice, price,
      tradeInPrice: Math.max(150, Math.round(price * 0.45)),
      stock: 3, imgUrl: finalImgUrl
    };

    AppData.storeProducts.unshift(newProduct);
    try {
      const prevCustom = JSON.parse(localStorage.getItem('tgn_custom_store_products') || '[]');
      prevCustom.unshift(newProduct);
      localStorage.setItem('tgn_custom_store_products', JSON.stringify(prevCustom));
    } catch (e) {}

    AppData.storeState.addProductOpen = false;
    AppData.storeState.section = "ALL";
    AppData.storeState.category = "ALL";
    app.switchTab('sklep');
    app.showToast(`✓ Dodano nowy produkt do bazy sklepu: ${name}`);
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
  toggleCartDrawer: () => { AppData.storeState.cartOpen = !AppData.storeState.cartOpen; app.switchTab('sklep'); },
  setDelivery: (method) => { AppData.storeState.deliveryMethod = method; },
  addItem: (prodId, useTradeIn) => {
    const prod = AppData.storeProducts.find(p => p.id === prodId);
    if (!prod) return;
    if (prod.stock <= 0) {
      app.showToast('⚠️ Ten egzemplarz został już wyprzedany!');
      return;
    }
    const finalPrice = useTradeIn ? prod.tradeInPrice : prod.price;
    const modeLabel = useTradeIn ? "[W rozliczeniu Trade-In]" : (prod.section === "USED" ? "[Używany CPO]" : "[Nowy]");
    const existing = AppData.cart.find(i => i.id === prodId && i.useTradeIn === useTradeIn);
    if (existing) existing.qty = (existing.qty || 1) + 1;
    else AppData.cart.push({ id: prod.id, name: prod.name, price: finalPrice, qty: 1, useTradeIn, modeLabel });
    AppData.storeState.cartOpen = true;
    auth.updateHeaderBar();
    app.switchTab('sklep');
    app.showToast(`Dodano do koszyka: ${prod.name} (${finalPrice} PLN)`);
  },
  changeQty: (idx, delta) => {
    if (!AppData.cart[idx]) return;
    AppData.cart[idx].qty = (AppData.cart[idx].qty || 1) + delta;
    if (AppData.cart[idx].qty <= 0) AppData.cart.splice(idx, 1);
    auth.updateHeaderBar();
    app.switchTab('sklep');
  },
  removeItem: (idx) => {
    AppData.cart.splice(idx, 1);
    auth.updateHeaderBar();
    app.switchTab('sklep');
  }
};
