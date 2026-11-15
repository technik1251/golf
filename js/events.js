const Events2027Component = {
  render: () => {
    const filtered = AppData.activeEventFilter === "ALL"
      ? AppData.events2027
      : AppData.events2027.filter(e => e.cat === AppData.activeEventFilter);

    const registeredCount = AppData.events2027.filter(e => e.registered).length;

    let eventsHTML = filtered.map(ev => `
      <div class="event-card ${ev.registered ? 'registered' : ''}">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:0.5rem;">
            <span class="event-date-badge">🗓️ ${ev.date}</span>
            <span class="event-xp-badge">⚡ ${ev.xpReward}</span>
          </div>

          <h3 style="font-size: 0.92rem; color: var(--text-main); margin-bottom: 0.3rem; line-height:1.35;">${ev.title}</h3>
          <p style="font-size: 0.74rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.45rem;">${ev.desc}</p>

          <div class="event-meta-list">
            <div><span style="color:var(--text-muted);">📍 Lokalizacja:</span><br><strong style="color:var(--text-main);">${ev.location}</strong></div>
            <div><span style="color:var(--text-muted);">🏆 Format gry:</span><br><strong style="color:var(--text-main);">${ev.format}</strong></div>
            <div><span style="color:var(--text-muted);">💳 Wpisowe:</span><br><strong style="color:var(--accent);">${ev.fee}</strong></div>
            <div><span style="color:var(--text-muted);">👥 Wolne miejsca:</span><br><strong style="color:${ev.spotsLeft <= 8 ? 'var(--gold)' : 'var(--text-main)'};">${ev.spotsLeft} z ${ev.maxSpots}</strong></div>
          </div>

          <div style="background:rgba(74, 222, 128, 0.08); border:1px solid rgba(74, 222, 128, 0.28); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.7rem; color:var(--accent); margin-bottom:0.65rem;">
            🤖 <strong>Analiza AI 2027:</strong> ${ev.aiFit}
          </div>
        </div>

        <button class="btn-action" style="margin:0; ${ev.registered ? 'background:var(--gold); color:#052e16; border-color:var(--gold);' : ''}" onclick="app.toggleEventRegistration(${ev.id})">
          ${ev.registered ? '✓ JESTEŚ ZAPISANY (KLIKNIJ, ABY WYPISAĆ)' : '+ ZAPISZ SIĘ NA WYDARZENIE 2027'}
        </button>
      </div>
    `).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <h2>
          <span>📅 Kalendarz & Analiza Sezonu Turniejowego TGN 2027</span>
          <span style="font-size:0.72rem; color:var(--gold);">Zapisy 2027: ${registeredCount}/6</span>
        </h2>

        <div class="events-analysis-box">
          <div>
            <h3 style="font-size: 0.9rem; color: var(--blue); margin-bottom: 0.3rem;">📊 Raport TGN AI na Sezon 2027 dla: ${AppData.user.name} (HCP ${AppData.user.hcp})</h3>
            <p style="font-size: 0.75rem; color: var(--text-main); line-height: 1.45;">
              Na podstawie Twoich wyników (ostatnia runda: ${AppData.user.lastRound}, swing: <strong>${AppData.user.swingSpeed}</strong>) po uzupełnieniu luki gappingowej (Wedge 52°) i starcie w turniejach <strong>TGN Major</strong> prognozujemy spadek HCP do <strong>9.8</strong> we wrześniu 2027.
            </p>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; text-align:center;">
            <div style="background:rgba(0,0,0,0.4); padding:0.65rem; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
              <span style="font-size:0.62rem; color:var(--text-muted); text-transform:uppercase; display:block;">Prognoza HCP</span>
              <strong style="font-size:1.15rem; color:var(--accent);">12.4 → 9.8</strong>
            </div>
            <div style="background:rgba(0,0,0,0.4); padding:0.65rem; border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
              <span style="font-size:0.62rem; color:var(--text-muted); text-transform:uppercase; display:block;">Pula XP 2027</span>
              <strong style="font-size:1.15rem; color:var(--gold);">+2 750 XP</strong>
            </div>
          </div>
        </div>

        <div class="forum-filters">
          <button class="filter-pill ${AppData.activeEventFilter === 'ALL' ? 'active' : ''}" onclick="app.filterEvents('ALL')">Wszystkie (6)</button>
          <button class="filter-pill ${AppData.activeEventFilter === 'MAJOR' ? 'active' : ''}" onclick="app.filterEvents('MAJOR')">🏆 Turnieje Majors</button>
          <button class="filter-pill ${AppData.activeEventFilter === 'SIM' ? 'active' : ''}" onclick="app.filterEvents('SIM')">👻 Ghost Match & Sim</button>
          <button class="filter-pill ${AppData.activeEventFilter === 'FITTING' ? 'active' : ''}" onclick="app.filterEvents('FITTING')">🎯 Demo Days 2027</button>
          <button class="filter-pill ${AppData.activeEventFilter === 'CAMP' ? 'active' : ''}" onclick="app.filterEvents('CAMP')">☀️ Akademia PGA Pro</button>
        </div>

        <div class="events-grid">
          ${eventsHTML}
        </div>
      </section>
    `;
  }
};
