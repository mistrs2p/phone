import { PhoneBookEntry } from "./interface";

export function loadPhonBook(): PhoneBookEntry[] {
  try {
    const data = fs.readFileSync(phoneBookFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
