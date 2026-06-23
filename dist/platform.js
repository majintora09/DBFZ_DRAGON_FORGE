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
  const twoXkoDecisionState = {
    loaded: false,
    loading: false,
    error: "",
    characters: [],
    publicCharacters: [],
    synergies: [],
    fuses: [],
    routes: [],
    observations: [],
  };

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

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

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
      ["I Play...", "/games/2xko/characters"],
      ["Pairing Help", "/games/2xko/team-builder"],
      ["Fuses", "/games/2xko/fuses"],
      ["Synergy Lab", "/games/2xko/synergies"],
      ["Routes", "/games/2xko/routes"],
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
    const pathAfterGame = route.replace("/games/2xko", "").replace(/^\//, "");
    const [sectionName, selectedCharacterId] = pathAfterGame.split("/");
    const section = sectionName || "overview";
    const page = twoXkoGame.pages?.[section] || twoXkoGame.pages.overview;
    twoXkoNav?.querySelectorAll("a").forEach((link) => {
      const navRoute = normalizeRoute(link.dataset.route);
      link.toggleAttribute("aria-current", navRoute === route || (section === "characters" && navRoute === "/games/2xko/characters"));
    });

    if (section === "research-vault") {
      window.FG_LAB_RESEARCH_VAULT?.render(twoXkoContent, page);
      return;
    }

    if (section === "overview") {
      renderTwoXkoOverview();
      return;
    }

    if (section === "characters") {
      renderTwoXkoCharacterPage(selectedCharacterId);
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
    `;
  }

  function renderTwoXkoOverview() {
    if (!twoXkoDecisionState.loaded) {
      twoXkoContent.innerHTML = decisionStatusMarkup(twoXkoDecisionState.error || "Loading 2XKO character decisions...");
      return;
    }

    twoXkoContent.innerHTML = `
      <section class="two-xko-decision-home" aria-labelledby="twoXkoQuestion">
        <header class="decision-hero">
          <div>
            <p class="eyebrow">Start with your character</p>
            <h1 id="twoXkoQuestion">I play...</h1>
            <p>Pick a champion and FG Lab will show what they do, what their team needs, who to research as a partner, and what to study next.</p>
          </div>
          <aside>
            <span>Player questions</span>
            <strong>Who do I pair with?</strong>
            <strong>What Fuse fits?</strong>
            <strong>What routes first?</strong>
          </aside>
        </header>

        <section class="decision-character-grid" aria-label="2XKO champion selector">
          ${twoXkoDecisionState.characters.map((character) => characterSelectCardMarkup(character)).join("")}
        </section>

        <section class="decision-question-grid" aria-label="FG Lab answer types">
          ${[
            ["Pairing", "Find verified, potential, and in-progress partners."],
            ["Team Needs", "See what the character wants from a teammate."],
            ["Fuses", "Choose from reviewed or research-backed Fuse ideas."],
            ["Routes", "Prioritize practical routes instead of collecting every combo."],
            ["Real Teams", "Surface observations from VODs, Discord, and tournament notes."],
          ].map(([title, copy]) => `<article><span>${title}</span><p>${copy}</p></article>`).join("")}
        </section>
      </section>
    `;
  }

  function renderTwoXkoCharacterPage(selectedCharacterId) {
    if (!twoXkoDecisionState.loaded) {
      twoXkoContent.innerHTML = decisionStatusMarkup(twoXkoDecisionState.error || "Loading character decisions...");
      return;
    }

    const character = twoXkoDecisionState.characters.find((item) => item.id === selectedCharacterId) || twoXkoDecisionState.characters[0];
    if (!character) {
      twoXkoContent.innerHTML = decisionStatusMarkup("No 2XKO character data is available yet.");
      return;
    }

    const publicCharacter = twoXkoDecisionState.publicCharacters.find((item) => item.id === character.id) || {};
    const overview = cleanText(publicCharacter.overview) || cleanText(character.identity) || "Research is still being gathered for this champion.";
    const strengths = cleanList(publicCharacter.strengths || character.strengths);
    const weaknesses = cleanList(publicCharacter.weaknesses || character.weaknesses);
    const archetypes = cleanList(character.archetypes);
    const characterObservations = observationsForCharacter(character);
    const partnerBuckets = partnerBucketsForCharacter(character);
    const fuseBuckets = fuseBucketsForCharacter(character, publicCharacter);
    const routeItems = routeItemsForCharacter(character, publicCharacter);
    const research = researchProgressForCharacter(character, characterObservations);

    twoXkoContent.innerHTML = `
      <article class="two-xko-character-page">
        <nav class="decision-page-picker" aria-label="Change 2XKO character">
          ${twoXkoDecisionState.characters.map((item) => `
            <button type="button" data-route="/games/2xko/characters/${escapeHtml(item.id)}" aria-pressed="${item.id === character.id}">
              <span>${escapeHtml(initials(item.name))}</span>${escapeHtml(item.name)}
            </button>
          `).join("")}
        </nav>

        <section class="decision-profile" aria-labelledby="decisionProfileTitle">
          <div class="decision-portrait" aria-hidden="true">${escapeHtml(initials(character.name))}</div>
          <div>
            <p class="eyebrow">Who is this character?</p>
            <h1 id="decisionProfileTitle">${escapeHtml(character.name)}</h1>
            <p>${escapeHtml(overview)}</p>
            <dl class="decision-profile-meta">
              <div><dt>Playstyle</dt><dd>${escapeHtml(cleanText(character.playstyle) || "Research in progress")}</dd></div>
              <div><dt>Difficulty</dt><dd>${escapeHtml(cleanText(character.difficulty) || "Research in progress")}</dd></div>
            </dl>
            ${chipListMarkup(archetypes.length ? archetypes : ["Researching"])}
          </div>
        </section>

        <section class="decision-section decision-needs" aria-labelledby="needsTitle">
          <div class="decision-section-heading"><p class="eyebrow">Decision check</p><h2 id="needsTitle">What does this character want?</h2></div>
          <div class="decision-need-grid">
            ${needCardMarkup("Needs", weaknesses.length ? weaknesses : ["Collect more observations about what a partner must solve."])}
            ${needCardMarkup("Likes", likedToolsForCharacter(character, partnerBuckets, characterObservations))}
            ${needCardMarkup("Doesn't Need", ["Not verified yet. Mark this after reviewed match data shows what support is unnecessary."])}
          </div>
        </section>

        <section class="decision-section" aria-labelledby="partnersTitle">
          <div class="decision-section-heading"><p class="eyebrow">Pairing answer</p><h2 id="partnersTitle">Who should I pair them with?</h2></div>
          <div class="decision-bucket-grid">
            ${partnerBucketMarkup("Verified Partners", partnerBuckets.verified, "No verified partners yet.")}
            ${partnerBucketMarkup("Potential Partners", partnerBuckets.potential, "No potential partner records yet.")}
            ${partnerBucketMarkup("Research In Progress", partnerBuckets.research, "No match observations tied to partners yet.")}
          </div>
        </section>

        <section class="decision-section" aria-labelledby="fusesTitle">
          <div class="decision-section-heading"><p class="eyebrow">Fuse choice</p><h2 id="fusesTitle">What Fuses should I consider?</h2></div>
          <div class="decision-bucket-grid">
            ${simpleBucketMarkup("Verified", fuseBuckets.verified, "No verified Fuse recommendation yet.")}
            ${simpleBucketMarkup("Potential", fuseBuckets.potential, "No potential Fuse recommendation yet.")}
            ${simpleBucketMarkup("Research", fuseBuckets.research, "No Fuse observations collected yet.")}
          </div>
        </section>

        <section class="decision-section" aria-labelledby="routesTitle">
          <div class="decision-section-heading"><p class="eyebrow">Next study step</p><h2 id="routesTitle">What routes should I learn first?</h2></div>
          <div class="decision-card-list">
            ${routeItems.length ? routeItems.map((item) => `
              <article>
                <span>${escapeHtml(item.difficulty || "Research")}</span>
                <h3>${escapeHtml(item.name || item.goal || "Route idea")}</h3>
                <p>${escapeHtml(item.recommendation || item.goal || "Route details need reviewed sources.")}</p>
                ${chipListMarkup(item.tags || [])}
              </article>
            `).join("") : `<article><span>Research needed</span><h3>No route priority yet</h3><p>Use match observations to decide which routes solve this champion's first real problems.</p></article>`}
          </div>
        </section>

        <section class="decision-section" aria-labelledby="researchTitle">
          <div class="decision-section-heading"><p class="eyebrow">Research status</p><h2 id="researchTitle">How much do we know?</h2></div>
          <div class="decision-progress-grid">
            ${Object.entries(research).map(([label, count]) => `<article><strong>${count}</strong><span>${escapeHtml(label)}</span></article>`).join("")}
          </div>
        </section>

        <section class="decision-section" aria-labelledby="observationsTitle">
          <div class="decision-section-heading"><p class="eyebrow">Latest evidence</p><h2 id="observationsTitle">Latest observations</h2></div>
          <div class="decision-observation-list">
            ${characterObservations.length ? characterObservations.slice(0, 4).map(observationMarkup).join("") : `<article><h3>No observations yet</h3><p>Capture VOD, Discord, stream, or tournament notes in the Research Vault before turning them into recommendations.</p></article>`}
          </div>
        </section>
      </article>
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
    return labels.map((label) => `<article class="portal-feature-card portal-feature-card--compact"><span>Decision tool</span><h2>${label}</h2><p>${page.summary}</p></article>`).join("");
  }

  async function loadTwoXkoDecisionData(game) {
    if (!game || twoXkoDecisionState.loading) return;
    twoXkoDecisionState.loading = true;
    try {
      const ids = game.intelligenceFiles || [];
      const [intelligence, publicCharacters, synergies, fuses, routes, researchVault] = await Promise.all([
        Promise.all(ids.map((id) => fetchJson(`${game.intelligenceRoot}/${id}.json`).then((data) => normalizeIntelligence(id, data)))),
        fetchJson(`${game.dataRoot}/${game.dataFiles.characters}`).catch(() => ({ characters: [] })),
        fetchJson(`${game.dataRoot}/${game.dataFiles.synergies}`).catch(() => ({ synergies: [] })),
        fetchJson(`${game.dataRoot}/${game.dataFiles.fuses}`).catch(() => ({ fuses: [] })),
        fetchJson(`${game.dataRoot}/${game.dataFiles.routes}`).catch(() => ({ routes: [] })),
        fetchJson(`${game.dataRoot}/${game.dataFiles.researchVault}`).catch(() => ({ records: [] })),
      ]);
      twoXkoDecisionState.characters = intelligence.sort((a, b) => a.name.localeCompare(b.name));
      twoXkoDecisionState.publicCharacters = publicCharacters.characters || [];
      twoXkoDecisionState.synergies = synergies.synergies || [];
      twoXkoDecisionState.fuses = fuses.fuses || [];
      twoXkoDecisionState.routes = routes.routes || [];
      twoXkoDecisionState.observations = (researchVault.records || []).map(normalizeObservation);
      twoXkoDecisionState.loaded = true;
      twoXkoDecisionState.error = "";
    } catch (error) {
      twoXkoDecisionState.error = error.message || "2XKO character decisions could not load.";
    } finally {
      twoXkoDecisionState.loading = false;
      if (currentRoute().startsWith("/games/2xko")) renderTwoXkoPage(currentRoute());
    }
  }

  function fetchJson(path) {
    const url = window.FG_LAB_ASSET_PATH?.(path) || (window.location.protocol === "file:" ? path.replace(/^\//, "") : path);
    return fetch(url).then((response) => {
      if (!response.ok) throw new Error(`${path} returned HTTP ${response.status}.`);
      return response.json();
    });
  }

  function normalizeIntelligence(id, data) {
    return {
      id,
      name: data.character || titleCase(id),
      identity: data.identity || "",
      playstyle: data.playstyle || "",
      difficulty: data.difficulty || "",
      strengths: data.strengths || [],
      weaknesses: data.weaknesses || [],
      archetypes: data.archetypes || [],
      recommendedPartners: data.recommendedPartners || [],
      recommendedFuses: data.recommendedFuses || [],
      routes: data.routes || [],
      communityTech: data.communityTech || [],
    };
  }

  function normalizeObservation(record) {
    return {
      id: record.id || "",
      match: record.match || "Unknown match",
      teams: Array.isArray(record.teams) ? record.teams : [],
      timestamp: record.timestamp || "Not recorded",
      observation: record.observation || record.notes || "",
      tags: Array.isArray(record.tags) ? record.tags : [],
      confidence: record.confidence || "Medium",
      reviewStatus: record.reviewStatus || record.verificationStatus || "observation",
      sourceType: record.sourceType || "Source",
      sourceLink: record.sourceLink || "",
      extractionTargets: Array.isArray(record.extractionTargets) ? record.extractionTargets : [],
    };
  }

  function characterSelectCardMarkup(character) {
    const observations = observationsForCharacter(character).length;
    const archetypes = cleanList(character.archetypes).slice(0, 3);
    return `
      <button class="decision-character-card" type="button" data-route="/games/2xko/characters/${escapeHtml(character.id)}">
        <span class="decision-character-card__mark">${escapeHtml(initials(character.name))}</span>
        <strong>${escapeHtml(character.name)}</strong>
        <small>${escapeHtml(cleanText(character.playstyle) || "Research in progress")}</small>
        ${chipListMarkup(archetypes)}
        <em>${observations} observation${observations === 1 ? "" : "s"}</em>
      </button>
    `;
  }

  function observationsForCharacter(character) {
    return twoXkoDecisionState.observations.filter((record) => {
      const haystack = [record.match, ...record.teams, record.observation, ...record.tags].join(" ").toLowerCase();
      return matchesCharacter(haystack, character);
    });
  }

  function partnerBucketsForCharacter(character) {
    const potential = twoXkoDecisionState.synergies
      .filter((item) => item.characterId === character.id || item.partnerId === character.id)
      .map((item) => {
        const partnerId = item.characterId === character.id ? item.partnerId : item.characterId;
        const partner = twoXkoDecisionState.characters.find((candidate) => candidate.id === partnerId);
        return {
          title: partner?.name || titleCase(partnerId),
          meta: item.difficulty || "Potential",
          copy: item.reason || "Pairing reason needs reviewed sources.",
          tags: item.tags || [],
          status: "Example / unverified",
        };
      });
    const researchPartners = researchPartnersForCharacter(character).map((item) => ({
      title: item.name,
      meta: `${item.count} observation${item.count === 1 ? "" : "s"}`,
      copy: "Seen in current Research Vault observations. Needs review before it becomes a recommendation.",
      tags: item.tags,
      status: "Research",
    }));
    return { verified: [], potential, research: researchPartners };
  }

  function researchPartnersForCharacter(character) {
    const known = new Map(twoXkoDecisionState.characters.map((item) => [item.id, item]));
    const partners = new Map();
    for (const observation of observationsForCharacter(character)) {
      const ids = extractCharacterIds([observation.match, ...observation.teams, observation.observation].join(" "));
      for (const id of ids) {
        if (id === character.id || !known.has(id)) continue;
        const current = partners.get(id) || { id, name: known.get(id).name, count: 0, tags: new Set() };
        current.count += 1;
        observation.tags.forEach((tag) => current.tags.add(tag));
        partners.set(id, current);
      }
    }
    return [...partners.values()].map((item) => ({ ...item, tags: [...item.tags].slice(0, 4) }));
  }

  function fuseBucketsForCharacter(character, publicCharacter) {
    const ids = new Set(publicCharacter.recommendedFuseIds || character.recommendedFuses || []);
    const potential = twoXkoDecisionState.fuses
      .filter((item) => ids.has(item.id) || ids.has(item.name))
      .map((item) => ({ title: item.name, meta: item.difficulty || "Potential", copy: item.reason || "Needs review.", tags: item.tags || [] }));
    const research = observationsForCharacter(character)
      .filter((item) => item.extractionTargets.includes("Fuse Notes") || item.tags.some((tag) => tag.toLowerCase().includes("fuse")))
      .map((item) => ({ title: item.match, meta: item.timestamp, copy: item.observation, tags: item.tags }));
    return { verified: [], potential, research };
  }

  function routeItemsForCharacter(character, publicCharacter) {
    const ids = new Set(publicCharacter.recommendedRouteIds || character.routes || []);
    const publicRoutes = twoXkoDecisionState.routes.filter((item) => ids.has(item.id) || (item.characterIds || []).includes(character.id));
    const researchRoutes = observationsForCharacter(character)
      .filter((item) => item.extractionTargets.includes("Route Entries") || item.tags.some((tag) => ["route", "tag routes", "oki"].includes(tag.toLowerCase())))
      .map((item) => ({ name: item.match, difficulty: "Research", recommendation: item.observation, tags: item.tags }));
    return [...publicRoutes, ...researchRoutes].slice(0, 4);
  }

  function researchProgressForCharacter(character, observations) {
    return {
      "Observations Collected": observations.length,
      "Verified Synergies": twoXkoDecisionState.synergies.filter((item) => item.verified && (item.characterId === character.id || item.partnerId === character.id)).length,
      "Verified Routes": twoXkoDecisionState.routes.filter((item) => item.verified && (item.characterIds || []).includes(character.id)).length,
      "Community Notes": observations.filter((item) => item.reviewStatus === "approved").length,
    };
  }

  function likedToolsForCharacter(character, partnerBuckets, observations) {
    const tags = [...partnerBuckets.potential, ...partnerBuckets.research].flatMap((item) => item.tags || []);
    observations.forEach((item) => tags.push(...item.tags));
    const cleaned = [...new Set(tags)].filter(Boolean).slice(0, 4);
    if (cleaned.length) return cleaned;
    const strengths = cleanList(character.strengths).slice(0, 3);
    return strengths.length ? strengths : ["Partner preferences are still being researched."];
  }

  function extractCharacterIds(text) {
    const value = String(text || "").toLowerCase();
    return twoXkoDecisionState.characters
      .filter((character) => matchesCharacter(value, character))
      .map((character) => character.id);
  }

  function matchesCharacter(text, character) {
    const value = String(text || "").toLowerCase();
    const name = character.name.toLowerCase();
    const id = character.id.toLowerCase();
    if (value.includes(name)) return true;
    return new RegExp(`(^|[^a-z0-9])${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`).test(value);
  }

  function partnerBucketMarkup(title, items, empty) {
    return `
      <section class="decision-bucket">
        <h3>${escapeHtml(title)}</h3>
        ${items.length ? items.map((item) => `
          <article>
            <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta || item.status || "")}</span></div>
            <p>${escapeHtml(item.copy)}</p>
            ${chipListMarkup(item.tags || [])}
          </article>
        `).join("") : `<p>${escapeHtml(empty)}</p>`}
      </section>
    `;
  }

  function simpleBucketMarkup(title, items, empty) {
    return `
      <section class="decision-bucket">
        <h3>${escapeHtml(title)}</h3>
        ${items.length ? items.map((item) => `
          <article>
            <div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.meta || "")}</span></div>
            <p>${escapeHtml(item.copy)}</p>
            ${chipListMarkup(item.tags || [])}
          </article>
        `).join("") : `<p>${escapeHtml(empty)}</p>`}
      </section>
    `;
  }

  function needCardMarkup(title, items) {
    return `<article><h3>${escapeHtml(title)}</h3><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>`;
  }

  function observationMarkup(item) {
    const source = item.sourceLink ? `<a href="${escapeHtml(item.sourceLink)}" target="_blank" rel="noreferrer">Open source</a>` : `<span>Source link pending</span>`;
    return `
      <article>
        <div><h3>${escapeHtml(item.observation)}</h3></div>
        <dl>
          <div><dt>Source</dt><dd>${escapeHtml(item.match)}</dd></div>
          <div><dt>Timestamp</dt><dd>${escapeHtml(item.timestamp)}</dd></div>
        </dl>
        ${chipListMarkup(item.tags)}
        ${source}
      </article>
    `;
  }

  function chipListMarkup(items = []) {
    const cleanItems = cleanList(items);
    return cleanItems.length ? `<div class="decision-chip-list">${cleanItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>` : "";
  }

  function cleanList(items = []) {
    return [...new Set((Array.isArray(items) ? items : []).map(cleanText).filter(Boolean))];
  }

  function cleanText(value) {
    const text = String(value || "").trim();
    if (!text || /^TODO:/i.test(text)) return "";
    return text;
  }

  function decisionStatusMarkup(message) {
    return `<section class="portal-page-heading"><p class="eyebrow">2XKO Lab</p><h1>${escapeHtml(message)}</h1></section>`;
  }

  function initials(name) {
    return String(name || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  }

  function titleCase(value) {
    return String(value || "").split("-").map((part) => part ? `${part[0].toUpperCase()}${part.slice(1)}` : "").join(" ");
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
  window.FG_LAB_RESEARCH_VAULT?.load(twoXkoGame);
  window.FG_LAB_SYNERGY_ENGINE?.load(twoXkoGame);
  loadTwoXkoDecisionData(twoXkoGame);
  renderRoute();
})();
