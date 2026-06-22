const curated = {
  "dbs-broly": {
    name: "DBS Broly",
    aliases: ["sbroly", "s broly", "super broly"],
    color: "#7fd36b",
    status: "polished",
    roles: ["Mid", "Anchor", "Damage"],
    archetype: "Strike-throw bruiser with giant reward, meter build, and great DHC value.",
    strengths: [
      "Huge damage and meter build, especially through long routes and auto-combo routing.",
      "Level 3 powers him up with damage, armor-break state, and passive ki generation.",
      "Long buttons, armor on key tools, command grabs, and strong strike-throw pressure.",
      "B assist covers a valuable diagonal-up angle that many teams appreciate.",
    ],
    weaknesses: [
      "Not a true high-low monster; his main threat is strike-throw and frame-trap fear.",
      "Some neutral tools are committal or predictable if repeated.",
      "He wants a meter plan so he can enter after DHC into level 3 and snowball.",
    ],
    wants: ["neutral cover", "fast lockdown", "meter plan", "defensive cover"],
    metrics: { damage: 10, neutral: 7, mix: 7, support: 7, ease: 5 },
  },
  "android-18": {
    name: "Android 18",
    aliases: ["18", "a18"],
    color: "#7dd3fc",
    status: "polished",
    roles: ["Mid", "Support", "Mix"],
    archetype: "Support/mix character built around 17 calls, barrier safety, and elite level 3 positioning.",
    strengths: [
      "One of the best level 3 mix situations because the spacing works from basically anywhere.",
      "Barrier assist protects risky movement and lets rushdown characters force awkward decisions.",
      "17 calls add neutral cover, combo routes, lockdown, and layered pressure.",
      "Strong lows and j.M left-right pressure make her assist-backed mix very scary.",
    ],
    weaknesses: [
      "Some 17 call pressure is timing-specific and can get loose if the assist spacing is wrong.",
      "Barrier is powerful but punishable if it becomes predictable.",
      "B assist has modest blockstun, so tight mix is easier with A utility or C lockdown.",
    ],
    wants: ["lockdown", "space control", "characters who value safety", "level 3 routes"],
    metrics: { damage: 6, neutral: 7, mix: 10, support: 9, ease: 6 },
  },
  frieza: {
    name: "Frieza",
    aliases: ["freeza"],
    color: "#f0d36f",
    status: "polished",
    roles: ["Point", "Zoner", "Golden"],
    archetype: "Screen-control zoner who becomes a fast mix threat once Golden Frieza is online.",
    strengths: [
      "Controls many screen angles with fast 5S, discs, orbs, pillars, lasers, and long normals.",
      "Golden Frieza gives speed, double air dash pressure, reverse beat, and stronger confirms.",
      "Self-sufficient combos, strong space traps, and good universal mix because 2L hits low.",
      "Can play point with assists or come in later after the team builds three bars.",
    ],
    weaknesses: [
      "Golden is once per match and timer-based, so bad timing can waste his biggest swing.",
      "A and B assists are awkward or low blockstun; C is the cleanest general support pick.",
      "He wants assists that lock people down long enough for discs, orbs, or stray-hit conversions.",
    ],
    wants: ["lockdown", "tracking assists", "meter for Golden", "anti-approach support"],
    metrics: { damage: 7, neutral: 10, mix: 8, support: 5, ease: 5 },
  },
};

const fileAliases = {
  "adult-gohan": "A-Gohan.png",
  "android-16": "Android-16.png",
  "android-17": "Android-17.png",
  "android-18": "Android-18.png",
  "android-21-majin": "Android-21.png",
  "android-21-lab-coat": "Lab-coat.png",
  bardock: "Bardock.png",
  "base-goku": "Base-Goku.png",
  "base-vegeta": "Base-Vegeta.png",
  beerus: "Beerus.png",
  cell: "Cell.png",
  cooler: "Cooler.png",
  "dbs-broly": "DBS-Broly.png",
  "dbz-broly": "Z-Broly.png",
  frieza: "Freeza.png",
  ginyu: "Ginyu.png",
  "gogeta-blue": "Gogeta-Blue.png",
  "ssj4-gogeta": "Gogeta-SS4.png",
  "ssj4-goku-daima": "ssj4-goku-daima.png",
  "goku-black": "Goku-Black.png",
  "goku-blue": "Goku-Blue.png",
  "vegeta-blue": "Vegeta-Blue.png",
  gotenks: "Gotenks.png",
  "gt-goku": "GT Goku.png",
  hit: "Hit.png",
  janemba: "Janemba.png",
  jiren: "Jiren.png",
  kefla: "Kefla.png",
  "kid-buu": "Kid-Buu.png",
  krillin: "Krillin.png",
  "majin-buu": "Majin-Buu.png",
  "master-roshi": "Master-Roshi.png",
  nappa: "Nappa.png",
  piccolo: "Piccolo.png",
  "ssj-goku": "SSJ-Goku.png",
  "ssj-vegeta": "SSJ-Vegeta.png",
  "super-baby-2": "Super-Baby.png",
  "teen-gohan": "Teen-Gohan.png",
  tien: "Tien.png",
  trunks: "Trunks.png",
  "ui-goku": "UI-Goku.png",
  "vegito-blue": "Vegito.png",
  videl: "Videl.png",
  yamcha: "Yamcha.png",
  zamasu: "Zamasu.png",
};

const metricMeta = {
  damage: { label: "Damage", color: "var(--damage)" },
  neutral: { label: "Neutral", color: "var(--neutral)" },
  mix: { label: "Mix", color: "var(--mix)" },
  support: { label: "Support", color: "var(--support)" },
};

const assetManifest = window.DBFZ_ASSETS || { backgrounds: {}, characters: {} };
const polishedOverrides = window.DBFZ_POLISHED_OVERRIDES || {};
let knowledgeDB = window.DBFZ_KNOWLEDGE_DB || {};
let frameDataDB = window.DBFZ_FRAME_DATA || { characters: {} };
let publicCharacterIndex = { characters: [] };
let publicAssistData = { assists: [] };
let publicSynergyData = { relationships: [] };
let publicGuideData = { templates: [], characterGuides: [] };
let publicTrainingData = { modules: [] };
let publicVideoData = { topics: [], videos: [] };
let publicCharacterContent = { records: {} };
let publicTeamNotesData = { records: {} };
let publicPlaystyleData = { playstyles: [] };
let publicMovieRoomData = { types: [], entries: [] };
let publicKnowledgeGraph = { archetypeLinks: [] };
let publicAdminSchema = { roles: {} };
let adminDrafts = { records: {}, trainingModules: {}, movieRoomEntries: {}, suggestions: [] };
const frameDataCache = {};
let graphDB = { nodes: new Map(), edges: [] };
let characters = [];
let team = [null, null, null];
let selectedCharacter = null;
let selectedPageCharacter = null;
let selectedPlaystyleId = null;
let selectedGraphNodeId = null;
let movieRoomSelectedIds = [];
let activeView = "team";
let frameSort = { key: "category", direction: "asc" };
let dragged = null;
let currentRole = "viewer";
const storageKey = "dbfz-team-lab-state-v1";
const adminDraftKey = "dbfz-team-lab-admin-drafts-v1";
const roleKey = "dbfz-team-lab-role-v1";
const adminPanelEnabled = false;
const defaultRoleDefinitions = {
  viewer: {
    label: "Viewer",
    summary: "Browse only.",
    permissions: ["browse", "search", "team_builder"],
  },
  contributor: {
    label: "Contributor",
    summary: "Suggest edits for review.",
    permissions: ["suggest_edits", "submit_notes"],
  },
  editor: {
    label: "Editor",
    summary: "Approve and modify character data.",
    permissions: ["approve_edits", "publish_character_data", "publish_training_lab", "publish_movie_room"],
  },
  admin: {
    label: "Admin",
    summary: "Full control over users, permissions, and site content.",
    permissions: ["manage_users", "manage_permissions", "manage_site_content", "publish_all"],
  },
};
let roleDefinitions = defaultRoleDefinitions;

const groupedFilterCategories = [
  {
    label: "Position",
    type: "character",
    tags: ["Point", "Mid", "Anchor"],
  },
  {
    label: "Playstyle",
    type: "character",
    tags: ["Rushdown", "Neutral", "Mix", "Setplay", "Zoner", "Grappler", "Defensive", "Technical"],
  },
  {
    label: "Team Role",
    type: "character",
    tags: ["Battery", "Support", "Enabler", "Finisher", "Anchor", "Glue", "Generalist", "Specialist"],
  },
  {
    label: "Assist Type",
    type: "assist",
    tags: ["Beam Assist", "Lockdown Assist", "Tracking Assist", "DP Assist", "Combo Extension", "Pressure Assist"],
  },
  {
    label: "Team Needs",
    type: "synergy",
    tags: ["Meter Build", "Corner Carry", "Reliable Confirms", "Neutral Control", "Easy Gameplan", "High Damage", "Beginner Friendly"],
  },
];

const groupedFilterPresets = {
  all: ["Position", "Playstyle", "Team Role", "Assist Type", "Team Needs"],
  character: ["Position", "Playstyle", "Team Role", "Team Needs"],
  assist: ["Assist Type", "Team Needs"],
  synergy: ["Playstyle", "Team Role", "Assist Type", "Team Needs"],
};

const teamTitle = document.querySelector("#teamTitle");
const teamPlan = document.querySelector("#teamPlan");
const recommendedOrder = document.querySelector("#recommendedOrder");
const teamSlots = [...document.querySelectorAll(".team-card")];
const roster = document.querySelector("#roster");
const search = document.querySelector("#search");
const filter = document.querySelector("#filter");
const roleFilter = document.querySelector("#roleFilter");
const metricFilter = document.querySelector("#metricFilter");
const assistTypeFilter = document.querySelector("#assistTypeFilter");
const rosterTagFilter = document.querySelector("#rosterTagFilter");
const teamShape = document.querySelector("#teamShape");
const synergyMap = document.querySelector("#synergyMap");
const noteStatus = document.querySelector("#noteStatus");
const characterModal = document.querySelector("#characterModal");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalClose = document.querySelector("#modalClose");
const modalContent = document.querySelector("#modalContent");
const teamBuilderViews = [...document.querySelectorAll(".team-builder-view")];
const charactersView = document.querySelector("#charactersView");
const playstylesView = document.querySelector("#playstylesView");
const knowledgeView = document.querySelector("#knowledgeView");
const guidesView = document.querySelector("#guidesView");
const videosView = document.querySelector("#videosView");
const characterSearch = document.querySelector("#characterSearch");
const tagTypeFilter = document.querySelector("#tagTypeFilter");
const tagFilter = document.querySelector("#tagFilter");
const characterList = document.querySelector("#characterList");
const characterPageArt = document.querySelector("#characterPageArt");
const characterPageName = document.querySelector("#characterPageName");
const characterPageOverview = document.querySelector("#characterPageOverview");
const characterPageTags = document.querySelector("#characterPageTags");
const characterStrengths = document.querySelector("#characterStrengths");
const characterWeaknesses = document.querySelector("#characterWeaknesses");
const characterAssists = document.querySelector("#characterAssists");
const characterPositions = document.querySelector("#characterPositions");
const characterSynergies = document.querySelector("#characterSynergies");
const characterCombos = document.querySelector("#characterCombos");
const characterMatchups = document.querySelector("#characterMatchups");
const characterCommunity = document.querySelector("#characterCommunity");
const characterEditButton = document.querySelector("#characterEditButton");
const frameSearch = document.querySelector("#frameSearch");
const frameGroupFilter = document.querySelector("#frameGroupFilter");
const frameViewMode = document.querySelector("#frameViewMode");
const frameTableBody = document.querySelector("#frameTableBody");
const frameCard = document.querySelector(".frame-card");
const synergySearch = document.querySelector("#synergySearch");
const characterTagFilter = document.querySelector("#characterTagFilter");
const assistTagFilter = document.querySelector("#assistTagFilter");
const synergyTagFilter = document.querySelector("#synergyTagFilter");
const minBlockstunFilter = document.querySelector("#minBlockstunFilter");
const assistResults = document.querySelector("#assistResults");
const characterTagResults = document.querySelector("#characterTagResults");
const relationshipResults = document.querySelector("#relationshipResults");
const playstyleSearch = document.querySelector("#playstyleSearch");
const playstyleList = document.querySelector("#playstyleList");
const playstyleTitle = document.querySelector("#playstyleTitle");
const playstyleSummary = document.querySelector("#playstyleSummary");
const playstyleCharacters = document.querySelector("#playstyleCharacters");
const playstyleShells = document.querySelector("#playstyleShells");
const playstyleExamples = document.querySelector("#playstyleExamples");
const playstyleStrengths = document.querySelector("#playstyleStrengths");
const playstyleWeaknesses = document.querySelector("#playstyleWeaknesses");
const playstyleWhy = document.querySelector("#playstyleWhy");
const playstyleTags = document.querySelector("#playstyleTags");
const graphSearch = document.querySelector("#graphSearch");
const graphTypeFilter = document.querySelector("#graphTypeFilter");
const graphNodeList = document.querySelector("#graphNodeList");
const graphTitle = document.querySelector("#graphTitle");
const graphSummary = document.querySelector("#graphSummary");
const graphFocusType = document.querySelector("#graphFocusType");
const graphFocusTitle = document.querySelector("#graphFocusTitle");
const graphFocusSummary = document.querySelector("#graphFocusSummary");
const graphFocusTags = document.querySelector("#graphFocusTags");
const graphConnections = document.querySelector("#graphConnections");
const graphEvidence = document.querySelector("#graphEvidence");
const knowledgeDrawer = document.querySelector("#knowledgeDrawer");
const guideSearch = document.querySelector("#guideSearch");
const guideTemplateSelect = document.querySelector("#guideTemplateSelect");
const guideTitle = document.querySelector("#guideTitle");
const guideSummary = document.querySelector("#guideSummary");
const guideSections = document.querySelector("#guideSections");
const movieSearch = document.querySelector("#movieSearch");
const movieScopeFilter = document.querySelector("#movieScopeFilter");
const movieCharacterPicker = document.querySelector("#movieCharacterPicker");
const movieTeamPicker = document.querySelector("#movieTeamPicker");
const movieEditTeam = document.querySelector("#movieEditTeam");
const movieTypeFilter = document.querySelector("#movieTypeFilter");
const movieRoomList = document.querySelector("#movieRoomList");
const videoSearch = document.querySelector("#videoSearch");
const videoCharacterFilter = document.querySelector("#videoCharacterFilter");
const videoTopicFilter = document.querySelector("#videoTopicFilter");
const videoList = document.querySelector("#videoList");
const adminView = document.querySelector("#adminView");
const adminRoleSelect = document.querySelector("#adminRoleSelect");
const adminCharacterSelect = document.querySelector("#adminCharacterSelect");
const permissionSummary = document.querySelector("#permissionSummary");
const adminCharacterTitle = document.querySelector("#adminCharacterTitle");
const adminModeNote = document.querySelector("#adminModeNote");
const characterEditorForm = document.querySelector("#characterEditorForm");
const saveCharacterDraft = document.querySelector("#saveCharacterDraft");
const publishCharacterDraft = document.querySelector("#publishCharacterDraft");
const exportAdminData = document.querySelector("#exportAdminData");
const clearAdminDrafts = document.querySelector("#clearAdminDrafts");
const adminExportOutput = document.querySelector("#adminExportOutput");
const editName = document.querySelector("#editName");
const editPortrait = document.querySelector("#editPortrait");
const editArchetype = document.querySelector("#editArchetype");
const editGameplan = document.querySelector("#editGameplan");
const editWants = document.querySelector("#editWants");
const ratingEditor = document.querySelector("#ratingEditor");
const editTags = document.querySelector("#editTags");
const editAssistTags = document.querySelector("#editAssistTags");
const editSynergyTags = document.querySelector("#editSynergyTags");
const editStrengths = document.querySelector("#editStrengths");
const editWeaknesses = document.querySelector("#editWeaknesses");
const editBestPartners = document.querySelector("#editBestPartners");
const editGoodPartners = document.querySelector("#editGoodPartners");
const editCarePartners = document.querySelector("#editCarePartners");
const editAssistNotes = document.querySelector("#editAssistNotes");
const editDhcNotes = document.querySelector("#editDhcNotes");
const editMatchups = document.querySelector("#editMatchups");
const editCommunity = document.querySelector("#editCommunity");
const adminTrainingSelect = document.querySelector("#adminTrainingSelect");
const editTrainingTitle = document.querySelector("#editTrainingTitle");
const editTrainingCategory = document.querySelector("#editTrainingCategory");
const editTrainingSummary = document.querySelector("#editTrainingSummary");
const editTrainingDeepDive = document.querySelector("#editTrainingDeepDive");
const editTrainingTakeaways = document.querySelector("#editTrainingTakeaways");
const editTrainingTags = document.querySelector("#editTrainingTags");
const saveTrainingDraft = document.querySelector("#saveTrainingDraft");
const publishTrainingDraft = document.querySelector("#publishTrainingDraft");
const adminMovieSelect = document.querySelector("#adminMovieSelect");
const editMovieTitle = document.querySelector("#editMovieTitle");
const editMovieScope = document.querySelector("#editMovieScope");
const editMovieCharacterIds = document.querySelector("#editMovieCharacterIds");
const editMovieSummary = document.querySelector("#editMovieSummary");
const editMovieTags = document.querySelector("#editMovieTags");
const editMovieResources = document.querySelector("#editMovieResources");
const saveMovieDraft = document.querySelector("#saveMovieDraft");
const publishMovieDraft = document.querySelector("#publishMovieDraft");
const menuToggle = document.querySelector("#menuToggle");
const navBackdrop = document.querySelector("#navBackdrop");
const mobilePreviewToggle = document.querySelector("#mobilePreviewToggle");

async function loadPublicDatabase() {
  const [tags, assists, synergies, index, guides, training, videos, characterContent, teamNotes, playstyles, movieRoom, graphConfig, adminSchema] = await Promise.all([
    fetchJSON("public/data/dbfz/tags.json"),
    fetchJSON("public/data/dbfz/assist-data.json"),
    fetchJSON("public/data/dbfz/synergies.json"),
    fetchJSON("public/data/dbfz/characters.json"),
    fetchJSON("public/data/dbfz/guides.json"),
    fetchJSON("public/data/dbfz/training-lab.json"),
    fetchJSON("public/data/dbfz/video-library.json"),
    fetchJSON("public/data/dbfz/character-content.json"),
    fetchJSON("public/data/dbfz/team-building-notes.json"),
    fetchJSON("public/data/dbfz/playstyle-teams.json"),
    fetchJSON("public/data/dbfz/movie-room.json"),
    fetchJSON("public/data/dbfz/knowledge-graph.json"),
    fetchJSON("public/data/dbfz/admin-schema.json"),
  ]);

  publicAssistData = normalizeAssistData(assists || publicAssistData);
  publicSynergyData = normalizeSynergyData(synergies || publicSynergyData);
  publicCharacterIndex = index || publicCharacterIndex;
  publicGuideData = guides || publicGuideData;
  publicTrainingData = training || publicTrainingData;
  publicVideoData = videos || publicVideoData;
  publicCharacterContent = characterContent || publicCharacterContent;
  publicTeamNotesData = teamNotes || publicTeamNotesData;
  publicPlaystyleData = playstyles || publicPlaystyleData;
  publicMovieRoomData = movieRoom || publicMovieRoomData;
  publicKnowledgeGraph = graphConfig || publicKnowledgeGraph;
  publicAdminSchema = adminSchema || publicAdminSchema;
  roleDefinitions = publicAdminSchema.roles || defaultRoleDefinitions;
  restoreAdminDrafts();

  if (tags) {
    knowledgeDB = {
      ...knowledgeDB,
      tagCatalog: {
        character: cleanTagList(tags.characterTags || []).map((label) => ({ id: label, label })),
        assist: cleanTagList(tags.assistTags || []).map((label) => ({ id: label, label })),
        synergy: cleanTagList(tags.synergyTags || []).map((label) => ({ id: label, label })),
      },
    };
  }
}

