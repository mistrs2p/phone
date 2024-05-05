import fs from "fs";
import { PhoneBookEntry } from "./interfaces";
import { phoneBookFilePath } from "./filepathes";

export function load(): PhoneBookEntry[] {
  try {
    const data = fs.readFileSync(phoneBookFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function save(phoneEntry: PhoneBookEntry): void {
  phoneBook.push(phoneEntry);

  fs.writeFileSync(phoneBookFilePath, JSON.stringify(phoneBook, null, 2));
}

export const phoneBook = load();
