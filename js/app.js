/* =========================================================================
   GŁÓWNY KONTROLER PRODUKCYJNY TGN v27.0 (js/app.js)
   - Wbudowany interaktywny Asystent AI + Live Czat bezpośrednio na Stronie Głównej
   - Kompaktowy i przejrzysty układ Bento Grid na PC i telefonie
   ========================================================================= */

(function injectHomeV27Styles() {
  ['tgnHomeV25Styles', 'tgnHomeV26Styles'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
  if (document.getElementById('tgnHomeV27Styles')) return;

  const style = document.createElement('style');
  style.id = 'tgnHomeV27Styles';
  style.textContent = `
    .home-compact-wrap {
      max-width: 1220px;
      margin: 0 auto;
      padding: 1.1rem 1.3rem !important;
    }
    .home-live-ticker {
      display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
      background: rgba(4, 12, 15, 0.9); border: 1px solid rgba(74, 222, 128, 0.28);
      border-radius: 10px; padding: 0.4rem 0.85rem; margin-bottom: 0.85rem; font-size: 0.7rem;
      overflow-x: auto; white-space: nowrap; scrollbar-width: none;
    }
    .home-live-ticker::-webkit-scrollbar { display: none; }
    .ticker-dot {
      width: 7px; height: 7px; border-radius: 50%; background: #4ade80;
      box-shadow: 0 0 8px #4ade80; display: inline-block; margin-right: 5px;
    }

    /* Układ Hero: Lewy Showcase + Prawy Hub (Asystent AI & Czat Live) */
    .home-hero-bento {
      display: grid; grid-template-columns: 1.25fr 1fr; gap: 0.9rem; margin-bottom: 0.95rem; align-items: stretch;
    }
    .hero-main-showcase {
      background: linear-gradient(125deg, rgba(6, 18, 22, 0.94) 40%, rgba(10, 38, 28, 0.8) 100%),
                  url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80') center/cover no-repeat;
      border: 1px solid rgba(114, 214, 150, 0.38); border-radius: 14px; padding: 1.15rem 1.25rem;
      display: flex; flex-direction: column; justify-content: space-between; gap: 0.7rem;
    }
    .hero-mini-telemetry {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem;
      background: rgba(0, 0, 0, 0.55); border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px; padding: 0.45rem 0.6rem; text-align: center;
    }
    .hero-mini-telemetry div span { display: block; font-size: 0.54rem; color: var(--text-muted); text-transform: uppercase; }
    .hero-mini-telemetry div strong { font-size: 0.78rem; color: var(--accent); font-weight: 800; }

    /* Prawa karta: Interaktywny Hub AI & Live Czat */
    .home-ai-chat-hub {
      background: linear-gradient(155deg, rgba(12, 28, 34, 0.97), rgba(6, 14, 18, 0.99));
      border: 1.5px solid rgba(56, 189, 248, 0.5); border-radius: 14px; padding: 0.85rem 1rem;
      display: flex; flex-direction: column; justify-content: space-between;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.55), inset 0 0 20px rgba(56, 189, 248, 0.08);
    }
    .hub-mode-tabs {
      display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem;
      background: rgba(0, 0, 0, 0.45); padding: 0.25rem; border-radius: 9px;
      border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 0.6rem;
    }
    .hub-tab-btn {
      background: transparent; border: none; color: var(--text-muted);
      padding: 0.38rem 0.5rem; border-radius: 6px; font-size: 0.72rem; font-weight: 800;
      cursor: pointer; transition: 0.2s; display: flex; align-items: center; justify-content: center; gap: 5px;
    }
    .hub-tab-btn.active.ai-mode { background: var(--blue); color: #041e2b; }
    .hub-tab-btn.active.chat-mode { background: var(--accent); color: #052e16; }

    .hub-messages-stream {
      height: 120px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.4rem;
      padding-right: 4px; margin-bottom: 0.5rem; scrollbar-width: thin;
    }
    .hub-msg-bubble {
      font-size: 0.72rem; line-height: 1.38; padding: 0.45rem 0.7rem; border-radius: 9px; max-width: 94%;
    }
    .hub-msg-bubble.bot {
      background: rgba(56, 189, 248, 0.12); border-left: 3px solid var(--blue); color: #f1f5f9; align-self: flex-start;
    }
    .hub-msg-bubble.incoming {
      background: rgba(255, 255, 255, 0.07); border-left: 3px solid var(--gold); color: #f1f5f9; align-self: flex-start;
    }
    .hub-msg-bubble.user {
      background: rgba(74, 222, 128, 0.18); border-right: 3px solid var(--accent); color: var(--accent); align-self: flex-end;
    }
    .hub-quick-chips {
      display: flex; gap: 0.35rem; overflow-x: auto; padding-bottom: 0.35rem; margin-bottom: 0.45rem;
      white-space: nowrap; scrollbar-width: none;
    }
    .hub-quick-chips::-webkit-scrollbar { display: none; }
    .hub-input-bar {
      display: flex; gap: 0.4rem;
    }
    .hub-input-bar input {
      flex: 1; background: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 7px; padding: 0.42rem 0.65rem; color: #fff; font-size: 0.73rem; outline: none;
    }
    .hub-input-bar input:focus { border-color: var(--blue); }
    .hub-input-bar button {
      background: var(--blue); color: #041e2b; border: none; border-radius: 7px;
      padding: 0 0.85rem; font-size: 0.72rem; font-weight: 800; cursor: pointer; white-space: nowrap;
    }

    /* 3 Zgrabne Bramy Portalu (Sklep / Forum / Kokpit) */
    .home-portals-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.85rem; margin-bottom: 1.1rem;
    }
    .portal-gate-card {
      border-radius: 14px; padding: 0.95rem 1.05rem; display: flex; flex-direction: column;
      justify-content: space-between; cursor: pointer; transition: 0.22s ease;
      position: relative; overflow: hidden; min-height: 138px;
    }
    .portal-gate-card:hover { transform: translateY(-3px); }
    .portal-gate-card.gate-shop {
      background: linear-gradient(160deg, rgba(8, 24, 20, 0.9) 30%, rgba(6, 16, 20, 0.96) 95%),
                  url('https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=600&q=80') center/cover no-repeat;
      border: 1.5px solid var(--accent);
    }
    .portal-gate-card.gate-forum {
      background: linear-gradient(160deg, rgba(8, 22, 34, 0.9) 30%, rgba(6, 14, 22, 0.96) 95%),
                  url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&q=80') center/cover no-repeat;
      border: 1.5px solid var(--blue);
    }
    .portal-gate-card.gate-cockpit {
      background: linear-gradient(160deg, rgba(28, 24, 10, 0.9) 30%, rgba(8, 14, 18, 0.96) 95%),
                  url('https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=600&q=80') center/cover no-repeat;
      border: 1.5px solid var(--gold);
    }

    /* Kompaktowa Karuzela Produktów Spotlight */
    .home-spotlight-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 1.1rem;
    }
    .spotlight-prod-card {
      background: rgba(255, 255, 255, 0.035); border: 1px solid rgba(255, 255, 255, 0.09);
      border-radius: 12px; padding: 0.7rem; display: flex; flex-direction: column; justify-content: space-between;
      transition: 0.2s; cursor: pointer;
    }
    .spotlight-prod-card:hover { border-color: var(--accent); background: rgba(74, 222, 128, 0.05); }
    .spotlight-img-wrap {
      width: 100%; height: 92px; background: #fff; border-radius: 8px; margin-bottom: 0.45rem;
      display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;
    }
    .spotlight-img-wrap img { width: 100%; height: 100%; object-fit: contain; padding: 4px; }

    /* Dolna sekcja: Forum + Skróty */
    .home-bottom-bento {
      display: grid; grid-template-columns: 1.15fr 1fr; gap: 0.95rem;
    }
    .home-forum-row {
      background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
      border-left: 3px solid var(--blue); border-radius: 10px; padding: 0.55rem 0.75rem;
      margin-bottom: 0.45rem; cursor: pointer; transition: 0.2s;
    }
    .home-forum-row:hover { background: rgba(56, 189, 248, 0.08); border-color: var(--blue); }

    @media (max-width: 1024px) {
      .home-hero-bento, .home-portals-grid, .home-bottom-bento { grid-template-columns: 1fr; }
      .home-spotlight-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .home-compact-wrap { padding: 0.75rem !important; }
      .hero-main-showcase { padding: 0.9rem; }
      .hero-mini-telemetry { grid-template-columns: repeat(2, 1fr); }
      .portal-gate-card { min-height: 110px; padding: 0.8rem 0.9rem; }
      .portal-gate-desc { display: none; }
      .home-spotlight-grid { grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
      .spotlight-img-wrap { height: 80px; }
    }
  `;
  document.head.appendChild(style);
})();

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
  if (typeof AppData !== 'undefined') {
    window.AppData = AppData;
  } else if (typeof window.AppData === 'undefined') {
    window.AppData = {
      user: { ...window.DefaultUser },
      cart: [], storeProducts: [], forumPosts: [], events2027: [], bag: [], chatMessages: []
    };
  }

  if (typeof StoreComponent !== 'undefined' && StoreComponent.ensureStoreDataInitialized) {
    StoreComponent.ensureStoreDataInitialized();
  }

  // Stan dla widgetu AI & Live Czat na Stronie Głównej
  if (!window.AppData.homeHubState) {
    window.AppData.homeHubState = {
      activeMode: 'AI', // 'AI' | 'CHAT'
      aiMessages: [
        {
          sender: "TGN AI Concierge",
          type: "bot",
          text: "Cześć! Jestem Twoim doradcą AI na stronie głównej. Mogę dobrać sprzęt pod Twój HCP 12.4, znaleźć okazje w komisie CPO lub sprawdzić pola w Polsce!"
        }
      ]
    };
  }

  if (!window.AppData.chatMessages || window.AppData.chatMessages.length === 0) {
    window.AppData.chatMessages = [
      { sender: "Tomek_PGA (Support Sklepu)", text: "Witamy na czacie TGN! Dzisiaj wysyłamy zamówienia kurierem DPD do godz. 16:00.", type: "incoming" },
      { sender: "Janusz_G (HCP 9.4)", text: "Ktoś gra jutro rano w Rajszewie lub na Modrym Lesie?", type: "incoming" }
    ];
  }

  if (!window.AppData.forumPosts || window.AppData.forumPosts.length === 0) {
    window.AppData.forumPosts = [
      {
        id: 501, pinned: true, catKey: "EQUIPMENT", category: "🏌️ Sprzęt & Fitting",
        title: "TaylorMade Qi10 Max vs Ping G430 Max 10K – testy przy 95-100 mph",
        author: "Tomek_PGA_Fitter", badge: "PRO FITTER", badgeClass: "badge-pro",
        date: "Dzisiaj", views: "1 420", likes: 38,
        content: "Przetestowaliśmy oba drivery 10K MOI na 25 graczach z HCP 8-18.",
        comments: [{ author: "Marek_WWA", badge: "HCP 12.4", badgeClass: "badge-vet", date: "Dzisiaj", text: "U mnie Qi10 dał +6m carry!" }]
      },
      {
        id: 502, pinned: false, catKey: "COURSES", category: "⛳ Pola w Polsce",
        title: "Stan greenów na Modrym Lesie i Binowo Park – raport (10.5 ft)",
        author: "Krzysztof_Szczecin", badge: "HCP 8.2", badgeClass: "badge-og",
        date: "Wczoraj", views: "890", likes: 24,
        content: "Greeny są w turniejowej kondycji.",
        comments: [{ author: "Anna_Golf", badge: "HCP 16.0", badgeClass: "badge-vet", date: "Wczoraj", text: "Potwierdzam!" }]
      },
      {
        id: 503, pinned: false, catKey: "TECHNIQUE", category: "🎯 Technika & WHS",
        title: "Jak zamknąć lukę między PW (43°) a SW (56°)? Dobór Gap Wedge 52°",
        author: "Michal_Coach", badge: "PGA COACH", badgeClass: "badge-pro",
        date: "2 dni temu", views: "640", likes: 19,
        content: "Brak kija 50-52° kosztuje średnio 3 uderzenia na rundę.",
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
// STRONA GŁÓWNA Z WBUDOWANYM ASYSTENTEM AI ORAZ CZATEM NA ŻYWO (v27.0)
// =========================================================================
window.HomeComponent = {
  render: function() {
    window.ensureAllPortalDataReady();

    const userObj = (window.AppData && window.AppData.user) ? window.AppData.user : window.DefaultUser;
    const userName = userObj.name || "Marek Kowalski";
    const userHcp = userObj.hcp || 12.4;
    const userSwing = userObj.swingSpeed || "96 mph";
    const lastRound = userObj.lastRound || "82 (Modry Las)";

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
      location: "Modry Las Golf Resort",
      spotsLeft: 14,
      xpReward: "+750 XP"
    };

    const hubState = window.AppData.homeHubState;
    const isAiMode = hubState.activeMode === 'AI';

    // Wiadomości do wyświetlenia w prawym boksie (Asystent AI albo Czat Graczy)
    const hubStreamHTML = isAiMode
      ? hubState.aiMessages.map(m => `
          <div class="hub-msg-bubble ${m.type === 'user' ? 'user' : 'bot'}">
            <strong>${m.sender}:</strong> ${m.text}
          </div>
        `).join('')
      : (window.AppData.chatMessages || []).map(m => `
          <div class="hub-msg-bubble ${m.type === 'outgoing' ? 'user' : 'incoming'}">
            <strong>${m.sender}:</strong> ${m.text}
          </div>
        `).join('');

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
              <span style="position:absolute; top:4px; left:4px; background:${isUsed ? 'rgba(250,204,21,0.92)' : 'rgba(5,22,16,0.92)'}; color:${isUsed ? '#052e16' : 'var(--accent)'}; font-size:0.52rem; font-weight:800; padding:2px 5px; border-radius:4px;">
                ${isUsed ? 'CPO' : 'NOWY'}
              </span>
            </div>
            <div style="font-size:0.6rem; color:var(--accent); font-weight:700;">${prod.brand} • ${prod.loft}</div>
            <strong style="font-size:0.74rem; color:#fff; display:block; margin:2px 0 5px; line-height:1.2; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${prod.name}</strong>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.08);">
            <strong style="font-size:0.82rem; color:var(--gold);">${prod.price} zł</strong>
            <button type="button" class="btn-mini-tool" style="background:var(--accent); color:#052e16; border:none; padding:4px 8px; font-weight:800;" onclick="event.stopPropagation(); window.StoreComponent && window.StoreComponent.addItem(${prod.id}, false)">
              + Koszyk
            </button>
          </div>
        </div>
      `;
    }).join('');

    const recentPostsHTML = forumPosts.slice(0, 3).map(post => `
      <div class="home-forum-row" onclick="window.app.switchTab('forum')">
        <div style="display:flex; justify-content:space-between; font-size:0.62rem; margin-bottom:2px;">
          <span style="color:var(--blue); font-weight:700;">${post.category || '💬 Forum'}</span>
          <span style="color:var(--text-muted);">${post.date || 'Dzisiaj'} • 💬 ${(post.comments || []).length}</span>
        </div>
        <strong style="font-size:0.78rem; color:#fff; display:block; line-height:1.25;">${post.title}</strong>
      </div>
    `).join('');

    return `
      <section class="panel-3d home-compact-wrap" style="grid-column: span 2;">
        
        <!-- 1. Pasek statusu LIVE -->
        <div class="home-live-ticker">
          <div>
            <span class="ticker-dot"></span><strong style="color:var(--accent);">LIVE:</strong>
            <span style="margin-left:6px;">⛳ Modry Las: 19°C (10.5 ft)</span>
            <span style="margin:0 6px; color:var(--text-muted);">•</span>
            <span>⛳ Binowo Park: 18°C</span>
            <span style="margin:0 6px; color:var(--text-muted);">•</span>
            <span>⛳ First Warsaw: 20°C</span>
          </div>
          <span style="background:rgba(250,204,21,0.15); border:1px solid var(--gold); color:var(--gold); padding:2px 8px; border-radius:5px; font-weight:800; cursor:pointer;" onclick="window.StoreComponent && window.StoreComponent.applyRabat3Code()">
            🏷️ Kod RABAT3 (-3%)
          </span>
        </div>

        <!-- 2. HERO BENTO: LEWY SHOWCASE + PRAWY HUB (ASYSTENT AI & CZAT LIVE) -->
        <div class="home-hero-bento">
          
          <!-- Lewa kolumna: Powitanie + Wyszukiwarka + Mini-Telemetria WHS -->
          <div class="hero-main-showcase">
            <div>
              <span style="font-size:0.62rem; font-weight:800; color:var(--accent); text-transform:uppercase; letter-spacing:1px;">
                🌐 TGN.PL • CENTRALNY PORTAL GOLFOWY
              </span>
              <h1 style="font-size:1.35rem; color:#fff; font-weight:900; margin:0.2rem 0 0.3rem;">
                Witaj na TGN.pl, <span style="color:var(--accent);">${userName.split(' ')[0]}!</span> ⛳
              </h1>
              <p style="font-size:0.75rem; color:#cbd5e1; line-height:1.4; max-width:520px;">
                Przejdź do sklepu <strong>sklep.tgn.pl</strong> (${productsCount} produktów), <strong>forum.tgn.pl</strong> lub porozmawiaj z naszym <strong>Asystentem AI i społecznością na czacie obok →</strong>
              </p>
            </div>

            <div>
              <div style="display:flex; gap:0.4rem; background:rgba(5, 14, 18, 0.9); border:1px solid rgba(114,214,150,0.45); padding:0.32rem; border-radius:10px; margin-bottom:0.55rem;">
                <input type="text" id="homeQuickSearch" placeholder="🔍 Szukaj kija w sklepie (np. Qi10, Vokey 52, Pro V1)..." style="flex:1; background:transparent; border:none; color:#fff; font-size:0.74rem; padding:0.22rem 0.5rem; outline:none;" onkeypress="if(event.key==='Enter'){ window.app.quickSearchFromHome(); }">
                <button type="button" class="btn-primary" style="width:auto; margin:0; padding:0.35rem 0.85rem; font-size:0.72rem;" onclick="window.app.quickSearchFromHome()">
                  Szukaj →
                </button>
              </div>

              <!-- Kompaktowy pasek telemetrii gracza -->
              <div class="hero-mini-telemetry">
                <div style="cursor:pointer;" onclick="window.app.switchTab('profile')">
                  <span>HCP WHS</span>
                  <strong style="color:var(--gold);">${userHcp}</strong>
                </div>
                <div style="cursor:pointer;" onclick="window.app.switchTab('profile')">
                  <span>Swing Speed</span>
                  <strong>${userSwing}</strong>
                </div>
                <div style="cursor:pointer;" onclick="window.app.switchTab('profile')">
                  <span>Torba 3D</span>
                  <strong style="color:#38bdf8;">${bagCount}/14 kijów</strong>
                </div>
                <div style="cursor:pointer;" onclick="window.app.openAiModal()">
                  <span>Gapping AI</span>
                  <strong style="color:var(--gold);">Luka 52° ⚠️</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Prawa kolumna: NOWY INTERAKTYWNY WIDGET ASYSTENTA AI & CZATU LIVE -->
          <div class="home-ai-chat-hub">
            <div>
              <div class="hub-mode-tabs">
                <button type="button" class="hub-tab-btn ai-mode ${isAiMode ? 'active' : ''}" onclick="window.app.switchHomeHubMode('AI')">
                  🤖 Asystent AI (Fitter)
                </button>
                <button type="button" class="hub-tab-btn chat-mode ${!isAiMode ? 'active' : ''}" onclick="window.app.switchHomeHubMode('CHAT')">
                  💬 Czat Graczy & Support
                </button>
              </div>

              <div class="hub-messages-stream" id="homeHubMsgsBox">
                ${hubStreamHTML}
              </div>
            </div>

            <div>
              ${isAiMode ? `
                <div class="hub-quick-chips">
                  <button type="button" class="btn-mini-tool" style="border-color:var(--gold); color:var(--gold);" onclick="window.app.sendHomeAiQuick('WEDGE_52')">🎯 Dobierz Wedge 52°</button>
                  <button type="button" class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="window.app.sendHomeAiQuick('DRIVER_96')">⚡ Driver pod 96 mph</button>
                  <button type="button" class="btn-mini-tool" onclick="window.app.sendHomeAiQuick('CPO_DEALS')">♻️ Okazje CPO</button>
                  <button type="button" class="btn-mini-tool" onclick="window.app.sendHomeAiQuick('RABAT')">🏷️ Kod -3%</button>
                </div>
              ` : `
                <div class="hub-quick-chips">
                  <button type="button" class="btn-mini-tool" onclick="window.app.sendHomeChatQuick('Cześć! Ktoś gra w ten weekend?')">⛳ Ktoś gra w weekend?</button>
                  <button type="button" class="btn-mini-tool" onclick="window.app.sendHomeChatQuick('Mam pytanie o wysyłkę kija CPO.')">📦 Pytanie o wysyłkę CPO</button>
                  <button type="button" class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="window.app.switchTab('chat')">↗ Pełny ekran czatu</button>
                </div>
              `}

              <div class="hub-input-bar">
                <input type="text" id="homeHubInput" placeholder="${isAiMode ? 'Zapytaj AI o sprzęt, fitting lub pola...' : 'Napisz wiadomość na czacie TGN...'}" onkeypress="if(event.key==='Enter'){ window.app.submitHomeHubMessage(); }">
                <button type="button" style="background:${isAiMode ? 'var(--blue)' : 'var(--accent)'};" onclick="window.app.submitHomeHubMessage()">
                  Wyślij →
                </button>
              </div>
            </div>
          </div>

        </div>

        <!-- 3. Trzy Główne Bramy Modułowe (sklep.tgn.pl / forum.tgn.pl / kokpit.tgn.pl) -->
        <div class="home-portals-grid">
          
          <div class="portal-gate-card gate-shop" onclick="window.app.switchTab('sklep')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                <span style="background:var(--accent); color:#052e16; font-size:0.6rem; font-weight:900; padding:2px 8px; border-radius:5px;">SKLEP.TGN.PL</span>
                <span style="font-size:0.66rem; color:var(--accent); font-weight:700;">● ${productsCount} towarów</span>
              </div>
              <h3 style="font-size:1rem; color:#fff; margin-bottom:0.2rem; font-weight:800;">🛍️ Sklep & Komis CPO</h3>
              <p class="portal-gate-desc" style="font-size:0.71rem; color:#cbd5e1; line-height:1.35;">
                Nowy sprzęt PGA 2026, używane kije CPO z gwarancją i wymiana Trade-In.
              </p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.55rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.1);">
              <span style="font-size:0.65rem; color:var(--gold);">🏷️ Kod: RABAT3</span>
              <span style="font-size:0.72rem; color:var(--accent); font-weight:800;">Otwórz Sklep →</span>
            </div>
          </div>

          <div class="portal-gate-card gate-forum" onclick="window.app.switchTab('forum')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                <span style="background:var(--blue); color:#041e2b; font-size:0.6rem; font-weight:900; padding:2px 8px; border-radius:5px;">FORUM.TGN.PL</span>
                <span style="font-size:0.66rem; color:var(--blue); font-weight:700;">● ${forumTotal} tematów</span>
              </div>
              <h3 style="font-size:1rem; color:#fff; margin-bottom:0.2rem; font-weight:800;">💬 Forum Golfowe</h3>
              <p class="portal-gate-desc" style="font-size:0.71rem; color:#cbd5e1; line-height:1.35;">
                Opinie o kijach, porady trenerów PGA Pro, raporty z pól i wspólne rundy.
              </p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.55rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.1);">
              <span style="font-size:0.65rem; color:#cbd5e1;">👥 Społeczność PL</span>
              <span style="font-size:0.72rem; color:var(--blue); font-weight:800;">Otwórz Forum →</span>
            </div>
          </div>

          <div class="portal-gate-card gate-cockpit" onclick="window.app.switchTab('profile')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                <span style="background:var(--gold); color:#052e16; font-size:0.6rem; font-weight:900; padding:2px 8px; border-radius:5px;">KOKPIT.TGN.PL</span>
                <span style="font-size:0.66rem; color:var(--gold); font-weight:700;">● Runda: ${lastRound}</span>
              </div>
              <h3 style="font-size:1rem; color:#fff; margin-bottom:0.2rem; font-weight:800;">👤 Kokpit & Torba 3D</h3>
              <p class="portal-gate-desc" style="font-size:0.71rem; color:#cbd5e1; line-height:1.35;">
                Zarządzaj swoimi kijami w torbie, sprawdzaj wyceny CPO i statystyki gry.
              </p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.55rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.1);">
              <span style="font-size:0.65rem; color:var(--gold);">🎒 ${bagCount}/14 kijów</span>
              <span style="font-size:0.72rem; color:var(--gold); font-weight:800;">Otwórz Kokpit →</span>
            </div>
          </div>

        </div>

        <!-- 4. Kompaktowa Karuzela Produktów Dnia -->
        <div style="margin-bottom:1.1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.55rem;">
            <strong style="font-size:0.82rem; text-transform:uppercase; color:var(--accent); letter-spacing:0.5px;">
              🔥 Wybrane Oferty ze Sklepu & CPO (${cpoCount} używanych)
            </strong>
            <button type="button" class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="window.app.switchTab('sklep')">
              Pełny sklep (${productsCount}) →
            </button>
          </div>
          <div class="home-spotlight-grid">
            ${spotlightHTML}
          </div>
        </div>

        <!-- 5. Dolna sekcja: Forum + Szybkie Skróty -->
        <div class="home-bottom-bento">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <strong style="font-size:0.8rem; text-transform:uppercase; color:var(--blue);">💬 Aktywne tematy na Forum</strong>
              <button type="button" class="btn-mini-tool" onclick="window.app.switchTab('forum')">Wszystkie →</button>
            </div>
            ${recentPostsHTML}
          </div>

          <div style="display:flex; flex-direction:column; justify-content:space-between; gap:0.6rem;">
            <div style="background:rgba(56,189,248,0.09); border:1px solid rgba(56,189,248,0.35); border-radius:12px; padding:0.85rem;">
              <div style="display:flex; justify-content:space-between; font-size:0.62rem; margin-bottom:3px;">
                <span style="color:var(--blue); font-weight:800;">📅 NAJBLIŻSZY TURNIEJ 2027</span>
                <span style="color:var(--gold); font-weight:800;">${nextEvent.xpReward || '+750 XP'}</span>
              </div>
              <strong style="font-size:0.84rem; color:#fff; display:block; margin-bottom:4px;">${nextEvent.title}</strong>
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.7rem; color:var(--text-muted);">
                <span>📍 ${nextEvent.date}</span>
                <button type="button" class="btn-mini-tool" style="border-color:var(--accent); color:var(--accent);" onclick="window.app.switchTab('wydarzenia')">Zapisz się →</button>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.5rem;">
              <div style="background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.09); border-radius:10px; padding:0.6rem; text-align:center; cursor:pointer;" onclick="window.app.switchTab('pola')">
                <strong style="font-size:0.72rem; color:#fff; display:block;">⛳ Pola PL</strong>
                <span style="font-size:0.6rem; color:var(--text-muted);">25 pól</span>
              </div>
              <div style="background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.09); border-radius:10px; padding:0.6rem; text-align:center; cursor:pointer;" onclick="window.app.switchTab('cpo')">
                <strong style="font-size:0.72rem; color:#fff; display:block;">⚡ Skup CPO</strong>
                <span style="font-size:0.6rem; color:var(--text-muted);">Wycena</span>
              </div>
              <div style="background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.09); border-radius:10px; padding:0.6rem; text-align:center; cursor:pointer;" onclick="window.app.switchTab('marketplace')">
                <strong style="font-size:0.72rem; color:#fff; display:block;">🤝 Giełda</strong>
                <span style="font-size:0.6rem; color:var(--text-muted);">Gracze C2C</span>
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
      <section class="panel-3d home-compact-wrap" style="grid-column: span 2; border-color:var(--gold);">
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

  // Obsługa przełączania i wysyłania wiadomości w widgecie AI / Czat na Stronie Głównej
  switchHomeHubMode: function(mode) {
    window.ensureAllPortalDataReady();
    window.AppData.homeHubState.activeMode = mode;
    window.app.switchTab('home');
    setTimeout(window.app.scrollHomeHubToBottom, 30);
  },

  scrollHomeHubToBottom: function() {
    const box = document.getElementById('homeHubMsgsBox');
    if (box) box.scrollTop = box.scrollHeight;
  },

  sendHomeAiQuick: function(type) {
    window.ensureAllPortalDataReady();
    const msgs = window.AppData.homeHubState.aiMessages;
    if (type === 'WEDGE_52') {
      msgs.push(
        { sender: "Ty", type: "user", text: "Jaki kij zamknie moją lukę 15m między PW a SW?" },
        { sender: "TGN AI Concierge", type: "bot", text: "Przy Twoim swingu 96 mph idealnie sprawdzi się Gap Wedge 52° (Titleist Vokey SM10 lub używany Cleveland RTX 6 CPO). Kliknij 'Sklep' lub otwórz dział Wedge!" }
      );
    } else if (type === 'DRIVER_96') {
      msgs.push(
        { sender: "Ty", type: "user", text: "Poleć driver pod prędkość 96 mph." },
        { sender: "TGN AI Concierge", type: "bot", text: "Dla 96 mph optymalny jest shaft Stiff (S) i główka 10K MOI: TaylorMade Qi10 Max lub Ping G430 Max 10K. Oba mamy dostępne od ręki!" }
      );
    } else if (type === 'CPO_DEALS') {
      msgs.push(
        { sender: "Ty", type: "user", text: "Jakie okazje macie w komisie CPO?" },
        { sender: "TGN AI Concierge", type: "bot", text: "Mamy 10 zweryfikowanych pozycji CPO z 12-miesięczną gwarancją (m.in. Garmin R10, drivery i wedge). Możesz też oddać swój stary kij w Trade-In!" }
      );
    } else if (type === 'RABAT') {
      if (window.StoreComponent && window.StoreComponent.applyRabat3Code) {
        window.StoreComponent.applyRabat3Code();
      }
      msgs.push(
        { sender: "TGN AI Concierge", type: "bot", text: "🎉 Aktywowałem na Twoim koncie kod RABAT3 (-3% jak 'Par 3') na cały asortyment w koszyku!" }
      );
    }
    window.app.switchTab('home');
    setTimeout(window.app.scrollHomeHubToBottom, 40);
  },

  sendHomeChatQuick: function(text) {
    window.ensureAllPortalDataReady();
    const userName = (window.AppData.user && window.AppData.user.name) ? window.AppData.user.name.split(' ')[0] : 'Marek';
    window.AppData.chatMessages.push({ sender: userName, text: text, type: "outgoing" });
    window.app.switchTab('home');
    setTimeout(window.app.scrollHomeHubToBottom, 40);

    setTimeout(() => {
      window.AppData.chatMessages.push({
        sender: "Tomek_PGA (Support)",
        text: "Dzięki za wiadomość! Jesteśmy online – chętnie pomożemy z doborem sprzętu lub rezerwacją.",
        type: "incoming"
      });
      const activeBtn = document.querySelector('#mainNav button.active');
      if (activeBtn && activeBtn.dataset.tab === 'home') {
        window.app.switchTab('home');
        setTimeout(window.app.scrollHomeHubToBottom, 40);
      }
    }, 900);
  },

  submitHomeHubMessage: function() {
    window.ensureAllPortalDataReady();
    const inp = document.getElementById('homeHubInput');
    if (!inp || !inp.value.trim()) return;
    const text = inp.value.trim();
    const hubState = window.AppData.homeHubState;

    if (hubState.activeMode === 'AI') {
      hubState.aiMessages.push({ sender: "Ty", type: "user", text: text });
      const lower = text.toLowerCase();
      let reply = "Sprawdziłem katalog TGN! Możesz przejść bezpośrednio do sklepu lub przefiltrować ten sprzęt jednym kliknięciem.";
      if (lower.includes('driver') || lower.includes('qi10') || lower.includes('ping')) {
        reply = "W kategorii Driverów polecam modele 10K MOI (TaylorMade Qi10 Max oraz Ping G430) ze sztywnością Stiff pod Twoje 96 mph.";
      } else if (lower.includes('piłk') || lower.includes('pilk') || lower.includes('logo')) {
        reply = "Mamy zarówno pakiety Lake Balls AAAA Pearl, jak i nowe Titleist Pro V1 z personalizacją UV Twojego logo!";
      } else if (lower.includes('pole') || lower.includes('pola') || lower.includes('modry')) {
        reply = "W naszym Atlasie Pól znajdziesz 25 polskich obiektów z aktualnymi parametrami Par, CR/Slope i szybkim linkiem do Tee Time.";
      }
      hubState.aiMessages.push({ sender: "TGN AI Concierge", type: "bot", text: reply });
      window.app.switchTab('home');
      setTimeout(window.app.scrollHomeHubToBottom, 40);
    } else {
      window.app.sendHomeChatQuick(text);
    }
  },

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
/* =========================================================================
   STRONA GŁÓWNA v38.0 (CLEAN UX) + PŁYWAJĄCY DYMEK AI & CZAT
   ========================================================================= */

(function injectCleanHomeV38Styles() {
  const old = document.getElementById('tgnCleanHomeV38Styles');
  if (old) old.remove();

  const style = document.createElement('style');
  style.id = 'tgnCleanHomeV38Styles';
  style.textContent = `
    .tgn-home-clean {
      max-width: 1080px;
      width: 100%;
      margin: 0 auto;
      padding: 1.6rem !important;
      background: rgba(10, 20, 24, 0.92);
      border: 1px solid rgba(114, 214, 150, 0.24);
      border-radius: 20px;
    }

    /* 1. Czysty nagłówek + wyszukiwarka */
    .tgn-hero-clean {
      display: flex;
      flex-direction: column;
      gap: 0.95rem;
      margin-bottom: 1.5rem;
    }
    .tgn-hero-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .tgn-hero-title {
      font-size: 1.55rem;
      font-weight: 800;
      color: #f8fafc;
      letter-spacing: -0.2px;
      margin: 0;
    }
    .tgn-hero-sub {
      font-size: 0.82rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }
    .tgn-status-pills {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .tgn-soft-pill {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #e2e8f0;
      padding: 0.38rem 0.75rem;
      border-radius: 999px;
      font-size: 0.74rem;
      font-weight: 700;
      cursor: pointer;
      transition: 0.2s;
    }
    .tgn-soft-pill:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    .tgn-soft-pill.promo {
      background: rgba(250, 204, 21, 0.1);
      border-color: rgba(250, 204, 21, 0.35);
      color: var(--gold);
    }

    .tgn-search-clean {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(5, 13, 17, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 12px;
      padding: 0.42rem 0.45rem 0.42rem 0.9rem;
      transition: border-color 0.2s;
    }
    .tgn-search-clean:focus-within {
      border-color: var(--accent);
    }
    .tgn-search-clean input {
      flex: 1;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 0.84rem;
      outline: none;
      min-width: 0;
    }
    .tgn-search-clean input::placeholder {
      color: #64748b;
    }
    .tgn-search-clean button {
      background: var(--accent);
      color: #052e16;
      border: none;
      border-radius: 8px;
      padding: 0.52rem 1.05rem;
      font-size: 0.78rem;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
    }

    /* 2. 4 Główne, intuicyjne kafelki nawigacyjne */
    .tgn-main-tiles {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.9rem;
      margin-bottom: 1.1rem;
    }
    .tgn-tile {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.15rem 1.05rem;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s, background 0.2s;
    }
    .tgn-tile:hover {
      transform: translateY(-3px);
      background: rgba(255, 255, 255, 0.06);
      border-color: var(--accent);
    }
    .tgn-tile-icon {
      width: 40px;
      height: 40px;
      border-radius: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      background: rgba(74, 222, 128, 0.12);
      border: 1px solid rgba(74, 222, 128, 0.28);
      margin-bottom: 0.2rem;
    }
    .tgn-tile.blue .tgn-tile-icon {
      background: rgba(56, 189, 248, 0.12);
      border-color: rgba(56, 189, 248, 0.3);
    }
    .tgn-tile.blue:hover { border-color: var(--blue); }
    .tgn-tile.gold .tgn-tile-icon {
      background: rgba(250, 204, 21, 0.12);
      border-color: rgba(250, 204, 21, 0.3);
    }
    .tgn-tile.gold:hover { border-color: var(--gold); }

    .tgn-tile-title {
      font-size: 0.95rem;
      font-weight: 800;
      color: #f8fafc;
    }
    .tgn-tile-desc {
      font-size: 0.74rem;
      color: var(--text-muted);
      line-height: 1.35;
    }

    /* 3. Pasek pobocznych skrótów */
    .tgn-secondary-strip {
      display: flex;
      gap: 0.55rem;
      flex-wrap: wrap;
      margin-bottom: 1.6rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .tgn-sec-link {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #cbd5e1;
      padding: 0.42rem 0.85rem;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s;
    }
    .tgn-sec-link:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(255, 255, 255, 0.28);
      color: #fff;
    }

    /* 4. Polecane produkty (lekki, czysty grid) */
    .tgn-section-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
    }
    .tgn-section-head h3 {
      font-size: 0.9rem;
      font-weight: 800;
      color: #f8fafc;
      margin: 0;
    }
    .tgn-link-more {
      background: none;
      border: none;
      color: var(--accent);
      font-size: 0.76rem;
      font-weight: 700;
      cursor: pointer;
    }
    .tgn-link-more:hover { text-decoration: underline; }

    .tgn-clean-products {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.85rem;
      margin-bottom: 1.6rem;
    }
    .tgn-clean-prod {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 0.75rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: 0.2s;
    }
    .tgn-clean-prod:hover {
      border-color: rgba(74, 222, 128, 0.45);
      background: rgba(255, 255, 255, 0.055);
    }
    .tgn-clean-prod-img {
      width: 100%;
      height: 112px;
      background: #ffffff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-bottom: 0.6rem;
    }
    .tgn-clean-prod-img img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 6px;
    }
    .tgn-clean-prod-name {
      font-size: 0.78rem;
      font-weight: 700;
      color: #f1f5f9;
      line-height: 1.3;
      margin: 0.2rem 0 0.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    /* 5. Ostatnie z forum (czysta lista) */
    .tgn-clean-forum-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .tgn-clean-forum-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.8rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 0.75rem 0.95rem;
      cursor: pointer;
      transition: 0.2s;
    }
    .tgn-clean-forum-item:hover {
      background: rgba(56, 189, 248, 0.07);
      border-color: rgba(56, 189, 248, 0.35);
    }

    /* =====================================================================
       PŁYWAJĄCY DYMEK AI & CZAT (LEWY DOLNY RÓG)
       ===================================================================== */
    #tgnFloatingAiBtn {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: linear-gradient(135deg, #0ea5e9, #2563eb);
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.85);
      border-radius: 999px;
      padding: 0.65rem 1.05rem;
      font-size: 0.8rem;
      font-weight: 800;
      display: none;
      align-items: center;
      gap: 7px;
      cursor: pointer;
      z-index: 8600;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #tgnFloatingAiBtn:hover {
      transform: translateY(-2px) scale(1.03);
      box-shadow: 0 14px 34px rgba(14, 165, 233, 0.45);
    }
    .tgn-ai-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 8px #4ade80;
    }

    #tgnFloatingAiPopup {
      position: fixed;
      bottom: 76px;
      left: 20px;
      width: 370px;
      max-width: calc(100vw - 24px);
      background: linear-gradient(165deg, #0d1f26, #061014);
      border: 1.5px solid rgba(56, 189, 248, 0.65);
      border-radius: 18px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.9);
      z-index: 9500;
      display: none;
      flex-direction: column;
      overflow: hidden;
      animation: tgnPopUp 0.2s ease-out;
    }
    @keyframes tgnPopUp {
      from { opacity: 0; transform: translateY(12px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .tgn-ai-pop-head {
      padding: 0.8rem 1rem;
      background: rgba(0, 0, 0, 0.45);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tgn-ai-pop-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.3rem;
      padding: 0.55rem 0.8rem 0;
    }
    .tgn-ai-pop-tab {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
      border-radius: 8px;
      padding: 0.42rem;
      font-size: 0.74rem;
      font-weight: 800;
      cursor: pointer;
    }
    .tgn-ai-pop-tab.active.ai { background: var(--blue); color: #041e2b; border-color: var(--blue); }
    .tgn-ai-pop-tab.active.chat { background: var(--accent); color: #052e16; border-color: var(--accent); }

    .tgn-ai-pop-msgs {
      height: 235px;
      overflow-y: auto;
      padding: 0.75rem 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .tgn-ai-pop-chips {
      display: flex;
      gap: 0.35rem;
      overflow-x: auto;
      padding: 0 0.85rem 0.55rem;
      white-space: nowrap;
      scrollbar-width: none;
    }
    .tgn-ai-pop-chips::-webkit-scrollbar { display: none; }
    .tgn-ai-pop-input {
      display: flex;
      gap: 0.4rem;
      padding: 0.65rem 0.85rem;
      background: rgba(0, 0, 0, 0.4);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .tgn-ai-pop-input input {
      flex: 1;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      padding: 0.48rem 0.65rem;
      color: #fff;
      font-size: 0.76rem;
      outline: none;
      min-width: 0;
    }
    .tgn-ai-pop-input button {
      background: var(--blue);
      color: #041e2b;
      border: none;
      border-radius: 8px;
      padding: 0 0.9rem;
      font-size: 0.75rem;
      font-weight: 800;
      cursor: pointer;
    }

    @media (max-width: 900px) {
      .tgn-main-tiles,
      .tgn-clean-products {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 768px) {
      .tgn-home-clean {
        padding: 1rem !important;
        border-radius: 16px !important;
      }
      .tgn-hero-title { font-size: 1.25rem; }
      .tgn-main-tiles { gap: 0.65rem; }
      .tgn-tile { padding: 0.9rem 0.85rem; border-radius: 13px; }
      .tgn-tile-icon { width: 34px; height: 34px; font-size: 1.05rem; }
      .tgn-tile-title { font-size: 0.85rem; }
      .tgn-tile-desc { font-size: 0.69rem; }
      .tgn-clean-products { gap: 0.6rem; }
      .tgn-clean-prod-img { height: 92px; }
      #tgnFloatingAiBtn {
        bottom: 14px;
        left: 14px;
        padding: 0.55rem 0.85rem;
        font-size: 0.74rem;
      }
      #tgnFloatingAiPopup {
        left: 12px;
        right: 12px;
        bottom: 66px;
        width: auto;
      }
    }
  `;
  document.head.appendChild(style);
})();

// =========================================================================
// 1. NOWA, CZYSTA I INTUICYJNA STRONA GŁÓWNA
// =========================================================================
window.HomeComponent = {
  render: function() {
    window.ensureAllPortalDataReady();

    const u = (window.AppData && window.AppData.user) ? window.AppData.user : window.DefaultUser;
    const firstName = (u.name || 'Golfista').split(' ')[0];
    const hcp = u.hcp || 12.4;
    const products = window.AppData.storeProducts || [];
    const forumPosts = window.AppData.forumPosts || [];
    const bagCount = (window.AppData.bag || []).length;

    const spotlightHTML = products.slice(0, 4).map(prod => {
      const imgUrl = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl)
        : '';
      const fallbackUrl = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getFallbackPhoto(prod.name)
        : '';
      const openFn = (typeof StoreComponent !== 'undefined' && StoreComponent.openProductPage)
        ? `StoreComponent.openProductPage(${prod.id})`
        : `window.app.switchTab('sklep')`;

      return `
        <div class="tgn-clean-prod" onclick="${openFn}">
          <div>
            <div class="tgn-clean-prod-img">
              <img src="${imgUrl}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackUrl}';">
            </div>
            <span style="font-size:0.64rem; color:var(--accent); font-weight:700;">${prod.brand}</span>
            <div class="tgn-clean-prod-name">${prod.name}</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size:0.88rem; color:#fff;">${prod.price} zł</strong>
            <span style="font-size:0.68rem; color:var(--text-muted);">Zobacz →</span>
          </div>
        </div>
      `;
    }).join('');

    const forumHTML = forumPosts.slice(0, 3).map(post => `
      <div class="tgn-clean-forum-item" onclick="window.app.switchTab('forum')">
        <div style="min-width:0;">
          <div style="font-size:0.66rem; color:var(--blue); font-weight:700; margin-bottom:2px;">${post.category || 'Forum'}</div>
          <strong style="font-size:0.82rem; color:#f1f5f9; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${post.title}</strong>
        </div>
        <span style="font-size:0.7rem; color:var(--text-muted); white-space:nowrap;">💬 ${(post.comments || []).length}</span>
      </div>
    `).join('');

    setTimeout(() => window.FloatingAiWidget && window.FloatingAiWidget.sync(), 20);

    return `
      <section class="panel-3d tgn-home-clean" style="grid-column: span 2;">
        
        <!-- Nagłówek i jedna wyszukiwarka -->
        <div class="tgn-hero-clean">
          <div class="tgn-hero-top">
            <div>
              <h1 class="tgn-hero-title">Cześć, ${firstName} 👋</h1>
              <p class="tgn-hero-sub">Wybierz dział poniżej lub znajdź od razu sprzęt w sklepie.</p>
            </div>
            <div class="tgn-status-pills">
              <button type="button" class="tgn-soft-pill" onclick="window.app.switchTab('profile')">⛳ HCP ${hcp} • Torba ${bagCount}/14</button>
              <button type="button" class="tgn-soft-pill promo" onclick="window.StoreComponent && window.StoreComponent.applyRabat3Code()">🏷️ Kod RABAT3 (-3%)</button>
            </div>
          </div>

          <div class="tgn-search-clean">
            <span style="font-size:0.9rem; opacity:0.7;">🔍</span>
            <input type="text" id="homeQuickSearch" placeholder="Szukaj w sklepie (np. Qi10, Vokey 52, Pro V1, Garmin)..." onkeypress="if(event.key==='Enter'){ window.app.quickSearchFromHome(); }">
            <button type="button" onclick="window.app.quickSearchFromHome()">Szukaj</button>
          </div>
        </div>

        <!-- 4 główne, czytelne kafelki nawigacyjne -->
        <div class="tgn-main-tiles">
          <div class="tgn-tile" onclick="window.app.switchTab('sklep')">
            <div class="tgn-tile-icon">🛍️</div>
            <div class="tgn-tile-title">Sklep & Komis CPO</div>
            <div class="tgn-tile-desc">Nowy sprzęt 2026, używane CPO i wymiana Trade-In</div>
          </div>

          <div class="tgn-tile blue" onclick="window.app.switchTab('forum')">
            <div class="tgn-tile-icon">💬</div>
            <div class="tgn-tile-title">Forum Golfowe</div>
            <div class="tgn-tile-desc">Recenzje kijów, porady PGA i dyskusje graczy</div>
          </div>

          <div class="tgn-tile gold" onclick="window.app.switchTab('profile')">
            <div class="tgn-tile-icon">🎒</div>
            <div class="tgn-tile-title">Moja Torba 3D</div>
            <div class="tgn-tile-desc">Twój profil WHS, lista kijów i wycena sprzętu</div>
          </div>

          <div class="tgn-tile" onclick="window.app.switchTab('pola')">
            <div class="tgn-tile-icon">⛳</div>
            <div class="tgn-tile-title">Pola w Polsce</div>
            <div class="tgn-tile-desc">Atlas 25 pól golfowych i szybkie Tee Time</div>
          </div>
        </div>

        <!-- Pasek pozostałych modułów -->
        <div class="tgn-secondary-strip">
          <button type="button" class="tgn-sec-link" onclick="window.app.switchTab('cpo')">⚡ Wyceń swój kij (Skup CPO)</button>
          <button type="button" class="tgn-sec-link" onclick="window.app.switchTab('marketplace')">🤝 Giełda Graczy C2C</button>
          <button type="button" class="tgn-sec-link" onclick="window.app.switchTab('wydarzenia')">📅 Kalendarz Turniejów 2027</button>
          <button type="button" class="tgn-sec-link" onclick="window.FloatingAiWidget.open('AI')">🤖 Zapytaj Asystenta AI</button>
        </div>

        <!-- Polecane produkty ze sklepu -->
        <div class="tgn-section-head">
          <h3>Polecane w sklepie</h3>
          <button type="button" class="tgn-link-more" onclick="window.app.switchTab('sklep')">Wszystkie produkty (${products.length}) →</button>
        </div>
        <div class="tgn-clean-products">
          ${spotlightHTML}
        </div>

        <!-- Najnowsze z forum -->
        <div class="tgn-section-head">
          <h3>Ostatnie dyskusje na forum</h3>
          <button type="button" class="tgn-link-more" onclick="window.app.switchTab('forum')">Otwórz forum →</button>
        </div>
        <div class="tgn-clean-forum-list">
          ${forumHTML}
        </div>

      </section>
    `;
  }
};
var HomeComponent = window.HomeComponent;

// =========================================================================
// 2. PŁYWAJĄCY DYMEK ASYSTENTA AI & CZATU (DZIAŁA W CAŁEJ APLIKACJI)
// =========================================================================
window.FloatingAiWidget = {
  isOpen: false,

  sync: function() {
    window.ensureAllPortalDataReady();

    let btn = document.getElementById('tgnFloatingAiBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'tgnFloatingAiBtn';
      btn.type = 'button';
      btn.innerHTML = `<span class="tgn-ai-dot"></span><span>🤖 AI & Czat</span>`;
      btn.onclick = () => window.FloatingAiWidget.toggle();
      document.body.appendChild(btn);
    }

    let popup = document.getElementById('tgnFloatingAiPopup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'tgnFloatingAiPopup';
      document.body.appendChild(popup);
    }

    const isLoggedIn = document.getElementById('mainNav')?.style.display !== 'none';
    btn.style.display = isLoggedIn ? 'flex' : 'none';

    if (!isLoggedIn) {
      window.FloatingAiWidget.isOpen = false;
      popup.style.display = 'none';
      return;
    }

    if (window.FloatingAiWidget.isOpen) {
      window.FloatingAiWidget.renderPopup();
      popup.style.display = 'flex';
    } else {
      popup.style.display = 'none';
    }
  },

  toggle: function() {
    window.FloatingAiWidget.isOpen = !window.FloatingAiWidget.isOpen;
    window.FloatingAiWidget.sync();
  },

  open: function(mode) {
    window.ensureAllPortalDataReady();
    if (mode) window.AppData.homeHubState.activeMode = mode;
    window.FloatingAiWidget.isOpen = true;
    window.FloatingAiWidget.sync();
  },

  close: function() {
    window.FloatingAiWidget.isOpen = false;
    window.FloatingAiWidget.sync();
  },

  setMode: function(mode) {
    window.ensureAllPortalDataReady();
    window.AppData.homeHubState.activeMode = mode;
    window.FloatingAiWidget.renderPopup();
  },

  sendQuick: function(keyOrText) {
    window.ensureAllPortalDataReady();
    const mode = window.AppData.homeHubState.activeMode;

    if (mode === 'AI') {
      const msgs = window.AppData.homeHubState.aiMessages;
      if (keyOrText === 'WEDGE_52') {
        msgs.push(
          { sender: "Ty", type: "user", text: "Dobierz kij pod lukę 15m (Wedge 52°)." },
          { sender: "TGN AI", type: "bot", text: "Pod Twój swing 96 mph polecam Titleist Vokey SM10 52°/12F. Możesz go wziąć z dopłatą Trade-In w sklepie!" }
        );
      } else if (keyOrText === 'DRIVER_96') {
        msgs.push(
          { sender: "Ty", type: "user", text: "Jaki driver pod 96 mph?" },
          { sender: "TGN AI", type: "bot", text: "Najlepszy wybór to TaylorMade Qi10 Max 10.5° lub Ping G430 Max 10K ze sztywnością shaftu Stiff (S)." }
        );
      } else if (keyOrText === 'CPO') {
        msgs.push(
          { sender: "Ty", type: "user", text: "Pokaż okazje z komisu CPO." },
          { sender: "TGN AI", type: "bot", text: "W komisie CPO mamy zweryfikowane kije z 12-mies. gwarancją. Przejdź do Sklepu i wybierz filtr 'Tylko Komis CPO'." }
        );
      } else if (keyOrText === 'RABAT') {
        if (window.StoreComponent && window.StoreComponent.applyRabat3Code) {
          window.StoreComponent.applyRabat3Code();
        }
        msgs.push({ sender: "TGN AI", type: "bot", text: "🎉 Aktywowałem kod RABAT3 (-3%) w Twoim koszyku!" });
      }
      window.FloatingAiWidget.renderPopup();
    } else {
      window.FloatingAiWidget.pushChatMessage(keyOrText);
    }
  },

  pushChatMessage: function(text) {
    const userName = (window.AppData.user && window.AppData.user.name) ? window.AppData.user.name.split(' ')[0] : 'Marek';
    window.AppData.chatMessages.push({ sender: userName, text: text, type: "outgoing" });
    window.FloatingAiWidget.renderPopup();

    setTimeout(() => {
      window.AppData.chatMessages.push({
        sender: "Tomek_PGA (Support)",
        text: "Dzięki za wiadomość! Jesteśmy online — w czym możemy pomóc?",
        type: "incoming"
      });
      if (window.FloatingAiWidget.isOpen) window.FloatingAiWidget.renderPopup();
    }, 850);
  },

  submitInput: function() {
    const inp = document.getElementById('tgnAiPopInput');
    if (!inp || !inp.value.trim()) return;
    const text = inp.value.trim();
    const mode = window.AppData.homeHubState.activeMode;

    if (mode === 'AI') {
      const msgs = window.AppData.homeHubState.aiMessages;
      msgs.push({ sender: "Ty", type: "user", text });
      const lower = text.toLowerCase();
      let reply = "Sprawdziłem katalog TGN — wpisz nazwę w wyszukiwarkę u góry lub otwórz Sklep, żeby zobaczyć szczegóły i opcję Trade-In.";
      if (lower.includes('driver') || lower.includes('qi10') || lower.includes('ping')) {
        reply = "Dla 96 mph sugeruję główkę 10K MOI (Qi10 Max lub Ping G430) na shafcie Stiff. Oba modele są w sklepie.";
      } else if (lower.includes('piłk') || lower.includes('pilk') || lower.includes('logo')) {
        reply = "Mamy pakiety Lake Balls oraz nowe Titleist Pro V1 z nadrukiem UV Twojego logo (realizacja 48h).";
      } else if (lower.includes('trade') || lower.includes('wymian')) {
        reply = "Wejdź w dowolny kij w sklepie i kliknij 'Kup w Trade-In' — wycenisz tam swój obecny sprzęt z widełkami +/- i +10% bonusem.";
      }
      msgs.push({ sender: "TGN AI", type: "bot", text: reply });
      window.FloatingAiWidget.renderPopup();
    } else {
      window.FloatingAiWidget.pushChatMessage(text);
    }
  },

  renderPopup: function() {
    const popup = document.getElementById('tgnFloatingAiPopup');
    if (!popup) return;
    const isAi = window.AppData.homeHubState.activeMode === 'AI';

    const msgsHTML = isAi
      ? (window.AppData.homeHubState.aiMessages || []).map(m => `
          <div class="hub-msg-bubble ${m.type === 'user' ? 'user' : 'bot'}">
            <strong>${m.sender}:</strong> ${m.text}
          </div>
        `).join('')
      : (window.AppData.chatMessages || []).map(m => `
          <div class="hub-msg-bubble ${m.type === 'outgoing' ? 'user' : 'incoming'}">
            <strong>${m.sender}:</strong> ${m.text}
          </div>
        `).join('');

    popup.innerHTML = `
      <div class="tgn-ai-pop-head">
        <div style="display:flex; align-items:center; gap:7px;">
          <span class="tgn-ai-dot"></span>
          <strong style="font-size:0.84rem; color:#fff;">${isAi ? 'Asystent AI TGN' : 'Czat Graczy & Support'}</strong>
        </div>
        <button type="button" style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:26px; height:26px; border-radius:50%; cursor:pointer;" onclick="window.FloatingAiWidget.close()">✕</button>
      </div>

      <div class="tgn-ai-pop-tabs">
        <button type="button" class="tgn-ai-pop-tab ai ${isAi ? 'active' : ''}" onclick="window.FloatingAiWidget.setMode('AI')">🤖 Asystent AI</button>
        <button type="button" class="tgn-ai-pop-tab chat ${!isAi ? 'active' : ''}" onclick="window.FloatingAiWidget.setMode('CHAT')">💬 Czat Live</button>
      </div>

      <div class="tgn-ai-pop-msgs" id="tgnAiPopMsgs">
        ${msgsHTML}
      </div>

      <div class="tgn-ai-pop-chips">
        ${isAi ? `
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('WEDGE_52')">🎯 Wedge 52°</button>
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('DRIVER_96')">⚡ Driver 96 mph</button>
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('CPO')">♻️ Okazje CPO</button>
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('RABAT')">🏷️ Kod -3%</button>
        ` : `
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('Ktoś gra w ten weekend?')">⛳ Gra w weekend?</button>
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('Pytanie o wycenę Trade-In.')">🔄 Pytanie o Trade-In</button>
        `}
      </div>

      <div class="tgn-ai-pop-input">
        <input type="text" id="tgnAiPopInput" placeholder="${isAi ? 'Zapytaj AI o sprzęt lub fitting...' : 'Napisz wiadomość...'}" onkeypress="if(event.key==='Enter'){ window.FloatingAiWidget.submitInput(); }">
        <button type="button" style="background:${isAi ? 'var(--blue)' : 'var(--accent)'};" onclick="window.FloatingAiWidget.submitInput()">Wyślij</button>
      </div>
    `;

    const box = document.getElementById('tgnAiPopMsgs');
    if (box) box.scrollTop = box.scrollHeight;
  }
};

// Synchronizacja dymka przy logowaniu, wylogowaniu i zmianie zakładek
const _origEnterV38 = window.auth.enterApp;
window.auth.enterApp = function(msg) {
  _origEnterV38(msg);
  window.FloatingAiWidget.sync();
};

const _origLogoutV38 = window.auth.logout;
window.auth.logout = function() {
  _origLogoutV38();
  window.FloatingAiWidget.sync();
};

const _origSwitchTabV38 = window.app.switchTab;
window.app.switchTab = function(tabName) {
  _origSwitchTabV38(tabName);
  window.FloatingAiWidget.sync();
};
/* =========================================================================
   STRONA GŁÓWNA v39.0 (EXECUTIVE GLASS UI • IKONY SVG • BEZ RABATÓW)
   ========================================================================= */

(function injectHomeV39Styles() {
  ['tgnCleanHomeV38Styles', 'tgnHomeV39Styles'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  const style = document.createElement('style');
  style.id = 'tgnHomeV39Styles';
  style.textContent = `
    .tgn-v39-shell {
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;
      padding: 1.4rem !important;
      background: linear-gradient(180deg, rgba(10, 20, 24, 0.94), rgba(6, 13, 17, 0.96));
      border: 1px solid rgba(148, 163, 184, 0.16);
      border-radius: 22px;
      box-shadow: 0 28px 65px rgba(0, 0, 0, 0.65);
    }

    /* 1. Atmosferyczny Hero z wyszukiwarką */
    .tgn-v39-hero {
      position: relative;
      border-radius: 18px;
      padding: 1.55rem 1.65rem;
      margin-bottom: 1.25rem;
      overflow: hidden;
      border: 1px solid rgba(74, 222, 128, 0.24);
      background:
        linear-gradient(125deg, rgba(6, 17, 21, 0.94) 38%, rgba(10, 34, 26, 0.78) 100%),
        url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }
    .tgn-v39-hero-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.8rem;
      flex-wrap: wrap;
      margin-bottom: 1.15rem;
    }
    .tgn-v39-eyebrow {
      display: inline-block;
      font-size: 0.64rem;
      font-weight: 800;
      letter-spacing: 1.6px;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 0.35rem;
    }
    .tgn-v39-title {
      font-size: 1.65rem;
      font-weight: 800;
      color: #f8fafc;
      letter-spacing: -0.3px;
      line-height: 1.18;
      margin: 0;
    }
    .tgn-v39-sub {
      font-size: 0.82rem;
      color: #94a3b8;
      margin-top: 0.3rem;
      max-width: 480px;
      line-height: 1.45;
    }
    .tgn-v39-player-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      background: rgba(5, 14, 18, 0.78);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(148, 163, 184, 0.22);
      border-radius: 12px;
      padding: 0.5rem 0.8rem;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .tgn-v39-player-chip:hover {
      border-color: var(--accent);
      background: rgba(10, 26, 22, 0.9);
    }
    .tgn-v39-chip-metric {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }
    .tgn-v39-chip-metric span {
      font-size: 0.56rem;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #94a3b8;
    }
    .tgn-v39-chip-metric strong {
      font-size: 0.84rem;
      color: #f8fafc;
      font-weight: 800;
    }
    .tgn-v39-chip-sep {
      width: 1px;
      height: 22px;
      background: rgba(255, 255, 255, 0.14);
    }

    /* Wyszukiwarka glassmorphism */
    .tgn-v39-search {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      background: rgba(5, 13, 17, 0.82);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 12px;
      padding: 0.38rem 0.42rem 0.38rem 0.9rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .tgn-v39-search:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.12);
    }
    .tgn-v39-search svg {
      color: #94a3b8;
      flex-shrink: 0;
    }
    .tgn-v39-search input {
      flex: 1;
      background: transparent;
      border: none;
      color: #f8fafc;
      font-size: 0.84rem;
      outline: none;
      min-width: 0;
    }
    .tgn-v39-search input::placeholder { color: #64748b; }
    .tgn-v39-search button {
      background: var(--accent);
      color: #052e16;
      border: none;
      border-radius: 9px;
      padding: 0.52rem 1.15rem;
      font-size: 0.78rem;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
      transition: filter 0.2s;
    }
    .tgn-v39-search button:hover { filter: brightness(1.08); }

    /* 2. Dwie Główne Wizualne Karty (Pro Shop + Forum) */
    .tgn-v39-featured {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .tgn-v39-fcard {
      position: relative;
      border-radius: 16px;
      padding: 1.25rem 1.35rem;
      min-height: 152px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.12);
      transition: transform 0.24s ease, border-color 0.24s ease, box-shadow 0.24s ease;
    }
    .tgn-v39-fcard:hover {
      transform: translateY(-3px);
      box-shadow: 0 18px 36px rgba(0, 0, 0, 0.55);
    }
    .tgn-v39-fcard.shop {
      background:
        linear-gradient(135deg, rgba(6, 20, 18, 0.92) 40%, rgba(12, 36, 28, 0.76) 100%),
        url('https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=800&q=80') center/cover no-repeat;
      border-color: rgba(74, 222, 128, 0.35);
    }
    .tgn-v39-fcard.shop:hover { border-color: var(--accent); }
    .tgn-v39-fcard.forum {
      background:
        linear-gradient(135deg, rgba(7, 17, 28, 0.92) 40%, rgba(12, 32, 48, 0.78) 100%),
        url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80') center/cover no-repeat;
      border-color: rgba(56, 189, 248, 0.35);
    }
    .tgn-v39-fcard.forum:hover { border-color: var(--blue); }

    .tgn-v39-fcard-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .tgn-v39-icon-badge {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(74, 222, 128, 0.14);
      border: 1px solid rgba(74, 222, 128, 0.35);
      color: var(--accent);
    }
    .tgn-v39-fcard.forum .tgn-v39-icon-badge {
      background: rgba(56, 189, 248, 0.14);
      border-color: rgba(56, 189, 248, 0.35);
      color: var(--blue);
    }
    .tgn-v39-meta-tag {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: #cbd5e1;
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 3px 9px;
      border-radius: 999px;
    }
    .tgn-v39-fcard h2 {
      font-size: 1.08rem;
      font-weight: 800;
      color: #ffffff;
      text-transform: none;
      letter-spacing: -0.1px;
      margin: 0 0 0.25rem 0;
    }
    .tgn-v39-fcard p {
      font-size: 0.76rem;
      color: #cbd5e1;
      line-height: 1.4;
      margin: 0;
    }
    .tgn-v39-fcard-cta {
      margin-top: 0.85rem;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent);
    }
    .tgn-v39-fcard.forum .tgn-v39-fcard-cta { color: var(--blue); }

    /* 3. Cztery Moduły Użytkowe (Symetryczny rząd) */
    .tgn-v39-modules {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
      margin-bottom: 1.6rem;
    }
    .tgn-v39-mod {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 13px;
      padding: 0.85rem 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.72rem;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, transform 0.2s;
      min-width: 0;
    }
    .tgn-v39-mod:hover {
      background: rgba(255, 255, 255, 0.06);
      border-color: rgba(148, 163, 184, 0.35);
      transform: translateY(-2px);
    }
    .tgn-v39-mod-ico {
      width: 34px;
      height: 34px;
      border-radius: 9px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .tgn-v39-mod:hover .tgn-v39-mod-ico {
      color: var(--accent);
      border-color: rgba(74, 222, 128, 0.35);
    }
    .tgn-v39-mod-text {
      min-width: 0;
    }
    .tgn-v39-mod-text strong {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      color: #f1f5f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tgn-v39-mod-text span {
      display: block;
      font-size: 0.68rem;
      color: #94a3b8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* 4. Nagłówki sekcji */
    .tgn-v39-sec-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.85rem;
    }
    .tgn-v39-sec-head h3 {
      font-size: 0.84rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.9px;
      color: #cbd5e1;
      margin: 0;
    }
    .tgn-v39-sec-link {
      background: none;
      border: none;
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .tgn-v39-sec-link:hover { text-decoration: underline; }

    /* 5. Wybrane produkty (Premium Showcase) */
    .tgn-v39-prods {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.85rem;
      margin-bottom: 1.6rem;
    }
    .tgn-v39-prod {
      background: rgba(255, 255, 255, 0.028);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 0.72rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s, background 0.2s;
    }
    .tgn-v39-prod:hover {
      transform: translateY(-2px);
      border-color: rgba(74, 222, 128, 0.42);
      background: rgba(255, 255, 255, 0.05);
    }
    .tgn-v39-prod-img {
      width: 100%;
      height: 118px;
      background: radial-gradient(circle at center, #ffffff 68%, #eef2f6 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      margin-bottom: 0.65rem;
      position: relative;
    }
    .tgn-v39-prod-img img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 8px;
      transition: transform 0.28s ease;
    }
    .tgn-v39-prod:hover .tgn-v39-prod-img img { transform: scale(1.05); }
    .tgn-v39-prod-badge {
      position: absolute;
      top: 6px;
      left: 6px;
      background: rgba(8, 18, 22, 0.88);
      color: #e2e8f0;
      font-size: 0.54rem;
      font-weight: 800;
      letter-spacing: 0.4px;
      padding: 2px 6px;
      border-radius: 5px;
      text-transform: uppercase;
    }
    .tgn-v39-prod-badge.cpo {
      background: rgba(250, 204, 21, 0.92);
      color: #052e16;
    }
    .tgn-v39-prod-brand {
      font-size: 0.63rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: var(--accent);
    }
    .tgn-v39-prod-name {
      font-size: 0.78rem;
      font-weight: 700;
      color: #f8fafc;
      line-height: 1.32;
      margin: 0.22rem 0 0.55rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .tgn-v39-prod-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.45rem;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
    }
    .tgn-v39-prod-price {
      font-size: 0.88rem;
      font-weight: 800;
      color: #ffffff;
    }

    /* 6. Dolna sekcja: Forum + Nadchodzący Turniej */
    .tgn-v39-bottom {
      display: grid;
      grid-template-columns: 1.45fr 1fr;
      gap: 1rem;
      align-items: stretch;
    }
    .tgn-v39-forum-list {
      display: flex;
      flex-direction: column;
      gap: 0.48rem;
    }
    .tgn-v39-forum-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      background: rgba(255, 255, 255, 0.026);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 11px;
      padding: 0.7rem 0.9rem;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .tgn-v39-forum-row:hover {
      background: rgba(56, 189, 248, 0.06);
      border-color: rgba(56, 189, 248, 0.35);
    }
    .tgn-v39-event-card {
      background: linear-gradient(155deg, rgba(14, 30, 38, 0.9), rgba(7, 16, 22, 0.96));
      border: 1px solid rgba(56, 189, 248, 0.28);
      border-radius: 14px;
      padding: 1.05rem 1.15rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: border-color 0.2s, transform 0.2s;
    }
    .tgn-v39-event-card:hover {
      border-color: var(--blue);
      transform: translateY(-2px);
    }

    /* Elegancki styl pływającego dymka AI & Czat (dopasowany do v39) */
    #tgnFloatingAiBtn {
      background: rgba(8, 22, 30, 0.94) !important;
      border: 1.5px solid rgba(56, 189, 248, 0.7) !important;
      color: #f8fafc !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.75), 0 0 16px rgba(56, 189, 248, 0.22) !important;
    }

    @media (max-width: 960px) {
      .tgn-v39-modules,
      .tgn-v39-prods { grid-template-columns: repeat(2, 1fr); }
      .tgn-v39-bottom { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .tgn-v39-shell { padding: 0.85rem !important; border-radius: 16px !important; }
      .tgn-v39-hero { padding: 1.05rem; border-radius: 14px; margin-bottom: 0.85rem; }
      .tgn-v39-title { font-size: 1.28rem; }
      .tgn-v39-sub { font-size: 0.74rem; }
      .tgn-v39-player-chip { padding: 0.38rem 0.65rem; gap: 0.5rem; }
      .tgn-v39-featured { grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 0.75rem; }
      .tgn-v39-fcard { min-height: 126px; padding: 0.85rem; border-radius: 13px; }
      .tgn-v39-fcard-top { margin-bottom: 0.45rem; }
      .tgn-v39-icon-badge { width: 32px; height: 32px; border-radius: 8px; }
      .tgn-v39-meta-tag { display: none; }
      .tgn-v39-fcard h2 { font-size: 0.88rem; }
      .tgn-v39-fcard p { font-size: 0.68rem; line-height: 1.3; }
      .tgn-v39-fcard-cta { margin-top: 0.5rem; font-size: 0.68rem; }
      .tgn-v39-modules { gap: 0.55rem; margin-bottom: 1.15rem; }
      .tgn-v39-mod { padding: 0.68rem 0.7rem; gap: 0.55rem; border-radius: 11px; }
      .tgn-v39-mod-ico { width: 30px; height: 30px; }
      .tgn-v39-mod-text strong { font-size: 0.74rem; }
      .tgn-v39-mod-text span { font-size: 0.62rem; }
      .tgn-v39-prods { gap: 0.55rem; margin-bottom: 1.15rem; }
      .tgn-v39-prod { padding: 0.6rem; border-radius: 12px; }
      .tgn-v39-prod-img { height: 92px; margin-bottom: 0.45rem; }
      .tgn-v39-prod-name { font-size: 0.72rem; }
    }
  `;
  document.head.appendChild(style);
})();

const _v39Icons = {
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  shop: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  forum: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  bag: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  flag: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>`,
  trade: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  market: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  arrow: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  chevron: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`
};

window.HomeComponent = {
  render: function() {
    window.ensureAllPortalDataReady();

    const u = (window.AppData && window.AppData.user) ? window.AppData.user : window.DefaultUser;
    const firstName = (u.name || 'Golfista').split(' ')[0];
    const hcp = u.hcp || 12.4;
    const products = window.AppData.storeProducts || [];
    const forumPosts = window.AppData.forumPosts || [];
    const bagCount = (window.AppData.bag || []).length;
    const events = window.AppData.events2027 || [];
    const nextEvent = events[0] || {
      title: "TGN Polish Masters Open 2027",
      date: "15–17 Maja 2027",
      location: "Modry Las Golf Resort",
      spotsLeft: 14
    };

    const spotlightHTML = products.slice(0, 4).map(prod => {
      const imgUrl = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl)
        : '';
      const fallbackUrl = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getFallbackPhoto(prod.name)
        : '';
      const isUsed = prod.section === 'USED';
      const openFn = (typeof StoreComponent !== 'undefined' && StoreComponent.openProductPage)
        ? `StoreComponent.openProductPage(${prod.id})`
        : `window.app.switchTab('sklep')`;

      return `
        <div class="tgn-v39-prod" onclick="${openFn}">
          <div>
            <div class="tgn-v39-prod-img">
              <img src="${imgUrl}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackUrl}';">
              <span class="tgn-v39-prod-badge ${isUsed ? 'cpo' : ''}">${isUsed ? 'CPO' : 'Nowy'}</span>
            </div>
            <div class="tgn-v39-prod-brand">${prod.brand}</div>
            <div class="tgn-v39-prod-name">${prod.name}</div>
          </div>
          <div class="tgn-v39-prod-foot">
            <span class="tgn-v39-prod-price">${prod.price} zł</span>
            <span style="color:var(--accent); display:inline-flex;">${_v39Icons.arrow}</span>
          </div>
        </div>
      `;
    }).join('');

    const forumHTML = forumPosts.slice(0, 3).map(post => `
      <div class="tgn-v39-forum-row" onclick="window.app.switchTab('forum')">
        <div style="min-width:0;">
          <div style="font-size:0.65rem; color:var(--blue); font-weight:700; margin-bottom:2px;">
            ${post.category || 'Społeczność'} • <span style="color:#64748b;">${post.date || 'Dzisiaj'}</span>
          </div>
          <strong style="font-size:0.8rem; color:#f1f5f9; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${post.title}
          </strong>
        </div>
        <div style="display:flex; align-items:center; gap:0.45rem; color:#94a3b8; font-size:0.7rem; flex-shrink:0;">
          <span>${(post.comments || []).length} odp.</span>
          ${_v39Icons.chevron}
        </div>
      </div>
    `).join('');

    setTimeout(() => {
      if (window.FloatingAiWidget) {
        window.FloatingAiWidget.sync();
        const aiBtn = document.getElementById('tgnFloatingAiBtn');
        if (aiBtn) {
          aiBtn.innerHTML = `<span class="tgn-ai-dot"></span>${_v39Icons.forum}<span>AI & Czat</span>`;
        }
      }
    }, 20);

    return `
      <section class="panel-3d tgn-v39-shell" style="grid-column: span 2;">
        
        <!-- 1. Hero z atmosferycznym tłem, statusem gracza i wyszukiwarką -->
        <div class="tgn-v39-hero">
          <div class="tgn-v39-hero-top">
            <div>
              <span class="tgn-v39-eyebrow">TGN Global Golf</span>
              <h1 class="tgn-v39-title">Witaj, ${firstName}</h1>
              <p class="tgn-v39-sub">Oficjalny Pro Shop, komis sprzętu CPO, cyfrowa torba 3D oraz społeczność golfowa w jednym miejscu.</p>
            </div>

            <div class="tgn-v39-player-chip" onclick="window.app.switchTab('profile')" title="Przejdź do profilu i torby 3D">
              <div class="tgn-v39-chip-metric">
                <span>Handicap</span>
                <strong style="color:var(--accent);">${hcp}</strong>
              </div>
              <div class="tgn-v39-chip-sep"></div>
              <div class="tgn-v39-chip-metric">
                <span>Torba 3D</span>
                <strong>${bagCount}/14</strong>
              </div>
              <span style="color:#94a3b8; display:inline-flex;">${_v39Icons.chevron}</span>
            </div>
          </div>

          <div class="tgn-v39-search">
            ${_v39Icons.search}
            <input type="text" id="homeQuickSearch" placeholder="Szukaj sprzętu w sklepie (np. TaylorMade Qi10, Vokey 52, Pro V1)..." onkeypress="if(event.key==='Enter'){ window.app.quickSearchFromHome(); }">
            <button type="button" onclick="window.app.quickSearchFromHome()">Szukaj</button>
          </div>
        </div>

        <!-- 2. Dwie główne bramy portalu -->
        <div class="tgn-v39-featured">
          <div class="tgn-v39-fcard shop" onclick="window.app.switchTab('sklep')">
            <div>
              <div class="tgn-v39-fcard-top">
                <span class="tgn-v39-icon-badge">${_v39Icons.shop}</span>
                <span class="tgn-v39-meta-tag">${products.length} produktów</span>
              </div>
              <h2>Pro Shop & Komis CPO</h2>
              <p>Nowe kolekcje, zweryfikowane kije używane i wymiana Trade-In.</p>
            </div>
            <span class="tgn-v39-fcard-cta">Przejdź do sklepu ${_v39Icons.arrow}</span>
          </div>

          <div class="tgn-v39-fcard forum" onclick="window.app.switchTab('forum')">
            <div>
              <div class="tgn-v39-fcard-top">
                <span class="tgn-v39-icon-badge">${_v39Icons.forum}</span>
                <span class="tgn-v39-meta-tag">${forumPosts.length} aktywnych tematów</span>
              </div>
              <h2>Forum Golfowe</h2>
              <p>Testy sprzętu, porady PGA, raporty z pól i umawianie rund.</p>
            </div>
            <span class="tgn-v39-fcard-cta">Otwórz dyskusje ${_v39Icons.arrow}</span>
          </div>
        </div>

        <!-- 3. Cztery równe moduły narzędziowe -->
        <div class="tgn-v39-modules">
          <div class="tgn-v39-mod" onclick="window.app.switchTab('profile')">
            <span class="tgn-v39-mod-ico">${_v39Icons.bag}</span>
            <div class="tgn-v39-mod-text">
              <strong>Moja Torba 3D</strong>
              <span>Sprzęt i telemetria</span>
            </div>
          </div>

          <div class="tgn-v39-mod" onclick="window.app.switchTab('pola')">
            <span class="tgn-v39-mod-ico">${_v39Icons.flag}</span>
            <div class="tgn-v39-mod-text">
              <strong>Pola w Polsce</strong>
              <span>Atlas 25 obiektów</span>
            </div>
          </div>

          <div class="tgn-v39-mod" onclick="window.app.switchTab('cpo')">
            <span class="tgn-v39-mod-ico">${_v39Icons.trade}</span>
            <div class="tgn-v39-mod-text">
              <strong>Skup CPO</strong>
              <span>Wycena Twoich kijów</span>
            </div>
          </div>

          <div class="tgn-v39-mod" onclick="window.app.switchTab('marketplace')">
            <span class="tgn-v39-mod-ico">${_v39Icons.market}</span>
            <div class="tgn-v39-mod-text">
              <strong>Giełda C2C</strong>
              <span>Ogłoszenia graczy</span>
            </div>
          </div>
        </div>

        <!-- 4. Wybrane pozycje ze sklepu -->
        <div class="tgn-v39-sec-head">
          <h3>Wybrane w Pro Shopie</h3>
          <button type="button" class="tgn-v39-sec-link" onclick="window.app.switchTab('sklep')">
            Pełny katalog ${_v39Icons.arrow}
          </button>
        </div>
        <div class="tgn-v39-prods">
          ${spotlightHTML}
        </div>

        <!-- 5. Społeczność i najbliższy turniej -->
        <div class="tgn-v39-bottom">
          <div>
            <div class="tgn-v39-sec-head">
              <h3>Ostatnio na forum</h3>
              <button type="button" class="tgn-v39-sec-link" onclick="window.app.switchTab('forum')">
                Wszystkie ${_v39Icons.arrow}
              </button>
            </div>
            <div class="tgn-v39-forum-list">
              ${forumHTML}
            </div>
          </div>

          <div class="tgn-v39-event-card" onclick="window.app.switchTab('wydarzenia')">
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.65rem; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:var(--blue); margin-bottom:0.55rem;">
                ${_v39Icons.calendar}
                <span>Kalendarz Turniejów 2027</span>
              </div>
              <strong style="font-size:0.98rem; color:#ffffff; display:block; margin-bottom:0.35rem; line-height:1.3;">
                ${nextEvent.title}
              </strong>
              <p style="font-size:0.75rem; color:#94a3b8; line-height:1.45; margin:0;">
                ${nextEvent.date} • ${nextEvent.location}<br>
                Dostępne miejsca: <strong style="color:var(--accent);">${nextEvent.spotsLeft}</strong>
              </p>
            </div>
            <span style="margin-top:0.9rem; display:inline-flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; color:var(--blue);">
              Zobacz harmonogram i zapisy ${_v39Icons.arrow}
            </span>
          </div>
        </div>

      </section>
    `;
  }
};
HomeComponent = window.HomeComponent;
/* =========================================================================
   STRONA GŁÓWNA v40.0 — JEDNOLITE PANELE + NAPRAWIONY DYMEK AI & CZAT
   ========================================================================= */

(function injectHomeV40Styles() {
  ['tgnCleanHomeV38Styles', 'tgnHomeV39Styles', 'tgnHomeV40Styles'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });

  const style = document.createElement('style');
  style.id = 'tgnHomeV40Styles';
  style.textContent = `
    /* Globalne ujednolicenie wszystkich głównych paneli w portalu */
    .panel-3d {
      background: linear-gradient(180deg, rgba(10, 20, 24, 0.94), rgba(6, 13, 17, 0.96)) !important;
      border: 1px solid rgba(148, 163, 184, 0.16) !important;
      border-radius: 20px !important;
      box-shadow: 0 24px 55px rgba(0, 0, 0, 0.62) !important;
    }

    .tgn-v40-shell {
      max-width: 1120px;
      width: 100%;
      margin: 0 auto;
      padding: 1.35rem !important;
    }

    /* 1. Hero z wyszukiwarką */
    .tgn-v40-hero {
      position: relative;
      border-radius: 16px;
      padding: 1.4rem 1.5rem;
      margin-bottom: 1.15rem;
      overflow: hidden;
      border: 1px solid rgba(74, 222, 128, 0.24);
      background:
        linear-gradient(125deg, rgba(6, 17, 21, 0.94) 40%, rgba(10, 34, 26, 0.8) 100%),
        url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
    }
    .tgn-v40-hero-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
    }
    .tgn-v40-eyebrow {
      display: inline-block;
      font-size: 0.63rem;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 0.3rem;
    }
    .tgn-v40-title {
      font-size: 1.55rem;
      font-weight: 800;
      color: #f8fafc;
      letter-spacing: -0.3px;
      line-height: 1.18;
      margin: 0;
    }
    .tgn-v40-sub {
      font-size: 0.8rem;
      color: #94a3b8;
      margin-top: 0.25rem;
      max-width: 480px;
      line-height: 1.4;
    }
    .tgn-v40-player-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.65rem;
      background: rgba(5, 14, 18, 0.82);
      border: 1px solid rgba(148, 163, 184, 0.22);
      border-radius: 12px;
      padding: 0.45rem 0.78rem;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    .tgn-v40-player-chip:hover { border-color: var(--accent); }
    .tgn-v40-chip-metric { display: flex; flex-direction: column; line-height: 1.15; }
    .tgn-v40-chip-metric span { font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.6px; color: #94a3b8; }
    .tgn-v40-chip-metric strong { font-size: 0.82rem; color: #f8fafc; font-weight: 800; }
    .tgn-v40-chip-sep { width: 1px; height: 22px; background: rgba(255, 255, 255, 0.14); }

    .tgn-v40-search {
      display: flex;
      align-items: center;
      gap: 0.55rem;
      background: rgba(5, 13, 17, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 12px;
      padding: 0.36rem 0.4rem 0.36rem 0.85rem;
      transition: border-color 0.2s;
    }
    .tgn-v40-search:focus-within { border-color: var(--accent); }
    .tgn-v40-search svg { color: #94a3b8; flex-shrink: 0; }
    .tgn-v40-search input {
      flex: 1; background: transparent; border: none; color: #f8fafc;
      font-size: 0.82rem; outline: none; min-width: 0;
    }
    .tgn-v40-search input::placeholder { color: #64748b; }
    .tgn-v40-search button {
      background: var(--accent); color: #052e16; border: none; border-radius: 9px;
      padding: 0.5rem 1.1rem; font-size: 0.78rem; font-weight: 800; cursor: pointer; white-space: nowrap;
    }

    /* 2. JEDNOLITA SIATKA 6 PANELI PORTALU (identyczny styl dla każdego działu) */
    .tgn-v40-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.85rem;
      margin-bottom: 1.5rem;
    }
    .tgn-v40-card {
      position: relative;
      border-radius: 15px;
      padding: 1.1rem 1.15rem;
      min-height: 138px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      background: linear-gradient(155deg, rgba(16, 30, 36, 0.92), rgba(8, 16, 20, 0.96));
      border: 1px solid rgba(148, 163, 184, 0.18);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
    }
    .tgn-v40-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.55);
    }
    .tgn-v40-card.tone-green:hover { border-color: rgba(74, 222, 128, 0.65); }
    .tgn-v40-card.tone-blue:hover { border-color: rgba(56, 189, 248, 0.65); }
    .tgn-v40-card.tone-gold:hover { border-color: rgba(250, 204, 21, 0.65); }

    .tgn-v40-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.65rem;
    }
    .tgn-v40-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .tgn-v40-card.tone-green .tgn-v40-icon {
      background: rgba(74, 222, 128, 0.12);
      border: 1px solid rgba(74, 222, 128, 0.32);
      color: var(--accent);
    }
    .tgn-v40-card.tone-blue .tgn-v40-icon {
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.32);
      color: var(--blue);
    }
    .tgn-v40-card.tone-gold .tgn-v40-icon {
      background: rgba(250, 204, 21, 0.12);
      border: 1px solid rgba(250, 204, 21, 0.32);
      color: var(--gold);
    }

    .tgn-v40-badge {
      font-size: 0.62rem;
      font-weight: 700;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 2px 8px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .tgn-v40-card h2 {
      font-size: 0.96rem;
      font-weight: 800;
      color: #f8fafc;
      text-transform: none;
      letter-spacing: -0.1px;
      margin: 0 0 0.22rem 0;
    }
    .tgn-v40-card p {
      font-size: 0.74rem;
      color: #94a3b8;
      line-height: 1.38;
      margin: 0;
    }
    .tgn-v40-cta {
      margin-top: 0.75rem;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.72rem;
      font-weight: 700;
    }
    .tgn-v40-card.tone-green .tgn-v40-cta { color: var(--accent); }
    .tgn-v40-card.tone-blue .tgn-v40-cta { color: var(--blue); }
    .tgn-v40-card.tone-gold .tgn-v40-cta { color: var(--gold); }

    /* 3. Nagłówki sekcji, produkty i dół */
    .tgn-v40-sec-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.8rem;
    }
    .tgn-v40-sec-head h3 {
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.85px;
      color: #cbd5e1;
      margin: 0;
    }
    .tgn-v40-sec-link {
      background: none; border: none; color: var(--accent); font-size: 0.74rem;
      font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
    }
    .tgn-v40-sec-link:hover { text-decoration: underline; }

    .tgn-v40-prods {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.85rem;
      margin-bottom: 1.5rem;
    }
    .tgn-v40-prod {
      background: linear-gradient(155deg, rgba(16, 30, 36, 0.85), rgba(8, 16, 20, 0.94));
      border: 1px solid rgba(148, 163, 184, 0.16);
      border-radius: 14px;
      padding: 0.7rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      cursor: pointer;
      transition: transform 0.2s, border-color 0.2s;
    }
    .tgn-v40-prod:hover { transform: translateY(-2px); border-color: rgba(74, 222, 128, 0.5); }
    .tgn-v40-prod-img {
      width: 100%; height: 112px;
      background: radial-gradient(circle at center, #ffffff 68%, #eef2f6 100%);
      border-radius: 10px; display: flex; align-items: center; justify-content: center;
      overflow: hidden; margin-bottom: 0.55rem; position: relative;
    }
    .tgn-v40-prod-img img { width: 100%; height: 100%; object-fit: contain; padding: 7px; }
    .tgn-v40-prod-badge {
      position: absolute; top: 6px; left: 6px;
      background: rgba(8, 18, 22, 0.88); color: #e2e8f0;
      font-size: 0.54rem; font-weight: 800; padding: 2px 6px; border-radius: 5px; text-transform: uppercase;
    }
    .tgn-v40-prod-badge.cpo { background: rgba(250, 204, 21, 0.92); color: #052e16; }
    .tgn-v40-prod-brand { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; color: var(--accent); }
    .tgn-v40-prod-name {
      font-size: 0.77rem; font-weight: 700; color: #f8fafc; line-height: 1.3;
      margin: 0.2rem 0 0.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
    }
    .tgn-v40-prod-foot {
      display: flex; justify-content: space-between; align-items: center;
      padding-top: 0.42rem; border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .tgn-v40-bottom {
      display: grid;
      grid-template-columns: 1.45fr 1fr;
      gap: 0.9rem;
      align-items: stretch;
    }
    .tgn-v40-forum-list { display: flex; flex-direction: column; gap: 0.48rem; }
    .tgn-v40-forum-row {
      display: flex; justify-content: space-between; align-items: center; gap: 0.75rem;
      background: linear-gradient(155deg, rgba(16, 30, 36, 0.85), rgba(8, 16, 20, 0.94));
      border: 1px solid rgba(148, 163, 184, 0.16);
      border-radius: 12px; padding: 0.72rem 0.9rem; cursor: pointer; transition: border-color 0.2s;
    }
    .tgn-v40-forum-row:hover { border-color: rgba(56, 189, 248, 0.5); }

    .tgn-v40-event-card {
      background: linear-gradient(155deg, rgba(16, 30, 36, 0.92), rgba(8, 16, 20, 0.96));
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 14px; padding: 1.05rem 1.15rem;
      display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: border-color 0.2s;
    }
    .tgn-v40-event-card:hover { border-color: var(--blue); }

    /* =====================================================================
       NAPRAWIONY, SAMODZIELNY DYMEK I OKNO AI & CZAT (LEWY DOLNY RÓG)
       ===================================================================== */
    #tgnFloatingAiBtn {
      position: fixed !important;
      bottom: 20px !important;
      left: 20px !important;
      background: rgba(8, 22, 30, 0.95) !important;
      color: #f8fafc !important;
      border: 1.5px solid rgba(56, 189, 248, 0.75) !important;
      border-radius: 30px !important;
      padding: 0.62rem 1.05rem !important;
      font-size: 0.8rem !important;
      font-weight: 800 !important;
      display: none;
      align-items: center !important;
      gap: 7px !important;
      cursor: pointer !important;
      z-index: 8600 !important;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.78), 0 0 16px rgba(56, 189, 248, 0.22) !important;
      transition: transform 0.2s !important;
    }
    #tgnFloatingAiBtn:hover { transform: scale(1.04) !important; }
    .tgn-ai-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #4ade80; box-shadow: 0 0 8px #4ade80; flex-shrink: 0;
    }

    #tgnFloatingAiPopup {
      position: fixed !important;
      bottom: 76px !important;
      left: 20px !important;
      width: 370px;
      max-width: calc(100vw - 24px);
      background: linear-gradient(165deg, #0d1f26, #061014);
      border: 1.5px solid rgba(56, 189, 248, 0.65);
      border-radius: 18px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.92);
      z-index: 9500 !important;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    .tgn-ai-pop-head {
      padding: 0.8rem 1rem;
      background: rgba(0, 0, 0, 0.45);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tgn-ai-pop-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.35rem;
      padding: 0.55rem 0.8rem 0;
    }
    .tgn-ai-pop-tab {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #94a3b8;
      border-radius: 8px;
      padding: 0.42rem;
      font-size: 0.74rem;
      font-weight: 800;
      cursor: pointer;
    }
    .tgn-ai-pop-tab.active.ai { background: var(--blue); color: #041e2b; border-color: var(--blue); }
    .tgn-ai-pop-tab.active.chat { background: var(--accent); color: #052e16; border-color: var(--accent); }

    .tgn-ai-pop-msgs {
      height: 230px;
      overflow-y: auto;
      padding: 0.75rem 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .tgn-pop-msg {
      font-size: 0.74rem;
      line-height: 1.4;
      padding: 0.5rem 0.72rem;
      border-radius: 10px;
      max-width: 92%;
    }
    .tgn-pop-msg.bot {
      background: rgba(56, 189, 248, 0.12);
      border-left: 3px solid var(--blue);
      color: #f1f5f9;
      align-self: flex-start;
    }
    .tgn-pop-msg.incoming {
      background: rgba(255, 255, 255, 0.07);
      border-left: 3px solid var(--gold);
      color: #f1f5f9;
      align-self: flex-start;
    }
    .tgn-pop-msg.user {
      background: rgba(74, 222, 128, 0.16);
      border-right: 3px solid var(--accent);
      color: #dcfce7;
      align-self: flex-end;
    }
    .tgn-ai-pop-chips {
      display: flex;
      gap: 0.35rem;
      overflow-x: auto;
      padding: 0 0.85rem 0.55rem;
      white-space: nowrap;
      scrollbar-width: none;
    }
    .tgn-ai-pop-chips::-webkit-scrollbar { display: none; }
    .tgn-ai-pop-input {
      display: flex;
      gap: 0.4rem;
      padding: 0.65rem 0.85rem;
      background: rgba(0, 0, 0, 0.4);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .tgn-ai-pop-input input {
      flex: 1; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px; padding: 0.48rem 0.65rem; color: #fff; font-size: 0.76rem; outline: none; min-width: 0;
    }
    .tgn-ai-pop-input button {
      border: none; border-radius: 8px; padding: 0 0.9rem; font-size: 0.75rem; font-weight: 800; cursor: pointer;
    }

    @media (max-width: 960px) {
      .tgn-v40-grid,
      .tgn-v40-prods { grid-template-columns: repeat(2, 1fr); }
      .tgn-v40-bottom { grid-template-columns: 1fr; }
    }
    @media (max-width: 768px) {
      .tgn-v40-shell { padding: 0.85rem !important; }
      .tgn-v40-hero { padding: 1rem; margin-bottom: 0.85rem; }
      .tgn-v40-title { font-size: 1.28rem; }
      .tgn-v40-sub { font-size: 0.73rem; }
      .tgn-v40-grid { gap: 0.6rem; margin-bottom: 1.15rem; }
      .tgn-v40-card { min-height: 118px; padding: 0.82rem; border-radius: 13px; }
      .tgn-v40-card-top { margin-bottom: 0.45rem; }
      .tgn-v40-icon { width: 31px; height: 31px; border-radius: 8px; }
      .tgn-v40-badge { display: none; }
      .tgn-v40-card h2 { font-size: 0.84rem; }
      .tgn-v40-card p { font-size: 0.67rem; line-height: 1.3; }
      .tgn-v40-cta { margin-top: 0.5rem; font-size: 0.67rem; }
      .tgn-v40-prods { gap: 0.55rem; margin-bottom: 1.15rem; }
      .tgn-v40-prod { padding: 0.58rem; }
      .tgn-v40-prod-img { height: 90px; }
      #tgnFloatingAiBtn {
        bottom: 14px !important;
        left: 14px !important;
        padding: 0.55rem 0.9rem !important;
        font-size: 0.74rem !important;
      }
      #tgnFloatingAiPopup {
        left: 12px !important;
        right: 12px !important;
        bottom: 66px !important;
        width: auto !important;
      }
    }
  `;
  document.head.appendChild(style);
})();

