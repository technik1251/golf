/* =========================================================================
   GŁÓWNY KONTROLER PRODUKCYJNY TGN v24.0 (js/app.js)
   - Odporny na duplikaty deklaracji (window.HomeComponent, window.auth, window.app)
   - Wbudowany Ekran Startowy TGN.pl (z kafelkami do sklep.tgn.pl i forum.tgn.pl)
   - Podwójne bindowanie przycisków logowania (onclick + addEventListener)
   ========================================================================= */

// Zabezpieczenie na wypadek, gdyby DefaultUser lub AppData nie były jeszcze zainicjalizowane
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

if (typeof window.AppData === 'undefined') {
  window.AppData = {
    user: { ...window.DefaultUser },
    cart: [],
    storeProducts: [],
    forumPosts: [],
    events2027: [],
    bag: [],
    chatMessages: []
  };
}

// 1. Inicjalizacja trwałej bazy danych przy starcie
(function initPersistentDatabase() {
  try {
    const savedForum = localStorage.getItem('tgn_forum_posts_db');
    if (savedForum && window.AppData) {
      window.AppData.forumPosts = JSON.parse(savedForum);
    }
    const savedCart = localStorage.getItem('tgn_persistent_cart');
    if (savedCart && window.AppData) {
      window.AppData.cart = JSON.parse(savedCart);
    }
  } catch (e) {}
})();

window.saveForumToDB = function() {
  try {
    localStorage.setItem('tgn_forum_posts_db', JSON.stringify(window.AppData.forumPosts || []));
  } catch (e) {}
};

