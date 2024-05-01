import { PhoneBookEntry } from "./interfaces";
import { loadPhonBook, savePhoneBook } from "./storage";
import { getName, getNumber } from "./userentries";
const phoneBook = loadPhonBook();

function isExistingEntry(phoneEntry: PhoneBookEntry): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    const existingEntry = phoneBook.find(
      (entry) => entry.phoneNumber === phoneEntry.phoneNumber
    );
    console.log("existingEntry", existingEntry);
    if (existingEntry) {
      reject(
        new Error(
          `the number is already exists in our Database :(( \nName: ${phoneEntry.name}`
        )
      );
    } else {
      console.log("Number doesnt Existed");
      resolve(false);
    }
  });
}

export async function createPhoneBookEntry() {
  try {
    const phoneEntry: PhoneBookEntry = {
      name: await getName(),
      phoneNumber: await getNumber(),
    };

    const isExistNumber = await isExistingEntry(phoneEntry);

    if (isExistNumber === false) {
      phoneBook.push(phoneEntry);
      savePhoneBook(phoneBook);
      return "Your number successfully saved :))";
    } else {
      throw new Error("Error Occured");
    }
  } catch (err) {
    console.log(err);
  }
}
