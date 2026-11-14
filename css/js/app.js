const app = {
  switchTab: (tabName) => {
    const container = document.getElementById('appContainer');
    
    if (tabName === 'profile') {
      // Wyświetla układ 3D z Twojego zdjęcia (profil + torba obok siebie)
      container.innerHTML = ProfileComponent.render() + BagComponent.render();
    } else if (tabName === 'forum') {
      container.innerHTML = `<section class="panel-3d" style="grid-column: span 2;"><h2>Strefa Forum TGN</h2><p style="color:#94a3b8;">Dyskusje, Custom Fitting i sekcje lokalne.</p></section>`;
    } else if (tabName === 'sklep') {
      container.innerHTML = `<section class="panel-3d" style="grid-column: span 2;"><h2>Sklep TGN & Marketplace</h2><p style="color:#94a3b8;">Oficjalny sprzęt 2026 i oferty C2C.</p></section>`;
    }

    document.querySelectorAll('#mainNav button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
  },

  showToast: (msg) => {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
  }
};

// Inicjalizacja po załadowaniu strony
window.addEventListener('DOMContentLoaded', () => {
  app.switchTab('profile');
});
