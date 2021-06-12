import readline from "readline";
import fs from "fs";

import Logger from "./logger";

const logger = Logger.getInstance({ name: __filename });

export const wordBank: Set<string> = new Set();

const inputFile = "public/hemingway.txt";
const punctuations = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  output: process.stdout,
  terminal: false
});

export const init = async () => {
  logger.debug("Build word bank from Hemingway text");
  for await (const line of readInterface) {
    for (const word of line.replace(punctuations, "").split(" ")) {
      wordBank.add(word);
    }
  }
  logger.debug("Done building word bank!");
};
