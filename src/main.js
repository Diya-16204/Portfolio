document.documentElement.classList.add("js");

const filterButtons = [...document.querySelectorAll(".filter-chip")];
const projectCards = [...document.querySelectorAll(".project-card")];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      card.classList.toggle(
        "is-hidden",
        selected !== "all" && card.dataset.category !== selected,
      );
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const closeMenu = () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
  mobileNav.hidden = true;
};
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation" : "Close navigation",
  );
  mobileNav.hidden = isOpen;
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 650) closeMenu();
});

const projectNotes = {
  careerpilot: {
    index: "01 / CAREER MANAGEMENT · ACTIVE CAPSTONE",
    title: "CareerPilot AI",
    body: `<p>A full-stack workspace for organizing job opportunities and preparing applications. Its documented areas include job tracking, resume review tools, cover-letter and referral drafts, interview practice, and application preparation.</p><p class="dialog-note"><strong>Project status:</strong> The repository describes this as an active capstone. Core flows are implemented and tested locally; hosted authenticated workflows and durable resume storage still need verification. CareerPilot prepares reviewed drafts and does not silently submit applications to real employers.</p>`,
    links: [
      {
        label: "Live demo",
        href: "https://career-pilot-ai-blond-seven.vercel.app/",
      },
      {
        label: "Open repository",
        href: "https://github.com/Diya-16204/CareerPilotAI",
      },
    ],
  },
  hackmadeeasy: {
    index: "02 / VISUAL BUILDER · IN PROGRESS",
    title: "HackMadeEasy",
    body: `<p>A React and Craft.js visual website builder with a component palette, editable canvas, and properties panel. The current editor provides reusable page components; the project landing page marks AI-assisted creation as in development and lists broader generation features as planned.</p><p class="dialog-note"><strong>Scope:</strong> The repository's feature status is still evolving, so this page does not present the planned AI generation or deployment roadmap as completed features.</p>`,
    links: [
      {
        label: "Open repository",
        href: "https://github.com/Diya-16204/HackMadeEasy",
      },
    ],
  },
  guardian: {
    index: "03 / MULTIMODAL CLINICAL SUPPORT · 2026—ONGOING",
    title: "GuardianCell",
    body: `<p>A staged breast-cancer workflow connecting clinical fields and image uploads with screening, investigation and prognosis steps. The résumé describes work with mammography, ultrasound and MRI.</p><p class="dialog-note"><strong>Prototype context:</strong> The repository describes predictor adapters as mock implementations that can later be replaced. This portfolio therefore presents the workflow as a prototype, not as a validated diagnostic product.</p>`,
    links: [
      {
        label: "Open repository",
        href: "https://github.com/Diya-16204/GuardianCell",
      },
    ],
  },
  finpilot: {
    index: "04 / PERSONAL FINANCE · 2025",
    title: "FinPilot",
    body: `<p>A React-led finance platform for recording income and expenses, reviewing categories and spending trends, and exporting reports. The supplied repository includes a dashboard, reporting and expense-management screens.</p><p class="dialog-note"><strong>Scope:</strong> I left out user-count and time-saved figures because the repository does not independently verify them.</p>`,
    links: [
      {
        label: "Live site",
        href: "https://fin-pilot-nine.vercel.app/",
      },
      {
        label: "Open repository",
        href: "https://github.com/Diya-16204/FinPilot",
      },
    ],
  },
};

const dialog = document.querySelector(".project-dialog");
const dialogTitle = dialog.querySelector("#dialog-title");
const dialogIndex = dialog.querySelector(".dialog-index");
const dialogContent = dialog.querySelector(".dialog-content");
const dialogActions = dialog.querySelector(".dialog-actions");
document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => {
    const item = projectNotes[button.dataset.openProject];
    if (!item) return;
    dialogIndex.textContent = item.index;
    dialogTitle.textContent = item.title;
    dialogContent.innerHTML = item.body;
    dialogActions.replaceChildren(
      ...item.links.map(({ label, href }) => {
        const link = document.createElement("a");
        link.href = href;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.innerHTML = `${label} <span aria-hidden="true">↗</span>`;
        return link;
      }),
    );
    dialog.showModal();
  });
});
dialog
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const revealTargets = document.querySelectorAll(
  ".section-heading, .project-card, .practice-lead, .timeline-item, .signal, .leadership-note",
);
revealTargets.forEach((item) => item.classList.add("reveal"));
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  revealTargets.forEach((item) => observer.observe(item));
} else {
  revealTargets.forEach((item) => item.classList.add("is-visible"));
}