const _v40Icons = {
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  shop: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  forum: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  bag: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  flag: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>`,
  trade: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  market: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
  arrow: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  chevron: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`
};

// 1. Samodzielny i odporny pływający widget AI & Czat
window.FloatingAiWidget = {
  isOpen: false,

  sync: function() {
    window.ensureAllPortalDataReady();

    let btn = document.getElementById('tgnFloatingAiBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'tgnFloatingAiBtn';
      btn.type = 'button';
      btn.onclick = () => window.FloatingAiWidget.toggle();
      document.body.appendChild(btn);
    }
    btn.innerHTML = `<span class="tgn-ai-dot"></span>${_v40Icons.forum}<span>AI & Czat</span>`;

    let popup = document.getElementById('tgnFloatingAiPopup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'tgnFloatingAiPopup';
      document.body.appendChild(popup);
    }

    const isLoggedIn = document.getElementById('mainNav')?.style.display !== 'none';
    btn.style.display = isLoggedIn ? 'flex' : 'none';

    if (!isLoggedIn) {
      window.FloatingAiWidget.isOpen = false;
      popup.style.display = 'none';
      return;
    }

    if (window.FloatingAiWidget.isOpen) {
      window.FloatingAiWidget.renderPopup();
      popup.style.display = 'flex';
    } else {
      popup.style.display = 'none';
    }
  },

  toggle: function() {
    window.FloatingAiWidget.isOpen = !window.FloatingAiWidget.isOpen;
    window.FloatingAiWidget.sync();
  },

  open: function(mode) {
    window.ensureAllPortalDataReady();
    if (mode) window.AppData.homeHubState.activeMode = mode;
    window.FloatingAiWidget.isOpen = true;
    window.FloatingAiWidget.sync();
  },

  close: function() {
    window.FloatingAiWidget.isOpen = false;
    window.FloatingAiWidget.sync();
  },

  setMode: function(mode) {
    window.ensureAllPortalDataReady();
    window.AppData.homeHubState.activeMode = mode;
    window.FloatingAiWidget.renderPopup();
  },

  sendQuick: function(keyOrText) {
    window.ensureAllPortalDataReady();
    const mode = window.AppData.homeHubState.activeMode;

    if (mode === 'AI') {
      const msgs = window.AppData.homeHubState.aiMessages;
      if (keyOrText === 'WEDGE_52') {
        msgs.push(
          { sender: "Ty", type: "user", text: "Dobierz kij pod lukę 15m (Wedge 52°)." },
          { sender: "TGN AI", type: "bot", text: "Pod Twój swing 96 mph polecam Titleist Vokey SM10 52°/12F. Możesz go wziąć z opcją wymiany Trade-In w sklepie." }
        );
      } else if (keyOrText === 'DRIVER_96') {
        msgs.push(
          { sender: "Ty", type: "user", text: "Jaki driver pod 96 mph?" },
          { sender: "TGN AI", type: "bot", text: "Najlepszy wybór to TaylorMade Qi10 Max 10.5° lub Ping G430 Max 10K na shafcie Stiff (S)." }
        );
      } else if (keyOrText === 'CPO') {
        msgs.push(
          { sender: "Ty", type: "user", text: "Jak działa komis CPO i Trade-In?" },
          { sender: "TGN AI", type: "bot", text: "Wchodzisz w dowolny kij w sklepie i klikasz 'Kup w Trade-In' — od razu policzysz orientacyjną dopłatę (+/-) za swój sprzęt." }
        );
      }
      window.FloatingAiWidget.renderPopup();
    } else {
      window.FloatingAiWidget.pushChatMessage(keyOrText);
    }
  },

  pushChatMessage: function(text) {
    const userName = (window.AppData.user && window.AppData.user.name) ? window.AppData.user.name.split(' ')[0] : 'Marek';
    window.AppData.chatMessages.push({ sender: userName, text, type: "outgoing" });
    window.FloatingAiWidget.renderPopup();

    setTimeout(() => {
      window.AppData.chatMessages.push({
        sender: "Tomek_PGA (Support)",
        text: "Dzięki za wiadomość! Jesteśmy online — w czym możemy pomóc?",
        type: "incoming"
      });
      if (window.FloatingAiWidget.isOpen) window.FloatingAiWidget.renderPopup();
    }, 850);
  },

  submitInput: function() {
    const inp = document.getElementById('tgnAiPopInput');
    if (!inp || !inp.value.trim()) return;
    const text = inp.value.trim();
    const mode = window.AppData.homeHubState.activeMode;

    if (mode === 'AI') {
      const msgs = window.AppData.homeHubState.aiMessages;
      msgs.push({ sender: "Ty", type: "user", text });
      const lower = text.toLowerCase();
      let reply = "Sprawdziłem ofertę TGN — wpisz model w wyszukiwarkę u góry lub otwórz Sklep, żeby sprawdzić dostępność i Trade-In.";
      if (lower.includes('driver') || lower.includes('qi10') || lower.includes('ping')) {
        reply = "Dla 96 mph sugeruję główkę 10K MOI (Qi10 Max lub Ping G430) ze sztywnością Stiff. Oba modele są dostępne w sklepie.";
      } else if (lower.includes('piłk') || lower.includes('pilk') || lower.includes('logo')) {
        reply = "Mamy pakiety Lake Balls oraz nowe Titleist Pro V1 z trwałym nadrukiem UV Twojego logo.";
      } else if (lower.includes('trade') || lower.includes('wymian')) {
        reply = "Kliknij 'Kup w Trade-In' na dowolnym produkcie w sklepie — system wyliczy wstępne widełki dopłaty do potwierdzenia po oględzinach.";
      }
      msgs.push({ sender: "TGN AI", type: "bot", text: reply });
      window.FloatingAiWidget.renderPopup();
    } else {
      window.FloatingAiWidget.pushChatMessage(text);
    }
  },

  renderPopup: function() {
    const popup = document.getElementById('tgnFloatingAiPopup');
    if (!popup) return;
    const isAi = window.AppData.homeHubState.activeMode === 'AI';

    const msgsHTML = isAi
      ? (window.AppData.homeHubState.aiMessages || []).map(m => `
          <div class="tgn-pop-msg ${m.type === 'user' ? 'user' : 'bot'}">
            <strong>${m.sender}:</strong> ${m.text}
          </div>
        `).join('')
      : (window.AppData.chatMessages || []).map(m => `
          <div class="tgn-pop-msg ${m.type === 'outgoing' ? 'user' : 'incoming'}">
            <strong>${m.sender}:</strong> ${m.text}
          </div>
        `).join('');

    popup.innerHTML = `
      <div class="tgn-ai-pop-head">
        <div style="display:flex; align-items:center; gap:7px;">
          <span class="tgn-ai-dot"></span>
          <strong style="font-size:0.84rem; color:#fff;">${isAi ? 'Asystent AI TGN' : 'Czat Graczy & Support'}</strong>
        </div>
        <button type="button" style="background:rgba(255,255,255,0.1); border:none; color:#fff; width:26px; height:26px; border-radius:50%; cursor:pointer;" onclick="window.FloatingAiWidget.close()">✕</button>
      </div>

      <div class="tgn-ai-pop-tabs">
        <button type="button" class="tgn-ai-pop-tab ai ${isAi ? 'active' : ''}" onclick="window.FloatingAiWidget.setMode('AI')">Asystent AI</button>
        <button type="button" class="tgn-ai-pop-tab chat ${!isAi ? 'active' : ''}" onclick="window.FloatingAiWidget.setMode('CHAT')">Czat Live</button>
      </div>

      <div class="tgn-ai-pop-msgs" id="tgnAiPopMsgs">
        ${msgsHTML}
      </div>

      <div class="tgn-ai-pop-chips">
        ${isAi ? `
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('WEDGE_52')">Wedge 52°</button>
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('DRIVER_96')">Driver 96 mph</button>
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('CPO')">Trade-In & CPO</button>
        ` : `
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('Ktoś gra w ten weekend?')">Gra w weekend?</button>
          <button type="button" class="btn-mini-tool" onclick="window.FloatingAiWidget.sendQuick('Mam pytanie o wycenę Trade-In.')">Pytanie o Trade-In</button>
        `}
      </div>

      <div class="tgn-ai-pop-input">
        <input type="text" id="tgnAiPopInput" placeholder="${isAi ? 'Zapytaj AI o sprzęt lub fitting...' : 'Napisz wiadomość...'}" onkeypress="if(event.key==='Enter'){ window.FloatingAiWidget.submitInput(); }">
        <button type="button" style="background:${isAi ? 'var(--blue)' : 'var(--accent)'}; color:${isAi ? '#041e2b' : '#052e16'};" onclick="window.FloatingAiWidget.submitInput()">Wyślij</button>
      </div>
    `;

    const box = document.getElementById('tgnAiPopMsgs');
    if (box) box.scrollTop = box.scrollHeight;
  }
};

