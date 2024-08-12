// phonebook.ts
import { PhoneBookEntry } from "../interfaces";
import { save, load } from "../storage";
import { getName, getPhoneNumber } from "./userentries";

export async function createPhoneBookEntry() {
  try {
    const name = await getName();
    const phoneNumber = await getPhoneNumber();
    const phoneEntry: PhoneBookEntry = {
      name,
      phoneNumber,
    };

    await save(phoneEntry);
    return "Your number successfully saved :))";
  } catch (err) {
    throw new Error(
      `An error occured while creating phone book entry: \n${err}`
    );
  }
}

export async function displayPhoneBookEntries() {
  try {
    const entries: PhoneBookEntry[] = await load();
    if (entries.length === 0) {
      console.log("Phonebook is empty.");
    } else {
      console.log("---------(oO){Phonebook Entries}(O0)---------");
      console.log("_____________________________________");
      entries.forEach((entry, index) => {
        console.log(
          `${index + 1}. Name: ${entry.name} | Phone Number: ${
            entry.phoneNumber
          }\n------------------------------------------------`
        );
      });
    }
  } catch (err) {
    throw new Error(
      `An error occured while getting phone book entries: \n${err}`
    );
  }
}
