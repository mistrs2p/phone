import { IStorageEngine, PhoneBookEntry, FindType } from "../interfaces";
import fs from "fs";
import {engineAndPath} from "../main" 
// require("dotenv").config();


export class JSONStorageEngine implements IStorageEngine {

  constructor(private path:string = engineAndPath.path!, protected data: Array<PhoneBookEntry> = []) {
    if (!this.path) {
      throw new Error("JSON_PATH is not defined in environment variables.");
    }
  }

  async init(): Promise<void> {
    this.data = await this.load();
    console.log("JSON storage engine SETUP");
  }
  async load(): Promise<PhoneBookEntry[]> {
    try {
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, JSON.stringify([]));
      }
      const data = fs.readFileSync(this.path, "utf8");
      const entries: PhoneBookEntry[] = data ? JSON.parse(data) : [];
      return entries;
    } catch (error) {
      console.error("Error loading entries:", error);
      throw error;
    }
  }

  async save(phoneEntry: PhoneBookEntry): Promise<void> {
    try {
      this.data.push(phoneEntry);
      fs.writeFileSync(this.path, JSON.stringify(this.data, null, 2));
      console.log("Entry saved.");
    } catch (error) {
      console.error("Error saving entry:", error);
      throw error;
    }
  }

  async find(type: FindType, entry: string): Promise<PhoneBookEntry | null> {
    try {
      return this.data.find((findEntry) => entry == findEntry[type]) || null;
    } catch (error) {
      console.error("Error finding entry:", error);
      throw error;
    }
  }
}
