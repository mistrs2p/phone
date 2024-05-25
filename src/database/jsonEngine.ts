import { IStorageEngine, PhoneBookEntry } from "../interfaces/inedx";
import { phoneBookFilePath } from "../config/filepathes";
import fs from "fs";
export class JSONStorageEngine implements IStorageEngine {
  async load(): Promise<PhoneBookEntry[]> {
    try {
      // if (!fs.existsSync(phoneBookFilePath)) {
      //   fs.writeFileSync(phoneBookFilePath, JSON.stringify([]));
      // }
      const data = fs.readFileSync(phoneBookFilePath, "utf8");
      const entries: PhoneBookEntry[] = data ? JSON.parse(data) : [];
      return entries;
    } catch (error) {
      console.error("Error loading entries:", error);
      throw error;
    }
  }

  async save(phoneEntry: PhoneBookEntry): Promise<void> {
    try {
      const entries = await this.load();
      entries.push(phoneEntry);
      fs.writeFileSync(phoneBookFilePath, JSON.stringify(entries, null, 2));
      console.log("Entry saved.");
    } catch (error) {
      console.error("Error saving entry:", error);
      throw error;
    }
  }
}