// 2. Strona Główna v40.0 z 6 jednolitymi panelami
window.HomeComponent = {
  render: function() {
    window.ensureAllPortalDataReady();

    const u = (window.AppData && window.AppData.user) ? window.AppData.user : window.DefaultUser;
    const firstName = (u.name || 'Golfista').split(' ')[0];
    const hcp = u.hcp || 12.4;
    const products = window.AppData.storeProducts || [];
    const forumPosts = window.AppData.forumPosts || [];
    const bagCount = (window.AppData.bag || []).length;
    const events = window.AppData.events2027 || [];
    const nextEvent = events[0] || {
      title: "TGN Polish Masters Open 2027",
      date: "15–17 Maja 2027",
      location: "Modry Las Golf Resort",
      spotsLeft: 14
    };

    const portalModules = [
      {
        tab: 'sklep', tone: 'tone-green', icon: _v40Icons.shop,
        badge: `${products.length} ofert`, title: 'Pro Shop & Komis CPO',
        desc: 'Nowe kolekcje, kije używane CPO i wymiana Trade-In.', cta: 'Otwórz sklep'
      },
      {
        tab: 'forum', tone: 'tone-blue', icon: _v40Icons.forum,
        badge: `${forumPosts.length} tematów`, title: 'Forum Golfowe',
        desc: 'Testy sprzętu, porady PGA i raporty z polskich pól.', cta: 'Wejdź na forum'
      },
      {
        tab: 'profile', tone: 'tone-gold', icon: _v40Icons.bag,
        badge: `${bagCount}/14 kijów`, title: 'Moja Torba 3D',
        desc: 'Twój profil WHS, cyfrowa torba i telemetria gry.', cta: 'Otwórz kokpit'
      },
      {
        tab: 'pola', tone: 'tone-green', icon: _v40Icons.flag,
        badge: '25 pól', title: 'Pola w Polsce',
        desc: 'Katalog pól golfowych, parametry i rezerwacja Tee Time.', cta: 'Zobacz atlas'
      },
      {
        tab: 'cpo', tone: 'tone-gold', icon: _v40Icons.trade,
        badge: 'Wycena +/-', title: 'Skup Kijów CPO',
        desc: 'Szybka wycena posiadanego sprzętu i odkup serwisowy.', cta: 'Wyceń kij'
      },
      {
        tab: 'marketplace', tone: 'tone-blue', icon: _v40Icons.market,
        badge: 'Społeczność', title: 'Giełda Graczy C2C',
        desc: 'Bezpośrednie ogłoszenia kupna i sprzedaży między graczami.', cta: 'Przeglądaj giełdę'
      }
    ];

    const modulesHTML = portalModules.map(m => `
      <div class="tgn-v40-card ${m.tone}" onclick="window.app.switchTab('${m.tab}')">
        <div>
          <div class="tgn-v40-card-top">
            <span class="tgn-v40-icon">${m.icon}</span>
            <span class="tgn-v40-badge">${m.badge}</span>
          </div>
          <h2>${m.title}</h2>
          <p>${m.desc}</p>
        </div>
        <span class="tgn-v40-cta">${m.cta} ${_v40Icons.arrow}</span>
      </div>
    `).join('');

    const spotlightHTML = products.slice(0, 4).map(prod => {
      const imgUrl = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getClubVisualUrl(prod.name, prod.imgUrl)
        : '';
      const fallbackUrl = (typeof ClubImageEngine !== 'undefined')
        ? ClubImageEngine.getFallbackPhoto(prod.name)
        : '';
      const isUsed = prod.section === 'USED';
      const openFn = (typeof StoreComponent !== 'undefined' && StoreComponent.openProductPage)
        ? `StoreComponent.openProductPage(${prod.id})`
        : `window.app.switchTab('sklep')`;

      return `
        <div class="tgn-v40-prod" onclick="${openFn}">
          <div>
            <div class="tgn-v40-prod-img">
              <img src="${imgUrl}" alt="${prod.name}" onerror="this.onerror=null; this.src='${fallbackUrl}';">
              <span class="tgn-v40-prod-badge ${isUsed ? 'cpo' : ''}">${isUsed ? 'CPO' : 'Nowy'}</span>
            </div>
            <div class="tgn-v40-prod-brand">${prod.brand}</div>
            <div class="tgn-v40-prod-name">${prod.name}</div>
          </div>
          <div class="tgn-v40-prod-foot">
            <strong style="font-size:0.86rem; color:#fff;">${prod.price} zł</strong>
            <span style="color:var(--accent); display:inline-flex;">${_v40Icons.arrow}</span>
          </div>
        </div>
      `;
    }).join('');

    const forumHTML = forumPosts.slice(0, 3).map(post => `
      <div class="tgn-v40-forum-row" onclick="window.app.switchTab('forum')">
        <div style="min-width:0;">
          <div style="font-size:0.65rem; color:var(--blue); font-weight:700; margin-bottom:2px;">
            ${post.category || 'Społeczność'} • <span style="color:#64748b;">${post.date || 'Dzisiaj'}</span>
          </div>
          <strong style="font-size:0.8rem; color:#f1f5f9; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
            ${post.title}
          </strong>
        </div>
        <div style="display:flex; align-items:center; gap:0.45rem; color:#94a3b8; font-size:0.7rem; flex-shrink:0;">
          <span>${(post.comments || []).length} odp.</span>
          ${_v40Icons.chevron}
        </div>
      </div>
    `).join('');

    setTimeout(() => window.FloatingAiWidget && window.FloatingAiWidget.sync(), 20);

    return `
      <section class="panel-3d tgn-v40-shell" style="grid-column: span 2;">
        
        <div class="tgn-v40-hero">
          <div class="tgn-v40-hero-top">
            <div>
              <span class="tgn-v40-eyebrow">TGN Global Golf</span>
              <h1 class="tgn-v40-title">Witaj, ${firstName}</h1>
              <p class="tgn-v40-sub">Pro Shop, komis CPO, cyfrowa torba 3D oraz społeczność golfowa w jednym miejscu.</p>
            </div>

            <div class="tgn-v40-player-chip" onclick="window.app.switchTab('profile')" title="Otwórz profil i torbę 3D">
              <div class="tgn-v40-chip-metric">
                <span>Handicap</span>
                <strong style="color:var(--accent);">${hcp}</strong>
              </div>
              <div class="tgn-v40-chip-sep"></div>
              <div class="tgn-v40-chip-metric">
                <span>Torba 3D</span>
                <strong>${bagCount}/14</strong>
              </div>
              <span style="color:#94a3b8; display:inline-flex;">${_v40Icons.chevron}</span>
            </div>
          </div>

          <div class="tgn-v40-search">
            ${_v40Icons.search}
            <input type="text" id="homeQuickSearch" placeholder="Szukaj sprzętu w sklepie (np. TaylorMade Qi10, Vokey 52, Pro V1)..." onkeypress="if(event.key==='Enter'){ window.app.quickSearchFromHome(); }">
            <button type="button" onclick="window.app.quickSearchFromHome()">Szukaj</button>
          </div>
        </div>

        <div class="tgn-v40-grid">
          ${modulesHTML}
        </div>

        <div class="tgn-v40-sec-head">
          <h3>Wybrane w Pro Shopie</h3>
          <button type="button" class="tgn-v40-sec-link" onclick="window.app.switchTab('sklep')">
            Pełny katalog ${_v40Icons.arrow}
          </button>
        </div>
        <div class="tgn-v40-prods">
          ${spotlightHTML}
        </div>

        <div class="tgn-v40-bottom">
          <div>
            <div class="tgn-v40-sec-head">
              <h3>Ostatnio na forum</h3>
              <button type="button" class="tgn-v40-sec-link" onclick="window.app.switchTab('forum')">
                Wszystkie ${_v40Icons.arrow}
              </button>
            </div>
            <div class="tgn-v40-forum-list">
              ${forumHTML}
            </div>
          </div>

          <div class="tgn-v40-event-card" onclick="window.app.switchTab('wydarzenia')">
            <div>
              <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.65rem; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:var(--blue); margin-bottom:0.55rem;">
                ${_v40Icons.calendar}
                <span>Kalendarz Turniejów 2027</span>
              </div>
              <strong style="font-size:0.96rem; color:#ffffff; display:block; margin-bottom:0.35rem; line-height:1.3;">
                ${nextEvent.title}
              </strong>
              <p style="font-size:0.74rem; color:#94a3b8; line-height:1.45; margin:0;">
                ${nextEvent.date} • ${nextEvent.location}<br>
                Dostępne miejsca: <strong style="color:var(--accent);">${nextEvent.spotsLeft}</strong>
              </p>
            </div>
            <span style="margin-top:0.85rem; display:inline-flex; align-items:center; gap:5px; font-size:0.74rem; font-weight:700; color:var(--blue);">
              Zobacz harmonogram i zapisy ${_v40Icons.arrow}
            </span>
          </div>
        </div>

      </section>
    `;
  }
};
HomeComponent = window.HomeComponent;

