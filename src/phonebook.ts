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
let phoneEntry: PhoneBookEntry = {
  name: "",
  phoneNumber: "",
};

async function getNumber(): Promise<string> {
  return await new Promise((resolve, reject) => {
    rl.question("Enter ur number: ", (phoneNumber: string) => {
      // phoneEntry.phoneNumber = phoneNumber;
      resolve(phoneNumber);
    });
  });
}

async function getName(): Promise<string> {
  return await new Promise((resolve, reject) => {
    rl.question("Enter ur name: ", (name: string) => {
      // phoneEntry.name = name;
      resolve(name);
    });
  });
}

async function isExistingEntry(phoneNumber: string): Promise<Boolean> {
  return await new Promise((resolve, reject) => {
    const existingEntry = phoneBook.find(
      (entry) => entry.phoneNumber === phoneNumber
    );
    if (!existingEntry) {
      reject(false);
    } else {
      resolve(true);
    }
  });
}

export async function createPhoneBookEntry(): Promise<string> {
  phoneEntry = {
    phoneNumber: await getNumber(),
    name: await getName(),
  };
  console.log(phoneEntry);
  return await new Promise(async (resolve, reject) => {
    const isExistNumber = await isExistingEntry(phoneEntry.phoneNumber);
    // rl.close();

    if (isExistNumber) {
      reject(
        new Error(
          `Error: the number is already exists in our Database :(( \nName: ${phoneEntry.name}`
        )
      );
    } else {
      phoneBook.push(phoneEntry);
      savePhoneBook(phoneBook);
      resolve("Your number successfully saved :))");
    }
  });
  // return new Promise((resolve, reject) => {
  //   rl.question("Enter ur number: ", (phoneNumber: string) => {
  //     rl.question("Enter ur name: ", (name: string) => {
  //       rl.close();
  //       const newEntry: PhoneBookEntry = {
  //         name,
  //         phoneNumber,
  //       };

  //       // If phone number is already exists
  //       const phoneBook = loadPhonBook();
  //       const existingEntry = phoneBook.find(
  //         (entry) => entry.phoneNumber === phoneNumber
  //       );

  //       if (existingEntry) {
  //         // console.log(
  //         //   "Error: the number is already exists in our Database :(("
  //         // );
  //         // console.log(`Name: ${existingEntry.name}`);
  //         reject(
  //           new Error(
  //             `Error: the number is already exists in our Database :(( \nName: ${existingEntry.name}`
  //           )
  //         );
  //       } else {
  //         phoneBook.push(newEntry);
  //         savePhoneBook(phoneBook);
  //         // console.log("Your number successfully saved :))");
  //         resolve("Your number successfully saved :))");
  //       }
  //     });
  //   });
  // });
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
