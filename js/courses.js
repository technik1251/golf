const PolishCoursesComponent = {
  render: () => {
    const q = AppData.courseSearchQuery.toLowerCase();
    const filtered = AppData.polishCourses.filter(c => {
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.voivodeship.toLowerCase().includes(q);
      if (!matchesQuery) return false;
      if (AppData.activeCourseFilter === "18") return c.holes === 18;
      if (AppData.activeCourseFilter === "9") return c.holes === 9;
      if (AppData.activeCourseFilter === "POLNOC") return c.region === "POLNOC";
      if (AppData.activeCourseFilter === "CENTRUM") return c.region === "CENTRUM";
      if (AppData.activeCourseFilter === "POLUDNIE") return c.region === "POLUDNIE";
      return true;
    });

    let coursesHTML = filtered.map(c => {
      const playingHcp = Math.round(AppData.user.hcp * (c.slope / 113) + (c.cr - c.par));
      const safeName = c.name.replace(/'/g, "");

      return `
        <div class="course-card">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:0.4rem;">
              <span class="course-holes-badge ${c.holes === 18 ? 'holes-18' : 'holes-9'}">⛳ ${c.holesLabel} • PAR ${c.par}</span>
              <span style="font-size:0.7rem; color:var(--gold); font-weight:700;">~${c.greenFee}</span>
            </div>

            <h3 style="font-size: 0.92rem; color: var(--text-main); margin-bottom: 0.2rem;">${c.name}</h3>
            <p style="font-size: 0.72rem; color: var(--accent); font-weight:600; margin-bottom: 0.4rem;">📍 ${c.city} (${c.voivodeship})</p>
            <p style="font-size: 0.74rem; color: var(--text-muted); line-height: 1.4;">${c.desc}</p>

            <div class="course-specs-bar">
              <div><span>Długość</span><strong>${c.length}</strong></div>
              <div><span>CR</span><strong>${c.cr}</strong></div>
              <div><span>Slope</span><strong>${c.slope}</strong></div>
              <div><span>Course HCP</span><strong style="color:var(--accent);">+${playingHcp} ud.</strong></div>
            </div>

            <div style="background:rgba(74, 222, 128, 0.08); border:1px solid rgba(74, 222, 128, 0.25); border-radius:8px; padding:0.4rem 0.6rem; font-size:0.7rem; color:#cbd5e1; margin-bottom:0.6rem;">
              🎯 <strong style="color:var(--accent);">Caddy AI:</strong> ${c.aiTip}
            </div>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.45rem;">
            <button class="btn-action" style="margin:0; padding:0.45rem;" onclick="app.logRoundAndRedirect('${safeName}', '${c.bookingUrl}')">📝 Zapisz & Rezerwuj ↗</button>
            <button class="btn-action" style="margin:0; padding:0.45rem; border-color:var(--gold); color:var(--gold); background:rgba(250,204,21,0.1);" onclick="app.openBookingSite('${safeName}', '${c.bookingUrl}')">🕒 Tee Time Online ↗</button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <h2>
          <span>⛳ Atlas & Rezerwacje Pól Golfowych w Polsce (${filtered.length})</span>
          <span style="font-size:0.72rem; color:var(--gold);">Przekierowanie do rezerwacji Tee Time</span>
        </h2>

        <div class="forum-stats-bar">
          <div><div class="forum-stat-num">21+</div><div class="forum-stat-lbl">Mistrzowskich 18d</div></div>
          <div><div class="forum-stat-num">35+</div><div class="forum-stat-lbl">Pól 9d & Akademii</div></div>
          <div><div class="forum-stat-num">141</div><div class="forum-stat-lbl">Max Slope</div></div>
          <div><div class="forum-stat-num" style="color:var(--gold);">HCP ${AppData.user.hcp}</div><div class="forum-stat-lbl">Twoja baza WHS</div></div>
        </div>

        <div class="courses-search-bar">
          <input type="text" id="courseSearchInput" placeholder="🔍 Szukaj pola, miasta lub województwa (np. Szczecin, Binowo, Modry Las)..." value="${AppData.courseSearchQuery}" oninput="app.searchCourses(this.value)">
        </div>

        <div class="forum-filters">
          <button class="filter-pill ${AppData.activeCourseFilter === 'ALL' ? 'active' : ''}" onclick="app.filterCourses('ALL')">Wszystkie (${AppData.polishCourses.length})</button>
          <button class="filter-pill ${AppData.activeCourseFilter === '18' ? 'active' : ''}" onclick="app.filterCourses('18')">🏆 18-dołkowe</button>
          <button class="filter-pill ${AppData.activeCourseFilter === '9' ? 'active' : ''}" onclick="app.filterCourses('9')">⛳ 9-dołkowe</button>
          <button class="filter-pill ${AppData.activeCourseFilter === 'POLNOC' ? 'active' : ''}" onclick="app.filterCourses('POLNOC')">🌊 Północ (Szczecin / Pomorze / Mazury)</button>
          <button class="filter-pill ${AppData.activeCourseFilter === 'CENTRUM' ? 'active' : ''}" onclick="app.filterCourses('CENTRUM')">🏙️ Centrum (Warszawa / Poznań / Łódź)</button>
          <button class="filter-pill ${AppData.activeCourseFilter === 'POLUDNIE' ? 'active' : ''}" onclick="app.filterCourses('POLUDNIE')">⛰️ Południe (Śląsk / Kraków / Wrocław)</button>
        </div>

        <div class="courses-grid">
          ${coursesHTML}
        </div>
      </section>
    `;
  }
};
