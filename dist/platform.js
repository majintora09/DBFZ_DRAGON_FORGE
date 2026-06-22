(() => {
  const games = window.FG_LAB_GAMES || [];
  const platformHome = document.querySelector("#platformHome");
  const dbfzPortal = document.querySelector("#dbfzPortal");
  const twoXkoPortal = document.querySelector("#twoXkoPortal");
  const gameCardGrid = document.querySelector("#gameCardGrid");
  const twoXkoNav = document.querySelector("#twoXkoNav");
  const twoXkoContent = document.querySelector("#twoXkoContent");
  const twoXkoGame = games.find((game) => game.id === "2xko");
  const deploymentBase = normalizeBasePath(window.FG_LAB_BASE_PATH || "/");

  const dbfzViews = {
    "/games/dbfz": "team",
    "/games/dbfz/team-builder": "team",
    "/games/dbfz/characters": "characters",
    "/games/dbfz/synergies": "training",
    "/games/dbfz/routes": "videos",
    "/games/dbfz/playstyles": "playstyles",
    "/games/dbfz/knowledge-map": "knowledge",
    "/games/dbfz/training-lab": "training",
    "/games/dbfz/videos": "videos",
  };

  const legacyHashes = {
    "#teamSlots": "/games/dbfz/team-builder",
    "#roster": "/games/dbfz/characters",
    "#playstyleTeams": "/games/dbfz/playstyles",
    "#knowledgeNetwork": "/games/dbfz/knowledge-map",
    "#trainingLab": "/games/dbfz/synergies",
    "#videoLibrary": "/games/dbfz/routes",
  };

  let researchRecords = [];

  function renderGameCards() {
    if (!gameCardGrid) return;
    gameCardGrid.innerHTML = games
      .map(
        (game) => `
          <article class="platform-game-card platform-game-card--${game.id}" data-theme="${game.theme}">
            <div class="platform-game-card__topline">
              <span>${game.shortName}</span>
              <strong class="platform-status platform-status--${game.status}">${game.statusLabel}</strong>
            </div>
            <div>
              <h2>${game.name}</h2>
              <p>${game.description}</p>
            </div>
            <ul>${game.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
            <button class="platform-action" type="button" data-route="${game.entryRoute}">Enter Lab</button>
          </article>
        `
      )
      .join("");
  }

  function renderTwoXkoNav() {
    if (!twoXkoNav || !twoXkoGame) return;
    const routes = [
      ["Overview", "/games/2xko"],
      ["Characters", "/games/2xko/characters"],
      ["Duo Builder", "/games/2xko/team-builder"],
      ["Fuses", "/games/2xko/fuses"],
      ["Synergies", "/games/2xko/synergies"],
      ["Routes", "/games/2xko/routes"],
      ["Research Vault", "/games/2xko/research-vault"],
    ];
    twoXkoNav.innerHTML = routes.map(([label, route]) => `<a href="${deploymentPath(route)}" data-route="${route}">${label}</a>`).join("");
  }

  function currentRoute() {
    const hash = window.location.hash;
    if (legacyHashes[hash]) return legacyHashes[hash];
    if (window.location.protocol === "file:") return hash.startsWith("#/") ? normalizeRoute(hash.slice(1)) : "/";
    return normalizeRoute(stripDeploymentBase(window.location.pathname));
  }

  function normalizeBasePath(path) {
    const value = `/${String(path || "/").replace(/^\/+|\/+$/g, "")}/`;
    return value === "//" ? "/" : value;
  }

  function stripDeploymentBase(path) {
    if (deploymentBase === "/") return path;
    const baseWithoutSlash = deploymentBase.replace(/\/$/, "");
    return path === baseWithoutSlash ? "/" : path.startsWith(deploymentBase) ? `/${path.slice(deploymentBase.length)}` : path;
  }

  function deploymentPath(route) {
    const cleanRoute = normalizeRoute(route);
    if (cleanRoute === "/") return deploymentBase;
    return `${deploymentBase}${cleanRoute.replace(/^\//, "")}`;
  }

  function normalizeRoute(route) {
    const value = String(route || "/").split("?")[0].replace(/\/+$/, "");
    if (!value || value.endsWith("/index.html")) return "/";
    return value.startsWith("/") ? value : `/${value}`;
  }

  function navigate(route, replace = false) {
    const nextRoute = normalizeRoute(route);
    if (window.location.protocol === "file:") {
      const nextHash = `#${nextRoute}`;
      if (window.location.hash === nextHash) renderRoute();
      else if (replace) window.location.replace(nextHash);
      else window.location.hash = nextRoute;
      return;
    }
    window.history[replace ? "replaceState" : "pushState"]({}, "", deploymentPath(nextRoute));
    renderRoute();
  }

  function showPortal(portal) {
    if (platformHome) platformHome.hidden = portal !== "home";
    if (dbfzPortal) dbfzPortal.hidden = portal !== "dbfz";
    if (twoXkoPortal) twoXkoPortal.hidden = portal !== "2xko";
    document.body.dataset.portal = portal;
    document.body.classList.toggle("platform-page-active", portal !== "dbfz");
  }

  function renderRoute() {
    const route = currentRoute();
    if (route === "/" || route === "/roadmap") {
      showPortal("home");
      document.title = "FG Lab | Choose Your Game";
      if (route === "/roadmap") requestAnimationFrame(() => document.querySelector("#fgLabRoadmap")?.scrollIntoView({ block: "start" }));
      return;
    }

    if (route.startsWith("/games/dbfz")) {
      showPortal("dbfz");
      const view = dbfzViews[route] || "team";
      window.DBFZ_TEAM_LAB?.setView(view);
      document.title = `DBFZ | FG Lab`;
      return;
    }

    if (route.startsWith("/games/2xko")) {
      showPortal("2xko");
      renderTwoXkoPage(route);
      document.title = `2XKO | FG Lab`;
      return;
    }

    navigate("/", true);
  }

  function renderTwoXkoPage(route) {
    if (!twoXkoContent || !twoXkoGame) return;
    const section = route.replace("/games/2xko", "").replace(/^\//, "") || "overview";
    const page = twoXkoGame.pages?.[section] || twoXkoGame.pages.overview;
    twoXkoNav?.querySelectorAll("a").forEach((link) => link.toggleAttribute("aria-current", normalizeRoute(link.getAttribute("href")) === route));

    if (section === "research-vault") {
      twoXkoContent.innerHTML = researchVaultMarkup(page);
      return;
    }

    if (section === "synergies" && window.FG_LAB_SYNERGY_ENGINE) {
      window.FG_LAB_SYNERGY_ENGINE.render(twoXkoContent, page);
      return;
    }

    const featureCards = section === "overview"
      ? Object.entries(twoXkoGame.pages)
          .filter(([key]) => !["overview", "research-vault"].includes(key))
          .map(([key, item]) => placeholderCardMarkup(key, item))
          .join("")
      : focusedPlaceholderMarkup(section, page);

    twoXkoContent.innerHTML = `
      <header class="portal-page-heading">
        <p class="eyebrow">${page.eyebrow}</p>
        <h1>${page.title}</h1>
        <p>${page.summary}</p>
      </header>
      <section class="portal-feature-grid">${featureCards}</section>
      <aside class="portal-research-callout">
        <div><span>Research first</span><strong>Keep early conclusions reviewable.</strong></div>
        <button class="platform-action platform-action--secondary" type="button" data-route="/games/2xko/research-vault">Open Research Vault</button>
      </aside>
    `;
  }

  function placeholderCardMarkup(key, page) {
    const route = `/games/2xko/${key}`;
    return `
      <article class="portal-feature-card">
        <span>${page.eyebrow}</span>
        <h2>${page.title}</h2>
        <p>${page.summary}</p>
        <button type="button" data-route="${route}">View Section</button>
      </article>
    `;
  }

  function focusedPlaceholderMarkup(section, page) {
    const labels = {
      characters: ["Character identity", "Strengths and weaknesses", "Assist and duo needs"],
      "team-builder": ["Point + assist pairing", "Duo win condition", "Replacement suggestions"],
      fuses: ["Fuse purpose", "Best duo structures", "Tradeoffs and route impact"],
      synergies: ["Assist coverage", "Tag interactions", "Shared win conditions"],
      routes: ["Verified conversions", "Tag routes", "Practical match examples"],
    }[section] || ["Verified notes", "Source links", "Community review"];
    return labels.map((label) => `<article class="portal-feature-card portal-feature-card--compact"><span>Planned module</span><h2>${label}</h2><p>${page.summary}</p></article>`).join("");
  }

  function researchVaultMarkup(page) {
    const records = researchRecords.length ? researchRecords : [{ character: "No records yet", sourceType: "Research queue", link: "", notes: "Add records in public/data/2xko/research-vault.json.", tags: ["Pending"], verified: false }];
    return `
      <header class="portal-page-heading">
        <p class="eyebrow">${page.eyebrow}</p>
        <h1>${page.title}</h1>
        <p>${page.summary}</p>
      </header>
      <section class="research-vault-list">
        ${records.map((record) => `
          <article class="research-record">
            <div class="research-record__header">
              <div><span>${record.sourceType}</span><h2>${record.character}</h2></div>
              <strong class="platform-status platform-status--${record.verified ? "active" : "early-build"}">${record.verified ? "Verified" : "Needs Review"}</strong>
            </div>
            <p>${record.notes}</p>
            <div class="research-tags">${(record.tags || []).map((tag) => `<span>${tag}</span>`).join("")}</div>
            ${record.link ? `<a href="${record.link}" target="_blank" rel="noreferrer">Open source</a>` : `<span class="research-link-pending">Link pending</span>`}
          </article>
        `).join("")}
      </section>
    `;
  }

  async function loadResearchVault() {
    try {
      const source = window.FG_LAB_ASSET_PATH?.("public/data/2xko/research-vault.json") || "public/data/2xko/research-vault.json";
      const response = await fetch(source);
      if (!response.ok) return;
      const data = await response.json();
      researchRecords = data.records || [];
      if (currentRoute() === "/games/2xko/research-vault") renderTwoXkoPage(currentRoute());
    } catch {
      researchRecords = [];
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-route]");
    if (!target) return;
    event.preventDefault();
    navigate(target.dataset.route || target.getAttribute("href"));
  });
  window.addEventListener("popstate", renderRoute);
  window.addEventListener("hashchange", renderRoute);

  window.FG_LAB_PLATFORM = { navigate, renderRoute };
  renderGameCards();
  renderTwoXkoNav();
  document.querySelectorAll("a[data-route]").forEach((link) => link.setAttribute("href", deploymentPath(link.dataset.route)));
  loadResearchVault();
  window.FG_LAB_SYNERGY_ENGINE?.load(twoXkoGame);
  renderRoute();
})();
