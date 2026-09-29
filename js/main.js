/**
 * Main application coordinator for Thiran Team Connect 2026 (Paper & Ink Theme)
 * Orchestrates all 14 Restrained Editorial Animations:
 * 1. Sunrise/Paper wipe intro
 * 2. Scroll-triggered section reveals (IntersectionObserver)
 * 3. Countdown digit flipping
 * 4. Idea Box submission ink-stamp confirmation
 * 5. Hero headline single-tone terracotta shimmer
 * 6. Word-swap loop ("Recognize." -> "Connect." -> "Grow.")
 * 7 & 8. Floating ink-blot shapes & subtle parallax
 * 9. Timeline drawing-in line on scroll
 * 10. Highlight card flip interactions
 * 11. Wish wall paper note drop-in animation
 * 12. Button magnetic hover (cursor attraction)
 * 13. RSVP / Nomination form success morph into ink stamp
 * 14. Form field ink line focus
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize State Manager & Render Components
  window.eventStateManager.init();

  UIComponents.renderTeamGrid(THIRAN_DATA.team);
  UIComponents.renderHeroAvatarStack(THIRAN_DATA.team);
  UIComponents.populateNomineeOptions(THIRAN_DATA.team);
  UIComponents.renderCheers(THIRAN_DATA.initialCheers);
  UIComponents.renderIdeas(THIRAN_DATA.initialIdeas);
  UIComponents.renderGallery();
  UIComponents.renderAwardWinners(THIRAN_DATA.awardWinners);

  // 2. Intro Animation Orchestration (Sunrise / Paper Wipe)
  setupIntroAnimation();

  // 3. Mobile Navigation & Sticky Header
  setupNavigation();

  // 4. Team Filtering & Search
  setupTeamFilters();

  // 5. RSVP Form Submission with Ink-Stamp Morph
  setupRSVPForm();

  // 6. Award Nomination Selector & Submission
  setupNominationSystem();

  // 7. Cheer Wall Form & Note Drop
  setupCheerForm();

  // 8. Idea Box Form & Ink Confirmation
  setupIdeaForm();

  // 9. Word Swap Loop ("Recognize." -> "Connect." -> "Grow.")
  setupWordSwapLoop();

  // 10. Scroll-Triggered Section Reveals & Timeline Pen Stroke Draw-in (IntersectionObserver)
  setupScrollAnimations();

  // 11. Highlight Card Flipping (Touch/Click Support)
  setupCardFlips();

  // 12. Button Magnetic Hover
  setupMagneticButtons();

  // 13. Subtle Parallax for Ink Blots
  setupInkParallax();
});

/**
 * 1. Intro Animation (Sunrise / Paper Wipe)
 */
function setupIntroAnimation() {
  const introOverlay = document.getElementById("intro-overlay");
  const skipBtn = document.getElementById("skip-intro-btn");
  const orbitContainer = document.getElementById("avatar-orbit");
  const replayBtn = document.getElementById("replay-intro-btn");

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasSeenIntro = sessionStorage.getItem("thiran_intro_seen");

  if (prefersReduced || hasSeenIntro) {
    if (introOverlay) introOverlay.classList.add("dismissed");
    return;
  }

  playIntroSequence();

  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      dismissIntro();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      sessionStorage.removeItem("thiran_intro_seen");
      if (introOverlay) {
        introOverlay.classList.remove("dismissed");
        playIntroSequence();
      }
    });
  }

  function playIntroSequence() {
    if (!orbitContainer) return;
    orbitContainer.innerHTML = "";

    const sampleMembers = THIRAN_DATA.team.slice(0, 12);
    const radius = 95;
    const center = 120;

    sampleMembers.forEach((member, i) => {
      const angle = (i / sampleMembers.length) * (2 * Math.PI);
      const x = center + radius * Math.cos(angle) - 19;
      const y = center + radius * Math.sin(angle) - 19;

      const dot = document.createElement("div");
      dot.className = "intro-avatar-dot";
      dot.style.background = member.bgGradient;
      dot.textContent = member.initials;
      
      const randomOffset = 180 + Math.random() * 80;
      const startX = center + (radius + randomOffset) * Math.cos(angle) - 19;
      const startY = center + (radius + randomOffset) * Math.sin(angle) - 19;
      dot.style.left = `${startX}px`;
      dot.style.top = `${startY}px`;

      orbitContainer.appendChild(dot);

      setTimeout(() => {
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.classList.add("converge");
      }, 100 + i * 50);
    });

    setTimeout(() => {
      const caption = document.querySelector(".intro-caption");
      if (caption) caption.classList.add("visible");
    }, 1200);

    setTimeout(() => {
      dismissIntro();
    }, 2600);
  }

  function dismissIntro() {
    if (introOverlay) introOverlay.classList.add("dismissed");
    sessionStorage.setItem("thiran_intro_seen", "true");
  }
}