async function fetchJSON(url) {
  try {
    const response = await fetch(window.FG_LAB_ASSET_PATH?.(url) || url);
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function init() {
  await loadPublicDatabase();
  currentRole = localStorage.getItem(roleKey) || "viewer";
  const raw = window.DBFZ_CHARACTER_DATA || (await fetch("data/characters.raw.json").then((response) => response.json()));

  characters = raw.characters.map((character) => {
    const profile = character.profile || {};
    const override = polishedOverrides[character.id] || curated[character.id] || findCuratedByName(character.name);
    const contentRecord = publicCharacterContent.records?.[character.id] || {};
    const pdfRecord = pdfCharacterRecord(character.id);
    const pdfDerivedRecord = pdfDerivedCharacterRecord(pdfRecord);
    const draftRecord = adminDrafts.records?.[character.id] || {};
    const base = {
      id: character.id,
      name: character.name,
      aliases: [],
      color: colorFromName(character.name),
      status: "polished",
      roles: profile.roles || ["Flexible"],
      archetype: profile.summary || character.summary,
      strengths: profile.strengths || [],
      weaknesses: profile.weaknesses || [],
      wants: profile.wants || ["assist testing"],
      metrics: profile.metrics || { damage: 4, neutral: 4, mix: 4, support: 4, ease: 5 },
    };
    return normalizeCharacterRecord({ ...base, ...override, ...contentRecord, ...pdfDerivedRecord, ...draftRecord, status: "polished" });
  });
  applyRosterCorrections();

  applyHeroAsset();
  populateRoleFilter();
  populateTagFilter();
  populateAdminControls();
  populateKnowledgePlatformControls();
  rebuildKnowledgeGraph();

  team = [null, null, null];
  selectedCharacter = null;
  selectedPageCharacter = characters[0] || null;
  restoreState();
  if (adminRoleSelect) adminRoleSelect.value = currentRole;
  renderNoteStatus();
  render();
}

function render() {
  renderView();
  renderTeamSlots();
  renderRoster();
  renderTeamSummary();
  renderTeamShape();
  renderSynergy();
  renderCharacterDatabase();
  renderSynergyDatabase();
  renderPlaystyleTeams();
  syncKnowledgeDrawerState();
  renderKnowledgeGraph();
  renderGuides();
  renderMovieRoom();
  renderVideoLibrary();
  renderAdminPanel();
}

function syncKnowledgeDrawerState() {
  if (!knowledgeDrawer) return;
  const isMobileLayout = window.matchMedia("(max-width: 1024px)").matches || document.body.classList.contains("mobile-preview");
  if (!isMobileLayout) {
    knowledgeDrawer.open = true;
    knowledgeDrawer.dataset.autoCollapsed = "";
    return;
  }
  if (!knowledgeDrawer.dataset.autoCollapsed) {
    knowledgeDrawer.open = false;
    knowledgeDrawer.dataset.autoCollapsed = "true";
  }
}

function renderTeamSlots() {
  teamSlots.forEach((slot, index) => {
    const character = team[index];
    slot.classList.toggle("empty", !character);
    slot.classList.toggle("is-selected", character && selectedCharacter?.id === character.id);
    slot.dataset.slot = index;
    slot.dataset.characterId = character?.id || "";
    slot.style.setProperty("--fighter-color", character?.color || "var(--gold)");

    if (!character) {
      slot.innerHTML = `
        <span class="slot-index">${String(index + 1).padStart(2, "0")}</span>
        <div class="team-art empty-art">+</div>
        <div class="team-copy">
          <strong>Drop fighter</strong>
          <p>Click or drag from the roster tray.</p>
        </div>
      `;
      return;
    }

    slot.innerHTML = `
      <span class="slot-index">${String(index + 1).padStart(2, "0")}</span>
      <div class="team-art"></div>
      <span class="drag-grip" aria-hidden="true"></span>
      <div class="team-copy">
        <strong>${character.name}</strong>
        <p>${shortArchetype(character)}</p>
        ${personalBars(character)}
      </div>
      <button class="remove-slot" type="button" aria-label="Remove ${character.name}">x</button>
    `;
    paintArt(slot.querySelector(".team-art"), character);
    slot.querySelector(".remove-slot").addEventListener("click", (event) => {
      event.stopPropagation();
      team[index] = null;
      saveState();
      render();
    });
  });
}

function renderRoster() {
  const q = search.value.trim().toLowerCase();
  roster.replaceChildren();

  const visible = characters.filter((character) => {
    const matchesSearch =
      !q ||
      character.name.toLowerCase().includes(q) ||
      character.aliases?.some((alias) => alias.includes(q));
    const matchesStatus =
      filter.value === "all" ||
      (filter.value === "curated" && character.status === "polished") ||
      (filter.value === "raw" && character.status !== "polished");
    const matchesRole = roleFilter.value === "all" || character.roles.includes(roleFilter.value);
    const matchesMetric = metricFilter.value === "all" || strongestMetric([character]) === metricFilter.value;
    const page = characterPageData(character);
    const matchesAssist = assistTypeFilter.value === "all" || tagSetIncludes(page.assistTags || [], assistTypeFilter.value);
    const matchesRosterTag = rosterTagFilter.value === "all" || tagSetIncludes(filterablePageTags(character, page), rosterTagFilter.value);
    return matchesSearch && matchesStatus && matchesRole && matchesMetric && matchesAssist && matchesRosterTag;
  });

  for (const character of visible) {
    const card = document.createElement("button");
    card.className = "roster-card";
    card.type = "button";
    card.draggable = true;
    card.dataset.characterId = character.id;
    card.style.setProperty("--fighter-color", character.color || "var(--gold)");
    card.classList.toggle("in-team", team.some((member) => member?.id === character.id));
    card.classList.toggle("is-selected", selectedCharacter?.id === character.id);
    card.innerHTML = `
      <span class="roster-art"></span>
      <span class="roster-name">${shortName(character.name)}</span>
    `;
    paintArt(card.querySelector(".roster-art"), character);
    card.addEventListener("click", () => {
      selectedCharacter = character;
      openCharacterModal(character);
    });
    card.addEventListener("dragstart", (event) => {
      dragged = { type: "roster", characterId: character.id };
      event.dataTransfer.setData("text/plain", character.id);
      event.dataTransfer.effectAllowed = "copyMove";
    });
    roster.append(card);
  }
}

function openCharacterModal(character) {
  if (!character || !characterModal || !modalContent) return;
  if (activeView !== "team") {
    openCharacterPage(character);
    return;
  }
  selectedCharacter = character;
  const page = characterPageData(character);
  const partners = recommendPartners(character);
  characterModal.hidden = false;
  document.body.classList.add("modal-open");
  modalContent.style.setProperty("--fighter-color", character.color || "var(--gold)");
  modalContent.innerHTML = characterModalMarkup(character, page, partners);
  paintArt(modalContent.querySelector(".modal-character-art"), character);
  modalContent.querySelectorAll("[data-modal-teammate-art]").forEach((node) => {
    const teammate = findCharacter(node.dataset.modalTeammateArt);
    if (teammate) paintArt(node, teammate);
  });
  bindModalActions(character, partners);
}

function closeCharacterModal() {
  if (!characterModal) return;
  characterModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function openCharacterPage(character) {
  if (!character) return;
  selectedPageCharacter = character;
  activeView = "characters";
  setActiveNav("Characters");
  closeCharacterModal();
  setNavOpen(false);
  render();
}

function characterModalMarkup(character, page, partners) {
  const source = page.sourceNotes;
  const dhcNotes = source?.dhcSynergy?.raw?.join(" ") || character.dhcNotes || page.synergies?.find((note) => /dhc/i.test(note)) || "DHC notes pending community testing.";
  const winConditions = modalWinConditions(character, page);
  const verdict = modalVerdict(character);
  return `
    <header class="modal-hero-card">
      <div class="modal-character-art"></div>
      <div class="modal-hero-copy">
        <p class="eyebrow">Character Dossier</p>
        <h2>${character.name}</h2>
        <p>${character.roles.join(" / ") || "Flexible"} · ${primaryAssistType(page)}</p>
        <div class="tag-list">${visiblePageTags(page, 10).map((tag) => graphPill("tag", tag)).join("")}</div>
        <div class="modal-actions">
          <button class="text-button" data-modal-action="add" type="button">Add To Team</button>
          ${canEditDirectly() ? `<button class="text-button" data-modal-action="edit" type="button">Edit</button>` : ""}
        </div>
      </div>
    </header>

    ${modalTeamContextMarkup(character)}

    <section class="modal-section-grid">
      ${modalInfo("Role", character.roles.join(" / ") || "Flexible")}
      ${modalInfo("Archetypes", shortArchetype(character))}
      ${modalInfo("Gameplan", formattedNoteMarkup(cleanCharacterCopy(page.overview || character.archetype, character.name)))}
      ${modalInfo("What This Contributes", formattedNoteMarkup(pdfContributionSummary(source) || listSentence(character.strengths, "Team value notes pending.")))}
      ${modalInfo("Team Placement", formattedNoteMarkup(placementSummary(page)))}
      ${modalInfo("DHC Notes", dhcNoteMarkup(page, character, dhcNotes))}
      ${modalInfo("Win Conditions", formattedNoteMarkup(winConditions))}
      ${modalInfo("Questions", formattedNoteMarkup(listSentence(source?.teamBuildingQuestions?.beforeAddingAsk, "Ask whether the team needs damage, neutral, mix, support, or meter before locking this pick.")))}
      ${modalInfo("Why Pick", formattedNoteMarkup(listSentence(source?.whyPick || character.strengths?.slice(0, 3), "Pick when the team wants this profile.")))}
      ${modalInfo("Why Avoid", formattedNoteMarkup(listSentence(source?.whyAvoid || character.weaknesses?.slice(0, 3), "Avoid if the shell cannot cover the weak spots.")))}
      ${modalInfo("Final Verdict", formattedNoteMarkup(verdict))}
    </section>

    <section class="modal-partner-section">
      <div>
        <p class="eyebrow">Best Partners</p>
        <div class="modal-partner-row" data-partner-row="best"></div>
      </div>
      <div>
        <p class="eyebrow">Good Partners</p>
        <div class="modal-partner-row" data-partner-row="good"></div>
      </div>
      <div>
        <p class="eyebrow">Needs Care</p>
        <div class="modal-partner-row" data-partner-row="care"></div>
      </div>
    </section>
  `;
}

function modalTeamContextMarkup(character) {
  const picked = team.filter(Boolean);
  if (!picked.length) return "";
  const teammates = picked.filter((member) => member.id !== character.id).slice(0, 2);
  const grade = teamGrade(picked);
  return `
    <section class="modal-team-context">
      <div class="modal-context-label"><span>Team Read</span></div>
      <div class="modal-teammate-stack">
        <p class="eyebrow">Other Fighters</p>
        ${
          teammates.length
            ? teammates
                .map(
                  (teammate) => `
                    <button class="modal-teammate-card" data-modal-teammate="${teammate.id}" type="button" style="--fighter-color:${teammate.color || "var(--gold)"}">
                      <span class="modal-teammate-art" data-modal-teammate-art="${teammate.id}"></span>
                      <span>
                        <strong>${teammate.name}</strong>
                        <small>${teammate.roles.slice(0, 3).join(" / ") || "Flexible"}</small>
                      </span>
                    </button>
                  `
                )
                .join("")
            : `<p class="empty-state">Lock teammates to compare the shell.</p>`
        }
      </div>
      <div class="modal-rating-card">
        <div class="modal-rating-head">
          <div>
            <p class="eyebrow">Team Synergy</p>
            <strong>${grade.caption}</strong>
          </div>
          <b><span>${grade.label}</span></b>
        </div>
        <div class="modal-rating-meters">${modalMetricRows(picked)}</div>
      </div>
    </section>
  `;
}

function modalMetricRows(picked) {
  return Object.keys(metricMeta)
    .map((key) => {
      const average = picked.length ? picked.reduce((sum, character) => sum + (character.metrics[key] || 0), 0) / picked.length : 0;
      return `
        <div class="modal-meter-row">
          <span>${metricMeta[key].label}</span>
          <i><b style="width:${Math.min(average * 10, 100)}%;background:${metricMeta[key].color}"></b></i>
          <strong>${Math.round(average)}</strong>
        </div>
      `;
    })
    .join("");
}

function bindModalActions(character, partners) {
  modalContent.querySelector('[data-modal-action="add"]')?.addEventListener("click", () => {
    addToNextSlot(character);
    selectedCharacter = character;
    saveState();
    render();
  });
  modalContent.querySelector('[data-modal-action="edit"]')?.addEventListener("click", () => {
    closeCharacterModal();
    selectedPageCharacter = character;
    activeView = "admin";
    document.querySelectorAll(".main-nav a").forEach((item) => item.removeAttribute("aria-current"));
    document.querySelector('.main-nav a[href="#adminPanel"]')?.setAttribute("aria-current", "page");
    if (adminCharacterSelect) adminCharacterSelect.value = character.id;
    render();
  });
  renderModalPartnerRow(modalContent.querySelector('[data-partner-row="best"]'), partners.best);
  renderModalPartnerRow(modalContent.querySelector('[data-partner-row="good"]'), partners.good);
  renderModalPartnerRow(modalContent.querySelector('[data-partner-row="care"]'), partners.care);
  modalContent.querySelectorAll("[data-modal-teammate]").forEach((button) => {
    button.addEventListener("click", () => {
      const teammate = findCharacter(button.dataset.modalTeammate);
      if (teammate) openCharacterModal(teammate);
    });
  });
}

function renderModalPartnerRow(container, partners) {
  if (!container) return;
  container.replaceChildren();
  for (const partner of partners) {
    const card = document.createElement("button");
    card.className = "partner-card";
    card.type = "button";
    card.draggable = true;
    card.dataset.characterId = partner.id;
    card.style.setProperty("--fighter-color", partner.color || "var(--gold)");
    card.innerHTML = `<span class="partner-art"></span><span>${shortName(partner.name)}</span>`;
    paintArt(card.querySelector(".partner-art"), partner);
    card.addEventListener("click", () => openCharacterModal(partner));
    card.addEventListener("dragstart", (event) => {
      dragged = { type: "roster", characterId: partner.id };
      event.dataTransfer.setData("text/plain", partner.id);
      event.dataTransfer.effectAllowed = "copyMove";
    });
    container.append(card);
  }
}

function modalInfo(title, body) {
  return `
    <article class="modal-info-card">
      <h3>${title}</h3>
      ${body || "<p>Notes pending.</p>"}
    </article>
  `;
}

function formattedNoteMarkup(value) {
  const text = cleanNoteText(value);
  if (!text) return `<p>Notes pending.</p>`;
  const sections = structuredNoteSections(text);
  if (sections.length) {
    return `<div class="structured-note">${sections.map((section) => `<p><strong>${section.label}</strong><span>${section.text}</span></p>`).join("")}</div>`;
  }
  const paragraphs = sentenceChunks(text).slice(0, 4);
  return `<div class="note-paragraphs">${paragraphs.map((paragraph) => `<p>${emphasizeNoteLead(paragraph)}</p>`).join("")}</div>`;
}

function structuredFieldsMarkup(fields) {
  const rows = fields
    .map((field) => {
      const values = arrayFrom(field.values).map((item) => cleanNoteText(cleanCharacterCopy(item, field.characterName))).filter(Boolean);
      if (!values.length && !field.tags?.length) return "";
      if (field.type === "tags") {
        const tags = cleanTagList(field.tags || values);
        if (!tags.length) return "";
        return `<p><strong>${field.label}</strong><span class="tag-list">${tags.map((tag) => graphPill("tag", tag)).join("")}</span></p>`;
      }
      const body = values.length > 1
        ? `<ul>${values.map((item) => `<li>${item}</li>`).join("")}</ul>`
        : `<span>${values[0]}</span>`;
      return `<p><strong>${field.label}</strong>${body}</p>`;
    })
    .filter(Boolean)
    .join("");
  return rows ? `<div class="structured-note">${rows}</div>` : `<p>Notes pending.</p>`;
}

function dhcNoteMarkup(page, character, fallback = "") {
  const dhc = page?.sourceNotes?.dhcSynergy;
  if (dhc) {
    return structuredFieldsMarkup([
      { label: "Who likes DHCing into this character", values: dhc.charactersThatLoveDHCingInto, characterName: character.name },
      { label: "Why", values: dhc.whyInto, characterName: character.name },
      { label: "Who this character likes DHCing into", values: dhc.charactersThisCharacterLovesDHCingInto, characterName: character.name },
      { label: "Why", values: dhcWhyOut(dhc), characterName: character.name },
      { label: "Special DHC interactions", values: dhc.specialInteractions, characterName: character.name },
    ]);
  }
  return formattedNoteMarkup(cleanCharacterSynergyNote(fallback, character));
}

function dhcWhyOut(dhc) {
  if (dhc.whyOut?.length) return dhc.whyOut;
  const raw = arrayFrom(dhc.raw);
  const secondCharacterHeading = raw.findIndex((line, index) => index > 0 && /loves dhcing into/i.test(line));
  if (secondCharacterHeading === -1) return [];
  const whyIndex = raw.findIndex((line, index) => index > secondCharacterHeading && /^why$/i.test(cleanNoteText(line)));
  if (whyIndex === -1) return [];
  const nextHeading = raw.findIndex((line, index) => index > whyIndex && /^(characters|special interactions?|best|provides)$/i.test(cleanNoteText(line)));
  return raw.slice(whyIndex + 1, nextHeading === -1 ? raw.length : nextHeading).filter((line) => !/^why$/i.test(cleanNoteText(line)));
}

function structuredNoteSections(value) {
  const text = cleanNoteText(value);
  if (!text) return [];
  const labels = [
    "Gameplan",
    "Identity",
    "Archetype",
    "Damage",
    "Neutral",
    "Mix",
    "Support",
    "Resource Economy",
    "Primary",
    "Secondary",
    "Late Game",
    "Who DHCs Into This",
    "Who This Pick DHCs Into",
    "Why It Works",
    "DHC",
    "Why",
    "Verdict",
    "Question",
  ];
  const pattern = new RegExp(`(?:^|[.;]\\s+|\\n)(${labels.map(escapeRegExp).join("|")})\\s*:\\s*`, "gi");
  const matches = [...text.matchAll(pattern)];
  if (!matches.length) return [];
  const sections = [];
  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];
    const label = titleCase(match[1]);
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? text.length;
    const chunk = text.slice(start, end).replace(/^[:\-.\s]+/, "").replace(/[.;]\s*$/, "").trim();
    if (chunk) sections.push({ label, text: chunk });
  }
  return sections;
}

function cleanNoteText(value) {
  return repairImportedNoteBoundaries(String(value || ""))
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;!?])/g, "$1")
    .trim();
}

function repairImportedNoteBoundaries(value) {
  const labels = [
    "Provides",
    "Best For",
    "Why",
    "Tags",
    "DHC",
    "Verdict",
    "Question",
    "Questions",
    "Control",
    "Safety",
    "Cashout",
    "Damage",
    "Neutral",
    "Mix",
    "Support",
    "Point",
    "Mid",
    "Anchor",
    "Primary",
    "Secondary",
    "Late Game",
    "Main",
  ];
  const labelPattern = labels.map(escapeRegExp).join("|");
  return String(value || "")
    .replace(new RegExp(`([a-z0-9)])(${labelPattern})(?=(This pick|[A-Z][a-z]))`, "g"), "$1. $2")
    .replace(new RegExp(`\\b(${labelPattern})(This pick|[A-Z][a-z])`, "g"), "$1: $2")
    .replace(/(This pick)([A-Z][a-z]{2,})/g, "$1. $2")
    .replace(/([.;])\s*([A-Z][A-Za-z /]+):/g, "$1 $2:");
}

function sentenceChunks(text) {
  const sentences = String(text || "")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  return sentences.length ? sentences : [text].filter(Boolean);
}

