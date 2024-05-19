import { PhoneBookEntry } from "./interfaces";
import { initDb } from "./db";
import { IStorageEngine } from "./interfaces";
import {SQLiteStorageEngine} from './sqliteEngine'
import { JSONStorageEngine } from "./jsonEngine";
require('dotenv').config();

let storageEngine: IStorageEngine;

export async function initStorageEngine() {
  if (process.env.STORAGE_ENGINE === 'json') {
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

export async function findEntryByPhoneNumber(phoneNumber: string): Promise<PhoneBookEntry | null> {
  return storageEngine.findEntryByPhoneNumber(phoneNumber);
}

export async function findEntryByName(name: string): Promise<PhoneBookEntry | null> {
  return storageEngine.findEntryByName(name);
}
