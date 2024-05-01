import readline from "readline";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export async function getNumber(): Promise<string> {
  return await new Promise((resolve, reject) => {
    rl.question("Enter ur number: ", (phoneNumber: string) => {
      if (phoneNumber) {
        resolve(phoneNumber);
      } else reject("Error while getting phone number");
    });
  });
}

export async function getName(): Promise<string> {
  return await new Promise((resolve, reject) => {
    rl.question("Enter ur name: ", (name: string) => {
      if (name) {
        resolve(name);
      } else reject("Error while getting name");
    });
  });
}
