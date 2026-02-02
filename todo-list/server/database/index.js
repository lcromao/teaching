const fs = require("node:fs");
const path = require("node:path");

const DATABASE_FILE = path.join(__dirname, "db.json");

function createEmptyDatabase() {
  return {
    lastUserId: 0,
    lastTaskId: 0,
    users: [],
    tasks: [],
  };
}

function ensureDatabaseFile() {
  if (!fs.existsSync(__dirname)) {
    fs.mkdirSync(__dirname, { recursive: true });
  }

  if (!fs.existsSync(DATABASE_FILE)) {
    fs.writeFileSync(DATABASE_FILE, JSON.stringify(createEmptyDatabase(), null, 2));
  }
}

function sanitizeDatabase(data) {
  return {
    lastUserId: Number.isInteger(data.lastUserId) ? data.lastUserId : 0,
    lastTaskId: Number.isInteger(data.lastTaskId) ? data.lastTaskId : 0,
    users: Array.isArray(data.users) ? data.users : [],
    tasks: Array.isArray(data.tasks) ? data.tasks : [],
  };
}

function loadDatabase() {
  ensureDatabaseFile();
  const raw = fs.readFileSync(DATABASE_FILE, "utf8").trim();

  if (!raw) {
    return createEmptyDatabase();
  }

  try {
    const parsed = JSON.parse(raw);
    return sanitizeDatabase(parsed);
  } catch (_error) {
    const fallback = createEmptyDatabase();
    saveDatabase(fallback);
    return fallback;
  }
}

function saveDatabase(db) {
  fs.writeFileSync(DATABASE_FILE, JSON.stringify(sanitizeDatabase(db), null, 2));
}

function getNextId(items, idKey, lastIdValue) {
  const maxExisting = items.reduce((maxValue, item) => {
    const id = Number.isInteger(item[idKey]) ? item[idKey] : 0;
    return Math.max(maxValue, id);
  }, 0);
  return Math.max(maxExisting, lastIdValue) + 1;
}

module.exports = {
  DATABASE_FILE,
  createEmptyDatabase,
  ensureDatabaseFile,
  loadDatabase,
  saveDatabase,
  getNextId,
};
