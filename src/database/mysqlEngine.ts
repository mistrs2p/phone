import mysql from "mysql2/promise";
import { RowDataPacket } from 'mysql2';

import { IStorageEngine, PhoneBookEntry, FindType } from "../interfaces";

export async function openDb(retries = 5, delay = 5000) {
  while (retries) {
    try {
      const connection = await mysql.createConnection({
        host: "mysql",
        user: "Mahdi",
        password: "mahdiPassword2",
        database: "mydatabase",
        port: 3306,
      });
      // console.log(connection)
      return connection;
    } catch (error) {
      console.error(`Failed to connect to MySQL. Retrying in ${delay / 1000} seconds...`);
      console.error(`${retries} attemps to connect to MySQL`);
      console.error('________________________________')
      retries -= 1;
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('Could not connect to MySQL');
}

export async function initDb() {
  const connection = await openDb();
  await connection.query(`
      CREATE TABLE IF NOT EXISTS phonebook (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(255) NOT NULL
      )
    `);
  await connection.end();
}

export class mysqlStorageEngine implements IStorageEngine {
  async init(): Promise<void> {
    console.log("MySQL storage engine SETUP");
    await initDb();
  }

  async load(): Promise<PhoneBookEntry[]> {
    const connection = await openDb();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        "SELECT * FROM phonebook"
      );
      const entries = rows.map((row) => ({
        id: row.id,
        name: row.name,
        phoneNumber: row.phoneNumber,
      })) as PhoneBookEntry[];
      console.log("Loaded entries:", entries);
      return entries;
    } catch (error) {
      console.error("Error loading entries:", error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  async save(phoneEntry: PhoneBookEntry): Promise<void> {
    const connection = await openDb();
    try {
      await connection.query(
        "INSERT INTO phonebook (name, phoneNumber) VALUES (?, ?)",
        [phoneEntry.name, phoneEntry.phoneNumber]
      );
      console.log("Entry saved.");
    } catch (error) {
      console.error("Error saving entry:", error);
      throw error;
    } finally {
      await connection.end();
    }
  }

  async find(type: FindType, entry: string): Promise<PhoneBookEntry | null> {
    const connection = await openDb();
    try {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT * FROM phonebook WHERE ?? = ?`,
        [type, entry]
      );
      const findEntry = rows.length > 0 ? rows[0] as PhoneBookEntry : null;
      return findEntry;
    } catch (error) {
      console.error("Error finding entry:", error);
      throw error;
    } finally {
      await connection.end();
    }
  }
}
