const ProfileComponent = {
  render: () => {
    return `
      <section class="panel-3d panel-left">
        <h2>Profil Gracza: Marek Kowalski 🇵🇱</h2>
        
        <div style="display: flex; gap: 1.2rem; align-items: center; margin-bottom: 1.2rem; background: rgba(0,0,0,0.25); padding: 1rem; border-radius: 12px;">
          <div style="width: 85px; height: 110px; background: linear-gradient(135deg, #4ade80, #064e3b); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #052e16; font-size: 1.5rem; border: 1px solid var(--accent);">
            MK
          </div>
          <div>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Handicap Index</p>
            <strong style="font-size: 1.2rem; color: var(--accent);">12.4</strong>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem;">Poziom: <strong>Średniozaawansowany</strong></p>
            <p style="font-size: 0.75rem; color: var(--text-muted);">Lokalizacja: <strong>Warszawa</strong></p>
          </div>
        </div>

        <div class="stat-card">
          <span>Ostatnia Runda</span>
          <strong>82 (Sobota)</strong>
        </div>

        <div class="stat-card" style="flex-direction: column; align-items: flex-start;">
          <div style="display:flex; justify-content:space-width; width:100%;">
            <span>Średnia Prędkość Swingu</span>
            <strong>96 mph</strong>
          </div>
          <div class="mini-chart" style="width:100%;">
            <svg viewBox="0 0 100 30" width="100%" height="30">
              <path class="chart-line" d="M0,25 Q25,10 50,18 T100,5" fill="none" stroke-width="2"/>
            </svg>
          </div>
        </div>

        <div class="stat-card" style="border-color: var(--gold);">
          <div>
            <span style="color: var(--gold); font-weight: 700;">⚠️ Gapping AI: Sprawdź Gap Wedge</span>
            <p style="font-size: 0.7rem; color: var(--text-muted);">Wykryto lukę 15m między Pitchingiem a Sand Wedge.</p>
          </div>
          <button class="btn-action" style="width: auto; padding: 0.3rem 0.8rem;" onclick="app.showToast('Optymalizacja Gap Wedge w toku...')">Analizuj</button>
        </div>
      </section>
    `;
  }
};
