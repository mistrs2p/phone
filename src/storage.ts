import fs from "fs";
import { PhoneBookEntry } from "./interfaces";
import { phoneBookFilePath } from "./filepathes";

export function loadPhonBook(): PhoneBookEntry[] {
  try {
    const data = fs.readFileSync(phoneBookFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function savePhoneBook(phoneBook: PhoneBookEntry[]): void {
  fs.writeFileSync(phoneBookFilePath, JSON.stringify(phoneBook, null, 2));
}