/**
 * 6. Word-Swap Loop ("Recognize." -> "Connect." -> "Grow.")
 */
function setupWordSwapLoop() {
  const container = document.getElementById("word-swap-motto");
  if (!container) return;

  const items = container.querySelectorAll(".word-swap-item");
  if (items.length <= 1) return;

  let currentIndex = 0;
  setInterval(() => {
    const prevItem = items[currentIndex];
    prevItem.classList.remove("active");
    prevItem.classList.add("exit");

    currentIndex = (currentIndex + 1) % items.length;
    const nextItem = items[currentIndex];
    nextItem.classList.remove("exit");
    nextItem.classList.add("active");

    setTimeout(() => {
      prevItem.classList.remove("exit");
    }, 400);
  }, 2400);
}

/**
 * 2 & 9. Scroll Reveals & Agenda Pen-Stroke Line Draw-in
 */
function setupScrollAnimations() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Add reveal-on-scroll class to key sections
  const sections = document.querySelectorAll("main > section");
  sections.forEach(sec => {
    if (sec.id !== "hero") sec.classList.add("reveal-on-scroll");
  });

  if (prefersReduced) {
    sections.forEach(s => s.classList.add("is-revealed"));
    document.querySelectorAll(".timeline-item").forEach(t => t.classList.add("timeline-reached"));
    return;
  }

  // IntersectionObserver for Section Reveal
  const sectionObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.1
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  // IntersectionObserver for Timeline Draw-In
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("timeline-reached");
      }
    });
  }, {
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.2
  });

  timelineItems.forEach(item => timelineObserver.observe(item));
}

/**
 * 10. Highlight Card Flip for Touch / Keyboard
 */
function setupCardFlips() {
  const cards = document.querySelectorAll(".highlight-flip-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });
}

/**
 * 12. Button Magnetic Hover
 */
function setupMagneticButtons() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || window.innerWidth < 768) return;

  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0px, 0px)";
    });
  });
}

/**
 * 8. Subtle Parallax for Ink Blots
 */
function setupInkParallax() {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const blot1 = document.querySelector(".blot-1");
        const blot2 = document.querySelector(".blot-2");
        const blot3 = document.querySelector(".blot-3");

        if (blot1) blot1.style.transform = `translateY(${scrolled * 0.04}px)`;
        if (blot2) blot2.style.transform = `translateY(${scrolled * -0.05}px)`;
        if (blot3) blot3.style.transform = `translateY(${scrolled * 0.03}px)`;

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Navigation Drawer & Sticky Header
 */
function setupNavigation() {
  const toggleBtn = document.getElementById("mobile-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const header = document.getElementById("site-header");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      toggleBtn.classList.toggle("active", isOpen);
      toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        toggleBtn.classList.remove("active");
        toggleBtn.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }, { passive: true });
}

/**
 * Team Filter Pills & Real-Time Search
 */
function setupTeamFilters() {
  const filterPills = document.querySelectorAll(".filter-pill");
  const searchInput = document.getElementById("team-search-input");

  let activeFilter = "all";
  let searchKeyword = "";

  function applyFilters() {
    const filtered = THIRAN_DATA.team.filter(member => {
      const matchesDept = activeFilter === "all" || member.dept.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch = searchKeyword === "" || 
        member.name.toLowerCase().includes(searchKeyword) ||
        member.role.toLowerCase().includes(searchKeyword) ||
        member.proudOf.toLowerCase().includes(searchKeyword);
      return matchesDept && matchesSearch;
    });

    UIComponents.renderTeamGrid(filtered);
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      });
      pill.classList.add("active");
      pill.setAttribute("aria-selected", "true");
      activeFilter = pill.getAttribute("data-filter");
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchKeyword = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/**
 * 5. RSVP Submission with Ink-Stamp Success Morph
 */
