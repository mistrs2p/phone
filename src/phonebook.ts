import fs from "fs";
import readline from "readline";

interface PhoneBookEntry {
  name: string;
  phoneNumber: string;
}

const phoneBookFilePath = "phonebook.json";

function createPhoneBookEntry(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question("Enter ur number: ", (phoneNumber: string) => {
      rl.question("Enter ur name: ", (name: string) => {
        rl.close();

        const newEntry: PhoneBookEntry = {
          name,
          phoneNumber,
        };

        // If phone number is already exists
        const phoneBook = loadPhonBook();
        const existingEntry = phoneBook.find(
          (entry) => entry.phoneNumber === phoneNumber
        );

        if (existingEntry) {
          console.log("Error: the number is already exists in our Database :((");
          console.log(`Name: ${existingEntry.name}`);
          reject();
        } else {
          phoneBook.push(newEntry);
          savePhoneBook(phoneBook);
          console.log("Your number successfully saved :))")
          resolve();
        }
      });
    });
  });
}

function loadPhonBook(): PhoneBookEntry[] {
  try {
    const data = fs.readFileSync(phoneBookFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function savePhoneBook(phoneBook: PhoneBookEntry[]): void {
  fs.writeFileSync(phoneBookFilePath, JSON.stringify(phoneBook, null, 2));
}

async function main() {
    try {
        await createPhoneBookEntry();
    } catch (error) {
        console.log('Error occured ', error)
    }
}

main()