// 2. Wbudowany moduł Strony Głównej / Ekranu Startowego (TGN.pl Hub)
window.HomeComponent = {
  render: function() {
    const userObj = (window.AppData && window.AppData.user) ? window.AppData.user : window.DefaultUser;
    const userName = userObj.name || "Gracz TGN";
    const userHcp = userObj.hcp || 12.4;
    const userCity = userObj.city || "Warszawa";
    const cartCount = (window.AppData.cart || []).reduce((sum, i) => sum + (i.qty || 1), 0);
    const regEventsCount = (window.AppData.events2027 || []).filter(e => e.registered).length;
    const bagCount = (window.AppData.bag || []).length;
    const productsCount = (window.AppData.storeProducts || []).length;
    const forumTotal = (window.AppData.forumPosts || []).length;
    const recentPosts = (window.AppData.forumPosts || []).slice(0, 3);

    const recentPostsHTML = recentPosts.map(post => `
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.85rem; margin-bottom:0.6rem; cursor:pointer; transition:0.2s;" onclick="window.app.switchTab('forum')">
        <div style="display:flex; justify-content:space-between; font-size:0.68rem; color:var(--accent); margin-bottom:0.2rem;">
          <span>${post.category || 'Dyskusja'}</span>
          <span style="color:var(--text-muted);">${post.date || '2026'}</span>
        </div>
        <strong style="font-size:0.85rem; color:var(--text-main); display:block; margin-bottom:0.2rem;">${post.title}</strong>
        <span style="font-size:0.72rem; color:var(--text-muted);">Autor: ${post.author} • 💬 ${(post.comments || []).length} odpowiedzi</span>
      </div>
    `).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2; padding: 1.8rem 1.4rem;">
        <!-- Nagłówek Powitalny Portalu Głównego (TGN.PL) -->
        <div style="background:linear-gradient(135deg, rgba(74,222,128,0.16), rgba(56,189,248,0.12)); border:1px solid var(--glass-border); border-radius:18px; padding:1.5rem; margin-bottom:1.5rem; text-align:center;">
          <span style="font-size:0.7rem; color:var(--accent); font-weight:800; text-transform:uppercase; letter-spacing:1.5px; border:1px solid var(--accent); padding:3px 10px; border-radius:20px;">
            OFICJALNY PORTAL TGN.PL • CENTRALNY HUB
          </span>
          <h1 style="font-size:1.55rem; color:#fff; margin:0.7rem 0 0.4rem; font-weight:900;">
            Witaj w TGN Global Golf, ${userName.split(' ')[0]}! ⛳
          </h1>
          <p style="font-size:0.82rem; color:var(--text-muted); max-width:680px; margin:0 auto; line-height:1.5;">
            Wybierz moduł, do którego chcesz przejść: oficjalny sklep sprzętowy <strong>sklep.tgn.pl</strong>, ogólnopolskie <strong>forum.tgn.pl</strong> lub swój prywatny <strong>Kokpit 3D (HCP ${userHcp})</strong>.
          </p>
        </div>

        <!-- 3 Główne Bramy Portalu (Sklep / Forum / Kokpit 3D) -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.1rem; margin-bottom:1.6rem;">
          
          <!-- Kafel 1: SKLEP.TGN.PL -->
          <div style="background:linear-gradient(155deg, rgba(74,222,128,0.15), rgba(8,20,24,0.95)); border:2px solid var(--accent); border-radius:18px; padding:1.4rem; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer;" onclick="window.app.switchTab('sklep')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                <span style="font-size:2rem;">🛍️</span>
                <span style="font-size:0.65rem; background:var(--accent); color:#052e16; font-weight:900; padding:3px 8px; border-radius:6px;">SKLEP.TGN.PL</span>
              </div>
              <h3 style="font-size:1.1rem; color:#fff; margin-bottom:0.35rem;">Sklep Pro Shop & Komis CPO</h3>
              <p style="font-size:0.76rem; color:var(--text-muted); line-height:1.45; margin-bottom:1rem;">
                ${productsCount} produktów w katalogu: nowe kije 2026, zweryfikowany sprzęt używany CPO, personalizacja piłek oraz kod rabatowy <strong style="color:var(--gold);">RABAT3 (-3%)</strong>.
              </p>
            </div>
            <button type="button" class="btn-primary" style="margin:0; padding:0.6rem;">Wejdź do Sklepu →</button>
          </div>

          <!-- Kafel 2: FORUM.TGN.PL -->
          <div style="background:linear-gradient(155deg, rgba(56,189,248,0.15), rgba(8,20,24,0.95)); border:2px solid var(--blue); border-radius:18px; padding:1.4rem; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer;" onclick="window.app.switchTab('forum')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                <span style="font-size:2rem;">💬</span>
                <span style="font-size:0.65rem; background:var(--blue); color:#041e2b; font-weight:900; padding:3px 8px; border-radius:6px;">FORUM.TGN.PL</span>
              </div>
              <h3 style="font-size:1.1rem; color:#fff; margin-bottom:0.35rem;">Forum Społeczności Golfowej</h3>
              <p style="font-size:0.76rem; color:var(--text-muted); line-height:1.45; margin-bottom:1rem;">
                Baza wiedzy (${forumTotal} aktywnych tematów), recenzje kijów, porady trenerów PGA Pro, umawianie wspólnych rund i dyskusje turniejowe.
              </p>
            </div>
            <button type="button" class="btn-action" style="margin:0; padding:0.6rem; border-color:var(--blue); color:#041e2b; background:var(--blue); font-weight:800;">Wejdź na Forum →</button>
          </div>

          <!-- Kafel 3: KOKPIT 3D & POZOSTAŁE MODUŁY -->
          <div style="background:linear-gradient(155deg, rgba(250,204,21,0.13), rgba(8,20,24,0.95)); border:1px solid rgba(250,204,21,0.5); border-radius:18px; padding:1.4rem; display:flex; flex-direction:column; justify-content:space-between; cursor:pointer;" onclick="window.app.switchTab('profile')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem;">
                <span style="font-size:2rem;">👤</span>
                <span style="font-size:0.65rem; background:var(--gold); color:#052e16; font-weight:900; padding:3px 8px; border-radius:6px;">STREFA GRACZA 3D</span>
              </div>
              <h3 style="font-size:1.1rem; color:#fff; margin-bottom:0.35rem;">Moje Konto & Torba 3D</h3>
              <p style="font-size:0.76rem; color:var(--text-muted); line-height:1.45; margin-bottom:1rem;">
                Twój profil WHS (HCP ${userHcp} • ${userCity}), cyfrowa torba (${bagCount}/14 kijów), analiza luk dystansowych Gapping AI oraz wycena Trade-In.
              </p>
            </div>
            <button type="button" class="btn-action" style="margin:0; padding:0.6rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.14);">Otwórz Kokpit Gracza →</button>
          </div>

        </div>

        <!-- Dolna sekcja: Szybkie skróty portalowe + Ostatnie tematy z Forum -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
          <div>
            <h3 style="font-size:0.85rem; text-transform:uppercase; color:var(--accent); margin-bottom:0.75rem;">⚡ Pozostałe działy portalu TGN</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem;">
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.85rem; cursor:pointer;" onclick="window.app.switchTab('pola')">
                <strong style="color:#fff; font-size:0.82rem; display:block;">⛳ Pola w Polsce</strong>
                <span style="font-size:0.68rem; color:var(--text-muted);">25 pól i rezerwacje Tee Time</span>
              </div>
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.85rem; cursor:pointer;" onclick="window.app.switchTab('wydarzenia')">
                <strong style="color:#fff; font-size:0.82rem; display:block;">📅 Kalendarz 2027</strong>
                <span style="font-size:0.68rem; color:var(--text-muted);">Turnieje i zapisy (${regEventsCount}/6)</span>
              </div>
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.85rem; cursor:pointer;" onclick="window.app.switchTab('cpo')">
                <strong style="color:#fff; font-size:0.82rem; display:block;">🔄 Skup Kijów CPO</strong>
                <span style="font-size:0.68rem; color:var(--text-muted);">Sprzedaj sprzęt od ręki</span>
              </div>
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:0.85rem; cursor:pointer;" onclick="window.app.switchTab('marketplace')">
                <strong style="color:#fff; font-size:0.82rem; display:block;">🤝 Giełda C2C</strong>
                <span style="font-size:0.68rem; color:var(--text-muted);">Ogłoszenia prywatne graczy</span>
              </div>
            </div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <h3 style="font-size:0.85rem; text-transform:uppercase; color:var(--accent); margin:0;">🔥 Najnowsze dyskusje z Forum</h3>
              <button type="button" class="btn-mini-tool" onclick="window.app.switchTab('forum')">Wszystkie →</button>
            </div>
            ${recentPostsHTML}
          </div>
        </div>
      </section>
    `;
  }
};

// 3. Komponent Panelu Administratora (CMS)
window.AdminDashboardComponent = {
  render: function() {
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
    window.AppData.user = { ...window.DefaultUser, role: 'CLIENT' };
    try { localStorage.setItem('tgn_user', JSON.stringify(window.AppData.user)); } catch (e) {}
    window.auth.enterApp('Witaj w portalu TGN, ' + window.AppData.user.name + '!');
  },

  loginAsAdmin: function() {
    window.AppData.user = { ...window.DefaultUser, name: "Właściciel TGN (Admin)", email: "admin@tgngolf.pl", role: 'ADMIN' };
    try { localStorage.setItem('tgn_user', JSON.stringify(window.AppData.user)); } catch (e) {}
    window.auth.enterApp('🔑 Zalogowano w trybie Właściciela / Administratora!');
  },

  handleLogin: function() {
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

  switchTab: function(tabName) {
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

// Aliasy dla globalnego dostępu
var auth = window.auth;
var app = window.app;
var HomeComponent = window.HomeComponent;
var AdminDashboardComponent = window.AdminDashboardComponent;

// 6. Inicjalizacja po załadowaniu drzewa DOM
document.addEventListener('DOMContentLoaded', () => {
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
