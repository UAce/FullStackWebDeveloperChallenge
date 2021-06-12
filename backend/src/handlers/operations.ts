import { Request, Response } from "express";

import Logger from "../common/logger";
import { wordBank } from "../common/corpusLoader";
import { findSimilarWords } from "../common/utils";

const logger = Logger.getInstance({ name: __filename });

export const getSimilarWords = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { word } = req.params;
  try {
    const similarWords = findSimilarWords(word, Array.from(wordBank));
    res.status(200).send(similarWords);
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

export const addWord = async (req: Request, res: Response): Promise<void> => {
  const { word } = req.body;
  logger.debug(req);
  try {
    if (!word) {
      res.status(400).send("You must provide a word");
    }
    wordBank.add(word);
    res.status(201).send();
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};

export const removeMostSimilarWord = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { word } = req.params;
  logger.debug(`Delete word [${word}] from word bank`);
  try {
    const similarWords = findSimilarWords(word, Array.from(wordBank));
    if (similarWords.length > 0) {
      wordBank.delete(similarWords[0].target); // delete the most similar word
    }
    res.status(202).send();
  } catch (error) {
    logger.error(error);
    res.status(500).send(error.message);
  }
};
