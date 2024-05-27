import { createPhoneBookEntry } from "./services/phonebook";
import { rl } from "./utils/readline";
import { initStorageEngine } from "./storage";
import { initLookupEngine } from "./lookup";

require('dotenv').config();

async function initializeEngines(): Promise<void> {
  await initStorageEngine();
  await initLookupEngine()
}

async function main() {
  await initializeEngines();
  createPhoneBookEntry()
    .then((response) => {
      console.log("response => ", response);
    })
    .catch((error) => {
      console.log("Main error => ", error);
    })
    .finally(() => {
      rl.question("Do you want to continiue: ", (answer) => {
        if (/^(y|yes)$/i.test(answer.toLowerCase())) {
          main();
        } else {
          rl.close();
          process.exit(0);
        }
      });
    })
}

main();
