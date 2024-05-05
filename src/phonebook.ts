import { PhoneBookEntry } from "./interfaces";
import { save, phoneBook } from "./storage";
import { getName, getPhoneNumber } from "./userentries";
import { generateUniqueId } from "./uniqeid";

function isExistingEntryPhone(phoneEntry: PhoneBookEntry): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    const existingEntry = phoneBook.find(
      (entry) => entry.phoneNumber === phoneEntry.phoneNumber
    );
    if (existingEntry) {
      reject(
        new Error(
          `the number is already exists in our Database :(( \nName: ${phoneEntry.name}`
        )
      );
    } else {
      resolve(false);
    }
  });
}

function isExistingName(phoneEntry: PhoneBookEntry): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    const existingName = phoneBook.find(
      (entry) => entry.name === phoneEntry.name
    );
    if (existingName) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

export async function createPhoneBookEntry() {
  try {
    const phoneEntry: PhoneBookEntry = {
      id: generateUniqueId(),
      name: await getName(),
      phoneNumber: await getPhoneNumber(),
    };

    await isExistingName(phoneEntry);
    await isExistingEntryPhone(phoneEntry);
    
    save(phoneEntry);
    return "Your number successfully saved :))";
    
  } catch (err) {
    throw new Error(
      `An error occured while creating phone book entry: \n${err}`
    );
  }
}