function emphasizeNoteLead(text) {
  const match = String(text || "").match(/^([A-Z][A-Za-z0-9 /+&()-]{2,34}):\s+(.+)$/);
  if (!match) return text;
  return `<strong>${match[1]}</strong><span>${match[2]}</span>`;
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cleanCharacterCopy(text, name) {
  if (!text) return "";
  const escaped = String(name || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return String(text).replace(new RegExp(`\\b${escaped}\\b`, "gi"), "This pick").trim();
}

function listSentence(items, fallback) {
  const values = (items || []).filter(Boolean).slice(0, 3);
  return values.length ? values.join(" ") : fallback;
}

function placementSummary(page) {
  if (page.sourceNotes?.teamPlacement) {
    const placement = page.sourceNotes.teamPlacement;
    return [
      placement.preferredPosition?.length ? `Preferred: ${placement.preferredPosition.join(" / ")}.` : "",
      placement.explanation?.join(" "),
      placement.point?.length ? `Point: ${placement.point.join(" ")}` : "",
      placement.mid?.length ? `Mid: ${placement.mid.join(" ")}` : "",
      placement.anchor?.length ? `Anchor: ${placement.anchor.join(" ")}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
  const positions = page.positions || {};
  return ["point", "mid", "anchor"]
    .map((slot) => `${slot.toUpperCase()}: ${positions[slot] || "testing pending"}`)
    .join(" ");
}

function pdfContributionSummary(source) {
  if (!source?.contributions) return "";
  const parts = [];
  for (const key of ["damage", "neutral", "mix", "support", "resourceEconomy"]) {
    const values = source.contributions[key] || [];
    if (values.length) parts.push(`${labelFromCamel(key)}: ${values.slice(0, 2).join(" ")}`);
  }
  return parts.join(" ");
}

function modalWinConditions(character, page) {
  const sourceWins = page.sourceNotes?.winConditions;
  if (sourceWins) {
    const values = [
      ...(sourceWins.primary || []).map((item) => `Primary: ${item}`),
      ...(sourceWins.secondary || []).map((item) => `Secondary: ${item}`),
      ...(sourceWins.lateGame || []).map((item) => `Late game: ${item}`),
    ];
    if (values.length) return values.join(" ");
  }
  const tags = allPageTags(page).map(tagLabel).join(" ").toLowerCase();
  if (tags.includes("mix")) return "Create a block situation, spend assist coverage, and force layered offense.";
  if (tags.includes("zoner") || tags.includes("screen control")) return "Control space until the opponent takes a bad route in.";
  if (tags.includes("grappler") || tags.includes("command grab")) return "Make blocking uncomfortable, then convert hesitation into big reward.";
  if ((character.metrics?.damage || 0) >= 9) return "Land one clean starter and turn resources into a major momentum swing.";
  return "Play toward the strongest team stat and use partners to patch the lowest one.";
}

function modalVerdict(character) {
  const source = pdfCharacterRecord(character.id);
  if (source?.finalVerdict?.length) return source.finalVerdict.join(" ");
  const best = strongestMetric([character]);
  const weak = weakestMetric([character]);
  return `Pick for ${metricMeta[best].label.toLowerCase()} value. Build around ${metricMeta[weak].label.toLowerCase()} coverage.`;
}

function labelFromCamel(value) {
  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (letter) => letter.toUpperCase());
}

function renderTeamSummary() {
  const picked = team.filter(Boolean);
  teamTitle.textContent = picked.length ? `${picked.length}/3 fighters locked` : "Selected shell";
  recommendedOrder.innerHTML = recommendedOrderText();

  if (hasTeam(["dbs-broly", "android-18", "frieza"])) {
    teamPlan.innerHTML = `
      ${topicLine("Control", "Frieza slows the screen down and builds toward Golden.")}
      ${topicLine("Safety", "Android 18 protects risky movement and keeps offense stable.")}
      ${topicLine("Cashout", "DBS Broly turns openings into damage, meter, and momentum.")}
    `;
    return;
  }

  if (!picked.length) {
    teamPlan.innerHTML = topicLine("Start", "Pick a fighter first. Partner recommendations update immediately.");
    return;
  }

  const strongest = strongestMetric(picked);
  const missing = weakestMetric(picked);
  teamPlan.innerHTML = `
    ${topicLine("Identity", `This shell leans ${metricMeta[strongest].label.toLowerCase()}.`)}
    ${topicLine("Needs", `Look for help in ${metricMeta[missing].label.toLowerCase()} before it feels complete.`)}
  `;
}

function renderTeamShape() {
  const picked = team.filter(Boolean);
  teamShape.replaceChildren();
  const grade = teamGrade(picked);
  const badge = document.createElement("div");
  badge.className = "synergy-score";
  badge.innerHTML = `
    <div>
      <strong>Team Synergy</strong>
      <span>${grade.caption}</span>
    </div>
    <b><span>${grade.label}</span></b>
  `;
  teamShape.append(badge);

  for (const key of Object.keys(metricMeta)) {
    const average = picked.length ? picked.reduce((sum, character) => sum + (character.metrics[key] || 0), 0) / picked.length : 0;
    const item = document.createElement("div");
    item.className = "meter-row";
    item.innerHTML = `
      <span>${metricMeta[key].label}</span>
      <div class="meter-track"><i style="width:${Math.min(average * 10, 100)}%;background:${metricMeta[key].color}"></i></div>
      <b>${Math.round(average)}</b>
      <p><strong>${metricLeadCharacter(key, picked)}</strong>${metricExplanation(key, average, picked)}</p>
    `;
    teamShape.append(item);
  }
}

function renderSynergy() {
  synergyMap.replaceChildren();
  const picked = team.filter(Boolean);

  if (!picked.length) {
    synergyMap.append(textPanel("Start", "Click a portrait, then drag recommended partners into the empty slots."));
    return;
  }

  if (hasTeam(["dbs-broly", "android-18", "frieza"])) {
    synergyMap.append(
      textPanel("Control", "Frieza forces hesitation with long-range tools and gives the team time to build resources."),
      textPanel("Safety", "Android 18 barrier and 17 calls make aggressive movement harder to punish."),
      textPanel("Cashout", "DBS Broly gives the shell its scary reward once the team creates an opening.")
    );
    return;
  }

  const strongest = strongestMetric(picked);
  const weakest = weakestMetric(picked);
  synergyMap.append(
    textPanel(
      "Team Identity",
      `This shell leans on ${metricMeta[strongest].label.toLowerCase()} while checking whether ${metricMeta[weakest].label.toLowerCase()} needs help.`
    )
  );
  for (const character of picked) {
    synergyMap.append(textPanel(character.name, teamContributionLine(character, picked)));
  }
}

function teamContributionLine(character, picked) {
  const metric = strongestCharacterMetric(character);
  const wants = (character.wants || []).slice(0, 2).join(", ");
  const strength =
    (character.strengths || []).find((item) => !/^\s*(above average|excellent|strong|solid)?\s*damage\b/i.test(item)) ||
    character.strengths?.[0] ||
    character.archetype;
  const position = team.indexOf(character) === 0 ? "opens the plan" : team.indexOf(character) === 1 ? "stabilizes the shell" : "anchors or cashes out";
  return `${metricMeta[metric].label}: ${shortenText(strength, 92)} ${position}${wants ? `; wants ${wants}.` : "."}`;
}

function strongestCharacterMetric(character) {
  return Object.entries(character.metrics || { damage: 0, neutral: 0, mix: 0, support: 0 }).sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral";
}

function shortenText(value, limit = 100) {
  const text = cleanNoteText(value);
  if (text.length <= limit) return text;
  const firstSentence = sentenceChunks(text)[0] || text;
  if (firstSentence.length <= limit) return firstSentence;
  return `${firstSentence.slice(0, limit - 1).replace(/\s+\S*$/, "")}.`;
}

function renderView() {
  if (!adminPanelEnabled && activeView === "admin") activeView = "team";
  const showCharacters = activeView === "characters";
  const showPlaystyles = activeView === "playstyles";
  const showKnowledge = activeView === "knowledge";
  const showGuides = activeView === "training";
  const showVideos = activeView === "videos";
  const showAdmin = adminPanelEnabled && activeView === "admin";
  teamBuilderViews.forEach((view) => {
    view.hidden = showCharacters || showPlaystyles || showKnowledge || showGuides || showVideos || showAdmin;
  });
  charactersView.hidden = !showCharacters;
  playstylesView.hidden = !showPlaystyles;
  knowledgeView.hidden = !showKnowledge;
  guidesView.hidden = !showGuides;
  videosView.hidden = !showVideos;
  if (adminView) adminView.hidden = !showAdmin;
}

function setActiveNav(label) {
  document.querySelectorAll(".main-nav a").forEach((item) => {
    const isMatch = item.textContent.trim().toLowerCase() === String(label || "").toLowerCase();
    if (isMatch) item.setAttribute("aria-current", "page");
    else item.removeAttribute("aria-current");
  });
}

function saveState() {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        team: team.map((character) => character?.id || null),
        selectedCharacterId: selectedCharacter?.id || null,
      })
    );
  } catch {
    // Local storage can be unavailable in strict browser modes.
  }
}

function restoreState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (Array.isArray(saved.team)) {
      team = saved.team.slice(0, 3).map((id) => (id ? findCharacter(id) || null : null));
      while (team.length < 3) team.push(null);
    }
    selectedCharacter = saved.selectedCharacterId ? findCharacter(saved.selectedCharacterId) : team.find(Boolean) || null;
  } catch {
    team = [null, null, null];
    selectedCharacter = null;
  }
}

function renderCharacterDatabase() {
  if (!characters.length) return;
  if (!selectedPageCharacter) selectedPageCharacter = characters[0];
  renderCharacterList();
  renderCharacterPage();
}

function renderCharacterList() {
  const q = characterSearch.value.trim().toLowerCase();
  const tagType = tagTypeFilter.value;
  const tagId = tagFilter.value;
  const blockstunTarget = blockstunQuery(q);
  characterList.replaceChildren();

  const visible = characters.filter((character) => {
    const page = characterPageData(character);
    const tagText = allPageTags(page)
      .map(tagLabel)
      .join(" ")
      .toLowerCase();
    const text = `${character.name} ${character.archetype} ${character.roles.join(" ")} ${character.wants.join(" ")} ${tagText}`.toLowerCase();
    const matchesText = !q || text.includes(q) || (blockstunTarget !== null && hasAssistBlockstun(page, blockstunTarget));
    const matchesTag = tagId === "all" || tagSetIncludes(tagsForType(page, tagType, character), tagId);
    return matchesText && matchesTag;
  });

  for (const character of visible) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "character-list-card";
    card.classList.toggle("is-selected", selectedPageCharacter?.id === character.id);
    card.style.setProperty("--fighter-color", character.color || "var(--gold)");
    card.innerHTML = `
      <span class="character-list-art"></span>
      <span>
        <strong>${character.name}</strong>
        <p>${shortArchetype(character)}</p>
      </span>
    `;
    paintArt(card.querySelector(".character-list-art"), character);
    card.addEventListener("click", () => {
      selectedPageCharacter = character;
      renderCharacterDatabase();
    });
    characterList.append(card);
  }

  if (!visible.length) {
    characterList.innerHTML = `<p class="empty-state">No characters match that search yet.</p>`;
  }
}

async function renderCharacterPage() {
  const character = selectedPageCharacter || characters[0];
  const page = characterPageData(character);
  document.querySelector(".character-page-hero").style.setProperty("--fighter-color", character.color || "var(--gold)");
  characterPageName.textContent = character.name;
  characterPageOverview.textContent = page.overview || character.archetype;
  characterPageTags.innerHTML = visiblePageTags(page)
    .map((tag) => graphPill("tag", tag))
    .join("");
  characterEditButton.hidden = !canEditDirectly();
  characterEditButton.onclick = () => {
    selectedPageCharacter = character;
    activeView = "admin";
    document.querySelectorAll(".main-nav a").forEach((item) => item.removeAttribute("aria-current"));
    document.querySelector('.main-nav a[href="#adminPanel"]')?.setAttribute("aria-current", "page");
    if (adminCharacterSelect) adminCharacterSelect.value = character.id;
    render();
  };
  paintArt(characterPageArt, character);

  renderList(characterStrengths, character.strengths);
  renderList(characterWeaknesses, character.weaknesses);
  renderAssists(page.assists || {});
  renderPositions(page.positions || {});
  renderCharacterSynergyNotes(characterSynergies, page.synergies || [], character, page);
  renderNotes(characterCombos, page.combos || []);
  renderNotes(characterMatchups, page.matchups || []);
  renderNotes(characterCommunity, page.community || []);
  renderFrameTable(await frameRowsFor(character));
}

function renderList(container, items) {
  container.innerHTML = (items?.length ? items : ["Placeholder ready for deeper notes."])
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function renderNotes(container, items) {
  if (!container) return;
  container.innerHTML = (items?.length ? items : ["Placeholder ready for future data."])
    .map((item) => `<p>${item}</p>`)
    .join("");
}

function renderCharacterSynergyNotes(container, items, character, page) {
  if (!container) return;
  const nonDhcItems = (items || []).filter((item) => !/^dhc\s*:/i.test(cleanNoteText(item)));
  const renderedDhc = page?.sourceNotes?.dhcSynergy || character?.dhcNotes ? `<article class="formatted-note-card">${dhcNoteMarkup(page, character, character?.dhcNotes || "")}</article>` : "";
  const values = nonDhcItems.length ? nonDhcItems : renderedDhc ? [] : ["Synergy notes pending community testing."];
  container.innerHTML = renderedDhc + values
    .map((item) => {
      const cleaned = cleanCharacterSynergyNote(item, character);
      return `<article class="formatted-note-card">${formattedNoteMarkup(cleaned)}</article>`;
    })
    .join("");
}

function cleanCharacterSynergyNote(value, character) {
  let text = cleanNoteText(value);
  if (!text) return "";
  const name = character?.name || "";
  if (name) {
    text = text
      .replace(new RegExp(`Characters That Love DHCing Into\\s+${escapeRegExp(name)}`, "gi"), "Who DHCs Into This:")
      .replace(new RegExp(`Characters\\s+${escapeRegExp(name)}\\s+Loves DHCing Into`, "gi"), "Who This Pick DHCs Into:");
  }
  text = text
    .replace(/^DHC:\s*/i, "")
    .replace(/\bWhy Allows\b/gi, "Why It Works:")
    .replace(/\bWhy\s+(?=[A-Z])/g, "Why: ")
    .replace(/\s+(Who DHCs Into This:|Who This Pick DHCs Into:|Why It Works:|Why:)\s*/g, ". $1 ");
  return cleanNoteText(cleanCharacterCopy(text, name).replace(/\.\s*\./g, "."));
}

function renderAssists(assists) {
  characterAssists.innerHTML = ["A", "B", "C"]
    .map((slot) => {
      const assist = assists[slot] || {};
      const values = [assist.startup && `${assist.startup}f startup`, assist.blockstun && `${assist.blockstun}+ blockstun`]
        .filter(Boolean)
        .join(" / ");
      return `
        <div class="assist-card">
          <strong>${slot} Assist</strong>
          ${assistMarkup(assist)}
          <p class="assist-frame-line">${values || "Frame values pending importer/admin data."}</p>
        </div>
      `;
    })
    .join("");
}

function assistMarkup(assist) {
  const provides = arrayFrom(assist.provides).length ? assist.provides : assist.summary && !/^assist details pending/i.test(assist.summary) ? [assist.summary] : [];
  const tags = cleanTagList(assist.tags || []);
  return structuredFieldsMarkup([
    { label: "Provides", values: provides },
    { label: "Best For", values: [...arrayFrom(assist.bestFor), ...arrayFrom(assist.bestPartners)] },
    { label: "Why", values: [...arrayFrom(assist.why), ...arrayFrom(assist.drawbacks).map((item) => `Drawback: ${item}`)] },
    { label: "Tags", values: tags, tags, type: "tags" },
  ]);
}

function renderPositions(positions) {
  characterPositions.innerHTML = ["point", "mid", "anchor"]
    .map((position) => {
      return `
        <div class="position-card">
          <strong>${position}</strong>
          <p>${positions[position] || "Position notes pending."}</p>
        </div>
      `;
    })
    .join("");
}

function renderFrameTable(rows) {
  const q = frameSearch.value.trim().toLowerCase();
  const groupFilter = frameGroupFilter.value;
  const visible = rows
    .filter((row) => groupFilter === "all" || row.categoryKey === groupFilter)
    .filter((row) => !q || `${row.move} ${row.description} ${row.notes} ${row.invulnerability}`.toLowerCase().includes(q))
    .sort((a, b) => compareFrameRows(a, b));

  if (!visible.length) {
    frameTableBody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">No frame data imported yet. Run npm run import-dustloop locally, rebuild, and redeploy to Netlify.</td>
      </tr>
    `;
    return;
  }

  let lastCategory = "";
  frameTableBody.innerHTML = visible
    .map((row) => {
      const groupHeader =
        frameSort.key === "category" && row.category !== lastCategory
          ? `<tr class="frame-group-row"><td colspan="8">${row.category}</td></tr>`
          : "";
      lastCategory = row.category;
      return `
        ${groupHeader}
        <tr>
          <td data-label="Move">
            <strong>${row.move || "-"}</strong>
            <span>${row.description}</span>
          </td>
          <td data-label="Damage">${row.damage ?? "-"}</td>
          <td data-label="Startup">${row.startup ?? "-"}</td>
          <td data-label="Block">${row.blockAdvantage ?? "-"}</td>
          <td data-label="Hit">${row.hitAdvantage ?? "-"}</td>
          <td data-label="Active">${row.active ?? "-"}</td>
          <td data-label="Recovery">${row.recovery ?? "-"}</td>
          <td data-label="Invuln / Notes">${[row.invulnerability, row.notes].filter(Boolean).join(" ") || "-"}</td>
        </tr>
      `;
    })
    .join("");
}

function renderSynergyDatabase() {
  if (!assistResults || !characterTagResults || !relationshipResults) return;

  const query = synergySearch.value.trim().toLowerCase();
  const characterTag = characterTagFilter.value;
  const assistTag = assistTagFilter.value;
  const synergyTag = synergyTagFilter.value;
  const typedBlockstun = blockstunQuery(query);
  const minimumBlockstun = Math.max(Number(minBlockstunFilter.value || 0), typedBlockstun || 0);

  const characterMatches = characters.filter((character) => {
    const page = characterPageData(character);
    const tags = filterablePageTags(character, page);
    const text = `${character.name} ${character.archetype} ${tags.map(tagLabel).join(" ")}`.toLowerCase();
    return (
      (characterTag === "all" || tagSetIncludes(tags, characterTag)) &&
      (synergyTag === "all" || tagSetIncludes(tags, synergyTag)) &&
      (!query || text.includes(query))
    );
  });

  const assistMatches = (publicAssistData.assists || []).filter((assist) => {
    const text = `${assist.character} ${assist.assist} ${assist.notes} ${(assist.tags || []).join(" ")}`.toLowerCase();
    return (
      (assistTag === "all" || tagSetIncludes(assist.tags || [], assistTag)) &&
      (synergyTag === "all" || tagSetIncludes(assist.tags || [], synergyTag)) &&
      Number(assist.blockstun || 0) >= minimumBlockstun &&
      (!query || text.includes(query))
    );
  });

  const relationshipMatches = (publicSynergyData.relationships || []).filter((relationship) => {
    const text = `${relationship.characterA} ${relationship.characterB} ${relationship.notes} ${(relationship.tags || []).join(" ")}`.toLowerCase();
    return (
      (synergyTag === "all" || tagSetIncludes(relationshipFilterTags(relationship), synergyTag)) &&
      (!query || text.includes(query))
    );
  });

  assistResults.innerHTML = assistMatches.length
    ? assistMatches.map(assistResultCard).join("")
    : `<p class="empty-state">No assist data matches yet. Add records in public/data/dbfz/assist-data.json.</p>`;

  characterTagResults.innerHTML = characterMatches.length
    ? characterMatches.slice(0, 30).map(characterResultCard).join("")
    : `<p class="empty-state">No character tag matches yet.</p>`;

  relationshipResults.innerHTML = relationshipMatches.length
    ? relationshipMatches.map(relationshipResultCard).join("")
    : `<p class="empty-state">No relationship data matches yet. Add pair notes in public/data/dbfz/synergies.json.</p>`;

  characterTagResults.querySelectorAll("[data-character-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const character = findCharacter(card.dataset.characterId);
      if (character) openCharacterPage(character);
    });
  });
}

