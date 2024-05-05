import { PhoneBookEntry } from "./interfaces";
import { loadPhonBook, savePhoneBook } from "./storage";
import { getName, getNumber } from "./userentries";
import { generateUniqueId } from "./uniqeid";
const phoneBook = loadPhonBook();

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
      phoneNumber: await getNumber(),
    };

    const isExistName = await isExistingName(phoneEntry);
    await isExistingEntryPhone(phoneEntry);
    // const isExistNumber = await isExistingEntryPhone(phoneEntry);
    if (isExistName)
      console.log(`Found same name in data base with name: ${phoneEntry.name}`);
    // if (isExistNumber === false) {
    phoneBook.push(phoneEntry);
    savePhoneBook(phoneBook);
    return "Your number successfully saved :))";
    // } else {
    //   throw new Error("Phone number already exists!");
    // }
  } catch (err) {
    throw new Error(
      `An error occured while creating phone book entry: \n${err}`
    );
  }
}
