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
      if (tabName === 'home') container.innerHTML = HomeComponent.render();
      else if (tabname === 'sklep' || tabName === 'sklep') container.innerHTML = StoreComponent.render();
      else if (tabName === 'forum') container.innerHTML = ForumComponent.render();
      else if (tabName === 'pola') container.innerHTML = PolishCoursesComponent.render();
      else if (tabName === 'wydarzenia') container.innerHTML = Events2027Component.render();
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

    if (typeof StoreComponent !== 'undefined' && StoreComponent.syncGlobalCartDrawer) {
      StoreComponent.syncGlobalCartDrawer();
    }
  },

  enterApp: (msg) => {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainNav').style.display = 'flex';
    document.getElementById('appContainer').style.display = 'grid';
    const footer = document.getElementById('mainFooter');
    if (footer) footer.style.display = 'block';

    auth.updateHeaderBar();
    app.switchTab('home'); // <- Ustawione na Stronę Główną jako Landing Hub
    if (msg) app.showToast(msg);
  },
