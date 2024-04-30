import { createPhoneBookEntry, loadPhonBook } from "./phonebook";

export const phoneBook = loadPhonBook();

async function main() {
  const myCrete = await createPhoneBookEntry()
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    })
    .finally(main);

  // console.log(myCrete);
}

main();
