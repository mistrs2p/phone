"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const phoneBookFilePath = "phonebook.json";
function createPhoneBookEntry() {
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve, reject) => {
        rl.question("Enter ur number: ", (phoneNumber) => {
            rl.question("Enter ur name: ", (name) => {
                rl.close();
                const newEntry = {
                    name,
                    phoneNumber,
                };
                // If phone number is already exists
                const phoneBook = loadPhonBook();
                const existingEntry = phoneBook.find((entry) => entry.phoneNumber === phoneNumber);
                if (existingEntry) {
                    console.log("Error: the number is already exists in our Database :((");
                    console.log(`Name: ${existingEntry.name}`);
                    reject();
                }
                else {
                    phoneBook.push(newEntry);
                    savePhoneBook(phoneBook);
                    console.log("Your number successfully saved :))");
                    resolve();
                }
            });
        });
    });
}
function loadPhonBook() {
    try {
        const data = fs_1.default.readFileSync(phoneBookFilePath, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
}
function savePhoneBook(phoneBook) {
    fs_1.default.writeFileSync(phoneBookFilePath, JSON.stringify(phoneBook, null, 2));
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield createPhoneBookEntry();
        }
        catch (error) {
            console.log('Error occured ', error);
        }
    });
}
main();
