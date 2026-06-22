(() => {
  const storageKey = "fg-lab:2xko-research-vault:v1";
  const sourceTypes = ["YouTube", "Discord", "Stream", "Tournament", "Personal Notes"];
  const statuses = [
    ["unverified", "Unverified"],
    ["needs-review", "Needs Review"],
    ["verified", "Verified"],
  ];
  const state = {
    container: null,
    page: null,
    seedRecords: [],
    localRecords: [],
    loaded: false,
    error: "",
    filters: { query: "", source: "all", status: "all", tag: "all" },
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
      state.seedRecords = (data.records || []).map(normalizeRecord);
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
    state.container.innerHTML = `
      <section class="research-vault-workspace" aria-labelledby="vaultTitle">
        <header class="vault-heading">
          <div>
            <p class="eyebrow">Internal Collection Workspace</p>
            <h1 id="vaultTitle">${escapeHtml(state.page?.title || "2XKO Research Vault")}</h1>
            <p>Capture evidence now. Promote it into recommendations only after review.</p>
          </div>
          <span class="vault-internal-badge">Local + internal</span>
        </header>

        ${state.error ? `<p class="vault-message vault-message--warning">${escapeHtml(state.error)} Local drafts remain available.</p>` : ""}

        <details class="vault-capture" open>
          <summary>Add research record</summary>
          ${captureFormMarkup()}
        </details>

        <section class="vault-filter-panel" aria-labelledby="vaultFilterTitle">
          <div class="vault-filter-heading">
            <div><p class="eyebrow">Source tracker</p><h2 id="vaultFilterTitle">Find collected evidence</h2></div>
            <button class="platform-action platform-action--secondary" type="button" data-vault-export>Export JSON</button>
          </div>
          <div class="vault-filters">
            <label><span>Search</span><input type="search" value="${escapeHtml(state.filters.query)}" placeholder="Character, notes, tags" data-vault-filter="query" /></label>
            ${selectMarkup("Source Type", "source", [["all", "All sources"], ...sourceTypes.map((item) => [item, item])], state.filters.source)}
            ${selectMarkup("Verification", "status", [["all", "All statuses"], ...statuses], state.filters.status)}
            ${selectMarkup("Tag", "tag", [["all", "All tags"], ...availableTags(records).map((item) => [item, item])], state.filters.tag)}
          </div>
        </section>

        <section class="vault-results-section" aria-labelledby="vaultResultsTitle">
          <div class="vault-results-heading"><h2 id="vaultResultsTitle">Research records</h2><span id="vaultResultCount"></span></div>
          <div id="vaultResults" class="research-vault-list"></div>
        </section>
      </section>
    `;
    updateResults();
  }

  function captureFormMarkup() {
    return `
      <form id="vaultCaptureForm" class="vault-capture-form">
        <label><span>Character</span><input name="character" required placeholder="Yasuo, Ahri, General Systems" /></label>
        ${selectMarkup("Source Type", "sourceType", sourceTypes.map((item) => [item, item]), sourceTypes[0], false)}
        <label class="vault-field-wide"><span>Source Link</span><input name="sourceLink" type="url" placeholder="https://..." /></label>
        <label class="vault-field-wide"><span>Notes</span><textarea name="notes" rows="4" required placeholder="What was claimed, shown, or tested?"></textarea></label>
        <label><span>Tags</span><input name="tags" placeholder="Synergy, Routes, Anti-Zoner" /></label>
        ${selectMarkup("Verification Status", "verificationStatus", statuses, "unverified", false)}
        <div class="vault-form-actions vault-field-wide">
          <p>Drafts stay in this browser until exported.</p>
          <button class="platform-action" type="submit">Save Local Record</button>
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
      : `<article class="research-record research-record--empty"><h2>No matching records</h2><p>Adjust the search or filters.</p></article>`;
  }

  function recordMarkup(record) {
    const status = statuses.find(([value]) => value === record.verificationStatus)?.[1] || "Unverified";
    const sourceLink = safeUrl(record.sourceLink);
    return `
      <article class="research-record">
        <div class="research-record__header">
          <div><span>${escapeHtml(record.sourceType)}</span><h2>${escapeHtml(record.character)}</h2></div>
          <strong class="vault-verification vault-verification--${escapeHtml(record.verificationStatus)}">${escapeHtml(status)}</strong>
        </div>
        <p>${escapeHtml(record.notes)}</p>
        <div class="research-tags">${record.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        <footer class="vault-record-footer">
          <span>${record.local ? "Local draft" : "Seed record"} · ${escapeHtml(record.updatedAt || record.createdAt || "Date pending")}</span>
          ${sourceLink ? `<a href="${escapeHtml(sourceLink)}" target="_blank" rel="noreferrer">Open source</a>` : `<span class="research-link-pending">Link pending</span>`}
        </footer>
      </article>
    `;
  }

  function filteredRecords() {
    const query = state.filters.query.trim().toLowerCase();
    return allRecords().filter((record) => {
      const haystack = [record.character, record.sourceType, record.notes, ...record.tags].join(" ").toLowerCase();
      return (!query || haystack.includes(query))
        && (state.filters.source === "all" || record.sourceType === state.filters.source)
        && (state.filters.status === "all" || record.verificationStatus === state.filters.status)
        && (state.filters.tag === "all" || record.tags.includes(state.filters.tag));
    });
  }

  function allRecords() {
    const records = [...state.localRecords, ...state.seedRecords];
    return [...new Map(records.map((record) => [record.id, record])).values()];
  }

  function availableTags(records) {
    return [...new Set(records.flatMap((record) => record.tags))].sort((a, b) => a.localeCompare(b));
  }

  function normalizeRecord(record, local = false) {
    return {
      id: String(record.id || `research-${Date.now()}`),
      character: String(record.character || "Unassigned").trim(),
      sourceType: String(record.sourceType || "Personal Notes").trim(),
      sourceLink: String(record.sourceLink || record.link || "").trim(),
      notes: String(record.notes || "").trim(),
      tags: normalizeTags(record.tags),
      verificationStatus: record.verificationStatus || (record.verified ? "verified" : "unverified"),
      createdAt: record.createdAt || "",
      updatedAt: record.updatedAt || record.createdAt || "",
      local,
    };
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
      return (JSON.parse(localStorage.getItem(storageKey) || "[]") || []).map((record) => normalizeRecord(record, true));
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
    const record = normalizeRecord({
      id: `local-${Date.now()}`,
      character: values.get("character"),
      sourceType: values.get("sourceType"),
      sourceLink: values.get("sourceLink"),
      notes: values.get("notes"),
      tags: values.get("tags"),
      verificationStatus: values.get("verificationStatus"),
      createdAt: today,
      updatedAt: today,
    }, true);
    state.localRecords.unshift(record);
    if (!saveLocalRecords()) state.error = "This browser could not save the local draft.";
    rerender();
  }

  function exportRecords() {
    const payload = {
      version: 2,
      updatedAt: new Date().toISOString().slice(0, 10),
      records: allRecords().map(({ local, ...record }) => record),
    };
    const url = URL.createObjectURL(new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "2xko-research-vault.json";
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
    if (event.target.closest("[data-vault-export]")) exportRecords();
  });

  window.FG_LAB_RESEARCH_VAULT = { load, render };
})();
