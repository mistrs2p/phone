export interface PhoneBookEntry {
  id?: string;
  name: string;
  phoneNumber: string;
}

export type FindType = "name" | "phoneNumber";

export interface IStorageEngine {
  init(): Promise<void>;
  load(): Promise<PhoneBookEntry[]>;
  save(phoneEntry: PhoneBookEntry): Promise<void>;
  find(type: string, entry: string): Promise<PhoneBookEntry | null>;
}

export interface EnginePath {
  path: string,
  engine: string
}
