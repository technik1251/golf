/* =========================================================================
   GŁÓWNY KONTROLER PRODUKCYJNY TGN v25.0 (js/app.js)
   - Nowy Design Strony Głównej: Executive Golf Portal (Bento Grid 3D + Foto HD)
   - Naprawione ładowanie produktów i wątków forum (nigdy nie pokazuje "0")
   - Wbudowany Spotlight Produktowy, Telemetria TrackMan Live i Ticker Pól
   ========================================================================= */

// Wstrzyknięcie dedykowanych stylów Premium Bento Grid dla Strony Głównej
(function injectHomeV25Styles() {
  if (document.getElementById('tgnHomeV25Styles')) return;
  const style = document.createElement('style');
  style.id = 'tgnHomeV25Styles';
  style.textContent = `
    .home-live-ticker {
      display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.6rem;
      background: rgba(4, 12, 15, 0.92); border: 1px solid rgba(74, 222, 128, 0.35);
      border-radius: 12px; padding: 0.55rem 1rem; margin-bottom: 1.25rem; font-size: 0.74rem;
      box-shadow: inset 0 0 15px rgba(74, 222, 128, 0.08);
    }
    .ticker-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #4ade80;
      box-shadow: 0 0 10px #4ade80; display: inline-block; margin-right: 6px;
    }
    .home-hero-bento {
      display: grid; grid-template-columns: 1.65fr 1fr; gap: 1.25rem; margin-bottom: 1.4rem;
    }
    .hero-main-showcase {
      background: linear-gradient(125deg, rgba(6, 18, 22, 0.92) 35%, rgba(10, 38, 28, 0.75) 100%),
                  url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
      border: 1px solid rgba(114, 214, 150, 0.45); border-radius: 20px; padding: 1.8rem;
      display: flex; flex-direction: column; justify-content: space-between;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6); position: relative; overflow: hidden;
    }
    .hero-telemetry-card {
      background: linear-gradient(155deg, rgba(14, 30, 36, 0.95), rgba(6, 14, 18, 0.98));
      border: 1px solid rgba(250, 204, 21, 0.45); border-radius: 20px; padding: 1.35rem;
      display: flex; flex-direction: column; justify-content: space-between;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6), inset 0 0 25px rgba(250, 204, 21, 0.08);
    }
    .telemetry-kpi-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin: 0.75rem 0;
    }
    .telemetry-kpi-box {
      background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px; padding: 0.55rem 0.4rem; text-align: center;
    }
    .telemetry-kpi-box span { display: block; font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; }
    .telemetry-kpi-box strong { font-size: 0.95rem; color: var(--accent); font-weight: 800; }

    /* 3 Wizualne Bramy Subdomenowe (Sklep / Forum / Kokpit) */
    .home-portals-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 1.6rem;
    }
    .portal-gate-card {
      border-radius: 18px; padding: 1.5rem 1.3rem; display: flex; flex-direction: column;
      justify-content: space-between; cursor: pointer; transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
      position: relative; overflow: hidden; min-height: 235px; box-shadow: 0 15px 35px rgba(0,0,0,0.55);
    }
    .portal-gate-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 22px 45px rgba(0,0,0,0.8);
    }
    .portal-gate-card.gate-shop {
      background: linear-gradient(160deg, rgba(8, 24, 20, 0.88) 25%, rgba(6, 16, 20, 0.96) 90%),
                  url('https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=800&q=80') center/cover no-repeat;
      border: 2px solid var(--accent);
    }
    .portal-gate-card.gate-forum {
      background: linear-gradient(160deg, rgba(8, 22, 34, 0.88) 25%, rgba(6, 14, 22, 0.96) 90%),
                  url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80') center/cover no-repeat;
      border: 2px solid var(--blue);
    }
    .portal-gate-card.gate-cockpit {
      background: linear-gradient(160deg, rgba(28, 24, 10, 0.88) 25%, rgba(8, 14, 18, 0.96) 90%),
                  url('https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=800&q=80') center/cover no-repeat;
      border: 2px solid var(--gold);
    }

    /* Karuzela Produktów Spotlight na Stronie Głównej */
    .home-spotlight-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.6rem;
    }
    .spotlight-prod-card {
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 15px; padding: 0.9rem; display: flex; flex-direction: column; justify-content: space-between;
      transition: 0.25s; cursor: pointer;
    }
    .spotlight-prod-card:hover {
      border-color: var(--accent); background: rgba(74, 222, 128, 0.06); transform: translateY(-3px);
    }
    .spotlight-img-wrap {
      width: 100%; height: 130px; background: #fff; border-radius: 10px; margin-bottom: 0.65rem;
      display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;
      border: 1px solid rgba(114, 214, 150, 0.35);
    }
    .spotlight-img-wrap img { width: 100%; height: 100%; object-fit: contain; padding: 6px; }

    /* Dolny układ 2-kolumnowy: Forum + Ekosystem Pól i Turniejów */
    .home-bottom-bento {
      display: grid; grid-template-columns: 1.15fr 1fr; gap: 1.35rem;
    }
    .home-forum-row {
      background: rgba(255, 255, 255, 0.035); border: 1px solid rgba(255, 255, 255, 0.09);
      border-left: 3px solid var(--blue); border-radius: 12px; padding: 0.85rem 1rem;
      margin-bottom: 0.65rem; cursor: pointer; transition: 0.2s;
    }
    .home-forum-row:hover {
      background: rgba(56, 189, 248, 0.08); border-color: var(--blue);
    }

    @media (max-width: 1100px) {
      .home-hero-bento, .home-portals-grid, .home-bottom-bento { grid-template-columns: 1fr; }
      .home-spotlight-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .home-spotlight-grid { grid-template-columns: 1fr; }
      .hero-main-showcase { padding: 1.25rem; }
    }
  `;
  document.head.appendChild(style);
})();

// Zabezpieczenie danych bazowych i naprawa licznika "0 produktów / 0 tematów"
window.DefaultUser = window.DefaultUser || {
  name: "Marek Kowalski",
  email: "marek.kowalski@tgngolf.pl",
  hcp: 12.4,
  level: "Średniozaawansowany",
  city: "Warszawa",
  swingSpeed: "96 mph",
  lastRound: "82 (Modry Las)",
  role: "CLIENT"
};

