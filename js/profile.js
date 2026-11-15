const ProfileAndBagComponent = {
  render: () => {
    const leftPanel = `
      <section class="panel-3d panel-left">
        <h2>
          <span>PROFIL GRACZA: ${AppData.user.name.toUpperCase()}</span>
          <span style="font-size:1.1rem;">🇵🇱</span>
        </h2>
        
        <div class="profile-layout">
          <div class="golfer-3d-figure">
            <img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=500&q=80" alt="Golfer 3D Avatar">
            <div class="golfer-tag">HCP ${AppData.user.hcp}</div>
          </div>

          <div class="profile-stats-col">
            <div class="stat-card">
              <span>Handicap Index:</span>
              <strong style="color:var(--accent);">${AppData.user.hcp}</strong>
            </div>
            <div class="stat-card">
              <span>Poziom:</span>
              <strong>${AppData.user.level}</strong>
            </div>
            <div class="stat-card">
              <span>Lokalizacja:</span>
              <strong>${AppData.user.city}</strong>
            </div>
            <div class="stat-card">
              <span>Ostatnia Runda:</span>
              <strong>${AppData.user.lastRound}</strong>
            </div>

            <div class="stat-card" style="flex-direction: column; align-items: flex-start;">
              <div style="display:flex; justify-content:space-between; width:100%;">
                <span>Średnia Prędkość Swingu:</span>
                <strong style="color:var(--accent);">${AppData.user.swingSpeed}</strong>
              </div>
              <div class="mini-chart">
                <svg viewBox="0 0 100 30" width="100%" height="100%" preserveAspectRatio="none">
                  <path class="chart-line" d="M0,26 L18,22 L35,24 L52,9 L70,17 L86,12 L100,7 L100,30 L0,30 Z" stroke-width="2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="stat-card" style="border-color: var(--gold); background: rgba(250, 204, 21, 0.07); cursor:pointer; margin-top: 0.45rem;" onclick="app.openAiModal()">
          <div>
            <span style="color: var(--gold); font-weight: 800; display:block; font-size:0.78rem;">⚠️ Gapping AI: Sprawdź Gap Wedge (52°)</span>
            <p style="font-size: 0.68rem; color: var(--text-muted); margin-top:2px;">Wykryto lukę dystansową 15m. Kliknij po rekomendację 2026.</p>
          </div>
          <button class="btn-action" style="width: auto; padding: 0.35rem 0.7rem; margin:0; border-color:var(--gold); color:var(--gold); white-space:nowrap;">Analizuj</button>
        </div>
      </section>
    `;

    let clubsHTML = AppData.bag.map(c => {
      const imgId = `bag_club_img_${c.id}`;
      const visualSrc = ClubImageEngine.getClubVisualUrl(c.name, c.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(c.name);
      const safeName = c.name.replace(/'/g, "");

      return `
        <div class="club-hud-card">
          <div class="club-photo-frame" onclick="app.openPhotoZoom('${safeName}', document.getElementById('${imgId}').src, '${c.loft} • Wartość: ${c.val}')">
            <img id="${imgId}" src="${visualSrc}" alt="${c.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
            <span class="live-photo-badge">WEB FOTO</span>
            <span class="cond-badge">${c.cond}</span>
          </div>
          <div style="min-width:0;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
              <h3 style="font-size: 0.82rem; color: var(--accent); font-weight:800;">${c.name}</h3>
              <span style="font-size: 0.72rem; color: var(--gold); font-weight:800;">${c.val}</span>
            </div>
            <p style="font-size: 0.68rem; color: var(--text-muted); margin-top:2px;">${c.loft}</p>

            <div class="club-visual-tools">
              <button class="btn-mini-tool" onclick="app.nextWebSearchPhoto('${imgId}', '${safeName}')">📷 Inne zdjęcie z sieci</button>
              <button class="btn-mini-tool" onclick="app.openGoogleImages('${safeName}')">🔎 Pełna Google Grafika ↗</button>
            </div>
            
            <div class="club-metrics-grid">
              <div><span>Prędkość</span><strong>${c.speed}</strong></div>
              <div><span>Smash</span><strong>${c.smash}</strong></div>
              <div><span>Natarcie</span><strong>${c.attack}</strong></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const defaultNewClubPreview = ClubImageEngine.buildDirectSearchPhotoUrl("Ping G430 Max Driver", 0);

    const rightPanel = `
      <section class="panel-3d panel-right">
        <h2>
          <span>MOJA TORBA: CYFROWA KOPIA (${AppData.bag.length}/14)</span>
          <button class="btn-action" style="width:auto; margin:0; padding:0.28rem 0.65rem; font-size:0.68rem;" onclick="app.toggleAddClubLive()">+ Dodaj kij (Auto-Foto z sieci)</button>
        </h2>

        <div id="addClubLiveBox" class="add-club-live-box">
          <h3 style="font-size:0.78rem; color:var(--accent); margin-bottom:0.5rem;">🔎 Wpisz model kija – prawdziwe zdjęcie pobierze się automatycznie z wyszukiwarki!</h3>
          
          <div class="live-preview-row">
            <div class="club-photo-frame" style="width:80px !important; height:80px !important;">
              <img id="livePreviewClubImg" src="${defaultNewClubPreview}" alt="Podgląd">
              <span class="live-photo-badge">NA ŻYWO</span>
            </div>
            <div>
              <input type="text" id="newClubName" placeholder="np. PING G430 MAX DRIVER lub CALLAWAY PARADYM" oninput="app.updateLiveClubPreview(this.value)" style="width:100%; background:rgba(255,255,255,0.08); border:1px solid var(--accent); border-radius:6px; padding:0.45rem; color:#fff; font-size:0.78rem; margin-bottom:0.35rem;">
              <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                <button class="btn-mini-tool" onclick="app.updateLiveClubPreview(document.getElementById('newClubName').value || 'Ping G430 Max Driver', true)">📷 Następne zdjęcie z sieci</button>
                <button class="btn-mini-tool" onclick="app.openGoogleImages(document.getElementById('newClubName').value || 'Ping G430 Max Driver')">🔎 Google Grafika ↗</button>
              </div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-bottom:0.5rem;">
            <input type="text" id="newClubSpec" placeholder="Specyfikacja (np. 9°, Stiff)" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.75rem;">
            <input type="text" id="newClubVal" placeholder="Wartość (np. 2 100 PLN)" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.5rem; color:#fff; font-size:0.75rem;">
          </div>
          <div class="form-group" style="margin-bottom:0.5rem;">
            <input type="text" id="newClubCustomImg" placeholder="(Opcjonalnie) Wklej bezpośredni link do własnego zdjęcia">
          </div>
          <button class="btn-primary" style="padding:0.5rem;" onclick="app.addClubWithLivePhoto()">Dodaj kij z tym zdjęciem do torby</button>
        </div>

        ${clubsHTML}

        <div style="background: rgba(0,0,0,0.38); padding: 0.85rem; border-radius: 12px; margin-top: 0.7rem; border: 1px solid rgba(255,255,255,0.08);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span style="font-size: 0.7rem; color: var(--text-muted); text-transform:uppercase;">Całkowita wartość torby</span>
            <strong style="font-size: 1.2rem; color: var(--accent);">14 200 PLN</strong>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
            <button class="btn-action" style="margin:0;" onclick="app.switchTab('marketplace')">🤝 Marketplace C2C</button>
            <button class="btn-action" style="margin:0; background: rgba(250,204,21,0.12); border-color: var(--gold); color: var(--gold);" onclick="app.switchTab('cpo')">⚡ Skup TGN CPO</button>
          </div>
          <button class="btn-action" style="margin-top:0.45rem;" onclick="app.switchTab('sklep')">🔄 TRADE-IN NA NOWY MODEL 2026</button>
        </div>
      </section>
    `;

    return leftPanel + rightPanel;
  }
};
