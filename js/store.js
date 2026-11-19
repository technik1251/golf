/* =========================================================================
   MODUŁ SKLEPU TGN v34.0 (PRO E-COMMERCE: FILTRY + PDP + DRAWER + CMS + RABATY)
   ========================================================================= */

(function injectStoreV34Styles() {
  [
    'tgnStoreAiStyles', 'tgnStoreV13Styles', 'tgnStoreV14Styles',
    'tgnStoreV15Styles', 'tgnStoreV16Styles', 'tgnStoreV17Styles',
    'tgnStoreV18Styles', 'tgnStoreV34Styles'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  const style = document.createElement('style');
  style.id = 'tgnStoreV34Styles';
  style.textContent = `
    /* Koszyk szufladowy (Slide-Over Drawer) */
    #tgnCartDrawerBackdrop {
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px); z-index: 9990; display: none; justify-content: flex-end;
    }
    .cart-drawer-panel {
      width: 100%; max-width: 460px; height: 100vh; height: 100dvh;
      background: linear-gradient(165deg, #0d1f24, #061014); border-left: 2px solid var(--accent);
      display: flex; flex-direction: column; box-shadow: -15px 0 50px rgba(0, 0, 0, 0.9);
      animation: slideInRight 0.25s ease-out;
    }
    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .cart-drawer-header {
      padding: 1rem 1.2rem; background: rgba(0, 0, 0, 0.45); border-bottom: 1px solid var(--glass-border);
      display: flex; justify-content: space-between; align-items: center;
    }
    .cart-drawer-body {
      flex: 1; overflow-y: auto; padding: 1rem 1.2rem; display: flex; flex-direction: column; gap: 0.8rem;
    }
    .cart-drawer-footer {
      padding: 0.95rem 1.2rem; background: rgba(5, 14, 18, 0.96); border-top: 1px solid var(--glass-border);
    }
    .cart-item-row {
      background: rgba(255, 255, 255, 0.045); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px; padding: 0.7rem; display: grid; grid-template-columns: 58px 1fr; gap: 0.7rem; align-items: center;
    }
    .cart-item-thumb {
      width: 58px; height: 58px; background: #fff; border-radius: 8px; overflow: hidden;
      display: flex; align-items: center; justify-content: center; border: 1px solid var(--glass-border);
    }
    .cart-item-thumb img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }

    #tgnFloatingCartBtn {
      position: fixed; bottom: 20px; right: 20px; background: var(--accent); color: #052e16;
      border: 2px solid #ffffff; border-radius: 30px; padding: 0.65rem 1.15rem; font-size: 0.82rem; font-weight: 900;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.75); cursor: pointer; z-index: 8500;
      display: flex; align-items: center; gap: 8px; transition: transform 0.2s;
    }
    #tgnFloatingCartBtn:hover { transform: scale(1.05); }

    /* Zaawansowany pasek filtrów */
    .store-adv-filters {
      display: grid;
      grid-template-columns: 1.8fr repeat(5, 1fr);
      gap: 0.5rem;
      background: rgba(6, 16, 20, 0.88);
      border: 1px solid rgba(114, 214, 150, 0.28);
      border-radius: 12px;
      padding: 0.65rem;
      margin-bottom: 1rem;
    }
    .store-adv-filters input,
    .store-adv-filters select {
      width: 100%; background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px; padding: 0.48rem 0.6rem; color: #e2e8f0; font-size: 0.74rem; font-weight: 600;
      outline: none; min-width: 0;
    }
    .store-adv-filters select option { background: #0a161b; color: #f1f5f9; }
    .store-adv-filters input:focus, .store-adv-filters select:focus {
      border-color: var(--accent); background: rgba(74, 222, 128, 0.08);
    }

    /* Dedykowana Karta Produktu (PDP) */
    .pdp-container {
      display: grid;
      grid-template-columns: 1.05fr 1.2fr;
      gap: 1.5rem;
      background: linear-gradient(155deg, rgba(12, 26, 32, 0.95), rgba(6, 14, 18, 0.98));
      border: 1px solid rgba(114, 214, 150, 0.35);
      border-radius: 18px;
      padding: 1.4rem;
    }
    .pdp-main-img-box {
      width: 100%; height: 320px; background: #ffffff; border-radius: 14px;
      border: 2px solid rgba(114, 214, 150, 0.45); display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden; margin-bottom: 0.7rem; cursor: zoom-in;
    }
    .pdp-main-img-box img { width: 100%; height: 100%; object-fit: contain; padding: 14px; }
    .pdp-thumbs-row {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55rem;
    }
    .pdp-thumb {
      height: 76px; background: #ffffff; border-radius: 10px; border: 2px solid transparent;
      overflow: hidden; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0.75; transition: 0.2s;
    }
    .pdp-thumb.active, .pdp-thumb:hover { border-color: var(--accent); opacity: 1; }
    .pdp-thumb img { width: 100%; height: 100%; object-fit: contain; padding: 5px; }

    .pdp-variant-group { margin-bottom: 0.85rem; }
    .pdp-variant-label {
      display: block; font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase;
      letter-spacing: 0.5px; margin-bottom: 0.35rem; font-weight: 700;
    }
    .pdp-pills-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .pdp-pill-btn {
      background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.16);
      color: #e2e8f0; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.75rem; font-weight: 700;
      cursor: pointer; transition: 0.2s;
    }
    .pdp-pill-btn.active {
      background: rgba(74, 222, 128, 0.18); border-color: var(--accent); color: var(--accent);
    }

    .pdp-tradein-box {
      background: linear-gradient(135deg, rgba(250, 204, 21, 0.1), rgba(10, 20, 24, 0.92));
      border: 1px solid rgba(250, 204, 21, 0.5); border-radius: 12px; padding: 0.9rem; margin: 0.9rem 0;
    }
    .pdp-tradein-box select {
      width: 100%; background: rgba(0, 0, 0, 0.55); border: 1px solid rgba(250, 204, 21, 0.4);
      border-radius: 7px; padding: 0.45rem 0.6rem; color: #fff; font-size: 0.75rem; margin-top: 0.4rem; outline: none;
    }
    .pdp-tradein-box select option { background: #081418; color: #fff; }

    /* Baner promocyjny i Doradca AI */
    .elite-store-bar {
      display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.65rem;
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(56, 189, 248, 0.08));
      border: 1px solid rgba(74, 222, 128, 0.35); border-radius: 12px; padding: 0.65rem 1rem; margin-bottom: 0.9rem;
    }
    .elite-badge-pill {
      display: inline-flex; align-items: center; gap: 6px; background: rgba(0, 0, 0, 0.5);
      border: 1px solid var(--accent); padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 800; color: var(--accent);
    }

    .store-admin-add-box {
      background: rgba(8, 22, 26, 0.98); border: 2px solid var(--gold); border-radius: 16px;
      padding: 1.1rem; margin-bottom: 1.15rem; box-shadow: 0 20px 45px rgba(0, 0, 0, 0.75);
    }
    .store-add-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.55rem; }
    .store-add-grid label { display: block; font-size: 0.63rem; color: #94a3b8; text-transform: uppercase; margin-bottom: 3px; }
    .store-add-grid input, .store-add-grid select {
      width: 100%; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 6px; padding: 0.42rem 0.55rem; color: #fff; font-size: 0.74rem; outline: none;
    }
    .store-add-grid select option { background: #091519; color: #fff; }

    #tgnGlobalPromoOverlay {
      position: fixed; inset: 0; background: rgba(0, 0, 0, 0.82); backdrop-filter: blur(8px);
      display: none; align-items: center; justify-content: center; z-index: 9999; padding: 1rem;
    }
    .promo-modal-box {
      width: 100%; max-width: 390px; background: linear-gradient(160deg, #102428, #081317);
      border: 2px solid #4ade80; border-radius: 18px; padding: 1.35rem 1.2rem; text-align: center;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
    }
    .rabat-code-pill {
      display: inline-block; background: rgba(250, 204, 21, 0.18); border: 2px dashed #facc15;
      color: #facc15; font-size: 1.15rem; font-weight: 900; padding: 0.35rem 1.1rem; border-radius: 10px;
      letter-spacing: 1.5px; margin: 0.5rem 0; cursor: pointer;
    }

    @media (max-width: 1024px) {
      .store-adv-filters { grid-template-columns: repeat(3, 1fr); }
      .store-adv-filters input { grid-column: span 3; }
      .pdp-container { grid-template-columns: 1fr; }
      .store-add-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .store-adv-filters { grid-template-columns: 1fr 1fr; gap: 0.4rem; padding: 0.5rem; }
      .store-adv-filters input { grid-column: span 2; }
      .pdp-container { padding: 0.9rem; gap: 1rem; }
      .pdp-main-img-box { height: 225px; }
      .store-add-grid { grid-template-columns: 1fr; }
      .cart-drawer-panel { max-width: 100vw; }
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
      { id: "KIJE_NOWE", label: "Kije Nowe", icon: "🏌️" },
      { id: "UZYWANE_KIJE", label: "Używane CPO", icon: "♻️" },
      { id: "PILKI", label: "Piłki & Lake Balls", icon: "⚪" },
      { id: "PERSONALIZACJA", label: "Personalizacja", icon: "🖨️" },
      { id: "TRENING", label: "Trening", icon: "🏋️" },
      { id: "PREZENTY", label: "Prezenty", icon: "🎁" },
      { id: "TORBY", label: "Torby", icon: "🎒" },
      { id: "GPS", label: "Elektronika & GPS", icon: "🔭" },
      { id: "AKCESORIA", label: "Akcesoria", icon: "🧤" }
    ];

    const extraProducts = [
      {
        id: 251, section: "BALLS", cat: "PERSONALIZACJA", brand: "Titleist", flex: "N/A", hand: "ALL", loft: "12 szt. + Nadruk",
        condition: "Nowe z personalizacją UV", condDetails: "Nadruk logo lub inicjałów w cenie", tag: "PERSONALIZACJA", tagGold: true,
        name: "Personalizowane Piłki Titleist Pro V1 z Twoim Logo (12 szt.)",
        spec: "Trwały nadruk UV w pełnym kolorze • Realizacja 48h",
        desc: "Idealne na turnieje firmowe lub jako unikalny identyfikator na polu. Wpisz tekst nadruku na karcie produktu.",
        oldPrice: 299, price: 249, tradeInPrice: 249, stock: 30, imgUrl: null
      },
      {
        id: 252, section: "NEW", cat: "PREZENTY", brand: "Titleist", flex: "N/A", hand: "ALL", loft: "Box VIP",
        condition: "Zestaw Prezentowy", condDetails: "Eleganckie pudełko prezentowe", tag: "PREZENT", tagGold: true,
        name: "Golfowy Zestaw Prezentowy VIP (Pro V1 + Pitchmark + Marker + Ręcznik)",
        spec: "Gotowy upominek dla każdego golfisty",
        desc: "Kompletny zestaw prezentowy najwyższej jakości, który ucieszy zarówno początkującego, jak i niskiego handicapowca.",
        oldPrice: 390, price: 319, tradeInPrice: 319, stock: 12, imgUrl: null
      },
      {
        id: 253, section: "NEW", cat: "TRENING", brand: "Wellputt", flex: "N/A", hand: "ALL", loft: "3m / 4m",
        condition: "Fabrycznie nowa", condDetails: "Prędkość greenu 10 / 11.5 ft", tag: "TRENING", tagGold: false,
        name: "Mata Treningowa do Putowania Wellputt Mat Pro (10/11.5 ft)",
        spec: "Zatwierdzona przez trenera Camerona McCormicka • Ponad 50 ćwiczeń",
        desc: "Najlepsza mata treningowa odwzorowująca realną prędkość szybkiego greenu turniejowego.",
        oldPrice: 790, price: 649, tradeInPrice: 450, stock: 7, imgUrl: null
      },
      {
        id: 255, section: "USED", cat: "GPS", brand: "Garmin", flex: "N/A", hand: "ALL", loft: "Radar + GPS",
        condition: "Używany 9.0/10 (CPO)", condDetails: "Komplet z futerałem i gwarancją 12 mies.", tag: "KOMIS CPO", tagGold: true,
        name: "Używany Radar / Symulator Garmin Approach R10 Launch Monitor",
        spec: "Mierzy prędkość kija, piłki, Smash Factor, Spin i kąt natarcia",
        desc: "Przetestowany egzemplarz komisowy. Pozwala grać na wirtualnych polach na driving range lub w domu.",
        oldPrice: 2590, price: 1690, tradeInPrice: 890, stock: 1, imgUrl: null
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
        const idx = AppData.storeProducts.findIndex(p => p.id === cp.id);
        if (idx >= 0) AppData.storeProducts[idx] = cp;
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
        loftFilter: "ALL", maxPrice: "ALL", search: "", sortBy: "RECOMMENDED",
        cartOpen: false, checkoutStep: false, deliveryMethod: "KURIER_DPD",
        selectedProductId: null, pdpHand: "RH", pdpFlex: "Stiff", pdpLoft: "", pdpImgIdx: 0, pdpTradeInClubId: "DEFAULT",
        discountCode: null, discountPercent: 0, addProductOpen: false, promoModalMode: null
      };
    }

    const st = AppData.storeState;
    if (typeof st.loftFilter === 'undefined') st.loftFilter = "ALL";
    if (typeof st.maxPrice === 'undefined') st.maxPrice = "ALL";
    if (typeof st.selectedProductId === 'undefined') st.selectedProductId = null;
    if (typeof st.discountPercent === 'undefined') st.discountPercent = st.discountCodeApplied ? 3 : 0;
    if (typeof st.discountCode === 'undefined') st.discountCode = st.discountCodeApplied ? 'RABAT3' : null;
  },

  saveCartToStorage: () => {
    try { localStorage.setItem('tgn_persistent_cart', JSON.stringify(AppData.cart || [])); } catch (e) {}
  },

  cartHasOversizeClub: () => {
    const oversizeCats = [
      "DRIVERY", "WOODS", "WOOD_HYB", "HYBRYDY", "IRONY", "WEDGE",
      "PUTTERY", "ZESTAWY", "TORBY", "WOZKI", "KIJE_NOWE", "UZYWANE_KIJE"
    ];
    return (AppData.cart || []).some(item => {
      const prod = (AppData.storeProducts || []).find(p => p.id === item.id);
      return prod && oversizeCats.includes(prod.cat);
    });
  },

  matchesCategory: (p, selectedCat) => {
    if (selectedCat === "ALL") return true;
    if (p.cat === selectedCat) return true;
    if (selectedCat === "KIJE_NOWE") return p.section === "NEW" && ["DRIVERY", "WOODS", "WOOD_HYB", "HYBRYDY", "IRONY", "WEDGE", "PUTTERY", "ZESTAWY"].includes(p.cat);
    if (selectedCat === "UZYWANE_KIJE") return p.section === "USED";
    return false;
  },

  // =========================================================================
  // 1. WIDOK DEDYKOWANEJ KARTY PRODUKTU (PDP - Product Detail Page)
  // =========================================================================
  openProductPage: (prodId) => {
    StoreComponent.ensureStoreDataInitialized();
    const prod = AppData.storeProducts.find(p => p.id === prodId);
    if (!prod) return;
    const st = AppData.storeState;
    st.selectedProductId = prodId;
    st.pdpHand = prod.hand === 'LH' ? 'LH' : 'RH';
    st.pdpFlex = prod.flex !== 'N/A' ? prod.flex : 'Standard';
    st.pdpLoft = prod.loft || 'Standard';
    st.pdpImgIdx = 0;
    st.pdpTradeInClubId = "DEFAULT";
    app.switchTab('sklep');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  closeProductPage: () => {
    AppData.storeState.selectedProductId = null;
    app.switchTab('sklep');
  },

  setPdpOption: (key, val) => {
    AppData.storeState[key] = val;
    app.switchTab('sklep');
  },

  renderProductDetailPage: (prod) => {
    const st = AppData.storeState;
    const isUsed = prod.section === 'USED';
    const isClub = !["PILKI", "PERSONALIZACJA", "PREZENTY", "AKCESORIA", "TRENING", "GPS"].includes(prod.cat);

    // Galeria 3 ujęć (główne + 2 dodatkowe z wyszukiwarki)
    const img0 = ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl);
    const img1 = ClubImageEngine.buildDirectSearchPhotoUrl(prod.name + " golf club head", 1);
    const img2 = ClubImageEngine.buildDirectSearchPhotoUrl(prod.name + " golf shaft", 2);
    const gallery = [img0, img1, img2];
    const activeImg = gallery[st.pdpImgIdx] || img0;
    const fallbackSrc = ClubImageEngine.getFallbackPhoto(prod.name);

    // Opcje loftu zależne od kategorii
    let loftOptions = [prod.loft || 'Standard'];
    if (prod.cat === 'DRIVERY') loftOptions = ['9.0°', '10.5°', '12.0°'];
    else if (prod.cat === 'WEDGE') loftOptions = ['50°/08F', '52°/12F', '56°/10S', '60°/08M'];
    else if (prod.cat === 'PUTTERY') loftOptions = ['33"', '34"', '35"'];
    if (!loftOptions.includes(st.pdpLoft)) st.pdpLoft = loftOptions[0];

    const flexOptions = prod.cat === 'WEDGE' ? ['Wedge Flex', 'Stiff (S)'] : ['Regular (R)', 'Stiff (S)', 'X-Stiff (XS)'];
    const handOptions = ['RH (Praworęczny)', 'LH (Leworęczny)'];

    // Kalkulacja Trade-In z kijów w torbie 3D użytkownika
    const userBag = AppData.bag || [];
    let tradeInDiscount = Math.max(0, prod.price - (prod.tradeInPrice || prod.price));
    let selectedClubLabel = "Standardowa wycena Trade-In";
    if (st.pdpTradeInClubId !== "DEFAULT") {
      const bagClub = userBag.find(c => String(c.id) === String(st.pdpTradeInClubId));
      if (bagClub) {
        const cpoNum = parseInt(String(bagClub.cpoOffer || bagClub.val || '800').replace(/\D/g, ''), 10) || 800;
        tradeInDiscount = Math.min(Math.round(prod.price * 0.75), cpoNum);
        selectedClubLabel = bagClub.name;
      }
    }
    const finalTradeInPrice = Math.max(199, prod.price - tradeInDiscount);

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
          <button type="button" class="btn-mini-tool" style="padding:6px 12px; font-size:0.75rem; border-color:var(--accent); color:var(--accent);" onclick="StoreComponent.closeProductPage()">
            ← Wróć do katalogu sklepu
          </button>
          <span style="font-size:0.72rem; color:var(--text-muted);">
            Sklep / ${prod.brand} / <strong style="color:#fff;">${prod.name}</strong>
          </span>
        </div>

        <div class="pdp-container">
          <!-- Lewa kolumna: Galeria zdjęć -->
          <div>
            <div class="pdp-main-img-box" onclick="app.openPhotoZoom('${prod.name.replace(/'/g, "")}', '${activeImg}', '${prod.spec}')">
              <img src="${activeImg}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
              <span class="store-tag ${prod.tagGold ? 'gold' : ''}">${prod.tag}</span>
              ${prod.oldPrice > prod.price ? `<span class="store-discount-badge">-${prod.oldPrice - prod.price} PLN</span>` : ''}
            </div>
            <div class="pdp-thumbs-row">
              ${gallery.map((gUrl, idx) => `
                <div class="pdp-thumb ${st.pdpImgIdx === idx ? 'active' : ''}" onclick="StoreComponent.setPdpOption('pdpImgIdx', ${idx})">
                  <img src="${gUrl}" alt="Ujęcie ${idx + 1}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
                </div>
              `).join('')}
            </div>

            <div style="margin-top:0.9rem; background:rgba(0,0,0,0.32); border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:0.75rem;">
              <strong style="font-size:0.74rem; color:var(--accent); display:block; margin-bottom:4px;">⚙️ Opis technologiczny & Specyfikacja</strong>
              <p style="font-size:0.75rem; color:#cbd5e1; line-height:1.5; margin-bottom:0.4rem;">${prod.desc}</p>
              <p style="font-size:0.72rem; color:var(--text-muted);"><strong>Specyfikacja:</strong> ${prod.spec} • <strong>Stan:</strong> ${prod.condition} (${prod.condDetails})</p>
            </div>
          </div>

          <!-- Prawa kolumna: Konfigurator wariantów, Trade-In i Zakup -->
          <div style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
                <span class="tech-pill brand">${prod.brand}</span>
                <span style="font-size:0.72rem; color:${prod.stock <= 2 ? 'var(--gold)' : 'var(--accent)'}; font-weight:700;">
                  ● Dostępność: ${prod.stock > 0 ? prod.stock + ' szt. w magazynie' : 'Wyprzedane'}
                </span>
              </div>

              <h1 style="font-size:1.35rem; color:#fff; margin-bottom:0.45rem; line-height:1.25;">${prod.name}</h1>

              <div style="display:flex; align-items:baseline; gap:0.7rem; margin-bottom:1rem; padding-bottom:0.8rem; border-bottom:1px solid rgba(255,255,255,0.1);">
                <strong style="font-size:1.6rem; color:#fff;">${prod.price} PLN</strong>
                ${prod.oldPrice > prod.price ? `<span style="font-size:0.9rem; color:var(--text-muted); text-decoration:line-through;">${prod.oldPrice} PLN</span>` : ''}
                <span style="font-size:0.7rem; color:var(--accent); background:rgba(74,222,128,0.12); padding:2px 7px; border-radius:5px;">Wysyłka 24h • Gwarancja TGN</span>
              </div>

              ${isClub ? `
                <div class="pdp-variant-group">
                  <span class="pdp-variant-label">1. Wybierz Rękę (Hand)</span>
                  <div class="pdp-pills-row">
                    ${handOptions.map(h => {
                      const code = h.startsWith('RH') ? 'RH' : 'LH';
                      return `<button type="button" class="pdp-pill-btn ${st.pdpHand === code ? 'active' : ''}" onclick="StoreComponent.setPdpOption('pdpHand', '${code}')">${h}</button>`;
                    }).join('')}
                  </div>
                </div>

                <div class="pdp-variant-group">
                  <span class="pdp-variant-label">2. Wybierz Loft / Długość</span>
                  <div class="pdp-pills-row">
                    ${loftOptions.map(l => `
                      <button type="button" class="pdp-pill-btn ${st.pdpLoft === l ? 'active' : ''}" onclick="StoreComponent.setPdpOption('pdpLoft', '${l}')">${l}</button>
                    `).join('')}
                  </div>
                </div>

                <div class="pdp-variant-group">
                  <span class="pdp-variant-label">3. Wybierz Sztywność Shaftu (Flex)</span>
                  <div class="pdp-pills-row">
                    ${flexOptions.map(f => `
                      <button type="button" class="pdp-pill-btn ${st.pdpFlex === f ? 'active' : ''}" onclick="StoreComponent.setPdpOption('pdpFlex', '${f}')">${f}</button>
                    `).join('')}
                  </div>
                </div>
              ` : ''}

              ${prod.cat === 'PERSONALIZACJA' ? `
                <div class="pdp-variant-group">
                  <span class="pdp-variant-label">🖨️ Twój tekst lub inicjały do nadruku UV na piłkach:</span>
                  <input type="text" id="pdpCustomPrint" placeholder="np. M.K. 2026 / Nazwa Firmy" style="width:100%; background:rgba(255,255,255,0.08); border:1px solid var(--accent); border-radius:8px; padding:0.55rem 0.75rem; color:#fff; font-size:0.8rem; outline:none;">
                </div>
              ` : ''}

              ${isClub ? `
                <!-- Sekcja Trade-In -->
                <div class="pdp-tradein-box">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:var(--gold); font-size:0.8rem;">🔄 Program Wymiany Trade-In (Obniż cenę!)</strong>
                    <strong style="color:var(--gold); font-size:1rem;">Dopłata: ${finalTradeInPrice} PLN</strong>
                  </div>
                  <p style="font-size:0.7rem; color:var(--text-muted); margin-top:3px;">
                    Oddaj stary kij w rozliczeniu (zniżka: <strong style="color:var(--accent);">-${tradeInDiscount} PLN</strong>). Wybierz kij ze swojej Torby 3D:
                  </p>
                  <select onchange="StoreComponent.setPdpOption('pdpTradeInClubId', this.value)">
                    <option value="DEFAULT" ${st.pdpTradeInClubId === 'DEFAULT' ? 'selected' : ''}>Standardowa wycena Trade-In (-${prod.price - (prod.tradeInPrice || prod.price)} PLN)</option>
                    ${userBag.map(c => `<option value="${c.id}" ${String(st.pdpTradeInClubId) === String(c.id) ? 'selected' : ''}>🎒 Z mojej torby: ${c.name} (Wycena CPO: ${c.cpoOffer || c.val})</option>`).join('')}
                  </select>
                </div>
              ` : ''}
            </div>

            <div style="display:grid; grid-template-columns:${isClub ? '1fr 1fr' : '1fr'}; gap:0.6rem; margin-top:0.5rem;">
              <button type="button" class="btn-primary" style="margin:0; padding:0.75rem; font-size:0.85rem;" onclick="StoreComponent.addFromPdp(${prod.id}, false, ${prod.price})">
                🛒 Dodaj do koszyka (${prod.price} PLN)
              </button>
              ${isClub ? `
                <button type="button" class="btn-action" style="margin:0; padding:0.75rem; font-size:0.82rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.12);" onclick="StoreComponent.addFromPdp(${prod.id}, true, ${finalTradeInPrice}, '${selectedClubLabel.replace(/'/g, "")}')">
                  🔄 Kup w Trade-In (${finalTradeInPrice} PLN)
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </section>
    `;
  },

  addFromPdp: (prodId, useTradeIn, customPrice, tradeInClubName = '') => {
    const prod = AppData.storeProducts.find(p => p.id === prodId);
    if (!prod) return;
    const st = AppData.storeState;
    const variantLabel = `${st.pdpLoft} • ${st.pdpFlex} • ${st.pdpHand}`;
    const customPrint = document.getElementById('pdpCustomPrint')?.value.trim() || '';
    const modeLabel = useTradeIn ? `[Trade-In: ${tradeInClubName}]` : (prod.section === 'USED' ? '[CPO]' : '[Nowy]');

    AppData.cart.push({
      id: prod.id,
      name: prod.name,
      price: customPrice || prod.price,
      qty: 1,
      useTradeIn,
      modeLabel,
      variant: variantLabel,
      customPrint,
      imgUrl: prod.imgUrl
    });

    StoreComponent.saveCartToStorage();
    st.cartOpen = true;
    auth.updateHeaderBar();
    StoreComponent.syncGlobalCartDrawer();
    app.showToast(`🛒 Dodano do koszyka: ${prod.name}`);
  },

  // =========================================================================
  // 2. KOSZYK SLIDE-OVER (DRAWER) + KODY RABATOWE + CHECKOUT
  // =========================================================================
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
    const pct = st.discountPercent || 0;
    const discountAmount = pct > 0 ? Math.round(rawCartValue * (pct / 100)) : 0;
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
        <div style="font-size:2.8rem; margin-bottom:0.7rem;">🛒</div>
        <strong style="color:#fff; display:block; margin-bottom:0.35rem;">Twój koszyk jest pusty</strong>
        <p style="font-size:0.76rem; margin-bottom:1.1rem;">Dodaj kije, piłki lub sprzęt CPO z naszego katalogu.</p>
        <button type="button" class="btn-primary" style="width:auto; padding:0.55rem 1.3rem;" onclick="StoreComponent.closeCartDrawer()">Przeglądaj sklep</button>
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
              <strong style="font-size:0.78rem; color:#fff; line-height:1.25;">${item.name}</strong>
              <button type="button" class="btn-mini-tool" style="color:#fca5a5; border-color:rgba(239,68,68,0.35); padding:1px 6px;" onclick="StoreComponent.removeItem(${idx})">✕</button>
            </div>
            <p style="font-size:0.66rem; color:var(--accent); margin:2px 0;">${item.variant || 'Standard'} ${item.modeLabel || ''}</p>
            ${item.customPrint ? `<p style="font-size:0.65rem; color:var(--gold);">🖨️ Nadruk: "${item.customPrint}"</p>` : ''}
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.35rem;">
              <div style="display:flex; align-items:center; gap:0.35rem;">
                <button type="button" class="btn-mini-tool" onclick="StoreComponent.changeQty(${idx}, -1)">-</button>
                <strong style="font-size:0.76rem;">${item.qty || 1} szt.</strong>
                <button type="button" class="btn-mini-tool" onclick="StoreComponent.changeQty(${idx}, 1)">+</button>
              </div>
              <strong style="font-size:0.86rem; color:var(--gold);">${item.price * (item.qty || 1)} PLN</strong>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const checkoutHTML = (AppData.cart.length > 0 && st.checkoutStep) ? `
      <div style="background:rgba(0,0,0,0.45); border:1px solid var(--accent); border-radius:12px; padding:0.9rem; margin-top:0.4rem;">
        <h4 style="color:var(--accent); font-size:0.8rem; margin-bottom:0.6rem; text-transform:uppercase;">📦 Dane dostawy i płatność</h4>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <input type="text" id="chkName" value="${AppData.user?.name || ''}" placeholder="Imię i Nazwisko *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.76rem;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.45rem;">
            <input type="tel" id="chkPhone" placeholder="Telefon *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.76rem;">
            <input type="email" id="chkEmail" value="${AppData.user?.email || ''}" placeholder="E-mail *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.76rem;">
          </div>
          <input type="text" id="chkAddress" placeholder="Ulica i nr domu / Kod Paczkomatu *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.76rem;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.45rem;">
            <input type="text" id="chkCity" value="${AppData.user?.city || ''}" placeholder="Kod i Miasto *" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.76rem;">
            <input type="text" id="chkNip" placeholder="NIP (opcjonalnie)" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.76rem;">
          </div>
          <select id="chkDelivery" style="background:#091519; border:1px solid var(--glass-border); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.75rem;">
            <option value="KURIER_DPD">🚚 Kurier DPD Dłużyca (Ubezpieczony)</option>
            ${!hasOversize ? `<option value="INPOST">📦 Paczkomat InPost 24/7</option>` : ''}
            <option value="ODBIOR_TRACKMAN">🎯 Odbiór osobisty + Test na TrackManie (0 PLN)</option>
          </select>
          <select id="chkPayment" style="background:#091519; border:1px solid var(--glass-border); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.75rem;">
            <option value="BLIK">📱 Szybki BLIK (0 PLN)</option>
            <option value="P24">🏦 Przelewy24 / PayNow</option>
            <option value="CARD">💳 Karta Visa / Mastercard</option>
            <option value="COD">💵 Płatność przy odbiorze</option>
          </select>
          <input type="text" id="chkNotes" placeholder="Uwagi do zamówienia..." style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:7px; padding:0.5rem; color:#fff; font-size:0.75rem;">
          <label style="font-size:0.68rem; color:var(--text-muted); display:flex; align-items:center; gap:6px;">
            <input type="checkbox" id="chkTerms" checked> Akceptuję Regulamin Sklepu TGN.
          </label>
        </div>
      </div>
    ` : '';

    backdrop.innerHTML = `
      <div class="cart-drawer-panel" onclick="event.stopPropagation()">
        <div class="cart-drawer-header">
          <div>
            <strong style="color:var(--accent); font-size:0.92rem;">🛒 Twój Koszyk (${totalItemsCount})</strong>
            <p style="font-size:0.66rem; color:var(--text-muted);">Darmowa dostawa od 300 PLN • Gwarancja TGN</p>
          </div>
          <button type="button" style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer;" onclick="StoreComponent.closeCartDrawer()">✕</button>
        </div>

        <div class="cart-drawer-body">
          ${itemsHTML}
          ${AppData.cart.length > 0 ? `
            <div style="background:rgba(250,204,21,0.07); border:1px dashed rgba(250,204,21,0.4); border-radius:10px; padding:0.6rem;">
              <div style="display:flex; gap:0.4rem;">
                <input type="text" id="cartPromoCodeInput" placeholder="Kod rabatowy (np. RABAT3 lub TGN5)" value="${st.discountCode || ''}" style="flex:1; background:rgba(0,0,0,0.5); border:1px solid var(--gold); border-radius:6px; padding:0.38rem 0.6rem; color:#fff; font-size:0.74rem;">
                <button type="button" class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold); padding:0.4rem 0.7rem;" onclick="StoreComponent.checkCartPromoCode()">Zastosuj</button>
              </div>
              ${pct > 0 ? `<span style="font-size:0.67rem; color:var(--accent); display:block; margin-top:4px;">✓ Aktywny kod <strong>${st.discountCode}</strong> (-${pct}%): oszczędzasz -${discountAmount} PLN</span>` : ''}
            </div>
            ${checkoutHTML}
          ` : ''}
        </div>

        ${AppData.cart.length > 0 ? `
          <div class="cart-drawer-footer">
            <div style="display:flex; justify-content:space-between; font-size:0.74rem; color:var(--text-muted); margin-bottom:2px;">
              <span>Produkty:</span><span>${rawCartValue} PLN</span>
            </div>
            ${discountAmount > 0 ? `
              <div style="display:flex; justify-content:space-between; font-size:0.74rem; color:var(--accent); margin-bottom:2px;">
                <span>Rabat (${st.discountCode} -${pct}%):</span><span>-${discountAmount} PLN</span>
              </div>
            ` : ''}
            <div style="display:flex; justify-content:space-between; font-size:0.74rem; color:var(--text-muted); margin-bottom:0.5rem;">
              <span>Dostawa:</span><span>${shippingCost === 0 ? '0 PLN (Gratis)' : shippingCost + ' PLN'}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.12);">
              <strong style="font-size:0.88rem; color:#fff;">Do zapłaty:</strong>
              <strong style="font-size:1.2rem; color:var(--gold);">${finalCartValue} PLN</strong>
            </div>

            ${!st.checkoutStep ? `
              <button type="button" class="btn-primary" style="margin:0; padding:0.7rem;" onclick="StoreComponent.toggleCheckoutStep()">
                💳 Przejdź do dostawy i płatności →
              </button>
            ` : `
              <div style="display:grid; grid-template-columns:1fr 2fr; gap:0.5rem;">
                <button type="button" class="btn-action" style="margin:0;" onclick="StoreComponent.toggleCheckoutStep()">← Wróć</button>
                <button type="button" class="btn-primary" style="margin:0; padding:0.68rem;" onclick="StoreComponent.submitProductionOrder(${finalCartValue})">
                  🔒 Zamawiam (${finalCartValue} PLN)
                </button>
              </div>
            `}
          </div>
        ` : ''}
      </div>
    `;
    backdrop.style.display = 'flex';
  },

  // =========================================================================
  // 3. GŁÓWNY RENDERER SKLEPU (KATALOG + ZAAWANSOWANE FILTRY + CMS ADMINA)
  // =========================================================================
  render: () => {
    StoreComponent.ensureStoreDataInitialized();
    const st = AppData.storeState;
    const isAdmin = AppData.user && AppData.user.role === 'ADMIN';

    setTimeout(() => { StoreComponent.syncGlobalCartDrawer(); }, 10);

    // Jeśli użytkownik kliknął w produkt -> pokaż dedykowaną Kartę Produktu (PDP)
    if (st.selectedProductId) {
      const selectedProd = AppData.storeProducts.find(p => p.id === st.selectedProductId);
      if (selectedProd) return StoreComponent.renderProductDetailPage(selectedProd);
      st.selectedProductId = null;
    }

    // Filtrowanie wielokryterialne
    let filtered = AppData.storeProducts.filter(p => {
      if (st.section !== "ALL" && p.section !== st.section) return false;
      if (!StoreComponent.matchesCategory(p, st.category)) return false;
      if (st.brand !== "ALL" && p.brand.toLowerCase() !== st.brand.toLowerCase()) return false;
      if (st.flex !== "ALL" && p.flex !== st.flex) return false;
      if (st.loftFilter !== "ALL" && !String(p.loft || '').includes(st.loftFilter)) return false;
      if (st.maxPrice !== "ALL" && p.price > parseInt(st.maxPrice, 10)) return false;

      if (st.search) {
        const q = st.search.toLowerCase();
        const match = p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || (p.spec || '').toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    if (st.sortBy === "PRICE_ASC") filtered.sort((a, b) => a.price - b.price);
    else if (st.sortBy === "PRICE_DESC") filtered.sort((a, b) => b.price - a.price);

    const brandsList = [...new Set(AppData.storeProducts.map(p => p.brand))];

    // Formularz CMS Administratora (Dodawanie i Edycja z automatycznym wypełnianiem pól)
    const editProd = StoreComponent.editingProductId
      ? AppData.storeProducts.find(p => p.id === StoreComponent.editingProductId)
      : null;
    const previewImg = editProd
      ? ClubImageEngine.getClubVisualUrl(editProd.name, editProd.imgUrl)
      : ClubImageEngine.buildDirectSearchPhotoUrl("Titleist TSR3 Driver", 0);

    const adminCmsHTML = (isAdmin && st.addProductOpen) ? `
      <div class="store-admin-add-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <h3 style="color:var(--gold); font-size:0.88rem; margin:0;">
            ${editProd ? `✏️ Edycja produktu: ${editProd.name}` : '⚙️ [CMS ADMINA] Dodaj nowy produkt do sklepu'}
          </h3>
          <button type="button" class="btn-mini-tool" onclick="StoreComponent.toggleAddProduct()">✕ Zamknij</button>
        </div>

        <div class="live-preview-row">
          <div class="club-photo-frame" style="width:80px !important; height:80px !important;">
            <img id="newStoreProdPreviewImg" src="${previewImg}" alt="Podgląd">
          </div>
          <div style="display:grid; grid-template-columns:1.5fr 1fr; gap:0.45rem;">
            <input type="text" id="addProdName" value="${editProd ? editProd.name : ''}" placeholder="Nazwa produktu *" oninput="StoreComponent.updateNewProductPreview(this.value)" style="background:rgba(255,255,255,0.08); border:1px solid var(--accent); border-radius:6px; padding:0.45rem; color:#fff; font-size:0.78rem;">
            <input type="text" id="addProdBrand" value="${editProd ? editProd.brand : ''}" placeholder="Marka (np. Titleist, Ping)" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:0.45rem; color:#fff; font-size:0.78rem;">
            <input type="text" id="addProdCustomImg" value="${editProd && editProd.imgUrl ? editProd.imgUrl : ''}" placeholder="(Opcjonalnie) Własny link URL zdjęcia..." style="grid-column:span 2; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.35rem 0.5rem; color:#fff; font-size:0.72rem;">
          </div>
        </div>

        <div class="store-add-grid">
          <div>
            <label>Stan (Dział)</label>
            <select id="addProdSection">
              <option value="NEW" ${editProd?.section === 'NEW' ? 'selected' : ''}>🏆 Nowy (Pro Shop)</option>
              <option value="USED" ${editProd?.section === 'USED' ? 'selected' : ''}>♻️ Używany (Komis CPO)</option>
              <option value="BALLS" ${editProd?.section === 'BALLS' ? 'selected' : ''}>⚪ Piłki / Personalizacja</option>
            </select>
          </div>
          <div>
            <label>Kategoria</label>
            <select id="addProdCat">
              ${AppData.storeCategories.filter(c => c.id !== 'ALL').map(c => `<option value="${c.id}" ${editProd?.cat === c.id ? 'selected' : ''}>${c.icon} ${c.label}</option>`).join('')}
            </select>
          </div>
          <div>
            <label>Flex shaftu</label>
            <select id="addProdFlex">
              <option value="Stiff" ${editProd?.flex === 'Stiff' ? 'selected' : ''}>Stiff (S)</option>
              <option value="Regular" ${editProd?.flex === 'Regular' ? 'selected' : ''}>Regular (R)</option>
              <option value="Wedge" ${editProd?.flex === 'Wedge' ? 'selected' : ''}>Wedge Flex</option>
              <option value="N/A" ${editProd?.flex === 'N/A' ? 'selected' : ''}>Nie dotyczy</option>
            </select>
          </div>
          <div>
            <label>Loft / Rozmiar</label>
            <input type="text" id="addProdLoft" value="${editProd ? editProd.loft : '10.5°'}">
          </div>
          <div>
            <label>Cena brutto (PLN)</label>
            <input type="number" id="addProdPrice" value="${editProd ? editProd.price : 1490}">
          </div>
          <div>
            <label>Stan magazynowy (szt.)</label>
            <input type="number" id="addProdStock" value="${editProd ? editProd.stock : 3}">
          </div>
          <div>
            <label>Stan opisowy</label>
            <input type="text" id="addProdCond" value="${editProd ? editProd.condition : 'Fabrycznie nowy'}">
          </div>
          <div>
            <label>Specyfikacja</label>
            <input type="text" id="addProdSpec" value="${editProd ? editProd.spec : 'Shaft Ventus Blue 6S'}">
          </div>
        </div>

        <input type="text" id="addProdDesc" value="${editProd ? editProd.desc : ''}" placeholder="Opis technologiczny produktu..." style="width:100%; margin:0.55rem 0; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.16); border-radius:6px; padding:0.48rem 0.65rem; color:#fff; font-size:0.75rem;">
        <button type="button" class="btn-primary" style="margin:0; padding:0.55rem;" onclick="StoreComponent.saveNewProductToStore()">
          ✓ ${editProd ? 'Zapisz zmiany w produkcie' : 'Dodaj produkt do sklepu'}
        </button>
      </div>
    ` : '';

    const productsHTML = filtered.length === 0 ? `
      <div style="grid-column:1 / -1; text-align:center; padding:2.5rem; background:rgba(0,0,0,0.25); border-radius:14px; border:1px dashed rgba(255,255,255,0.15);">
        <p style="font-size:0.9rem; color:#fff; margin-bottom:0.5rem;">Brak produktów spełniających wybrane filtry.</p>
        <button type="button" class="btn-action" style="width:auto; padding:0.45rem 1.2rem;" onclick="StoreComponent.resetFilters()">Wyczyść wszystkie filtry</button>
      </div>
    ` : filtered.map(prod => {
      const imgId = `store_prod_img_${prod.id}`;
      const visualSrc = ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(prod.name);
      const isUsed = prod.section === "USED";
      const savings = prod.oldPrice && prod.oldPrice > prod.price ? (prod.oldPrice - prod.price) : 0;

      return `
        <div class="store-card ${isUsed ? 'used-cpo-card' : ''}">
          <div>
            <div class="store-img-box" onclick="StoreComponent.openProductPage(${prod.id})">
              <img id="${imgId}" src="${visualSrc}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
              <span class="store-tag ${prod.tagGold ? 'gold' : ''}">${prod.tag}</span>
              ${savings > 0 ? `<span class="store-discount-badge">-${savings} PLN</span>` : ''}
            </div>

            <div class="store-tech-pills">
              <span class="tech-pill brand">${prod.brand}</span>
              <span class="tech-pill">${isUsed ? '♻️ CPO' : 'Nowy'}</span>
              ${prod.flex !== 'N/A' ? `<span class="tech-pill">${prod.flex}</span>` : ''}
              <span class="tech-pill">${prod.loft}</span>
            </div>

            <h3 style="font-size:0.9rem; color:#fff; margin:0.3rem 0 0.25rem; line-height:1.3; cursor:pointer;" onclick="StoreComponent.openProductPage(${prod.id})">${prod.name}</h3>
            <p style="font-size:0.69rem; color:var(--accent); font-weight:600; margin-bottom:0.4rem;">${prod.spec}</p>

            <div class="store-condition-box ${isUsed ? 'cpo' : ''}">
              <strong>Stan: ${prod.condition}</strong>
              <span>Magazyn: ${prod.stock > 0 ? prod.stock + ' szt.' : 'Brak'}</span>
            </div>
          </div>

          <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.55rem;">
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.45rem;">
              <span style="font-size:0.68rem; color:var(--text-muted);">Cena:</span>
              <div>
                ${savings > 0 ? `<span style="font-size:0.7rem; color:var(--text-muted); text-decoration:line-through; margin-right:5px;">${prod.oldPrice} PLN</span>` : ''}
                <strong style="font-size:1.05rem; color:#fff;">${prod.price} PLN</strong>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem;">
              <button type="button" class="btn-action" style="margin:0; padding:0.45rem;" onclick="StoreComponent.openProductPage(${prod.id})">🔍 Szczegóły</button>
              <button type="button" class="btn-primary" style="margin:0; padding:0.45rem; font-size:0.74rem;" onclick="StoreComponent.addItem(${prod.id}, false)">🛒 Do koszyka</button>
            </div>

            ${isAdmin ? `
              <div style="display:flex; gap:0.35rem; margin-top:0.45rem; justify-content:flex-end;">
                <button type="button" class="btn-mini-tool" style="color:var(--gold); border-color:var(--gold);" onclick="StoreComponent.startEditProduct(${prod.id})">✏️ Edytuj (CMS)</button>
                <button type="button" class="btn-mini-tool" style="color:#fca5a5; border-color:rgba(239,68,68,0.4);" onclick="StoreComponent.deleteProduct(${prod.id})">🗑️ Usuń</button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
          <h2 style="margin:0;">🛍️ TGN Pro Shop & Komis CPO (${filtered.length} / ${AppData.storeProducts.length})</h2>
          <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
            ${isAdmin ? `
              <button type="button" class="btn-action" style="width:auto; margin:0; padding:0.4rem 0.85rem; background:var(--gold); color:#052e16; border-color:var(--gold);" onclick="StoreComponent.startAddNewProduct()">
                ⚙️ + Dodaj produkt (CMS)
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Baner promocyjny z aktywacją kodu RABAT3 -->
        <div class="elite-store-bar">
          <div style="display:flex; align-items:center; gap:0.65rem; flex-wrap:wrap;">
            <span class="elite-badge-pill">⭐ PGA CERTIFIED PRO SHOP</span>
            <span style="font-size:0.75rem; color:#e2e8f0;">
              🎁 Akcja <strong style="color:var(--gold);">"3 jak Par 3"</strong> – wpisz kod <strong style="color:var(--accent); cursor:pointer; text-decoration:underline;" onclick="StoreComponent.applyPromoCode('RABAT3', 3)">RABAT3</strong> (-3%) lub <strong style="color:var(--gold); cursor:pointer; text-decoration:underline;" onclick="StoreComponent.applyPromoCode('TGN5', 5)">TGN5</strong> (-5%)
              ${st.discountPercent > 0 ? `<span style="color:var(--accent); font-weight:800; margin-left:6px;">(✓ AKTYWNY: ${st.discountCode} -${st.discountPercent}%)</span>` : ''}
            </span>
          </div>
          <button type="button" class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold);" onclick="StoreComponent.openCartDrawer()">🛒 Otwórz koszyk</button>
        </div>

        ${adminCmsHTML}

        <!-- Poziomy slider kategorii -->
        <div class="store-category-slider">
          ${AppData.storeCategories.map(catObj => {
            const countInCat = AppData.storeProducts.filter(p => StoreComponent.matchesCategory(p, catObj.id)).length;
            return `
              <button type="button" class="cat-pill-chip ${st.category === catObj.id ? 'active' : ''}" onclick="StoreComponent.setCategory('${catObj.id}')">
                <span>${catObj.icon}</span>
                <span>${catObj.label}</span>
                <span style="opacity:0.65; font-size:0.65rem;">(${countInCat})</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Zaawansowany pasek filtrów: Stan, Marka, Flex, Loft, Cena, Sortowanie -->
        <div class="store-adv-filters">
          <input type="text" id="storeSearchInput" placeholder="🔍 Szukaj modelu, marki..." value="${st.search}" oninput="StoreComponent.setFilter('search', this.value)">

          <select onchange="StoreComponent.setFilter('section', this.value)">
            <option value="ALL" ${st.section === 'ALL' ? 'selected' : ''}>Stan: Wszystkie</option>
            <option value="NEW" ${st.section === 'NEW' ? 'selected' : ''}>🏆 Tylko Nowe</option>
            <option value="USED" ${st.section === 'USED' ? 'selected' : ''}>♻️ Tylko Komis CPO</option>
          </select>

          <select onchange="StoreComponent.setFilter('brand', this.value)">
            <option value="ALL" ${st.brand === 'ALL' ? 'selected' : ''}>Marka: Wszystkie</option>
            ${brandsList.map(b => `<option value="${b}" ${st.brand === b ? 'selected' : ''}>${b}</option>`).join('')}
          </select>

          <select onchange="StoreComponent.setFilter('flex', this.value)">
            <option value="ALL" ${st.flex === 'ALL' ? 'selected' : ''}>Flex: Dowolny</option>
            <option value="Regular" ${st.flex === 'Regular' ? 'selected' : ''}>Regular (R)</option>
            <option value="Stiff" ${st.flex === 'Stiff' ? 'selected' : ''}>Stiff (S)</option>
            <option value="Wedge" ${st.flex === 'Wedge' ? 'selected' : ''}>Wedge Flex</option>
          </select>

          <select onchange="StoreComponent.setFilter('loftFilter', this.value)">
            <option value="ALL" ${st.loftFilter === 'ALL' ? 'selected' : ''}>Loft: Dowolny</option>
            <option value="9.0" ${st.loftFilter === '9.0' ? 'selected' : ''}>9.0°</option>
            <option value="10.5" ${st.loftFilter === '10.5' ? 'selected' : ''}>10.5°</option>
            <option value="52" ${st.loftFilter === '52' ? 'selected' : ''}>52° (Gap)</option>
            <option value="56" ${st.loftFilter === '56' ? 'selected' : ''}>56° (Sand)</option>
          </select>

          <select onchange="StoreComponent.setFilter('maxPrice', this.value)">
            <option value="ALL" ${st.maxPrice === 'ALL' ? 'selected' : ''}>Cena: Bez limitu</option>
            <option value="500" ${st.maxPrice === '500' ? 'selected' : ''}>Do 500 PLN</option>
            <option value="1500" ${st.maxPrice === '1500' ? 'selected' : ''}>Do 1 500 PLN</option>
            <option value="2500" ${st.maxPrice === '2500' ? 'selected' : ''}>Do 2 500 PLN</option>
            <option value="4000" ${st.maxPrice === '4000' ? 'selected' : ''}>Do 4 000 PLN</option>
          </select>
        </div>

        <div class="store-grid">
          ${productsHTML}
        </div>
      </section>
    `;
  },

  // =========================================================================
  // 4. AKCJE KOSZYKA, RABATÓW, FILTRÓW I CMS
  // =========================================================================
  openCartDrawer: () => { StoreComponent.ensureStoreDataInitialized(); AppData.storeState.cartOpen = true; StoreComponent.syncGlobalCartDrawer(); },
  closeCartDrawer: () => { StoreComponent.ensureStoreDataInitialized(); AppData.storeState.cartOpen = false; StoreComponent.syncGlobalCartDrawer(); },
  toggleCheckoutStep: () => { AppData.storeState.checkoutStep = !AppData.storeState.checkoutStep; StoreComponent.syncGlobalCartDrawer(); },

  addItem: (prodId, useTradeIn) => {
    StoreComponent.ensureStoreDataInitialized();
    const prod = AppData.storeProducts.find(p => p.id === prodId);
    if (!prod) return;
    if (prod.stock <= 0) { app.showToast('⚠️ Produkt wyprzedany!'); return; }

    const finalPrice = useTradeIn ? prod.tradeInPrice : prod.price;
    const modeLabel = useTradeIn ? "[Trade-In]" : (prod.section === "USED" ? "[CPO]" : "[Nowy]");
    const existing = AppData.cart.find(i => i.id === prodId && i.useTradeIn === useTradeIn);

    if (existing) existing.qty = (existing.qty || 1) + 1;
    else AppData.cart.push({ id: prod.id, name: prod.name, price: finalPrice, qty: 1, useTradeIn, modeLabel, variant: prod.loft, imgUrl: prod.imgUrl });

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
  },

  removeItem: (idx) => {
    AppData.cart.splice(idx, 1);
    StoreComponent.saveCartToStorage();
    auth.updateHeaderBar();
    StoreComponent.syncGlobalCartDrawer();
  },

  applyPromoCode: (code, pct) => {
    StoreComponent.ensureStoreDataInitialized();
    AppData.storeState.discountCode = code;
    AppData.storeState.discountPercent = pct;
    StoreComponent.syncGlobalCartDrawer();
    app.switchTab('sklep');
    app.showToast(`🎉 Aktywowano kod ${code} (-${pct}% w koszyku)!`);
  },

  applyRabat3Code: () => StoreComponent.applyPromoCode('RABAT3', 3),

  checkCartPromoCode: () => {
    const code = (document.getElementById('cartPromoCodeInput')?.value || '').trim().toUpperCase();
    if (code === 'RABAT3' || code === 'PAR3') StoreComponent.applyPromoCode('RABAT3', 3);
    else if (code === 'TGN5') StoreComponent.applyPromoCode('TGN5', 5);
    else app.showToast('⚠️ Nieprawidłowy kod! Użyj: RABAT3 (-3%) lub TGN5 (-5%).');
  },

  submitProductionOrder: (finalTotal) => {
    const name = document.getElementById('chkName')?.value.trim();
    const phone = document.getElementById('chkPhone')?.value.trim();
    const email = document.getElementById('chkEmail')?.value.trim();
    const address = document.getElementById('chkAddress')?.value.trim();
    const city = document.getElementById('chkCity')?.value.trim();
    if (!name || !phone || !email || !address || !city) {
      app.showToast('⚠️ Uzupełnij wymagane pola dostawy!');
      return;
    }

    const orderNumber = 'TGN-2026-' + (Math.floor(Math.random() * 8999) + 1000);
    const newOrder = {
      orderId: orderNumber,
      date: new Date().toLocaleString('pl-PL'),
      customerName: name, phone, email,
      address: `${address}, ${city}`,
      nip: document.getElementById('chkNip')?.value.trim() || 'Paragon',
      delivery: document.getElementById('chkDelivery')?.value || 'KURIER_DPD',
      payment: document.getElementById('chkPayment')?.value || 'BLIK',
      notes: document.getElementById('chkNotes')?.value.trim() || '-',
      items: [...AppData.cart],
      total: finalTotal,
      status: 'Opłacone (W przygotowaniu)'
    };

    AppData.cart.forEach(ci => {
      const p = AppData.storeProducts.find(x => x.id === ci.id);
      if (p && p.stock > 0) p.stock = Math.max(0, p.stock - (ci.qty || 1));
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
    app.showToast(`✅ Zamówienie #${orderNumber} złożone pomyślnie!`);
  },

  startAddNewProduct: () => { StoreComponent.editingProductId = null; AppData.storeState.selectedProductId = null; AppData.storeState.addProductOpen = true; app.switchTab('sklep'); },
  startEditProduct: (prodId) => { StoreComponent.editingProductId = prodId; AppData.storeState.selectedProductId = null; AppData.storeState.addProductOpen = true; app.switchTab('sklep'); window.scrollTo({ top: 80, behavior: 'smooth' }); },
  toggleAddProduct: () => { StoreComponent.editingProductId = null; AppData.storeState.addProductOpen = !AppData.storeState.addProductOpen; app.switchTab('sklep'); },

  updateNewProductPreview: (val) => {
    clearTimeout(StoreComponent.previewTimer);
    StoreComponent.previewTimer = setTimeout(() => {
      const imgEl = document.getElementById('newStoreProdPreviewImg');
      if (imgEl) imgEl.src = ClubImageEngine.buildDirectSearchPhotoUrl(val.trim() || "Titleist TSR3 Driver", 0);
    }, 250);
  },

  saveNewProductToStore: () => {
    const name = document.getElementById('addProdName')?.value.trim();
    if (!name) { app.showToast('Wpisz nazwę produktu!'); return; }

    const brand = document.getElementById('addProdBrand')?.value.trim() || 'TGN Pro';
    const section = document.getElementById('addProdSection')?.value || 'NEW';
    const cat = document.getElementById('addProdCat')?.value || 'KIJE_NOWE';
    const flex = document.getElementById('addProdFlex')?.value || 'Stiff';
    const loft = document.getElementById('addProdLoft')?.value.trim() || '10.5°';
    const price = parseInt(document.getElementById('addProdPrice')?.value, 10) || 990;
    const stock = parseInt(document.getElementById('addProdStock')?.value, 10) || 1;
    const condition = document.getElementById('addProdCond')?.value.trim() || 'Fabrycznie nowy';
    const spec = document.getElementById('addProdSpec')?.value.trim() || `${brand} • ${loft}`;
    const desc = document.getElementById('addProdDesc')?.value.trim() || 'Produkt dostępny w magazynie TGN.';
    const customImg = document.getElementById('addProdCustomImg')?.value.trim() || '';

    const productObj = {
      id: StoreComponent.editingProductId || Date.now(),
      section, cat, brand, flex, hand: 'RH', loft, condition,
      condDetails: section === 'USED' ? 'Zweryfikowany CPO (12 mies. gwarancji)' : 'Gwarancja 24 mies.',
      tag: section === 'USED' ? 'KOMIS CPO' : 'PRO SHOP',
      tagGold: section === 'USED',
      name, spec, desc,
      oldPrice: Math.round(price * 1.15),
      price,
      tradeInPrice: Math.max(150, Math.round(price * 0.55)),
      stock,
      imgUrl: customImg || ClubImageEngine.buildDirectSearchPhotoUrl(name, 0)
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
    app.showToast(`✓ Zapisano w katalogu: ${name}`);
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

  setCategory: (cat) => { AppData.storeState.category = cat; AppData.storeState.selectedProductId = null; app.switchTab('sklep'); },
  setFilter: (key, val) => {
    AppData.storeState[key] = val;
    app.switchTab('sklep');
    if (key === 'search') {
      const inp = document.getElementById('storeSearchInput');
      if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    }
  },
  resetFilters: () => {
    Object.assign(AppData.storeState, { section: 'ALL', category: 'ALL', brand: 'ALL', flex: 'ALL', loftFilter: 'ALL', maxPrice: 'ALL', search: '' });
    app.switchTab('sklep');
  }
};

window.StoreComponent = StoreComponent;
/* =========================================================================
   WYSUWANE MENU KATEGORII (LEFT DRAWER W STYLU PILKIGOLFOWE.PL) v35.0
   ========================================================================= */

(function injectCategoryDrawerV35() {
  if (document.getElementById('tgnCatDrawerStyles')) return;
  const style = document.createElement('style');
  style.id = 'tgnCatDrawerStyles';
  style.textContent = `
    #tgnCatDrawerBackdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      z-index: 9995;
      display: none;
      justify-content: flex-start;
    }
    .cat-drawer-panel {
      width: 82%;
      max-width: 340px;
      height: 100vh;
      height: 100dvh;
      background: linear-gradient(175deg, #0c1d22, #050e12);
      border-right: 2px solid var(--accent);
      display: flex;
      flex-direction: column;
      box-shadow: 15px 0 45px rgba(0, 0, 0, 0.9);
      animation: slideInLeft 0.22s ease-out;
    }
    @keyframes slideInLeft {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    .cat-drawer-header {
      padding: 1rem 1.15rem;
      background: rgba(0, 0, 0, 0.45);
      border-bottom: 1px solid var(--glass-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .cat-drawer-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    .cat-drawer-item {
      width: 100%;
      background: transparent;
      border: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding: 0.9rem 1.15rem;
      color: #f1f5f9;
      font-size: 0.82rem;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: background 0.18s, color 0.18s;
      text-align: left;
    }
    .cat-drawer-item:hover {
      background: rgba(74, 222, 128, 0.1);
      color: var(--accent);
    }
    .cat-drawer-item.active {
      background: rgba(74, 222, 128, 0.18);
      color: var(--accent);
      border-left: 4px solid var(--accent);
    }
    .cat-drawer-arrow {
      color: var(--accent);
      font-size: 1rem;
      font-weight: 400;
      opacity: 0.85;
    }
    .cat-drawer-count {
      font-size: 0.7rem;
      color: var(--text-muted);
      font-weight: 600;
      margin-left: 6px;
    }
    .btn-open-cat-drawer {
      background: rgba(74, 222, 128, 0.15);
      border: 1.5px solid var(--accent);
      color: var(--accent);
      padding: 0.45rem 0.9rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 800;
      white-space: nowrap;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .btn-open-cat-drawer:hover {
      background: var(--accent);
      color: #052e16;
    }
  `;
  document.head.appendChild(style);
})();

StoreComponent.openCategoryDrawer = () => {
  StoreComponent.ensureStoreDataInitialized();
  let backdrop = document.getElementById('tgnCatDrawerBackdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'tgnCatDrawerBackdrop';
    backdrop.onclick = () => StoreComponent.closeCategoryDrawer();
    document.body.appendChild(backdrop);
  }

  const st = AppData.storeState;
  const rowsHTML = (AppData.storeCategories || []).map(cat => {
    const count = (AppData.storeProducts || []).filter(p => StoreComponent.matchesCategory(p, cat.id)).length;
    const isActive = st.category === cat.id;
    return `
      <button type="button" class="cat-drawer-item ${isActive ? 'active' : ''}" onclick="StoreComponent.selectCategoryFromDrawer('${cat.id}')">
        <span>
          <span style="margin-right:8px;">${cat.icon}</span>
          ${cat.label}
          <span class="cat-drawer-count">(${count})</span>
        </span>
        <span class="cat-drawer-arrow">›</span>
      </button>
    `;
  }).join('');

  backdrop.innerHTML = `
    <div class="cat-drawer-panel" onclick="event.stopPropagation()">
      <div class="cat-drawer-header">
        <strong style="color:var(--accent); font-size:0.9rem; letter-spacing:0.8px;">☰ ASORTYMENT TGN</strong>
        <button type="button" style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer;" onclick="StoreComponent.closeCategoryDrawer()">✕</button>
      </div>
      <div class="cat-drawer-list">
        ${rowsHTML}
      </div>
    </div>
  `;
  backdrop.style.display = 'flex';
};

StoreComponent.closeCategoryDrawer = () => {
  const backdrop = document.getElementById('tgnCatDrawerBackdrop');
  if (backdrop) backdrop.style.display = 'none';
};

StoreComponent.selectCategoryFromDrawer = (catId) => {
  StoreComponent.closeCategoryDrawer();
  StoreComponent.setCategory(catId);
};

// Automatyczne dodanie przycisku "☰ Kategorie" na początek paska kategorii w sklepie
const _origStoreRender = StoreComponent.render;
StoreComponent.render = () => {
  const html = _origStoreRender();
  return html.replace(
    '<div class="store-category-slider">',
    '<div class="store-category-slider"><button type="button" class="btn-open-cat-drawer" onclick="StoreComponent.openCategoryDrawer()">☰ Kategorie</button>'
  );
};

window.StoreComponent = StoreComponent;
/* =========================================================================
   PEWNE OTWIERANIE SZCZEGÓŁÓW PRODUKTU (PDP) PO KLIKNIĘCIU v36.0
   ========================================================================= */

StoreComponent.openProductPage = function(prodId) {
  StoreComponent.ensureStoreDataInitialized();
  const numId = Number(prodId);
  const prod = (AppData.storeProducts || []).find(p => Number(p.id) === numId);
  if (!prod) return;

  const st = AppData.storeState;
  st.selectedProductId = prod.id;
  st.pdpHand = prod.hand === 'LH' ? 'LH' : 'RH';
  st.pdpFlex = (prod.flex && prod.flex !== 'N/A') ? prod.flex : 'Standard';
  st.pdpLoft = prod.loft || 'Standard';
  st.pdpImgIdx = 0;
  st.pdpTradeInClubId = "DEFAULT";

  if (window.app && typeof window.app.switchTab === 'function') {
    window.app.switchTab('sklep');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Nadpisanie renderowania, aby zawsze najpierw sprawdzało wybrany produkt (PDP)
// i dopinało przycisk "☰ Kategorie" do paska kategorii
const _renderBeforePdpFix = StoreComponent.render;
StoreComponent.render = function() {
  StoreComponent.ensureStoreDataInitialized();
  const st = AppData.storeState;

  if (st.selectedProductId !== null && typeof st.selectedProductId !== 'undefined') {
    const prod = (AppData.storeProducts || []).find(p => Number(p.id) === Number(st.selectedProductId));
    if (prod && typeof StoreComponent.renderProductDetailPage === 'function') {
      setTimeout(() => {
        if (typeof StoreComponent.syncGlobalCartDrawer === 'function') {
          StoreComponent.syncGlobalCartDrawer();
        }
      }, 10);
      return StoreComponent.renderProductDetailPage(prod);
    }
    st.selectedProductId = null;
  }

  const html = _renderBeforePdpFix();
  if (html.indexOf('class="btn-open-cat-drawer"') === -1) {
    return html.replace(
      '<div class="store-category-slider">',
      '<div class="store-category-slider"><button type="button" class="btn-open-cat-drawer" onclick="StoreComponent.openCategoryDrawer()">☰ Kategorie</button>'
    );
  }
  return html;
};

window.StoreComponent = StoreComponent;
/* =========================================================================
   INTERAKTYWNY KREATOR WYMIANY TRADE-IN (WIZARD + KALKULATOR CPO) v37.0
   ========================================================================= */

(function injectTradeInWizardStyles() {
  const old = document.getElementById('tgnTradeInWizardStyles');
  if (old) old.remove();

  const style = document.createElement('style');
  style.id = 'tgnTradeInWizardStyles';
  style.textContent = `
    #tgnTradeInModalOverlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.84);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9998;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 0.75rem;
    }
    .ti-modal-card {
      width: 100%;
      max-width: 560px;
      max-height: 92dvh;
      background: linear-gradient(165deg, #0e2228, #061014);
      border: 1.5px solid var(--gold);
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 65px rgba(0, 0, 0, 0.92), inset 0 0 25px rgba(250, 204, 21, 0.08);
      animation: tiFadeUp 0.22s ease-out;
    }
    @keyframes tiFadeUp {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .ti-header {
      padding: 0.95rem 1.15rem;
      background: rgba(0, 0, 0, 0.45);
      border-bottom: 1px solid rgba(250, 204, 21, 0.25);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.6rem;
    }
    .ti-body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem 1.15rem;
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }
    .ti-footer {
      padding: 0.9rem 1.15rem;
      background: rgba(4, 12, 16, 0.97);
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }

    .ti-target-banner {
      display: grid;
      grid-template-columns: 56px 1fr auto;
      gap: 0.75rem;
      align-items: center;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(114, 214, 150, 0.28);
      border-radius: 12px;
      padding: 0.6rem 0.75rem;
    }
    .ti-target-thumb {
      width: 56px;
      height: 56px;
      background: #fff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .ti-target-thumb img { width: 100%; height: 100%; object-fit: contain; padding: 3px; }

    .ti-mode-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.35rem;
      background: rgba(0, 0, 0, 0.45);
      padding: 0.28rem;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .ti-tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.48rem 0.5rem;
      border-radius: 7px;
      font-size: 0.75rem;
      font-weight: 800;
      cursor: pointer;
      transition: 0.2s;
    }
    .ti-tab-btn.active {
      background: var(--gold);
      color: #052e16;
    }

    .ti-bag-list {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .ti-bag-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.65rem;
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 0.65rem 0.8rem;
      cursor: pointer;
      transition: 0.2s;
    }
    .ti-bag-item:hover { border-color: rgba(250, 204, 21, 0.55); }
    .ti-bag-item.selected {
      background: rgba(250, 204, 21, 0.12);
      border-color: var(--gold);
      box-shadow: inset 0 0 12px rgba(250, 204, 21, 0.12);
    }
    .ti-check-circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      flex-shrink: 0;
    }
    .ti-bag-item.selected .ti-check-circle {
      background: var(--gold);
      border-color: var(--gold);
      color: #052e16;
      font-weight: 900;
    }

    .ti-form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.55rem;
    }
    .ti-form-grid label {
      display: block;
      font-size: 0.63rem;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 3px;
      font-weight: 700;
    }
    .ti-form-grid input,
    .ti-form-grid select {
      width: 100%;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 7px;
      padding: 0.48rem 0.6rem;
      color: #fff;
      font-size: 0.76rem;
      outline: none;
    }
    .ti-form-grid select option { background: #09161b; color: #fff; }
    .ti-form-grid input:focus, .ti-form-grid select:focus { border-color: var(--gold); }

    .ti-cond-pills {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.35rem;
      margin-top: 0.25rem;
    }
    .ti-cond-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 0.42rem 0.3rem;
      color: #cbd5e1;
      font-size: 0.66rem;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      transition: 0.2s;
    }
    .ti-cond-pill.active {
      background: rgba(74, 222, 128, 0.16);
      border-color: var(--accent);
      color: var(--accent);
    }

    .ti-extras-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.55rem;
      background: rgba(0, 0, 0, 0.32);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      padding: 0.6rem 0.75rem;
      font-size: 0.72rem;
      color: #e2e8f0;
    }
    .ti-extras-row label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }

    .ti-logistics-grid {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .ti-log-option {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      padding: 0.55rem 0.75rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
      transition: 0.2s;
    }
    .ti-log-option.active {
      border-color: var(--accent);
      background: rgba(74, 222, 128, 0.1);
    }

    .ti-summary-line {
      display: flex;
      justify-content: space-between;
      font-size: 0.74rem;
      color: var(--text-muted);
      margin-bottom: 3px;
    }

    @media (max-width: 600px) {
      .ti-form-grid { grid-template-columns: 1fr; }
      .ti-cond-pills { grid-template-columns: repeat(2, 1fr); }
      .ti-modal-card { max-height: 94dvh; border-radius: 14px; }
    }
  `;
  document.head.appendChild(style);
})();

window.TradeInWizard = {
  state: {
    open: false,
    productId: null,
    variantLabel: '',
    sourceTab: 'BAG', // 'BAG' | 'CUSTOM'
    selectedBagIds: [],
    customCat: 'DRIVER',
    customBrand: 'TaylorMade',
    customModel: '',
    customCond: 'BDB', // 'MINT' | 'BDB' | 'DOBRY' | 'SLADY'
    hasHeadcover: true,
    noSkyMarks: true,
    photoDataUrl: null,
    logistics: 'NEW_FIRST' // 'NEW_FIRST' | 'SEND_FIRST' | 'IN_STORE'
  },

  open: function(prodId, opts = {}) {
    StoreComponent.ensureStoreDataInitialized();
    if (typeof ProfileAndBagComponent !== 'undefined' && ProfileAndBagComponent.initSavedBag) {
      ProfileAndBagComponent.initSavedBag();
    }

    const prod = (AppData.storeProducts || []).find(p => Number(p.id) === Number(prodId));
    if (!prod) return;

    const bag = AppData.bag || [];
    const s = TradeInWizard.state;
    s.open = true;
    s.productId = prod.id;
    s.variantLabel = opts.variant || prod.loft || 'Standard';
    s.sourceTab = bag.length > 0 ? 'BAG' : 'CUSTOM';
    s.selectedBagIds = bag.length > 0 ? [bag[0].id] : [];
    s.photoDataUrl = null;

    TradeInWizard.renderModal();
  },

  close: function() {
    TradeInWizard.state.open = false;
    const overlay = document.getElementById('tgnTradeInModalOverlay');
    if (overlay) overlay.style.display = 'none';
  },

  getBagClubBaseOffer: function(club) {
    const cpoRaw = parseInt(String(club.cpoOffer || '0').replace(/\D/g, ''), 10);
    if (cpoRaw > 0) return cpoRaw;
    const valRaw = parseInt(String(club.val || '900').replace(/\D/g, ''), 10) || 900;
    return Math.round(valRaw * 0.68);
  },

  calculateValuation: function() {
    const s = TradeInWizard.state;
    const prod = (AppData.storeProducts || []).find(p => Number(p.id) === Number(s.productId));
    const prodPrice = prod ? prod.price : 0;

    let baseValue = 0;
    let itemsDesc = [];

    if (s.sourceTab === 'BAG') {
      const bag = AppData.bag || [];
      const chosen = bag.filter(c => s.selectedBagIds.includes(c.id));
      chosen.forEach(c => {
        baseValue += TradeInWizard.getBagClubBaseOffer(c);
        itemsDesc.push(c.name);
      });
    } else {
      const catBase = {
        DRIVER: 980,
        IRONY: 1480,
        WOOD: 560,
        WEDGE: 340,
        PUTTER: 620,
        GPS: 680
      }[s.customCat] || 600;

      const brandMult = {
        TaylorMade: 1.24,
        Titleist: 1.28,
        Ping: 1.25,
        Mizuno: 1.2,
        Callaway: 1.18,
        Cobra: 1.05,
        Garmin: 1.22,
        Inna: 0.85
      }[s.customBrand] || 1.0;

      const condMult = {
        MINT: 1.18,
        BDB: 1.0,
        DOBRY: 0.78,
        SLADY: 0.56
      }[s.customCond] || 1.0;

      baseValue = Math.round((catBase * brandMult * condMult) / 10) * 10;
      const modelTxt = s.customModel.trim() || `${s.customBrand} (${s.customCat})`;
      itemsDesc.push(`${modelTxt} [${s.customCond}]`);
    }

    // Dodatki za stan i akcesoria (jeśli wybrano jakikolwiek sprzęt)
    let extrasBonus = 0;
    if (baseValue > 0) {
      if (s.hasHeadcover) extrasBonus += 50;
      if (s.noSkyMarks) extrasBonus += 70;
    }

    const subtotalCpo = baseValue + extrasBonus;
    // +10% bonusu TGN za wymianę Trade-In zamiast wypłaty gotówki
    const tradeInBonus = Math.round(subtotalCpo * 0.10);
    const totalTradeValue = subtotalCpo + tradeInBonus;

    const finalToPay = Math.max(0, prodPrice - totalTradeValue);
    const voucherSurplus = Math.max(0, totalTradeValue - prodPrice);

    return {
      prodPrice,
      subtotalCpo,
      tradeInBonus,
      totalTradeValue,
      finalToPay,
      voucherSurplus,
      summaryLabel: itemsDesc.join(' + ')
    };
  },

  setTab: function(tab) {
    TradeInWizard.state.sourceTab = tab;
    TradeInWizard.renderModal();
  },

  toggleBagClub: function(clubId) {
    const ids = TradeInWizard.state.selectedBagIds;
    const idx = ids.indexOf(clubId);
    if (idx >= 0) ids.splice(idx, 1);
    else ids.push(clubId);
    TradeInWizard.renderModal();
  },

  updateField: function(key, val, rerenderFull = true) {
    TradeInWizard.state[key] = val;
    if (rerenderFull) {
      TradeInWizard.renderModal();
    } else {
      TradeInWizard.refreshSummaryOnly();
    }
  },

  handlePhotoUpload: function(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      TradeInWizard.state.photoDataUrl = e.target.result;
      TradeInWizard.renderModal();
      app.showToast('📷 Dodano zdjęcie do weryfikacji Trade-In!');
    };
    reader.readAsDataURL(file);
  },

  refreshSummaryOnly: function() {
    const calc = TradeInWizard.calculateValuation();
    const summaryEl = document.getElementById('tiFooterSummary');
    const confirmBtn = document.getElementById('tiConfirmBtn');
    if (summaryEl) summaryEl.innerHTML = TradeInWizard.buildSummaryHTML(calc);
    if (confirmBtn) {
      confirmBtn.disabled = calc.totalTradeValue <= 0;
      confirmBtn.textContent = calc.totalTradeValue <= 0
        ? 'Wybierz sprzęt do wymiany powyżej'
        : `✓ Zatwierdź Trade-In i dodaj do koszyka (Dopłata: ${calc.finalToPay} PLN)`;
    }
  },

  buildSummaryHTML: function(calc) {
    return `
      <div class="ti-summary-line">
        <span>Cena katalogowa wybranego sprzętu:</span>
        <strong style="color:#fff;">${calc.prodPrice} PLN</strong>
      </div>
      <div class="ti-summary-line">
        <span>Wycena CPO Twojego sprzętu:</span>
        <span style="color:var(--accent);">-${calc.subtotalCpo} PLN</span>
      </div>
      <div class="ti-summary-line">
        <span>Bonus TGN Trade-In (+10% przy wymianie):</span>
        <strong style="color:var(--gold);">-${calc.tradeInBonus} PLN</strong>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.45rem; padding-top:0.45rem; border-top:1px solid rgba(255,255,255,0.12);">
        <strong style="font-size:0.86rem; color:#fff;">Twoja dopłata końcowa:</strong>
        <strong style="font-size:1.22rem; color:var(--gold);">${calc.finalToPay} PLN</strong>
      </div>
      ${calc.voucherSurplus > 0 ? `
        <div style="margin-top:0.35rem; font-size:0.7rem; color:var(--accent); background:rgba(74,222,128,0.12); padding:4px 8px; border-radius:6px; text-align:center;">
          🎁 Nadwyżka <strong>+${calc.voucherSurplus} PLN</strong> zostanie dopisana jako Voucher TGN na kolejne zakupy!
        </div>
      ` : ''}
    `;
  },

  confirmTradeIn: function() {
    const s = TradeInWizard.state;
    const prod = (AppData.storeProducts || []).find(p => Number(p.id) === Number(s.productId));
    if (!prod) return;

    const calc = TradeInWizard.calculateValuation();
    if (calc.totalTradeValue <= 0) {
      app.showToast('⚠️ Zaznacz co najmniej jeden kij lub uzupełnij wycenę!');
      return;
    }

    const logLabels = {
      NEW_FIRST: 'Najpierw nowy kij (14 dni na odesłanie starego)',
      SEND_FIRST: 'Darmowa etykieta DPD/InPost',
      IN_STORE: 'Wymiana osobista w punkcie TGN'
    };

    const photoTag = s.photoDataUrl ? ' • 📷 Foto zweryfikowane' : '';
    const modeLabel = `[🔄 TRADE-IN: oddajesz ${calc.summaryLabel} (-${calc.totalTradeValue} PLN) • ${logLabels[s.logistics]}${photoTag}]`;

    AppData.cart.push({
      id: prod.id,
      name: prod.name,
      price: calc.finalToPay,
      qty: 1,
      useTradeIn: true,
      modeLabel: modeLabel,
      variant: s.variantLabel,
      customPrint: calc.voucherSurplus > 0 ? `Voucher zwrotny TGN: +${calc.voucherSurplus} PLN` : '',
      imgUrl: prod.imgUrl,
      tradeInMeta: {
        tradedItems: calc.summaryLabel,
        tradeValue: calc.totalTradeValue,
        logistics: s.logistics,
        hasPhoto: !!s.photoDataUrl
      }
    });

    StoreComponent.saveCartToStorage();
    TradeInWizard.close();
    AppData.storeState.cartOpen = true;
    auth.updateHeaderBar();
    StoreComponent.syncGlobalCartDrawer();
    app.showToast(`🔄 Dodano wymianę Trade-In! Twoja dopłata: ${calc.finalToPay} PLN`);
  },

  renderModal: function() {
    const s = TradeInWizard.state;
    let overlay = document.getElementById('tgnTradeInModalOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'tgnTradeInModalOverlay';
      overlay.onclick = () => TradeInWizard.close();
      document.body.appendChild(overlay);
    }

    if (!s.open) {
      overlay.style.display = 'none';
      return;
    }

    const prod = (AppData.storeProducts || []).find(p => Number(p.id) === Number(s.productId));
    if (!prod) return;

    const bag = AppData.bag || [];
    const calc = TradeInWizard.calculateValuation();
    const thumbUrl = ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl);
    const fallbackUrl = ClubImageEngine.getFallbackPhoto(prod.name);

    const bagTabHTML = bag.length === 0 ? `
      <div style="text-align:center; padding:1.2rem; background:rgba(0,0,0,0.3); border-radius:10px; font-size:0.75rem; color:var(--text-muted);">
        Brak kijów w Twojej Cyfrowej Torbie 3D. Przełącz na zakładkę <strong>➕ Inny sprzęt</strong>, aby wycenić dowolny kij.
      </div>
    ` : `
      <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:0.35rem;">
        Zaznacz jeden lub kilka kijów, które chcesz oddać w rozliczeniu:
      </div>
      <div class="ti-bag-list">
        ${bag.map(club => {
          const isSel = s.selectedBagIds.includes(club.id);
          const offer = TradeInWizard.getBagClubBaseOffer(club);
          return `
            <div class="ti-bag-item ${isSel ? 'selected' : ''}" onclick="TradeInWizard.toggleBagClub(${club.id})">
              <div style="display:flex; align-items:center; gap:0.6rem; min-width:0;">
                <span class="ti-check-circle">${isSel ? '✓' : ''}</span>
                <div style="min-width:0;">
                  <strong style="font-size:0.78rem; color:#fff; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${club.name}</strong>
                  <span style="font-size:0.66rem; color:var(--text-muted);">${club.loft} • Stan: ${club.cond}</span>
                </div>
              </div>
              <div style="text-align:right; flex-shrink:0;">
                <strong style="font-size:0.82rem; color:var(--gold); display:block;">-${offer} PLN</strong>
                <span style="font-size:0.6rem; color:var(--accent);">+10% bonus</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    const customTabHTML = `
      <div class="ti-form-grid">
        <div>
          <label>Kategoria sprzętu</label>
          <select onchange="TradeInWizard.updateField('customCat', this.value)">
            <option value="DRIVER" ${s.customCat === 'DRIVER' ? 'selected' : ''}>Driver</option>
            <option value="IRONY" ${s.customCat === 'IRONY' ? 'selected' : ''}>Zestaw Ironów (5-PW)</option>
            <option value="WOOD" ${s.customCat === 'WOOD' ? 'selected' : ''}>Fairway Wood / Hybryda</option>
            <option value="WEDGE" ${s.customCat === 'WEDGE' ? 'selected' : ''}>Wedge</option>
            <option value="PUTTER" ${s.customCat === 'PUTTER' ? 'selected' : ''}>Putter</option>
            <option value="GPS" ${s.customCat === 'GPS' ? 'selected' : ''}>Dalmierz / Radar GPS</option>
          </select>
        </div>
        <div>
          <label>Marka</label>
          <select onchange="TradeInWizard.updateField('customBrand', this.value)">
            ${['TaylorMade', 'Titleist', 'Ping', 'Mizuno', 'Callaway', 'Cobra', 'Garmin', 'Inna'].map(b =>
              `<option value="${b}" ${s.customBrand === b ? 'selected' : ''}>${b}</option>`
            ).join('')}
          </select>
        </div>
        <div style="grid-column:span 2;">
          <label>Dokładny model i shaft</label>
          <input type="text" value="${s.customModel}" placeholder="np. Titleist TSR2 10° Ventus Blue 6S" oninput="TradeInWizard.updateField('customModel', this.value, false)">
        </div>
      </div>

      <div>
        <span style="display:block; font-size:0.63rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; margin-bottom:4px;">Stan wizualny i techniczny</span>
        <div class="ti-cond-pills">
          <button type="button" class="ti-cond-pill ${s.customCond === 'MINT' ? 'active' : ''}" onclick="TradeInWizard.updateField('customCond', 'MINT')">10/10<br>Jak nowy</button>
          <button type="button" class="ti-cond-pill ${s.customCond === 'BDB' ? 'active' : ''}" onclick="TradeInWizard.updateField('customCond', 'BDB')">9/10<br>Bardzo dobry</button>
          <button type="button" class="ti-cond-pill ${s.customCond === 'DOBRY' ? 'active' : ''}" onclick="TradeInWizard.updateField('customCond', 'DOBRY')">7.5/10<br>Dobry</button>
          <button type="button" class="ti-cond-pill ${s.customCond === 'SLADY' ? 'active' : ''}" onclick="TradeInWizard.updateField('customCond', 'SLADY')">6/10<br>Ślady gry</button>
        </div>
      </div>
    `;

    overlay.innerHTML = `
      <div class="ti-modal-card" onclick="event.stopPropagation()">
        <div class="ti-header">
          <div>
            <strong style="color:var(--gold); font-size:0.92rem; letter-spacing:0.4px;">🔄 KREATOR WYMIANY TRADE-IN (+10% BONUS)</strong>
            <span style="display:block; font-size:0.66rem; color:var(--text-muted);">Obniż cenę nowego zakupu oddając obecny sprzęt</span>
          </div>
          <button type="button" style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:30px; height:30px; border-radius:50%; cursor:pointer;" onclick="TradeInWizard.close()">✕</button>
        </div>

        <div class="ti-body">
          <!-- Wybrany produkt docelowy -->
          <div class="ti-target-banner">
            <div class="ti-target-thumb">
              <img src="${thumbUrl}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackUrl}';">
            </div>
            <div style="min-width:0;">
              <span style="font-size:0.6rem; color:var(--accent); font-weight:800; text-transform:uppercase;">KUPUJESZ:</span>
              <strong style="font-size:0.8rem; color:#fff; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${prod.name}</strong>
              <span style="font-size:0.66rem; color:var(--text-muted);">Wariant: ${s.variantLabel}</span>
            </div>
            <strong style="font-size:0.92rem; color:#fff; white-space:nowrap;">${prod.price} PLN</strong>
          </div>

          <!-- Wybór źródła oddawanego sprzętu -->
          <div class="ti-mode-tabs">
            <button type="button" class="ti-tab-btn ${s.sourceTab === 'BAG' ? 'active' : ''}" onclick="TradeInWizard.setTab('BAG')">
              🎒 Z mojej Torby 3D (${bag.length})
            </button>
            <button type="button" class="ti-tab-btn ${s.sourceTab === 'CUSTOM' ? 'active' : ''}" onclick="TradeInWizard.setTab('CUSTOM')">
              ➕ Inny sprzęt (Wycena)
            </button>
          </div>

          ${s.sourceTab === 'BAG' ? bagTabHTML : customTabHTML}

          <!-- Dodatki zwiększające wycenę + zdjęcie do weryfikacji -->
          <div class="ti-extras-row">
            <label>
              <input type="checkbox" ${s.hasHeadcover ? 'checked' : ''} onchange="TradeInWizard.updateField('hasHeadcover', this.checked)">
              Oryginalny headcover / klucz (<strong style="color:var(--accent);">+50 PLN</strong>)
            </label>
            <label>
              <input type="checkbox" ${s.noSkyMarks ? 'checked' : ''} onchange="TradeInWizard.updateField('noSkyMarks', this.checked)">
              Brak wgnieceń i sky-marków (<strong style="color:var(--accent);">+70 PLN</strong>)
            </label>
            <label style="color:var(--blue); font-weight:700; width:100%; margin-top:2px;">
              📷 ${s.photoDataUrl ? 'Zdjęcie dodane ✓ (kliknij, aby zmienić)' : 'Dodaj zdjęcie główki/lica (szybsza akceptacja CPO)'}
              <input type="file" accept="image/*" style="display:none;" onchange="TradeInWizard.handlePhotoUpload(event)">
            </label>
            ${s.photoDataUrl ? `<img src="${s.photoDataUrl}" alt="Podgląd" style="height:54px; border-radius:6px; border:1px solid var(--accent);">` : ''}
          </div>

          <!-- Wybór logistyki wymiany -->
          <div>
            <span style="display:block; font-size:0.65rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; margin-bottom:5px;">Sposób przekazania starego sprzętu</span>
            <div class="ti-logistics-grid">
              <div class="ti-log-option ${s.logistics === 'NEW_FIRST' ? 'active' : ''}" onclick="TradeInWizard.updateField('logistics', 'NEW_FIRST')">
                <div>
                  <strong style="font-size:0.75rem; color:#fff; display:block;">📦 Najpierw nowy sprzęt (14 dni na zwrot starego)</strong>
                  <span style="font-size:0.65rem; color:var(--text-muted);">Odsyłasz stary kij w tym samym kartonie darmową etykietą DPD</span>
                </div>
                <strong style="font-size:0.68rem; color:var(--accent);">0 PLN</strong>
              </div>
              <div class="ti-log-option ${s.logistics === 'SEND_FIRST' ? 'active' : ''}" onclick="TradeInWizard.updateField('logistics', 'SEND_FIRST')">
                <div>
                  <strong style="font-size:0.75rem; color:#fff; display:block;">🚚 Wyślij stary sprzęt teraz</strong>
                  <span style="font-size:0.65rem; color:var(--text-muted);">Wysyłka po weryfikacji serwisowej (bez blokady kaucji)</span>
                </div>
                <strong style="font-size:0.68rem; color:var(--accent);">0 PLN</strong>
              </div>
              <div class="ti-log-option ${s.logistics === 'IN_STORE' ? 'active' : ''}" onclick="TradeInWizard.updateField('logistics', 'IN_STORE')">
                <div>
                  <strong style="font-size:0.75rem; color:#fff; display:block;">🎯 Wymiana na miejscu (Warszawa / Szczecin)</strong>
                  <span style="font-size:0.65rem; color:var(--text-muted);">Wycena od ręki + darmowe 15 min testu na TrackManie</span>
                </div>
                <strong style="font-size:0.68rem; color:var(--gold);">VIP</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="ti-footer">
          <div id="tiFooterSummary">${TradeInWizard.buildSummaryHTML(calc)}</div>
          <button type="button" id="tiConfirmBtn" class="btn-primary" style="margin-top:0.65rem; padding:0.72rem; font-size:0.82rem;" ${calc.totalTradeValue <= 0 ? 'disabled' : ''} onclick="TradeInWizard.confirmTradeIn()">
            ${calc.totalTradeValue <= 0 ? 'Wybierz sprzęt do wymiany powyżej' : `✓ Zatwierdź Trade-In i dodaj do koszyka (Dopłata: ${calc.finalToPay} PLN)`}
          </button>
        </div>
      </div>
    `;

    overlay.style.display = 'flex';
  }
};

// Przechwycenie wszystkich przycisków Trade-In (z listy sklepu oraz karty PDP)
const _origAddItemBeforeWizard = StoreComponent.addItem;
StoreComponent.addItem = function(prodId, useTradeIn) {
  if (useTradeIn) {
    TradeInWizard.open(prodId);
    return;
  }
  return _origAddItemBeforeWizard(prodId, false);
};

const _origAddFromPdpBeforeWizard = StoreComponent.addFromPdp;
StoreComponent.addFromPdp = function(prodId, useTradeIn, customPrice, tradeInClubName) {
  if (useTradeIn) {
    const st = AppData.storeState || {};
    const variantLabel = `${st.pdpLoft || 'Standard'} • ${st.pdpFlex || 'Standard'} • ${st.pdpHand || 'RH'}`;
    TradeInWizard.open(prodId, { variant: variantLabel });
    return;
  }
  return _origAddFromPdpBeforeWizard(prodId, false, customPrice, tradeInClubName);
};

window.StoreComponent = StoreComponent;