window.ensureAllPortalDataReady = function() {
  // Jeśli w globalnym zasięgu jest obiekt AppData z pliku data.js, zsynchronizuj go z window.AppData
  if (typeof AppData !== 'undefined') {
    window.AppData = AppData;
  } else if (typeof window.AppData === 'undefined') {
    window.AppData = {
      user: { ...window.DefaultUser },
      cart: [], storeProducts: [], forumPosts: [], events2027: [], bag: [], chatMessages: []
    };
  }

  // Upewnij się, że sklep zainicjalizował swoje produkty
  if (typeof StoreComponent !== 'undefined' && StoreComponent.ensureStoreDataInitialized) {
    StoreComponent.ensureStoreDataInitialized();
  }

  // Jeśli lista wątków forum nadal jest pusta, załaduj domyślne wątki społeczności TGN
  if (!window.AppData.forumPosts || window.AppData.forumPosts.length === 0) {
    window.AppData.forumPosts = [
      {
        id: 501, pinned: true, catKey: "EQUIPMENT", category: "🏌️ Sprzęt & Fitting",
        title: "TaylorMade Qi10 Max vs Ping G430 Max 10K – realne testy na TrackManie przy 95-100 mph",
        author: "Tomek_PGA_Fitter", badge: "PRO FITTER", badgeClass: "badge-pro",
        date: "Dzisiaj, 09:40", views: "1 420", likes: 38,
        content: "Przetestowaliśmy oba drivery 10K MOI na 25 graczach z HCP 8-18. Zobaczcie różnice w spawie i dyspersji bocznej...",
        comments: [{ author: "Marek_WWA", badge: "HCP 12.4", badgeClass: "badge-vet", date: "Dzisiaj", text: "U mnie Qi10 dał +6m carry!" }]
      },
      {
        id: 502, pinned: false, catKey: "COURSES", category: "⛳ Pola w Polsce",
        title: "Stan greenów na Modrym Lesie i Binowo Park – raport z weekendu (Stimpmeter 10.5 ft!)",
        author: "Krzysztof_Szczecin", badge: "HCP 8.2", badgeClass: "badge-og",
        date: "Wczoraj", views: "890", likes: 24,
        content: "Kto wybiera się w ten weekend na Pomorze Zachodnie – greeny są w absolutnie turniejowej kondycji.",
        comments: [{ author: "Anna_Golf", badge: "HCP 16.0", badgeClass: "badge-vet", date: "Wczoraj", text: "Potwierdzam, bunkry też świeżo przygotowane!" }]
      },
      {
        id: 503, pinned: false, catKey: "TECHNIQUE", category: "🎯 Technika & WHS",
        title: "Jak zamknąć lukę dystansową między PW (43°) a SW (56°)? Dobór Gap Wedge 50° vs 52°",
        author: "Michal_Coach", badge: "PGA COACH", badgeClass: "badge-pro",
        date: "2 dni temu", views: "640", likes: 19,
        content: "W nowoczesnych zestawach ironów Pitching Wedge ma często 43 stopnie. Brak kija 50-52° kosztuje średnio 3 uderzenia na rundę.",
        comments: []
      }
    ];
  }

  try {
    const savedForum = localStorage.getItem('tgn_forum_posts_db');
    if (savedForum) {
      const parsed = JSON.parse(savedForum);
      if (Array.isArray(parsed) && parsed.length > 0) window.AppData.forumPosts = parsed;
    }
    const savedCart = localStorage.getItem('tgn_persistent_cart');
    if (savedCart) {
      window.AppData.cart = JSON.parse(savedCart);
    }
  } catch (e) {}
};

window.saveForumToDB = function() {
  try {
    localStorage.setItem('tgn_forum_posts_db', JSON.stringify(window.AppData.forumPosts || []));
  } catch (e) {}
};

