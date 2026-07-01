(() => {
  const storageKey = "fg-lab:2xko-tournament-evidence:v1";
  const situationTypes = ["neutral", "combo", "assist", "defense", "pressure", "matchup", "tag route", "comeback"];
  const state = {
    container: null,
    page: null,
    seed: { records: [] },
    local: { records: [] },
    characters: [],
    loaded: false,
    error: "",
    filters: { query: "", character: "all", situation: "all" },
  };

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  async function load(game, characters = []) {
    state.characters = characters;
    state.local = loadLocalStore();
    try {
      const root = String(game?.dataRoot || "/public/data/2xko").replace(/\/$/, "");
      const file = game?.dataFiles?.tournamentEvidence || "tournament-evidence.json";
      const source = window.FG_LAB_ASSET_PATH?.(`${root}/${file}`) || `${root}/${file}`;
      const response = await fetch(source);
      if (!response.ok) throw new Error(`Tournament evidence returned HTTP ${response.status}.`);
      state.seed = normalizeStore(await response.json());
    } catch (error) {
      state.error = error.message || "Tournament evidence could not be loaded.";
    } finally {
      state.loaded = true;
      rerender();
    }
  }

  function setCharacters(characters = []) {
    state.characters = characters;
  }

  function render(container, page) {
    state.container = container;
    state.page = page;
    rerender();
  }

  function rerender() {
    if (!state.container) return;
    if (!state.loaded) {
      state.container.innerHTML = `<section class="knowledge-ingestion-status"><p class="eyebrow">Tournament Evidence</p><h1>Loading evidence database...</h1></section>`;
      return;
    }
    const records = filteredRecords(combinedStore().records);
    state.container.innerHTML = `
      <section class="tournament-evidence" aria-labelledby="tournamentEvidenceTitle">
        <header class="tournament-evidence-hero">
          <div>
            <p class="eyebrow">${escapeHtml(state.page?.eyebrow || "Admin Evidence")}</p>
            <h1 id="tournamentEvidenceTitle">${escapeHtml(state.page?.title || "Tournament Evidence")}</h1>
            <p>${escapeHtml(state.page?.summary || "Add timestamped tournament examples as observation-level evidence. These notes stay separate from transcript ingestion and do not become strategy claims by themselves.")}</p>
          </div>
          <dl>
            <div><dt>Examples</dt><dd>${combinedStore().records.length}</dd></div>
            <div><dt>Characters</dt><dd>${state.characters.length}</dd></div>
            <div><dt>Situations</dt><dd>${situationTypes.length}</dd></div>
          </dl>
        </header>

        ${state.error ? `<p class="knowledge-message">${escapeHtml(state.error)} Local evidence remains available.</p>` : ""}

        <details class="tournament-evidence-form" open>
          <summary>Add Tournament Evidence</summary>
          ${formMarkup()}
        </details>

        <section class="tournament-evidence-grid">
          <article class="knowledge-panel knowledge-panel--wide">
            <div class="knowledge-panel-heading">
              <div><p class="eyebrow">Evidence Search</p><h2>Timestamped Match Examples</h2></div>
              <button class="platform-action platform-action--secondary" type="button" data-evidence-export>Export Evidence</button>
            </div>
            ${filterMarkup()}
            <div class="tournament-evidence-list">
              ${records.length ? records.map(evidenceCardMarkup).join("") : `<article class="tournament-evidence-empty"><strong>No evidence matches.</strong><p>Add a tournament example or adjust the filters.</p></article>`}
            </div>
          </article>

          <article class="knowledge-panel">
            <div class="knowledge-panel-heading"><div><p class="eyebrow">Evidence Rules</p><h2>What Counts</h2></div></div>
            <div class="tool-checklist">
              ${[
                "Use tournament match footage, not commentary summaries",
                "Record exact timestamp and event context",
                "Describe what happened before explaining why it matters",
                "Tie examples to characters or a duo only when visible",
                "Treat evidence as examples, not automatic recommendations",
              ].map((item) => `<label><input type="checkbox" disabled /> <span>${escapeHtml(item)}</span></label>`).join("")}
            </div>
          </article>
        </section>
      </section>
    `;
  }

  function formMarkup() {
    return `
      <form id="tournamentEvidenceForm" class="tournament-evidence-source-grid">
        <label class="wide-field"><span>YouTube URL</span><input name="youtubeUrl" type="url" required placeholder="https://youtube.com/watch?v=..." /></label>
        <label><span>Timestamp</span><input name="timestamp" required placeholder="1:23:45" /></label>
        <label><span>Event Name</span><input name="eventName" required placeholder="CEO, Evo, Sajam Slam..." /></label>
        <label><span>Player 1</span><input name="player1" placeholder="Player or handle" /></label>
        <label><span>Player 2</span><input name="player2" placeholder="Player or handle" /></label>
        <label><span>Team 1 Characters</span><input name="team1Characters" placeholder="Ahri, Teemo" /></label>
        <label><span>Team 2 Characters</span><input name="team2Characters" placeholder="Yasuo, Blitzcrank" /></label>
        <label><span>Fuse Used</span><input name="fuseUsed" placeholder="Double Down, Fury, Freestyle..." /></label>
        <label><span>Situation Type</span><select name="situationType">${situationTypes.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(titleCase(type))}</option>`).join("")}</select></label>
        <label class="wide-field"><span>Short Note: What Happened</span><textarea name="shortNote" rows="4" required placeholder="Describe the visible game situation and result."></textarea></label>
        <label class="wide-field"><span>Why It Matters</span><textarea name="whyItMatters" rows="4" required placeholder="Explain why this example is useful without overstating it as settled strategy."></textarea></label>
        <label><span>Related Characters</span><input name="relatedCharacters" placeholder="Ahri, Teemo, Yasuo" /></label>
        <label><span>Related Team Synergy</span><input name="relatedTeamSynergy" placeholder="Ahri + Teemo" /></label>
        <div class="knowledge-form-actions wide-field">
          <p>Evidence is stored as timestamped observation data and shown as supporting examples on character and duo pages.</p>
          <button class="platform-action" type="submit">Add Evidence</button>
        </div>
      </form>
    `;
  }

  function filterMarkup() {
    const characterOptions = [["all", "All characters"], ...state.characters.map((character) => [character.id, character.name])];
    const situationOptions = [["all", "All situations"], ...situationTypes.map((type) => [type, titleCase(type)])];
    return `
      <div class="knowledge-filters tournament-evidence-filters">
        <label><span>Search</span><input type="search" value="${escapeHtml(state.filters.query)}" data-evidence-filter="query" placeholder="event player character situation" /></label>
        ${selectMarkup("Character", "character", characterOptions, state.filters.character)}
        ${selectMarkup("Situation", "situation", situationOptions, state.filters.situation)}
      </div>
    `;
  }

  function selectMarkup(label, key, options, selected) {
    return `<label><span>${escapeHtml(label)}</span><select data-evidence-filter="${escapeHtml(key)}">${options.map(([value, text]) => `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(text)}</option>`).join("")}</select></label>`;
  }

  function evidenceCardMarkup(record) {
    const sourceLink = timestampUrl(record.youtubeUrl, record.timestamp);
    const characters = [...new Set([...(record.team1Characters || []), ...(record.team2Characters || []), ...(record.relatedCharacters || [])])];
    return `
      <details class="tournament-evidence-card">
        <summary>
          <span>${escapeHtml(titleCase(record.situationType || "example"))}</span>
          <strong>${escapeHtml(record.shortNote || "Tournament example")}</strong>
          <small>${escapeHtml(record.eventName || "Event pending")} · ${escapeHtml(record.timestamp || "Timestamp pending")}</small>
        </summary>
        <p>${escapeHtml(record.whyItMatters || "Why this matters is pending.")}</p>
        <dl class="tournament-evidence-meta">
          <div><dt>Players</dt><dd>${escapeHtml([record.player1, record.player2].filter(Boolean).join(" vs ") || "Players pending")}</dd></div>
          <div><dt>Teams</dt><dd>${escapeHtml(teamLabel(record.team1Characters))} vs ${escapeHtml(teamLabel(record.team2Characters))}</dd></div>
          <div><dt>Fuse Used</dt><dd>${escapeHtml(record.fuseUsed || "Fuse pending")}</dd></div>
          <div><dt>Date Added</dt><dd>${escapeHtml(record.dateAdded || "Date pending")}</dd></div>
          <div><dt>Source</dt><dd>${sourceLink ? `<a href="${escapeHtml(sourceLink)}" target="_blank" rel="noreferrer">Open timestamp</a>` : "Source pending"}</dd></div>
        </dl>
        ${characters.length ? `<div class="knowledge-chip-list">${characters.map((id) => `<span>${escapeHtml(characterName(id))}</span>`).join("")}</div>` : ""}
      </details>
    `;
  }

  function submitEvidence(form) {
    const values = new FormData(form);
    const today = new Date().toISOString().slice(0, 10);
    const record = normalizeRecord({
      id: `local-evidence-${Date.now()}`,
      youtubeUrl: values.get("youtubeUrl"),
      timestamp: values.get("timestamp"),
      eventName: values.get("eventName"),
      player1: values.get("player1"),
      player2: values.get("player2"),
      team1Characters: parseCharacterIds(values.get("team1Characters")),
      team2Characters: parseCharacterIds(values.get("team2Characters")),
      fuseUsed: values.get("fuseUsed"),
      situationType: values.get("situationType"),
      shortNote: values.get("shortNote"),
      whyItMatters: values.get("whyItMatters"),
      relatedCharacters: parseCharacterIds(values.get("relatedCharacters")),
      relatedTeamSynergy: parseCharacterIds(values.get("relatedTeamSynergy")),
      dateAdded: today,
      sourceType: "Tournament Evidence",
    });
    state.local.records = [record, ...state.local.records.filter((item) => item.id !== record.id)];
    saveLocalStore();
    form.reset();
    rerender();
    document.dispatchEvent(new CustomEvent("fg-lab:2xko-tournament-evidence-updated"));
  }

  function combinedStore() {
    return normalizeStore({
      records: [...state.local.records, ...state.seed.records],
    });
  }

  function recordsForCharacter(characterId) {
    return combinedStore().records.filter((record) => recordIncludesCharacter(record, characterId));
  }

  function recordsForPair(firstId, secondId) {
    return combinedStore().records.filter((record) => recordIncludesPair(record, firstId, secondId));
  }

  function filteredRecords(records) {
    const query = state.filters.query.trim().toLowerCase();
    return records.filter((record) => {
      const haystack = [
        record.youtubeUrl,
        record.timestamp,
        record.eventName,
        record.player1,
        record.player2,
        record.fuseUsed,
        record.situationType,
        record.shortNote,
        record.whyItMatters,
        ...(record.team1Characters || []).map(characterName),
        ...(record.team2Characters || []).map(characterName),
        ...(record.relatedCharacters || []).map(characterName),
      ].join(" ").toLowerCase();
      return (!query || haystack.includes(query))
        && (state.filters.character === "all" || recordIncludesCharacter(record, state.filters.character))
        && (state.filters.situation === "all" || record.situationType === state.filters.situation);
    });
  }

  function recordIncludesCharacter(record, characterId) {
    return [
      ...(record.team1Characters || []),
      ...(record.team2Characters || []),
      ...(record.relatedCharacters || []),
      ...(record.relatedTeamSynergy || []),
    ].includes(characterId);
  }

  function recordIncludesPair(record, firstId, secondId) {
    if (!firstId || !secondId) return false;
    const pair = [firstId, secondId].sort().join("|");
    const related = [...(record.relatedTeamSynergy || [])];
    const teams = [record.team1Characters || [], record.team2Characters || []];
    return teams.some((team) => team.includes(firstId) && team.includes(secondId))
      || related.sort().join("|") === pair;
  }

  function normalizeStore(data) {
    return {
      records: Array.isArray(data?.records) ? data.records.map(normalizeRecord).filter((item) => item.shortNote || item.youtubeUrl) : [],
    };
  }

  function normalizeRecord(record) {
    const situation = String(record.situationType || "").trim().toLowerCase();
    return {
      id: clean(record.id) || `evidence-${Math.random().toString(36).slice(2)}`,
      youtubeUrl: clean(record.youtubeUrl),
      timestamp: clean(record.timestamp),
      eventName: clean(record.eventName),
      player1: clean(record.player1),
      player2: clean(record.player2),
      team1Characters: normalizeIds(record.team1Characters),
      team2Characters: normalizeIds(record.team2Characters),
      fuseUsed: clean(record.fuseUsed),
      situationType: situationTypes.includes(situation) ? situation : "neutral",
      shortNote: clean(record.shortNote),
      whyItMatters: clean(record.whyItMatters),
      relatedCharacters: normalizeIds(record.relatedCharacters),
      relatedTeamSynergy: normalizeIds(record.relatedTeamSynergy).slice(0, 2),
      dateAdded: clean(record.dateAdded),
      sourceType: "Tournament Evidence",
    };
  }

  function parseCharacterIds(value) {
    const text = String(value || "");
    const direct = text.split(/[,/+&|]/).map((item) => characterIdFromText(item)).filter(Boolean);
    const embedded = state.characters.filter((character) => matchesCharacter(text, character)).map((character) => character.id);
    return [...new Set([...direct, ...embedded])];
  }

  function normalizeIds(ids) {
    if (!Array.isArray(ids)) return parseCharacterIds(ids);
    return [...new Set(ids.map((id) => characterIdFromText(id)).filter(Boolean))];
  }

  function characterIdFromText(value) {
    const text = String(value || "").trim().toLowerCase();
    if (!text) return "";
    const slug = text.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const match = state.characters.find((character) => character.id === slug || character.name.toLowerCase() === text);
    return match?.id || "";
  }

  function matchesCharacter(text, character) {
    const value = String(text || "").toLowerCase();
    const name = character.name.toLowerCase();
    const id = character.id.toLowerCase();
    if (value.includes(name)) return true;
    return new RegExp(`(^|[^a-z0-9])${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`).test(value);
  }

  function characterName(id) {
    return state.characters.find((character) => character.id === id)?.name || titleCase(id);
  }

  function teamLabel(ids = []) {
    return ids.length ? ids.map(characterName).join(" + ") : "Team pending";
  }

  function timestampUrl(url, timestamp) {
    const cleanUrl = clean(url);
    if (!cleanUrl) return "";
    const seconds = timestampToSeconds(timestamp);
    if (!seconds) return cleanUrl;
    try {
      const parsed = new URL(cleanUrl);
      parsed.searchParams.set("t", `${seconds}s`);
      return parsed.toString();
    } catch {
      return cleanUrl;
    }
  }

  function timestampToSeconds(value) {
    const parts = String(value || "").trim().split(":").map((part) => Number(part));
    if (!parts.length || parts.some((part) => Number.isNaN(part))) return 0;
    return parts.reduce((total, part) => total * 60 + part, 0);
  }

  function loadLocalStore() {
    try {
      return normalizeStore(JSON.parse(localStorage.getItem(storageKey) || "{}"));
    } catch {
      return { records: [] };
    }
  }

  function saveLocalStore() {
    localStorage.setItem(storageKey, JSON.stringify(state.local, null, 2));
  }

  function exportStore() {
    const blob = new Blob([`${JSON.stringify(combinedStore(), null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "2xko-tournament-evidence.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function clean(value) {
    return String(value || "").trim();
  }

  function titleCase(value) {
    return String(value || "").split(/[-\s]+/).map((part) => part ? `${part[0].toUpperCase()}${part.slice(1)}` : "").join(" ");
  }

  document.addEventListener("submit", (event) => {
    if (event.target?.id !== "tournamentEvidenceForm") return;
    event.preventDefault();
    submitEvidence(event.target);
  });

  document.addEventListener("input", (event) => {
    const key = event.target?.dataset?.evidenceFilter;
    if (!key) return;
    state.filters[key] = event.target.value;
    rerender();
  });

  document.addEventListener("change", (event) => {
    const key = event.target?.dataset?.evidenceFilter;
    if (!key) return;
    state.filters[key] = event.target.value;
    rerender();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-evidence-export]")) return;
    exportStore();
  });

  window.FG_LAB_2XKO_TOURNAMENT_EVIDENCE = {
    load,
    setCharacters,
    render,
    combinedStore,
    recordsForCharacter,
    recordsForPair,
    evidenceCardMarkup,
  };
})();
