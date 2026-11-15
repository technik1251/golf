const CpoComponent = {
  render: () => {
    let itemsHTML = AppData.bag.map(c => {
      const imgSrc = ClubImageEngine.getClubVisualUrl(c.name, c.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(c.name);
      const safeName = c.name.replace(/'/g, "");
      return `
        <div class="cpo-item">
          <div class="club-photo-frame" onclick="app.openPhotoZoom('${safeName}', '${imgSrc}', '${c.loft}')">
            <img src="${imgSrc}" alt="${c.name}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
            <span class="cond-badge">${c.cond}</span>
          </div>
          <div>
            <h3 style="font-size: 0.88rem; color: var(--text-main);">${c.name}</h3>
            <p style="font-size: 0.72rem; color: var(--text-muted);">${c.loft} • Rynkowa: ${c.val}</p>
            <p style="font-size: 0.74rem; color: var(--accent); margin-top: 0.25rem;">Wypłata CPO: <strong style="color: var(--gold);">${c.cpoOffer}</strong></p>
          </div>
          <div class="cpo-actions" style="display: flex; flex-direction: column; gap: 0.4rem;">
            <button class="btn-action" style="margin:0; padding:0.42rem 0.7rem;" onclick="app.showToast('Zlecono wypłatę gotówki CPO dla: ${safeName}')">⚡ Gotówka 24h</button>
            <button class="btn-action" style="margin:0; padding:0.42rem 0.7rem; background:rgba(250,204,21,0.12); border-color:var(--gold); color:var(--gold);" onclick="app.switchTab('sklep')">🔄 Trade-In</button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <h2>⚡ Skup TGN CPO – Natychmiastowa Wycena</h2>
        <p style="font-size: 0.76rem; color: var(--text-muted); margin-bottom: 1rem;">Sprzedaj sprzęt ze swojej cyfrowej torby bez czekania na kupca. Pieniądze na koncie w 24h lub wymiana Trade-In w naszym Sklepie 2026.</p>
        <div class="cpo-grid">${itemsHTML}</div>
      </section>
    `;
  }
};

const MarketplaceComponent = {
  render: () => {
    let itemsHTML = AppData.marketplace.map((item, idx) => {
      const imgId = `mkt_img_${idx}`;
      const imgSrc = ClubImageEngine.getClubVisualUrl(item.title, item.imgUrl);
      const fallbackSrc = ClubImageEngine.getFallbackPhoto(item.title);
      const safeTitle = item.title.replace(/'/g, "");
      return `
        <div class="market-card">
          <div class="club-photo-frame" onclick="app.openPhotoZoom('${safeTitle}', document.getElementById('${imgId}').src, 'Sprzedawca: ${item.seller} • Cena: ${item.price}')">
            <img id="${imgId}" src="${imgSrc}" alt="${item.title}" onerror="this.onerror=null; this.src='${fallbackSrc}';">
            <span class="live-photo-badge">WEB FOTO</span>
          </div>
          <div style="display:flex; flex-direction:column; justify-content:space-between; min-width:0;">
            <div>
              <span style="font-size: 0.65rem; color: var(--gold); font-weight: 700;">${item.cond}</span>
              <h3 style="font-size: 0.86rem; margin: 0.15rem 0; color: var(--text-main);">${item.title}</h3>
              <p style="font-size: 0.7rem; color: var(--text-muted); margin-bottom: 0.35rem;">${item.desc}</p>
              <div style="display:flex; gap:0.35rem; margin-bottom:0.4rem; flex-wrap:wrap;">
                <button class="btn-mini-tool" onclick="app.nextWebSearchPhoto('${imgId}', '${safeTitle}')">📷 Inne foto</button>
                <button class="btn-mini-tool" onclick="app.openGoogleImages('${safeTitle}')">🔎 Google Grafika ↗</button>
              </div>
            </div>
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <span style="font-size: 0.68rem; color: var(--text-muted);">Od: ${item.seller}</span>
                <strong style="font-size: 0.9rem; color: var(--accent);">${item.price}</strong>
              </div>
              <button class="btn-action" style="margin:0; padding:0.42rem;" onclick="app.openChat('${item.seller}')">💬 Napisz do sprzedawcy</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 0.9rem; flex-wrap:wrap; gap:0.5rem;">
          <h2>🤝 TGN Marketplace (C2C)</h2>
          <button class="btn-action" style="width:auto; margin:0; padding:0.38rem 0.8rem;" onclick="app.switchTab('profile'); setTimeout(() => app.toggleAddClubLive(), 100);">+ Wystaw kij</button>
        </div>
        <div class="market-grid">${itemsHTML}</div>
      </section>
    `;
  }
};

const ChatComponent = {
  render: () => {
    let msgsHTML = AppData.chatMessages.map(m => `
      <div class="msg ${m.type}">
        <div style="font-size: 0.62rem; opacity: 0.75; margin-bottom: 2px;">${m.sender}</div>
        <div>${m.text}</div>
      </div>
    `).join('');

    return `
      <section class="panel-3d" style="grid-column: span 2;">
        <h2>💬 Bezpośredni Czat C2C ze Sprzedawcą</h2>
        <div class="chat-container" style="margin-top: 0.8rem;">
          <div class="chat-messages" id="chatMsgs">${msgsHTML}</div>
          <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="Napisz wiadomość..." onkeypress="if(event.key === 'Enter') app.sendChatMessage()">
            <button onclick="app.sendChatMessage()">Wyślij</button>
          </div>
        </div>
      </section>
    `;
  }
};