// =========================================================================
// 2. NOWA STRONA GŁÓWNA PORTALU (TGN.PL EXECUTIVE COMMAND CENTER v25.0)
// =========================================================================
window.HomeComponent = {
  render: function() {
    window.ensureAllPortalDataReady();

    const userObj = (window.AppData && window.AppData.user) ? window.AppData.user : window.DefaultUser;
    const userName = userObj.name || "Marek Kowalski";
    const userHcp = userObj.hcp || 12.4;
    const userCity = userObj.city || "Warszawa";
    const userSwing = userObj.swingSpeed || "96 mph";
    const lastRound = userObj.lastRound || "82 ud. (Modry Las)";

    const products = window.AppData.storeProducts || [];
    const productsCount = products.length;
    const cpoCount = products.filter(p => p.section === 'USED').length;
    const forumPosts = window.AppData.forumPosts || [];
    const forumTotal = forumPosts.length;
    const bag = window.AppData.bag || [];
    const bagCount = bag.length || 4;
    const events = window.AppData.events2027 || [];
    const nextEvent = events[0] || {
      title: "TGN Polish Masters Open 2027 – Modry Las",
      date: "15–17 Maja 2027",
      location: "Modry Las Golf Resort (Choszczno)",
      spotsLeft: 14,
      xpReward: "+750 XP"
    };

    // 4 wyróżnione produkty do sekcji Spotlight na Stronie Głównej
    const spotlightProducts = products.slice(0, 4);
    const spotlightHTML = spotlightProducts.map(prod => {
      const visualSrc = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl)
        : 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=500&q=80';
      const fallbackSrc = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getFallbackPhoto(prod.name)
        : visualSrc;
      const isUsed = prod.section === 'USED';

      return `
        <div class="spotlight-prod-card" onclick="window.app.switchTab('sklep')">
          <div>
            <div class="spotlight-img-wrap">
              <img src="${visualSrc}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
              <span style="position:absolute; top:6px; left:6px; background:${isUsed ? 'rgba(250,204,21,0.92)' : 'rgba(5,22,16,0.92)'}; color:${isUsed ? '#052e16' : 'var(--accent)'}; font-size:0.55rem; font-weight:800; padding:2px 6px; border-radius:4px;">
                ${isUsed ? '♻️ KOMIS CPO' : '🏆 HIT 2026'}
              </span>
            </div>
            <div style="font-size:0.65rem; color:var(--accent); font-weight:700; text-transform:uppercase;">${prod.brand} • ${prod.loft}</div>
            <strong style="font-size:0.8rem; color:#fff; display:block; margin:3px 0 6px; line-height:1.25;">${prod.name}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.45rem; border-top:1px solid rgba(255,255,255,0.08);">
            <div>
              ${prod.oldPrice ? `<span style="font-size:0.65rem; color:var(--text-muted); text-decoration:line-through; display:block;">${prod.oldPrice} PLN</span>` : ''}
              <strong style="font-size:0.92rem; color:var(--gold);">${prod.price} PLN</strong>
            </div>
            <button type="button" class="btn-mini-tool" style="background:var(--accent); color:#052e16; border:none; padding:5px 9px; font-weight:800;" onclick="event.stopPropagation(); window.StoreComponent && window.StoreComponent.addItem(${prod.id}, false)">
              🛒 + Koszyk
            </button>
          </div>
        </div>
      `;
    }).join('');

    const recentPostsHTML = forumPosts.slice(0, 3).map(post => `
      <div class="home-forum-row" onclick="window.app.switchTab('forum')">
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.66rem; margin-bottom:0.25rem;">
          <span style="color:var(--blue); font-weight:700;">${post.category || '💬 Forum TGN'}</span>
          <span style="color:var(--text-muted);">${post.date || 'Dzisiaj'} • 👍 ${post.likes || 12}</span>
        </div>
        <strong style="font-size:0.84rem; color:#fff; display:block; margin-bottom:0.25rem; line-height:1.3;">${post.title}</strong>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:var(--text-muted);">
          <span>Autor: <strong style="color:var(--text-main);">${post.author}</strong> <span class="user-badge ${post.badgeClass || 'badge-vet'}">${post.badge || 'GRACZ'}</span></span>
          <span style="color:var(--accent); font-weight:700;">💬 ${(post.comments || []).length} odp. →</span>
        </div>
      </div>
    `).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2; padding: 1.5rem;">
        
        <!-- 1. PASEK LIVE TICKER (STATUS PÓL & OFERT W CZASIE RZECZYWISTYM) -->
        <div class="home-live-ticker">
          <div style="display:flex; align-items:center; gap:0.85rem; flex-wrap:wrap;">
            <span><span class="ticker-dot"></span><strong style="color:var(--accent);">LIVE POLSKA:</strong></span>
            <span style="color:var(--text-main);">⛳ <strong>Modry Las:</strong> 19°C (Greeny 10.5 ft)</span>
            <span style="color:var(--text-muted);">|</span>
            <span style="color:var(--text-main);">⛳ <strong>Binowo Park:</strong> 18°C (Otwarte 18 dołków)</span>
            <span style="color:var(--text-muted);">|</span>
            <span style="color:var(--text-main);">⛳ <strong>First Warsaw:</strong> 20°C (Brak opóźnień)</span>
          </div>
          <div>
            <span style="background:rgba(250,204,21,0.16); border:1px solid var(--gold); color:var(--gold); padding:3px 9px; border-radius:6px; font-weight:800; font-size:0.7rem; cursor:pointer;" onclick="window.StoreComponent && window.StoreComponent.applyRabat3Code()">
              🏷️ Kod "RABAT3" (-3% w sklepie) – Kliknij by aktywować
            </span>
          </div>
        </div>

        <!-- 2. HERO BENTO GRID: POWITANIE + TELEMETRIA TRACKMAN LIVE -->
        <div class="home-hero-bento">
          
          <!-- Lewa karta: Główny Showcase Portalu TGN.PL z wyszukiwarką -->
          <div class="hero-main-showcase">
            <div>
              <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(0,0,0,0.65); border:1px solid var(--accent); padding:4px 12px; border-radius:20px; font-size:0.68rem; font-weight:800; color:var(--accent); margin-bottom:0.85rem;">
                <span>🌐 TGN.PL EXECUTIVE GOLF ECOSYSTEM</span>
                <span>•</span>
                <span style="color:var(--gold);">SEZON 2026 / 2027</span>
              </div>
              <h1 style="font-size:1.85rem; color:#ffffff; font-weight:900; line-height:1.2; margin-bottom:0.6rem; text-shadow: 0 4px 20px rgba(0,0,0,0.8);">
                Twój Centralny Hub Golfowy,<br><span style="color:var(--accent);">${userName}!</span> 🏌️‍♂️
              </h1>
              <p style="font-size:0.84rem; color:#e2e8f0; max-width:560px; line-height:1.55; margin-bottom:1.1rem;">
                Z jednego miejsca przechodzisz bezpośrednio do autoryzowanego sklepu <strong>sklep.tgn.pl</strong> (${productsCount} produktów i komis CPO), ogólnopolskiego <strong>forum.tgn.pl</strong> oraz swojego wirtualnego <strong>Kokpitu 3D</strong>.
              </p>
            </div>

            <!-- Szybka wyszukiwarka globalna na stronie głównej -->
            <div>
              <div style="display:flex; gap:0.5rem; background:rgba(5, 14, 18, 0.88); border:1px solid rgba(114,214,150,0.5); padding:0.45rem; border-radius:12px; margin-bottom:0.8rem;">
                <input type="text" id="homeQuickSearch" placeholder="🔍 Szukaj kija w sklepie (np. TaylorMade Qi10, Vokey 52, Pro V1, Garmin)..." style="flex:1; background:transparent; border:none; color:#fff; font-size:0.8rem; padding:0.35rem 0.6rem; outline:none;" onkeypress="if(event.key==='Enter'){ window.app.quickSearchFromHome(); }">
                <button type="button" class="btn-primary" style="width:auto; margin:0; padding:0.45rem 1.1rem; font-size:0.76rem;" onclick="window.app.quickSearchFromHome()">
                  Szukaj w Sklepie →
                </button>
              </div>

              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <span style="font-size:0.7rem; color:var(--text-muted); align-self:center;">Szybkie filtry:</span>
                <button type="button" class="btn-mini-tool" onclick="window.app.switchTab('sklep'); window.StoreComponent.setCategory('KIJE_NOWE');">🏌️ Nowe Kije 2026</button>
                <button type="button" class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold);" onclick="window.app.switchTab('sklep'); window.StoreComponent.setCategory('UZYWANE_KIJE');">♻️ Komis CPO (${cpoCount})</button>
                <button type="button" class="btn-mini-tool" onclick="window.app.switchTab('sklep'); window.StoreComponent.setCategory('PERSONALIZACJA');">🖨️ Piłki z własnym logo</button>
                <button type="button" class="btn-mini-tool" onclick="window.app.switchTab('pola');">⛳ Rezerwuj Tee Time</button>
              </div>
            </div>
          </div>

          <!-- Prawa karta: Karta Telemetrii WHS & TrackMan Gracza -->
          <div class="hero-telemetry-card">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span style="font-size:0.68rem; font-weight:800; color:var(--gold); text-transform:uppercase; letter-spacing:0.8px;">📡 TWOJA TELEMETRIA WHS & TRACKMAN</span>
                <span style="font-size:0.65rem; background:rgba(74,222,128,0.16); color:var(--accent); padding:2px 7px; border-radius:4px; font-weight:700;">ZWERYFIKOWANY</span>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:baseline;">
                <strong style="font-size:1.1rem; color:#fff;">${userName}</strong>
                <span style="font-size:0.75rem; color:var(--text-muted);">📍 ${userCity}</span>
              </div>

              <div class="telemetry-kpi-grid">
                <div class="telemetry-kpi-box">
                  <span>Handicap WHS</span>
                  <strong style="color:var(--gold);">${userHcp}</strong>
                </div>
                <div class="telemetry-kpi-box">
                  <span>Swing Speed</span>
                  <strong>${userSwing}</strong>
                </div>
                <div class="telemetry-kpi-box">
                  <span>Smash Factor</span>
                  <strong style="color:#38bdf8;">1.48</strong>
                </div>
              </div>

              <div style="background:rgba(250,204,21,0.09); border:1px dashed rgba(250,204,21,0.45); border-radius:10px; padding:0.6rem 0.75rem; font-size:0.73rem; line-height:1.4; color:var(--text-main); margin-bottom:0.6rem;">
                ⚠️ <strong style="color:var(--gold);">Alert Gapping AI:</strong> Wykryto lukę <strong>15 metrów</strong> pomiędzy PW (43°) a SW (56°). Rekomendowany kij: <strong>Gap Wedge 52°</strong>.
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
              <button type="button" class="btn-action" style="margin:0; padding:0.5rem; font-size:0.72rem;" onclick="window.app.switchTab('profile')">
                🎒 Otwórz Torbę 3D (${bagCount}/14)
              </button>
              <button type="button" class="btn-action" style="margin:0; padding:0.5rem; font-size:0.72rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.12);" onclick="window.app.openAiModal()">
                🌟 Dobierz Wedge 52°
              </button>
            </div>
          </div>

        </div>

        <!-- 3. TRZY WIZUALNE BRAMY SUBDOMENOWE (SKLEP.TGN.PL / FORUM.TGN.PL / KOKPIT 3D) -->
        <div class="home-portals-grid">
          
          <!-- Brama 1: SKLEP.TGN.PL -->
          <div class="portal-gate-card gate-shop" onclick="window.app.switchTab('sklep')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <span style="background:var(--accent); color:#052e16; font-size:0.65rem; font-weight:900; padding:3px 9px; border-radius:6px; letter-spacing:0.5px;">
                  🌐 SKLEP.TGN.PL
                </span>
                <span style="font-size:0.7rem; color:var(--accent); font-weight:700;">● ${productsCount} towarów od ręki</span>
              </div>
              <h3 style="font-size:1.2rem; color:#fff; margin-bottom:0.4rem; font-weight:800;">Pro Shop & Komis CPO</h3>
              <p style="font-size:0.77rem; color:#cbd5e1; line-height:1.45;">
                Autoryzowany sklep: nowe drivery i irony 2026, sprawdzony komis używanych kijów CPO z 12-miesięczną gwarancją oraz rozliczenie Trade-In.
              </p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding-top:0.7rem; border-top:1px solid rgba(255,255,255,0.12);">
              <span style="font-size:0.7rem; color:var(--gold); font-weight:700;">🏷️ Kod: RABAT3 (-3%)</span>
              <span style="font-size:0.78rem; color:var(--accent); font-weight:800;">Wejdź do Sklepu →</span>
            </div>
          </div>

          <!-- Brama 2: FORUM.TGN.PL -->
          <div class="portal-gate-card gate-forum" onclick="window.app.switchTab('forum')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <span style="background:var(--blue); color:#041e2b; font-size:0.65rem; font-weight:900; padding:3px 9px; border-radius:6px; letter-spacing:0.5px;">
                  🌐 FORUM.TGN.PL
                </span>
                <span style="font-size:0.7rem; color:var(--blue); font-weight:700;">● ${forumTotal} aktywnych dyskusji</span>
              </div>
              <h3 style="font-size:1.2rem; color:#fff; margin-bottom:0.4rem; font-weight:800;">Forum Społeczności</h3>
              <p style="font-size:0.77rem; color:#cbd5e1; line-height:1.45;">
                Największe polskie forum golfowe: recenzje sprzętu, porady trenerów PGA, raporty o stanie pól w Polsce i umawianie wspólnych rund.
              </p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding-top:0.7rem; border-top:1px solid rgba(255,255,255,0.12);">
              <span style="font-size:0.7rem; color:#cbd5e1;">👥 1 840 graczy online</span>
              <span style="font-size:0.78rem; color:var(--blue); font-weight:800;">Otwórz Forum →</span>
            </div>
          </div>

          <!-- Brama 3: KOKPIT 3D & GIEŁDA C2C -->
          <div class="portal-gate-card gate-cockpit" onclick="window.app.switchTab('profile')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                <span style="background:var(--gold); color:#052e16; font-size:0.65rem; font-weight:900; padding:3px 9px; border-radius:6px; letter-spacing:0.5px;">
                  🌐 KOKPIT.TGN.PL
                </span>
                <span style="font-size:0.7rem; color:var(--gold); font-weight:700;">● Ostatnia runda: ${lastRound}</span>
              </div>
              <h3 style="font-size:1.2rem; color:#fff; margin-bottom:0.4rem; font-weight:800;">Moje Konto & Torba 3D</h3>
              <p style="font-size:0.77rem; color:#cbd5e1; line-height:1.45;">
                Zarządzaj swoimi 14 kijami w torbie ze zdjęciami na żywo, sprawdzaj wycenę odsprzedaży CPO i analizuj wykres swojego Handicapu.
              </p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding-top:0.7rem; border-top:1px solid rgba(255,255,255,0.12);">
              <span style="font-size:0.7rem; color:var(--gold); font-weight:700;">🎒 Wartość torby: ~9 850 PLN</span>
              <span style="font-size:0.78rem; color:var(--gold); font-weight:800;">Otwórz Kokpit 3D →</span>
            </div>
          </div>

        </div>

        <!-- 4. SEKCJA SPOTLIGHT: GORĄCE OFERTY PRO SHOP & CPO (BEZPOŚREDNIO NA STRONIE GŁÓWNEJ) -->
        <div style="margin-bottom:1.6rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.85rem;">
            <div>
              <h3 style="font-size:0.95rem; text-transform:uppercase; color:var(--accent); margin:0; letter-spacing:0.8px;">
                🔥 Wybrane Oferty Dnia z Pro Shopu & Komisu CPO
              </h3>
              <span style="font-size:0.72rem; color:var(--text-muted);">Dodaj sprzęt bezpośrednio do koszyka lub przejdź do pełnego katalogu ${productsCount} produktów</span>
            </div>
            <button type="button" class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent); padding:5px 12px;" onclick="window.app.switchTab('sklep')">
              Zobacz wszystkie produkty (${productsCount}) →
            </button>
          </div>

          <div class="home-spotlight-grid">
            ${spotlightHTML}
          </div>
        </div>

        <!-- 5. DOLNY UKŁAD BENTO: NAJNOWSZE DYSKUSJE Z FORUM + KALENDARZ TURNIEJÓW I ATLAS PÓL -->
        <div class="home-bottom-bento">
          
          <!-- Lewa kolumna: Żywy podgląd Forum -->
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <h3 style="font-size:0.9rem; text-transform:uppercase; color:var(--blue); margin:0;">💬 Ostatnie dyskusje na Forum.tgn.pl</h3>
              <button type="button" class="btn-mini-tool" onclick="window.app.switchTab('forum')">Dołącz do dyskusji →</button>
            </div>
            ${recentPostsHTML}
          </div>

          <!-- Prawa kolumna: Najbliższy Turniej 2027 + Szybkie kafelki modułów -->
          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.85rem;">
            <div style="background:linear-gradient(135deg, rgba(56,189,248,0.12), rgba(74,222,128,0.1)); border:1px solid rgba(56,189,248,0.4); border-radius:16px; padding:1.15rem;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span style="font-size:0.65rem; font-weight:800; color:var(--blue); text-transform:uppercase;">🏆 NADCHODZĄCY TURNIEJ TGN TOUR</span>
                <span style="font-size:0.65rem; background:rgba(250,204,21,0.18); color:var(--gold); padding:2px 7px; border-radius:5px; font-weight:800;">${nextEvent.xpReward || '+750 XP'}</span>
              </div>
              <strong style="font-size:0.95rem; color:#fff; display:block; margin-bottom:0.25rem;">${nextEvent.title}</strong>
              <p style="font-size:0.74rem; color:var(--text-muted); margin-bottom:0.75rem;">
                📅 ${nextEvent.date} • 📍 ${nextEvent.location} • Wolne miejsca: <strong style="color:var(--accent);">${nextEvent.spotsLeft}</strong>
              </p>
              <button type="button" class="btn-action" style="margin:0; padding:0.5rem;" onclick="window.app.switchTab('wydarzenia')">
                📅 Zobacz Kalendarz 2027 i Zapisz się →
              </button>
            </div>

            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.6rem;">
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.8rem; text-align:center; cursor:pointer;" onclick="window.app.switchTab('pola')">
                <div style="font-size:1.3rem; margin-bottom:3px;">⛳</div>
                <strong style="font-size:0.75rem; color:#fff; display:block;">Pola w Polsce</strong>
                <span style="font-size:0.63rem; color:var(--text-muted);">25 obiektów</span>
              </div>
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.8rem; text-align:center; cursor:pointer;" onclick="window.app.switchTab('cpo')">
                <div style="font-size:1.3rem; margin-bottom:3px;">⚡</div>
                <strong style="font-size:0.75rem; color:#fff; display:block;">Skup Kijów</strong>
                <span style="font-size:0.63rem; color:var(--text-muted);">Wycena w 2 min</span>
              </div>
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.8rem; text-align:center; cursor:pointer;" onclick="window.app.switchTab('marketplace')">
                <div style="font-size:1.3rem; margin-bottom:3px;">🤝</div>
                <strong style="font-size:0.75rem; color:#fff; display:block;">Giełda C2C</strong>
                <span style="font-size:0.63rem; color:var(--text-muted);">Oferty graczy</span>
              </div>
            </div>
          </div>

        </div>

      </section>
    `;
  }
};

// 3. Komponent Panelu Administratora (CMS)
window.AdminDashboardComponent = {
  render: function() {
    window.ensureAllPortalDataReady();
    const orders = JSON.parse(localStorage.getItem('tgn_orders_db') || '[]');
    const subscribers = JSON.parse(localStorage.getItem('tgn_newsletter_list') || '[]');
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);

    const ordersHTML = orders.length === 0 ? `
      <div style="font-size:0.8rem; color:var(--text-muted); padding:1.2rem; background:rgba(0,0,0,0.25); border-radius:10px; border:1px dashed rgba(255,255,255,0.12);">
        Brak złożonych zamówień w bazie. Dodaj dowolny produkt do koszyka w zakładce <strong>🛍️ Sklep</strong> i przejdź przez formularz zamówienia.
      </div>
    ` : orders.map((o, idx) => `
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:1rem; margin-bottom:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.4rem;">
          <strong style="color:var(--gold); font-size:0.9rem;">Zamówienie #${o.orderId} • ${o.date}</strong>
          <div style="display:flex; gap:0.4rem; align-items:center;">
            <span style="background:rgba(74,222,128,0.18); color:var(--accent); padding:3px 9px; border-radius:6px; font-size:0.72rem; font-weight:700;">${o.status}</span>
            <button type="button" class="btn-mini-tool" onclick="window.app.changeOrderStatus(${idx})">🔄 Zmień status</button>
          </div>
        </div>
        <p style="font-size:0.78rem; color:var(--text-main);"><strong>Klient:</strong> ${o.customerName} | <strong>Tel:</strong> ${o.phone} | <strong>E-mail:</strong> ${o.email}</p>
        <p style="font-size:0.76rem; color:var(--text-muted);"><strong>Adres dostawy:</strong> ${o.address} (${o.delivery}) | <strong>Faktura NIP:</strong> ${o.nip}</p>
        <div style="font-size:0.75rem; color:var(--accent); margin-top:0.45rem; background:rgba(0,0,0,0.3); padding:0.5rem 0.75rem; border-radius:8px;">
          <strong>Zakupione pozycje:</strong><br>
          ${(o.items || []).map(i => `• ${i.name} [${i.variant || 'Standard'}] — ${i.qty || 1} szt. x ${i.price} PLN`).join('<br>')}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:0.72rem; color:var(--text-muted);">Uwagi: ${o.notes}</span>
          <strong style="font-size:1.05rem; color:var(--gold);">Suma: ${o.total} PLN</strong>
        </div>
      </div>
    `).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2; border-color:var(--gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1.2rem;">
          <h2 style="margin:0; color:var(--gold);">⚙️ PANEL ADMINISTRATORA SKLEPU & FORUM (TGN CMS)</h2>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button type="button" class="btn-action" style="width:auto; margin:0; padding:0.45rem 0.9rem; background:var(--accent); color:#052e16;" onclick="window.app.switchTab('sklep'); setTimeout(() => window.StoreComponent && window.StoreComponent.startAddNewProduct(), 60);">
              ➕ Dodaj nowy produkt do sklepu
            </button>
            <button type="button" class="btn-action" style="width:auto; margin:0; padding:0.45rem 0.9rem; border-color:var(--gold); color:var(--gold);" onclick="window.app.exportDatabaseJson()">
              💾 Eksportuj bazę JSON (Backup)
            </button>
            <label class="btn-action" style="width:auto; margin:0; padding:0.45rem 0.9rem; border-color:#38bdf8; color:#38bdf8; cursor:pointer; display:inline-block;">
              📂 Wgraj bazę JSON
              <input type="file" accept=".json" style="display:none;" onchange="window.app.importDatabaseJson(event)">
            </label>
          </div>
        </div>

        <div class="forum-stats-bar">
          <div><div class="forum-stat-num">${(window.AppData.storeProducts || []).length}</div><div class="forum-stat-lbl">Produktów w katalogu</div></div>
          <div><div class="forum-stat-num" style="color:var(--gold);">${orders.length}</div><div class="forum-stat-lbl">Złożonych zamówień</div></div>
          <div><div class="forum-stat-num">${totalRevenue} PLN</div><div class="forum-stat-lbl">Przychód ze sprzedaży</div></div>
          <div><div class="forum-stat-num" style="color:#38bdf8;">${subscribers.length}</div><div class="forum-stat-lbl">Subskrybentów Newslettera</div></div>
        </div>

        <h3 style="color:var(--accent); font-size:0.88rem; margin-bottom:0.65rem; text-transform:uppercase;">📦 Lista Zamówień Klientów (${orders.length})</h3>
        ${ordersHTML}

        <h3 style="color:var(--accent); font-size:0.88rem; margin:1.2rem 0 0.65rem; text-transform:uppercase;">📩 Baza adresów E-mail z Newslettera (${subscribers.length})</h3>
        <div style="background:rgba(0,0,0,0.3); padding:0.85rem; border-radius:10px; font-size:0.78rem; color:var(--text-main);">
          ${subscribers.length > 0 ? subscribers.join(' • ') : 'Brak zapisanych subskrybentów.'}
        </div>
      </section>
    `;
  }
};

