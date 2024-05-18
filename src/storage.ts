import { PhoneBookEntry } from "./interfaces";
import { openDb } from "./db";

export async function load(): Promise<PhoneBookEntry[]> {
  const db = await openDb();
  try {
    const entries = await db.all<PhoneBookEntry[]>("SELECT * FROM phonebook");
    return entries;
  } finally {
    await db.close();
  }
}

export async function save(phoneEntry: PhoneBookEntry): Promise<void> {
  const db = await openDb();

  try {
    await db.run(
      "INSERT INTO phonebook (name, phoneNumber) VALUES (?, ?)",
      phoneEntry.name,
      phoneEntry.phoneNumber
    );
  } finally {
    db.close();
  }
}

export async function findEntryByPhoneNumber(
  phoneNumber: string
): Promise<PhoneBookEntry | null> {
  const db = await openDb();
  try {
    const entry = await db.get<PhoneBookEntry>(
      "SELECT * FROM phonebook WHERE phoneNumber = ?",
      phoneNumber
    );
    return entry || null;
  } finally {
    db.close();
  }
}

export async function findEntryByName(
  name: string
): Promise<PhoneBookEntry | null> {
  const db = await openDb();

  try {
    const entry = await db.get<PhoneBookEntry>(
      "SELECT * FROM phonebook WHERE name = ?",
      name
    );
    return entry || null;
  } finally {
    db.close();
  }
}