function setupRSVPForm() {
  const form = document.getElementById("rsvp-form");
  let confirmedCount = THIRAN_DATA.event.initialConfirmed; // 0

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("rsvp-name");
      const deptInput = document.getElementById("rsvp-dept");
      let valid = true;

      if (!nameInput.value.trim()) {
        document.getElementById("name-error").style.display = "block";
        valid = false;
      } else {
        document.getElementById("name-error").style.display = "none";
      }

      if (!deptInput.value) {
        document.getElementById("dept-error").style.display = "block";
        valid = false;
      } else {
        document.getElementById("dept-error").style.display = "none";
      }

      if (!valid) return;

      // Increment Attendance Counter
      confirmedCount = Math.min(confirmedCount + 1, THIRAN_DATA.event.totalCapacity);
      const countDisplay = document.getElementById("attendee-confirmed-count");
      const navCountDisplay = document.getElementById("nav-rsvp-count");
      const heroProofCount = document.getElementById("hero-proof-count");
      const progressFill = document.getElementById("attendee-progress-fill");
      const subtext = document.getElementById("attendance-subtext");

      if (countDisplay) countDisplay.textContent = confirmedCount;
      if (navCountDisplay) navCountDisplay.textContent = `${confirmedCount}/30`;
      if (heroProofCount) heroProofCount.textContent = confirmedCount;
      if (progressFill) {
        const pct = (confirmedCount / THIRAN_DATA.event.totalCapacity) * 100;
        progressFill.style.width = `${pct}%`;
      }
      if (subtext) {
        const remaining = THIRAN_DATA.event.totalCapacity - confirmedCount;
        subtext.textContent = remaining > 0 
          ? `Only ${remaining} spots remaining to reach 100% team presence!` 
          : `🎉 100% Core Team Confirmed! Capacity Reached!`;
      }

      const alert = document.getElementById("rsvp-success-alert");
      if (alert) alert.style.display = "flex";

      const submitBtn = document.getElementById("rsvp-submit-btn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector("span").textContent = "RSVP Confirmed ✓";
      }
    });
  }
}

/**
 * 6. Award Nomination Selector & Submission
 */
function setupNominationSystem() {
  const catCards = document.querySelectorAll(".award-cat-card");
  const hiddenInput = document.getElementById("nom-category-input");
  const catDisplay = document.getElementById("form-selected-cat-display");
  const form = document.getElementById("nomination-form");
  let totalNominations = 0;

  catCards.forEach(card => {
    card.addEventListener("click", () => {
      catCards.forEach(c => {
        c.classList.remove("active");
        c.setAttribute("aria-checked", "false");
      });
      card.classList.add("active");
      card.setAttribute("aria-checked", "true");

      const category = card.getAttribute("data-category");
      const catName = card.querySelector(".cat-name").textContent;
      if (hiddenInput) hiddenInput.value = category;
      if (catDisplay) catDisplay.textContent = `Category: ${category} (${catName})`;
    });
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nominator = document.getElementById("nom-nominator").value.trim();
      const nominee = document.getElementById("nom-nominee").value;
      const reason = document.getElementById("nom-reason").value.trim();

      if (!nominator || !nominee || !reason) {
        alert("Please fill in all nomination fields.");
        return;
      }

      totalNominations++;
      const countBadge = document.getElementById("total-nominations-count");
      if (countBadge) countBadge.textContent = `${totalNominations} Nomination${totalNominations > 1 ? 's' : ''} Received`;

      const msg = document.getElementById("nom-success-msg");
      if (msg) msg.style.display = "flex";

      form.reset();
    });
  }
}

/**
 * 11. Cheer Wall Note Drop Animation
 */
function setupCheerForm() {
  const form = document.getElementById("cheer-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const author = document.getElementById("cheer-author").value.trim();
      const recipient = document.getElementById("cheer-recipient").value.trim();
      const tag = document.getElementById("cheer-tag").value;
      const message = document.getElementById("cheer-message").value.trim();

      if (!author || !recipient || !message) return;

      const newCheer = {
        id: `c-${Date.now()}`,
        author,
        recipient,
        tag,
        message,
        time: "Just now",
        isNew: true
      };

      THIRAN_DATA.initialCheers.unshift(newCheer);
      UIComponents.renderCheers(THIRAN_DATA.initialCheers);
      form.reset();
    });
  }
}

/**
 * 4. Idea Box Form with Ink-Stamp Confirmation
 */
function setupIdeaForm() {
  const form = document.getElementById("idea-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("idea-title").value.trim();
      const category = document.getElementById("idea-category").value;
      const body = document.getElementById("idea-body").value.trim();
      const isAnon = document.getElementById("idea-anon").checked;

      if (!title || !body) return;

      const newIdea = {
        id: `i-${Date.now()}`,
        title,
        category,
        body,
        author: isAnon ? "Anonymous Teammate" : "Thiran Team Member",
        time: "Just now"
      };

      THIRAN_DATA.initialIdeas.unshift(newIdea);
      UIComponents.renderIdeas(THIRAN_DATA.initialIdeas);

      const alert = document.getElementById("idea-success-alert");
      if (alert) alert.style.display = "flex";

      form.reset();
    });
  }
}
