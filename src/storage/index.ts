// storage.ts
import { PhoneBookEntry, IStorageEngine } from "../interfaces";
import { SQLiteStorageEngine } from "../database/sqliteEngine";
import { JSONStorageEngine } from "../database/jsonEngine";
import {engineAndPath} from "../main" 


// require("dotenv").config();

let storageEngine: IStorageEngine;

export async function initStorageEngine() {
  switch (engineAndPath.engine) {
    case "json":
      storageEngine = new JSONStorageEngine();
      break;
    case "sqlite":
      storageEngine = new SQLiteStorageEngine();
      break;
  }
  storageEngine.init();
}

export async function load(): Promise<PhoneBookEntry[]> {
  return await storageEngine.load();
}

export async function save(phoneEntry: PhoneBookEntry): Promise<void> {
  return await storageEngine.save(phoneEntry);
}

export async function find(
  type: string,
  entry: string
): Promise<PhoneBookEntry | null> {
  return await storageEngine.find(type, entry);
}
