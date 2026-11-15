const auth = {
  switchAuthMode: (mode) => {
    document.getElementById('tabLoginBtn').classList.toggle('active', mode === 'login');
    document.getElementById('tabRegisterBtn').classList.toggle('active', mode === 'register');
    document.getElementById('loginForm').style.display = mode === 'login' ? 'block' : 'none';
    document.getElementById('registerForm').style.display = mode === 'register' ? 'block' : 'none';
  },

  loginDemo: () => {
    AppData.user = { ...DefaultUser };
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    auth.enterApp('Zalogowano do kokpitu 3D: ' + AppData.user.name);
  },

  handleLogin: () => {
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    if (!email || !pass) {
      app.showToast('Wpisz e-mail oraz hasło!');
      return;
    }
    const nameFromEmail = email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
    AppData.user = { ...DefaultUser, name: nameFromEmail || DefaultUser.name, email };
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    auth.enterApp('Witaj w kokpicie 3D, ' + AppData.user.name + '!');
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
    AppData.user = { ...DefaultUser, name, email, hcp, level, city };
    localStorage.setItem('tgn_user', JSON.stringify(AppData.user));
    auth.enterApp('Utworzono profil 3D: ' + name);
  },

  enterApp: (msg) => {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainNav').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'grid';

    auth.updateHeaderBar();
    app.switchTab('profile');
    if (msg) app.showToast(msg);
  },

  updateHeaderBar: () => {
    const cartCount = AppData.cart.length;
    const regEventsCount = AppData.events2027.filter(e => e.registered).length;
    document.getElementById('headerRightInfo').innerHTML = `
      <span style="font-size: 0.72rem; color: var(--blue); font-weight:700; cursor:pointer;" onclick="app.switchTab('wydarzenia')">📅 2027 (${regEventsCount})</span>
      <span style="font-size: 0.72rem; color: var(--gold); font-weight:700; cursor:pointer;" onclick="app.switchTab('sklep')">🛒 (${cartCount})</span>
      <span style="font-size: 0.72rem; color: var(--accent); font-weight:700;">● ${AppData.user.name.split(' ')[0]}</span>
      <button class="btn-logout" onclick="auth.logout()">Wyloguj</button>
    `;
  },

  logout: () => {
    localStorage.removeItem('tgn_user');
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('mainNav').style.display = 'none';
    document.getElementById('appContainer').style.display = 'none';
    document.getElementById('headerRightInfo').innerHTML = `<span style="font-size: 0.7rem; color: var(--text-muted);">Modular Architecture v11.0</span>`;
    app.showToast('Wylogowano z kokpitu 3D');
  }
};

const app = {
  previewTimer: null,

  switchTab: (tabName) => {
    const container = document.getElementById('appContainer');
    if (!container) return;

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
      else if (tabName === 'chat') {
        container.innerHTML = ChatComponent.render();
        setTimeout(app.scrollChatToBottom, 50);
      }
    }

    document.querySelectorAll('#mainNav button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
  },

  nextWebSearchPhoto: (imgElementId, clubName) => {
    const imgEl = document.getElementById(imgElementId);
    if (!imgEl) return;
    ClubImageEngine.searchVariantIndex += 1;
    const nextPhotoUrl = ClubImageEngine.buildDirectSearchPhotoUrl(clubName, ClubImageEngine.searchVariantIndex);
    ClubImageEngine.cache[clubName] = nextPhotoUrl;
    imgEl.src = nextPhotoUrl;
    app.showToast(`📷 Pobrano kolejne zdjęcie z wyszukiwarki dla: ${clubName}`);
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

  filterStore: (cat) => {
    AppData.activeStoreFilter = cat;
    app.switchTab('sklep');
  },

  addToCart: (prodId, useTradeIn) => {
    const prod = AppData.storeProducts.find(p => p.id === prodId);
    if (!prod) return;
    const finalPrice = useTradeIn ? prod.tradeInPrice : prod.price;
    AppData.cart.push({ name: prod.name + (useTradeIn ? " (Trade-In)" : ""), price: finalPrice });
    auth.updateHeaderBar();
    app.switchTab('sklep');
    app.showToast(`Dodano do koszyka: ${prod.name} (${finalPrice} PLN)`);
  },

  checkoutStore: () => {
    AppData.cart = [];
    auth.updateHeaderBar();
    app.switchTab('sklep');
    app.showToast('Zamówienie przyjęte! Konsultant TGN skontaktuje się w sprawie Fittingu.');
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
    app.showToast('Dodano kij z prawdziwym zdjęciem z sieci: ' + name);
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
    app.showToast('📷 Załadowano inne zdjęcie tego modelu z wyszukiwarki!');
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
      date: "Przed chwilą", views: "1", likes: 1, content, comments: []
    });
    AppData.activeForumFilter = "ALL";
    app.switchTab('forum');
    app.showToast('Opublikowano nowy wątek na forum!');
  },

  likePost: (id) => {
    const post = AppData.forumPosts.find(p => p.id === id);
    if (post) {
      post.likes += 1;
      app.switchTab('forum');
      app.showToast('Dodano punkt reputacji (+1 XP)');
    }
  },

  addComment: (id) => {
    const input = document.getElementById('commInput_' + id);
    const text = input ? input.value.trim() : '';
    if (!text) return;
    const post = AppData.forumPosts.find(p => p.id === id);
    if (post) {
      post.comments.push({ author: AppData.user.name, badge: "HCP " + AppData.user.hcp, badgeClass: "badge-vet", date: "Przed chwilą", text });
      app.switchTab('forum');
      app.showToast('Dodano odpowiedź!');
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
      AppData.chatMessages.push({ sender: "Janusz_G", text: "Świetnie! Mogę przesłać dodatkowe zdjęcia główki kija w zbliżeniu.", type: "incoming" });
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
    setTimeout(() => { toast.style.display = 'none'; }, 2600);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#mainNav button').forEach(btn => {
    btn.addEventListener('click', () => app.switchTab(btn.dataset.tab));
  });

  document.getElementById('logoBtn').addEventListener('click', () => {
    if (localStorage.getItem('tgn_user')) app.switchTab('profile');
  });

  const savedSession = localStorage.getItem('tgn_user');
  if (savedSession) {
    try {
      AppData.user = JSON.parse(savedSession);
      auth.enterApp();
    } catch (e) {}
  }
});
