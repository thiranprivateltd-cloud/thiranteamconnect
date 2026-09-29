/**
 * UI Component Renderers for Thiran Team Connect 2026
 * Renders Team Grid, Avatars, Cheers, Ideas, Awards, and Gallery
 */

const UIComponents = {
  // 1. Render Team Grid
  renderTeamGrid(members, containerId = "team-grid-container") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = members.map(member => `
      <article class="team-member-card" data-dept="${member.dept}">
        <div class="member-avatar-wrapper">
          <div class="member-avatar" style="background: ${member.bgGradient};">
            <span style="color: #ffffff;">${member.initials}</span>
          </div>
        </div>
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.role}</p>
        <div class="member-statement">
          <span class="statement-label">Proud of Building:</span>
          &ldquo;${member.proudOf}&rdquo;
          ${member.funFact ? `<div class="member-fun-fact"><span class="fun-fact-label">FUN FACT:</span> ${member.funFact}</div>` : ''}
        </div>
      </article>
    `).join('');
  },

  // 2. Render Hero Mini Avatar Stack
  renderHeroAvatarStack(members, containerId = "hero-avatar-stack") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sample = members.slice(0, 5);
    const countRemaining = members.length - 5;

    let html = sample.map(m => `
      <div class="stack-avatar" style="background: ${m.bgGradient}; color: #fff;" title="${m.name} (${m.role})">
        ${m.initials}
      </div>
    `).join('');

    if (countRemaining > 0) {
      html += `<div class="stack-avatar stack-more">+${countRemaining}</div>`;
    }

    container.innerHTML = html;
  },

  // 3. Populate Nominee Dropdown in Award Form
  populateNomineeOptions(members, selectId = "nom-nominee") {
    const select = document.getElementById(selectId);
    if (!select) return;

    const options = members.map(m => `<option value="${m.name}">${m.name} — ${m.role}</option>`).join('');
    select.innerHTML = `<option value="">Choose a team member</option>` + options;
  },

  // 4. Render Cheer Wall
  renderCheers(cheers, containerId = "cheer-wall-grid") {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!cheers || cheers.length === 0) {
      container.innerHTML = `
        <div class="empty-state-card">
          <span class="empty-icon">💌</span>
          <h4>No cheers posted yet</h4>
          <p>Be the first teammate to drop a note of appreciation or celebrate someone special using the form above!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = cheers.map(c => `
      <div class="cheer-card ${c.isNew ? 'newly-dropped' : ''}">
        <div>
          <div class="cheer-header">
            <span class="cheer-tag-pill">${c.tag}</span>
            <span class="cheer-time">${c.time}</span>
          </div>
          <p class="cheer-message-text">&ldquo;${c.message}&rdquo;</p>
        </div>
        <div class="cheer-meta">
          <span>From: <strong>${c.author}</strong></span>
          <span>To: <strong>${c.recipient}</strong></span>
        </div>
      </div>
    `).join('');
  },

  // 5. Render Ideas List
  renderIdeas(ideas, containerId = "idea-cards-list") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const countBadge = document.getElementById("idea-count-badge");

    if (!ideas || ideas.length === 0) {
      if (countBadge) countBadge.textContent = "0 Ideas";
      container.innerHTML = `
        <div class="empty-state-card">
          <span class="empty-icon">💡</span>
          <h4>Idea Box is open</h4>
          <p>Submit suggestions, feature concepts, or discussion topics using the form on the left. They will appear here live.</p>
        </div>
      `;
      return;
    }

    if (countBadge) countBadge.textContent = `${ideas.length} Ideas`;

    container.innerHTML = ideas.map(idea => `
      <div class="idea-card-item">
        <span class="idea-item-tag">${idea.category}</span>
        <h4 class="idea-item-title">${idea.title}</h4>
        <p class="idea-item-body">${idea.body}</p>
        <div class="idea-item-footer">
          <span>By: <strong>${idea.author}</strong></span>
          <span>${idea.time}</span>
        </div>
      </div>
    `).join('');
  },

  // 6. Render Post-Event Photo Gallery
  renderGallery(containerId = "recap-photo-gallery") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const photos = [
      { title: "Morning Welcome & Breakfast at Vel Tech Lawn", bg: "linear-gradient(135deg, #FEF3C7, #FDE68A)", icon: "☕🌱" },
      { title: "Founder Keynote & 2026 Vision Reveal", bg: "linear-gradient(135deg, #FDBA74, #FB923C)", icon: "🎙️✨" },
      { title: "LaunchLab & NextStep Product Spotlights", bg: "linear-gradient(135deg, #93C5FD, #60A5FA)", icon: "🚀💻" },
      { title: "Annual Awards Celebration & Trophies", bg: "linear-gradient(135deg, #FCD34D, #F59E0B)", icon: "🏆🌟" },
      { title: "Team Momentum Garden Problem Challenge", bg: "linear-gradient(135deg, #A7F3D0, #34D399)", icon: "🎯🤝" },
      { title: "Official Thiran Team Portrait & Swag Hampers", bg: "linear-gradient(135deg, #F472B6, #FB7185)", icon: "📸🎉" }
    ];

    container.innerHTML = photos.map(p => `
      <div class="gallery-card">
        <div class="gallery-art" style="background: ${p.bg};">
          <span style="font-size: 3rem;">${p.icon}</span>
        </div>
        <div class="gallery-caption">${p.title}</div>
      </div>
    `).join('');
  },

  // 7. Render Award Winners (Will be Revealing Soon!)
  renderAwardWinners(winners, containerId = "award-winners-grid") {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = winners.map(w => `
      <div class="winner-card revealing-soon-card">
        <div class="winner-trophy">🏆</div>
        <span class="winner-category">${w.category} Category</span>
        <h4 class="winner-name highlight-gold">${w.winner}</h4>
        <p class="winner-role">${w.role}</p>
        <p class="winner-citation">${w.citation}</p>
      </div>
    `).join('');
  }
};
