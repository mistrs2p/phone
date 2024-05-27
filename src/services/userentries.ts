import { rl } from "../utils/readline";
import { findEntryByName } from "../lookup";

export async function getPhoneNumber(): Promise<string> {
  return await new Promise((resolve, reject) => {
    const askNumber = () => {
      rl.question("Enter your phone number: ", async (phoneNumber: string) => {
        if (phoneNumber) {
          if (/^09.{9}$/i.test(phoneNumber)) {
            resolve(phoneNumber);
          } else {
            console.log("Invalid phone number");
            rl.question("Do you want to add your number?(y/n) ", (answer) => {
              if (/^(y|yes)$/i.test(answer.toLowerCase())) {
                askNumber();
              } else {
                console.log("Good Bye");
                rl.close();
                process.exit(0);
              }
            });
          }
        } else reject("Error while getting phone number");
      });
    };
    askNumber();
  });
}

export async function getName(): Promise<string> {
  return await new Promise((resolve, reject) => {
    rl.question("Enter your name: ", async(name: string) => {
      if (name) {
        const findPhoneEntry = await findEntryByName(name);
        if (findPhoneEntry)
          console.log(`Found same name in data base with name: ${name}`);

        resolve(name);
      } else reject("Error while getting name");
    });
  });
}
