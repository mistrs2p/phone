// import { exit } from "process";
import { createPhoneBookEntry } from "./phonebook";
import { rl } from "./userentries";

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
          process.exit(0)
        }
      });
    });

  // console.log(myCrete);
}

main();
