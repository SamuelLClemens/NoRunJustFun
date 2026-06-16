// Minimal, lazy IndexedDB wrapper for media too large for the single localStorage
// store — specifically the journal's voice recordings (Blobs). It is opened ON DEMAND
// (the journal screen is itself dynamically imported only when first opened), so it
// adds nothing to the app's boot path. One database, one object store of Blobs keyed
// by a string. Everything stays on this device; nothing is ever transmitted.

const DB_NAME = 'nrjf-media';
const STORE = 'journalAudio';
const DB_VERSION = 1;
let _dbp = null;

function openDB() {
  if (_dbp) return _dbp;
  _dbp = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') { reject(new Error('IndexedDB unavailable')); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
  });
  return _dbp;
}

function run(mode, fn) {
  return openDB().then((db) => new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const req = fn(t.objectStore(STORE));
    t.oncomplete = () => resolve(req ? req.result : undefined);
    t.onerror = () => reject(t.error);
    t.onabort = () => reject(t.error);
  }));
}

export function putAudio(key, blob) { return run('readwrite', (st) => st.put(blob, key)); }
export function getAudio(key) { return run('readonly', (st) => st.get(key)); }
export function deleteAudio(key) { return run('readwrite', (st) => st.delete(key)); }

// Wipe all journal audio — used by the "Reset everything" control so a reset clears the
// IndexedDB media store too, not just localStorage. Resolves quietly if IDB is absent.
export function clearAllAudio() {
  return openDB().then((db) => new Promise((resolve) => {
    try {
      const t = db.transaction(STORE, 'readwrite');
      t.objectStore(STORE).clear();
      t.oncomplete = () => resolve(true);
      t.onerror = () => resolve(false);
    } catch { resolve(false); }
  })).catch(() => false);
}
