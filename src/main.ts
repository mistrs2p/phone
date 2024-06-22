import { createPhoneBookEntry } from "./services/phonebook";
import { rl } from "./utils/readline";
import { initStorageEngine } from "./storage";
import { Command } from "commander";
import { EnginePath } from "./interfaces";

// require("dotenv").config();
export const engineAndPath: EnginePath = {
  path: "",
  engine: "",
};
const program = new Command();

program
  .version("1.0.0")
  .option("-eng, --engine <engine>", "set storage engine (json or sqlite)")
  .option("-p, --path <path>", "set path for JSON storage", "phonebook")
  .action((options, r) => {
    console.log(options);
    console.log(r);
    // console.log(options)
    switch (options.engine) {
      case "json":
        engineAndPath.path = options.path + ".json";
        break;
      case "sqlite":
        engineAndPath.path = options.path + ".db";
        break;
      default:
        throw new Error("Unknown engine: " + options.engine + ". Please specify the right engine");
    }
    engineAndPath.engine = options.engine;
    console.log(engineAndPath);

    main();
  });

program.parse(process.argv);
// console.log("process.argv", process.argv);
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
