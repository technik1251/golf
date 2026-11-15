const StoreComponent = {
  render: () => {
    const st = AppData.storeState;

    // Filtrowanie wielokryterialne produktów (styl GolfBrothers & PilkiGolfowe)
    let filtered = AppData.storeProducts.filter(p => {
      if (st.section !== "ALL" && p.section !== st.section) return false;
      if (st.category !== "ALL" && p.cat !== st.category) return false;
      if (st.brand !== "ALL" && p.brand !== st.brand) return false;
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

    // Sortowanie
    if (st.sortBy === "PRICE_ASC") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (st.sortBy === "PRICE_DESC") {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Obliczenia koszyka
    const totalItemsCount = AppData.cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    const totalCartValue = AppData.cart.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);

    // Liczniki w głównych działach
    const countAll = AppData.storeProducts.length;
    const countNew = AppData.storeProducts.filter(p => p.section === "NEW").length;
    const countUsed = AppData.storeProducts.filter(p => p.section === "USED").length;
    const countBalls = AppData.storeProducts.filter(p => p.section === "BALLS").length;

    // Szuflada / Panel Koszyka
    const cartDrawerHTML = (st.cartOpen || AppData.cart.length > 0) ? `
      <div class="cart-summary-bar" style="flex-direction:column; align-items:stretch;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <strong style="color:var(--accent); font-size:0.92rem;">🛒 Twój Koszyk Pro Shop (${totalItemsCount} szt.)</strong>
            <span style="font-size:0.72rem; color:var(--text-muted); margin-left:8px;">Darmowa wysyłka od 300 PLN</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <strong style="font-size:1.15rem; color:var(--gold);">Razem: ${totalCartValue} PLN</strong>
            <button class="btn-mini-tool" onclick="StoreComponent.toggleCartDrawer()">
              ${st.cartOpen ? '▲ Zwiń szczegóły' : '▼ Rozwiń koszyk (' + AppData.cart.length + ')'}
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

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-top:0.5rem; padding-top:0.5rem; border-top:1px solid rgba(255,255,255,0.08);">
              <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap; font-size:0.75rem;">
                <span style="color:var(--text-muted);">Opcja odbioru:</span>
                <select onchange="StoreComponent.setDelivery(this.value)" style="background:rgba(0,0,0,0.5); color:#fff; border:1px solid var(--glass-border); padding:0.35rem 0.6rem; border-radius:6px; font-size:0.75rem;">
                  <option value="KURIER" ${st.deliveryMethod === 'KURIER' ? 'selected' : ''}>📦 Kurier DPD / InPost (0 PLN)</option>
                  <option value="FITTING" ${st.deliveryMethod === 'FITTING' ? 'selected' : ''}>🎯 Odbiór ze sprawdzeniem na TrackManie (Warszawa / Szczecin)</option>
                </select>
              </div>
              <button class="btn-primary" style="width:auto; margin:0; padding:0.55rem 1.3rem;" onclick="app.checkoutStore()">
                ✓ Potwierdź i złóż zamówienie (${totalCartValue} PLN)
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    ` : '';

    // Karty produktów
    let productsHTML = filtered.length === 0 ? `
      <div style="grid-column: 1 / -1; text-align:center; padding: 2.5rem; background:rgba(0,0,0,0.25); border-radius:14px; border:1px dashed rgba(255,255,255,0.15);">
        <p style="font-size:0.95rem; color:var(--text-main); margin-bottom:0.5rem;">Brak produktów spełniających wybrane filtry.</p>
        <button class="btn-action" style="width:auto; padding:0.45rem 1rem;" onclick="StoreComponent.resetFilters()">Wyczyść wszystkie filtry</button>
      </div>
    ` : filtered.map(prod => {
      const imgId = `store_prod_img_${prod.id}`;
      const visualSrc = ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(prod.name);
      const safeName = prod.name.replace(/'/g, "");
      const isUsed = prod.section === "USED";
      const isBalls = prod.section === "BALLS";
      const savings = prod.oldPrice ? (prod.oldPrice - prod.price) : 0;

      return `
        <div class="store-card ${isUsed ? 'used-cpo-card' : ''}">
          <div>
            <div class="store-img-box" onclick="app.openPhotoZoom('${safeName}', document.getElementById('${imgId}').src, '${prod.spec} • Cena: ${prod.price} PLN')">
              <img id="${imgId}" src="${visualSrc}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
              <span class="store-tag ${prod.tagGold ? 'gold' : ''}">${prod.tag}</span>
              ${savings > 0 ? `<span class="store-discount-badge">-${savings} PLN</span>` : ''}
            </div>

            <!-- Pasek metadanych technicznych: Marka, Ręka, Flex, Stan -->
            <div class="store-tech-pills">
              <span class="tech-pill brand">${prod.brand}</span>
              ${prod.hand !== 'ALL' ? `<span class="tech-pill">${prod.hand === 'RH' ? 'Praworęczny (RH)' : 'Leworęczny (LH)'}</span>` : ''}
              ${prod.flex !== 'N/A' ? `<span class="tech-pill">Flex: ${prod.flex}</span>` : ''}
              <span class="tech-pill">${prod.loft}</span>
            </div>

            <h3 style="font-size: 0.92rem; color: var(--text-main); margin: 0.35rem 0 0.25rem; line-height:1.3;">${prod.name}</h3>
            <p style="font-size: 0.7rem; color: var(--accent); font-weight: 600; margin-bottom: 0.35rem;">${prod.spec}</p>

            <!-- Box stanu technicznego (szczególnie ważny dla Używanych Kijów CPO i Lake Balls) -->
            <div class="store-condition-box ${isUsed ? 'cpo' : ''}">
              <strong>Stan: ${prod.condition}</strong>
              <span>${prod.condDetails}</span>
            </div>

            <p style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.5rem;">${prod.desc}</p>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.55rem;">
              <div style="display:flex; gap:0.35rem;">
                <button class="btn-mini-tool" onclick="app.nextWebSearchPhoto('${imgId}', '${safeName}')">📷 Inne foto</button>
                <button class="btn-mini-tool" onclick="app.openGoogleImages('${safeName}')">🔎 Google ↗</button>
              </div>
              <span style="font-size:0.65rem; color:${prod.stock <= 2 ? 'var(--gold)' : 'var(--accent)'}; font-weight:700;">
                ● Magazyn: ${prod.stock} szt.
              </span>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.6rem;">
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.2rem;">
              <span style="font-size:0.7rem; color:var(--text-muted);">
                ${isUsed ? 'Cena nowego / Nasza cena CPO:' : 'Cena w sklepie TGN:'}
              </span>
              <div>
                ${prod.oldPrice ? `<span style="font-size:0.72rem; color:var(--text-muted); text-decoration:line-through; margin-right:6px;">${prod.oldPrice} PLN</span>` : ''}
                <strong style="font-size:1.05rem; color:var(--text-main);">${prod.price} PLN</strong>
              </div>
            </div>

            ${!isBalls ? `
              <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.55rem;">
                <span style="font-size:0.68rem; color:var(--gold);">W rozliczeniu Trade-In (Twój kij):</span>
                <strong style="font-size:0.86rem; color:var(--gold);">dopłata od ${prod.tradeInPrice} PLN</strong>
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.4rem;">
                <button class="btn-action" style="margin:0; padding:0.48rem;" onclick="StoreComponent.addItem(${prod.id}, false)">🛒 Do koszyka</button>
                <button class="btn-action" style="margin:0; padding:0.48rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.1);" onclick="StoreComponent.addItem(${prod.id}, true)">🔄 Kup w Trade-In</button>
              </div>
            ` : `
              <button class="btn-action" style="margin:0.3rem 0 0; padding:0.5rem;" onclick="StoreComponent.addItem(${prod.id}, false)">🛒 Dodaj pakiet piłek do koszyka</button>
            `}
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <h2>
          <span>🛍️ TGN Pro Shop & Komis Kijów Używanych CPO (Styl GolfBrothers & PilkiGolfowe)</span>
          <span style="font-size:0.72rem; color:var(--gold);">Budżet Trade-In Twojej torby: 14 200 PLN</span>
        </h2>

        <!-- 3 Główne Działy Sklepu (Zakładki Duże) -->
        <div class="store-main-sections">
          <button class="store-sec-btn ${st.section === 'ALL' ? 'active' : ''}" onclick="StoreComponent.setSection('ALL')">
            <strong>🏬 Cały Asortyment (${countAll})</strong>
            <span>Nowe, Używane CPO & Piłki</span>
          </button>
          <button class="store-sec-btn ${st.section === 'NEW' ? 'active' : ''}" onclick="StoreComponent.setSection('NEW')">
            <strong>🏆 Nowy Sprzęt 2026 (${countNew})</strong>
            <span>Drivery, Irony, Torby, Dalmierze</span>
          </button>
          <button class="store-sec-btn used ${st.section === 'USED' ? 'active' : ''}" onclick="StoreComponent.setSection('USED')">
            <strong>♻️ Używane Kije CPO (${countUsed})</strong>
            <span>Drivery, Irony, Hybrydy z gwarancją</span>
          </button>
          <button class="store-sec-btn ${st.section === 'BALLS' ? 'active' : ''}" onclick="StoreComponent.setSection('BALLS')">
            <strong>⚪ Piłki Lake Balls AAAA (${countBalls})</strong>
            <span>Pakiety 24 / 50 szt. Pro V1, TP5</span>
          </button>
        </div>

        ${cartDrawerHTML}

        <!-- Pasek wyszukiwania i filtrów technicznych (Marka, Shaft Flex, Ręka RH/LH, Sortowanie) -->
        <div class="store-MultiFilter-bar">
          <input type="text" id="storeSearchInput" placeholder="🔍 Szukaj modelu (np. Qi10, Paradym, G425, Vokey 52, Pro V1, Leworęczny)..." value="${st.search}" oninput="StoreComponent.setSearch(this.value)">
          
          <select onchange="StoreComponent.setBrand(this.value)">
            <option value="ALL" ${st.brand === 'ALL' ? 'selected' : ''}>Wszystkie marki</option>
            <option value="TaylorMade" ${st.brand === 'TaylorMade' ? 'selected' : ''}>TaylorMade</option>
            <option value="Titleist" ${st.brand === 'Titleist' ? 'selected' : ''}>Titleist / Vokey / Scotty</option>
            <option value="Ping" ${st.brand === 'Ping' ? 'selected' : ''}>Ping</option>
            <option value="Callaway" ${st.brand === 'Callaway' ? 'selected' : ''}>Callaway</option>
            <option value="Mizuno" ${st.brand === 'Mizuno' ? 'selected' : ''}>Mizuno</option>
            <option value="Odyssey" ${st.brand === 'Odyssey' ? 'selected' : ''}>Odyssey</option>
            <option value="Cleveland" ${st.brand === 'Cleveland' ? 'selected' : ''}>Cleveland</option>
            <option value="Bushnell" ${st.brand === 'Bushnell' ? 'selected' : ''}>Bushnell / Clicgear</option>
          </select>

          <select onchange="StoreComponent.setFlex(this.value)">
            <option value="ALL" ${st.flex === 'ALL' ? 'selected' : ''}>Dowolny Flex shaftu</option>
            <option value="Regular" ${st.flex === 'Regular' ? 'selected' : ''}>Regular Flex (R)</option>
            <option value="Stiff" ${st.flex === 'Stiff' ? 'selected' : ''}>Stiff Flex (S - pod 96 mph)</option>
            <option value="Wedge" ${st.flex === 'Wedge' ? 'selected' : ''}>Wedge Flex</option>
          </select>

          <select onchange="StoreComponent.setHand(this.value)">
            <option value="ALL" ${st.hand === 'ALL' ? 'selected' : ''}>Ręka: RH i LH</option>
            <option value="RH" ${st.hand === 'RH' ? 'selected' : ''}>Praworęczne (RH)</option>
            <option value="LH" ${st.hand === 'LH' ? 'selected' : ''}>Leworęczne (LH)</option>
          </select>

          <select onchange="StoreComponent.setSort(this.value)">
            <option value="RECOMMENDED" ${st.sortBy === 'RECOMMENDED' ? 'selected' : ''}>Sortuj: Rekomendowane AI</option>
            <option value="PRICE_ASC" ${st.sortBy === 'PRICE_ASC' ? 'selected' : ''}>Cena: od najniższej</option>
            <option value="PRICE_DESC" ${st.sortBy === 'PRICE_DESC' ? 'selected' : ''}>Cena: od najwyższej</option>
          </select>
        </div>

        <!-- Pigułki podkategorii asortymentu -->
        <div class="forum-filters" style="margin-bottom:1rem;">
          <button class="filter-pill ${st.category === 'ALL' ? 'active' : ''}" onclick="StoreComponent.setCategory('ALL')">Wszystkie kategorie (${filtered.length})</button>
          <button class="filter-pill ${st.category === 'DRIVERY' ? 'active' : ''}" onclick="StoreComponent.setCategory('DRIVERY')">🏌️ Drivery</button>
          <button class="filter-pill ${st.category === 'WOOD_HYB' ? 'active' : ''}" onclick="StoreComponent.setCategory('WOOD_HYB')">🚀 Fairway Woody & Hybrydy</button>
          <button class="filter-pill ${st.category === 'IRONY' ? 'active' : ''}" onclick="StoreComponent.setCategory('IRONY')">⚙️ Zestawy Ironów</button>
          <button class="filter-pill ${st.category === 'WEDGE' ? 'active' : ''}" onclick="StoreComponent.setCategory('WEDGE')">🎯 Wedge (52°/56°)</button>
          <button class="filter-pill ${st.category === 'PUTTERY' ? 'active' : ''}" onclick="StoreComponent.setCategory('PUTTERY')">⛳ Puttery</button>
          <button class="filter-pill ${st.category === 'PILKI' ? 'active' : ''}" onclick="StoreComponent.setCategory('PILKI')">⚪ Piłki & Lake Balls</button>
          <button class="filter-pill ${st.category === 'TORBY' ? 'active' : ''}" onclick="StoreComponent.setCategory('TORBY')">🎒 Torby & Wózki</button>
          <button class="filter-pill ${st.category === 'GPS' ? 'active' : ''}" onclick="StoreComponent.setCategory('GPS')">🔭 Dalmierze & GPS</button>
        </div>

        <!-- Siatka produktów -->
        <div class="store-grid">
          ${productsHTML}
        </div>
      </section>
    `;
  },

  setSection: (sec) => {
    AppData.storeState.section = sec;
    if (sec === "BALLS") AppData.storeState.category = "PILKI";
    else if (AppData.storeState.category === "PILKI") AppData.storeState.category = "ALL";
    app.switchTab('sklep');
  },

  setCategory: (cat) => {
    AppData.storeState.category = cat;
    app.switchTab('sklep');
  },

  setBrand: (brand) => {
    AppData.storeState.brand = brand;
    app.switchTab('sklep');
  },

  setFlex: (flex) => {
    AppData.storeState.flex = flex;
    app.switchTab('sklep');
  },

  setHand: (hand) => {
    AppData.storeState.hand = hand;
    app.switchTab('sklep');
  },

  setSort: (sortBy) => {
    AppData.storeState.sortBy = sortBy;
    app.switchTab('sklep');
  },

  setSearch: (val) => {
    AppData.storeState.search = val;
    app.switchTab('sklep');
    const input = document.getElementById('storeSearchInput');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  },

  resetFilters: () => {
    AppData.storeState = {
      ...AppData.storeState,
      section: "ALL",
      category: "ALL",
      brand: "ALL",
      flex: "ALL",
      hand: "ALL",
      search: ""
    };
    app.switchTab('sklep');
  },

  toggleCartDrawer: () => {
    AppData.storeState.cartOpen = !AppData.storeState.cartOpen;
    app.switchTab('sklep');
  },

  setDelivery: (method) => {
    AppData.storeState.deliveryMethod = method;
  },

  addItem: (prodId, useTradeIn) => {
    const prod = AppData.storeProducts.find(p => p.id === prodId);
    if (!prod) return;

    const finalPrice = useTradeIn ? prod.tradeInPrice : prod.price;
    const modeLabel = useTradeIn ? "[W rozliczeniu Trade-In]" : (prod.section === "USED" ? "[Używany CPO]" : "[Nowy]");
    const existing = AppData.cart.find(i => i.id === prodId && i.useTradeIn === useTradeIn);

    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      AppData.cart.push({
        id: prod.id,
        name: prod.name,
        price: finalPrice,
        qty: 1,
        useTradeIn: useTradeIn,
        modeLabel: modeLabel
      });
    }

    AppData.storeState.cartOpen = true;
    auth.updateHeaderBar();
    app.switchTab('sklep');
    app.showToast(`Dodano do koszyka: ${prod.name} (${finalPrice} PLN)`);
  },

  changeQty: (idx, delta) => {
    if (!AppData.cart[idx]) return;
    AppData.cart[idx].qty = (AppData.cart[idx].qty || 1) + delta;
    if (AppData.cart[idx].qty <= 0) {
      AppData.cart.splice(idx, 1);
    }
    auth.updateHeaderBar();
    app.switchTab('sklep');
  },

  removeItem: (idx) => {
    AppData.cart.splice(idx, 1);
    auth.updateHeaderBar();
    app.switchTab('sklep');
  }
};
