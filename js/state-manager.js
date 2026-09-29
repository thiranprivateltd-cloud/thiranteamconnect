/**
 * State Manager for Thiran Team Connect 2026
 * Handles Pre-Event (Anticipation), Event Day (Live at 10:00 AM), and Post-Event (Impact & Memories)
 * Features date-stamp flipping digits for countdown timer.
 */

class EventStateManager {
  constructor() {
    this.targetDate = new Date("2026-10-03T10:00:00+05:30");
    this.eventEndDate = new Date("2026-10-03T16:00:00+05:30");
    this.currentMode = "pre"; // 'pre' | 'live' | 'post'
    this.isManual = false;
    this.countdownInterval = null;
    this.previousValues = { d: null, h: null, m: null, s: null };
  }

  init() {
    this.setupEventListeners();
    this.determineState();
    this.startCountdown();
  }

  determineState() {
    if (this.isManual) return;

    const now = new Date();
    if (now < this.targetDate) {
      this.setEventState("pre");
    } else if (now >= this.targetDate && now <= this.eventEndDate) {
      this.setEventState("live");
    } else {
      this.setEventState("post");
    }
  }

  setEventState(state, isManual = false) {
    this.currentMode = state;
    this.isManual = isManual;

    document.body.classList.remove("state-pre-event", "state-live-event", "state-post-event");
    document.body.classList.add(`state-${state}-event`);

    // Update Status Bar Label
    const labelElem = document.getElementById("current-state-text");
    const preView = document.querySelector(".state-view-pre");
    const liveView = document.querySelector(".state-view-live");
    const postView = document.querySelector(".state-view-post");
    const roadmapOverlay = document.getElementById("roadmap-locked-overlay");
    const heroPrimaryCta = document.getElementById("hero-primary-cta");

    if (state === "pre") {
      if (labelElem) labelElem.innerHTML = `MODE: <strong>PRE-EVENT (Anticipation)</strong>`;
      if (preView) preView.style.display = "block";
      if (liveView) liveView.style.display = "none";
      if (postView) postView.style.display = "none";
      if (roadmapOverlay) roadmapOverlay.classList.remove("unlocked-mode");
      if (heroPrimaryCta) {
        heroPrimaryCta.href = "#rsvp";
        heroPrimaryCta.querySelector("span").textContent = "Confirm RSVP";
      }
    } else if (state === "live") {
      if (labelElem) labelElem.innerHTML = `MODE: <strong style="color:var(--color-primary);">EVENT DAY (We're Live! Oct 3 · 10 AM)</strong>`;
      if (preView) preView.style.display = "none";
      if (liveView) liveView.style.display = "block";
      if (postView) postView.style.display = "none";
      if (roadmapOverlay) roadmapOverlay.classList.add("unlocked-mode");
      if (heroPrimaryCta) {
        heroPrimaryCta.href = "#agenda";
        heroPrimaryCta.querySelector("span").textContent = "View Live Agenda";
      }
      this.highlightCurrentAgendaSession();
    } else if (state === "post") {
      if (labelElem) labelElem.innerHTML = `MODE: <strong>POST-EVENT (Impact & Memories)</strong>`;
      if (preView) preView.style.display = "none";
      if (liveView) liveView.style.display = "none";
      if (postView) postView.style.display = "block";
      if (roadmapOverlay) roadmapOverlay.classList.add("unlocked-mode");
      if (heroPrimaryCta) {
        heroPrimaryCta.href = "#recap";
        heroPrimaryCta.querySelector("span").textContent = "Explore Recap & Awards";
      }
    }
  }

  startCountdown() {
    const update = () => {
      const now = new Date();
      const diff = this.targetDate - now;

      if (diff <= 0) {
        if (!this.isManual && this.currentMode === "pre") {
          this.determineState();
        }
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      this.updateDigitWithFlip("cd-days", String(days).padStart(2, '0'), 'd');
      this.updateDigitWithFlip("cd-hours", String(hours).padStart(2, '0'), 'h');
      this.updateDigitWithFlip("cd-minutes", String(minutes).padStart(2, '0'), 'm');
      this.updateDigitWithFlip("cd-seconds", String(seconds).padStart(2, '0'), 's');
    };

    update();
    this.countdownInterval = setInterval(update, 1000);
  }

  updateDigitWithFlip(elementId, newValue, key) {
    const elem = document.getElementById(elementId);
    if (!elem) return;

    if (this.previousValues[key] !== newValue) {
      elem.textContent = newValue;
      elem.classList.remove("digit-flip");
      void elem.offsetWidth; // Trigger reflow for animation restart
      elem.classList.add("digit-flip");
      this.previousValues[key] = newValue;
    }
  }

  highlightCurrentAgendaSession() {
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item, index) => {
      if (index === 5) { // Highlight Awards Ceremony
        item.classList.add("active-session");
      } else {
        item.classList.remove("active-session");
      }
    });
  }

  setupEventListeners() {
    const selector = document.getElementById("state-selector");
    if (selector) {
      selector.addEventListener("change", (e) => {
        const val = e.target.value;
        if (val === "auto") {
          this.isManual = false;
          this.determineState();
        } else {
          this.setEventState(val, true);
        }
      });
    }

    // Toggle Preview for Roadmap Locked card
    const toggleRoadmapBtn = document.getElementById("toggle-roadmap-preview-btn");
    const roadmapOverlay = document.getElementById("roadmap-locked-overlay");
    if (toggleRoadmapBtn && roadmapOverlay) {
      toggleRoadmapBtn.addEventListener("click", () => {
        roadmapOverlay.classList.toggle("unlocked-mode");
      });
    }
  }
}

window.eventStateManager = new EventStateManager();
