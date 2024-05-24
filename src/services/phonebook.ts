// phonebook.ts
import { PhoneBookEntry } from "../interfaces/inedx";
import { save, findEntryByPhoneNumber, findEntryByName } from "../storage";
import { getName, getPhoneNumber } from "./userentries";

async function isExistingEntryPhone(
  phoneEntry: PhoneBookEntry
): Promise<Boolean> {
  const existingEntry = await findEntryByPhoneNumber(phoneEntry.phoneNumber);
  if (existingEntry) {
    throw new Error(
      `The number already exists in our database :(( \nName: ${existingEntry.name}`
    );
  }
  return false;
}

async function isExistingName(phoneEntry: PhoneBookEntry): Promise<Boolean> {
  const existingName = await findEntryByName(phoneEntry.name);
  return !!existingName;
}

export async function createPhoneBookEntry() {
  try {
    const name = await getName();
    const phoneNumber = await getPhoneNumber();
    const phoneEntry: PhoneBookEntry = {
      name,
      phoneNumber,
    };

    await isExistingName(phoneEntry);
    await isExistingEntryPhone(phoneEntry);

    await save(phoneEntry);
    return "Your number successfully saved :))";
  } catch (err) {
    throw new Error(
      `An error occured while creating phone book entry: \n${err}`
    );
  }
}
