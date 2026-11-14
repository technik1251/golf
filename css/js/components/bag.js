const BagComponent = {
  render: () => {
    let clubsHTML = AppData.bag.map(c => `
      <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 0.8rem; margin-bottom: 0.8rem;">
        <h3 style="font-size: 0.9rem; color: #4ade80;">${c.name}</h3>
        <p style="font-size: 0.75rem; color: #94a3b8;">${c.loft}</p>
        <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.75rem;">
          <span>Wartość: <strong>${c.val}</strong></span>
          <span>Stan: <strong>${c.cond}</strong></span>
        </div>
      </div>
    `).join('');

    return `
      <section class="panel-3d panel-right">
        <h2>Moja Torba: Cyfrowa Kopia (14/14 kijów)</h2>
        ${clubsHTML}
        <div style="background: rgba(0,0,0,0.3); padding: 0.9rem; border-radius: 12px; text-align: center; margin-top: 1rem;">
          <p style="font-size: 0.75rem; color: #94a3b8;">CAŁKOWITA WARTOŚĆ TORBY</p>
          <strong style="font-size: 1.3rem; color: #4ade80;">14 200 PLN</strong>
          <button class="btn-action" onclick="app.showToast('Przekierowanie do Skupu TGN CPO...')">⚡ SPRZEDAJ NATYCHMIAST DO SKUPU TGN CPO</button>
          <button class="btn-action" style="background: rgba(250,204,21,0.1); border-color: #facc15; color: #facc15;" onclick="app.showToast('Trade-In wygenerowany!')">🔄 TRADE-IN NA NOWY MODEL 2026</button>
        </div>
      </section>
    `;
  }
};
