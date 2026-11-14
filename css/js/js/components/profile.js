const ProfileComponent = {
  render: () => {
    return `
      <section class="panel-3d panel-left">
        <h2>Profil Gracza: ${AppData.user.name} 🇵🇱</h2>
        
        <div style="display: flex; gap: 1.2rem; align-items: center; margin-bottom: 1.2rem; background: rgba(0,0,0,0.25); padding: 1rem; border-radius: 12px;">
          <div style="width: 85px; height: 110px; background: linear-gradient(135deg, #4ade80, #064e3b); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #052e16; font-size: 1.5rem; border: 1px solid #4ade80;">
            MK
          </div>
          <div>
            <p style="font-size: 0.8rem; color: #94a3b8;">Handicap Index</p>
            <strong style="font-size: 1.2rem; color: #4ade80;">${AppData.user.hcp}</strong>
            <p style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.4rem;">Poziom: <strong>${AppData.user.level}</strong></p>
            <p style="font-size: 0.75rem; color: #94a3b8;">Lokalizacja: <strong>${AppData.user.city}</strong></p>
          </div>
        </div>

        <div class="stat-card">
          <span>Ostatnia Runda</span>
          <strong>${AppData.user.lastRound}</strong>
        </div>

        <div class="stat-card">
          <span>Średnia Prędkość Swingu</span>
          <strong>${AppData.user.swingSpeed}</strong>
        </div>

        <div class="stat-card" style="border-color: #facc15;">
          <div>
            <span style="color: #facc15; font-weight: 700;">⚠️ Gapping AI: Sprawdź Gap Wedge</span>
            <p style="font-size: 0.7rem; color: #94a3b8;">Wykryto lukę dystansu w dolnym zakresie.</p>
          </div>
          <button class="btn-action" style="width: auto; padding: 0.3rem 0.8rem;" onclick="app.showToast('Analiza AI w toku...')">Analizuj</button>
        </div>
      </section>
    `;
  }
};
