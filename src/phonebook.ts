import fs from "fs";
import readline from "readline";
import { phoneBook } from "./main";

interface PhoneBookEntry {
  name: string;
  phoneNumber: string;
}

const phoneBookFilePath = "phonebook.json";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const phoneEntry: PhoneBookEntry = {
  name: "",
  phoneNumber: "",
};

async function getNumber(): Promise<string> {
  return await new Promise((resolve, reject) => {
    rl.question("Enter ur number: ", (phoneNumber: string) => {
      // phoneEntry.phoneNumber = phoneNumber;
      if (phoneNumber) {
        phoneEntry.phoneNumber = phoneNumber;
        resolve(phoneNumber);
      } else reject("Error while getting phone number");
    });
  });
}

async function getName(): Promise<string> {
  return await new Promise((resolve, reject) => {
    rl.question("Enter ur name: ", (name: string) => {
      // phoneEntry.name = name;
      if (name) {
        phoneEntry.name = name;
        resolve(name);
      } else reject("Error while getting name");
    });
  });
}

function isExistingEntry(phoneNumber: string): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    const existingEntry = phoneBook.find(
      (entry) => entry.phoneNumber === phoneNumber
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

export async function createPhoneBookEntry()  {
  try {
    await getName();
    await getNumber();
    const isExistNumber = await isExistingEntry(phoneEntry.phoneNumber);

    if (isExistNumber === false) {
      phoneBook.push(phoneEntry);
      savePhoneBook(phoneBook);
      return "Your number successfully saved :))";
    } else {
      throw new Error("Error Occured");

    }
  } catch(err) {
    console.log(err)
  }
}

export function loadPhonBook(): PhoneBookEntry[] {
  try {
    const data = fs.readFileSync(phoneBookFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export function savePhoneBook(phoneBook: PhoneBookEntry[]): void {
  fs.writeFileSync(phoneBookFilePath, JSON.stringify(phoneBook, null, 2));
}