// 4. Moduł Logowania i Autoryzacji (window.auth)
window.auth = {
  switchAuthMode: function(mode) {
    const loginBtn = document.getElementById('tabLoginBtn');
    const regBtn = document.getElementById('tabRegisterBtn');
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    if (loginBtn) loginBtn.classList.toggle('active', mode === 'login');
    if (regBtn) regBtn.classList.toggle('active', mode === 'register');
    if (loginForm) loginForm.style.display = mode === 'login' ? 'block' : 'none';
    if (regForm) regForm.style.display = mode === 'register' ? 'block' : 'none';
  },

  loginDemo: function() { window.auth.loginAsClient(); },

  loginAsClient: function() {
    window.ensureAllPortalDataReady();
    window.AppData.user = { ...window.DefaultUser, role: 'CLIENT' };
    try { localStorage.setItem('tgn_user', JSON.stringify(window.AppData.user)); } catch (e) {}
    window.auth.enterApp('Witaj w portalu TGN, ' + window.AppData.user.name + '!');
  },

  loginAsAdmin: function() {
    window.ensureAllPortalDataReady();
    window.AppData.user = { ...window.DefaultUser, name: "Właściciel TGN (Admin)", email: "admin@tgngolf.pl", role: 'ADMIN' };
    try { localStorage.setItem('tgn_user', JSON.stringify(window.AppData.user)); } catch (e) {}
    window.auth.enterApp('🔑 Zalogowano w trybie Właściciela / Administratora!');
  },

  handleLogin: function() {
    window.ensureAllPortalDataReady();
    const emailEl = document.getElementById('loginEmail');
    const passEl = document.getElementById('loginPass');
    const email = emailEl ? emailEl.value.trim() : 'marek.kowalski@tgngolf.pl';
    const pass = passEl ? passEl.value.trim() : '********';
    if (!email) {
      window.app.showToast('Wpisz adres e-mail!');
      return;
    }
    const isAdmin = email.toLowerCase().includes('admin') || pass === 'admin123';
    const nameFromEmail = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
    window.AppData.user = {
      ...window.DefaultUser,
      name: isAdmin ? 'Administrator TGN' : (nameFromEmail || window.DefaultUser.name),
      email: email,
      role: isAdmin ? 'ADMIN' : 'CLIENT'
    };
    try { localStorage.setItem('tgn_user', JSON.stringify(window.AppData.user)); } catch (e) {}
    window.auth.enterApp('Witaj w TGN Global Golf, ' + window.AppData.user.name + '!');
  },

  handleRegister: function() {
    window.ensureAllPortalDataReady();
    const name = document.getElementById('regName')?.value.trim() || 'Nowy Gracz';
    const hcp = parseFloat(document.getElementById('regHcp')?.value) || 24.0;
    const city = document.getElementById('regCity')?.value.trim() || 'Warszawa';
    const email = document.getElementById('regEmail')?.value.trim() || 'gracz@tgngolf.pl';

    const level = hcp <= 10 ? 'Zaawansowany' : (hcp <= 20 ? 'Średniozaawansowany' : 'Początkujący');
    window.AppData.user = { ...window.DefaultUser, name, email, hcp, level, city, role: 'CLIENT' };
    try { localStorage.setItem('tgn_user', JSON.stringify(window.AppData.user)); } catch (e) {}
    window.auth.enterApp('Utworzono konto gracza: ' + name);
  },

  toggleAdminRoleQuick: function() {
    window.ensureAllPortalDataReady();
    if (!window.AppData.user) window.AppData.user = { ...window.DefaultUser };
    window.AppData.user.role = window.AppData.user.role === 'ADMIN' ? 'CLIENT' : 'ADMIN';
    try { localStorage.setItem('tgn_user', JSON.stringify(window.AppData.user)); } catch (e) {}
    window.auth.updateHeaderBar();

    if (window.AppData.user.role === 'ADMIN') {
      window.app.switchTab('admin');
      window.app.showToast('🔑 Włączono tryb Administratora – otwarto Panel CMS!');
    } else {
      window.app.switchTab('home');
      window.app.showToast('👤 Przełączono na widok Klienta.');
    }
  },

  enterApp: function(msg) {
    window.ensureAllPortalDataReady();
    const authScr = document.getElementById('authScreen');
    const navBar = document.getElementById('mainNav');
    const appCont = document.getElementById('appContainer');
    const footer = document.getElementById('mainFooter');

    if (authScr) authScr.style.display = 'none';
    if (navBar) navBar.style.display = 'flex';
    if (appCont) appCont.style.display = 'grid';
    if (footer) footer.style.display = 'block';

    window.auth.updateHeaderBar();

    const host = window.location.hostname.toLowerCase();
    const hash = window.location.hash.replace('#', '').toLowerCase();

    let startTab = 'home';
    if (host.startsWith('sklep.') || hash === 'sklep') startTab = 'sklep';
    else if (host.startsWith('forum.') || hash === 'forum') startTab = 'forum';
    else if (['home', 'sklep', 'forum', 'profile', 'pola', 'wydarzenia', 'cpo', 'marketplace', 'admin'].includes(hash)) {
      startTab = hash;
    }

    window.app.switchTab(startTab);
    if (msg) window.app.showToast(msg);
  },

  updateHeaderBar: function() {
    window.ensureAllPortalDataReady();
    const cartCount = (window.AppData.cart || []).reduce((s, i) => s + (i.qty || 1), 0);
    const isAdmin = window.AppData.user && window.AppData.user.role === 'ADMIN';
    const adminNavBtn = document.getElementById('navAdminBtn');
    if (adminNavBtn) adminNavBtn.style.display = isAdmin ? 'inline-block' : 'none';

    const userFirstName = (window.AppData.user && window.AppData.user.name) ? window.AppData.user.name.split(' ')[0] : 'Marek';
    const headerInfo = document.getElementById('headerRightInfo');
    if (headerInfo) {
      headerInfo.innerHTML = `
        <button type="button" class="btn-mini-tool" style="border-color:${isAdmin ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}; color:${isAdmin ? 'var(--gold)' : 'var(--text-muted)'}; font-weight:800;" onclick="window.auth.toggleAdminRoleQuick()">
          ${isAdmin ? '⚙️ Tryb: ADMIN' : '👤 Widok: KLIENT'}
        </button>
        <span style="font-size: 0.76rem; color: var(--gold); font-weight:800; cursor:pointer; background:rgba(250,204,21,0.14); padding:4px 10px; border-radius:6px; border:1px solid rgba(250,204,21,0.45);" onclick="window.StoreComponent && window.StoreComponent.openCartDrawer()">
          🛒 Koszyk (${cartCount})
        </span>
        <span style="font-size: 0.72rem; color: var(--accent); font-weight:700;">● ${userFirstName}</span>
        <button type="button" class="btn-logout" onclick="window.auth.logout()">Wyloguj</button>
      `;
    }

    if (typeof window.StoreComponent !== 'undefined' && window.StoreComponent.syncGlobalCartDrawer) {
      window.StoreComponent.syncGlobalCartDrawer();
    }
  },

  logout: function() {
    try { localStorage.removeItem('tgn_user'); } catch (e) {}
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('mainNav').style.display = 'none';
    document.getElementById('appContainer').style.display = 'none';
    const footer = document.getElementById('mainFooter');
    if (footer) footer.style.display = 'none';
    const promoOverlay = document.getElementById('tgnGlobalPromoOverlay');
    if (promoOverlay) promoOverlay.style.display = 'none';
    const cartBackdrop = document.getElementById('tgnCartDrawerBackdrop');
    if (cartBackdrop) cartBackdrop.style.display = 'none';
    const fab = document.getElementById('tgnFloatingCartBtn');
    if (fab) fab.style.display = 'none';
    document.getElementById('headerRightInfo').innerHTML = `<span style="font-size: 0.7rem; color: var(--text-muted);">Sklep Pro Shop & Społeczność</span>`;
    window.app.showToast('Wylogowano z portalu TGN');
  }
};

