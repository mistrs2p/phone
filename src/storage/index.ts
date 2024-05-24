// storage.ts
import { PhoneBookEntry } from "../interfaces/inedx";
import { initDb } from "../database/db";
import { IStorageEngine, IPhoneBookLookup } from "../interfaces/inedx";
import { SQLiteStorageEngine } from "../database/sqliteEngine";
import { JSONStorageEngine } from "../database/jsonEngine";
import { SQLiteLookup } from "../lookup/sqliteLookup";
import { JSONLookup } from "../lookup/jsonLookup";
require("dotenv").config();

let storageEngine: IStorageEngine;
let phoneBookLookup: IPhoneBookLookup;

export async function initStorageEngine() {
  if (process.env.STORAGE_ENGINE === "json") {
    storageEngine = new JSONStorageEngine();
    phoneBookLookup = new JSONLookup();
  } else {
    storageEngine = new SQLiteStorageEngine();
    phoneBookLookup = new SQLiteLookup();
    await initDb();
  }
}

export async function load(): Promise<PhoneBookEntry[]> {
  return storageEngine.load();
}

export async function save(phoneEntry: PhoneBookEntry): Promise<void> {
  return storageEngine.save(phoneEntry);
}

export async function findEntryByPhoneNumber(
  phoneNumber: string
): Promise<PhoneBookEntry | null> {
  return phoneBookLookup.findEntryByPhoneNumber(phoneNumber);
}

export async function findEntryByName(
  name: string
): Promise<PhoneBookEntry | null> {
  return phoneBookLookup.findEntryByName(name);
}
