import sqlite3 from "sqlite3";

export async function openDb() {
  return new sqlite3.Database("phonebook.db");
}

export async function initDb() {
  const db = await openDb();
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS phonebook (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phoneNumber TEXT NOT NULL UNIQUE
      )
    `,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("\nPhonebook table created or already exists.");
        }
      }
    );
  });

  return db;
}
