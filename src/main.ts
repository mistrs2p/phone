import { createPhoneBookEntry } from "./phonebook";
import { rl } from "./readline";
import { initStorageEngine } from "./storage";

require('dotenv').config();

async function main() {
  await initStorageEngine();
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
