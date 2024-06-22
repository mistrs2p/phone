import sqlite3 from "sqlite3";
import { readFileSync } from "fs";
import { join } from "path";
import {engineAndPath} from "../main" 

export async function openDb() {
  return new sqlite3.Database(engineAndPath.path);
}

export async function initDb() {
  const sqlFilePath = join(__dirname, "database.sql");
  console.log(sqlFilePath)
  const sqlContent = readFileSync(sqlFilePath, "utf8");
  const db = await openDb();
  db.serialize(() => {
    db.run(sqlContent, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("\nPhonebook table created or already exists.");
      }
    });
  });

  return db;
}
