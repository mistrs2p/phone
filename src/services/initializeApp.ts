import configureEngine from "../services/configureEngine";
import { initStorageEngine } from "../storage";
import { EnginePath } from "../interfaces";

export default async function initialize(options:EnginePath) {
    configureEngine(options)
    initStorageEngine();
}