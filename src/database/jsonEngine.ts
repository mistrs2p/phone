import { IStorageEngine, PhoneBookEntry, FindType } from "../interfaces";
import fs from "fs";
require("dotenv").config();


export class JSONStorageEngine implements IStorageEngine {

  constructor(private path:string = process.env.JSON_PATH!) {
    if (!this.path) {
      throw new Error("JSON_PATH is not defined in environment variables.");
    }
  }

  async init(): Promise<void> {
    console.log("JSON storage engine SETUP");
    return  
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
      const entries = await this.load();
      entries.push(phoneEntry);
      fs.writeFileSync(this.path, JSON.stringify(entries, null, 2));
      console.log("Entry saved.");
    } catch (error) {
      console.error("Error saving entry:", error);
      throw error;
    }
  }

  async find(type: FindType, entry: string): Promise<PhoneBookEntry | null> {
    try {
      const entries = await this.load();
      switch(type){
        case "name":
          return entries.find((findEntry) => entry == findEntry.name) || null;
        case "phoneNumber":
          return entries.find((findEntry) => entry == findEntry.phoneNumber) || null;
        default:
          return null;
      }
    } catch (error) {
      console.error("Error finding entry:", error);
      throw error;
    }
  }
}
