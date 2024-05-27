// sqliteLookup.ts
import { IPhoneBookLookup, PhoneBookEntry } from "../interfaces";
import { openDb } from "../database/db";

export class SQLiteLookup implements IPhoneBookLookup {
  async findEntryByPhoneNumber(
    phoneNumber: string
  ): Promise<PhoneBookEntry | null> {
    const db = await openDb();
    try {
      const entry = await new Promise<PhoneBookEntry | null>(
        (resolve, reject) => {
          db.get(
            "SELECT * FROM phonebook WHERE phoneNumber = ?",
            [phoneNumber],
            (err, row: PhoneBookEntry) => {
              if (err) {
                reject(err);
              } else {
                resolve(row || null);
              }
            }
          );
        }
      );
      return entry;
    } catch (error) {
      console.error("Error finding entry:", error);
      throw error;
    } finally {
      db.close();
    }
  }

  async findEntryByName(name: string): Promise<PhoneBookEntry | null> {
    const db = await openDb();
    try {
      const entry = await new Promise<PhoneBookEntry | null>(
        (resolve, reject) => {
          db.get(
            "SELECT * FROM phonebook WHERE name = ?",
            [name],
            (err, row: PhoneBookEntry) => {
              if (err) {
                reject(err);
              } else {
                resolve(row || null);
              }
            }
          );
        }
      );
      return entry;
    } catch (error) {
      console.error("Error finding entry:", error);
      throw error;
    } finally {
      db.close();
    }
  }
}
