const StoreComponent = {
  render: () => {
    const filtered = AppData.activeStoreFilter === "ALL"
      ? AppData.storeProducts
      : AppData.storeProducts.filter(p => p.cat === AppData.activeStoreFilter);

    const totalCart = AppData.cart.reduce((sum, item) => sum + item.price, 0);

    const cartBarHTML = AppData.cart.length > 0 ? `
      <div class="cart-summary-bar">
        <div>
          <strong style="color:var(--accent); font-size:0.85rem;">🛒 Twój Koszyk TGN (${AppData.cart.length} szt.)</strong>
          <p style="font-size:0.72rem; color:var(--text-muted);">${AppData.cart.map(i => i.name).join(', ')}</p>
        </div>
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <strong style="font-size:1rem; color:var(--gold);">${totalCart} PLN</strong>
          <button class="btn-primary" style="width:auto; margin:0; padding:0.45rem 0.9rem;" onclick="app.checkoutStore()">Zamów</button>
        </div>
      </div>
    ` : '';

    let productsHTML = filtered.map(prod => {
      const imgId = `store_prod_img_${prod.id}`;
      const visualSrc = ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(prod.name);
      const safeName = prod.name.replace(/'/g, "");
      return `
        <div class="store-card">
          <div>
            <div class="store-img-box" onclick="app.openPhotoZoom('${safeName}', document.getElementById('${imgId}').src, '${prod.spec} • Cena: ${prod.price} PLN')">
              <img id="${imgId}" src="${visualSrc}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
              <span class="store-tag ${prod.tagGold ? 'gold' : ''}">${prod.tag}</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
              <h3 style="font-size: 0.9rem; color: var(--text-main);">${prod.name}</h3>
            </div>
            <p style="font-size: 0.7rem; color: var(--accent); font-weight: 600; margin-bottom: 0.35rem;">${prod.spec}</p>
            <p style="font-size: 0.72rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.5rem;">${prod.desc}</p>
            <div style="display:flex; gap:0.4rem; margin-bottom:0.55rem;">
              <button class="btn-mini-tool" onclick="app.nextWebSearchPhoto('${imgId}', '${safeName}')">📷 Inne zdjęcie</button>
              <button class="btn-mini-tool" onclick="app.openGoogleImages('${safeName}')">🔎 Google Grafika ↗</button>
            </div>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.6rem;">
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.2rem;">
              <span style="font-size:0.7rem; color:var(--text-muted);">Cena katalogowa:</span>
              <strong style="font-size:0.98rem; color:var(--text-main);">${prod.price} PLN</strong>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.5rem;">
              <span style="font-size:0.68rem; color:var(--gold);">Z dopłatą Trade-In:</span>
              <strong style="font-size:0.85rem; color:var(--gold);">od ${prod.tradeInPrice} PLN</strong>
            </div>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.4rem;">
              <button class="btn-action" style="margin:0; padding:0.45rem;" onclick="app.addToCart(${prod.id}, false)">🛒 Koszyk</button>
              <button class="btn-action" style="margin:0; padding:0.45rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.1);" onclick="app.addToCart(${prod.id}, true)">🔄 Trade-In</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <h2>
          <span>🛍️ Oficjalny Sklep TGN – Kolekcja 2026</span>
          <span style="font-size:0.72rem; color:var(--gold);">Budżet Trade-In: 14 200 PLN</span>
        </h2>

        <div class="store-banner">
          <div>
            <h3 style="font-size: 0.88rem; color: var(--accent); margin-bottom: 0.2rem;">🎯 Dobór pod Twoje parametry: HCP ${AppData.user.hcp} | Swing ${AppData.user.swingSpeed}</h3>
            <p style="font-size: 0.74rem; color: var(--text-muted);">Każdy kij zawiera darmowy Custom Fitting na symulatorze TrackMan.</p>
          </div>
          <button class="btn-action" style="width:auto; margin:0; padding:0.45rem 0.85rem;" onclick="app.switchTab('wydarzenia')">📅 Demo Days 2027</button>
        </div>

        ${cartBarHTML}

        <div class="forum-filters">
          <button class="filter-pill ${AppData.activeStoreFilter === 'ALL' ? 'active' : ''}" onclick="app.filterStore('ALL')">Wszystkie (6)</button>
          <button class="filter-pill ${AppData.activeStoreFilter === 'DRIVERY' ? 'active' : ''}" onclick="app.filterStore('DRIVERY')">🏌️ Drivery</button>
          <button class="filter-pill ${AppData.activeStoreFilter === 'IRONY' ? 'active' : ''}" onclick="app.filterStore('IRONY')">⚙️ Irony</button>
          <button class="filter-pill ${AppData.activeStoreFilter === 'WEDGE' ? 'active' : ''}" onclick="app.filterStore('WEDGE')">🎯 Wedge 52°</button>
          <button class="filter-pill ${AppData.activeStoreFilter === 'AKCESORIA' ? 'active' : ''}" onclick="app.filterStore('AKCESORIA')">⚪ Puttery & Inne</button>
        </div>

        <div class="store-grid">
          ${productsHTML}
        </div>
      </section>
    `;
  }
};