function rebuildKnowledgeGraph() {
  const nodes = new Map();
  const edges = [];
  const addNode = (type, id, data = {}) => {
    if (!id) return null;
    const nodeId = `${type}:${normalizeGraphId(id)}`;
    const existing = nodes.get(nodeId) || { id: nodeId, type, key: normalizeGraphId(id), label: data.label || String(id), summary: "", tags: [] };
    nodes.set(nodeId, {
      ...existing,
      ...data,
      tags: [...new Set([...(existing.tags || []), ...(data.tags || [])])],
    });
    return nodeId;
  };
  const addEdge = (from, to, label, notes = "") => {
    if (!from || !to || from === to) return;
    const key = `${from}->${to}:${label}`;
    if (edges.some((edge) => edge.key === key)) return;
    edges.push({ key, from, to, label, notes });
  };

  const tagCatalog = Object.values(knowledgeDB.tagCatalog || {}).flat();
  for (const tag of tagCatalog) {
    addNode("tag", tag.id, { label: tag.label || tag.id, summary: graphTagSummary(tag.label || tag.id) });
  }

  for (const character of characters) {
    const page = characterPageData(character);
    const characterNode = addNode("character", character.id, {
      label: character.name,
      summary: page.overview || character.archetype || "Character profile.",
      tags: allPageTags(page),
      entityId: character.id,
    });
    for (const tag of allPageTags(page)) {
      const tagNode = addNode("tag", tag, { label: tagLabel(tag), summary: graphTagSummary(tag) });
      addEdge(characterNode, tagNode, "has tag", graphTagEvidence(character, tag));
    }
    for (const role of character.roles || []) {
      const archetypeNode = addNode("archetype", role, { label: role, summary: `${role} is a team placement or archetype identity.` });
      addEdge(characterNode, archetypeNode, "plays as", `${role} describes where ${character.name} tends to create value in a team.`);
    }
    for (const partnerId of [...(character.bestPartners || []), ...(character.goodPartners || []), ...(character.carePartners || [])]) {
      const partner = findCharacter(partnerId);
      if (!partner) continue;
      addEdge(characterNode, addNode("character", partner.id, { label: partner.name, summary: partner.archetype, entityId: partner.id }), "works with", graphPartnerEvidence(character, partner));
    }
  }

  for (const assist of publicAssistData.assists || []) {
    const character = findCharacterByName(assist.character);
    const assistId = `${character?.id || assist.character}-${assist.assist || "assist"}`;
    const assistNode = addNode("assist", assistId, {
      label: `${assist.character} ${assist.assist || ""}`.trim(),
      summary: assist.notes || `${assist.character} assist data.`,
      tags: assist.tags || [],
    });
    if (character) addEdge(assistNode, `character:${character.id}`, "belongs to", `${assist.assist || "Assist"} is attached to ${character.name}.`);
    for (const tag of assist.tags || []) {
      const tagNode = addNode("tag", tag, { label: tagLabel(tag), summary: graphTagSummary(tag) });
      addEdge(assistNode, tagNode, "provides", `${assist.character} ${assist.assist || ""} is tagged as ${tagLabel(tag)}.`);
    }
  }

  for (const style of publicPlaystyleData.playstyles || []) {
    const styleNode = addNode("playstyle", style.id, { label: style.name, summary: style.summary, tags: style.tags || [] });
    for (const tag of style.tags || []) {
      addEdge(styleNode, addNode("tag", tag, { label: tagLabel(tag), summary: graphTagSummary(tag) }), "uses", `${style.name} teams care about ${tagLabel(tag)}.`);
    }
    for (const characterId of style.recommendedCharacters || []) {
      const character = findCharacter(characterId);
      if (character) addEdge(styleNode, `character:${character.id}`, "recommends", `${character.name} is recommended for ${style.name}.`);
    }
    for (const shell of style.recommendedShells || []) {
      const shellNode = addNode("shell", shell, { label: shell, summary: `Shell idea for ${style.name}.`, tags: style.tags || [] });
      addEdge(styleNode, shellNode, "suggests shell", shell);
    }
    for (const teamIds of style.exampleTeams || []) {
      const teamCharacters = teamIds.map(findCharacter).filter(Boolean);
      const teamLabel = teamCharacters.map((character) => character.name).join(" / ");
      const teamNode = addNode("team", teamIds.join("+"), { label: teamLabel, summary: `Example ${style.name} team.`, tags: style.tags || [] });
      addEdge(styleNode, teamNode, "example team", `${teamLabel} is listed as an example ${style.name} team.`);
      for (const character of teamCharacters) addEdge(teamNode, `character:${character.id}`, "includes", `${teamLabel} includes ${character.name}.`);
    }
  }

  for (const entry of effectiveMovieRoomEntries()) {
    const type = entry.scope === "team" ? "team" : entry.scope === "shell" ? "shell" : "character";
    const key = entry.scope === "team" ? (entry.teamIds?.[0] || entry.characterIds.join("+")) : entry.scope === "shell" ? (entry.shellIds?.[0] || entry.characterIds.join("+")) : entry.characterIds?.[0];
    const node = type === "character" && key ? `character:${key}` : addNode(type, key || entry.id, { label: entry.title, summary: entry.summary, tags: entry.tags || [] });
    for (const characterId of entry.characterIds || []) {
      const character = findCharacter(characterId);
      if (character) addEdge(node, `character:${character.id}`, "studies", `${entry.title} has Movie Room material for ${character.name}.`);
    }
    for (const tag of entry.tags || []) {
      addEdge(node, addNode("tag", tag, { label: tagLabel(tag), summary: graphTagSummary(tag) }), "tagged", `${entry.title} is tagged ${tagLabel(tag)}.`);
    }
  }

  for (const link of publicKnowledgeGraph.archetypeLinks || []) {
    const from = addNode("archetype", link.from, { label: link.from, summary: link.notes || "" });
    const to = addNode("archetype", link.to, { label: link.to, summary: link.notes || "" });
    addEdge(from, to, link.label || "connects to", link.notes || "");
  }

  graphDB = { nodes, edges };
  if (!selectedGraphNodeId || !nodes.has(selectedGraphNodeId)) {
    selectedGraphNodeId = nodes.get("character:frieza") ? "character:frieza" : nodes.keys().next().value || null;
  }
}

function renderKnowledgeGraph() {
  if (!knowledgeView || !graphNodeList) return;
  if (!graphDB.nodes.size) rebuildKnowledgeGraph();
  const query = (graphSearch?.value || "").trim().toLowerCase();
  const type = graphTypeFilter?.value || "all";
  const nodes = [...graphDB.nodes.values()].filter((node) => {
    const text = `${node.label} ${node.summary} ${(node.tags || []).map(tagLabel).join(" ")}`.toLowerCase();
    return (type === "all" || node.type === type) && (!query || text.includes(query));
  });
  graphNodeList.innerHTML = nodes.length
    ? nodes
        .slice(0, 80)
        .map(
          (node) => `
            <button class="graph-node-button ${node.id === selectedGraphNodeId ? "is-selected" : ""}" type="button" data-graph-open="${node.id}">
              <span>${graphTypeLabel(node.type)}</span>
              <strong>${node.label}</strong>
            </button>
          `
        )
        .join("")
    : `<p class="empty-state">No graph nodes match that search.</p>`;

  graphNodeList.querySelectorAll("[data-graph-open]").forEach((button) => {
    button.addEventListener("click", () => openGraphNode(button.dataset.graphOpen));
  });

  const node = graphDB.nodes.get(selectedGraphNodeId) || nodes[0] || graphDB.nodes.values().next().value;
  if (!node) return;
  selectedGraphNodeId = node.id;
  const connections = graphConnectionsFor(node.id);
  graphTitle.textContent = node.label;
  graphSummary.textContent = graphNodeExploreSummary(node);
  graphFocusType.textContent = graphTypeLabel(node.type);
  graphFocusTitle.textContent = node.label;
  graphFocusSummary.textContent = node.summary || graphNodeFallbackSummary(node);
  graphFocusTags.innerHTML = (node.tags || []).slice(0, 12).map((tag) => graphPill("tag", tag, tagLabel(tag))).join("");
  graphConnections.innerHTML = connections.length
    ? connections
        .map(({ edge, target }) => {
          return `
            <button class="graph-connection-card" type="button" data-graph-open="${target.id}">
              <span>${graphTypeLabel(target.type)} / ${edge.label}</span>
              <strong>${target.label}</strong>
              <p>${graphConnectionCopy(node, edge, target)}</p>
            </button>
          `;
        })
        .join("")
    : `<p class="empty-state">No mapped links yet. Add tags, partner notes, Movie Room entries, or shell/team records to connect this node.</p>`;
  graphEvidence.innerHTML = connections.length
    ? connections.slice(0, 8).map(({ edge, target }) => `<p><strong>${edge.label}:</strong> ${graphConnectionCopy(node, edge, target)}</p>`).join("")
    : `<p>No evidence snippets yet. This node needs explicit tags, partner notes, or study links.</p>`;
  graphConnections.querySelectorAll("[data-graph-open]").forEach((button) => {
    button.addEventListener("click", () => openGraphNode(button.dataset.graphOpen));
  });
}

function graphConnectionsFor(nodeId) {
  return graphDB.edges
    .filter((edge) => edge.from === nodeId || edge.to === nodeId)
    .map((edge) => ({ edge, target: graphDB.nodes.get(edge.from === nodeId ? edge.to : edge.from) }))
    .filter((entry) => entry.target)
    .sort((a, b) => graphTypeLabel(a.target.type).localeCompare(graphTypeLabel(b.target.type)) || a.target.label.localeCompare(b.target.label));
}

function graphTagSummary(tag) {
  const label = tagLabel(tag);
  const lower = label.toLowerCase();
  if (["point", "mid", "anchor"].includes(lower)) return `${label} is a team-order concept that affects meter timing, assist value, and late-game responsibility.`;
  if (lower.includes("assist")) return `${label} describes what kind of support a teammate can provide or request.`;
  if (lower.includes("neutral")) return `${label} points toward space control, approach safety, and stable interaction wins.`;
  if (lower.includes("mix") || lower.includes("setplay") || lower.includes("oki")) return `${label} points toward pressure structure, knockdown reward, and forced guesses.`;
  if (lower.includes("meter") || lower.includes("battery")) return `${label} connects resource building to cashout characters and team order.`;
  if (lower.includes("damage") || lower.includes("finisher")) return `${label} points toward conversion reward and spending resources efficiently.`;
  if (lower.includes("beginner") || lower.includes("easy")) return `${label} marks teams or characters with a clearer gameplan and fewer execution demands.`;
  return `${label} is a filterable team-building concept used to connect characters, assists, shells, and playstyles.`;
}

function graphTagEvidence(character, tag) {
  const label = tagLabel(tag);
  const lower = label.toLowerCase();
  if (["point", "mid", "anchor"].includes(lower)) return `${character.name} can be explored as a ${label} slot, which affects resource timing, assist value, and team order.`;
  if (lower.includes("assist")) return `${label} describes support value this pick can give or wants from partners.`;
  if (lower.includes("neutral")) return `${label} points toward space control, approach coverage, or stable interaction wins.`;
  if (lower.includes("mix") || lower.includes("oki")) return `${label} points toward pressure structure and knockdown reward.`;
  if (lower.includes("battery") || lower.includes("meter")) return `${label} connects this pick to resource planning and cashout partners.`;
  return `${label} is one of the searchable identities attached to ${character.name}.`;
}

function graphPartnerEvidence(character, partner) {
  const wants = (character.wants || []).slice(0, 2).join(" and ");
  const partnerValue = partner.strengths?.[0] || partner.archetype || "team coverage";
  return wants ? `${partner.name} is relevant because ${character.name} often wants ${wants}. ${partnerValue}` : `${partner.name} adds partner coverage for ${character.name}. ${partnerValue}`;
}

function openGraphNode(nodeId, switchView = true) {
  if (!nodeId) return;
  if (!graphDB.nodes.size) rebuildKnowledgeGraph();
  selectedGraphNodeId = nodeId.includes(":") ? nodeId : graphNodeIdFromParts("tag", nodeId);
  const node = graphDB.nodes.get(selectedGraphNodeId);
  if (node?.type === "character") selectedPageCharacter = findCharacter(node.entityId || node.key) || selectedPageCharacter;
  if (node?.type === "playstyle") selectedPlaystyleId = node.key;
  if (switchView) {
    activeView = "knowledge";
    setActiveNav("Knowledge Map");
    closeCharacterModal();
    setNavOpen(false);
  }
  render();
}

function graphNodeIdFromParts(type, id) {
  return `${type}:${normalizeGraphId(id)}`;
}

function normalizeGraphId(id) {
  return String(id || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function graphTypeLabel(type) {
  return {
    character: "Character",
    tag: "Tag",
    archetype: "Archetype",
    assist: "Assist",
    playstyle: "Playstyle",
    shell: "Shell",
    team: "Team",
  }[type] || "Node";
}

function graphNodeExploreSummary(node) {
  const type = graphTypeLabel(node.type).toLowerCase();
  if (node.type === "tag") return `Showing characters, assists, shells, and teams that share ${node.label}.`;
  if (node.type === "character") return `Showing the tags, partners, assists, and study material connected to ${node.label}.`;
  if (node.type === "assist") return `Showing the character, tags, and team needs connected to this assist.`;
  if (node.type === "playstyle") return `Showing the characters, shells, and team examples that support this playstyle.`;
  return `Showing mapped ${type} relationships from the local DBFZ knowledge data.`;
}

function graphNodeFallbackSummary(node) {
  if (node.type === "tag") return `${node.label} is a filterable team-building concept. Use it to find related characters, assists, shells, and playstyles.`;
  if (node.type === "character") return `${node.label} is connected through tags, partners, assists, and study resources.`;
  if (node.type === "assist") return `${node.label} is connected through assist function, blockstun needs, and the character it belongs to.`;
  if (node.type === "shell") return `${node.label} is a two-character structure that should connect through shared tags, footage, and synergy notes.`;
  if (node.type === "team") return `${node.label} is a three-character structure that should connect through order, win condition, and footage.`;
  return `${node.label} is part of the DBFZ Knowledge Map.`;
}

function graphConnectionCopy(source, edge, target) {
  if (edge.notes) return edge.notes;
  if (source.type === "tag" && target.type === "character") return `${target.label} uses ${source.label} as part of its role, team need, or gameplan.`;
  if (source.type === "character" && target.type === "tag") return `${target.label} describes a useful identity, assist function, or team need for ${source.label}.`;
  if (source.type === "assist" && target.type === "tag") return `${target.label} describes what this assist contributes to a team.`;
  if (source.type === "tag" && target.type === "assist") return `${target.label} is one assist option tied to the ${source.label} need.`;
  if (target.summary) return target.summary;
  return `${target.label} is linked through shared tags, partner notes, study material, or shell/team data.`;
}

function findCharacterByName(name) {
  const normalized = normalizeTagKey(name);
  return characters.find((character) => normalizeTagKey(character.name) === normalized || character.aliases?.some((alias) => normalizeTagKey(alias) === normalized));
}

function renderPlaystyleTeams() {
  if (!playstyleList || !playstyleCharacters) return;
  const styles = publicPlaystyleData.playstyles || [];
  if (!styles.length) {
    playstyleList.innerHTML = `<p class="empty-state">No playstyle data loaded yet.</p>`;
    playstyleCharacters.innerHTML = "";
    return;
  }

  const query = playstyleSearch.value.trim().toLowerCase();
  const visible = styles.filter((style) => {
    const text = `${style.name} ${style.summary} ${(style.tags || []).join(" ")} ${(style.strengths || []).join(" ")} ${(style.weaknesses || []).join(" ")}`.toLowerCase();
    return !query || text.includes(query);
  });

  if (!selectedPlaystyleId || !styles.some((style) => style.id === selectedPlaystyleId)) {
    selectedPlaystyleId = styles[0].id;
  }
  if (visible.length && !visible.some((style) => style.id === selectedPlaystyleId)) {
    selectedPlaystyleId = visible[0].id;
  }

  playstyleList.innerHTML = visible.length
    ? visible
        .map((style) => {
          return `
            <button class="playstyle-tab ${style.id === selectedPlaystyleId ? "is-selected" : ""}" type="button" data-playstyle-id="${style.id}">
              <strong>${style.name}</strong>
              <span>${style.summary}</span>
            </button>
          `;
        })
        .join("")
    : `<p class="empty-state">No playstyles match that search.</p>`;

  playstyleList.querySelectorAll("[data-playstyle-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPlaystyleId = button.dataset.playstyleId;
      renderPlaystyleTeams();
    });
  });

  const style = styles.find((item) => item.id === selectedPlaystyleId) || visible[0] || styles[0];
  if (!style) return;
  const recommended = recommendedCharactersForPlaystyle(style);
  playstyleTitle.textContent = style.name;
  playstyleSummary.textContent = style.summary;
  playstyleWhy.textContent = style.whyItWorks || "This style works when the team supports its main gameplan without leaving major gaps.";
  playstyleTags.innerHTML = [graphPill("playstyle", style.id, style.name), ...(style.tags || []).map((tag) => graphPill("tag", tag))].join("");
  renderPlaystyleCharacters(recommended);
  renderShellNotes(playstyleShells, style.recommendedShells || []);
  renderPlaystyleExampleTeams(style.exampleTeams || []);
  renderNotes(playstyleStrengths, style.strengths || []);
  renderNotes(playstyleWeaknesses, style.weaknesses || []);
}

function renderShellNotes(container, shells) {
  container.innerHTML = (shells?.length ? shells : ["Shell ideas pending."])
    .map((shell) => `<button class="graph-note-button" type="button" data-graph-open="${graphNodeIdFromParts("shell", shell)}">${shell}</button>`)
    .join("");
}

