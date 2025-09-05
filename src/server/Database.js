const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./monefy.db", (err) => {
  if (err) {
    console.error(" Erreur connexion DB:", err.message);
  } else {
    console.log(" Connecté à SQLite (monefy.db)");
  }
});

// Création de la table users si elle n’existe pas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
});

module.exports = db;
