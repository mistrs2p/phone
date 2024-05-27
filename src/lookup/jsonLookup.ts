// jsonLookup.ts
import { IPhoneBookLookup, PhoneBookEntry } from "../interfaces";
import { phoneBookFilePath } from "../config/filepathes";
import fs from "fs";

export class JSONLookup implements IPhoneBookLookup {
  async findEntryByPhoneNumber(
    phoneNumber: string
  ): Promise<PhoneBookEntry | null> {
    try {
      const data = fs.readFileSync(phoneBookFilePath, "utf8");
      const entries: PhoneBookEntry[] = data ? JSON.parse(data) : [];
      return entries.find((entry) => entry.phoneNumber === phoneNumber) || null;
    } catch (error) {
      console.error("Error finding entry:", error);
      throw error;
    }
  }

  async findEntryByName(name: string): Promise<PhoneBookEntry | null> {
    try {
      const data = fs.readFileSync(phoneBookFilePath, "utf8");
      const entries: PhoneBookEntry[] = data ? JSON.parse(data) : [];
      return entries.find((entry) => entry.name === name) || null;
    } catch (error) {
      console.error("Error finding entry:", error);
      throw error;
    }
  }
}