function recommendedCharactersForPlaystyle(style) {
  const explicit = (style.recommendedCharacters || []).map(findCharacter).filter(Boolean);
  const used = new Set(explicit.map((character) => character.id));
  const tagNeedles = (style.tags || []).map((tag) => tag.toLowerCase());
  const inferred = characters
    .filter((character) => !used.has(character.id))
    .map((character) => {
      const page = characterPageData(character);
      const text = `${character.name} ${character.archetype} ${character.roles.join(" ")} ${allPageTags(page).join(" ")}`.toLowerCase();
      const score = tagNeedles.reduce((total, tag) => total + (text.includes(tag) ? 2 : 0), 0) + styleMetricBonus(style, character);
      return { character, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.character);
  return [...explicit, ...inferred].slice(0, 10);
}

function styleMetricBonus(style, character) {
  const id = style.id || "";
  if (id === "mix") return character.metrics?.mix || 0;
  if (id === "zoning" || id === "neutral" || id === "footsies") return character.metrics?.neutral || 0;
  if (id === "rushdown" || id === "technical") return Math.max(character.metrics?.mix || 0, character.metrics?.damage || 0);
  if (id === "anchor-focused") return Math.max(character.metrics?.damage || 0, character.metrics?.support || 0);
  if (id === "beginner-friendly") return character.metrics?.ease || 0;
  return 0;
}

function renderPlaystyleCharacters(recommended) {
  playstyleCharacters.replaceChildren();
  if (!recommended.length) {
    playstyleCharacters.innerHTML = `<p class="empty-state">No character matches yet.</p>`;
    return;
  }
  for (const character of recommended) {
    const card = document.createElement("button");
    card.className = "playstyle-character-card";
    card.type = "button";
    card.dataset.characterId = character.id;
    card.style.setProperty("--fighter-color", character.color || "var(--gold)");
    card.innerHTML = `
      <span class="playstyle-character-art"></span>
      <strong>${character.name}</strong>
      <p>${shortArchetype(character)}</p>
      ${personalBars(character)}
    `;
    paintArt(card.querySelector(".playstyle-character-art"), character);
    card.addEventListener("click", () => openCharacterPage(character));
    playstyleCharacters.append(card);
  }
}

function renderPlaystyleExampleTeams(examples) {
  playstyleExamples.replaceChildren();
  if (!examples.length) {
    playstyleExamples.innerHTML = `<p class="empty-state">No example teams loaded yet.</p>`;
    return;
  }
  for (const ids of examples) {
    const members = ids.map(findCharacter).filter(Boolean).slice(0, 3);
    const item = document.createElement("article");
    item.className = "playstyle-team-card";
    item.innerHTML = `
      <div class="playstyle-team-members">
        ${members
          .map(
            (member) => `
              <button type="button" data-character-id="${member.id}" style="--fighter-color:${member.color || "var(--gold)"}">
                <span class="playstyle-team-art"></span>
                <strong>${shortName(member.name)}</strong>
              </button>
            `
          )
          .join("")}
      </div>
      <button class="text-button" type="button" data-team-action="use">Use Team</button>
    `;
    item.querySelectorAll("[data-character-id]").forEach((button) => {
      const character = findCharacter(button.dataset.characterId);
      paintArt(button.querySelector(".playstyle-team-art"), character);
      button.addEventListener("click", () => openCharacterPage(character));
    });
    item.querySelector('[data-team-action="use"]')?.addEventListener("click", () => {
      team = [members[0] || null, members[1] || null, members[2] || null];
      selectedCharacter = members[0] || null;
      activeView = "team";
      document.querySelectorAll(".main-nav a").forEach((link) => link.removeAttribute("aria-current"));
      document.querySelector('.main-nav a[href="#teamSlots"]')?.setAttribute("aria-current", "page");
      saveState();
      render();
    });
    playstyleExamples.append(item);
  }
}

function renderGuides() {
  if (!guideSections) return;
  const modules = effectiveTrainingModules();
  if (!modules.length) {
    guideSections.innerHTML = `<p class="empty-state">No training modules loaded yet.</p>`;
    return;
  }

  const q = guideSearch.value.trim().toLowerCase();
  const category = guideTemplateSelect.value;
  guideTitle.textContent = category === "all" ? "Training Lab" : category;
  guideSummary.textContent =
    category === "all"
      ? "Deep explanations for shells, assists, archetypes, DHC logic, team order, and character choices."
      : `Focused lessons for ${category.toLowerCase()} decisions.`;

  const sections = modules.filter((section) => {
    const text = `${section.category} ${section.title} ${section.summary} ${section.deepDive} ${section.searchBlob || ""} ${(section.keyTakeaways || []).join(" ")} ${(section.relatedTags || []).join(" ")}`.toLowerCase();
    return (category === "all" || section.category === category) && (!q || text.includes(q));
  });

  guideSections.innerHTML = sections.length ? renderGuideFolders(sections, category !== "all" || Boolean(q)) : `<p class="empty-state">No training modules match that search.</p>`;
}

function renderGuideFolders(sections, forceOpen = false) {
  const groups = new Map();
  for (const section of sections) {
    const key = section.category || "Training Lab";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(section);
  }
  return [...groups.entries()]
    .map(([category, items], groupIndex) => {
      const open = forceOpen || groupIndex === 0;
      return `
        <details class="guide-folder" ${open ? "open" : ""}>
          <summary>
            <span>${category}</span>
            <strong>${items.length} topic${items.length === 1 ? "" : "s"}</strong>
          </summary>
          <div class="guide-folder-grid">
            ${items.map(guideSectionCard).join("")}
          </div>
        </details>
      `;
    })
    .join("");
}

function guideSectionCard(section) {
  return `
    <details class="guide-section-card">
      <summary>
        <span>
          <em>${section.category}</em>
          <strong>${section.title}</strong>
        </span>
        <b>Open</b>
      </summary>
      <p>${section.summary}</p>
      ${formattedNoteMarkup(section.deepDive)}
      <ul>${(section.keyTakeaways || []).map((item) => `<li>${item}</li>`).join("")}</ul>
      <div class="tag-list">${(section.relatedTags || []).map((tag) => graphPill("tag", tag)).join("")}</div>
      ${section.source ? `<p class="data-source-note">Source: ${section.source}</p>` : ""}
    </details>
  `;
}

function effectiveTrainingModules() {
  const baseModules = [
    ...(publicTrainingData.modules?.length ? publicTrainingData.modules : legacyGuideModules()),
    ...pdfTrainingModules(),
  ];
  const moduleMap = new Map();
  for (const module of baseModules) {
    const normalized = normalizeTrainingModule(module);
    if (normalized.id) moduleMap.set(normalized.id, normalized);
  }
  for (const module of Object.values(adminDrafts.trainingModules || {})) {
    const normalized = normalizeTrainingModule(module);
    if (normalized.id) moduleMap.set(normalized.id, normalized);
  }
  return [...moduleMap.values()];
}

function normalizeTrainingModule(module) {
  return {
    id: module.id || slugify(`${module.category || "training"}-${module.title || Date.now()}`),
    category: module.category || "Training Lab",
    title: module.title || "Untitled Module",
    summary: module.summary || "",
    deepDive: module.deepDive || "",
    keyTakeaways: arrayFrom(module.keyTakeaways),
    relatedTags: arrayFrom(module.relatedTags),
    source: module.source || "",
    searchBlob: module.searchBlob || "",
  };
}

function renderMovieRoom() {
  if (!movieRoomList) return;
  syncMovieRoomSelection();
  renderMovieRoomControls();
  const query = movieSearch.value.trim().toLowerCase();
  const scope = movieScopeFilter.value;
  const type = movieTypeFilter.value;
  const selectedIds = movieRoomSelectedIds.filter(Boolean);
  const entries = effectiveMovieRoomEntries().filter((entry) => {
    const resources = entry.resources || [];
    const matchesScope = scope === "all" || entry.scope === scope;
    const matchesSelection = movieRoomEntryMatchesSelection(entry, scope, selectedIds);
    const matchesType = type === "all" || resources.some((resource) => resource.type === type);
    const text = [
      entry.title,
      entry.summary,
      entry.scope,
      entry.sourceType,
      ...(entry.tags || []),
      ...resources.flatMap((resource) => [resource.label, resource.type, resource.notes, resource.url]),
      ...movieRoomCharacterNames(entry),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return matchesScope && matchesSelection && matchesType && (!query || text.includes(query));
  });

  movieRoomList.innerHTML = `
    ${movieRoomSelectionSummary(scope, selectedIds)}
    ${
      entries.length
        ? entries.map(movieRoomEntryCard).join("")
        : `<p class="empty-state">No Movie Room links match this selection yet. Add links in public/data/dbfz/movie-room.json.</p>`
    }
  `;

  movieRoomList.querySelectorAll("[data-character-art]").forEach((art) => {
    const character = findCharacter(art.dataset.characterArt);
    if (character) paintArt(art, character);
  });

  movieRoomList.querySelectorAll("[data-movie-character-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const character = findCharacter(button.dataset.movieCharacterId);
      if (character) openCharacterPage(character);
    });
  });
}

function syncMovieRoomSelection() {
  const picked = team.filter(Boolean).map((character) => character.id);
  if (!movieRoomSelectedIds.length) movieRoomSelectedIds = picked.slice(0, Math.min(movieScopeFilter.value === "shell" ? 2 : 3, picked.length));
  movieRoomSelectedIds = movieRoomSelectedIds.filter((id) => picked.includes(id));
  const needed = movieScopeFilter.value === "character" ? 1 : movieScopeFilter.value === "shell" ? 2 : 3;
  for (const id of picked) {
    if (movieRoomSelectedIds.length >= needed) break;
    if (!movieRoomSelectedIds.includes(id)) movieRoomSelectedIds.push(id);
  }
}

function renderMovieRoomControls() {
  const picked = team.filter(Boolean);
  const scope = movieScopeFilter.value;
  if (movieCharacterPicker) {
    movieCharacterPicker.hidden = scope !== "character";
    movieCharacterPicker.innerHTML = picked.length
      ? picked.map((character) => `<option value="${character.id}">${character.name}</option>`).join("")
      : `<option value="">No team selected</option>`;
    if (scope === "character") movieCharacterPicker.value = movieRoomSelectedIds[0] || picked[0]?.id || "";
  }
  if (movieTeamPicker) {
    movieTeamPicker.hidden = scope === "all";
    movieTeamPicker.innerHTML = picked.length
      ? picked
          .map((character) => {
            const selected = movieRoomSelectedIds.includes(character.id);
            return `
              <button class="${selected ? "is-selected" : ""}" type="button" data-movie-toggle="${character.id}" style="--fighter-color:${character.color || "var(--gold)"}">
                <span class="movie-room-art" data-character-art="${character.id}"></span>
                <strong>${shortName(character.name)}</strong>
              </button>
            `;
          })
          .join("")
      : `<button type="button" data-movie-change-team>Pick team first</button>`;
    movieTeamPicker.querySelectorAll("[data-character-art]").forEach((art) => {
      const character = findCharacter(art.dataset.characterArt);
      if (character) paintArt(art, character);
    });
  }
}

function movieRoomEntryMatchesSelection(entry, scope, ids) {
  if (scope === "all") return true;
  if (!ids.length) return false;
  const entryIds = entry.characterIds || [];
  if (scope === "character") return entryIds.includes(ids[0]);
  if (scope === "shell") return ids.slice(0, 2).every((id) => entryIds.includes(id));
  if (scope === "team") return ids.every((id) => entryIds.includes(id));
  return true;
}

function movieRoomSelectionSummary(scope, ids) {
  if (scope === "all") return `<div class="movie-selection-summary"><strong>All saved study pages</strong><span>Use filters to narrow by footage type.</span></div>`;
  const picked = ids.map(findCharacter).filter(Boolean);
  const title = scope === "character" ? "Character study" : scope === "shell" ? "Shell study" : "Team study";
  return `
    <div class="movie-selection-summary">
      <div>
        <strong>${title}</strong>
        <span>${picked.length ? "Using your current Team Builder picks." : "Use Team Builder or Change Team to select fighters."}</span>
      </div>
      <div class="movie-selection-chips">
        ${
          picked.length
            ? picked
                .map(
                  (character) => `
                    <button type="button" data-movie-character-id="${character.id}" style="--fighter-color:${character.color || "var(--gold)"}">
                      <span class="movie-room-art" data-character-art="${character.id}"></span>
                      <b>${shortName(character.name)}</b>
                    </button>
                  `
                )
                .join("")
            : ""
        }
      </div>
    </div>
  `;
}

function effectiveMovieRoomEntries() {
  const entryMap = new Map();
  for (const entry of publicMovieRoomData.entries || []) {
    const normalized = normalizeMovieRoomEntry(entry);
    if (normalized.id) entryMap.set(normalized.id, normalized);
  }
  for (const entry of Object.values(adminDrafts.movieRoomEntries || {})) {
    const normalized = normalizeMovieRoomEntry(entry);
    if (normalized.id) entryMap.set(normalized.id, normalized);
  }
  return [...entryMap.values()];
}

function normalizeMovieRoomEntry(entry) {
  return {
    id: entry.id || slugify(`${entry.scope || "movie"}-${entry.title || Date.now()}`),
    scope: entry.scope || "character",
    title: entry.title || "Untitled Study Shelf",
    characterIds: arrayFrom(entry.characterIds),
    shellIds: arrayFrom(entry.shellIds),
    teamIds: arrayFrom(entry.teamIds),
    summary: entry.summary || "",
    tags: arrayFrom(entry.tags),
    sourceType: entry.sourceType || "manual",
    resources: (entry.resources || []).map(normalizeMovieResource),
    recommendationHooks: entry.recommendationHooks || {},
  };
}

function normalizeMovieResource(resource) {
  return {
    label: resource.label || resource.type || "Study Link",
    type: resource.type || "Resource",
    url: resource.url || "",
    notes: resource.notes || "",
  };
}

function movieRoomEntryCard(entry) {
  const resources = entry.resources || [];
  const visibleResources = movieTypeFilter.value === "all" ? resources : resources.filter((resource) => resource.type === movieTypeFilter.value);
  return `
    <article class="movie-room-card">
      <header>
        <div>
          <p class="eyebrow">${movieRoomScopeLabel(entry.scope)} Page</p>
          <h4>${entry.title}</h4>
          <p>${entry.summary || "Study resources can be added here by admins."}</p>
        </div>
        <span class="source-pill">${entry.sourceType === "auto-recommended" ? "Auto" : "Manual"}</span>
      </header>
      <div class="movie-room-characters">
        ${movieRoomCharacters(entry)
          .map(
            (character) => `
              <button type="button" data-movie-character-id="${character.id}" style="--fighter-color:${character.color || "var(--gold)"}">
                <span class="movie-room-art" data-character-art="${character.id}"></span>
                <strong>${shortName(character.name)}</strong>
              </button>
            `
          )
          .join("")}
      </div>
      <div class="tag-list">${(entry.tags || []).map((tag) => graphPill("tag", tag)).join("")}</div>
      <div class="movie-resource-grid">
        ${visibleResources.map(movieResourceCard).join("") || `<p class="empty-state">No links in this category yet.</p>`}
      </div>
    </article>
  `;
}

function movieResourceCard(resource) {
  const hasUrl = Boolean(resource.url);
  return `
    <section class="movie-resource-card">
      <strong>${resource.label || resource.type || "Study Link"}</strong>
      <span>${resource.type || "Resource"}</span>
      <p>${resource.notes || "Manual link slot ready for admins."}</p>
      ${
        hasUrl
          ? `<a class="text-button" href="${resource.url}" target="_blank" rel="noreferrer">Open</a>`
          : `<small>Link pending</small>`
      }
    </section>
  `;
}

function movieRoomCharacters(entry) {
  return (entry.characterIds || []).map(findCharacter).filter(Boolean);
}

function movieRoomCharacterNames(entry) {
  return movieRoomCharacters(entry).map((character) => character.name);
}

function movieRoomScopeLabel(scope) {
  return scope === "shell" ? "Shell" : scope === "team" ? "Team" : "Character";
}

function legacyGuideModules() {
  return (publicGuideData.templates || []).flatMap((template) =>
    (template.sections || []).map((section) => ({
      id: `${template.id}-${section.title}`,
      category: "Guide Framework",
      title: section.title,
      summary: template.summary,
      deepDive: "Legacy guide template section ready to be expanded into a Training Lab module.",
      keyTakeaways: section.items || [],
      relatedTags: [],
    }))
  );
}

function pdfTrainingModules() {
  return Object.values(publicTeamNotesData.records || {}).map((record) => {
    const contributions = record.contributions || {};
    const questions = record.teamBuildingQuestions || {};
    const takeaways = [
      ...(record.characterIdentity?.primaryRoles || []).map((item) => `Identity: ${item}`),
      ...(record.teamArchetypes || []).map((item) => `Archetype: ${item}`),
      ...(contributions.damage || []).slice(0, 2).map((item) => `Damage: ${item}`),
      ...(contributions.neutral || []).slice(0, 2).map((item) => `Neutral: ${item}`),
      ...(contributions.mix || []).slice(0, 2).map((item) => `Mix: ${item}`),
      ...(contributions.support || []).slice(0, 2).map((item) => `Support: ${item}`),
      ...(record.winConditions?.primary || []).map((item) => `Primary win condition: ${item}`),
      ...(questions.beforeAddingAsk || []).slice(0, 3).map((item) => `Question: ${item}`),
      ...(record.whyPick || []).slice(0, 3).map((item) => `Why pick: ${item}`),
      ...(record.whyAvoid || []).slice(0, 3).map((item) => `Why avoid: ${item}`),
    ];
    return {
      id: `pdf-${record.id}`,
      category: "Character Guides",
      title: record.name,
      summary: record.characterIdentity?.oneSentenceSummary?.[0] || "PDF guide notes imported.",
      deepDive: [
        record.teamPlacement?.explanation?.join(" "),
        record.dhcSynergy?.raw?.length ? `DHC: ${record.dhcSynergy.raw.join(" ")}` : "",
        record.finalVerdict?.length ? `Verdict: ${record.finalVerdict.join(" ")}` : "",
      ]
        .filter(Boolean)
        .join(" "),
      keyTakeaways: takeaways,
      relatedTags: [...new Set([...(record.characterIdentity?.primaryRoles || []), ...(record.teamArchetypes || []), ...(record.bestTeamArchetypes || []).map((entry) => entry.name)])],
      source: `${record.source}, pages ${record.sourcePageStart}-${record.sourcePageEnd}`,
      searchBlob: record.searchableText || "",
    };
  });
}

function renderVideoLibrary() {
  if (!videoList) return;
  const q = videoSearch.value.trim().toLowerCase();
  const character = videoCharacterFilter.value;
  const topic = videoTopicFilter.value;
  const videos = (publicVideoData.videos || []).filter((video) => {
    const text = `${video.title} ${video.topic} ${video.summary} ${(video.characters || []).join(" ")} ${(video.tags || []).join(" ")}`.toLowerCase();
    const matchesCharacter = character === "all" || (video.characters || []).some((name) => normalizeTagKey(name) === normalizeTagKey(character));
    const matchesTopic = topic === "all" || video.topic === topic;
    return matchesCharacter && matchesTopic && (!q || text.includes(q));
  });

  videoList.innerHTML = videos.length
    ? videos.map(videoCard).join("")
    : `<p class="empty-state">No videos match yet. Add records in public/data/dbfz/video-library.json.</p>`;
}

function videoCard(video) {
  const link = video.url
    ? `<a class="text-button video-link" href="${video.url}" target="_blank" rel="noreferrer">Open Video</a>`
    : `<span class="video-placeholder">Link pending</span>`;
  return `
    <article class="video-card">
      <p class="eyebrow">${video.topic || "Video"}</p>
      <h3>${video.title}</h3>
      <p>${video.summary || "Video notes pending."}</p>
      <div class="tag-list">${[...(video.characters || []), ...(video.tags || [])].map((tag) => graphPill("tag", tag)).join("")}</div>
      ${link}
    </article>
  `;
}

function assistResultCard(assist) {
  return `
    <article class="result-card">
      <strong>${assist.character} ${assist.assist} Assist</strong>
      <p>${assist.startup ?? "-"}f startup / ${assist.blockstun ?? "-"} blockstun / ${assist.hitstun ?? "-"} hitstun</p>
      <div class="tag-list">${(assist.tags || []).map((tag) => graphPill("tag", tag)).join("")}</div>
      <p>${assist.notes || ""}</p>
    </article>
  `;
}

function characterResultCard(character) {
  const page = characterPageData(character);
  return `
    <article class="result-card character-result-card" data-character-id="${character.id}">
      <strong>${character.name}</strong>
      <p>${shortArchetype(character)}</p>
      <div class="tag-list">${visiblePageTags(page, 6).map((tag) => graphPill("tag", tag)).join("")}</div>
    </article>
  `;
}

function relationshipResultCard(relationship) {
  return `
    <article class="result-card">
      <strong>${relationship.characterA} ↔ ${relationship.characterB}</strong>
      <p>${relationship.notes || "Relationship notes pending."}</p>
      <div class="tag-list">${(relationship.tags || []).map((tag) => graphPill("tag", tag)).join("")}</div>
      ${relationship.videoUrl ? `<p><a href="${relationship.videoUrl}">Video link</a></p>` : ""}
    </article>
  `;
}

function addToNextSlot(character) {
  const existing = team.findIndex((member) => member?.id === character.id);
  if (existing !== -1) return;

  const empty = team.findIndex((member) => !member);
  if (empty !== -1) {
    team[empty] = character;
    return;
  }

  team[2] = character;
}

