
import { IStorageEngine, PhoneBookEntry } from "../interfaces";
import { openDb } from "./db";

export class SQLiteStorageEngine implements IStorageEngine {
    async load(): Promise<PhoneBookEntry[]> {
      const db = await openDb();
      try {
        const entries = await new Promise<PhoneBookEntry[]>((resolve, reject) => {
          db.all("SELECT * FROM phonebook", (err, rows: PhoneBookEntry[]) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          });
        });
        console.log("Loaded entries:", entries);
        return entries;
      } catch (error) {
        console.error("Error loading entries:", error);
        throw error;
      } finally {
        db.close();
      }
    }
  
    async save(phoneEntry: PhoneBookEntry): Promise<void> {
      const db = await openDb();
      try {
        await new Promise<void>((resolve, reject) => {
          db.run(
            "INSERT INTO phonebook (name, phoneNumber) VALUES (?, ?)",
            [phoneEntry.name, phoneEntry.phoneNumber],
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });
        console.log("Entry saved.");
      } catch (error) {
        console.error("Error saving entry:", error);
        throw error;
      } finally {
        db.close();
      }
    }
  
  }