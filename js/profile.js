/* =========================================================================
   MODUŁ PROFILU I CYFROWEJ TORBY 3D (TGN SPATIAL HUD v33.0)
   - Design zbliżony do wizualizacji 3D HUD (ciemne szkło, neonowe akcenty, wykresy)
   - Pełny kreator dodawania i usuwania posiadanego sprzętu z zapisem w localStorage
   - Możliwość wgrania własnego zdjęcia profilowego
   ========================================================================= */

(function injectProfileV33Styles() {
  ['tgnProfileV32Styles', 'tgnProfileV33Styles'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  const style = document.createElement('style');
  style.id = 'tgnProfileV33Styles';
  style.textContent = `
    /* Lewy Panel: Profil Gracza HUD */
    .hud-profile-grid {
      display: grid;
      grid-template-columns: 165px 1fr;
      gap: 1.15rem;
      align-items: stretch;
      margin-bottom: 1rem;
    }
    .hud-avatar-box {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      border: 1.5px solid rgba(56, 189, 248, 0.5);
      background: radial-gradient(circle at 50% 25%, rgba(20, 48, 60, 0.9), rgba(5, 12, 16, 0.98));
      min-height: 280px;
      box-shadow: 0 14px 32px rgba(0, 0, 0, 0.65), inset 0 0 22px rgba(56, 189, 248, 0.15);
    }
    .hud-avatar-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .hud-avatar-upload-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(6, 16, 22, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.5);
      color: #e2e8f0;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.78rem;
      transition: 0.2s;
    }
    .hud-avatar-upload-btn:hover { background: var(--blue); color: #041e2b; }

    .hud-avatar-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(0deg, rgba(4, 12, 16, 0.96) 28%, transparent 100%);
      padding: 1.3rem 0.5rem 0.55rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .hud-hcp-pill {
      background: rgba(74, 222, 128, 0.18);
      border: 1px solid var(--accent);
      color: var(--accent);
      font-size: 0.64rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 20px;
    }
    .hud-ai-bot-badge {
      background: rgba(56, 189, 248, 0.2);
      border: 1px solid var(--blue);
      color: #fff;
      font-size: 0.7rem;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 0 10px rgba(56, 189, 248, 0.45);
    }

    .hud-stat-list {
      display: flex;
      flex-direction: column;
      gap: 0.42rem;
    }
    .hud-stat-row {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9px;
      padding: 0.5rem 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.76rem;
    }
    .hud-stat-row span { color: var(--text-muted); }
    .hud-stat-row strong { color: #f8fafc; font-weight: 700; text-align: right; }

    .hud-swing-box {
      background: rgba(6, 18, 24, 0.8);
      border: 1px solid rgba(56, 189, 248, 0.35);
      border-radius: 10px;
      padding: 0.58rem 0.8rem;
      margin-top: 0.15rem;
    }
    .hud-swing-chart {
      width: 100%;
      height: 48px;
      margin-top: 0.3rem;
      display: block;
    }

    .hud-gapping-alert {
      background: linear-gradient(135deg, rgba(250, 204, 21, 0.12), rgba(10, 20, 24, 0.94));
      border: 1px solid rgba(250, 204, 21, 0.55);
      border-radius: 12px;
      padding: 0.8rem 0.95rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.7rem;
      box-shadow: inset 0 0 18px rgba(250, 204, 21, 0.08);
    }

    /* Kreator dodawania posiadanego sprzętu */
    .hud-add-equip-box {
      display: none;
      background: linear-gradient(155deg, rgba(10, 26, 32, 0.98), rgba(5, 14, 18, 0.98));
      border: 1.5px solid var(--accent);
      border-radius: 14px;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7);
    }
    .hud-add-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.55rem;
      margin-bottom: 0.65rem;
    }
    .hud-add-grid label {
      display: block;
      font-size: 0.62rem;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .hud-add-grid input,
    .hud-add-grid select {
      width: 100%;
      background: rgba(255, 255, 255, 0.07);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 7px;
      padding: 0.45rem 0.6rem;
      color: #fff;
      font-size: 0.76rem;
      outline: none;
    }
    .hud-add-grid select option { background: #08151a; color: #fff; }
    .hud-add-grid input:focus,
    .hud-add-grid select:focus { border-color: var(--accent); }

    /* Prawy Panel: Karta Kija HUD (Ciemne szkło jak na wizualizacji) */
    .hud-club-card {
      background: linear-gradient(145deg, rgba(14, 28, 36, 0.9), rgba(6, 14, 18, 0.95));
      border: 1px solid rgba(56, 189, 248, 0.22);
      border-radius: 14px;
      padding: 0.85rem;
      margin-bottom: 0.75rem;
      display: grid;
      grid-template-columns: 88px 1fr;
      gap: 0.85rem;
      align-items: center;
      transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
    }
    .hud-club-card:hover {
      border-color: rgba(56, 189, 248, 0.65);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), inset 0 0 15px rgba(56, 189, 248, 0.08);
      transform: translateY(-2px);
    }
    .hud-club-thumb {
      width: 88px;
      height: 88px;
      border-radius: 12px;
      background: radial-gradient(circle at center, rgba(30, 58, 72, 0.85) 0%, rgba(8, 18, 24, 0.98) 100%);
      border: 1.5px solid rgba(56, 189, 248, 0.45);
      position: relative;
      overflow: hidden;
      cursor: zoom-in;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 0 14px rgba(56, 189, 248, 0.18);
    }
    .hud-club-thumb img {
      width: 86%;
      height: 86%;
      object-fit: contain;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.92);
      padding: 3px;
    }
    .hud-thumb-actions {
      position: absolute;
      bottom: 3px;
      right: 3px;
      display: flex;
      gap: 2px;
    }
    .hud-icon-btn {
      background: rgba(6, 16, 22, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.22);
      color: #e2e8f0;
      font-size: 0.56rem;
      width: 19px;
      height: 19px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hud-icon-btn:hover { border-color: var(--accent); color: var(--accent); }

    .hud-club-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.4rem;
      margin-bottom: 0.15rem;
    }
    .hud-club-title {
      font-size: 0.84rem;
      font-weight: 800;
      color: #f8fafc;
      letter-spacing: 0.3px;
    }
    .hud-club-top-right {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      flex-shrink: 0;
    }
    .hud-club-price {
      font-size: 0.82rem;
      font-weight: 800;
      color: var(--gold);
      white-space: nowrap;
    }
    .hud-mini-action {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-muted);
      font-size: 0.62rem;
      width: 22px;
      height: 22px;
      border-radius: 5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .hud-mini-action:hover { border-color: var(--gold); color: var(--gold); }
    .hud-mini-action.del:hover { border-color: #f87171; color: #f87171; }

    .hud-club-spec {
      font-size: 0.68rem;
      color: #94a3b8;
      margin-bottom: 0.42rem;
    }

    /* Pasek stanu (Condition Bar) */
    .hud-cond-row {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      margin-bottom: 0.48rem;
      font-size: 0.64rem;
    }
    .hud-cond-bar-bg {
      flex: 1;
      height: 5px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }
    .hud-cond-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--blue), var(--accent));
      border-radius: 4px;
    }

    /* Mini-wykresy telemetrii (3 kolumny z okrągłym Gauge) */
    .hud-telemetry-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.38rem;
    }
    .hud-tele-cell {
      background: rgba(4, 12, 16, 0.72);
      border: 1px solid rgba(56, 189, 248, 0.14);
      border-radius: 7px;
      padding: 0.3rem 0.4rem;
      text-align: center;
    }
    .hud-tele-cell span {
      display: block;
      font-size: 0.54rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    .hud-tele-cell strong {
      display: block;
      font-size: 0.72rem;
      color: var(--accent);
      font-weight: 800;
      margin: 1px 0 2px;
    }
    .hud-sparkline {
      width: 100%;
      height: 14px;
      display: block;
    }

    /* Dolny panel wartości torby i akcji */
    .hud-bag-footer {
      background: rgba(4, 12, 16, 0.78);
      border: 1px solid rgba(114, 214, 150, 0.32);
      border-radius: 14px;
      padding: 0.9rem 1rem;
      margin-top: 0.85rem;
    }
    .hud-bag-total-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.7rem;
    }
    .hud-bag-actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
    .hud-btn-tradein {
      background: rgba(250, 204, 21, 0.12);
      border: 1.5px solid var(--gold);
      color: var(--gold);
      border-radius: 9px;
      padding: 0.55rem 0.55rem;
      font-size: 0.72rem;
      font-weight: 800;
      cursor: pointer;
      transition: 0.2s;
      text-transform: uppercase;
    }
    .hud-btn-tradein:hover { background: var(--gold); color: #052e16; }

    .hud-btn-cpo {
      background: rgba(74, 222, 128, 0.14);
      border: 1.5px solid var(--accent);
      color: var(--accent);
      border-radius: 9px;
      padding: 0.55rem 0.55rem;
      font-size: 0.72rem;
      font-weight: 800;
      cursor: pointer;
      transition: 0.2s;
      text-transform: uppercase;
    }
    .hud-btn-cpo:hover { background: var(--accent); color: #052e16; }

    @media (max-width: 768px) {
      .hud-profile-grid {
        grid-template-columns: 104px 1fr;
        gap: 0.65rem;
      }
      .hud-avatar-box { min-height: 220px; }
      .hud-stat-row { padding: 0.42rem 0.55rem; font-size: 0.7rem; }
      .hud-add-grid { grid-template-columns: 1fr; }
      .hud-club-card { grid-template-columns: 74px 1fr; gap: 0.6rem; padding: 0.65rem; }
      .hud-club-thumb { width: 74px; height: 74px; }
      .hud-club-title { font-size: 0.76rem; }
      .hud-club-price { font-size: 0.74rem; }
      .hud-bag-actions-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
})();

const ProfileAndBagComponent = {
  initSavedBag: () => {
    try {
      const savedBag = localStorage.getItem('tgn_user_bag_v33');
      if (savedBag) {
        const parsed = JSON.parse(savedBag);
        if (Array.isArray(parsed) && parsed.length > 0) {
          AppData.bag = parsed;
        }
      }
    } catch (e) {}
  },

  saveBag: () => {
    try {
      localStorage.setItem('tgn_user_bag_v33', JSON.stringify(AppData.bag || []));
    } catch (e) {}
  },

  getCondPercent: (condStr) => {
    const s = String(condStr || '9/10').toLowerCase();
    if (s.includes('mint') || s.includes('nowy') || s.includes('10/10')) return 100;
    const match = s.match(/(\d+(\.\d+)?)/);
    if (match) {
      const num = parseFloat(match[1]);
      if (num <= 10) return Math.min(100, Math.round(num * 10));
    }
    return 88;
  },

  handleAvatarUpload: (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        localStorage.setItem('tgn_user_avatar', e.target.result);
        app.switchTab('profile');
        app.showToast('✓ Zaktualizowano zdjęcie profilowe!');
      } catch (err) {
        app.showToast('⚠️ Zdjęcie jest za duże dla pamięci przeglądarki.');
      }
    };
    reader.readAsDataURL(file);
  },

  toggleAddEquipForm: () => {
    const box = document.getElementById('hudAddEquipBox');
    if (box) {
      box.style.display = box.style.display === 'block' ? 'none' : 'block';
    }
  },

  saveOwnedEquipment: () => {
    const type = document.getElementById('eqType')?.value || 'KIJ';
    const model = document.getElementById('eqModel')?.value.trim();
    const spec = document.getElementById('eqSpec')?.value.trim() || 'Standard Custom Fit';
    const condVal = document.getElementById('eqCond')?.value || '9';
    const priceRaw = document.getElementById('eqPrice')?.value.trim() || '1500';
    const speed = document.getElementById('eqSpeed')?.value.trim() || '132 mph';
    const smash = document.getElementById('eqSmash')?.value.trim() || '1.42';
    const attack = document.getElementById('eqAttack')?.value.trim() || '+1.5°';
    const customImg = document.getElementById('eqCustomImg')?.value.trim() || '';

    if (!model) {
      app.showToast('⚠️ Wpisz markę i model sprzętu (np. Titleist Vokey SM10)!');
      return;
    }

    const fullName = `${type}: ${model.toUpperCase()}`;
    const priceNum = parseInt(priceRaw.replace(/\D/g, ''), 10) || 1200;
    const formattedPrice = priceNum.toLocaleString('pl-PL') + ' PLN';
    const condLabel = condVal === '10' ? '10/10 (Mint)' : `${condVal}/10`;
    const finalImg = customImg || (typeof ClubImageEngine !== 'undefined'
      ? ClubImageEngine.buildDirectSearchPhotoUrl(model, ClubImageEngine.searchVariantIndex)
      : '');

    AppData.bag.unshift({
      id: Date.now(),
      name: fullName,
      loft: spec,
      val: formattedPrice,
      cpoOffer: Math.round(priceNum * 0.72).toLocaleString('pl-PL') + ' PLN',
      speed,
      smash,
      attack,
      cond: condLabel,
      imgUrl: finalImg
    });

    ProfileAndBagComponent.saveBag();
    app.switchTab('profile');
    app.showToast(`✓ Dodano do Twojej torby: ${fullName}`);
  },

  removeClub: (clubId) => {
    AppData.bag = (AppData.bag || []).filter(c => c.id !== clubId);
    ProfileAndBagComponent.saveBag();
    app.switchTab('profile');
    app.showToast('🗑️ Usunięto sprzęt z cyfrowej torby.');
  },

  render: () => {
    ProfileAndBagComponent.initSavedBag();
    const u = AppData.user || window.DefaultUser;
    const bag = AppData.bag || [];

    const totalValNum = bag.reduce((sum, club) => {
      const numeric = parseInt(String(club.val || '0').replace(/\D/g, ''), 10) || 0;
      return sum + numeric;
    }, 0);
    const totalValFormatted = totalValNum > 0 ? totalValNum.toLocaleString('pl-PL') + ' PLN' : '0 PLN';

    // Portret golfisty (lub wgrane własne zdjęcie z localStorage)
    const savedAvatar = localStorage.getItem('tgn_user_avatar');
    const avatarUrl = savedAvatar || "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=500&q=80";

    const defaultPreviewImg = (typeof ClubImageEngine !== 'undefined')
      ? ClubImageEngine.buildDirectSearchPhotoUrl("Ping G430 Max Driver", 0)
      : "";

    const clubsHTML = bag.length === 0 ? `
      <div style="text-align:center; padding:2rem 1rem; border:1px dashed rgba(255,255,255,0.18); border-radius:12px; color:var(--text-muted); font-size:0.8rem;">
        Twoja torba jest pusta. Kliknij <strong>+ Dodaj posiadany sprzęt</strong>, aby dodać swoje kije.
      </div>
    ` : bag.map((club, idx) => {
      const imgId = `bag_club_img_${club.id}`;
      const visualSrc = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getClubVisualUrl(club.name, club.imgUrl)
        : '';
      const fallbackSrc = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getFallbackPhoto(club.name)
        : '';
      const safeName = (club.name || '').replace(/'/g, "");
      const condPct = ProfileAndBagComponent.getCondPercent(club.cond);

      const spark1 = idx % 2 === 0
        ? "M0,12 Q15,10 28,6 T60,3"
        : "M0,10 Q20,4 38,8 T60,4";
      const spark2 = "M0,11 L20,8 L40,5 L60,3";

      return `
        <div class="hud-club-card">
          <div class="hud-club-thumb" onclick="app.openPhotoZoom('${safeName}', document.getElementById('${imgId}').src, '${club.loft} • Wartość: ${club.val}')">
            <img id="${imgId}" src="${visualSrc}" alt="${club.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
            <div class="hud-thumb-actions" onclick="event.stopPropagation()">
              <button type="button" class="hud-icon-btn" title="Inne zdjęcie z sieci" onclick="app.nextWebSearchPhoto('${imgId}', '${safeName}')">🔄</button>
              <button type="button" class="hud-icon-btn" title="Google Grafika" onclick="app.openGoogleImages('${safeName}')">🔎</button>
            </div>
          </div>

          <div style="min-width:0;">
            <div class="hud-club-top">
              <div class="hud-club-title">${club.name}</div>
              <div class="hud-club-top-right">
                <div class="hud-club-price">${club.val}</div>
                <button type="button" class="hud-mini-action" title="Wyceń w skupie CPO" onclick="app.switchTab('cpo')">⚡</button>
                <button type="button" class="hud-mini-action del" title="Usuń z torby" onclick="ProfileAndBagComponent.removeClub(${club.id})">✕</button>
              </div>
            </div>
            <div class="hud-club-spec">${club.loft}</div>

            <div class="hud-cond-row">
              <span style="color:var(--text-muted);">Stan:</span>
              <div class="hud-cond-bar-bg">
                <div class="hud-cond-bar-fill" style="width:${condPct}%;"></div>
              </div>
              <strong style="color:var(--accent);">${club.cond}</strong>
            </div>

            <div class="hud-telemetry-strip">
              <div class="hud-tele-cell">
                <span>Prędkość piłki</span>
                <strong>${club.speed}</strong>
                <svg class="hud-sparkline" viewBox="0 0 60 14" preserveAspectRatio="none">
                  <path d="${spark1}" fill="none" stroke="#38bdf8" stroke-width="1.6"/>
                </svg>
              </div>
              <div class="hud-tele-cell">
                <span>Smash Factor</span>
                <strong style="color:#38bdf8;">${club.smash}</strong>
                <svg class="hud-sparkline" viewBox="0 0 60 14" preserveAspectRatio="none">
                  <path d="${spark2}" fill="none" stroke="#4ade80" stroke-width="1.6"/>
                </svg>
              </div>
              <div class="hud-tele-cell">
                <span>Kąt natarcia</span>
                <strong style="color:var(--gold);">${club.attack}</strong>
                <!-- Okrągły wskaźnik (Gauge) w stylu HUD -->
                <svg class="hud-sparkline" viewBox="0 0 60 14">
                  <path d="M18,13 A12,12 0 0,1 42,13" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2.5" stroke-linecap="round"/>
                  <path d="M18,13 A12,12 0 0,1 38,6" fill="none" stroke="#facc15" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <!-- LEWY PANEL 3D: PROFIL GRACZA -->
      <section class="panel-3d panel-left">
        <h2>
          <span>PROFIL GRACZA: ${u.name.toUpperCase()}</span>
          <span style="font-size:1.15rem;">🇵🇱</span>
        </h2>

        <div class="hud-profile-grid">
          <div class="hud-avatar-box">
            <img src="${avatarUrl}" alt="${u.name}">
            <label class="hud-avatar-upload-btn" title="Wgraj własne zdjęcie profilowe">
              📷
              <input type="file" accept="image/*" style="display:none;" onchange="ProfileAndBagComponent.handleAvatarUpload(event)">
            </label>
            <div class="hud-avatar-overlay">
              <span class="hud-hcp-pill">HCP ${u.hcp}</span>
              <span class="hud-ai-bot-badge" title="Asystent Gapping AI" onclick="app.openAiModal()">🤖</span>
            </div>
          </div>

          <div class="hud-stat-list">
            <div class="hud-stat-row">
              <span>Handicap Index</span>
              <strong style="color:var(--accent);">${u.hcp}</strong>
            </div>
            <div class="hud-stat-row">
              <span>Poziom</span>
              <strong>${u.level}</strong>
            </div>
            <div class="hud-stat-row">
              <span>Lokalizacja</span>
              <strong>${u.city}</strong>
            </div>
            <div class="hud-stat-row">
              <span>Ostatnia Runda</span>
              <strong>${u.lastRound}</strong>
            </div>

            <div class="hud-swing-box">
              <div style="display:flex; justify-content:space-between; font-size:0.72rem;">
                <span style="color:var(--text-muted);">Średnia Prędkość Swingu</span>
                <strong style="color:#38bdf8;">${u.swingSpeed}</strong>
              </div>
              <svg class="hud-swing-chart" viewBox="0 0 220 48" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="swingGrad33" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4"/>
                    <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.02"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="16" x2="220" y2="16" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3"/>
                <line x1="0" y1="34" x2="220" y2="34" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3"/>
                <path d="M0,40 L35,34 L75,26 L115,29 L155,12 L190,18 L220,10 L220,48 L0,48 Z" fill="url(#swingGrad33)"/>
                <polyline points="0,40 35,34 75,26 115,29 155,12 190,18 220,10" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
                <circle cx="155" cy="12" r="3" fill="#4ade80"/>
                <circle cx="220" cy="10" r="3" fill="#4ade80"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="hud-gapping-alert">
          <div>
            <strong style="color:var(--gold); font-size:0.8rem; display:block; margin-bottom:2px;">
              ⚠️ Gapping AI: Sprawdź Gap Wedge (52°)
            </strong>
            <span style="font-size:0.7rem; color:var(--text-muted); line-height:1.35; display:block;">
              Wykryto lukę dystansową 15m między PW a SW. Zobacz kalkulację upgrade'u 2026.
            </span>
          </div>
          <button type="button" class="btn-action" style="width:auto; margin:0; padding:0.45rem 0.9rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.12);" onclick="app.openAiModal()">
            Analizuj
          </button>
        </div>
      </section>

      <!-- PRAWY PANEL 3D: CYFROWA TORBA -->
      <section class="panel-3d panel-right">
        <h2>
          <span>MOJA TORBA: CYFROWA KOPIA (${bag.length}/14 KIJÓW)</span>
          <button type="button" class="btn-primary" style="width:auto; margin:0; padding:0.38rem 0.85rem; font-size:0.72rem;" onclick="ProfileAndBagComponent.toggleAddEquipForm()">
            + Dodaj posiadany sprzęt
          </button>
        </h2>

        <!-- Kreator dodawania posiadanego sprzętu -->
        <div id="hudAddEquipBox" class="hud-add-equip-box">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.7rem;">
            <strong style="color:var(--accent); font-size:0.82rem; text-transform:uppercase;">➕ Dodaj sprzęt do swojej cyfrowej torby</strong>
            <button type="button" class="btn-mini-tool" onclick="ProfileAndBagComponent.toggleAddEquipForm()">✕</button>
          </div>

          <div class="live-preview-row" style="margin-bottom:0.7rem;">
            <div class="hud-club-thumb" style="width:76px; height:76px;">
              <img id="livePreviewClubImg" src="${defaultPreviewImg}" alt="Podgląd">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.4rem;">
              <input type="text" id="eqModel" placeholder="Marka i Model (np. Titleist Vokey SM10, Ping G430) *" oninput="app.updateLiveClubPreview(this.value)" style="background:rgba(255,255,255,0.08); border:1px solid var(--accent); border-radius:7px; padding:0.48rem 0.65rem; color:#fff; font-size:0.78rem;">
              <input type="text" id="eqCustomImg" placeholder="(Opcjonalnie) Własny link URL do zdjęcia..." style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.14); border-radius:7px; padding:0.38rem 0.65rem; color:#fff; font-size:0.7rem;">
            </div>
          </div>

          <div class="hud-add-grid">
            <div>
              <label>Typ sprzętu</label>
              <select id="eqType">
                <option value="DRIVER">Driver</option>
                <option value="WOOD">Fairway Wood</option>
                <option value="HYBRYDA">Hybryda</option>
                <option value="IRON">Iron / Zestaw Ironów</option>
                <option value="WEDGE">Wedge</option>
                <option value="PUTTER">Putter</option>
                <option value="GPS">Dalmierz / Zegarek GPS</option>
                <option value="TORBA">Torba / Wózek</option>
              </select>
            </div>
            <div>
              <label>Specyfikacja (Loft / Shaft / Flex)</label>
              <input type="text" id="eqSpec" placeholder="np. 52°/12F, Stiff (S)">
            </div>
            <div>
              <label>Stan sprzętu (1–10): <span id="eqCondLabel" style="color:var(--accent); font-weight:800;">9/10</span></label>
              <input type="range" id="eqCond" min="5" max="10" step="0.5" value="9" oninput="document.getElementById('eqCondLabel').textContent = this.value + '/10'" style="padding:0.2rem 0; accent-color:var(--accent);">
            </div>
            <div>
              <label>Szacowana wartość (PLN)</label>
              <input type="number" id="eqPrice" value="1500" placeholder="np. 1500">
            </div>
            <div>
              <label>Prędkość piłki (opcjonalnie)</label>
              <input type="text" id="eqSpeed" value="132 mph">
            </div>
            <div>
              <label>Smash / Natarcie (opcjonalnie)</label>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.35rem;">
                <input type="text" id="eqSmash" value="1.42" placeholder="Smash">
                <input type="text" id="eqAttack" value="+1.5°" placeholder="Kąt">
              </div>
            </div>
          </div>

          <button type="button" class="btn-primary" style="margin:0; padding:0.55rem;" onclick="ProfileAndBagComponent.saveOwnedEquipment()">
            ✓ Zapisz sprzęt w mojej torbie 3D
          </button>
        </div>

        ${clubsHTML}

        <!-- Dolna sekcja wartości torby i przycisków Trade-In / CPO -->
        <div class="hud-bag-footer">
          <div class="hud-bag-total-row">
            <span style="font-size:0.74rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.6px;">Całkowita wartość torby</span>
            <strong style="font-size:1.25rem; color:var(--accent);">${totalValFormatted}</strong>
          </div>
          <div class="hud-bag-actions-grid">
            <button type="button" class="hud-btn-tradein" onclick="app.switchTab('sklep')">🔄 Zamień na nowe (2026)</button>
            <button type="button" class="hud-btn-cpo" onclick="app.switchTab('cpo')">⚡ Sprzedaj do TGN CPO</button>
          </div>
          <button type="button" class="btn-action" style="margin-top:0.5rem; padding:0.46rem; border-color:rgba(255,255,255,0.2); color:var(--text-muted); background:rgba(255,255,255,0.04);" onclick="app.switchTab('marketplace')">
            🤝 Wystaw na Giełdzie Graczy (Marketplace C2C)
          </button>
        </div>
      </section>
    `;
  }
};

window.ProfileAndBagComponent = ProfileAndBagComponent;