function dropCharacterOnSlot(characterId, slotIndex) {
  const character = findCharacter(characterId);
  if (!character) return;

  const fromIndex = team.findIndex((member) => member?.id === character.id);
  if (fromIndex === slotIndex) return;

  if (fromIndex !== -1) {
    const target = team[slotIndex];
    team[slotIndex] = character;
    team[fromIndex] = target || null;
  } else {
    team[slotIndex] = character;
  }

  selectedCharacter = character;
  saveState();
  render();
}

teamSlots.forEach((slot) => {
  slot.addEventListener("click", () => {
    const character = team[Number(slot.dataset.slot)];
    if (character) {
      selectedCharacter = character;
      openCharacterModal(character);
    }
  });

  slot.addEventListener("dragstart", (event) => {
    const index = Number(slot.dataset.slot);
    if (!team[index]) {
      event.preventDefault();
      return;
    }
    dragged = { type: "team", characterId: team[index].id, fromSlot: index };
    event.dataTransfer.setData("text/plain", team[index].id);
    event.dataTransfer.effectAllowed = "move";
  });

  slot.addEventListener("dragover", (event) => {
    event.preventDefault();
    slot.classList.add("drop-target");
  });

  slot.addEventListener("dragleave", () => slot.classList.remove("drop-target"));

  slot.addEventListener("drop", (event) => {
    event.preventDefault();
    slot.classList.remove("drop-target");
    const characterId = event.dataTransfer.getData("text/plain") || dragged?.characterId;
    dropCharacterOnSlot(characterId, Number(slot.dataset.slot));
  });
});

function recommendPartners(character) {
  const teamIds = new Set(team.filter(Boolean).map((member) => member.id));
  const manual = {
    best: (character.bestPartners || []).map(findCharacter).filter(Boolean).filter((partner) => !teamIds.has(partner.id)),
    good: (character.goodPartners || []).map(findCharacter).filter(Boolean).filter((partner) => !teamIds.has(partner.id)),
    care: (character.carePartners || []).map(findCharacter).filter(Boolean).filter((partner) => !teamIds.has(partner.id)),
  };
  const usedManual = new Set(Object.values(manual).flat().map((partner) => partner.id));
  const candidates = characters
    .filter((candidate) => candidate.id !== character.id && !teamIds.has(candidate.id) && !usedManual.has(candidate.id))
    .map((candidate) => ({ candidate, score: partnerScore(character, candidate) }))
    .sort((a, b) => b.score - a.score);

  return {
    best: [...manual.best, ...candidates.slice(0, 4).map((item) => item.candidate)].slice(0, 4),
    good: [...manual.good, ...candidates.slice(4, 8).map((item) => item.candidate)].slice(0, 4),
    care: [...manual.care, ...candidates.slice(-4).reverse().map((item) => item.candidate)].slice(0, 4),
  };
}

function normalizeCharacterRecord(character) {
  return {
    ...character,
    roles: arrayFrom(character.roles),
    aliases: arrayFrom(character.aliases),
    strengths: arrayFrom(character.strengths),
    weaknesses: arrayFrom(character.weaknesses),
    wants: arrayFrom(character.wants),
    tags: cleanTagList(character.tags),
    assistTags: cleanTagList(character.assistTags),
    synergyTags: cleanTagList(character.synergyTags),
    bestPartners: arrayFrom(character.bestPartners),
    goodPartners: arrayFrom(character.goodPartners),
    carePartners: arrayFrom(character.carePartners),
    matchups: arrayFrom(character.matchups),
    community: arrayFrom(character.community),
    metrics: {
      damage: Number(character.metrics?.damage ?? 5),
      neutral: Number(character.metrics?.neutral ?? 5),
      mix: Number(character.metrics?.mix ?? 5),
      support: Number(character.metrics?.support ?? 5),
      ease: Number(character.metrics?.ease ?? 5),
    },
  };
}

function applyRosterCorrections() {
  const dbzBroly = characters.find((character) => character.id === "dbz-broly");
  if (!dbzBroly) return;
  dbzBroly.roles = addUnique(dbzBroly.roles, "Grappler");
  dbzBroly.tags = addUnique(dbzBroly.tags, "Grappler");
  dbzBroly.archetype = dbzBroly.archetype || "Armored zoner/grappler with huge screen control, scary grabs, and anchor presence.";
}

function addUnique(values, value) {
  const list = arrayFrom(values);
  return list.some((item) => item.toLowerCase() === String(value).toLowerCase()) ? list : [...list, value];
}

function normalizeAssistData(data) {
  return {
    ...(data || { assists: [] }),
    assists: arrayFrom(data?.assists).map((assist) => ({
      ...assist,
      tags: cleanTagList(assist.tags),
    })),
  };
}

function normalizeSynergyData(data) {
  return {
    ...(data || { relationships: [] }),
    relationships: arrayFrom(data?.relationships).map((relationship) => ({
      ...relationship,
      tags: cleanTagList(relationship.tags),
    })),
  };
}

function arrayFrom(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string") return linesFrom(value);
  return [];
}

function cleanTagList(values) {
  const seen = new Set();
  const clean = [];
  for (const value of arrayFrom(values)) {
    const tag = normalizeTagValue(value);
    if (!tag) continue;
    const key = normalizeTagKey(tag);
    if (seen.has(key)) continue;
    seen.add(key);
    clean.push(tag);
  }
  return clean;
}

function normalizeTagValue(value) {
  let tag = cleanNoteText(value)
    .replace(/^tags?\s*:\s*/i, "")
    .replace(/^provides\s*:\s*/i, "")
    .replace(/[.。]+$/g, "")
    .replace(/\s*→\s*/g, " -> ")
    .trim();
  if (!tag) return null;
  if (/^(why|provides|best for|special interactions?|raw|drawbacks?)$/i.test(tag)) return null;
  if (/[,!?;]/.test(tag) || /\.\s+/.test(tag)) return null;
  if (
    /^(characters?|allows?|needs?|wants?|this pick|this character|most of the cast|why allows)\b/i.test(tag) ||
    /\b(convert neutral wins|stronger rewards|looking to|seeking|requiring|that want|that love|love dhcing|loves dhcing|dhcing into)\b/i.test(tag)
  ) {
    return null;
  }
  const words = tag.split(/\s+/).filter(Boolean);
  if (tag.length > 34 || words.length > 4) return null;
  const conceptMap = [
    [/beam (coverage|control)|fullscreen beam/i, "Beam"],
    [/neutral (coverage|control|assistance|support)|screen (coverage|control)/i, "Neutral"],
    [/combo (extensions?|utility)|confirms?/i, "Combo Extension"],
    [/lockdown|blockstun/i, "Lockdown"],
    [/meter|battery|resource/i, "Meter Build"],
    [/corner carry/i, "Corner Carry"],
    [/cashout/i, "Cashout"],
    [/pressure/i, "Pressure"],
    [/spirit bomb/i, "Spirit Bomb Synergy"],
  ];
  for (const [pattern, replacement] of conceptMap) {
    if (pattern.test(tag)) return replacement;
  }
  return titleCaseTag(tag);
}

function titleCaseTag(value) {
  const acronyms = new Set(["DHC", "DP", "TOD", "OKI", "DR", "SKD", "HKD"]);
  return String(value || "")
    .split(/\s+/)
    .map((word) => {
      const cleaned = word.replace(/^-+|-+$/g, "");
      const upper = cleaned.toUpperCase();
      if (acronyms.has(upper)) return upper;
      if (/^\d+\+?$/.test(cleaned)) return cleaned;
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    })
    .join(" ")
    .replace(/\s+->\s+/g, " -> ");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function pdfCharacterRecord(characterId) {
  return publicTeamNotesData.records?.[characterId] || null;
}

function pdfDerivedCharacterRecord(record) {
  if (!record) return {};
  const derived = record.derivedCharacterFields || {};
  return {
    roles: arrayFrom(derived.roles || record.characterIdentity?.primaryRoles),
    archetype: derived.archetype || record.characterIdentity?.oneSentenceSummary?.[0] || "",
    overview: derived.overview || record.characterIdentity?.oneSentenceSummary?.[0] || "",
    strengths: arrayFrom(derived.strengths),
    weaknesses: arrayFrom(derived.weaknesses),
    wants: arrayFrom(derived.wants || record.teamBuildingQuestions?.wantsTeammatesWho),
    tags: cleanTagList([...(record.characterIdentity?.primaryRoles || []), ...(record.teamArchetypes || [])]),
    assistTags: pdfAssistTags(record),
    synergyTags: pdfSynergyTags(record),
    pdfSource: {
      source: record.source,
      pageStart: record.sourcePageStart,
      pageEnd: record.sourcePageEnd,
    },
  };
}

function pdfAssistTags(record) {
  const tags = [];
  for (const assist of Object.values(record?.assistAnalysis || {})) {
    tags.push(...(assist.provides || []));
  }
  return cleanTagList(tags);
}

function pdfSynergyTags(record) {
  const tags = [];
  tags.push(...(record.bestTeamArchetypes || []).map((entry) => entry.name));
  if (record.dhcSynergy) tags.push("DHC Routes");
  tags.push(...(record.dhcSynergy?.specialInteractions || []));
  return cleanTagList(tags);
}

function restoreAdminDrafts() {
  try {
    adminDrafts = JSON.parse(localStorage.getItem(adminDraftKey) || "{}");
    adminDrafts.records ||= {};
    adminDrafts.trainingModules ||= {};
    adminDrafts.movieRoomEntries ||= {};
    adminDrafts.suggestions ||= [];
  } catch {
    adminDrafts = { records: {}, trainingModules: {}, movieRoomEntries: {}, suggestions: [] };
  }
}

function persistAdminDrafts() {
  localStorage.setItem(adminDraftKey, JSON.stringify(adminDrafts));
}

function canSuggest() {
  if (!adminPanelEnabled) return false;
  return roleHasPermission("suggest_edits") || canEditDirectly();
}

function canEditDirectly() {
  if (!adminPanelEnabled) return false;
  return roleHasPermission("publish_updates") || roleHasPermission("publish_character_data") || roleHasPermission("publish_all");
}

function canManageUsers() {
  if (!adminPanelEnabled) return false;
  return roleHasPermission("manage_users");
}

function roleHasPermission(permission) {
  return (roleDefinitions[currentRole]?.permissions || []).includes(permission);
}

function populateAdminControls() {
  if (!adminCharacterSelect) return;
  populateAdminRoleSelect();
  adminCharacterSelect.innerHTML = "";
  for (const character of characters) {
    const option = document.createElement("option");
    option.value = character.id;
    option.textContent = character.name;
    adminCharacterSelect.append(option);
  }

  fillMultiSelect(editTags, knowledgeDB.tagCatalog?.character || []);
  fillMultiSelect(editAssistTags, knowledgeDB.tagCatalog?.assist || []);
  fillMultiSelect(editSynergyTags, knowledgeDB.tagCatalog?.synergy || []);
  fillCharacterMultiSelect(editBestPartners);
  fillCharacterMultiSelect(editGoodPartners);
  fillCharacterMultiSelect(editCarePartners);

  ratingEditor.innerHTML = Object.keys(metricMeta)
    .map(
      (key) => `
        <label class="rating-slider">
          <span>${metricMeta[key].label}</span>
          <input id="editMetric-${key}" type="range" min="1" max="10" step="1" />
          <output id="editMetricValue-${key}">5</output>
        </label>
      `
    )
    .join("");
  ratingEditor.querySelectorAll("input[type='range']").forEach((input) => {
    input.addEventListener("input", () => {
      const key = input.id.replace("editMetric-", "");
      document.querySelector(`#editMetricValue-${key}`).textContent = input.value;
    });
  });
  populateAdminContentSelects();
}

function populateAdminRoleSelect() {
  if (!adminRoleSelect) return;
  const selected = adminRoleSelect.value || currentRole;
  adminRoleSelect.innerHTML = "";
  for (const [id, role] of Object.entries(roleDefinitions)) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = role.label || id;
    adminRoleSelect.append(option);
  }
  adminRoleSelect.value = [...adminRoleSelect.options].some((option) => option.value === selected) ? selected : "viewer";
  currentRole = adminRoleSelect.value;
}

function populateAdminContentSelects() {
  if (adminTrainingSelect) {
    const selected = adminTrainingSelect.value;
    adminTrainingSelect.innerHTML = "";
    for (const module of effectiveTrainingModules()) {
      const option = document.createElement("option");
      option.value = module.id;
      option.textContent = `${module.category}: ${module.title}`;
      adminTrainingSelect.append(option);
    }
    adminTrainingSelect.value = [...adminTrainingSelect.options].some((option) => option.value === selected)
      ? selected
      : adminTrainingSelect.options[0]?.value || "";
  }

  if (adminMovieSelect) {
    const selected = adminMovieSelect.value;
    adminMovieSelect.innerHTML = "";
    for (const entry of effectiveMovieRoomEntries()) {
      const option = document.createElement("option");
      option.value = entry.id;
      option.textContent = `${movieRoomScopeLabel(entry.scope)}: ${entry.title}`;
      adminMovieSelect.append(option);
    }
    adminMovieSelect.value = [...adminMovieSelect.options].some((option) => option.value === selected)
      ? selected
      : adminMovieSelect.options[0]?.value || "";
  }
}

function fillMultiSelect(select, tags) {
  if (!select) return;
  select.innerHTML = "";
  for (const tag of tags) {
    const option = document.createElement("option");
    option.value = tag.id;
    option.textContent = tag.label;
    select.append(option);
  }
}

function fillCharacterMultiSelect(select) {
  if (!select) return;
  select.innerHTML = "";
  for (const character of characters) {
    const option = document.createElement("option");
    option.value = character.id;
    option.textContent = character.name;
    select.append(option);
  }
}

function renderAdminPanel() {
  if (!adminPanelEnabled || !adminView || activeView !== "admin") return;
  const character = findCharacter(adminCharacterSelect.value) || selectedPageCharacter || characters[0];
  if (!character) return;
  if (adminCharacterSelect.value !== character.id) adminCharacterSelect.value = character.id;
  adminRoleSelect.value = currentRole;
  adminCharacterTitle.textContent = `${character.name} Editor`;
  adminModeNote.textContent = canEditDirectly()
    ? "Editor mode: approved changes apply locally and export clean database JSON for Netlify."
    : canSuggest()
      ? "Contributor mode: saving creates suggestions that an Editor or Admin can review later."
      : "Viewer mode: browsing only. Switch to Contributor, Editor, or Admin to test editing UX locally.";

  permissionSummary.innerHTML = Object.values(roleDefinitions)
    .map((role) => `<section><strong>${role.label}</strong><p>${role.summary}</p></section>`)
    .join("");

  fillCharacterEditor(character);
  fillTrainingEditor();
  fillMovieEditor();
  const disabled = !canSuggest();
  characterEditorForm.querySelectorAll("input, textarea, select").forEach((field) => {
    field.disabled = disabled;
  });
  document.querySelectorAll(".admin-editor-card input, .admin-editor-card textarea, .admin-editor-card select").forEach((field) => {
    field.disabled = disabled;
  });
  saveCharacterDraft.disabled = disabled;
  publishCharacterDraft.disabled = !canEditDirectly();
  saveTrainingDraft.disabled = disabled;
  publishTrainingDraft.disabled = !canEditDirectly();
  saveMovieDraft.disabled = disabled;
  publishMovieDraft.disabled = !canEditDirectly();
  clearAdminDrafts.disabled = !canManageUsers() && !hasAdminDraftContent();
  updateAdminExportOutput();
}

function fillCharacterEditor(character) {
  const page = characterPageData(character);
  editName.value = character.name;
  editPortrait.value = character.portrait || "";
  editArchetype.value = character.archetype || "";
  editGameplan.value = page.overview || character.archetype || "";
  editWants.value = (character.wants || []).join("\n");
  editStrengths.value = (character.strengths || []).join("\n");
  editWeaknesses.value = (character.weaknesses || []).join("\n");
  editAssistNotes.value = character.assistNotes || "";
  editDhcNotes.value = character.dhcNotes || "";
  editMatchups.value = (character.matchups || page.matchups || []).join("\n");
  editCommunity.value = (character.community || page.community || []).join("\n");
  setSelectedOptions(editTags, [...(character.tags || []), ...(page.tags || [])]);
  setSelectedOptions(editAssistTags, page.assistTags || []);
  setSelectedOptions(editSynergyTags, page.synergyTags || []);
  setSelectedOptions(editBestPartners, character.bestPartners || []);
  setSelectedOptions(editGoodPartners, character.goodPartners || []);
  setSelectedOptions(editCarePartners, character.carePartners || []);
  for (const key of Object.keys(metricMeta)) {
    const input = document.querySelector(`#editMetric-${key}`);
    const output = document.querySelector(`#editMetricValue-${key}`);
    if (!input) continue;
    input.value = character.metrics?.[key] || 5;
    output.textContent = input.value;
  }
}

function fillTrainingEditor() {
  if (!adminTrainingSelect || !editTrainingTitle) return;
  const module = effectiveTrainingModules().find((item) => item.id === adminTrainingSelect.value) || effectiveTrainingModules()[0];
  if (!module) return;
  adminTrainingSelect.value = module.id;
  editTrainingTitle.value = module.title || "";
  editTrainingCategory.value = module.category || "";
  editTrainingSummary.value = module.summary || "";
  editTrainingDeepDive.value = module.deepDive || "";
  editTrainingTakeaways.value = (module.keyTakeaways || []).join("\n");
  editTrainingTags.value = (module.relatedTags || []).join("\n");
}

function fillMovieEditor() {
  if (!adminMovieSelect || !editMovieTitle) return;
  const entry = effectiveMovieRoomEntries().find((item) => item.id === adminMovieSelect.value) || effectiveMovieRoomEntries()[0];
  if (!entry) return;
  adminMovieSelect.value = entry.id;
  editMovieTitle.value = entry.title || "";
  editMovieScope.value = entry.scope || "character";
  editMovieCharacterIds.value = (entry.characterIds || []).join("\n");
  editMovieSummary.value = entry.summary || "";
  editMovieTags.value = (entry.tags || []).join("\n");
  editMovieResources.value = (entry.resources || [])
    .map((resource) => [resource.type, resource.label, resource.url, resource.notes].map((part) => String(part || "").replace(/\s*\|\s*/g, " / ")).join(" | "))
    .join("\n");
}

function setSelectedOptions(select, values) {
  const keys = new Set((values || []).map(normalizeTagKey));
  for (const option of select.options) {
    option.selected = keys.has(normalizeTagKey(option.value));
  }
}

function collectCharacterEditorRecord() {
  const id = adminCharacterSelect.value;
  const existing = findCharacter(id) || {};
  const selectedRoleTags = selectedLabels(editTags).filter((tag) => ["Point", "Mid", "Anchor"].includes(tag));
  return normalizeCharacterRecord({
    id,
    name: editName.value.trim() || findCharacter(id)?.name || id,
    portrait: editPortrait.value.trim(),
    archetype: editArchetype.value.trim(),
    overview: editGameplan.value.trim(),
    roles: selectedRoleTags.length ? selectedRoleTags : existing.roles || [],
    tags: selectedValues(editTags),
    assistTags: selectedValues(editAssistTags),
    synergyTags: selectedValues(editSynergyTags),
    wants: linesFrom(editWants.value),
    strengths: linesFrom(editStrengths.value),
    weaknesses: linesFrom(editWeaknesses.value),
    bestPartners: selectedValues(editBestPartners),
    goodPartners: selectedValues(editGoodPartners),
    carePartners: selectedValues(editCarePartners),
    assistNotes: editAssistNotes.value.trim(),
    dhcNotes: editDhcNotes.value.trim(),
    matchups: linesFrom(editMatchups.value),
    community: linesFrom(editCommunity.value),
    metrics: Object.fromEntries(Object.keys(metricMeta).map((key) => [key, Number(document.querySelector(`#editMetric-${key}`).value)])),
  });
}

