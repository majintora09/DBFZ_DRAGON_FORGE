const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");
const basePath = "/";
const twoXkoCharacters = ["ahri", "akali", "blitzcrank", "braum", "caitlyn", "darius", "ekko", "illaoi", "jinx", "senna", "teemo", "thresh", "vi", "warwick", "yasuo"];
const routes = [
  "/roadmap",
  "/games/dbfz",
  "/games/dbfz/team-builder",
  "/games/dbfz/characters",
  "/games/dbfz/synergies",
  "/games/dbfz/routes",
  "/games/dbfz/playstyles",
  "/games/dbfz/knowledge-map",
  "/games/dbfz/training-lab",
  "/games/dbfz/videos",
  "/games/2xko",
  "/games/2xko/characters",
  "/games/2xko/team-builder",
  "/games/2xko/fuses",
  "/games/2xko/synergies",
  "/games/2xko/routes",
  "/games/2xko/research-vault",
  "/games/2xko/knowledge-sources",
  "/games/2xko/tournament-evidence",
  ...twoXkoCharacters.map((id) => `/games/2xko/characters/${id}`),
];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

copyFiles(["styles.css", "research-vault.css", "app.js", "platform.js", "synergy-engine.js", "research-vault.js", "knowledge-ingestion.js", "tournament-evidence.js", "_redirects"]);
copyTree("data", "data", (source) => !source.endsWith(".md") && !isLocalTwoXkoResearchNote(source));
copyTree("assets/backgrounds", "assets/backgrounds");
copyTree("assets/games", "assets/games");
copyFiles(["assets/manifest.js"]);
copyTree("public/characters/portraits", "public/characters/portraits");
copyTree("public/data", "public/data", (source) => !source.includes(`${path.sep}Impro${path.sep}`) && !source.endsWith(".pdf"));

const sourceHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const builtHtml = sourceHtml.replaceAll("__FG_LAB_BASE_PATH__", basePath);
writeFile("index.html", builtHtml);

for (const route of routes) {
  writeFile(path.join(route.replace(/^\//, ""), "index.html"), builtHtml);
}

writeFile("build-info.json", `${JSON.stringify({ basePath, routes, generatedAt: new Date().toISOString() }, null, 2)}\n`);

console.log(`Static build complete: ${path.relative(root, output)}`);
console.log(`Base path: ${basePath}`);
console.log(`Generated routes: ${routes.length}`);

function copyFiles(files) {
  for (const relativePath of files) {
    const source = path.join(root, relativePath);
    if (!fs.existsSync(source)) continue;
    const destination = path.join(output, relativePath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  }
}

function copyTree(sourceRelative, destinationRelative, include = () => true) {
  const sourceRoot = path.join(root, sourceRelative);
  if (!fs.existsSync(sourceRoot)) return;
  for (const entry of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
    const source = path.join(sourceRoot, entry.name);
    const destination = path.join(output, destinationRelative, entry.name);
    if (!include(source)) continue;
    if (entry.isDirectory()) {
      copyDirectory(source, destination, include);
    } else {
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(source, destination);
    }
  }
}

function copyDirectory(source, destination, include) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const nextSource = path.join(source, entry.name);
    const nextDestination = path.join(destination, entry.name);
    if (!include(nextSource)) continue;
    if (entry.isDirectory()) copyDirectory(nextSource, nextDestination, include);
    else {
      fs.mkdirSync(path.dirname(nextDestination), { recursive: true });
      fs.copyFileSync(nextSource, nextDestination);
    }
  }
}

function isLocalTwoXkoResearchNote(source) {
  return source.includes(`${path.sep}data${path.sep}games${path.sep}2xko${path.sep}research${path.sep}`) && source.endsWith(".txt");
}

function writeFile(relativePath, content) {
  const destination = path.join(output, relativePath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content);
}
