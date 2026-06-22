(() => {
  const state = {
    game: null,
    data: null,
    selectedCharacterId: "",
    loading: false,
    error: "",
    container: null,
    page: null,
  };

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function dataUrl(file) {
    const root = state.game?.dataRoot || "";
    const path = `${root.replace(/\/$/, "")}/${file}`;
    return window.FG_LAB_ASSET_PATH?.(path) || (window.location.protocol === "file:" ? path.replace(/^\//, "") : path);
  }

  async function load(game) {
    if (!game || state.loading) return;
    state.game = game;
    state.loading = true;
    state.error = "";
    try {
      const files = game.dataFiles || {};
      const [characters, synergies, fuses, routes] = await Promise.all([
        fetch(dataUrl(files.characters)).then(checkResponse),
        fetch(dataUrl(files.synergies)).then(checkResponse),
        fetch(dataUrl(files.fuses)).then(checkResponse),
        fetch(dataUrl(files.routes)).then(checkResponse),
      ]);
      state.data = {
        status: characters.status || synergies.status || "draft",
        characters: characters.characters || [],
        synergies: synergies.synergies || [],
        fuses: fuses.fuses || [],
        routes: routes.routes || [],
      };
      const firstSupported = state.data.characters.find((character) => hasRecommendations(character.id));
      state.selectedCharacterId = firstSupported?.id || state.data.characters[0]?.id || "";
    } catch (error) {
      state.error = error.message || "Recommendation data could not be loaded.";
    } finally {
      state.loading = false;
      rerender();
    }
  }

  function checkResponse(response) {
    if (!response.ok) throw new Error(`Recommendation data returned HTTP ${response.status}.`);
    return response.json();
  }

  function hasRecommendations(characterId) {
    return state.data?.synergies.some((item) => item.characterId === characterId);
  }

  function render(container, page) {
    state.container = container;
    state.page = page;
    rerender();
  }

  function rerender() {
    if (!state.container) return;
    if (state.loading || !state.data) {
      state.container.innerHTML = statusMarkup(state.error || "Loading recommendation data...");
      return;
    }

    const character = state.data.characters.find((item) => item.id === state.selectedCharacterId);
    if (!character) {
      state.container.innerHTML = statusMarkup("No character recommendations are available yet.");
      return;
    }

    const partners = state.data.synergies
      .filter((item) => item.characterId === character.id)
      .sort((a, b) => b.score - a.score);
    const fuses = byIds(state.data.fuses, character.recommendedFuseIds);
    const routes = byIds(state.data.routes, character.recommendedRouteIds);
    const supportedCharacters = state.data.characters.filter((item) => hasRecommendations(item.id));

    state.container.innerHTML = `
      <section class="synergy-engine" aria-labelledby="synergyQuestion">
        <header class="synergy-engine__header">
          <div>
            <p class="eyebrow">${escapeHtml(state.page?.eyebrow || "Synergy Engine")}</p>
            <h1 id="synergyQuestion">Who works well with ${escapeHtml(character.name)}?</h1>
            <p>${escapeHtml(character.overview || "Choose a character to see partner recommendations and the reason behind each match.")}</p>
          </div>
          <span class="synergy-engine__status">${state.data.status === "mock" ? "Example data" : "Reviewed data"}</span>
        </header>

        <nav class="synergy-character-picker" aria-label="Choose a character">
          ${supportedCharacters.map((item) => `
            <button type="button" data-synergy-character="${escapeHtml(item.id)}" aria-pressed="${item.id === character.id}">
              <span>${escapeHtml(initials(item.name))}</span>${escapeHtml(item.name)}
            </button>
          `).join("")}
        </nav>

        <div class="synergy-traits">
          ${traitCardMarkup("Strengths", character.strengths)}
          ${traitCardMarkup("Watch for", character.weaknesses)}
        </div>

        <section class="synergy-results" aria-labelledby="partnerResultsTitle">
          <div class="synergy-section-heading">
            <div><p class="eyebrow">Ranked partners</p><h2 id="partnerResultsTitle">Why these partners?</h2></div>
            <span>${partners.length} recommendation${partners.length === 1 ? "" : "s"}</span>
          </div>
          <div class="synergy-card-grid">
            ${partners.length ? partners.map(partnerCardMarkup).join("") : emptyCardMarkup("No partner records yet.")}
          </div>
        </section>

        <div class="synergy-support-grid">
          ${recommendationGroupMarkup("Recommended Fuses", fuses, "reason")}
          ${recommendationGroupMarkup("Routes to learn first", routes, "goal")}
          ${recommendationGroupMarkup("Notes", (character.notes || []).map((note, index) => ({ id: `note-${index}`, name: "Testing note", reason: note })), "reason")}
        </div>
      </section>
    `;
  }

  function byIds(items, ids = []) {
    const wanted = new Set(ids);
    return items.filter((item) => wanted.has(item.id));
  }

  function partnerCardMarkup(item) {
    const partner = state.data.characters.find((character) => character.id === item.partnerId);
    return recommendationCardMarkup({
      title: partner?.name || item.partnerId,
      score: item.score,
      reason: item.reason,
      difficulty: item.difficulty,
      tags: item.tags,
    });
  }

  function recommendationCardMarkup({ title, score, reason, difficulty, tags = [] }) {
    return `
      <article class="synergy-recommendation-card">
        <header>
          <div><span>Recommended partner</span><h3>${escapeHtml(title)}</h3></div>
          <strong class="synergy-score" aria-label="Synergy score ${escapeHtml(score)} out of 10">${escapeHtml(score)}<small>/10</small></strong>
        </header>
        <p>${escapeHtml(reason)}</p>
        <div class="synergy-card-meta"><span>Difficulty</span><strong>${escapeHtml(difficulty || "Not rated")}</strong></div>
        ${tagListMarkup(tags)}
      </article>
    `;
  }

  function traitCardMarkup(title, items = []) {
    return `<article><h2>${escapeHtml(title)}</h2>${items.length ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : "<p>Not documented yet.</p>"}</article>`;
  }

  function recommendationGroupMarkup(title, items, descriptionKey) {
    return `
      <section class="synergy-support-card">
        <h2>${escapeHtml(title)}</h2>
        ${items.length ? items.map((item) => `
          <article>
            <div><h3>${escapeHtml(item.name)}</h3>${item.difficulty ? `<span>${escapeHtml(item.difficulty)}</span>` : ""}</div>
            <p>${escapeHtml(item[descriptionKey] || "")}</p>
            ${tagListMarkup(item.tags || [])}
          </article>
        `).join("") : `<p>No recommendations yet.</p>`}
      </section>
    `;
  }

  function tagListMarkup(tags) {
    return tags.length ? `<div class="synergy-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : "";
  }

  function emptyCardMarkup(message) {
    return `<article class="synergy-recommendation-card synergy-recommendation-card--empty"><p>${escapeHtml(message)}</p></article>`;
  }

  function statusMarkup(message) {
    return `<section class="synergy-engine synergy-engine--status"><p class="eyebrow">Synergy Engine</p><h1>${escapeHtml(message)}</h1></section>`;
  }

  function initials(name) {
    return String(name || "?").split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-synergy-character]");
    if (!button || !state.data) return;
    state.selectedCharacterId = button.dataset.synergyCharacter;
    rerender();
  });

  window.FG_LAB_SYNERGY_ENGINE = { load, render };
})();