function collectTrainingEditorRecord() {
  const existing = effectiveTrainingModules().find((module) => module.id === adminTrainingSelect.value) || {};
  return normalizeTrainingModule({
    ...existing,
    title: editTrainingTitle.value.trim() || existing.title,
    category: editTrainingCategory.value.trim() || existing.category,
    summary: editTrainingSummary.value.trim(),
    deepDive: editTrainingDeepDive.value.trim(),
    keyTakeaways: linesFrom(editTrainingTakeaways.value),
    relatedTags: linesFrom(editTrainingTags.value),
    source: existing.source || "Admin Panel",
  });
}

function collectMovieEditorRecord() {
  const existing = effectiveMovieRoomEntries().find((entry) => entry.id === adminMovieSelect.value) || {};
  return normalizeMovieRoomEntry({
    ...existing,
    title: editMovieTitle.value.trim() || existing.title,
    scope: editMovieScope.value || existing.scope || "character",
    characterIds: linesFrom(editMovieCharacterIds.value),
    summary: editMovieSummary.value.trim(),
    tags: linesFrom(editMovieTags.value),
    resources: parseMovieResources(editMovieResources.value),
    sourceType: "manual",
    recommendationHooks: {
      ...(existing.recommendationHooks || {}),
      matchCharacterIds: linesFrom(editMovieCharacterIds.value),
      matchTags: linesFrom(editMovieTags.value),
    },
  });
}

function parseMovieResources(value) {
  return linesFrom(value).map((line) => {
    const [type = "Resource", label = "Study Link", url = "", ...notes] = line.split("|").map((part) => part.trim());
    return normalizeMovieResource({
      type,
      label,
      url,
      notes: notes.join(" | "),
    });
  });
}

function selectedValues(select) {
  return [...select.selectedOptions].map((option) => option.value);
}

function selectedLabels(select) {
  return [...select.selectedOptions].map((option) => option.textContent.trim());
}

