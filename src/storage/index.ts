// storage.ts
import { initDb } from "../database/db";
import { PhoneBookEntry, IStorageEngine } from "../interfaces";
import { SQLiteStorageEngine } from "../database/sqliteEngine";
import { JSONStorageEngine } from "../database/jsonEngine";
require("dotenv").config();

let storageEngine: IStorageEngine;

export async function initStorageEngine() {
  if (process.env.STORAGE_ENGINE === "json") {
    storageEngine = new JSONStorageEngine();
  } else {
    storageEngine = new SQLiteStorageEngine();
    await initDb();
  }
}

export async function load(): Promise<PhoneBookEntry[]> {
  return storageEngine.load();
}

export async function save(phoneEntry: PhoneBookEntry): Promise<void> {
  return storageEngine.save(phoneEntry);
}
