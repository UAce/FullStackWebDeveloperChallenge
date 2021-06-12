import Config from "config";
import readline from "readline";
import fs from "fs";

import Logger from "./logger";

const logger = Logger.getInstance({ name: __filename });

// In-cache memory
export const wordBank: Set<string> = new Set();

const punctuations = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
const readInterface = readline.createInterface({
  input: fs.createReadStream(Config.get<string>("corpusFilePath")),
  output: process.stdout,
  terminal: false
});

export const init = async () => {
  for await (const line of readInterface) {
    for (const word of line.replace(punctuations, "").split(" ")) {
      wordBank.add(word);
    }
  }
  logger.debug("corpus loaded");
};
