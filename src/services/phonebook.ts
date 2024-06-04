// phonebook.ts
import { PhoneBookEntry } from "../interfaces";
import {  save } from "../storage";
import { getName, getPhoneNumber } from "./userentries";

export async function createPhoneBookEntry() {
  try {
    const name = await getName();
    const phoneNumber = await getPhoneNumber();
    const phoneEntry: PhoneBookEntry = {
      name,
      phoneNumber,
    };

    await save(phoneEntry);
    return "Your number successfully saved :))";
  } catch (err) {
    throw new Error(
      `An error occured while creating phone book entry: \n${err}`
    );
  }
}
