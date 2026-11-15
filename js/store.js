const StoreComponent = {
  previewTimer: null,

  render: () => {
    const st = AppData.storeState;

    // Filtrowanie wielokryterialne produktów
    let filtered = AppData.storeProducts.filter(p => {
      if (st.section !== "ALL" && p.section !== st.section) return false;
      if (st.category !== "ALL" && p.cat !== st.category) return false;
      if (st.brand !== "ALL" && p.brand.toLowerCase() !== st.brand.toLowerCase()) return false;
      if (st.flex !== "ALL" && p.flex !== st.flex) return false;
      if (st.hand !== "ALL" && p.hand !== "ALL" && p.hand !== st.hand) return false;
      if (st.maxPrice && p.price > st.maxPrice) return false;

      if (st.search) {
        const q = st.search.toLowerCase();
        const match = p.name.toLowerCase().includes(q) ||
                      p.brand.toLowerCase().includes(q) ||
                      p.spec.toLowerCase().includes(q) ||
                      p.desc.toLowerCase().includes(q) ||
                      p.cat.toLowerCase().includes(q);
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

    const totalItemsCount = AppData.cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    const totalCartValue = AppData.cart.reduce((sum, i) => sum + (i.price * (i.qty || 1)), 0);

    const countAll = AppData.storeProducts.length;
    const countNew = AppData.storeProducts.filter(p => p.section === "NEW").length;
    const countUsed = AppData.storeProducts.filter(p => p.section === "USED").length;
    const countBalls = AppData.storeProducts.filter(p => p.section === "BALLS").length;

    // Unikalne marki dostępne w katalogu (rozszerza się automatycznie po dodaniu produktu!)
    const brandsList = [...new Set(AppData.storeProducts.map(p => p.brand))];

    // --- PANEL 1: ASYSTENT AI SKLEPU (TGN AI PRO FITTER) ---
    const aiAssistantHTML = st.aiAssistantOpen ? `
      <div class="store-ai-assistant-box">
        <div class="store-ai-header">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="ai-pulse-dot"></span>
            <strong style="color:var(--accent); font-size:0.88rem; letter-spacing:0.5px;">🤖 ASYSTENT AI SKLEPU & PRO FITTER (POŁĄCZONY Z TWOJĄ TORBĄ 3D)</strong>
          </div>
          <span style="font-size:0.7rem; color:var(--gold);">Twój profil: HCP ${AppData.user.hcp} • Swing ${AppData.user.swingSpeed} • Luka Gappingu: 52°</span>
        </div>

        <div class="store-ai-messages" id="storeAiMsgs">
          ${st.aiChatHistory.map(m => `
            <div class="store-ai-msg ${m.sender === 'Ty' ? 'user' : 'bot'}">
              <strong>${m.sender}:</strong> ${m.text}
            </div>
          `).join('')}
        </div>

        <!-- Szybkie podpowiedzi AI, które od razu filtrują sklep -->
        <div class="store-ai-quick-prompts">
          <button class="btn-mini-tool" onclick="StoreComponent.askAiPrompt('LUKA_52')">🎯 Dobierz kij pod moją lukę 15m (Wedge 52°)</button>
          <button class="btn-mini-tool" onclick="StoreComponent.askAiPrompt('SWING_96')">⚡ Kije pod mój Swing Speed 96 mph (Stiff)</button>
          <button class="btn-mini-tool" onclick="StoreComponent.askAiPrompt('OKAZJE_CPO')">♻️ Używane okazje CPO do 1500 PLN</button>
          <button class="btn-mini-tool" onclick="StoreComponent.askAiPrompt('LAKE_BALLS')">⚪ Najlepsze piłki Lake Balls AAAA</button>
          <button class="btn-mini-tool" onclick="StoreComponent.askAiPrompt('LEWORECZNE')">🤚 Pokaż kije leworęczne (LH)</button>
        </div>

        <div class="store-ai-input-row">
          <input type="text" id="storeAiInput" placeholder="Zapytaj AI o sprzęt (np. 'Szukam wybaczalnego drivera', 'Jaki putter do 1000 zł?', 'Pokaż irony Mizuno')..." onkeypress="if(event.key==='Enter') StoreComponent.sendCustomAiQuestion()">
          <button onclick="StoreComponent.sendCustomAiQuestion()">Zapytaj AI i Filtruj</button>
        </div>
      </div>
    ` : '';

    // --- PANEL 2: KREATOR DODAWANIA NOWEGO ASORTYMENTU DO SKLEPU ---
    const defaultPreviewImg = ClubImageEngine.buildDirectSearchPhotoUrl("Titleist TSR3 Driver", 0);
    const addProductModalHTML = st.addProductOpen ? `
      <div class="store-admin-add-box">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
          <h3 style="color:var(--accent); font-size:0.9rem;">➕ Dodaj nowy produkt do asortymentu sklepu (Auto-Foto z sieci)</h3>
          <button class="btn-mini-tool" onclick="StoreComponent.toggleAddProduct()">✕ Zamknij</button>
        </div>

        <div class="live-preview-row">
          <div class="club-photo-frame" style="width:86px !important; height:86px !important;">
            <img id="newStoreProdPreviewImg" src="${defaultPreviewImg}" alt="Podgląd produktu">
            <span class="live-photo-badge">AUTO FOTO</span>
          </div>
          <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:0.5rem;">
            <input type="text" id="addProdName" placeholder="Nazwa produktu (np. Callaway Paradym Ai Smoke Max Driver)" oninput="StoreComponent.updateNewProductPreview(this.value)" style="background:rgba(255,255,255,0.08); border:1px solid var(--accent); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.8rem;">
            <input type="text" id="addProdBrand" placeholder="Marka (np. Callaway, Ping, Titleist)" style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.2); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.8rem;">
            <div style="grid-column: span 2; display:flex; gap:0.4rem;">
              <button class="btn-mini-tool" onclick="StoreComponent.updateNewProductPreview(document.getElementById('addProdName').value || 'Callaway Paradym', true)">📷 Inne zdjęcie z wyszukiwarki</button>
              <input type="text" id="addProdCustomImg" placeholder="(Opcjonalnie) Własny link URL do zdjęcia..." style="flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.15); border-radius:5px; padding:0.25rem 0.5rem; color:#fff; font-size:0.72rem;">
            </div>
          </div>
        </div>

        <div class="store-add-grid">
          <div>
            <label>Dział sklepu</label>
            <select id="addProdSection">
              <option value="NEW">🏆 Nowy Sprzęt (Pro Shop)</option>
              <option value="USED">♻️ Używany Kij CPO (Komis)</option>
              <option value="BALLS">⚪ Piłki / Lake Balls</option>
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
              <option value="X-Stiff">X-Stiff (X)</option>
              <option value="Senior">Senior / Lite (A)</option>
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
            <label>Loft / Rozmiar / Ilość</label>
            <input type="text" id="addProdLoft" placeholder="np. 10.5° lub 5-PW lub 24 szt." value="10.5°">
          </div>
          <div>
            <label>Stan (np. Nowy lub 9/10 CPO)</label>
            <input type="text" id="addProdCond" placeholder="np. Używany 9.0/10 (Mint)" value="Fabrycznie nowy">
          </div>
          <div>
            <label>Cena w sklepie (PLN)</label>
            <input type="number" id="addProdPrice" placeholder="np. 1890" value="1890">
          </div>
          <div>
            <label>Cena katalogowa / stara (PLN)</label>
            <input type="number" id="addProdOldPrice" placeholder="np. 2490" value="2390">
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-top:0.5rem; margin-bottom:0.65rem;">
          <input type="text" id="addProdSpec" placeholder="Parametry techniczne (np. Shaft Fujikura Ventus Blue 6S • Grip Golf Pride)" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.76rem;">
          <input type="text" id="addProdDesc" placeholder="Krótki opis zalet produktu..." style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.76rem;">
        </div>

        <button class="btn-primary" style="margin:0; padding:0.6rem;" onclick="StoreComponent.saveNewProductToStore()">✓ Zapisz i opublikuj produkt w sklepie TGN</button>
      </div>
    ` : '';

    // --- PANEL 3: KOSZYK SZUFLADOWY ---
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

    // --- KARTY PRODUKTÓW ---
    let productsHTML = filtered.length === 0 ? `
      <div style="grid-column: 1 / -1; text-align:center; padding: 2.5rem; background:rgba(0,0,0,0.25); border-radius:14px; border:1px dashed rgba(255,255,255,0.15);">
        <p style="font-size:0.95rem; color:var(--text-main); margin-bottom:0.5rem;">Brak produktów spełniających wybrane kryteria wyszukiwania.</p>
        <button class="btn-action" style="width:auto; padding:0.45rem 1.2rem;" onclick="StoreComponent.resetFilters()">Wyczyść wszystkie filtry</button>
      </div>
    ` : filtered.map(prod => {
      const imgId = `store_prod_img_${prod.id}`;
      const visualSrc = ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(prod.name);
      const safeName = prod.name.replace(/'/g, "");
      const isUsed = prod.section === "USED";
      const isBalls = prod.section === "BALLS";
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
                ${prod.oldPrice && prod.oldPrice > prod.price ? `<span style="font-size:0.72rem; color:var(--text-muted); text-decoration:line-through; margin-right:6px;">${prod.oldPrice} PLN</span>` : ''}
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
              <button class="btn-action" style="margin:0.3rem 0 0; padding:0.5rem;" onclick="StoreComponent.addItem(${prod.id}, false)">🛒 Dodaj pakiet do koszyka</button>
            `}
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:1rem;">
          <h2 style="margin:0;">
            <span>🛍️ TGN Pro Shop & Komis CPO (${AppData.storeProducts.length} produktów w bazie)</span>
          </h2>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-action" style="width:auto; margin:0; padding:0.4rem 0.85rem; border-color:var(--blue); color:var(--blue); background:rgba(56,189,248,0.12);" onclick="StoreComponent.toggleAiAssistant()">
              🤖 ${st.aiAssistantOpen ? 'Ukryj Asystenta AI' : 'Otwórz Asystenta AI Sklepu'}
            </button>
            <button class="btn-action" style="width:auto; margin:0; padding:0.4rem 0.9rem; background:var(--accent); color:#052e16;" onclick="StoreComponent.toggleAddProduct()">
              ➕ Dodaj nowy produkt do sklepu
            </button>
          </div>
        </div>

        ${aiAssistantHTML}
        ${addProductModalHTML}

        <!-- 4 Główne Działy Sklepu -->
        <div class="store-main-sections">
          <button class="store-sec-btn ${st.section === 'ALL' ? 'active' : ''}" onclick="StoreComponent.setSection('ALL')">
            <strong>🏬 Cały Asortyment (${countAll})</strong>
            <span>Wszystkie działy sklepu</span>
          </button>
          <button class="store-sec-btn ${st.section === 'NEW' ? 'active' : ''}" onclick="StoreComponent.setSection('NEW')">
            <strong>🏆 Nowy Sprzęt 2026 (${countNew})</strong>
            <span>Pro Shop: Kije, Torby, GPS, Buty</span>
          </button>
          <button class="store-sec-btn used ${st.section === 'USED' ? 'active' : ''}" onclick="StoreComponent.setSection('USED')">
            <strong>♻️ Używane Kije CPO (${countUsed})</strong>
            <span>Drivery, Irony, Hybrydy z gwarancją</span>
          </button>
          <button class="store-sec-btn ${st.section === 'BALLS' ? 'active' : ''}" onclick="StoreComponent.setSection('BALLS')">
            <strong>⚪ Piłki & Lake Balls (${countBalls})</strong>
            <span>Pakiety AAAA Pearl / AAA</span>
          </button>
        </div>

        ${cartDrawerHTML}

        <!-- Zaawansowana Wyszukiwarka i Filtry Techniczne -->
        <div class="store-MultiFilter-bar">
          <input type="text" id="storeSearchInput" placeholder="🔍 Szukaj po nazwie, marce, kategorii lub parametrach (np. Qi10, Vokey 52, Hybryda, Buty, Pro V1)..." value="${st.search}" oninput="StoreComponent.setSearch(this.value)">
          
          <select onchange="StoreComponent.setBrand(this.value)">
            <option value="ALL" ${st.brand === 'ALL' ? 'selected' : ''}>Wszystkie marki (${brandsList.length})</option>
            ${brandsList.map(b => `<option value="${b}" ${st.brand === b ? 'selected' : ''}>${b}</option>`).join('')}
          </select>

          <select onchange="StoreComponent.setFlex(this.value)">
            <option value="ALL" ${st.flex === 'ALL' ? 'selected' : ''}>Dowolny Flex shaftu</option>
            <option value="Regular" ${st.flex === 'Regular' ? 'selected' : ''}>Regular Flex (R)</option>
            <option value="Stiff" ${st.flex === 'Stiff' ? 'selected' : ''}>Stiff Flex (S - pod 96 mph)</option>
            <option value="X-Stiff" ${st.flex === 'X-Stiff' ? 'selected' : ''}>X-Stiff (X)</option>
            <option value="Wedge" ${st.flex === 'Wedge' ? 'selected' : ''}>Wedge Flex</option>
          </select>

          <select onchange="StoreComponent.setHand(this.value)">
            <option value="ALL" ${st.hand === 'ALL' ? 'selected' : ''}>Ręka: RH i LH</option>
            <option value="RH" ${st.hand === 'RH' ? 'selected' : ''}>Praworęczne (RH)</option>
            <option value="LH" ${st.hand === 'LH' ? 'selected' : ''}>Leworęczne (LH)</option>
          </select>

          <select onchange="StoreComponent.setSort(this.value)">
            <option value="RECOMMENDED" ${st.sortBy === 'RECOMMENDED' ? 'selected' : ''}>Sortuj: Polecane AI</option>
            <option value="PRICE_ASC" ${st.sortBy === 'PRICE_ASC' ? 'selected' : ''}>Cena: od najniższej</option>
            <option value="PRICE_DESC" ${st.sortBy === 'PRICE_DESC' ? 'selected' : ''}>Cena: od najwyższej</option>
          </select>
        </div>

        <!-- Drzewo wszystkich 12 kategorii z licznikami -->
        <div class="forum-filters" style="margin-bottom:1rem;">
          ${AppData.storeCategories.map(catObj => {
            const countInCat = catObj.id === 'ALL'
              ? AppData.storeProducts.length
              : AppData.storeProducts.filter(p => p.cat === catObj.id).length;
            return `
              <button class="filter-pill ${st.category === catObj.id ? 'active' : ''}" onclick="StoreComponent.setCategory('${catObj.id}')">
                ${catObj.icon} ${catObj.label} (${countInCat})
              </button>
            `;
          }).join('')}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; font-size:0.75rem; color:var(--text-muted);">
          <span>Wyświetlanie: <strong style="color:var(--accent);">${filtered.length}</strong> z ${AppData.storeProducts.length} produktów</span>
          ${(st.section !== 'ALL' || st.category !== 'ALL' || st.brand !== 'ALL' || st.flex !== 'ALL' || st.hand !== 'ALL' || st.search) ? `
            <button class="btn-mini-tool" onclick="StoreComponent.resetFilters()">✕ Resetuj aktywne filtry</button>
          ` : ''}
        </div>

        <div class="store-grid">
          ${productsHTML}
        </div>
      </section>
    `;
  },

  // --- LOGIKA ASYSTENTA AI SKLEPU ---
  toggleAiAssistant: () => {
    AppData.storeState.aiAssistantOpen = !AppData.storeState.aiAssistantOpen;
    app.switchTab('sklep');
  },

  askAiPrompt: (promptType) => {
    const st = AppData.storeState;
    st.section = "ALL";
    st.category = "ALL";
    st.brand = "ALL";
    st.flex = "ALL";
    st.hand = "ALL";
    st.search = "";
    st.maxPrice = 6000;

    if (promptType === "LUKA_52") {
      st.category = "WEDGE";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Dobierz kij pod moją lukę 15m z Gapping AI." },
        { sender: "TGN AI Pro Fitter", text: "Wyfiltrowałem kategorię 🎯 Wedge! Przy Twoich ironach Mizuno JPX 923 najlepszym wyborem na lukę 100–115m będzie nowy Titleist Vokey SM10 52° (z dopłatą Trade-In za 340 PLN) lub używany Cleveland RTX 6 ZipCore za 420 PLN." }
      );
    } else if (promptType === "SWING_96") {
      st.flex = "Stiff";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Pokaż kije dopasowane do mojej prędkości swingu 96 mph." },
        { sender: "TGN AI Pro Fitter", text: "Przy prędkości 96 mph optymalną kontrolę dyspersji daje shaft Stiff (S). Wyfiltrowałem wszystkie Drivery, Fairway Woody i Irony ze sztywnością Stiff!" }
      );
    } else if (promptType === "OKAZJE_CPO") {
      st.section = "USED";
      st.sortBy = "PRICE_ASC";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Pokaż najlepsze używane okazje CPO." },
        { sender: "TGN AI Pro Fitter", text: "Przełączyłem widok na dział ♻️ Używane Kije CPO posortowany od najniższej ceny! Zwróć uwagę na Hybrydę Ping G425 (690 PLN) oraz Drivera Callaway Paradym Ai Smoke w stanie Mint 9/10 (oszczędzasz 1100 PLN)." }
      );
    } else if (promptType === "LAKE_BALLS") {
      st.section = "BALLS";
      st.category = "PILKI";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Jakie piłki Lake Balls polecasz do mojego HCP 12.4?" },
        { sender: "TGN AI Pro Fitter", text: "Dla HCP 12.4 potrzebujesz piłki z uretanową powłoką dającą wysoki spin wokół greenu. Wyfiltrowałem pakiety Titleist Pro V1 (Klasa AAAA Pearl za 219 PLN / 24 szt.) oraz TaylorMade TP5!" }
      );
    } else if (promptType === "LEWORECZNE") {
      st.hand = "LH";
      st.aiChatHistory.push(
        { sender: "Ty", text: "Pokaż sprzęt dla graczy leworęcznych (LH)." },
        { sender: "TGN AI Pro Fitter", text: "Ustawiłem filtr Ręka: Leworęczne (LH). Mamy obecnie w dziale CPO świetną hybrydę Titleist TSR2 #3 (19°) LH w stanie 9/10!" }
      );
    }

    app.switchTab('sklep');
    StoreComponent.scrollAiToBottom();
  },

  sendCustomAiQuestion: () => {
    const input = document.getElementById('storeAiInput');
    if (!input || !input.value.trim()) return;
    const text = input.value.trim();
    const lower = text.toLowerCase();
    const st = AppData.storeState;

    st.aiChatHistory.push({ sender: "Ty", text: text });

    // Inteligentne rozpoznawanie intencji i automatyczne filtrowanie sklepu
    st.section = "ALL";
    st.category = "ALL";
    st.brand = "ALL";
    st.flex = "ALL";
    st.hand = "ALL";
    st.search = "";

    let reply = "";

    if (lower.includes("driver")) {
      st.category = "DRIVERY";
      reply = "Wyfiltrowałem dla Ciebie wszystkie Drivery (nowe oraz używane CPO). Przy Twoim swingu 96 mph szczególnie polecam Ping G430 Max 10K lub używanego Callaway Paradym Ai Smoke!";
    } else if (lower.includes("iron") || lower.includes("żelaz") || lower.includes("zelaz") || lower.includes("mizuno")) {
      st.category = "IRONY";
      reply = "Wyświetlam zestawy Ironów! Jeśli szukasz progresji ze swoich JPX 923 Hot Metal, spójrz na kute Mizuno Pro 245 lub używane Titleist T200 (5-PW).";
    } else if (lower.includes("putter") || lower.includes("odyssey") || lower.includes("scotty")) {
      st.category = "PUTTERY";
      reply = "Wyfiltrowałem dział Putterów. Znajdziesz tu zarówno nowego Scotty'ego Camerona Super Select Newport 2, jak i używanego Odyssey White Hot OG #7 w stanie 9.5/10.";
    } else if (lower.includes("wedge") || lower.includes("52") || lower.includes("56") || lower.includes("bunk")) {
      st.category = "WEDGE";
      reply = "Otworzyłem kategorię Wedge! Model Vokey SM10 52° idealnie zamknie lukę w Twojej torbie.";
    } else if (lower.includes("hybryd") || lower.includes("wood") || lower.includes("rescue")) {
      st.category = "HYBRYDY";
      reply = "Pokazuję dostępne Hybrydy – to najprostszy sposób na zastąpienie trudnych długich ironów 3 i 4.";
    } else if (lower.includes("piłk") || lower.includes("pilk") || lower.includes("lake") || lower.includes("pro v1")) {
      st.section = "BALLS";
      st.category = "PILKI";
      reply = "Przełączyłem sklep na dział Piłek Golfowych i pakietów Lake Balls AAAA/AAA!";
    } else if (lower.includes("torb") || lower.includes("wózek") || lower.includes("wozek")) {
      st.category = "TORBY";
      reply = "Wyfiltrowałem wodoodporne torby golfowe (Titleist StaDry) oraz 3-kołowe wózki Clicgear.";
    } else if (lower.includes("dalmierz") || lower.includes("gps") || lower.includes("bushnell")) {
      st.category = "GPS";
      reply = "Pokazuję dalmierze laserowe z kompensacją nachylenia Slope (Bushnell Tour V6 Shift).";
    } else if (lower.includes("używan") || lower.includes("uzywan") || lower.includes("cpo") || lower.includes("tani")) {
      st.section = "USED";
      reply = "Włączyłem dział ♻️ Używanych Kijów CPO z pełną oceną stanu główki, shaftu i gripu.";
    } else {
      st.search = text;
      reply = `Przeszukuję cały katalog sklepu pod kątem frazy: "${text}". Sprawdź wyniki poniżej!`;
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

  // --- LOGIKA DODAWANIA NOWEGO PRODUKTU DO SKLEPU ---
  toggleAddProduct: () => {
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
      id: Date.now(),
      section: section,
      cat: cat,
      brand: brand,
      flex: flex,
      hand: hand,
      loft: loft,
      condition: condition,
      condDetails: section === "USED" ? "Zweryfikowany przez serwis TGN CPO" : "Gwarancja producenta 24 mies.",
      tag: section === "USED" ? "NOWOŚĆ W KOMISIE CPO" : "NOWOŚĆ W SKLEPIE",
      tagGold: true,
      name: name,
      spec: spec,
      desc: desc,
      oldPrice: oldPrice,
      price: price,
      tradeInPrice: Math.max(150, Math.round(price * 0.45)),
      stock: 3,
      imgUrl: finalImgUrl
    };

    AppData.storeProducts.unshift(newProduct);

    // Zapisz dodane produkty w localStorage
    try {
      const prevCustom = JSON.parse(localStorage.getItem('tgn_custom_store_products') || '[]');
      prevCustom.unshift(newProduct);
      localStorage.setItem('tgn_custom_store_products', JSON.stringify(prevCustom));
    } catch (e) {}

    AppData.storeState.addProductOpen = false;
    AppData.storeState.section = "ALL";
    AppData.storeState.category = "ALL";
    app.switchTab('sklep');
    app.showToast(`✓ Dodano nowy produkt do sklepu: ${name}`);
  },

  // --- FILTRY I KOSZYK ---
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
      maxPrice: 6000,
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
