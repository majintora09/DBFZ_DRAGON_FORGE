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
    selectedPair: ["ahri", "teemo"],
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
      ["Knowledge Sources", "/games/2xko/knowledge-sources"],
      ["Tournament Evidence", "/games/2xko/tournament-evidence"],
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

    if (section === "knowledge-sources") {
      window.FG_LAB_2XKO_KNOWLEDGE?.render(twoXkoContent, page);
      return;
    }

    if (section === "tournament-evidence") {
      window.FG_LAB_2XKO_TOURNAMENT_EVIDENCE?.render(twoXkoContent, page);
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

    if (section === "fuses") {
      renderTwoXkoFuses(page);
      return;
    }

    if (section === "synergies") {
      renderTwoXkoSynergyLab(page);
      return;
    }

    if (section === "routes") {
      renderTwoXkoRoutes(page);
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

  function renderTwoXkoFuses(page) {
    if (!twoXkoDecisionState.loaded) {
      twoXkoContent.innerHTML = decisionStatusMarkup(twoXkoDecisionState.error || "Loading Fuse research...");
      return;
    }
    const fuseResearch = twoXkoDecisionState.observations.filter((item) => item.extractionTargets.includes("Fuse Notes") || item.tags.some((tag) => /fuse/i.test(tag)));
    const fuseNotes = window.FG_LAB_2XKO_KNOWLEDGE?.combinedStore?.().extractedKnowledge?.filter((note) => note.kind === "fuse-discussion") || [];
    const fuses = twoXkoDecisionState.fuses.length ? twoXkoDecisionState.fuses : [];
    twoXkoContent.innerHTML = `
      <section class="two-xko-tool-page">
        ${toolHeroMarkup(page, "Fuse Decisions", "Choose a Fuse by what your duo needs, then attach evidence before treating it as a recommendation.", [
          ["Fuse Notes", fuseResearch.length + fuseNotes.length],
          ["Stored Fuses", fuses.length],
          ["Verified Picks", fuses.filter((item) => item.verified).length],
        ])}
        <section class="tool-dashboard-grid">
          <article class="tool-panel tool-panel--wide">
            <div class="tool-panel-heading"><p class="eyebrow">Fuse Matrix</p><h2>Current Fuse Records</h2></div>
            <div class="fuse-card-grid">
              ${fuses.length ? fuses.map(fuseCardMarkup).join("") : emptyToolCard("No Fuse records yet", "Import official Fuse details or transcript notes through Knowledge Sources.")}
            </div>
          </article>
          <article class="tool-panel">
            <div class="tool-panel-heading"><p class="eyebrow">Decision Checklist</p><h2>Pick By Team Need</h2></div>
            <div class="tool-checklist">
              ${["Does the duo need safer neutral entry?", "Does the duo need route consistency?", "Does the duo need defensive stability?", "Does the duo need higher damage payoff?", "Is the Fuse claim backed by a source?"].map((item) => `<label><input type="checkbox" disabled /> <span>${escapeHtml(item)}</span></label>`).join("")}
            </div>
          </article>
        </section>
        <section class="tool-panel tool-panel--wide">
          <div class="tool-panel-heading"><p class="eyebrow">Source-backed Fuse Discussions</p><h2>Evidence Queue</h2></div>
          <div class="tool-note-grid">
            ${fuseNotes.length ? fuseNotes.map(sourceBackedNoteMarkup).join("") : fuseResearch.length ? fuseResearch.map(observationToolCardMarkup).join("") : emptyToolCard("Research In Progress", "Fuse-specific transcript notes and reviewed observations will appear here.")}
          </div>
        </section>
      </section>
    `;
  }

  function renderTwoXkoSynergyLab(page) {
    if (!twoXkoDecisionState.loaded) {
      twoXkoContent.innerHTML = decisionStatusMarkup(twoXkoDecisionState.error || "Loading Synergy Lab...");
      return;
    }
    const [firstId, secondId] = normalizedSelectedPair();
    const first = findTwoXkoCharacter(firstId);
    const second = findTwoXkoCharacter(secondId);
    const pairNotes = window.FG_LAB_2XKO_KNOWLEDGE?.recordsForPair?.(firstId, secondId) || [];
    const tournamentEvidence = window.FG_LAB_2XKO_TOURNAMENT_EVIDENCE?.recordsForPair?.(firstId, secondId) || [];
    const observations = observationsForPair(first, second);
    const officialRecords = twoXkoDecisionState.synergies.filter((item) => {
      const ids = [item.characterId, item.partnerId].sort().join("|");
      return ids === [firstId, secondId].sort().join("|");
    });
    twoXkoContent.innerHTML = `
      <section class="two-xko-tool-page">
        ${toolHeroMarkup(page, "Synergy Lab", "Inspect a pair as a research file: what is known, what is only observed, and what still needs proof.", [
          ["Pair Notes", pairNotes.length],
          ["Observations", observations.length],
          ["Tournament Examples", tournamentEvidence.length],
          ["Verified Synergies", officialRecords.filter((item) => item.verified).length],
        ])}
        <section class="tool-panel tool-panel--wide">
          <div class="tool-panel-heading"><p class="eyebrow">Champion Pair</p><h2>${escapeHtml(pairName(first, second))}</h2></div>
          <div class="synergy-pair-picker">
            ${characterSelectControl("pairA", firstId)}
            ${characterSelectControl("pairB", secondId)}
          </div>
          <div class="synergy-pair-profile">
            ${pairCharacterCard(first)}
            ${pairCharacterCard(second)}
          </div>
        </section>
        <section class="tool-dashboard-grid">
          <article class="tool-panel tool-panel--wide">
            <div class="tool-panel-heading"><p class="eyebrow">Pair File</p><h2>Strengths, Gaps, Win Condition</h2></div>
            <div class="synergy-file-grid">
              ${synergyFieldMarkup("Strengths", pairNotes, observations, ["strength", "neutral-synergy"])}
              ${synergyFieldMarkup("Weaknesses", pairNotes, observations, ["weakness", "defensive-synergy"])}
              ${synergyFieldMarkup("Win Condition", pairNotes, observations, ["win-condition"])}
              ${synergyFieldMarkup("Recommended Fuse", pairNotes, observations, ["recommended-fuse", "fuse"])}
              ${synergyFieldMarkup("Combo Synergy", pairNotes, observations, ["combo-synergy", "route"])}
              ${synergyFieldMarkup("Neutral Synergy", pairNotes, observations, ["neutral-synergy", "neutral"])}
              ${synergyFieldMarkup("Defensive Synergy", pairNotes, observations, ["defensive-synergy", "defense"])}
            </div>
          </article>
          <article class="tool-panel">
            <div class="tool-panel-heading"><p class="eyebrow">Research Status</p><h2>Before Publishing</h2></div>
            <div class="tool-checklist">
              ${["At least one source attached", "Route or neutral claim reviewed", "Fuse claim separated from guesswork", "Weakness recorded", "Win condition stated"].map((item) => `<label><input type="checkbox" disabled /> <span>${escapeHtml(item)}</span></label>`).join("")}
            </div>
          </article>
        </section>
        ${tournamentEvidencePairMarkup(first, second, tournamentEvidence)}
      </section>
    `;
  }

  function renderTwoXkoRoutes(page) {
    if (!twoXkoDecisionState.loaded) {
      twoXkoContent.innerHTML = decisionStatusMarkup(twoXkoDecisionState.error || "Loading route research...");
      return;
    }
    const routeObservations = twoXkoDecisionState.observations.filter((item) => item.extractionTargets.includes("Route Entries") || item.tags.some((tag) => /route|oki|corner|combo/i.test(tag)));
    const routeNotes = window.FG_LAB_2XKO_KNOWLEDGE?.combinedStore?.().extractedKnowledge?.filter((note) => note.kind === "combo-concept") || [];
    const characterRows = twoXkoDecisionState.characters.map((character) => ({
      character,
      observations: observationsForCharacter(character).filter((item) => routeObservations.includes(item)),
      sourceNotes: routeNotes.filter((note) => note.characters?.includes(character.id)),
    }));
    twoXkoContent.innerHTML = `
      <section class="two-xko-tool-page">
        ${toolHeroMarkup(page, "Route Decisions", "Track practical route learning by goal, character, source, and verification stage instead of dumping combo notation.", [
          ["Route Observations", routeObservations.length],
          ["Combo Notes", routeNotes.length],
          ["Verified Routes", twoXkoDecisionState.routes.filter((item) => item.verified).length],
        ])}
        <section class="tool-dashboard-grid">
          <article class="tool-panel tool-panel--wide">
            <div class="tool-panel-heading"><p class="eyebrow">Learning Queue</p><h2>What To Learn First</h2></div>
            <div class="route-lane-grid">
              ${routeLaneMarkup("Confirm", "Basic hit into stable damage or tag.", routeObservations, ["route", "conversion"])}
              ${routeLaneMarkup("Corner Carry", "Move the opponent to stronger screen position.", routeObservations, ["corner"])}
              ${routeLaneMarkup("Tag Route", "Bring the partner in while keeping pressure or oki.", routeObservations, ["tag routes", "tag"])}
              ${routeLaneMarkup("Oki / Setup", "End in a repeatable post-knockdown situation.", routeObservations, ["oki", "pressure"])}
            </div>
          </article>
          <article class="tool-panel">
            <div class="tool-panel-heading"><p class="eyebrow">Route Rules</p><h2>Publishing Standard</h2></div>
            <div class="tool-checklist">
              ${["Name the starter or situation", "Name the character pair if tag-based", "Attach source and timestamp", "Mark patch version", "Separate observation from recommendation"].map((item) => `<label><input type="checkbox" disabled /> <span>${escapeHtml(item)}</span></label>`).join("")}
            </div>
          </article>
        </section>
        <section class="tool-panel tool-panel--wide">
          <div class="tool-panel-heading"><p class="eyebrow">Character Route Coverage</p><h2>Current Research Map</h2></div>
          <div class="route-coverage-grid">
            ${characterRows.map(routeCoverageCardMarkup).join("")}
          </div>
        </section>
        <section class="tool-panel tool-panel--wide">
          <div class="tool-panel-heading"><p class="eyebrow">Source-backed Combo Concepts</p><h2>Transcript Extractions</h2></div>
          <div class="tool-note-grid">
            ${routeNotes.length ? routeNotes.map(sourceBackedNoteMarkup).join("") : emptyToolCard("Research In Progress", "Combo and route concepts extracted from transcripts will appear here.")}
          </div>
        </section>
      </section>
    `;
  }

  function renderTwoXkoOverview() {
    if (!twoXkoDecisionState.loaded) {
      twoXkoContent.innerHTML = decisionStatusMarkup(twoXkoDecisionState.error || "Loading 2XKO character decisions...");
      return;
    }

    const popularStarts = ["yasuo", "ahri", "vi"]
      .map((id) => twoXkoDecisionState.characters.find((character) => character.id === id))
      .filter(Boolean);
    const remainingCharacters = twoXkoDecisionState.characters.filter((character) => !popularStarts.some((item) => item.id === character.id));

    twoXkoContent.innerHTML = `
      <section class="two-xko-decision-home" aria-labelledby="twoXkoQuestion">
        <header class="decision-hero">
          <div>
            <p class="eyebrow">Popular Starts</p>
            <h1 id="twoXkoQuestion">I play...</h1>
            <p>Pick your champion first. FG Lab opens with their official identity, practical learning priorities, team needs, and current research status.</p>
          </div>
          <aside>
            <span>Popular Starts</span>
            ${popularStarts.map((character) => `<button type="button" data-route="/games/2xko/characters/${escapeHtml(character.id)}">I play ${escapeHtml(character.name)}</button>`).join("")}
          </aside>
        </header>

        <section class="decision-character-grid decision-character-grid--featured" aria-label="Popular 2XKO starts">
          ${popularStarts.map((character) => characterSelectCardMarkup(character, true)).join("")}
        </section>

        <section class="decision-section decision-roster-section" aria-label="2XKO champion selector">
          <div class="decision-section-heading"><p class="eyebrow">Champion Grid</p><h2>Choose Your Starting Point</h2></div>
          <div class="decision-character-grid">
            ${remainingCharacters.map((character) => characterSelectCardMarkup(character)).join("")}
          </div>
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
    const partnerWants = cleanList(character.partnerWants);
    const teamProvides = cleanList(character.teamProvides);
    const learningPriorities = cleanList(publicCharacter.learningPriorities || character.learningPriorities);
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
              <span style="${portraitStyle(item)}"></span>${escapeHtml(item.name)}
            </button>
          `).join("")}
        </nav>

        <section class="decision-profile" aria-labelledby="decisionProfileTitle">
          <div class="decision-portrait" style="${portraitStyle(character)}" aria-hidden="true"></div>
          <div>
            <p class="eyebrow">${escapeHtml(character.title || publicCharacter.title || "Champion Profile")}</p>
            <h1 id="decisionProfileTitle">${escapeHtml(character.name)}</h1>
            <p>${escapeHtml(overview)}</p>
            <dl class="decision-profile-meta">
              <div><dt>Playstyle</dt><dd>${escapeHtml(cleanText(character.playstyle) || "Research in progress")}</dd></div>
              <div><dt>Difficulty</dt><dd>${escapeHtml(cleanText(character.difficulty) || "Research in progress")}</dd></div>
              <div><dt>Region</dt><dd>${escapeHtml(cleanText(character.region || publicCharacter.region) || "Research in progress")}</dd></div>
              <div><dt>Source</dt><dd>${character.sourceUrl ? `<a href="${escapeHtml(character.sourceUrl)}" target="_blank" rel="noreferrer">Official 2XKO page</a>` : "Research in progress"}</dd></div>
            </dl>
            ${chipListMarkup(archetypes.length ? archetypes : ["Researching"])}
          </div>
        </section>

        <section class="decision-section" aria-labelledby="identityTitle">
          <div class="decision-section-heading"><p class="eyebrow">Real Content</p><h2 id="identityTitle">Identity And Learning Priorities</h2></div>
          <div class="decision-need-grid">
            ${needCardMarkup("Strengths", strengths.length ? strengths : ["Research In Progress"])}
            ${needCardMarkup("Weaknesses", weaknesses.length ? weaknesses : ["Research In Progress"])}
            ${needCardMarkup("Learning Priorities", learningPriorities.length ? learningPriorities : ["Research In Progress"])}
          </div>
        </section>

        ${sourceBackedCharacterKnowledgeMarkup(character)}
        ${tournamentEvidenceCharacterMarkup(character)}

        <section class="decision-section decision-needs" aria-labelledby="needsTitle">
          <div class="decision-section-heading"><p class="eyebrow">Decision check</p><h2 id="needsTitle">What does this character want?</h2></div>
          <div class="decision-need-grid">
            ${needCardMarkup("From a partner", partnerWants.length ? partnerWants : ["Research In Progress"])}
            ${needCardMarkup("Provides to a team", teamProvides.length ? teamProvides : ["Research In Progress"])}
            ${needCardMarkup("Current research leads", likedToolsForCharacter(character, partnerBuckets, characterObservations))}
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

  function toolHeroMarkup(page, fallbackTitle, copy, stats) {
    return `
      <header class="tool-hero">
        <div>
          <p class="eyebrow">${escapeHtml(page?.eyebrow || "2XKO Lab")}</p>
          <h1>${escapeHtml(page?.title || fallbackTitle)}</h1>
          <p>${escapeHtml(page?.summary || copy)}</p>
        </div>
        <dl>
          ${stats.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
        </dl>
      </header>
    `;
  }

  function fuseCardMarkup(fuse) {
    const relatedNotes = (window.FG_LAB_2XKO_KNOWLEDGE?.combinedStore?.().extractedKnowledge || []).filter((note) => {
      const haystack = `${note.title} ${note.body} ${(note.tags || []).join(" ")}`.toLowerCase();
      return haystack.includes(String(fuse.name || fuse.id).toLowerCase()) || note.kind === "fuse-discussion";
    }).slice(0, 2);
    return `
      <article class="fuse-card">
        <header>
          <span>${escapeHtml(fuse.verified ? "Verified" : "Research Candidate")}</span>
          <h3>${escapeHtml(fuse.name || titleCase(fuse.id))}</h3>
        </header>
        <p>${escapeHtml(fuse.reason || "Research In Progress")}</p>
        ${chipListMarkup(fuse.tags || [])}
        <div class="fuse-card__notes">
          ${relatedNotes.length ? relatedNotes.map((note) => `<p>${escapeHtml(note.title)}</p>`).join("") : `<p>Source-backed details pending.</p>`}
        </div>
      </article>
    `;
  }

  function emptyToolCard(title, copy) {
    return `<article class="tool-empty-card"><strong>${escapeHtml(title)}</strong><p>${escapeHtml(copy)}</p></article>`;
  }

  function observationToolCardMarkup(observation) {
    return `
      <article class="tool-observation-card">
        <span>${escapeHtml(observation.confidence || "Research")}</span>
        <h3>${escapeHtml(observation.match)}</h3>
        <p>${escapeHtml(observation.observation)}</p>
        ${chipListMarkup(observation.tags || [])}
        ${observation.sourceLink ? `<a href="${escapeHtml(observation.sourceLink)}" target="_blank" rel="noreferrer">Open source</a>` : ""}
      </article>
    `;
  }

  function normalizedSelectedPair() {
    const ids = twoXkoDecisionState.characters.map((character) => character.id);
    let [first, second] = twoXkoDecisionState.selectedPair;
    if (!ids.includes(first)) first = ids[0] || "";
    if (!ids.includes(second) || second === first) second = ids.find((id) => id !== first) || "";
    twoXkoDecisionState.selectedPair = [first, second];
    return twoXkoDecisionState.selectedPair;
  }

  function findTwoXkoCharacter(id) {
    return twoXkoDecisionState.characters.find((character) => character.id === id) || null;
  }

  function characterSelectControl(key, selected) {
    return `
      <label>
        <span>${key === "pairA" ? "First Champion" : "Second Champion"}</span>
        <select data-two-xko-pair="${escapeHtml(key)}">
          ${twoXkoDecisionState.characters.map((character) => `<option value="${escapeHtml(character.id)}"${character.id === selected ? " selected" : ""}>${escapeHtml(character.name)}</option>`).join("")}
        </select>
      </label>
    `;
  }

  function pairName(first, second) {
    return `${first?.name || "Champion"} + ${second?.name || "Champion"}`;
  }

  function pairCharacterCard(character) {
    if (!character) return emptyToolCard("Pick a champion", "Select two different champions to inspect pair notes.");
    return `
      <article class="synergy-pair-character" style="${portraitVars(character)}">
        <span class="synergy-pair-character__art" aria-hidden="true"></span>
        <div>
          <strong>${escapeHtml(character.name)}</strong>
          <p>${escapeHtml(cleanText(character.playstyle) || "Research in progress")}</p>
          ${chipListMarkup(character.archetypes || [])}
        </div>
      </article>
    `;
  }

  function observationsForPair(first, second) {
    if (!first || !second) return [];
    return twoXkoDecisionState.observations.filter((observation) => {
      const haystack = [observation.match, ...observation.teams, observation.observation, ...observation.tags].join(" ").toLowerCase();
      return matchesCharacter(haystack, first) && matchesCharacter(haystack, second);
    });
  }

  function synergyFieldMarkup(title, pairNotes, observations, needles) {
    const normalizedNeedles = needles.map((item) => item.toLowerCase());
    const matchingNotes = pairNotes.filter((note) => {
      const haystack = `${note.kind} ${note.synergyField} ${(note.tags || []).join(" ")} ${note.title} ${note.body}`.toLowerCase();
      return normalizedNeedles.some((needle) => haystack.includes(needle));
    });
    const matchingObservations = observations.filter((observation) => {
      const haystack = `${observation.observation} ${(observation.tags || []).join(" ")} ${(observation.extractionTargets || []).join(" ")}`.toLowerCase();
      return normalizedNeedles.some((needle) => haystack.includes(needle));
    });
    return `
      <section>
        <h3>${escapeHtml(title)}</h3>
        ${matchingNotes.length ? matchingNotes.slice(0, 2).map(sourceBackedNoteMarkup).join("") : matchingObservations.length ? matchingObservations.slice(0, 2).map(observationToolCardMarkup).join("") : `<p>Research In Progress</p>`}
      </section>
    `;
  }

  function routeLaneMarkup(title, copy, observations, needles) {
    const normalizedNeedles = needles.map((item) => item.toLowerCase());
    const matches = observations.filter((observation) => {
      const haystack = `${observation.observation} ${(observation.tags || []).join(" ")} ${(observation.extractionTargets || []).join(" ")}`.toLowerCase();
      return normalizedNeedles.some((needle) => haystack.includes(needle));
    });
    return `
      <section class="route-lane">
        <header><span>${matches.length}</span><h3>${escapeHtml(title)}</h3></header>
        <p>${escapeHtml(copy)}</p>
        <div>${matches.length ? matches.slice(0, 3).map(observationToolCardMarkup).join("") : `<p>Research In Progress</p>`}</div>
      </section>
    `;
  }

  function routeCoverageCardMarkup(row) {
    const count = row.observations.length + row.sourceNotes.length;
    return `
      <article class="route-coverage-card" style="${portraitVars(row.character)}">
        <span class="route-coverage-card__art" aria-hidden="true"></span>
        <div>
          <strong>${escapeHtml(row.character.name)}</strong>
          <p>${count} route note${count === 1 ? "" : "s"}</p>
        </div>
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
      window.FG_LAB_2XKO_KNOWLEDGE?.setCharacters(twoXkoDecisionState.characters);
      window.FG_LAB_2XKO_KNOWLEDGE?.load(twoXkoGame, twoXkoDecisionState.characters);
      window.FG_LAB_2XKO_TOURNAMENT_EVIDENCE?.setCharacters(twoXkoDecisionState.characters);
      window.FG_LAB_2XKO_TOURNAMENT_EVIDENCE?.load(twoXkoGame, twoXkoDecisionState.characters);
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
      title: data.title || "",
      region: data.region || "",
      portrait: data.portrait || "",
      sourceUrl: data.sourceUrl || "",
      identity: data.identity || "",
      playstyle: data.playstyle || "",
      difficulty: data.difficulty || "",
      strengths: data.strengths || [],
      weaknesses: data.weaknesses || [],
      archetypes: data.archetypes || [],
      partnerWants: data.partnerWants || [],
      teamProvides: data.teamProvides || [],
      learningPriorities: data.learningPriorities || [],
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

  function characterSelectCardMarkup(character, featured = false) {
    const observations = observationsForCharacter(character).length;
    const archetypes = cleanList(character.archetypes).slice(0, 3);
    return `
      <button class="decision-character-card ${featured ? "decision-character-card--featured" : ""}" type="button" data-route="/games/2xko/characters/${escapeHtml(character.id)}" style="${portraitVars(character)}">
        <span class="decision-character-card__art" aria-hidden="true"></span>
        <span class="decision-character-card__label">I play ${escapeHtml(character.name)}</span>
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

  function sourceBackedCharacterKnowledgeMarkup(character) {
    const grouped = window.FG_LAB_2XKO_KNOWLEDGE?.groupedCharacterKnowledge?.(character.id);
    if (!grouped) {
      return `
        <section class="decision-section character-knowledge-stack" aria-labelledby="sourceKnowledgeTitle">
          <div class="decision-section-heading"><p class="eyebrow">Source-backed Knowledge</p><h2 id="sourceKnowledgeTitle">Knowledge Pages</h2></div>
          <p class="empty-state">Knowledge Sources are still loading.</p>
        </section>
      `;
    }
    const sections = [
      ["Overview", grouped.overview],
      ["Recommended Partners", grouped.partners],
      ["Common Teams", grouped.teams],
      ["Neutral Notes", grouped.neutral],
      ["Combo Notes", grouped.combo],
      ["Matchup Notes", grouped.matchup],
      ["Sources", (grouped.sources || []).map((source) => ({
        kind: "source",
        title: source.title || "Source title pending",
        body: source.url || "No URL stored",
        sourceRefs: [source],
      }))],
    ];
    return `
      <section class="decision-section character-knowledge-stack" aria-labelledby="sourceKnowledgeTitle">
        <div class="decision-section-heading"><p class="eyebrow">Source-backed Knowledge</p><h2 id="sourceKnowledgeTitle">Character Knowledge Pages</h2></div>
        <div class="character-knowledge-grid">
          ${sections.map(([title, notes]) => `
            <section>
              <h3>${escapeHtml(title)}</h3>
              ${notes?.length ? notes.slice(0, 5).map(sourceBackedNoteMarkup).join("") : `<p>Research In Progress</p>`}
            </section>
          `).join("")}
        </div>
      </section>
    `;
  }

  function tournamentEvidenceCharacterMarkup(character) {
    const records = window.FG_LAB_2XKO_TOURNAMENT_EVIDENCE?.recordsForCharacter?.(character.id) || [];
    return `
      <section class="decision-section tournament-evidence-stack" aria-labelledby="tournamentEvidenceCharacterTitle">
        <div class="decision-section-heading">
          <p class="eyebrow">Tournament Evidence</p>
          <h2 id="tournamentEvidenceCharacterTitle">Timestamped Examples</h2>
        </div>
        <div class="tournament-evidence-note-grid">
          ${records.length ? records.slice(0, 6).map(tournamentEvidenceCompactMarkup).join("") : `<article class="tournament-evidence-empty"><strong>Research In Progress</strong><p>No timestamped tournament examples have been logged for ${escapeHtml(character.name)} yet.</p></article>`}
        </div>
      </section>
    `;
  }

  function tournamentEvidencePairMarkup(first, second, records) {
    return `
      <section class="tool-panel tool-panel--wide tournament-evidence-stack" aria-labelledby="pairTournamentEvidenceTitle">
        <div class="tool-panel-heading">
          <p class="eyebrow">Tournament Evidence</p>
          <h2 id="pairTournamentEvidenceTitle">${escapeHtml(pairName(first, second))} Examples</h2>
        </div>
        <div class="tournament-evidence-note-grid">
          ${records.length ? records.slice(0, 6).map(tournamentEvidenceCompactMarkup).join("") : `<article class="tournament-evidence-empty"><strong>Research In Progress</strong><p>No tournament footage examples are tied to this duo yet.</p></article>`}
        </div>
      </section>
    `;
  }

  function tournamentEvidenceCompactMarkup(record) {
    return `
      <details class="tournament-evidence-card tournament-evidence-card--compact">
        <summary>
          <span>${escapeHtml(titleCase(record.situationType || "example"))}</span>
          <strong>${escapeHtml(record.shortNote || "Tournament example")}</strong>
          <small>${escapeHtml(record.eventName || "Event pending")} · ${escapeHtml(record.timestamp || "Timestamp pending")}</small>
        </summary>
        <p>${escapeHtml(record.whyItMatters || "Why this matters is pending.")}</p>
        <dl class="tournament-evidence-meta">
          <div><dt>Players</dt><dd>${escapeHtml([record.player1, record.player2].filter(Boolean).join(" vs ") || "Players pending")}</dd></div>
          <div><dt>Fuse Used</dt><dd>${escapeHtml(record.fuseUsed || "Fuse pending")}</dd></div>
          <div><dt>Source</dt><dd>${record.youtubeUrl ? `<a href="${escapeHtml(timestampUrl(record.youtubeUrl, record.timestamp))}" target="_blank" rel="noreferrer">Open timestamp</a>` : "Source pending"}</dd></div>
        </dl>
      </details>
    `;
  }

  function timestampUrl(url, timestamp) {
    const cleanUrl = cleanText(url);
    if (!cleanUrl) return "";
    const seconds = String(timestamp || "").trim().split(":").map((part) => Number(part)).reduce((total, part) => Number.isNaN(part) ? 0 : total * 60 + part, 0);
    if (!seconds) return cleanUrl;
    try {
      const parsed = new URL(cleanUrl);
      parsed.searchParams.set("t", `${seconds}s`);
      return parsed.toString();
    } catch {
      return cleanUrl;
    }
  }

  function sourceBackedNoteMarkup(note) {
    const source = note.sourceRefs?.[0] || {};
    return `
      <details class="source-backed-note">
        <summary>${escapeHtml(note.title || "Source-backed note")}</summary>
        <p>${escapeHtml(note.body || "No note body stored.")}</p>
        <dl>
          <div><dt>Source title</dt><dd>${escapeHtml(source.title || "Source title pending")}</dd></div>
          <div><dt>Source URL</dt><dd>${source.url ? `<a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">Open source</a>` : "No URL stored"}</dd></div>
          <div><dt>Date added</dt><dd>${escapeHtml(source.dateAdded || note.createdAt || "Date pending")}</dd></div>
        </dl>
      </details>
    `;
  }

  function portraitFor(character) {
    const publicCharacter = twoXkoDecisionState.publicCharacters.find((item) => item.id === character.id) || {};
    return cleanText(character.portrait) || cleanText(publicCharacter.portrait) || "";
  }

  function portraitVars(character) {
    const portrait = portraitFor(character);
    return portrait ? `--champion-art:url(${escapeHtml(assetPath(portrait))})` : "";
  }

  function portraitStyle(character) {
    const portrait = portraitFor(character);
    return portrait ? `background-image:url(${escapeHtml(assetPath(portrait))})` : "";
  }

  function assetPath(path) {
    return window.FG_LAB_ASSET_PATH?.(path) || path;
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
  document.addEventListener("change", (event) => {
    const key = event.target.dataset.twoXkoPair;
    if (!key) return;
    if (key === "pairA") twoXkoDecisionState.selectedPair[0] = event.target.value;
    if (key === "pairB") twoXkoDecisionState.selectedPair[1] = event.target.value;
    if (twoXkoDecisionState.selectedPair[0] === twoXkoDecisionState.selectedPair[1]) {
      const replacement = twoXkoDecisionState.characters.find((character) => character.id !== event.target.value)?.id || "";
      if (key === "pairA") twoXkoDecisionState.selectedPair[1] = replacement;
      else twoXkoDecisionState.selectedPair[0] = replacement;
    }
    renderTwoXkoPage("/games/2xko/synergies");
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
  document.addEventListener("fg-lab:2xko-knowledge-updated", () => {
    if (currentRoute().startsWith("/games/2xko")) renderTwoXkoPage(currentRoute());
  });
  document.addEventListener("fg-lab:2xko-tournament-evidence-updated", () => {
    if (currentRoute().startsWith("/games/2xko")) renderTwoXkoPage(currentRoute());
  });
  renderRoute();
})();
