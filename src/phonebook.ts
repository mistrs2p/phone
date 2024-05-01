import fs from "fs";
import readline from "readline";
import { phoneBook } from "./main";
import { PhoneBookEntry } from "./interface";

const phoneBookFilePath = "phonebook.json";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getNumber(): Promise<string> {
  return await new Promise((resolve, reject) => {
    rl.question("Enter ur number: ", (phoneNumber: string) => {
      // phoneEntry.phoneNumber = phoneNumber;
      if (phoneNumber) {
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
        resolve(name);
      } else reject("Error while getting name");
    });
  });
}

function isExistingEntry(entry: PhoneBookEntry): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    const existingEntry = phoneBook.find(
      (entry) => entry.phoneNumber === entry.phoneNumber
    );
    console.log("existingEntry", existingEntry);
    if (existingEntry) {
      reject(
        new Error(
          `the number is already exists in our Database :(( \nName: ${entry.name}`
        )
      );
    } else {
      console.log("Number doesnt Existed");
      resolve(false);
    }
  });
}

export async function createPhoneBookEntry(): Promise<string> {
  return await new Promise(async (resolve, reject) => {
    const phoneEntry: PhoneBookEntry = {
      name: await getName(),
      phoneNumber: await getNumber(),
    };

    const isExistNumber = await isExistingEntry(phoneEntry);

    if (isExistNumber === false) {
      phoneBook.push(phoneEntry);
      savePhoneBook(phoneBook);
      resolve("Your number successfully saved :))");
    } else {
      reject();
    }
  });
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
