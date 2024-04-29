import { createPhoneBookEntry } from "./phoneBook";

async function main() {
  const myCrete = await createPhoneBookEntry()
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(main);

  console.log(myCrete);
}

main();
