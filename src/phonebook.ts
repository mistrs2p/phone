import fs from "fs";
import readline from "readline";

interface PhoneBookEntry {
  name: string;
  phoneNumber: string;
}

const phoneBookFilePath = "phonebook.json";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let phoneEntry: Partial<PhoneBookEntry> = {
  name: "",
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

export async function createPhoneBookEntry(): Promise<void> {
  phoneEntry = {
    phoneNumber: await getNumber(),
    name: await getName(),
  };
  console.log(phoneEntry);

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
