(() => {
  const storageKey = "fg-lab:2xko-research-vault:v3";
  const legacyStorageKeys = ["fg-lab:2xko-research-vault:v2", "fg-lab:2xko-research-vault:v1"];
  const sourceTypes = ["YouTube", "Discord", "Stream", "Tournament", "Personal Notes"];
  const confidenceLevels = ["Low", "Medium", "High"];
  const reviewStatuses = [
    ["observation", "Raw Observation"],
    ["needs-review", "Needs Review"],
    ["approved", "Approved for Extraction"],
  ];
  const extractionTargets = [
    "Character Notes",
    "Synergy Files",
    "Route Entries",
    "Fuse Notes",
    "Matchup Notes",
  ];
  const state = {
    container: null,
    page: null,
    seedRecords: [],
    localRecords: [],
    loaded: false,
    error: "",
    filters: { query: "", source: "all", review: "all", confidence: "all", tag: "all", target: "all" },
  };

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  async function load(game) {
    state.localRecords = loadLocalRecords();
    try {
      const file = game?.dataFiles?.researchVault || "research-vault.json";
      const root = String(game?.dataRoot || "/public/data/2xko").replace(/\/$/, "");
      const source = window.FG_LAB_ASSET_PATH?.(`${root}/${file}`) || `${root}/${file}`;
      const response = await fetch(source);
      if (!response.ok) throw new Error(`Research data returned HTTP ${response.status}.`);
      const data = await response.json();
      state.seedRecords = (data.records || []).map(normalizeObservation);
    } catch (error) {
      state.error = error.message || "Seed research data could not be loaded.";
    } finally {
      state.loaded = true;
      rerender();
    }
  }

  function render(container, page) {
    state.container = container;
    state.page = page;
    rerender();
  }

  function rerender() {
    if (!state.container) return;
    if (!state.loaded) {
      state.container.innerHTML = `<section class="vault-status"><p class="eyebrow">Internal Research</p><h1>Loading Research Vault...</h1></section>`;
      return;
    }

    const records = allRecords();
    const extractionCount = approvedObservations().length;
    state.container.innerHTML = `
      <section class="research-vault-workspace" aria-labelledby="vaultTitle">
        <header class="vault-heading">
          <div>
            <p class="eyebrow">Internal Collection Workspace</p>
            <h1 id="vaultTitle">${escapeHtml(state.page?.title || "2XKO Research Vault")}</h1>
            <p>Capture raw match observations first. Review them, then extract clean knowledge for character notes, synergies, routes, Fuses, and matchups.</p>
          </div>
          <span class="vault-internal-badge">Two-stage JSON workflow</span>
        </header>

        <ol class="vault-workflow" aria-label="Research workflow">
          ${["Video", "Observation", "Research Vault", "Review", "Synergy Database"].map((item, index) => `<li><span>${index + 1}</span>${item}</li>`).join("")}
        </ol>

        ${state.error ? `<p class="vault-message vault-message--warning">${escapeHtml(state.error)} Local drafts remain available.</p>` : ""}

        <details class="vault-capture" open>
          <summary>Raw Match Observation</summary>
          ${captureFormMarkup()}
        </details>

        <section class="vault-filter-panel" aria-labelledby="vaultFilterTitle">
          <div class="vault-filter-heading">
            <div><p class="eyebrow">Research queue</p><h2 id="vaultFilterTitle">Review observations before extraction</h2></div>
            <div class="vault-export-actions">
              <button class="platform-action platform-action--secondary" type="button" data-vault-export>Export Vault</button>
              <button class="platform-action" type="button" data-vault-export-extractions ${extractionCount ? "" : "disabled"}>Export Extractions (${extractionCount})</button>
            </div>
          </div>
          <div class="vault-filters">
            <label><span>Search</span><input type="search" value="${escapeHtml(state.filters.query)}" placeholder="Match, team, tag, observation" data-vault-filter="query" /></label>
            ${selectMarkup("Source", "source", [["all", "All sources"], ...sourceTypes.map((item) => [item, item])], state.filters.source)}
            ${selectMarkup("Review", "review", [["all", "All stages"], ...reviewStatuses], state.filters.review)}
            ${selectMarkup("Confidence", "confidence", [["all", "All confidence"], ...confidenceLevels.map((item) => [item, item])], state.filters.confidence)}
            ${selectMarkup("Target", "target", [["all", "All targets"], ...extractionTargets.map((item) => [item, item])], state.filters.target)}
            ${selectMarkup("Tag", "tag", [["all", "All tags"], ...availableTags(records).map((item) => [item, item])], state.filters.tag)}
          </div>
        </section>

        <section class="vault-results-section" aria-labelledby="vaultResultsTitle">
          <div class="vault-results-heading"><h2 id="vaultResultsTitle">Raw observations</h2><span id="vaultResultCount"></span></div>
          <div id="vaultResults" class="research-vault-list"></div>
        </section>
      </section>
    `;
    updateResults();
  }

  function captureFormMarkup() {
    return `
      <form id="vaultCaptureForm" class="vault-capture-form">
        <label class="vault-field-wide"><span>Match</span><input name="match" required placeholder="Sajam Slam Dunk - Winners Semis Game 1" /></label>
        <label><span>Team 1</span><input name="teamA" placeholder="Cloud805: Yasuo + Blitzcrank" /></label>
        <label><span>Team 2</span><input name="teamB" placeholder="Redditto/Inzem: Teemo + Ahri" /></label>
        <label><span>Timestamp</span><input name="timestamp" placeholder="3:10:15 or 2026-06-22 18:30" /></label>
        ${selectMarkup("Source", "sourceType", sourceTypes.map((item) => [item, item]), sourceTypes[0], false)}
        ${selectMarkup("Confidence", "confidence", confidenceLevels.map((item) => [item, item]), "Medium", false)}
        <label class="vault-field-wide"><span>Source Link</span><input name="sourceLink" type="url" placeholder="https://..." /></label>
        <label class="vault-field-wide"><span>Observation</span><textarea name="observation" rows="4" required placeholder="What happened in the match? Keep this factual. Do not turn it into a final recommendation yet."></textarea></label>
        <fieldset class="vault-targets vault-field-wide">
          <legend>Possible extraction targets</legend>
          ${extractionTargets.map((target) => `<label><input type="checkbox" name="extractionTargets" value="${escapeHtml(target)}" /> <span>${escapeHtml(target)}</span></label>`).join("")}
        </fieldset>
        <label class="vault-field-wide"><span>Tags</span><input name="tags" placeholder="Pressure, Tag Routes, Anti-Zoner" /></label>
        <div class="vault-form-actions vault-field-wide">
          <p>Stage 1 stores the observation only. Stage 2 starts after review.</p>
          <button class="platform-action" type="submit">Add Observation</button>
        </div>
      </form>
    `;
  }

  function selectMarkup(label, key, options, selected, filter = true) {
    const attribute = filter ? `data-vault-filter="${key}"` : `name="${key}"`;
    return `<label><span>${escapeHtml(label)}</span><select ${attribute}>${options.map(([value, text]) => `<option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(text)}</option>`).join("")}</select></label>`;
  }

  function updateResults() {
    const results = state.container?.querySelector("#vaultResults");
    const count = state.container?.querySelector("#vaultResultCount");
    if (!results || !count) return;
    const records = filteredRecords();
    count.textContent = `${records.length} of ${allRecords().length}`;
    results.innerHTML = records.length
      ? records.map(recordMarkup).join("")
      : `<article class="research-record research-record--empty"><h2>No matching observations</h2><p>Adjust the search or filters.</p></article>`;
  }

  function recordMarkup(record) {
    const status = reviewStatuses.find(([value]) => value === record.reviewStatus)?.[1] || "Raw Observation";
    const sourceLink = safeUrl(record.sourceLink);
    const canExport = record.reviewStatus === "approved";
    return `
      <article class="research-record">
        <div class="research-record__header">
          <div><span>${escapeHtml(record.sourceType)}</span><h2>${escapeHtml(record.match)}</h2></div>
          <strong class="vault-verification vault-verification--${escapeHtml(record.reviewStatus)}">${escapeHtml(status)}</strong>
        </div>
        ${record.teams.length ? `<div class="research-record__context">${record.teams.map((team) => `<strong>${escapeHtml(team)}</strong>`).join("")}</div>` : ""}
        <p>${escapeHtml(record.observation)}</p>
        ${record.extractionTargets.length ? `<div class="vault-target-chipset">${record.extractionTargets.map((target) => `<span>${escapeHtml(target)}</span>`).join("")}</div>` : ""}
        <div class="research-tags">${record.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        <dl class="research-record__meta">
          <div><dt>Timestamp</dt><dd>${escapeHtml(record.timestamp || "Not recorded")}</dd></div>
          <div><dt>Confidence</dt><dd>${escapeHtml(record.confidence)}</dd></div>
        </dl>
        <div class="vault-review-actions">
          ${record.reviewStatus === "observation" ? `<button type="button" data-vault-stage="needs-review" data-record-id="${escapeHtml(record.id)}">Send to Review</button>` : ""}
          ${record.reviewStatus === "needs-review" ? `<button type="button" data-vault-stage="observation" data-record-id="${escapeHtml(record.id)}">Return to Observation</button><button type="button" data-vault-stage="approved" data-record-id="${escapeHtml(record.id)}">Approve for Extraction</button>` : ""}
          ${record.reviewStatus === "approved" ? `<button type="button" data-vault-stage="needs-review" data-record-id="${escapeHtml(record.id)}">Reopen Review</button>` : ""}
          ${canExport ? `<button type="button" data-vault-export-extraction="${escapeHtml(record.id)}">Export Extraction JSON</button>` : ""}
        </div>
        <footer class="vault-record-footer">
          <span>${record.local ? "Local observation" : "Seed observation"} · ${escapeHtml(record.updatedAt || record.createdAt || "Date pending")}</span>
          ${sourceLink ? `<a href="${escapeHtml(sourceLink)}" target="_blank" rel="noreferrer">Open source</a>` : `<span class="research-link-pending">Link pending</span>`}
        </footer>
      </article>
    `;
  }

  function filteredRecords() {
    const query = state.filters.query.trim().toLowerCase();
    return allRecords().filter((record) => {
      const haystack = [record.match, ...record.teams, record.sourceType, record.observation, ...record.extractionTargets, ...record.tags].join(" ").toLowerCase();
      return (!query || haystack.includes(query))
        && (state.filters.source === "all" || record.sourceType === state.filters.source)
        && (state.filters.review === "all" || record.reviewStatus === state.filters.review)
        && (state.filters.confidence === "all" || record.confidence === state.filters.confidence)
        && (state.filters.target === "all" || record.extractionTargets.includes(state.filters.target))
        && (state.filters.tag === "all" || record.tags.includes(state.filters.tag));
    });
  }

  function allRecords() {
    return [...new Map([...state.localRecords, ...state.seedRecords].map((record) => [record.id, record])).values()];
  }

  function availableTags(records) {
    return [...new Set(records.flatMap((record) => record.tags))].sort((a, b) => a.localeCompare(b));
  }

  function normalizeObservation(record, local = false) {
    const reviewStatus = normalizeReviewStatus(record.reviewStatus || record.verificationStatus);
    const teams = normalizeTeams(record);
    return {
      id: String(record.id || `research-${Date.now()}`),
      match: String(record.match || record.topic || record.character || "Unassigned Match").trim(),
      teams,
      timestamp: String(record.timestamp || record.createdAt || "").trim(),
      observation: String(record.observation || record.notes || "").trim(),
      extractionTargets: normalizeExtractionTargets(record.extractionTargets || record.targetTypes || inferTargets(record)),
      sourceType: String(record.sourceType || record.source || "Personal Notes").trim(),
      sourceLink: String(record.sourceLink || record.link || "").trim(),
      tags: normalizeTags(record.tags),
      confidence: confidenceLevels.includes(record.confidence) ? record.confidence : "Medium",
      reviewStatus,
      createdAt: record.createdAt || "",
      updatedAt: record.updatedAt || record.createdAt || "",
      local,
    };
  }

  function normalizeReviewStatus(value) {
    if (value === "approved" || value === "verified") return "approved";
    if (value === "needs-review") return "needs-review";
    return "observation";
  }

  function normalizeTeams(record) {
    const values = Array.isArray(record.teams) ? record.teams : [
      record.teamA,
      record.teamB,
      record.team,
      [record.character, record.partner].filter(Boolean).join(" + "),
    ];
    return [...new Set(values.map((team) => String(team || "").trim()).filter(Boolean))];
  }

  function inferTargets(record) {
    const tags = normalizeTags(record.tags).join(" ").toLowerCase();
    const targets = [];
    if (record.partner || tags.includes("synergy") || tags.includes("duo")) targets.push("Synergy Files");
    if (record.fuse || tags.includes("fuse")) targets.push("Fuse Notes");
    if (tags.includes("route")) targets.push("Route Entries");
    if (tags.includes("matchup") || tags.includes("anti-")) targets.push("Matchup Notes");
    if (record.character || tags.includes("character")) targets.push("Character Notes");
    return targets;
  }

  function normalizeExtractionTargets(value) {
    const values = Array.isArray(value) ? value : String(value || "").split(",");
    return [...new Set(values.map((item) => item.trim()).filter((item) => extractionTargets.includes(item)))];
  }

  function normalizeTags(value) {
    const tags = Array.isArray(value) ? value : String(value || "").split(",");
    return [...new Set(tags.map((tag) => tag.trim().replace(/\.+$/, "")).filter((tag) => tag && tag.length <= 32))];
  }

  function safeUrl(value) {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }

  function loadLocalRecords() {
    try {
      const current = localStorage.getItem(storageKey);
      if (current) return (JSON.parse(current) || []).map((record) => normalizeObservation(record, true));
      for (const key of legacyStorageKeys) {
        const legacy = localStorage.getItem(key);
        if (legacy) return (JSON.parse(legacy) || []).map((record) => normalizeObservation(record, true));
      }
      return [];
    } catch {
      return [];
    }
  }

  function saveLocalRecords() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state.localRecords.map(({ local, ...record }) => record)));
      return true;
    } catch {
      return false;
    }
  }

  function addRecord(form) {
    const values = new FormData(form);
    const today = new Date().toISOString().slice(0, 10);
    const record = normalizeObservation({
      id: `local-${Date.now()}`,
      match: values.get("match"),
      teams: [values.get("teamA"), values.get("teamB")].filter(Boolean),
      timestamp: values.get("timestamp"),
      sourceType: values.get("sourceType"),
      sourceLink: values.get("sourceLink"),
      observation: values.get("observation"),
      extractionTargets: values.getAll("extractionTargets"),
      tags: values.get("tags"),
      confidence: values.get("confidence"),
      reviewStatus: "observation",
      createdAt: today,
      updatedAt: today,
    }, true);
    state.localRecords.unshift(record);
    if (!saveLocalRecords()) state.error = "This browser could not save the local observation.";
    rerender();
  }

  function setStage(id, reviewStatus) {
    const source = allRecords().find((record) => record.id === id);
    if (!source) return;
    const next = normalizeObservation({ ...source, reviewStatus, updatedAt: new Date().toISOString().slice(0, 10) }, true);
    state.localRecords = [next, ...state.localRecords.filter((record) => record.id !== id)];
    if (!saveLocalRecords()) state.error = "This browser could not save the review change.";
    rerender();
  }

  function exportRecords() {
    downloadJson("2xko-research-vault.json", {
      version: 4,
      workflow: "Video -> Observation -> Research Vault -> Review -> Synergy Database",
      updatedAt: new Date().toISOString(),
      records: allRecords().map(({ local, ...record }) => record),
    });
  }

  function approvedObservations() {
    return allRecords().filter((record) => record.reviewStatus === "approved");
  }

  function extractionCandidate(record) {
    return {
      observationId: record.id,
      reviewStatus: record.reviewStatus,
      match: record.match,
      teams: record.teams,
      timestamp: record.timestamp,
      observation: record.observation,
      tags: record.tags,
      confidence: record.confidence,
      extractionTargets: record.extractionTargets,
      source: {
        type: record.sourceType,
        link: record.sourceLink,
      },
      extracted: {
        characterNotes: [],
        synergyFiles: [],
        routeEntries: [],
        fuseNotes: [],
        matchupNotes: [],
      },
      verified: false,
    };
  }

  function exportExtraction(id) {
    const selected = allRecords().find((record) => record.id === id && record.reviewStatus === "approved");
    if (!selected) return;
    downloadJson(`${slugify(selected.match || selected.id)}-extraction.json`, extractionCandidate(selected));
  }

  function exportExtractions() {
    downloadJson("2xko-approved-extraction-candidates.json", {
      version: 1,
      generatedAt: new Date().toISOString(),
      workflow: "Reviewed observations only. Merge manually into character notes, synergies, routes, Fuses, or matchups.",
      schemas: {
        researchEntry: "/public/data/fg-lab/schemas/research-entry.json",
        synergyEntry: "/public/data/fg-lab/schemas/synergy-entry.json",
        routeEntry: "/public/data/fg-lab/schemas/route-entry.json",
        matchupEntry: "/public/data/fg-lab/schemas/matchup-entry.json",
      },
      observations: approvedObservations().map(extractionCandidate),
    });
  }

  function slugify(value) {
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "observation";
  }

  function downloadJson(filename, payload) {
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  document.addEventListener("submit", (event) => {
    if (event.target.id !== "vaultCaptureForm") return;
    event.preventDefault();
    addRecord(event.target);
  });

  document.addEventListener("input", (event) => {
    const key = event.target.dataset.vaultFilter;
    if (!key) return;
    state.filters[key] = event.target.value;
    updateResults();
  });

  document.addEventListener("change", (event) => {
    const key = event.target.dataset.vaultFilter;
    if (!key) return;
    state.filters[key] = event.target.value;
    updateResults();
  });

  document.addEventListener("click", (event) => {
    const stageButton = event.target.closest("[data-vault-stage]");
    if (stageButton) return setStage(stageButton.dataset.recordId, stageButton.dataset.vaultStage);
    const extractionButton = event.target.closest("[data-vault-export-extraction]");
    if (extractionButton) return exportExtraction(extractionButton.dataset.vaultExportExtraction);
    if (event.target.closest("[data-vault-export-extractions]")) return exportExtractions();
    if (event.target.closest("[data-vault-export]")) exportRecords();
  });

  window.FG_LAB_RESEARCH_VAULT = { load, render };
})();
