const ForumComponent = {
  render: () => {
    const filteredPosts = AppData.activeForumFilter === "ALL"
      ? AppData.forumPosts
      : AppData.forumPosts.filter(p => p.catKey === AppData.activeForumFilter);

    let postsHTML = filteredPosts.map(post => {
      let commentsHTML = post.comments.map(comm => `
        <div class="comment-box">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.2rem; flex-wrap:wrap;">
            <strong style="color: var(--accent);">${comm.author} <span class="user-badge ${comm.badgeClass}">${comm.badge}</span></strong>
            <span style="color: var(--text-muted); font-size: 0.65rem;">${comm.date}</span>
          </div>
          <div style="color: var(--text-main);">${comm.text}</div>
        </div>
      `).join('');

      return `
        <div class="forum-post-card ${post.pinned ? 'pinned' : ''}">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; flex-wrap:wrap;">
            <span style="font-size: 0.7rem; color: ${post.pinned ? 'var(--gold)' : 'var(--accent)'}; font-weight: 700;">${post.category}</span>
            <span style="font-size: 0.66rem; color: var(--text-muted);">${post.date}</span>
          </div>
          <h3 style="font-size: 0.92rem; margin: 0.3rem 0; color: var(--text-main);">${post.title}</h3>
          <p style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.45rem;">
            Autor: <strong style="color:var(--text-main);">${post.author}</strong>
            <span class="user-badge ${post.badgeClass}">${post.badge}</span>
          </p>
          
          <div style="display: flex; gap: 0.8rem; font-size: 0.68rem; color: var(--text-muted); margin-bottom: 0.6rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <span>👁️ ${post.views}</span>
            <span>💬 ${post.comments.length} odp.</span>
            <span style="cursor:pointer; color:var(--accent);" onclick="app.likePost(${post.id})">👍 ${post.likes}</span>
          </div>

          <p style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 0.75rem;">${post.content}</p>
          <div>${commentsHTML}</div>

          <div style="display: flex; gap: 0.45rem; margin-top: 0.7rem;">
            <input type="text" id="commInput_${post.id}" placeholder="Dodaj komentarz..." style="flex:1; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:0.4rem 0.65rem; color:#fff; font-size:0.75rem; outline:none;" onkeypress="if(event.key==='Enter') app.addComment(${post.id})">
            <button class="btn-action" style="width: auto; margin:0; padding: 0.4rem 0.8rem;" onclick="app.addComment(${post.id})">Wyślij</button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.85rem; flex-wrap:wrap; gap:0.5rem;">
          <h2>💬 TGN Forum & Baza Wiedzy (2021–2026)</h2>
          <button class="btn-action" style="width: auto; padding: 0.4rem 0.85rem; margin: 0;" onclick="app.toggleNewThread()">+ Nowy wątek</button>
        </div>

        <div class="forum-stats-bar">
          <div><div class="forum-stat-num">14 820</div><div class="forum-stat-lbl">Graczy</div></div>
          <div><div class="forum-stat-num">42 690</div><div class="forum-stat-lbl">Postów</div></div>
          <div><div class="forum-stat-num">1 140</div><div class="forum-stat-lbl">Poradników</div></div>
          <div><div class="forum-stat-num" style="color:var(--gold);">318</div><div class="forum-stat-lbl">Online</div></div>
        </div>

        <div id="newThreadBox" class="new-thread-box">
          <h3 style="font-size: 0.82rem; color: var(--accent); margin-bottom: 0.5rem;">Nowy wątek na forum TGN</h3>
          <div class="form-group">
            <select id="newThreadCat">
              <option value="FITTING">⚙️ Custom Fitting & Telemetria</option>
              <option value="SPRZET">🏌️ Sprzęt & Recenzje Graczy</option>
              <option value="PORADNIKI">🎓 Porady PGA Pro</option>
            </select>
          </div>
          <div class="form-group">
            <input type="text" id="newThreadTitle" placeholder="Tytuł Twojego tematu...">
          </div>
          <div class="form-group">
            <textarea id="newThreadContent" rows="3" placeholder="Opisz swój problem lub doświadczenia..."></textarea>
          </div>
          <button class="btn-primary" onclick="app.createThread()">Opublikuj temat</button>
        </div>

        <div class="forum-filters">
          <button class="filter-pill ${AppData.activeForumFilter === 'ALL' ? 'active' : ''}" onclick="app.filterForum('ALL')">Wszystkie</button>
          <button class="filter-pill ${AppData.activeForumFilter === 'PORADNIKI' ? 'active' : ''}" onclick="app.filterForum('PORADNIKI')">🎓 Poradniki Pro</button>
          <button class="filter-pill ${AppData.activeForumFilter === 'FITTING' ? 'active' : ''}" onclick="app.filterForum('FITTING')">⚙️ Fitting</button>
          <button class="filter-pill ${AppData.activeForumFilter === 'SPRZET' ? 'active' : ''}" onclick="app.filterForum('SPRZET')">🏌️ Sprzęt</button>
        </div>

        <div>${postsHTML}</div>
      </section>
    `;
  }
};
