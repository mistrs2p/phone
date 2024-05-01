// import { exit } from "process";
import { createPhoneBookEntry, loadPhonBook, rl } from "./phonebook";

export const phoneBook = loadPhonBook();

async function main() {
  await createPhoneBookEntry()
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log("Main error => ", error);
    })
    // .finally(main)
    .finally(() => {
      rl.question("R u want to continiue: ", (answer) => {
        if (answer == "yes") {
          main();
        } else {
          rl.close()
        }
      });
    });

  // console.log(myCrete);
}

main();
