import {
  createPhoneBookEntry,
  displayPhoneBookEntries,
} from "./services/phonebook";
import { rl } from "./utils/readline";
import { Command } from "commander";
import initialize from "./services/initializeApp";

require("dotenv").config();

const program = new Command();

program.version("2.0.0", "-v, --version", "output the current version");

program
  .command("create")
  .description("Create a new phonebook entry")
  .option(
    "-eng, --engine <engine>",
    "set storage engine (json or sqlite or mysql)",
    "json"
  )
  .option("-p, --path <path>", "set path for database", "phonebook")
  .action(async (options, _) => {
    console.log("options", options);
    await initialize(options);
    keepAdding();
  });

program
  .command("display")
  .description("Display all phonebook entries")
  .option(
    "-eng, --engine <engine>",
    "get storage engine (json or sqlite or mysql)",
    "json"
  )
  .option("-p, --path <path>", "get path for database", "phonebook")
  .action(async (options) => {
    console.log(options);
    await initialize(options);
    await displayPhoneBookEntries();
    process.exit(0);
  });
program.parse(process.argv);

async function keepAdding() {
  await createPhoneBookEntry()
    .then((response) => {
      console.log("response => ", response);
    })
    .catch((error) => {
      console.log("Main error => ", error);
    })
    .finally(() => {
      rl.question("Do you want to continiue: ", (answer) => {
        if (/^(y|yes)$/i.test(answer.toLowerCase())) {
          keepAdding();
        } else {
          rl.close();
          process.exit(0);
        }
      });
    });
}