// Bezpieczna synchronizacja dymka AI przy nawigacji
if (!window._tgnV40HooksInstalled) {
  window._tgnV40HooksInstalled = true;
  const _enterV40 = window.auth.enterApp;
  window.auth.enterApp = function(msg) { _enterV40(msg); window.FloatingAiWidget.sync(); };
  const _logoutV40 = window.auth.logout;
  window.auth.logout = function() { _logoutV40(); window.FloatingAiWidget.sync(); };
  const _switchV40 = window.app.switchTab;
  window.app.switchTab = function(tabName) { _switchV40(tabName); window.FloatingAiWidget.sync(); };
}

/* =========================================================================
   KOREKTA HERO v40.1 — BEZ HCP I OPISU + MNIEJSZA WYSZUKIWARKA
   ========================================================================= */

(function injectHomeV401Patch() {
  const old = document.getElementById('tgnHomeV401Styles');
  if (old) old.remove();

  const style = document.createElement('style');
  style.id = 'tgnHomeV401Styles';
  style.textContent = `
    .tgn-v40-shell {
      padding-bottom: 4.5rem !important;
    }

    /* Ukrycie kafelka HCP/Torba oraz opisu pod powitaniem */
    .tgn-v40-player-chip,
    .tgn-v40-sub {
      display: none !important;
    }

    /* Kompaktowy Hero: na PC powitanie po lewej, mniejsza wyszukiwarka po prawej */
    .tgn-v40-hero {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.25rem !important;
      margin-bottom: 1rem !important;
    }
    .tgn-v40-hero-top {
      margin-bottom: 0 !important;
    }
    .tgn-v40-eyebrow {
      margin-bottom: 0.15rem !important;
    }
    .tgn-v40-title {
      font-size: 1.35rem !important;
    }

    /* Mniejsza, smuklejsza wyszukiwarka */
    .tgn-v40-search {
      width: 100%;
      max-width: 400px;
      padding: 0.24rem 0.28rem 0.24rem 0.7rem !important;
      border-radius: 10px !important;
      gap: 0.45rem !important;
    }
    .tgn-v40-search svg {
      width: 14px;
      height: 14px;
    }
    .tgn-v40-search input {
      font-size: 0.76rem !important;
    }
    .tgn-v40-search button {
      padding: 0.36rem 0.85rem !important;
      font-size: 0.72rem !important;
      border-radius: 7px !important;
    }

    @media (max-width: 768px) {
      .tgn-v40-hero {
        flex-direction: column;
        align-items: stretch;
        gap: 0.65rem;
        padding: 0.8rem 0.9rem !important;
        margin-bottom: 0.75rem !important;
      }
      .tgn-v40-title {
        font-size: 1.18rem !important;
      }
      .tgn-v40-search {
        max-width: 100%;
        padding: 0.22rem 0.24rem 0.22rem 0.65rem !important;
      }
      .tgn-v40-search input {
        font-size: 0.74rem !important;
      }
      .tgn-v40-search button {
        padding: 0.34rem 0.75rem !important;
        font-size: 0.7rem !important;
      }
    }
  `;
  document.head.appendChild(style);

  if (window.HomeComponent && typeof window.HomeComponent.render === 'function' && !window._tgnV401PlaceholderPatched) {
    window._tgnV401PlaceholderPatched = true;
    const _origRenderV40 = window.HomeComponent.render;
    window.HomeComponent.render = function() {
      return _origRenderV40().replace(
        'placeholder="Szukaj sprzętu w sklepie (np. TaylorMade Qi10, Vokey 52, Pro V1)..."',
        'placeholder="Szukaj sprzętu (np. Qi10, Vokey, Pro V1)..."'
      );
    };
    HomeComponent = window.HomeComponent;
  }
})();