function linesFrom(value) {
  return String(value || "")
    .split(/\n|;/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function saveEditorRecord(applyDirectly = false) {
  const record = collectCharacterEditorRecord();
  if (applyDirectly && canEditDirectly()) {
    adminDrafts.records[record.id] = record;
    applyCharacterRecord(record);
  } else if (canSuggest()) {
    adminDrafts.suggestions.push({
      id: crypto.randomUUID?.() || `${record.id}-${Date.now()}`,
      type: "character",
      characterId: record.id,
      role: currentRole,
      submittedAt: new Date().toISOString(),
      record,
    });
  }
  persistAdminDrafts();
  updateAdminExportOutput();
  rebuildKnowledgeGraph();
  render();
}

function saveTrainingEditorRecord(applyDirectly = false) {
  const record = collectTrainingEditorRecord();
  if (applyDirectly && canEditDirectly()) {
    adminDrafts.trainingModules[record.id] = record;
  } else if (canSuggest()) {
    adminDrafts.suggestions.push({
      id: crypto.randomUUID?.() || `${record.id}-${Date.now()}`,
      type: "trainingModule",
      moduleId: record.id,
      role: currentRole,
      submittedAt: new Date().toISOString(),
      record,
    });
  }
  persistAdminDrafts();
  populateKnowledgePlatformControls();
  populateAdminContentSelects();
  updateAdminExportOutput();
  rebuildKnowledgeGraph();
  render();
}

function saveMovieEditorRecord(applyDirectly = false) {
  const record = collectMovieEditorRecord();
  if (applyDirectly && canEditDirectly()) {
    adminDrafts.movieRoomEntries[record.id] = record;
  } else if (canSuggest()) {
    adminDrafts.suggestions.push({
      id: crypto.randomUUID?.() || `${record.id}-${Date.now()}`,
      type: "movieRoomEntry",
      entryId: record.id,
      role: currentRole,
      submittedAt: new Date().toISOString(),
      record,
    });
  }
  persistAdminDrafts();
  populateKnowledgePlatformControls();
  populateAdminContentSelects();
  updateAdminExportOutput();
  rebuildKnowledgeGraph();
  render();
}

function applyCharacterRecord(record) {
  const index = characters.findIndex((character) => character.id === record.id);
  if (index === -1) return;
  const existing = characters[index];
  characters[index] = normalizeCharacterRecord({ ...existing, ...record });
  team = team.map((member) => (member?.id === record.id ? characters[index] : member));
  if (selectedCharacter?.id === record.id) selectedCharacter = characters[index];
  if (selectedPageCharacter?.id === record.id) selectedPageCharacter = characters[index];
}

function hasAdminDraftContent() {
  return Boolean(
    Object.keys(adminDrafts.records || {}).length ||
      Object.keys(adminDrafts.trainingModules || {}).length ||
      Object.keys(adminDrafts.movieRoomEntries || {}).length ||
      (adminDrafts.suggestions || []).length
  );
}

function updateAdminExportOutput() {
  if (!adminExportOutput) return;
  adminExportOutput.value = JSON.stringify(
    {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      roles: roleDefinitions,
      files: {
        characterRecords: "public/data/dbfz/character-content.json",
        trainingModules: "public/data/dbfz/training-lab.json",
        movieRoomEntries: "public/data/dbfz/movie-room.json",
      },
      records: adminDrafts.records || {},
      trainingModules: adminDrafts.trainingModules || {},
      movieRoomEntries: adminDrafts.movieRoomEntries || {},
      suggestions: adminDrafts.suggestions || [],
    },
    null,
    2
  );
}

function starRating(value) {
  const filled = Math.max(0, Math.min(5, Math.round(Number(value || 0) / 2)));
  return `${"★".repeat(filled)}${"☆".repeat(5 - filled)}`;
}

function primaryAssistType(page) {
  const tags = page.assistTags || [];
  return (
    ["Beam Assist", "Lockdown Assist", "DP Assist", "Tracking Assist", "Neutral Assist", "Combo Extension"].find((tag) =>
      tagSetIncludes(tags, tag)
    ) || "Assist profile pending"
  );
}

function metricExplanation(key, value, picked = []) {
  const rounded = Math.round(Number(value || 0));
  const high = {
    damage: "strong routes, meter dump, or high cashout value.",
    neutral: "screen control, approach cover, or strong space contesting.",
    mix: "dangerous pressure, oki, or assist-backed guess structure.",
    support: "useful assists, DHC value, or stabilizing team utility.",
  };
  const mid = {
    damage: "solid reward, but not the only reason to pick the shell.",
    neutral: "workable neutral that still wants coverage in some matchups.",
    mix: "real threats, but usually needs assist timing or setup.",
    support: "some team value, but not elite glue by itself.",
  };
  const low = {
    damage: "reward may need routing, resources, or a stronger cashout partner.",
    neutral: "the team may need beam, tracking, or defensive cover.",
    mix: "offense may lean strike-throw or staggers more than true layered mix.",
    support: "assist and DHC utility need careful team planning.",
  };
  return rounded >= 8 ? high[key] : rounded >= 6 ? mid[key] : low[key];
}

function metricLeadCharacter(key, picked = []) {
  const leader = picked
    .filter(Boolean)
    .sort((a, b) => (b.metrics?.[key] || 0) - (a.metrics?.[key] || 0))[0];
  return leader ? `${leader.name}: ` : "";
}

function renderNoteStatus() {
  const polished = characters.filter((character) => character.status === "polished").length;
  const auto = characters.length - polished;
  noteStatus.textContent = `${polished} polished / ${auto} auto-cleaned`;
}

function partnerScore(base, partner) {
  let score = 0;
  for (const want of base.wants || []) {
    const lower = want.toLowerCase();
    if (lower.includes("neutral")) score += partner.metrics.neutral || 0;
    if (lower.includes("lockdown") || lower.includes("mix")) score += partner.metrics.support || 0;
    if (lower.includes("meter") || lower.includes("damage")) score += partner.metrics.damage || 0;
    if (lower.includes("defensive") || lower.includes("safety")) score += partner.metrics.support || 0;
    if (lower.includes("conversion")) score += (partner.metrics.neutral || 0) + (partner.metrics.support || 0);
  }
  score += (partner.metrics.support || 0) * 0.65;
  score += sharedRoleBonus(base, partner);
  return score;
}

function sharedRoleBonus(a, b) {
  const overlap = a.roles.filter((role) => b.roles.includes(role)).length;
  return overlap * 1.5;
}

function populateRoleFilter() {
  const roles = [...new Set(characters.flatMap((character) => character.roles || []))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  for (const role of roles) {
    const option = document.createElement("option");
    option.value = role;
    option.textContent = role;
    roleFilter.append(option);
  }
}

function populateTagFilter() {
  populateGroupedSelect(tagFilter, groupedFilterPresets.all);
  populateGroupedSelect(characterTagFilter, groupedFilterPresets.character);
  populateGroupedSelect(assistTagFilter, groupedFilterPresets.assist);
  populateGroupedSelect(synergyTagFilter, groupedFilterPresets.synergy);
  populateGroupedSelect(assistTypeFilter, ["Assist Type"]);
  populateGroupedSelect(rosterTagFilter, groupedFilterPresets.all);
  updateTagOptions();
}

function populateSelect(select, tags) {
  for (const tag of tags) {
    const option = document.createElement("option");
    option.value = tag.id;
    option.textContent = tag.label;
    select.append(option);
  }
}

function populateGroupedSelect(select, groupNames) {
  if (!select) return;
  const firstOption = select.querySelector("option");
  select.replaceChildren();
  if (firstOption) select.append(firstOption);
  for (const group of groupedFilterCategories.filter((category) => groupNames.includes(category.label))) {
    const optgroup = document.createElement("optgroup");
    optgroup.label = group.label;
    for (const tag of cleanTagList(group.tags)) {
      const option = document.createElement("option");
      option.value = tag;
      option.dataset.type = group.type;
      option.textContent = tag;
      optgroup.append(option);
    }
    select.append(optgroup);
  }
}

function populateKnowledgePlatformControls() {
  if (guideTemplateSelect) {
    const selected = guideTemplateSelect.value || "all";
    const categories = [
      ...new Set([
        ...effectiveTrainingModules().map((module) => module.category).filter(Boolean),
      ]),
    ].sort();
    guideTemplateSelect.innerHTML = `<option value="all">All topics</option>`;
    for (const category of categories) {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      guideTemplateSelect.append(option);
    }
    guideTemplateSelect.value = [...guideTemplateSelect.options].some((option) => option.value === selected) ? selected : "all";
  }

  if (movieTypeFilter) {
    const selected = movieTypeFilter.value || "all";
    const types = [
      ...new Set([
        ...(publicMovieRoomData.types || []),
        ...effectiveMovieRoomEntries().flatMap((entry) => (entry.resources || []).map((resource) => resource.type)),
      ].filter(Boolean)),
    ].sort();
    movieTypeFilter.innerHTML = `<option value="all">All footage</option>`;
    for (const type of types) {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      movieTypeFilter.append(option);
    }
    movieTypeFilter.value = [...movieTypeFilter.options].some((option) => option.value === selected) ? selected : "all";
  }

  if (videoCharacterFilter) {
    const selected = videoCharacterFilter.value || "all";
    const names = [
      ...new Set([
        ...characters.map((character) => character.name),
        ...(publicVideoData.videos || []).flatMap((video) => video.characters || []),
      ]),
    ].sort((a, b) => a.localeCompare(b));
    videoCharacterFilter.innerHTML = `<option value="all">Any character</option>`;
    for (const name of names) {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      videoCharacterFilter.append(option);
    }
    videoCharacterFilter.value = [...videoCharacterFilter.options].some((option) => option.value === selected) ? selected : "all";
  }

  if (videoTopicFilter) {
    const selected = videoTopicFilter.value || "all";
    const topics = [...new Set([...(publicVideoData.topics || []), ...(publicVideoData.videos || []).map((video) => video.topic)].filter(Boolean))].sort();
    videoTopicFilter.innerHTML = `<option value="all">Any topic</option>`;
    for (const topic of topics) {
      const option = document.createElement("option");
      option.value = topic;
      option.textContent = topic;
      videoTopicFilter.append(option);
    }
    videoTopicFilter.value = [...videoTopicFilter.options].some((option) => option.value === selected) ? selected : "all";
  }
}

function updateTagOptions() {
  const type = tagTypeFilter.value;
  for (const option of tagFilter.options) {
    if (option.value === "all") {
      option.hidden = false;
      continue;
    }
    option.hidden = type !== "all" && option.dataset.type !== type;
  }
  if (tagFilter.selectedOptions[0]?.hidden) tagFilter.value = "all";
}

function characterPageData(character) {
  const defaults = knowledgeDB.defaultCharacterPage || {};
  const page = knowledgeDB.characterPages?.[character.id] || {};
  const pdf = pdfCharacterRecord(character.id);
  const inferredTags = inferredCharacterTags(character);
  const assistRecords = publicAssistData.assists?.filter((assist) => assist.characterId === character.id || assist.character === character.name) || [];
  const assistOverrides = assistsFromRecords(assistRecords);
  const pdfAssists = pdfAssistsForPage(pdf);
  return {
    ...defaults,
    ...page,
    sourceNotes: pdf || null,
    overview: pdf?.characterIdentity?.oneSentenceSummary?.[0] || character.overview || page.overview || character.archetype || defaults.overview,
    assists: mergeAssists(mergeAssists(mergeAssists(defaults.assists || {}, page.assists || {}), pdfAssists), assistOverrides),
    positions: { ...(defaults.positions || {}), ...(page.positions || {}), ...pdfPositionsForPage(pdf) },
    synergies: [
      ...pdfSynergyNotes(pdf),
      ...(page.synergies || defaults.synergies || []),
      ...(character.dhcNotes ? [`DHC: ${character.dhcNotes}`] : []),
      ...(character.assistNotes ? [`Assist plan: ${character.assistNotes}`] : []),
    ],
    combos: page.combos || defaults.combos || [],
    matchups: character.matchups?.length ? character.matchups : page.matchups || defaults.matchups || [],
    community: [
      ...pdfVerdictNotes(pdf),
      ...(character.community?.length ? character.community : page.community || defaults.community || []),
    ],
    tags: cleanTagList([...(page.tags || []), ...(character.tags || []), ...(pdf?.characterIdentity?.primaryRoles || []), ...(pdf?.teamArchetypes || []), ...inferredTags]),
    assistTags: cleanTagList([...(page.assistTags || []), ...(character.assistTags || []), ...pdfAssistTags(pdf), ...assistRecords.flatMap((assist) => assist.tags || [])]),
    synergyTags: cleanTagList([...(page.synergyTags || []), ...(character.synergyTags || []), ...pdfSynergyTags(pdf), ...synergiesForCharacter(character).flatMap((entry) => entry.tags || [])]),
  };
}

function pdfAssistsForPage(record) {
  if (!record?.assistAnalysis) return {};
  return ["A", "B", "C"].reduce((assists, slot) => {
    const source = record.assistAnalysis[slot] || {};
    const summary = [
      ...(source.provides || []),
      ...(source.why || []).map((item) => `Why: ${item}`),
      ...(source.drawbacks || []).map((item) => `Drawback: ${item}`),
    ].join(" ");
    assists[slot] = {
      summary: summary || "Assist notes pending in the source PDF.",
      provides: source.provides || [],
      bestFor: source.bestFor || [],
      why: source.why || [],
      drawbacks: source.drawbacks || [],
      tags: cleanTagList(source.tags || source.provides || []),
      bestPartners: source.bestPartners || [],
      weakPartners: source.weakPartners || [],
    };
    return assists;
  }, {});
}

function pdfPositionsForPage(record) {
  if (!record?.teamPlacement) return {};
  const placement = record.teamPlacement;
  return {
    point: placement.point?.join(" ") || "",
    mid: placement.mid?.join(" ") || "",
    anchor: placement.anchor?.join(" ") || "",
    preferred: [...(placement.preferredPosition || []), ...(placement.explanation || [])].join(" "),
  };
}

function pdfSynergyNotes(record) {
  if (!record) return [];
  const archetypes = (record.bestTeamArchetypes || []).flatMap((entry) => [
    `${entry.name}: ${(entry.whyItWorks || []).join(" ")}`,
    ...(entry.exampleTeams || []).map((team) => `Example team: ${team}`),
  ]);
  const wins = [
    ...(record.winConditions?.primary || []).map((item) => `Primary win condition: ${item}`),
    ...(record.winConditions?.secondary || []).map((item) => `Secondary win condition: ${item}`),
    ...(record.winConditions?.lateGame || []).map((item) => `Late-game win condition: ${item}`),
  ];
  return [...archetypes, ...wins].filter(Boolean);
}

function pdfVerdictNotes(record) {
  if (!record) return [];
  return [
    ...(record.whyPick || []).map((item) => `Why pick: ${item}`),
    ...(record.whyAvoid || []).map((item) => `Why avoid: ${item}`),
    ...(record.finalVerdict || []).map((item) => `Final verdict: ${item}`),
    record.source ? `Source: ${record.source}, pages ${record.sourcePageStart}-${record.sourcePageEnd}.` : "",
  ].filter(Boolean);
}

function assistsFromRecords(records) {
  return records.reduce((result, record) => {
    const slot = String(record.assist || "").toUpperCase();
    if (!["A", "B", "C"].includes(slot)) return result;
    result[slot] = {
      summary: record.notes || "Assist details ready for admin notes.",
      provides: record.provides || [],
      bestFor: record.bestFor || [],
      why: record.why || (record.notes ? [record.notes] : []),
      startup: record.startup ?? null,
      blockstun: record.blockstun ?? null,
      hitstun: record.hitstun ?? null,
      tags: cleanTagList(record.tags || []),
    };
    return result;
  }, {});
}

function synergiesForCharacter(character) {
  return (publicSynergyData.relationships || []).filter((entry) => {
    return [entry.characterAId, entry.characterBId, entry.characterA, entry.characterB].includes(character.id) ||
      [entry.characterA, entry.characterB].includes(character.name);
  });
}

function mergeAssists(base, override) {
  return ["A", "B", "C"].reduce((merged, slot) => {
    merged[slot] = { ...(base[slot] || {}), ...(override[slot] || {}) };
    merged[slot].provides = [...arrayFrom(base[slot]?.provides), ...arrayFrom(override[slot]?.provides)];
    merged[slot].bestFor = [...arrayFrom(base[slot]?.bestFor), ...arrayFrom(override[slot]?.bestFor)];
    merged[slot].why = [...arrayFrom(base[slot]?.why), ...arrayFrom(override[slot]?.why)];
    merged[slot].drawbacks = [...arrayFrom(base[slot]?.drawbacks), ...arrayFrom(override[slot]?.drawbacks)];
    merged[slot].tags = cleanTagList([...(base[slot]?.tags || []), ...(override[slot]?.tags || [])]);
    return merged;
  }, {});
}

function inferredCharacterTags(character) {
  const roleText = `${character.roles.join(" ")} ${character.wants.join(" ")} ${character.archetype}`.toLowerCase();
  const tags = (knowledgeDB.tagRules?.character || [])
    .filter((rule) => (rule.matchAny || []).some((term) => roleText.includes(term)))
    .map((rule) => rule.tag);
  for (const rule of knowledgeDB.tagRules?.metrics || []) {
    const value = character.metrics?.[rule.metric];
    if (rule.min !== undefined && value >= rule.min) tags.push(rule.tag);
    if (rule.max !== undefined && value <= rule.max) tags.push(rule.tag);
  }
  return [...new Set(tags)];
}

function allPageTags(page) {
  return cleanTagList([...(page.tags || []), ...(page.assistTags || []), ...(page.synergyTags || [])]);
}

function visiblePageTags(page, limit = 9) {
  return allPageTags(page)
    .filter((tag) => {
      const label = tagLabel(tag);
      return (
        label.length <= 28 &&
        !/(characters that|characters this|allows teams|stronger rewards|neutral wins|meter-efficient|why allows|dhing|dhcing)/i.test(label)
      );
    })
    .slice(0, limit);
}

function filterablePageTags(character, page = characterPageData(character)) {
  return cleanTagList([
    ...allPageTags(page),
    ...(character?.roles || []),
  ]);
}

function relationshipFilterTags(relationship) {
  const characterA = findCharacterByName(relationship.characterA);
  const characterB = findCharacterByName(relationship.characterB);
  return cleanTagList([
    ...(relationship.tags || []),
    ...(characterA ? filterablePageTags(characterA) : []),
    ...(characterB ? filterablePageTags(characterB) : []),
  ]);
}

function tagsForType(page, type, character = null) {
  if (type === "character") return cleanTagList([...(page.tags || []), ...(character?.roles || [])]);
  if (type === "assist") return cleanTagList(page.assistTags || []);
  if (type === "synergy") return cleanTagList(page.synergyTags || []);
  return character ? filterablePageTags(character, page) : allPageTags(page);
}

function tagLabel(id) {
  const allTags = Object.values(knowledgeDB.tagCatalog || {}).flat();
  const normalized = normalizeTagValue(id) || String(id).replaceAll("-", " ");
  return allTags.find((tag) => normalizeTagKey(tag.id) === normalizeTagKey(normalized))?.label || normalized;
}

function graphPill(type, id, label = null) {
  if (type === "tag") {
    const cleanId = normalizeTagValue(id);
    if (!cleanId) return "";
    id = cleanId;
    label = label ? normalizeTagValue(label) || cleanId : cleanId;
  }
  const nodeId = graphNodeIdFromParts(type, id);
  return `<button class="graph-pill" type="button" data-graph-open="${nodeId}">${label || tagLabel(id)}</button>`;
}

function tagSetIncludes(tags, tag) {
  const targetKeys = tagKeyVariants(tag);
  return tags.some((item) => tagKeyVariants(item).some((key) => targetKeys.includes(key)));
}

function tagKeyVariants(tag) {
  const key = normalizeTagKey(tag);
  if (!key) return [];
  const variants = new Set([key]);
  if (key.endsWith("-assist")) variants.add(key.replace(/-assist$/, ""));
  variants.add(`${key}-assist`);
  if (key === "neutral-control") variants.add("neutral");
  if (key === "high-damage") variants.add("damage");
  if (key === "reliable-confirms") variants.add("combo-extension");
  if (key === "easy-gameplan") variants.add("beginner-friendly");
  if (key === "meter-build") variants.add("battery");
  if (key === "corner-carry") variants.add("carry");
  return [...variants];
}

function normalizeTagKey(tag) {
  return String(tag || "")
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function blockstunQuery(query) {
  const match = query.match(/(\d+)\s*\+\s*blockstun|blockstun\D+(\d+)/);
  return match ? Number(match[1] || match[2]) : null;
}

function hasAssistBlockstun(page, minimum) {
  return Object.values(page.assists || {}).some((assist) => Number(assist.blockstun) >= minimum);
}

async function frameRowsFor(character) {
  if (frameDataCache[character.id]) return frameDataCache[character.id];

  const record = publicCharacterIndex.characters?.find((item) => item.id === character.id);
  const path = normalizeDataPath(record?.frameDataPath || `/public/data/dbfz/frame-data/${character.id}.json`);
  const generated = await fetchJSON(path);
  const rows = generated?.moves || frameDataDB.characters?.[character.id]?.moves || [];
  frameDataCache[character.id] = rows.map(normalizeFrameRow).filter((row) => row.move && row.move.toLowerCase() !== "input");
  return frameDataCache[character.id];
}

function normalizeDataPath(path) {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  if (location.protocol === "file:") return path.replace(/^\/+/, "");
  return window.FG_LAB_ASSET_PATH?.(path) || (path.startsWith("/") ? path : `/${path}`);
}

function compareFrameRows(a, b) {
  const direction = frameSort.direction === "asc" ? 1 : -1;
  if (frameSort.key === "category") {
    const group = a.categoryOrder - b.categoryOrder || a.moveOrder - b.moveOrder;
    if (group !== 0) return group;
    return String(a.move || "").localeCompare(String(b.move || ""));
  }
  const av = sortableFrameValue(a[frameSort.key]);
  const bv = sortableFrameValue(b[frameSort.key]);
  if (av < bv) return -1 * direction;
  if (av > bv) return 1 * direction;
  return String(a.move || "").localeCompare(String(b.move || ""));
}

function normalizeFrameRow(row) {
  const move = row.move || row.name || "";
  const category = classifyMove(move, row);
  return {
    move,
    categoryKey: category.key,
    category: category.label,
    categoryOrder: category.order,
    moveOrder: moveOrder(move),
    description: moveDescription(move, category.key),
    damage: row.damage || "",
    startup: row.startup || "",
    active: row.active || "",
    recovery: row.recovery || "",
    blockAdvantage: row.blockAdvantage || row.advantageOnBlock || "",
    hitAdvantage: row.hitAdvantage || row.advantageOnHit || "",
    invulnerability: row.invulnerability || "",
    notes: row.notes || "",
  };
}

function classifyMove(move, row = {}) {
  const input = String(move || "").trim().toLowerCase();
  const text = `${input} ${row.notes || ""}`.toLowerCase();
  if (/level\s*3|lvl\s*3|meteor|214h\+s|236h\+s/.test(text)) return { key: "supers", label: "Supers", order: 70 };
  if (/level\s*1|lvl\s*1|super|236l\+m|236m\+h|214l\+m|214m\+h/.test(text)) return { key: "supers", label: input.startsWith("j.") ? "Air Supers" : "Supers", order: 70 };
  if (/^(236|qcf)/.test(input) || input.includes("236")) return { key: "qcf", label: "QCF Specials", order: 40 };
  if (/^(214|qcb)/.test(input) || input.includes("214")) return { key: "qcb", label: "QCB Specials", order: 50 };
  if (/^[2-9]?l|^j\.l|^5ll/.test(input)) return { key: "lights", label: "Light Attacks", order: 10 };
  if (/^[2-9]?m|^j\.m/.test(input)) return { key: "mediums", label: "Medium Attacks", order: 20 };
  if (/^[2-9]?h|^j\.h/.test(input)) return { key: "heavies", label: "Heavy Attacks", order: 30 };
  if (/[23698741][lmhs]|dragon|grab|beam|ball|rekka|special/.test(text)) return { key: "other-specials", label: "Other Specials", order: 60 };
  return { key: "other-specials", label: "Other Moves", order: 65 };
}

function moveDescription(move, categoryKey) {
  const input = String(move || "").toLowerCase();
  if (categoryKey === "qcf") return input.startsWith("j.") ? "Air quarter-circle-forward special" : "Quarter-circle-forward special";
  if (categoryKey === "qcb") return input.startsWith("j.") ? "Air quarter-circle-back special" : "Quarter-circle-back special";
  if (categoryKey === "supers") {
    if (input.startsWith("j.")) return input.includes("214") ? "Air Level 1 / reverse super route" : "Air Level 1 / super route";
    if (input.includes("214h+s") || input.includes("236h+s")) return "Level 3 super";
    return "Level 1 / super route";
  }
  if (categoryKey === "lights") return input.startsWith("j.") ? "Air light normal" : "Light normal";
  if (categoryKey === "mediums") return input.startsWith("j.") ? "Air medium normal" : "Medium normal";
  if (categoryKey === "heavies") return input.startsWith("j.") ? "Air heavy normal" : "Heavy normal";
  return "Special / unique move";
}

function moveOrder(move) {
  const input = String(move || "").toLowerCase();
  if (input.startsWith("j.")) return 90 + sortableFrameValue(input);
  const number = Number(input.match(/^\d+/)?.[0] || 50);
  const button = input.includes("l") ? 1 : input.includes("m") ? 2 : input.includes("h") ? 3 : input.includes("s") ? 4 : 5;
  return number * 10 + button;
}

function sortableFrameValue(value) {
  if (value === null || value === undefined || value === "") return Number.POSITIVE_INFINITY;
  const number = Number(String(value).match(/-?\d+/)?.[0]);
  return Number.isNaN(number) ? String(value).toLowerCase() : number;
}

function applyHeroAsset() {
  const hero = assetManifest.backgrounds?.hero || "assets/backgrounds/background.webp";
  document.documentElement.style.setProperty("--hero-image", `url("${hero}")`);
}

function characterAsset(character) {
  if (character.portrait) return character.portrait;
  return (
    assetManifest.characters?.[character.id]?.portrait ||
    `public/characters/raw/${fileAliases[character.id] || `${character.id}.png`}`
  );
}

function paintArt(element, character) {
  const image = characterAsset(character);
  element.textContent = "";
  element.style.setProperty("--fighter-color", character.color || "var(--gold)");
  element.style.backgroundImage = `url("${image}")`;
}

function personalBars(character) {
  return `
    <div class="personal-bars">
      ${Object.entries(metricMeta)
        .map(([key, meta]) => {
          const value = Math.round(character.metrics?.[key] || 0);
          return `<span title="${meta.label}: ${value}/10"><i style="width:${value * 10}%;background:${meta.color}"></i></span>`;
        })
        .join("")}
    </div>
  `;
}

function textPanel(title, copy) {
  const panel = document.createElement("div");
  panel.className = "text-panel";
  panel.innerHTML = `<strong>${title}</strong><p>${copy}</p>`;
  return panel;
}

function topicLine(title, copy) {
  return `<section class="topic-line"><strong>${title}</strong><p>${copy}</p></section>`;
}

function findCuratedByName(name) {
  const normalized = name.toLowerCase();
  return Object.values(curated).find((entry) => {
    return entry.name.toLowerCase() === normalized || entry.aliases?.some((alias) => normalized.includes(alias));
  });
}

function findCharacter(id) {
  return characters.find((character) => character.id === id);
}

function hasTeam(ids) {
  const current = team.filter(Boolean).map((character) => character.id);
  return ids.every((id) => current.includes(id));
}

function recommendedOrderText() {
  const picked = team.filter(Boolean);
  if (picked.length < 3) return `<strong>Recommended Order</strong><p>Pick three fighters to see suggested order and why it helps.</p>`;
  const ordered = [...picked].sort((a, b) => orderScore(b) - orderScore(a));
  return `
    <strong>Recommended Order</strong>
    <p>${ordered.map((character) => character.name).join(" → ")}</p>
    <span>${orderReason(ordered)}</span>
  `;
}

function orderReason(ordered) {
  const [first, second, third] = ordered;
  return `${first.name} handles early neutral, ${second.name} stabilizes coverage, and ${third.name} saves the best cashout/support value.`;
}

function teamGrade(picked) {
  if (!picked.length) return { label: "--", caption: "Pick fighters to score the shell." };
  const totals = metricTotals(picked);
  const average = Object.values(totals).reduce((sum, value) => sum + value, 0) / (picked.length * 4);
  if (average >= 8.8) return { label: "S+", caption: "Excellent shell balance." };
  if (average >= 8.1) return { label: "S", caption: "Strong synergy profile." };
  if (average >= 7.4) return { label: "A", caption: "Solid team with clear identity." };
  if (average >= 6.6) return { label: "B", caption: "Playable, but needs coverage." };
  return { label: "C", caption: "Needs a stronger team plan." };
}

function orderScore(character) {
  return (character.metrics.neutral || 0) * 1.15 + (character.metrics.mix || 0) * 0.8 - (character.metrics.support || 0) * 0.25;
}

function strongestMetric(picked) {
  const totals = metricTotals(picked);
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}

function weakestMetric(picked) {
  const totals = metricTotals(picked);
  return Object.entries(totals).sort((a, b) => a[1] - b[1])[0][0];
}

function metricTotals(picked) {
  const totals = { damage: 0, neutral: 0, mix: 0, support: 0 };
  for (const character of picked) {
    for (const key of Object.keys(totals)) totals[key] += character.metrics?.[key] || 0;
  }
  return totals;
}

function shortArchetype(character) {
  return character.roles.slice(0, 3).join(" / ") || character.archetype;
}

function characterTags(character) {
  return [...new Set([...(character.roles || []), ...(character.wants || []).slice(0, 2)])].slice(0, 6);
}

function shortName(name) {
  return name.replace("Android ", "A").replace("Super Saiyan", "SS").replace(/\s*\([^)]*\)/g, "");
}

function initials(name) {
  return name
    .replace(/\([^)]*\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function colorFromName(name) {
  let hash = 0;
  for (const char of name) hash = char.charCodeAt(0) + ((hash << 5) - hash);
  const palette = ["#ff6b35", "#ffd166", "#83d483", "#58c7f3", "#e55d75", "#c9a7ff"];
  return palette[Math.abs(hash) % palette.length];
}

function setNavOpen(open) {
  document.body.classList.toggle("nav-open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  if (navBackdrop) navBackdrop.hidden = !open;
}

function applyFrameViewMode() {
  const mode = frameViewMode?.value || "auto";
  if (frameCard) frameCard.dataset.view = mode;
  document.body.classList.toggle("frame-card-view", mode === "cards");
}

function setMobilePreview(enabled) {
  document.body.classList.toggle("mobile-preview", enabled);
  mobilePreviewToggle?.setAttribute("aria-pressed", String(enabled));
  if (mobilePreviewToggle) mobilePreviewToggle.textContent = enabled ? "Desktop View" : "Mobile Preview";
  localStorage.removeItem("dbfz-team-lab-mobile-preview");
  setNavOpen(false);
}

document.querySelector("#resetTeam").addEventListener("click", () => {
  team = [null, null, null];
  selectedCharacter = null;
  saveState();
  render();
});

search.addEventListener("input", renderRoster);
filter.addEventListener("change", renderRoster);
roleFilter.addEventListener("change", renderRoster);
metricFilter.addEventListener("change", renderRoster);
assistTypeFilter.addEventListener("change", renderRoster);
rosterTagFilter.addEventListener("change", renderRoster);
characterSearch.addEventListener("input", renderCharacterDatabase);
tagTypeFilter.addEventListener("change", () => {
  updateTagOptions();
  renderCharacterDatabase();
});
tagFilter.addEventListener("change", renderCharacterDatabase);
frameSearch.addEventListener("input", () => renderCharacterPage());
frameGroupFilter.addEventListener("change", () => {
  frameSort = { key: "category", direction: "asc" };
  renderCharacterPage();
});
frameViewMode.addEventListener("change", applyFrameViewMode);
synergySearch.addEventListener("input", renderSynergyDatabase);
characterTagFilter.addEventListener("change", renderSynergyDatabase);
assistTagFilter.addEventListener("change", renderSynergyDatabase);
synergyTagFilter.addEventListener("change", renderSynergyDatabase);
minBlockstunFilter.addEventListener("change", renderSynergyDatabase);
playstyleSearch.addEventListener("input", renderPlaystyleTeams);
graphSearch.addEventListener("input", renderKnowledgeGraph);
graphTypeFilter.addEventListener("change", renderKnowledgeGraph);
guideSearch.addEventListener("input", renderGuides);
guideTemplateSelect.addEventListener("change", renderGuides);
movieSearch.addEventListener("input", renderMovieRoom);
movieScopeFilter.addEventListener("change", () => {
  movieRoomSelectedIds = [];
  renderMovieRoom();
});
movieCharacterPicker.addEventListener("change", () => {
  movieRoomSelectedIds = movieCharacterPicker.value ? [movieCharacterPicker.value] : [];
  renderMovieRoom();
});
movieTeamPicker.addEventListener("click", (event) => {
  const button = event.target.closest("[data-movie-toggle]");
  if (!button) return;
  const id = button.dataset.movieToggle;
  const max = movieScopeFilter.value === "shell" ? 2 : movieScopeFilter.value === "team" ? 3 : 1;
  if (movieRoomSelectedIds.includes(id)) {
    movieRoomSelectedIds = movieRoomSelectedIds.filter((current) => current !== id);
  } else {
    movieRoomSelectedIds = [...movieRoomSelectedIds, id].slice(-max);
  }
  renderMovieRoom();
});
movieEditTeam.addEventListener("click", () => {
  activeView = "team";
  setActiveNav("Team Builder");
  render();
});
movieTypeFilter.addEventListener("change", renderMovieRoom);
videoSearch.addEventListener("input", renderVideoLibrary);
videoCharacterFilter.addEventListener("change", renderVideoLibrary);
videoTopicFilter.addEventListener("change", renderVideoLibrary);
modalClose.addEventListener("click", closeCharacterModal);
modalBackdrop.addEventListener("click", closeCharacterModal);
adminRoleSelect.addEventListener("change", () => {
  currentRole = adminRoleSelect.value;
  localStorage.setItem(roleKey, currentRole);
  render();
});
adminCharacterSelect.addEventListener("change", () => {
  selectedPageCharacter = findCharacter(adminCharacterSelect.value) || selectedPageCharacter;
  renderAdminPanel();
});
adminTrainingSelect.addEventListener("change", fillTrainingEditor);
adminMovieSelect.addEventListener("change", fillMovieEditor);
saveCharacterDraft.addEventListener("click", () => saveEditorRecord(false));
publishCharacterDraft.addEventListener("click", () => saveEditorRecord(true));
saveTrainingDraft.addEventListener("click", () => saveTrainingEditorRecord(false));
publishTrainingDraft.addEventListener("click", () => saveTrainingEditorRecord(true));
saveMovieDraft.addEventListener("click", () => saveMovieEditorRecord(false));
publishMovieDraft.addEventListener("click", () => saveMovieEditorRecord(true));
exportAdminData.addEventListener("click", updateAdminExportOutput);
clearAdminDrafts.addEventListener("click", () => {
  adminDrafts = { records: {}, trainingModules: {}, movieRoomEntries: {}, suggestions: [] };
  persistAdminDrafts();
  localStorage.removeItem(adminDraftKey);
  updateAdminExportOutput();
  render();
});
document.querySelectorAll(".frame-table th[data-sort]").forEach((header) => {
  header.addEventListener("click", () => {
    const key = header.dataset.sort;
    frameSort = {
      key,
      direction: frameSort.key === key && frameSort.direction === "asc" ? "desc" : "asc",
    };
    renderCharacterPage();
  });
});
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelectorAll(".main-nav a").forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    const navTarget = link.textContent.trim().toLowerCase();
    activeView =
      navTarget === "characters"
        ? "characters"
        : navTarget === "training lab"
          ? "training"
          : navTarget === "knowledge map"
            ? "knowledge"
            : navTarget === "playstyle teams"
            ? "playstyles"
            : navTarget === "videos"
              ? "videos"
              : adminPanelEnabled && navTarget === "admin"
                ? "admin"
                : "team";
    setNavOpen(false);
    render();
  });
});
document.addEventListener("click", (event) => {
  const graphButton = event.target.closest("[data-graph-open]");
  if (!graphButton) return;
  event.preventDefault();
  event.stopPropagation();
  openGraphNode(graphButton.dataset.graphOpen);
});
menuToggle.addEventListener("click", () => setNavOpen(!document.body.classList.contains("nav-open")));
navBackdrop.addEventListener("click", () => setNavOpen(false));
mobilePreviewToggle.addEventListener("click", () => setMobilePreview(!document.body.classList.contains("mobile-preview")));
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (!characterModal.hidden) closeCharacterModal();
  else if (document.body.classList.contains("nav-open")) setNavOpen(false);
  else if (document.body.classList.contains("mobile-preview")) setMobilePreview(false);
});

window.DBFZ_TEAM_LAB = {
  setView(view) {
    const allowedViews = new Set(["team", "characters", "playstyles", "knowledge", "training", "videos"]);
    activeView = allowedViews.has(view) ? view : "team";
    const labels = {
      team: "Team Builder",
      characters: "Characters",
      playstyles: "Playstyle Teams",
      knowledge: "Knowledge Map",
      training: "Training Lab",
      videos: "Videos",
    };
    setActiveNav(labels[activeView]);
    setNavOpen(false);
    closeCharacterModal();
    if (characters.length) render();
    else renderView();
  },
};

applyFrameViewMode();
setMobilePreview(false);

init().catch((error) => {
  console.error(error);
  roster.textContent = "Could not load character data.";
});
