/* =========================================================================
   GŁÓWNY KONTROLER PRODUKCYJNY TGN v15.0 (AUTH + ADMIN CMS + TRWAŁA BAZA LOCALDB)
   ========================================================================= */

// Wczytaj zapisane wątki z lokalnej bazy danych przy starcie
(function initPersistentForumDB() {
  try {
    const savedForum = localStorage.getItem('tgn_forum_posts_db');
    if (savedForum) {
      AppData.forumPosts = JSON.parse(savedForum);
    }
  } catch (e) {}
})();

const saveForumToDB = () => {
  try {
    localStorage.setItem('tgn_forum_posts_db', JSON.stringify(AppData.forumPosts));
  } catch (e) {}
};

// Komponent Panelu Administratora (Widoczny tylko dla właściciela sklepu)
const AdminDashboardComponent = {
  render: () => {
    const orders = JSON.parse(localStorage.getItem('tgn_orders_db') || '[]');
    const subscribers = JSON.parse(localStorage.getItem('tgn_newsletter_list') || '[]');
    const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);

    const ordersHTML = orders.length === 0 ? `
      <p style="font-size:0.8rem; color:var(--text-muted); padding:1rem; background:rgba(0,0,0,0.25); border-radius:8px;">Brak złożonych zamówień w bazie. Złóż testowe zamówienie w zakładce Sklep, aby zobaczyć je tutaj.</p>
    ` : orders.map((o, idx) => `
      <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:1rem; margin-bottom:0.75rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.4rem;">
          <strong style="color:var(--gold); font-size:0.9rem;">Zamówienie #${o.orderId} • ${o.date}</strong>
          <span style="background:rgba(74,222,128,0.18); color:var(--accent); padding:3px 9px; border-radius:6px; font-size:0.72rem; font-weight:700;">${o.status}</span>
        </div>
        <p style="font-size:0.78rem; color:var(--text-main);"><strong>Klient:</strong> ${o.customerName} | <strong>Tel:</strong> ${o.phone} | <strong>E-mail:</strong> ${o.email}</p>
        <p style="font-size:0.76rem; color:var(--text-muted);"><strong>Adres dostawy:</strong> ${o.address} (${o.delivery}) | <strong>Faktura NIP:</strong> ${o.nip}</p>
        <p style="font-size:0.75rem; color:var(--accent); margin-top:0.35rem;">
          <strong>Zakupione pozycje:</strong> ${o.items.map(i => `${i.name} (${i.qty || 1}x ${i.price} PLN)`).join(', ')}
        </p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; padding-top:0.4rem; border-top:1px solid rgba(255,255,255,0.06);">
          <span style="font-size:0.72rem; color:var(--text-muted);">Uwagi klienta: ${o.notes}</span>
          <strong style="font-size:1rem; color:var(--gold);">Kwota: ${o.total} PLN</strong>
        </div>
      </div>
    `).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2; border-color:var(--gold);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1.2rem;">
          <h2 style="margin:0; color:var(--gold);">⚙️ PANEL ADMINISTRATORA SKLEPU & FORUM (TGN CMS)</h2>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-action" style="width:auto; margin:0; padding:0.45rem 0.9rem;" onclick="app.switchTab('sklep'); setTimeout(() => StoreComponent.toggleAddProduct(), 80);">➕ Dodaj nowy produkt</button>
            <button class="btn-action" style="width:auto; margin:0; padding:0.45rem 0.9rem; border-color:var(--gold); color:var(--gold);" onclick="app.exportDatabaseJson()">💾 Eksportuj bazę do pliku JSON (Pod serwer Online)</button>
          </div>
        </div>

        <div class="forum-stats-bar">
          <div><div class="forum-stat-num">${AppData.storeProducts.length}</div><div class="forum-stat-lbl">Produktów w sklepie</div></div>
          <div><div class="forum-stat-num" style="color:var(--gold);">${orders.length}</div><div class="forum-stat-lbl">Złożonych zamówień</div></div>
          <div><div class="forum-stat-num">${totalRevenue} PLN</div><div class="forum-stat-lbl">Suma sprzedaży</div></div>
          <div><div class="forum-stat-num" style="color:#38bdf8;">${subscribers.length}</div><div class="forum-stat-lbl">Zapisanych na Newsletter</div></div>
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

const auth = {
  switchAuthMode: (mode) => {
    document.getElementById('tabLoginBtn').classList.toggle('active', mode === 'login');
    document.getElementById('tabRegisterBtn').classList.toggle('active', mode === 'register');
    document.getElementById('loginForm').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = mode === 'register' ? 'block' : 'none';
  },

  loginAsClient: () => {
    AppData.user = { ...DefaultUser, role: 'CLIENT' };
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    auth.enterApp('Zalogowano na konto klienta: ' + AppData.user.name);
  },

  loginAsAdmin: () => {
    AppData.user = { ...DefaultUser, name: "Właściciel TGN (Admin)", email: "admin@tgngolf.pl", role: 'ADMIN' };
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    auth.enterApp('🔑 Zalogowano w trybie Właściciela / Administratora Sklepu!');
  },

  handleLogin: () => {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    if (!email || !pass) {
      app.showToast('Wpisz adres e-mail oraz hasło!');
      return;
    }
    const isAdmin = email.toLowerCase().includes('admin') || pass === 'admin123';
    const nameFromEmail = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
    AppData.user = {
      ...DefaultUser,
      name: isAdmin ? 'Administrator TGN' : (nameFromEmail || DefaultUser.name),
      email,
      role: isAdmin ? 'ADMIN' : 'CLIENT'
    };
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    auth.enterApp('Witaj w TGN Global Golf, ' + AppData.user.name + '!');
  },

  handleRegister: () => {
    const name = document.getElementById('regName').value.trim();
    const hcp = parseFloat(document.getElementById('regHcp').value) || 24.0;
    const city = document.getElementById('regCity').value.trim() || 'Warszawa';
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value.trim();

    if (!name || !email || !pass) {
      app.showToast('Wypełnij wszystkie pola rejestracji!');
      return;
    }

    const level = hcp <= 10 ? 'Zaawansowany' : (hcp <= 20 ? 'Średniozaawansowany' : 'Początkujący');
    AppData.user = { ...DefaultUser, name, email, hcp, level, city, role: 'CLIENT' };
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    auth.enterApp('Utworzono konto gracza: ' + name);
  },

  toggleAdminRoleQuick: () => {
    AppData.user.role = AppData.user.role === 'ADMIN' ? 'CLIENT' : 'ADMIN';
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    auth.updateHeaderBar();
    const currentTab = document.querySelector('#mainNav button.active')?.dataset?.tab || 'sklep';
    app.switchTab(currentTab === 'admin' && AppData.user.role !== 'ADMIN' ? 'sklep' : currentTab);
    app.showToast(AppData.user.role === 'ADMIN' ? '🔑 Włączono tryb Administratora (Edycja sklepu aktywna)' : '👤 Przełączono na widok Klienta');
  },

  enterApp: (msg) => {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainNav').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'grid';
    const footer = document.getElementById('mainFooter');
    if (footer) footer.style.display = 'block';

    auth.updateHeaderBar();
    app.switchTab('sklep');
    if (msg) app.showToast(msg);
  },

  updateHeaderBar: () => {
    const cartCount = AppData.cart.reduce((s, i) => s + (i.qty || 1), 0);
    const isAdmin = AppData.user && AppData.user.role === 'ADMIN';
    const adminNavBtn = document.getElementById('navAdminBtn');
    if (adminNavBtn) adminNavBtn.style.display = isAdmin ? 'inline-block' : 'none';

    document.getElementById('headerRightInfo').innerHTML = `
      <button class="btn-mini-tool" style="border-color:${isAdmin ? 'var(--gold)' : 'rgba(255,255,255,0.2)'}; color:${isAdmin ? 'var(--gold)' : 'var(--text-muted)'};" onclick="auth.toggleAdminRoleQuick()">
        ${isAdmin ? '⚙️ Tryb: ADMIN' : '👤 Widok: KLIENT'}
      </button>
      <span style="font-size: 0.74rem; color: var(--gold); font-weight:800; cursor:pointer;" onclick="app.switchTab('sklep'); StoreComponent.toggleCartDrawer();">🛒 Koszyk (${cartCount})</span>
      <span style="font-size: 0.72rem; color: var(--accent); font-weight:700;">● ${AppData.user.name.split(' ')[0]}</span>
      <button class="btn-logout" onclick="auth.logout()">Wyloguj</button>
    `;
  },

  logout: () => {
    localStorage.removeItem('tgn_user');
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('mainNav').style.display = 'none';
    document.getElementById('appContainer').style.display = 'none';
    const footer = document.getElementById('mainFooter');
    if (footer) footer.style.display = 'none';
    const promoOverlay = document.getElementById('tgnGlobalPromoOverlay');
    if (promoOverlay) promoOverlay.style.display = 'none';
    document.getElementById('headerRightInfo').innerHTML = `<span style="font-size: 0.7rem; color: var(--text-muted);">Sklep Pro Shop & Społeczność</span>`;
    app.showToast('Wylogowano z portalu TGN');
  }
};

const app = {
  previewTimer: null,

  switchTab: (tabName) => {
    const container = document.getElementById('appContainer');
    if (!container) return;

    const promoOverlay = document.getElementById('tgnGlobalPromoOverlay');
    if (promoOverlay && tabName !== 'sklep') promoOverlay.style.display = 'none';

    if (tabName === 'profile') {
      container.style.gridTemplateColumns = "1fr 1.3fr";
      container.innerHTML = ProfileAndBagComponent.render();
    } else {
      container.style.gridTemplateColumns = "1fr";
      if (tabName === 'pola') container.innerHTML = PolishCoursesComponent.render();
      else if (tabName === 'wydarzenia') container.innerHTML = Events2027Component.render();
      else if (tabName === 'sklep') container.innerHTML = StoreComponent.render();
      else if (tabName === 'forum') container.innerHTML = ForumComponent.render();
      else if (tabName === 'cpo') container.innerHTML = CpoComponent.render();
      else if (tabName === 'marketplace') container.innerHTML = MarketplaceComponent.render();
      else if (tabName === 'admin') container.innerHTML = AdminDashboardComponent.render();
      else if (tabName === 'chat') {
        container.innerHTML = ChatComponent.render();
        setTimeout(app.scrollChatToBottom, 50);
      }
    }

    document.querySelectorAll('#mainNav button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
  },

  exportDatabaseJson: () => {
    const dbDump = {
      exportedAt: new Date().toISOString(),
      products: AppData.storeProducts,
      forumPosts: AppData.forumPosts,
      orders: JSON.parse(localStorage.getItem('tgn_orders_db') || '[]'),
      newsletter: JSON.parse(localStorage.getItem('tgn_newsletter_list') || '[]')
    };
    const blob = new Blob([JSON.stringify(dbDump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tgn_database_backup_${Date.now()}.json`;
    a.click();
    app.showToast('💾 Pobrano pełną bazę danych sklepu i forum (.json) gotową do migracji online!');
  },

  openLegalModal: (docType) => {
    const titleEl = document.getElementById('legalModalTitle');
    const bodyEl = document.getElementById('legalModalBody');
    const modal = document.getElementById('legalModalOverlay');
    if (!titleEl || !bodyEl || !modal) return;

    if (docType === 'REGULAMIN') {
      titleEl.textContent = '📜 Regulamin Sklepu Internetowego i Forum TGN Global Golf';
      bodyEl.innerHTML = `
        <p><strong>§1. Postanowienia ogólne</strong><br>Sklep internetowy TGN Global Golf prowadzi sprzedaż fabrycznie nowego sprzętu golfowego, używanych kijów golfowych w programie CPO (Certified Pre-Owned) oraz piłek golfowych (nowych i wyławianych typu Lake Balls).</p><br>
        <p><strong>§2. Program Skup CPO i Rozliczenie Trade-In</strong><br>Każdy używany kij golfowy w dziale CPO przechodzi wielopunktową weryfikację stanu główki, shaftu oraz gripu. Na sprzęt używany CPO udzielana jest 12-miesięczna rękojmia serwisowa TGN.</p><br>
        <p><strong>§3. Zasady Forum Społeczności</strong><br>Użytkownicy zobowiązani są do kulturalnej wymiany opinii sprzętowych i sportowych. Ogłoszenia prywatnej sprzedaży pomiędzy graczami publikowane są wyłącznie w dedykowanym dziale Giełda Graczy C2C.</p>
      `;
    } else if (docType === 'ZWROTY') {
      titleEl.textContent = '🔄 Prawo do odstąpienia od umowy (Zwroty 14 dni)';
      bodyEl.innerHTML = `
        <p><strong>1. Zwrot bez podania przyczyny (14 dni):</strong><br>Konsument ma prawo odstąpić od umowy zakupu zawartej na odległość w terminie 14 dni od otrzymania przesyłki.</p><br>
        <p><strong>2. Wyłączenia ustawowe:</strong><br>Prawo zwrotu nie przysługuje w przypadku produktów wykonanych na indywidualne zamówienie klienta (w szczególności: <em>Personalizowane piłki golfowe z nadrukiem logo lub tekstu klienta</em>) oraz nowych kijów, z których usunięto folię ochronną główki i użyto ich na polu/driving range.</p>
      `;
    } else if (docType === 'RODO') {
      titleEl.textContent = '🔒 Polityka Prywatności i Ochrony Danych (RODO)';
      bodyEl.innerHTML = `
        <p>Administratorem danych osobowych jest TGN Global Golf. Dane przetwarzane są wyłącznie w celu realizacji zamówień sklepowych, obsługi konta gracza na forum oraz wysyłki zamówionego Newslettera (z kodem rabatowym RABAT3). Każdy użytkownik ma prawo wglądu, edycji oraz usunięcia swojego konta.</p>
      `;
    } else {
      titleEl.textContent = '📞 Kontakt, Serwis Golfowy & Centrum Fittingu';
      bodyEl.innerHTML = `
        <p><strong>Infolinia i Doradztwo Sprzętowe PGA:</strong><br>E-mail: sklep@tgngolf.pl | Tel.: +48 600 000 000 (Pon–Pt 9:00–18:00)<br><br><strong>Punkty Partnerskie Fittingu i Odbioru:</strong><br>• Warszawa / Rajszew<br>• Szczecin / Binowo Park</p>
      `;
    }
    modal.style.display = 'flex';
  },

  closeLegalModal: () => {
    const modal = document.getElementById('legalModalOverlay');
    if (modal) modal.style.display = 'none';
  },

  nextWebSearchPhoto: (imgElementId, clubName) => {
    const imgEl = document.getElementById(imgElementId);
    if (!imgEl) return;
    ClubImageEngine.searchVariantIndex += 1;
    const nextPhotoUrl = ClubImageEngine.buildDirectSearchPhotoUrl(clubName, ClubImageEngine.searchVariantIndex);
    ClubImageEngine.cache[clubName] = nextPhotoUrl;
    imgEl.src = nextPhotoUrl;
    app.showToast(`📷 Pobrano kolejne zdjęcie dla: ${clubName}`);
  },

  openGoogleImages: (clubName) => {
    const gUrl = ClubImageEngine.getGoogleImagesUrl(clubName);
    window.open(gUrl, '_blank', 'noopener,noreferrer');
  },

  updateLiveClubPreview: (val, nextVariant = false) => {
    clearTimeout(app.previewTimer);
    app.previewTimer = setTimeout(() => {
      const imgEl = document.getElementById('livePreviewClubImg');
      if (!imgEl) return;
      if (nextVariant) ClubImageEngine.searchVariantIndex += 1;
      const modelText = (val && val.trim().length > 2) ? val.trim() : "Ping G430 Max Driver";
      imgEl.src = ClubImageEngine.buildDirectSearchPhotoUrl(modelText, ClubImageEngine.searchVariantIndex);
    }, 250);
  },

  filterCourses: (filterKey) => {
    AppData.activeCourseFilter = filterKey;
    app.switchTab('pola');
  },

  searchCourses: (val) => {
    AppData.courseSearchQuery = val;
    app.switchTab('pola');
    const input = document.getElementById('courseSearchInput');
    if (input) {
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  },

  logRoundAndRedirect: (courseName, bookingUrl) => {
    const score = Math.floor(Math.random() * 6) + 79;
    AppData.user.lastRound = `${score} (${courseName})`;
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    app.showToast(`Zapisano rundę (${score} ud.)! Przekierowanie do: ${courseName}...`);
    if (bookingUrl) window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  },

  openBookingSite: (courseName, bookingUrl) => {
    app.showToast(`Otwieranie rezerwacji Tee Time: ${courseName}...`);
    if (bookingUrl) window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  },

  filterEvents: (cat) => {
    AppData.activeEventFilter = cat;
    app.switchTab('wydarzenia');
  },

  toggleEventRegistration: (evId) => {
    const ev = AppData.events2027.find(e => e.id === evId);
    if (!ev) return;
    ev.registered = !ev.registered;
    ev.spotsLeft += ev.registered ? -1 : 1;
    auth.updateHeaderBar();
    app.switchTab('wydarzenia');
    app.showToast(ev.registered ? `Zapisano na: ${ev.title} (${ev.xpReward})` : `Wypisano z wydarzenia: ${ev.title}`);
  },

  toggleAddClubLive: () => {
    const box = document.getElementById('addClubLiveBox');
    if (box) box.style.display = box.style.display === 'block' ? 'none' : 'block';
  },

  addClubWithLivePhoto: () => {
    const nameInput = document.getElementById('newClubName');
    const specInput = document.getElementById('newClubSpec');
    const valInput = document.getElementById('newClubVal');
    const customImgInput = document.getElementById('newClubCustomImg');

    const name = nameInput ? nameInput.value.trim().toUpperCase() : '';
    if (!name) {
      app.showToast('Wpisz nazwę modelu kija (np. PING G430 MAX DRIVER)!');
      return;
    }

    const loft = (specInput && specInput.value.trim()) ? specInput.value.trim() : "Specyfikacja Custom Fit";
    const val = (valInput && valInput.value.trim()) ? valInput.value.trim() : "1 950 PLN";
    const customUrl = (customImgInput && customImgInput.value.trim()) ? customImgInput.value.trim() : "";
    const finalImg = customUrl || ClubImageEngine.buildDirectSearchPhotoUrl(name, ClubImageEngine.searchVariantIndex);

    AppData.bag.unshift({
      id: Date.now(), name, loft, val, cpoOffer: "1 500 PLN", speed: "126 mph", smash: "1.44", attack: "+1.5°", cond: "Nowy", imgUrl: finalImg
    });
    app.switchTab('profile');
    app.showToast('Dodano kij do Twojej torby: ' + name);
  },

  openPhotoZoom: (title, imgUrl, meta) => {
    ClubImageEngine.currentModalClub = title;
    document.getElementById('zoomClubTitle').textContent = title;
    document.getElementById('zoomClubImg').src = imgUrl;
    document.getElementById('zoomClubMeta').textContent = meta;
    document.getElementById('photoZoomModal').style.display = 'flex';
  },

  regenerateModalAiPhoto: () => {
    if (!ClubImageEngine.currentModalClub) return;
    ClubImageEngine.searchVariantIndex += 1;
    const newUrl = ClubImageEngine.buildDirectSearchPhotoUrl(ClubImageEngine.currentModalClub, ClubImageEngine.searchVariantIndex);
    ClubImageEngine.cache[ClubImageEngine.currentModalClub] = newUrl;
    document.getElementById('zoomClubImg').src = newUrl;
    app.showToast('📷 Załadowano kolejne zdjęcie tego modelu!');
  },

  openGoogleImagesForModal: () => {
    if (!ClubImageEngine.currentModalClub) return;
    app.openGoogleImages(ClubImageEngine.currentModalClub);
  },

  closePhotoZoom: () => { document.getElementById('photoZoomModal').style.display = 'none'; },
  openAiModal: () => { document.getElementById('aiModalOverlay').style.display = 'flex'; },
  closeAiModal: () => { document.getElementById('aiModalOverlay').style.display = 'none'; },

  filterForum: (catKey) => {
    AppData.activeForumFilter = catKey;
    app.switchTab('forum');
  },

  toggleNewThread: () => {
    const box = document.getElementById('newThreadBox');
    if (box) box.style.display = box.style.display === 'block' ? 'none' : 'block';
  },

  createThread: () => {
    const catKey = document.getElementById('newThreadCat').value;
    const title = document.getElementById('newThreadTitle').value.trim();
    const content = document.getElementById('newThreadContent').value.trim();
    if (!title || !content) return;

    AppData.forumPosts.unshift({
      id: Date.now(), pinned: false, catKey, category: "⚙️ Dyskusja Społeczności TGN", title,
      author: AppData.user.name, badge: "HCP " + AppData.user.hcp, badgeClass: "badge-vet",
      date: new Date().toLocaleDateString('pl-PL'), views: "1", likes: 1, content, comments: []
    });
    saveForumToDB();
    AppData.activeForumFilter = "ALL";
    app.switchTab('forum');
    app.showToast('Opublikowano i zapisano nowy wątek na forum!');
  },

  likePost: (id) => {
    const post = AppData.forumPosts.find(p => p.id === id);
    if (post) {
      post.likes += 1;
      saveForumToDB();
      app.switchTab('forum');
      app.showToast('Doceniono wpis (+1 pkt reputacji)');
    }
  },

  addComment: (id) => {
    const input = document.getElementById('commInput_' + id);
    const text = input ? input.value.trim() : '';
    if (!text) return;
    const post = AppData.forumPosts.find(p => p.id === id);
    if (post) {
      post.comments.push({
        author: AppData.user.name,
        badge: "HCP " + AppData.user.hcp,
        badgeClass: "badge-vet",
        date: "Dzisiaj",
        text
      });
      saveForumToDB();
      app.switchTab('forum');
      app.showToast('Dodano i zapisano odpowiedź w wątku!');
    }
  },

  openChat: (sellerName) => {
    app.switchTab('chat');
    app.showToast('Otwarto czat z: ' + sellerName);
  },

  sendChatMessage: () => {
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;
    AppData.chatMessages.push({ sender: AppData.user.name, text: input.value.trim(), type: "outgoing" });
    input.value = '';
    document.getElementById('appContainer').innerHTML = ChatComponent.render();
    app.scrollChatToBottom();

    setTimeout(() => {
      AppData.chatMessages.push({ sender: "Janusz_G", text: "Dzięki za wiadomość! Odpiszę jak tylko zejdę z driving range.", type: "incoming" });
      const activeBtn = document.querySelector('#mainNav button.active');
      if (activeBtn && activeBtn.dataset.tab === 'chat') {
        document.getElementById('appContainer').innerHTML = ChatComponent.render();
        app.scrollChatToBottom();
      }
    }, 1200);
  },

  scrollChatToBottom: () => {
    const box = document.getElementById('chatMsgs');
    if (box) box.scrollTop = box.scrollHeight;
  },

  showToast: (msg) => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2800);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#mainNav button').forEach(btn => {
    btn.addEventListener('click', () => app.switchTab(btn.dataset.tab));
  });

  document.getElementById('logoBtn').addEventListener('click', () => {
    if (localStorage.getItem('tgn_user')) app.switchTab('sklep');
  });

  const savedSession = localStorage.getItem('tgn_user');
  if (savedSession) {
    try {
      AppData.user = JSON.parse(savedSession);
      auth.enterApp();
    } catch (e) {}
  }
});
