/* =========================================================================
   MODUŁ PROFILU I CYFROWEJ TORBY 3D (TGN SPATIAL HUD v32.0)
   - Design oparty na ciemnym szklanym kokpicie 3D z wykresami telemetrii
   ========================================================================= */

(function injectProfileV32Styles() {
  const old = document.getElementById('tgnProfileV32Styles');
  if (old) old.remove();

  const style = document.createElement('style');
  style.id = 'tgnProfileV32Styles';
  style.textContent = `
    /* Lewy Panel: Profil Gracza HUD */
    .hud-profile-grid {
      display: grid;
      grid-template-columns: 155px 1fr;
      gap: 1.1rem;
      align-items: stretch;
      margin-bottom: 1rem;
    }
    .hud-avatar-box {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(56, 189, 248, 0.45);
      background: linear-gradient(180deg, rgba(14, 34, 42, 0.9), rgba(5, 12, 16, 0.98));
      min-height: 270px;
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(56, 189, 248, 0.12);
    }
    .hud-avatar-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .hud-avatar-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(0deg, rgba(4, 12, 16, 0.96) 25%, transparent 100%);
      padding: 1.2rem 0.5rem 0.5rem;
      text-align: center;
    }
    .hud-hcp-pill {
      display: inline-block;
      background: rgba(74, 222, 128, 0.18);
      border: 1px solid var(--accent);
      color: var(--accent);
      font-size: 0.66rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 20px;
      letter-spacing: 0.5px;
    }

    .hud-stat-list {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .hud-stat-row {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 9px;
      padding: 0.52rem 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.76rem;
    }
    .hud-stat-row span { color: var(--text-muted); }
    .hud-stat-row strong { color: #f8fafc; font-weight: 700; text-align: right; }

    .hud-swing-box {
      background: rgba(6, 18, 24, 0.75);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 10px;
      padding: 0.6rem 0.8rem;
      margin-top: 0.2rem;
    }
    .hud-swing-chart {
      width: 100%;
      height: 46px;
      margin-top: 0.35rem;
      display: block;
    }

    .hud-gapping-alert {
      background: linear-gradient(135deg, rgba(250, 204, 21, 0.12), rgba(14, 24, 28, 0.92));
      border: 1px solid rgba(250, 204, 21, 0.55);
      border-radius: 12px;
      padding: 0.8rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      box-shadow: inset 0 0 18px rgba(250, 204, 21, 0.08);
    }

    /* Prawy Panel: Karta Kija HUD z telemetrią i paskiem stanu */
    .hud-club-card {
      background: linear-gradient(145deg, rgba(16, 30, 36, 0.92), rgba(8, 16, 20, 0.96));
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 14px;
      padding: 0.85rem;
      margin-bottom: 0.75rem;
      display: grid;
      grid-template-columns: 92px 1fr;
      gap: 0.9rem;
      align-items: center;
      transition: border-color 0.25s, transform 0.25s;
    }
    .hud-club-card:hover {
      border-color: rgba(56, 189, 248, 0.55);
      transform: translateY(-2px);
    }
    .hud-club-thumb {
      width: 92px;
      height: 92px;
      border-radius: 11px;
      background: radial-gradient(circle at center, #ffffff 65%, #e2e8f0 100%);
      border: 1.5px solid rgba(56, 189, 248, 0.45);
      position: relative;
      overflow: hidden;
      cursor: zoom-in;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hud-club-thumb img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 5px;
    }
    .hud-thumb-actions {
      position: absolute;
      bottom: 3px;
      right: 3px;
      display: flex;
      gap: 2px;
    }
    .hud-icon-btn {
      background: rgba(6, 16, 22, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #e2e8f0;
      font-size: 0.58rem;
      width: 20px;
      height: 20px;
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
      gap: 0.5rem;
      margin-bottom: 0.2rem;
    }
    .hud-club-title {
      font-size: 0.86rem;
      font-weight: 800;
      color: #f8fafc;
      letter-spacing: 0.3px;
    }
    .hud-club-price {
      font-size: 0.84rem;
      font-weight: 800;
      color: var(--gold);
      white-space: nowrap;
    }
    .hud-club-spec {
      font-size: 0.69rem;
      color: #94a3b8;
      margin-bottom: 0.45rem;
    }

    /* Pasek stanu (Condition Bar) jak w HUD */
    .hud-cond-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.65rem;
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

    /* Mini-wykresy telemetrii (3 kolumny) */
    .hud-telemetry-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.4rem;
    }
    .hud-tele-cell {
      background: rgba(4, 12, 16, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 7px;
      padding: 0.32rem 0.45rem;
      text-align: center;
    }
    .hud-tele-cell span {
      display: block;
      font-size: 0.55rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    .hud-tele-cell strong {
      display: block;
      font-size: 0.74rem;
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
      background: rgba(4, 12, 16, 0.72);
      border: 1px solid rgba(114, 214, 150, 0.28);
      border-radius: 14px;
      padding: 0.95rem 1.05rem;
      margin-top: 0.9rem;
    }
    .hud-bag-total-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.75rem;
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
      padding: 0.58rem 0.6rem;
      font-size: 0.74rem;
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
      padding: 0.58rem 0.6rem;
      font-size: 0.74rem;
      font-weight: 800;
      cursor: pointer;
      transition: 0.2s;
      text-transform: uppercase;
    }
    .hud-btn-cpo:hover { background: var(--accent); color: #052e16; }

    @media (max-width: 768px) {
      .hud-profile-grid {
        grid-template-columns: 102px 1fr;
        gap: 0.65rem;
      }
      .hud-avatar-box {
        min-height: 215px;
      }
      .hud-stat-row {
        padding: 0.42rem 0.6rem;
        font-size: 0.7rem;
      }
      .hud-club-card {
        grid-template-columns: 76px 1fr;
        gap: 0.65rem;
        padding: 0.7rem;
      }
      .hud-club-thumb {
        width: 76px;
        height: 76px;
      }
      .hud-club-title { font-size: 0.78rem; }
      .hud-club-price { font-size: 0.76rem; }
      .hud-bag-actions-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
})();

const ProfileAndBagComponent = {
  // Pomocnik do przeliczania opisu stanu na procent paska postępu
  getCondPercent: (condStr) => {
    const s = String(condStr || '9/10').toLowerCase();
    if (s.includes('mint') || s.includes('nowy') || s.includes('10/10')) return 100;
    if (s.includes('9.5')) return 95;
    if (s.includes('9/10')) return 90;
    if (s.includes('8.5')) return 85;
    if (s.includes('8/10')) return 80;
    return 88;
  },

  render: () => {
    const u = AppData.user || window.DefaultUser;
    const bag = AppData.bag || [];

    // Wyliczenie łącznej wartości torby
    const totalValNum = bag.reduce((sum, club) => {
      const numeric = parseInt(String(club.val || '0').replace(/\D/g, ''), 10) || 0;
      return sum + numeric;
    }, 0);
    const totalValFormatted = totalValNum > 0 ? totalValNum.toLocaleString('pl-PL') + ' PLN' : '14 200 PLN';

    const avatarUrl = "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=500&q=80";
    const defaultPreviewImg = (typeof ClubImageEngine !== 'undefined')
      ? ClubImageEngine.buildDirectSearchPhotoUrl("Ping G430 Max Driver", 0)
      : "";

    const clubsHTML = bag.map((club, idx) => {
      const imgId = `bag_club_img_${club.id}`;
      const visualSrc = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getClubVisualUrl(club.name, club.imgUrl)
        : '';
      const fallbackSrc = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getFallbackPhoto(club.name)
        : '';
      const safeName = (club.name || '').replace(/'/g, "");
      const condPct = ProfileAndBagComponent.getCondPercent(club.cond);

      // Różne krzywe SVG sparkline dla estetyki HUD
      const spark1 = idx % 2 === 0
        ? "M0,12 Q15,10 28,6 T60,3"
        : "M0,10 Q20,4 38,8 T60,4";
      const spark2 = "M0,11 L20,8 L40,5 L60,3";
      const spark3 = String(club.attack || '').includes('-')
        ? "M0,4 Q30,7 60,12"
        : "M0,12 Q30,8 60,3";

      return `
        <div class="hud-club-card">
          <div class="hud-club-thumb" onclick="app.openPhotoZoom('${safeName}', document.getElementById('${imgId}').src, '${club.loft} • Wartość: ${club.val}')">
            <img id="${imgId}" src="${visualSrc}" alt="${club.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
            <div class="hud-thumb-actions" onclick="event.stopPropagation()">
              <button type="button" class="hud-icon-btn" title="Inne zdjęcie z sieci" onclick="app.nextWebSearchPhoto('${imgId}', '${safeName}')">🔄</button>
              <button type="button" class="hud-icon-btn" title="Szukaj w Google Grafika" onclick="app.openGoogleImages('${safeName}')">🔎</button>
            </div>
          </div>

          <div style="min-width:0;">
            <div class="hud-club-top">
              <div class="hud-club-title">${club.name}</div>
              <div class="hud-club-price">${club.val}</div>
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
                <svg class="hud-sparkline" viewBox="0 0 60 14" preserveAspectRatio="none">
                  <path d="${spark3}" fill="none" stroke="#facc15" stroke-width="1.6"/>
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
            <div class="hud-avatar-overlay">
              <span class="hud-hcp-pill">HCP ${u.hcp}</span>
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
              <svg class="hud-swing-chart" viewBox="0 0 220 46" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="swingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.38"/>
                    <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.02"/>
                  </linearGradient>
                </defs>
                <line x1="0" y1="15" x2="220" y2="15" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3"/>
                <line x1="0" y1="32" x2="220" y2="32" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3"/>
                <path d="M0,38 L35,34 L75,26 L115,28 L155,12 L190,18 L220,10 L220,46 L0,46 Z" fill="url(#swingGrad)"/>
                <polyline points="0,38 35,34 75,26 115,28 155,12 190,18 220,10" fill="none" stroke="#38bdf8" stroke-width="2.2"/>
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
          <button type="button" class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent); padding:4px 10px;" onclick="app.toggleAddClubLive()">
            + Dodaj kij
          </button>
        </h2>

        <!-- Kreator dodawania kija z podglądem zdjęcia -->
        <div id="addClubLiveBox" class="add-club-live-box">
          <div class="live-preview-row">
            <div class="club-photo-frame" style="width:80px !important; height:80px !important;">
              <img id="livePreviewClubImg" src="${defaultPreviewImg}" alt="Podgląd kija">
            </div>
            <div style="display:flex; flex-direction:column; gap:0.4rem;">
              <input type="text" id="newClubName" placeholder="Model kija (np. PING G430 MAX DRIVER)" oninput="app.updateLiveClubPreview(this.value)" style="background:rgba(255,255,255,0.08); border:1px solid var(--accent); border-radius:6px; padding:0.45rem 0.6rem; color:#fff; font-size:0.78rem;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem;">
                <input type="text" id="newClubSpec" placeholder="Specyfikacja (np. 10.5°, Stiff)" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.4rem 0.6rem; color:#fff; font-size:0.74rem;">
                <input type="text" id="newClubVal" placeholder="Wartość (np. 1 950 PLN)" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.4rem 0.6rem; color:#fff; font-size:0.74rem;">
              </div>
              <input type="text" id="newClubCustomImg" placeholder="(Opcjonalnie) Własny link URL do zdjęcia..." style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:0.35rem 0.6rem; color:#fff; font-size:0.7rem;">
            </div>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button type="button" class="btn-primary" style="margin:0; padding:0.5rem;" onclick="app.addClubWithLivePhoto()">✓ Zapisz kij w torbie</button>
            <button type="button" class="btn-mini-tool" onclick="app.toggleAddClubLive()">Anuluj</button>
          </div>
        </div>

        ${clubsHTML}

        <!-- Dolna sekcja wartości torby i przycisków Trade-In / CPO -->
        <div class="hud-bag-footer">
          <div class="hud-bag-total-row">
            <span style="font-size:0.74rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.6px;">Całkowita wartość torby</span>
            <strong style="font-size:1.25rem; color:var(--accent);">${totalValFormatted}</strong>
          </div>
          <div class="hud-bag-actions-grid">
            <button type="button" class="hud-btn-tradein" onclick="app.switchTab('sklep')">🔄 Zamień na nowe (Trade-In 2026)</button>
            <button type="button" class="hud-btn-cpo" onclick="app.switchTab('cpo')">⚡ Sprzedaj do TGN CPO</button>
          </div>
          <button type="button" class="btn-action" style="margin-top:0.5rem; padding:0.48rem; border-color:rgba(255,255,255,0.2); color:var(--text-muted); background:rgba(255,255,255,0.04);" onclick="app.switchTab('marketplace')">
            🤝 Wystaw na Giełdzie Graczy (Marketplace C2C)
          </button>
        </div>
      </section>
    `;
  }
};
