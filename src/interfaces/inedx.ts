export interface PhoneBookEntry {
  id?: string;
  name: string;
  phoneNumber: string;
}

export interface IStorageEngine {
  load(): Promise<PhoneBookEntry[]>;
  save(phoneEntry: PhoneBookEntry): Promise<void>;
}

export interface IPhoneBookLookup {
  findEntryByPhoneNumber(phoneNumber: string): Promise<PhoneBookEntry | null>;
  findEntryByName(name: string): Promise<PhoneBookEntry | null>;
}