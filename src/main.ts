import { createPhoneBookEntry } from "./services/phonebook";
import { rl } from "./utils/readline";
import { initStorageEngine } from "./storage";
import { Command } from "commander";

require("dotenv").config();

const program = new Command();

program
  .version("1.0.0")
  .option("-e, --engine <type>", "set storage engine (json or sqlite)", "json")
  .option("-p, --path <path>", "set path for JSON storage", "phonebook.json")
  .action((options) => {
    console.log(process.env);

    if (!("JSON_PATH" in process.env)) {
      // throw new Error("An error occurred while geting JSON PATH Address");
      console.log("An error occurred while geting JSON PATH Address");
      process.exit(1);
    }
    if (!("STORAGE_ENGINE" in process.env)) {
      // throw new Error("An error occurred while geting JSON Engin Address");
      console.log("An error occurred while geting JSON Engin Address");
      process.exit(1);
    }

    process.env.JSON_PATH = options.path;
    process.env.STORAGE_ENGINE = options.engine;

    main();
  });

program.parse(process.argv);

// const options = program.opts();
// console.log(options);
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
    });
}
