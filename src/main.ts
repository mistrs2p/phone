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
    .finally(() => {
      rl.question("R u want to continiue: ", (answer) => {
        if (/^(y|yes)$/i.test(answer.toLowerCase())) {
          main();
        } else {
          rl.close()
          process.exit(0)
        }
      });
    });

}

main();