// 5. Główny router i akcje aplikacji (window.app)
window.app = {
  previewTimer: null,

  quickSearchFromHome: function() {
    const q = document.getElementById('homeQuickSearch')?.value.trim() || '';
    window.ensureAllPortalDataReady();
    if (window.AppData.storeState) {
      window.AppData.storeState.search = q;
      window.AppData.storeState.category = 'ALL';
    }
    window.app.switchTab('sklep');
  },

  switchTab: function(tabName) {
    window.ensureAllPortalDataReady();
    const container = document.getElementById('appContainer');
    if (!container) return;

    const promoOverlay = document.getElementById('tgnGlobalPromoOverlay');
    if (promoOverlay && tabName !== 'sklep') promoOverlay.style.display = 'none';

    try {
      if (tabName === 'profile' && typeof ProfileAndBagComponent !== 'undefined') {
        container.style.gridTemplateColumns = "1fr 1.3fr";
        container.innerHTML = ProfileAndBagComponent.render();
      } else {
        container.style.gridTemplateColumns = "1fr";
        if (tabName === 'home') container.innerHTML = window.HomeComponent.render();
        else if (tabName === 'sklep' && typeof StoreComponent !== 'undefined') container.innerHTML = StoreComponent.render();
        else if (tabName === 'forum' && typeof ForumComponent !== 'undefined') container.innerHTML = ForumComponent.render();
        else if (tabName === 'pola' && typeof PolishCoursesComponent !== 'undefined') container.innerHTML = PolishCoursesComponent.render();
        else if (tabName === 'wydarzenia' && typeof Events2027Component !== 'undefined') container.innerHTML = Events2027Component.render();
        else if (tabName === 'cpo' && typeof CpoComponent !== 'undefined') container.innerHTML = CpoComponent.render();
        else if (tabName === 'marketplace' && typeof MarketplaceComponent !== 'undefined') container.innerHTML = MarketplaceComponent.render();
        else if (tabName === 'admin') container.innerHTML = window.AdminDashboardComponent.render();
        else if (tabName === 'chat' && typeof ChatComponent !== 'undefined') {
          container.innerHTML = ChatComponent.render();
          setTimeout(window.app.scrollChatToBottom, 50);
        } else {
          container.innerHTML = window.HomeComponent.render();
        }
      }
    } catch (err) {
      console.error('Błąd renderowania zakładki:', err);
      container.innerHTML = window.HomeComponent.render();
    }

    document.querySelectorAll('#mainNav button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    if (typeof StoreComponent !== 'undefined' && StoreComponent.syncGlobalCartDrawer) {
      StoreComponent.syncGlobalCartDrawer();
    }
  },

  changeOrderStatus: function(orderIdx) {
    try {
      const orders = JSON.parse(localStorage.getItem('tgn_orders_db') || '[]');
      if (!orders[orderIdx]) return;
      const statuses = ['Opłacone (W przygotowaniu)', 'Wysłane Kurierem DPD', 'Gotowe do odbioru (TrackMan)', 'Zrealizowane ✓'];
      const currIdx = statuses.indexOf(orders[orderIdx].status);
      orders[orderIdx].status = statuses[(currIdx + 1) % statuses.length];
      localStorage.setItem('tgn_orders_db', JSON.stringify(orders));
      window.app.switchTab('admin');
      window.app.showToast(`Zmieniono status zamówienia #${orders[orderIdx].orderId} na: ${orders[orderIdx].status}`);
    } catch (e) {}
  },

  exportDatabaseJson: function() {
    const dbDump = {
      exportedAt: new Date().toISOString(),
      products: window.AppData.storeProducts,
      forumPosts: window.AppData.forumPosts,
      orders: JSON.parse(localStorage.getItem('tgn_orders_db') || '[]'),
      newsletter: JSON.parse(localStorage.getItem('tgn_newsletter_list') || '[]')
    };
    const blob = new Blob([JSON.stringify(dbDump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tgn_baza_sklep_forum_${Date.now()}.json`;
    a.click();
    window.app.showToast('💾 Pobrano pełną bazę danych sklepu i forum (.json)!');
  },

  importDatabaseJson: function(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.products && Array.isArray(parsed.products)) {
          window.AppData.storeProducts = parsed.products;
          localStorage.setItem('tgn_custom_store_products', JSON.stringify(parsed.products));
        }
        if (parsed.forumPosts && Array.isArray(parsed.forumPosts)) {
          window.AppData.forumPosts = parsed.forumPosts;
          window.saveForumToDB();
        }
        if (parsed.orders && Array.isArray(parsed.orders)) {
          localStorage.setItem('tgn_orders_db', JSON.stringify(parsed.orders));
        }
        window.app.switchTab('admin');
        window.app.showToast('✅ Pomyślnie wgrano bazę produktów i postów z pliku JSON!');
      } catch (err) {
        window.app.showToast('⚠️ Błąd odczytu pliku JSON!');
      }
    };
    reader.readAsText(file);
  },

  openLegalModal: function(docType) {
    const titleEl = document.getElementById('legalModalTitle');
    const bodyEl = document.getElementById('legalModalBody');
    const modal = document.getElementById('legalModalOverlay');
    if (!titleEl || !bodyEl || !modal) return;

    if (docType === 'REGULAMIN') {
      titleEl.textContent = '📜 Regulamin Sklepu Internetowego i Forum TGN Global Golf';
      bodyEl.innerHTML = `<p><strong>§1. Postanowienia ogólne</strong><br>Sklep internetowy TGN Global Golf prowadzi sprzedaż fabrycznie nowego sprzętu golfowego, używanych kijów golfowych w programie CPO (Certified Pre-Owned) oraz piłek golfowych.</p><br><p><strong>§2. Gwarancja CPO</strong><br>Na każdy używany kij golfowy w dziale CPO udzielana jest 12-miesięczna rękojmia serwisowa TGN.</p>`;
    } else if (docType === 'ZWROTY') {
      titleEl.textContent = '🔄 Prawo do odstąpienia od umowy (Zwroty 14 dni)';
      bodyEl.innerHTML = `<p>Konsument ma prawo odstąpić od umowy zakupu zawartej na odległość w terminie 14 dni od otrzymania przesyłki (z wyłączeniem produktów personalizowanych, np. piłek z indywidualnym nadrukiem UV).</p>`;
    } else if (docType === 'RODO') {
      titleEl.textContent = '🔒 Polityka Prywatności i Ochrony Danych (RODO)';
      bodyEl.innerHTML = `<p>Dane osobowe przetwarzane są wyłącznie w celu realizacji zamówień sklepowych, obsługi konta gracza na forum oraz wysyłki zamówionego Newslettera.</p>`;
    } else {
      titleEl.textContent = '📞 Kontakt, Serwis Golfowy & Centrum Fittingu';
      bodyEl.innerHTML = `<p><strong>Infolinia PGA Pro Shop:</strong><br>E-mail: sklep@tgngolf.pl | Tel.: +48 600 000 000 (Pon–Pt 9:00–18:00)</p>`;
    }
    modal.style.display = 'flex';
  },

  closeLegalModal: function() {
    const modal = document.getElementById('legalModalOverlay');
    if (modal) modal.style.display = 'none';
  },

  nextWebSearchPhoto: function(imgElementId, clubName) {
    const imgEl = document.getElementById(imgElementId);
    if (!imgEl || typeof ClubImageEngine === 'undefined') return;
    ClubImageEngine.searchVariantIndex += 1;
    const nextPhotoUrl = ClubImageEngine.buildDirectSearchPhotoUrl(clubName, ClubImageEngine.searchVariantIndex);
    ClubImageEngine.cache[clubName] = nextPhotoUrl;
    imgEl.src = nextPhotoUrl;
    window.app.showToast(`📷 Pobrano kolejne zdjęcie dla: ${clubName}`);
  },

  openGoogleImages: function(clubName) {
    if (typeof ClubImageEngine === 'undefined') return;
    const gUrl = ClubImageEngine.getGoogleImagesUrl(clubName);
    window.open(gUrl, '_blank', 'noopener,noreferrer');
  },

  updateLiveClubPreview: function(val, nextVariant = false) {
    clearTimeout(window.app.previewTimer);
    window.app.previewTimer = setTimeout(() => {
      const imgEl = document.getElementById('livePreviewClubImg');
      if (!imgEl || typeof ClubImageEngine === 'undefined') return;
      if (nextVariant) ClubImageEngine.searchVariantIndex += 1;
      const modelText = (val && val.trim().length > 2) ? val.trim() : "Ping G430 Max Driver";
      imgEl.src = ClubImageEngine.buildDirectSearchPhotoUrl(modelText, ClubImageEngine.searchVariantIndex);
    }, 250);
  },

  filterCourses: function(filterKey) {
    window.AppData.activeCourseFilter = filterKey;
    window.app.switchTab('pola');
  },

  searchCourses: function(val) {
    window.AppData.courseSearchQuery = val;
    window.app.switchTab('pola');
    const input = document.getElementById('courseSearchInput');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  },

  logRoundAndRedirect: function(courseName, bookingUrl) {
    const score = Math.floor(Math.random() * 6) + 79;
    window.AppData.user.lastRound = `${score} (${courseName})`;
    try { localStorage.setItem('tgn_user', JSON.stringify(window.AppData.user)); } catch (e) {}
    window.app.showToast(`Zapisano rundę (${score} ud.)! Przekierowanie do: ${courseName}...`);
    if (bookingUrl) window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  },

  openBookingSite: function(courseName, bookingUrl) {
    window.app.showToast(`Otwieranie rezerwacji Tee Time: ${courseName}...`);
    if (bookingUrl) window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  },

  filterEvents: function(cat) {
    window.AppData.activeEventFilter = cat;
    window.app.switchTab('wydarzenia');
  },

  toggleEventRegistration: function(evId) {
    const ev = (window.AppData.events2027 || []).find(e => e.id === evId);
    if (!ev) return;
    ev.registered = !ev.registered;
    ev.spotsLeft += ev.registered ? -1 : 1;
    window.auth.updateHeaderBar();
    window.app.switchTab('wydarzenia');
    window.app.showToast(ev.registered ? `Zapisano na: ${ev.title}` : `Wypisano z wydarzenia: ${ev.title}`);
  },

  filterStore: function(cat) {
    if (typeof StoreComponent !== 'undefined') StoreComponent.setCategory(cat);
  },
  addToCart: function(prodId, useTradeIn) {
    if (typeof StoreComponent !== 'undefined') StoreComponent.addItem(prodId, useTradeIn);
  },
  checkoutStore: function() {
    if (typeof StoreComponent !== 'undefined') StoreComponent.openCartDrawer();
  },

  toggleAddClubLive: function() {
    const box = document.getElementById('addClubLiveBox');
    if (box) box.style.display = box.style.display === 'block' ? 'none' : 'block';
  },

  addClubWithLivePhoto: function() {
    const nameInput = document.getElementById('newClubName');
    const specInput = document.getElementById('newClubSpec');
    const valInput = document.getElementById('newClubVal');
    const customImgInput = document.getElementById('newClubCustomImg');

    const name = nameInput ? nameInput.value.trim().toUpperCase() : '';
    if (!name) {
      window.app.showToast('Wpisz nazwę modelu kija!');
      return;
    }

    const loft = (specInput && specInput.value.trim()) ? specInput.value.trim() : "Specyfikacja Custom Fit";
    const val = (valInput && valInput.value.trim()) ? valInput.value.trim() : "1 950 PLN";
    const customUrl = (customImgInput && customImgInput.value.trim()) ? customImgInput.value.trim() : "";
    const finalImg = customUrl || (typeof ClubImageEngine !== 'undefined' ? ClubImageEngine.buildDirectSearchPhotoUrl(name, ClubImageEngine.searchVariantIndex) : '');

    window.AppData.bag.unshift({
      id: Date.now(), name, loft, val, cpoOffer: "1 500 PLN", speed: "126 mph", smash: "1.44", attack: "+1.5°", cond: "Nowy", imgUrl: finalImg
    });
    window.app.switchTab('profile');
    window.app.showToast('Dodano kij do Twojej torby: ' + name);
  },

  openPhotoZoom: function(title, imgUrl, meta) {
    if (typeof ClubImageEngine !== 'undefined') ClubImageEngine.currentModalClub = title;
    document.getElementById('zoomClubTitle').textContent = title;
    document.getElementById('zoomClubImg').src = imgUrl;
    document.getElementById('zoomClubMeta').textContent = meta;
    document.getElementById('photoZoomModal').style.display = 'flex';
  },

  regenerateModalAiPhoto: function() {
    if (typeof ClubImageEngine === 'undefined' || !ClubImageEngine.currentModalClub) return;
    ClubImageEngine.searchVariantIndex += 1;
    const newUrl = ClubImageEngine.buildDirectSearchPhotoUrl(ClubImageEngine.currentModalClub, ClubImageEngine.searchVariantIndex);
    ClubImageEngine.cache[ClubImageEngine.currentModalClub] = newUrl;
    document.getElementById('zoomClubImg').src = newUrl;
    window.app.showToast('📷 Załadowano kolejne zdjęcie tego modelu!');
  },

  openGoogleImagesForModal: function() {
    if (typeof ClubImageEngine === 'undefined' || !ClubImageEngine.currentModalClub) return;
    window.app.openGoogleImages(ClubImageEngine.currentModalClub);
  },

  closePhotoZoom: function() { document.getElementById('photoZoomModal').style.display = 'none'; },
  openAiModal: function() { document.getElementById('aiModalOverlay').style.display = 'flex'; },
  closeAiModal: function() { document.getElementById('aiModalOverlay').style.display = 'none'; },

  filterForum: function(catKey) {
    window.AppData.activeForumFilter = catKey;
    window.app.switchTab('forum');
  },

  toggleNewThread: function() {
    const box = document.getElementById('newThreadBox');
    if (box) box.style.display = box.style.display === 'block' ? 'none' : 'block';
  },

  createThread: function() {
    const catKey = document.getElementById('newThreadCat')?.value || 'EQUIPMENT';
    const title = document.getElementById('newThreadTitle')?.value.trim();
    const content = document.getElementById('newThreadContent')?.value.trim();
    if (!title || !content) return;

    window.AppData.forumPosts.unshift({
      id: Date.now(), pinned: false, catKey, category: "⚙️ Dyskusja Społeczności TGN", title,
      author: window.AppData.user.name, badge: "HCP " + window.AppData.user.hcp, badgeClass: "badge-vet",
      date: new Date().toLocaleDateString('pl-PL'), views: "1", likes: 1, content, comments: []
    });
    window.saveForumToDB();
    window.AppData.activeForumFilter = "ALL";
    window.app.switchTab('forum');
    window.app.showToast('Opublikowano i zapisano nowy wątek na forum!');
  },

  likePost: function(id) {
    const post = (window.AppData.forumPosts || []).find(p => p.id === id);
    if (post) {
      post.likes += 1;
      window.saveForumToDB();
      window.app.switchTab('forum');
      window.app.showToast('Doceniono wpis (+1 pkt reputacji)');
    }
  },

  addComment: function(id) {
    const input = document.getElementById('commInput_' + id);
    const text = input ? input.value.trim() : '';
    if (!text) return;
    const post = (window.AppData.forumPosts || []).find(p => p.id === id);
    if (post) {
      post.comments.push({
        author: window.AppData.user.name,
        badge: "HCP " + window.AppData.user.hcp,
        badgeClass: "badge-vet",
        date: "Dzisiaj",
        text
      });
      window.saveForumToDB();
      window.app.switchTab('forum');
      window.app.showToast('Dodano i zapisano odpowiedź w wątku!');
    }
  },

  openChat: function(sellerName) {
    window.app.switchTab('chat');
    window.app.showToast('Otwarto czat z: ' + sellerName);
  },

  sendChatMessage: function() {
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;
    window.AppData.chatMessages.push({ sender: window.AppData.user.name, text: input.value.trim(), type: "outgoing" });
    input.value = '';
    document.getElementById('appContainer').innerHTML = ChatComponent.render();
    window.app.scrollChatToBottom();
  },

  scrollChatToBottom: function() {
    const box = document.getElementById('chatMsgs');
    if (box) box.scrollTop = box.scrollHeight;
  },

  showToast: function(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2800);
  }
};

var auth = window.auth;
var app = window.app;
var HomeComponent = window.HomeComponent;
var AdminDashboardComponent = window.AdminDashboardComponent;

document.addEventListener('DOMContentLoaded', () => {
  window.ensureAllPortalDataReady();

  document.querySelectorAll('#mainNav button').forEach(btn => {
    btn.addEventListener('click', () => window.app.switchTab(btn.dataset.tab));
  });

  const logoBtn = document.getElementById('logoBtn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => {
      if (localStorage.getItem('tgn_user')) window.app.switchTab('home');
    });
  }

  const savedSession = localStorage.getItem('tgn_user');
  if (savedSession) {
    try {
      window.AppData.user = JSON.parse(savedSession);
      if (!window.AppData.user.role) window.AppData.user.role = 'CLIENT';
      window.auth.enterApp();
    } catch (e) {}
  }
});
