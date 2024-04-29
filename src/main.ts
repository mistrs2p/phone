import { createPhoneBookEntry } from "./phoneBook";

async function main() {
  try {
    await createPhoneBookEntry();
  } catch (error) {
    console.log("Error occured ", error);
  }
}

main();
