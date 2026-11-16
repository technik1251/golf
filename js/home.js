/* =========================================================================
   MODUŁ STRONY GŁÓWNEJ / LANDING HUB (TGN v22.0)
   ========================================================================= */

const HomeComponent = {
  render: () => {
    const userName = AppData.user ? AppData.user.name : "Gość TGN";
    const userHcp = AppData.user ? AppData.user.hcp : 12.4;
    const userCity = AppData.user ? AppData.user.city : "Warszawa";
    const cartCount = (AppData.cart || []).reduce((sum, i) => sum + (i.qty || 1), 0);
    const regEventsCount = AppData.events2027.filter(e => e.registered).length;
    const bagCount = AppData.bag.length;
    const forumTotal = AppData.forumPosts.length;
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
      <section class="panel-3d" style="grid-column: span 2; text-align: left; padding: 2rem 1.8rem;">
        <!-- Powitanie i Status -->
        <div style="background:linear-gradient(135deg, rgba(74,222,128,0.14), rgba(56,189,248,0.12)); border:1px solid var(--glass-border); border-radius:18px; padding:1.5rem; margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <span style="font-size:0.72rem; color:var(--accent); font-weight:800; text-transform:uppercase; letter-spacing:1px;">TGN PORTAL 3D • SEZON 2026/2027</span>
            <h2 style="font-size: 1.35rem; color:#fff; margin:0.2rem 0 0.4rem; border:none; padding:0;">Witaj w centrum dowodzenia, ${userName}! 🏌️‍♂️</h2>
            <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.4;">
              Twój Handicap WHS to <strong style="color:var(--accent);">HCP ${userHcp}</strong> (${userCity}). Wybierz poniżej sekcję, do której chcesz przejść.
            </p>
          </div>
          <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
            <button class="btn-primary" style="width:auto; margin:0; padding:0.6rem 1.2rem;" onclick="app.switchTab('sklep')">🛍️ Przejdź do Sklepu</button>
            <button class="btn-action" style="width:auto; margin:0; padding:0.6rem 1.2rem; background:rgba(250,204,21,0.12); border-color:var(--gold); color:var(--gold);" onclick="app.switchTab('forum')">💬 Odwiedź Forum</button>
          </div>
        </div>

        <!-- Kafle Główne (Hub Nawigacyjny) -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 2rem;" class="home-hub-grid">
          
          <div style="background: linear-gradient(145deg, rgba(74,222,128,0.12), rgba(6,16,20,0.9)); border: 1px solid var(--glass-border); border-radius: 18px; padding: 1.5rem 1.1rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: 0.25s;" onclick="app.switchTab('sklep')">
            <div>
              <div style="font-size: 2.2rem; margin-bottom: 0.6rem;">🛍️</div>
              <h3 style="font-size: 1.05rem; color: var(--accent); margin-bottom: 0.35rem; text-transform: uppercase;">Sklep & Komis CPO</h3>
              <p style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.8rem;">
                Nowy sprzęt 2026, używane kije CPO z gwarancją, piłki Lake Balls i kod rabatowy <strong style="color:var(--gold);">RABAT3</strong> (-3%).
              </p>
            </div>
            <button class="btn-primary" style="margin: 0; padding: 0.5rem;">Otwórz Sklep →</button>
          </div>

          <div style="background: linear-gradient(145deg, rgba(56,189,248,0.12), rgba(6,16,20,0.9)); border: 1px solid rgba(56,189,248,0.35); border-radius: 18px; padding: 1.5rem 1.1rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: 0.25s;" onclick="app.switchTab('forum')">
            <div>
              <div style="font-size: 2.2rem; margin-bottom: 0.6rem;">💬</div>
              <h3 style="font-size: 1.05rem; color: var(--blue); margin-bottom: 0.35rem; text-transform: uppercase;">Forum Społeczności</h3>
              <p style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.8rem;">
                Baza wiedzy i porady PGA Pro (2021–2026). Dołącz do dyskusji wśród ${forumTotal} wątków graczy.
              </p>
            </div>
            <button class="btn-action" style="margin: 0; padding: 0.5rem; border-color: var(--blue); color: var(--blue); background: rgba(56,189,248,0.1);">Otwórz Forum →</button>
          </div>

          <div style="background: linear-gradient(145deg, rgba(250,204,21,0.1), rgba(6,16,20,0.9)); border: 1px solid rgba(250,204,21,0.35); border-radius: 18px; padding: 1.5rem 1.1rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: 0.25s;" onclick="app.switchTab('profile')">
            <div>
              <div style="font-size: 2.2rem; margin-bottom: 0.6rem;">👤</div>
              <h3 style="font-size: 1.05rem; color: var(--gold); margin-bottom: 0.35rem; text-transform: uppercase;">Kokpit 3D & Torba</h3>
              <p style="font-size: 0.76rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.8rem;">
                Twój profil gracza, cyfrowa torba 14 kijów ze zdjęciami z sieci i telemetria swingu.
              </p>
            </div>
            <button class="btn-action" style="margin: 0; padding: 0.5rem; border-color: var(--gold); color: var(--gold); background: rgba(250,204,21,0.1);">Otwórz Kokpit →</button>
          </div>

        </div>

        <!-- Dwukolumnowy układ: Statystyki szybkie + Gorące tematy -->
        <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:1.5rem;" class="home-dual-grid">
          <div>
            <h3 style="font-size:0.88rem; text-transform:uppercase; color:var(--accent); margin-bottom:0.75rem;">📊 Statystyki & Skróty</h3>
            <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.75rem; margin-bottom:1rem;">
              <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:0.9rem; text-align:center; cursor:pointer;" onclick="StoreComponent.openCartDrawer()">
                <div style="font-size:1.2rem; margin-bottom:0.2rem;">🛒</div>
                <div style="font-size:1.05rem; font-weight:800; color:var(--gold);">${cartCount} szt.</div>
                <div style="font-size:0.62rem; color:var(--text-muted); text-transform:uppercase;">Twój Koszyk</div>
              </div>
              <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:0.9rem; text-align:center; cursor:pointer;" onclick="app.switchTab('profile')">
                <div style="font-size:1.2rem; margin-bottom:0.2rem;">🎒</div>
                <div style="font-size:1.05rem; font-weight:800; color:var(--accent);">${bagCount}/14</div>
                <div style="font-size:0.62rem; color:var(--text-muted); text-transform:uppercase;">Kijów w torbie</div>
              </div>
            </div>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              <button class="btn-mini-tool" onclick="app.switchTab('pola')">⛳ Atlas Pól w Polsce</button>
              <button class="btn-mini-tool" onclick="app.switchTab('wydarzenia')">📅 Kalendarz 2027 (${regEventsCount})</button>
              <button class="btn-mini-tool" onclick="app.switchTab('marketplace')">🤝 Giełda C2C</button>
            </div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <h3 style="font-size:0.88rem; text-transform:uppercase; color:var(--accent); margin:0;">🔥 Gorące tematy</h3>
              <button class="btn-mini-tool" onclick="app.switchTab('forum')">Wszystkie →</button>
            </div>
            ${recentPostsHTML}
          </div>
        </div>
      </section>
    `;
  }
};
