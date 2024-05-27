import { IPhoneBookLookup, PhoneBookEntry } from "../interfaces/index";
import { SQLiteLookup } from "./sqliteLookup";
import { JSONLookup } from "./jsonLookup";
import { config } from "dotenv";
config()
let phoneBookLookup: IPhoneBookLookup;

export async function initLookupEngine() {
  if (process.env.STORAGE_ENGINE === "json") {
    phoneBookLookup = new JSONLookup();
  } else {
    phoneBookLookup = new SQLiteLookup();
  }
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
