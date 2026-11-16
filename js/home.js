/* =========================================================================
   MODUŁ STRONY GŁÓWNEJ (DASHBOARD / COMMAND CENTER) TGN v19.0
   ========================================================================= */

const HomeComponent = {
  render: () => {
    const userName = AppData.user ? AppData.user.name : "Marek Kowalski";
    const userHcp = AppData.user ? AppData.user.hcp : 12.4;
    const userCity = AppData.user ? AppData.user.city : "Warszawa";
    const cartCount = (AppData.cart || []).reduce((sum, i) => sum + (i.qty || 1), 0);
    const regEventsCount = AppData.events2027.filter(e => e.registered).length;
    const bagCount = AppData.bag.length;

    // Pobierz 3 najnowsze wątki z forum
    const recentPosts = (AppData.forumPosts || []).slice(0, 3);

    let recentPostsHTML = recentPosts.map(post => `
      <div style="background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:0.85rem; margin-bottom:0.6rem; cursor:pointer; transition:0.2s;" onclick="app.switchTab('forum')">
        <div style="display:flex; justify-content:space-between; font-size:0.68rem; color:var(--accent); margin-bottom:0.2rem;">
          <span>${post.category}</span>
          <span style="color:var(--text-muted);">${post.date}</span>
        </div>
        <strong style="font-size:0.85rem; color:var(--text-main); display:block; margin-bottom:0.2rem;">${post.title}</strong>
        <span style="font-size:0.72rem; color:var(--text-muted);">Autor: ${post.author} • 💬 ${post.comments.length} odpowiedzi</span>
      </div>
    `).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <!-- Powitanie i Status Gracza -->
        <div style="background:linear-gradient(135deg, rgba(74,222,128,0.14), rgba(56,189,248,0.12)); border:1px solid var(--glass-border); border-radius:18px; padding:1.5rem; margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <span style="font-size:0.72rem; color:var(--accent); font-weight:800; text-transform:uppercase; letter-spacing:1px;">TGN PORTAL 3D • SEZON 2026/2027</span>
            <h2 style="font-size:1.4rem; color:#fff; margin:0.2rem 0 0.4rem; border:none; padding:0;">Witaj w centrum dowodzenia, ${userName}! 🏌️‍♂️</h2>
            <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.4;">
              Twój obecny Handicap to <strong style="color:var(--accent);">HCP ${userHcp}</strong> (${userCity}). Sprawdź nowości w Pro Shopie, zarezerwuj Tee Time lub weź udział w dyskusjach na forum.
            </p>
          </div>
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <button class="btn-primary" style="width:auto; margin:0; padding:0.6rem 1.2rem;" onclick="app.switchTab('sklep')">🛍️ Przejdź do Sklepu</button>
            <button class="btn-action" style="width:auto; margin:0; padding:0.6rem 1.2rem; background:rgba(250,204,21,0.12); border-color:var(--gold); color:var(--gold);" onclick="app.switchTab('forum')">💬 Odwiedź Forum</button>
          </div>
        </div>

        <!-- Statystyki Szybkie (Kafle Statusu) -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.85rem; margin-bottom:1.5rem;" class="home-stats-grid">
          <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1rem; text-align:center; cursor:pointer;" onclick="app.switchTab('sklep')">
            <div style="font-size:1.5rem; margin-bottom:0.2rem;">🛒</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--gold);">${cartCount} szt.</div>
            <div style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">Twój Koszyk</div>
          </div>
          <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1rem; text-align:center; cursor:pointer;" onclick="app.switchTab('profile')">
            <div style="font-size:1.5rem; margin-bottom:0.2rem;">🎒</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--accent);">${bagCount}/14</div>
            <div style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">Kijów w torbie</div>
          </div>
          <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1rem; text-align:center; cursor:pointer;" onclick="app.switchTab('wydarzenia')">
            <div style="font-size:1.5rem; margin-bottom:0.2rem;">📅</div>
            <div style="font-size:1.15rem; font-weight:800; color:var(--blue);">${regEventsCount}/6</div>
            <div style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">Zapisy 2027</div>
          </div>
          <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:1rem; text-align:center; cursor:pointer;" onclick="app.switchTab('pola')">
            <div style="font-size:1.5rem; margin-bottom:0.2rem;">⛳</div>
            <div style="font-size:1.15rem; font-weight:800; color:#a3e635;">25 pól</div>
            <div style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">Atlas w Polsce</div>
          </div>
        </div>

        <!-- Dwukolumnowy układ: Skróty modułów + Aktywność forum -->
        <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:1.5rem;" class="home-dual-grid">
          <!-- Kolumna lewa: Główne zakłady portalu -->
          <div>
            <h3 style="font-size:0.88rem; text-transform:uppercase; color:var(--accent); margin-bottom:0.75rem;">🚀 Szybki dostęp do modułów</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); border-radius:14px; padding:1rem; cursor:pointer; transition:0.2s;" onclick="app.switchTab('sklep')">
                <div style="font-size:1.2rem; margin-bottom:0.3rem;">🛍️</div>
                <strong style="font-size:0.86rem; color:#fff; display:block; margin-bottom:2px;">Pro Shop & CPO</strong>
                <span style="font-size:0.7rem; color:var(--text-muted);">Nowy sprzęt, komis i kod RABAT3</span>
              </div>
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); border-radius:14px; padding:1rem; cursor:pointer; transition:0.2s;" onclick="app.switchTab('forum')">
                <div style="font-size:1.2rem; margin-bottom:0.3rem;">💬</div>
                <strong style="font-size:0.86rem; color:#fff; display:block; margin-bottom:2px;">Forum Społeczności</strong>
                <span style="font-size:0.7rem; color:var(--text-muted);">Porady PGA Pro i testy graczy</span>
              </div>
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); border-radius:14px; padding:1rem; cursor:pointer; transition:0.2s;" onclick="app.switchTab('pola')">
                <div style="font-size:1.2rem; margin-bottom:0.3rem;">⛳</div>
                <strong style="font-size:0.86rem; color:#fff; display:block; margin-bottom:2px;">Rezerwacje Pól</strong>
                <span style="font-size:0.7rem; color:var(--text-muted);">Modry Las, Binowo i inne</span>
              </div>
              <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); border-radius:14px; padding:1rem; cursor:pointer; transition:0.2s;" onclick="app.switchTab('marketplace')">
                <div style="font-size:1.2rem; margin-bottom:0.3rem;">🤝</div>
                <strong style="font-size:0.86rem; color:#fff; display:block; margin-bottom:2px;">Marketplace C2C</strong>
                <span style="font-size:0.7rem; color:var(--text-muted);">Kupuj i sprzedawaj między graczami</span>
              </div>
            </div>
          </div>

          <!-- Kolumna prawa: Najnowsze dyskusje na forum -->
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <h3 style="font-size:0.88rem; text-transform:uppercase; color:var(--accent); margin:0;">🔥 Gorące tematy na forum</h3>
              <button class="btn-mini-tool" onclick="app.switchTab('forum')">Zobacz wszystkie →</button>
            </div>
            ${recentPostsHTML}
          </div>
        </div>
      </section>
    `;
  }
};
