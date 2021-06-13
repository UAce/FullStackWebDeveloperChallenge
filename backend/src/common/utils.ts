import stringSimilarity from "string-similarity";

import Logger from "./logger";

const logger = Logger.getInstance({ name: __filename });
const similarityCoefficientThreshold = 0.2; // Arbitrary number that I chose

export interface ISimilarWord {
  rating: number;
  target: string;
}

/**
 * Find list of similar words using external library that implements Dice's Coefficient to measure string similarity
 * @param word Word to compare
 * @param searchCorpus Array of words to search for similar words
 */
export const findSimilarWords = (word: string, searchCorpus: Array<string>) => {
  logger.debug(`Searching for words similar to ${word}`);
  const matches = stringSimilarity.findBestMatch(word, searchCorpus);
  let similar: ISimilarWord[] = [];

  for (const match of matches.ratings) {
    if (
      match.rating < similarityCoefficientThreshold ||
      match.target === word
    ) {
      continue;
    }

    // Build array of similar words in decreasing order of rating, i.e. most similar words are at the beginning
    if (similar.length === 0) {
      similar.push(match);
    } else if (similar[0].rating <= match.rating) {
      similar = [match, ...similar];
    } else if (similar[similar.length - 1].rating >= match.rating) {
      similar = [...similar, match];
    }
  }
  return similar;
};

export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
