import axios, { AxiosResponse } from "axios";

import { ISimilarWord } from "./interfaces";
import config from "./config";

const operationAxios = axios.create({ baseURL: `${config.baseURL}/api` });

export const getSimilarWords = async (
  word: string
): Promise<ISimilarWord[]> => {
  const { data: similarWords }: AxiosResponse = await operationAxios.get(
    `/search/${word}`
  );
  return similarWords;
};

export const addWord = async (word: string): Promise<void> => {
  return operationAxios.post("/add", {
    word
  });
};

export const removeMostSimilarWord = async (word: string): Promise<string> => {
  const { data: removedWord }: AxiosResponse = await operationAxios.delete(
    `/remove/similar/${word}`
  );
  return removedWord;
};
