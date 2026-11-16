/* =========================================================================
   MODUŁ STRONY STARTOWEJ / LANDING HUB (TGN v21.0)
   ========================================================================= */

const HomeComponent = {
  render: () => {
    const userName = AppData.user ? AppData.user.name : "Gość TGN";
    const cartCount = (AppData.cart || []).reduce((sum, i) => sum + (i.qty || 1), 0);
    const productsTotal = AppData.storeProducts.length;
    const forumTotal = AppData.forumPosts.length;

    return `
      <section class="panel-3d" style="grid-column: span 2; text-align: center; padding: 2.5rem 1.5rem;">
        <!-- Nagłówek powitalny -->
        <div style="max-width: 800px; margin: 0 auto 2rem auto;">
          <span style="font-size: 0.75rem; color: var(--accent); font-weight: 800; text-transform: uppercase; letter-spacing: 2px; border: 1px solid var(--accent); padding: 3px 10px; border-radius: 6px;">
            TGN GLOBAL GOLF • PORTAL & PRO SHOP 2026/2027
          </span>
          <h1 style="font-size: 2.2rem; color: #fff; margin: 1rem 0 0.5rem 0; font-weight: 900; letter-spacing: 0.5px;">
            Witaj w Świecie Profesjonalnego Golfa
          </h1>
          <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
            Wybierz sekcję, do której chcesz przejść. Zarządzaj sprzętem w Pro Shopie, dyskutuj z graczami na forum lub sprawdzaj telemetrię w kokpicie 3D.
          </p>
        </div>

        <!-- Główne kafle nawigacyjne (Ekran Startowy) -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; max-width: 1100px; margin: 0 auto;" class="home-hub-grid">
          
          <!-- Kafel 1: Sklep -->
          <div style="background: linear-gradient(145deg, rgba(74,222,128,0.12), rgba(6,16,20,0.9)); border: 1px solid var(--glass-border); border-radius: 18px; padding: 1.8rem 1.2rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: 0.25s;" onclick="app.switchTab('sklep')">
            <div>
              <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🛍️</div>
              <h3 style="font-size: 1.15rem; color: var(--accent); margin-bottom: 0.4rem; text-transform: uppercase;">Sklep & Komis CPO</h3>
              <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 1rem;">
                Nowy sprzęt PGA 2026, weryfikowane używane kije CPO, piłki Lake Balls i akcesoria. Sprawdź kod <strong style="color:var(--gold);">RABAT3</strong> (-3%).
              </p>
            </div>
            <button class="btn-primary" style="margin: 0; padding: 0.55rem;">Przejdź do sklep.tgn.pl →</button>
          </div>

          <!-- Kafel 2: Forum -->
          <div style="background: linear-gradient(145deg, rgba(56,189,248,0.12), rgba(6,16,20,0.9)); border: 1px solid rgba(56,189,248,0.35); border-radius: 18px; padding: 1.8rem 1.2rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: 0.25s;" onclick="app.switchTab('forum')">
            <div>
              <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">💬</div>
              <h3 style="font-size: 1.15rem; color: var(--blue); margin-bottom: 0.4rem; text-transform: uppercase;">Forum Społeczności</h3>
              <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 1rem;">
                5-letnia baza wiedzy (2021–2026). Porady PGA Pro, custom fitting, dyskusje o sprzęcie i giełda graczy. Dołącz do ${forumTotal} postów!
              </p>
            </div>
            <button class="btn-action" style="margin: 0; padding: 0.55rem; border-color: var(--blue); color: var(--blue); background: rgba(56,189,248,0.1);">Odwiedź forum.tgn.pl →</button>
          </div>

          <!-- Kafel 3: Kokpit 3D / Torba -->
          <div style="background: linear-gradient(145deg, rgba(250,204,21,0.1), rgba(6,16,20,0.9)); border: 1px solid rgba(250,204,21,0.35); border-radius: 18px; padding: 1.8rem 1.2rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: 0.25s;" onclick="app.switchTab('profile')">
            <div>
              <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">👤</div>
              <h3 style="font-size: 1.15rem; color: var(--gold); margin-bottom: 0.4rem; text-transform: uppercase;">Kokpit 3D & Torba</h3>
              <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 1rem;">
                Twój profil, handicap WHS (${userHcp}), cyfrowa torba 14 kijów ze zdjęciami z sieci i telemetria swingu.
              </p>
            </div>
            <button class="btn-action" style="margin: 0; padding: 0.55rem; border-color: var(--gold); color: var(--gold); background: rgba(250,204,21,0.1);">Otwórz Kokpit 3D →</button>
          </div>

        </div>

        <!-- Dodatkowe szybkie skróty wierszem -->
        <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
          <button class="btn-mini-tool" style="padding: 0.5rem 1rem; font-size: 0.75rem;" onclick="app.switchTab('pola')">⛳ Atlas Pól w Polsce (Rezerwacje)</button>
          <button class="btn-mini-tool" style="padding: 0.5rem 1rem; font-size: 0.75rem;" onclick="app.switchTab('wydarzenia')">📅 Kalendarz Turniejów 2027</button>
          <button class="btn-mini-tool" style="padding: 0.5rem 1rem; font-size: 0.75rem;" onclick="app.switchTab('cpo')">⚡ Szybka Wycena Kija (Skup)</button>
          <button class="btn-mini-tool" style="padding: 0.5rem 1rem; font-size: 0.75rem;" onclick="StoreComponent.openCartDrawer()">🛒 Koszyk (${cartCount} szt.)</button>
        </div>
      </section>
    `;
  }
};
