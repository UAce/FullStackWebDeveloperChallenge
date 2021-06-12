import axios, { AxiosResponse } from "axios";

import { ISimilarWord } from "./interfaces";

const operationAxios = axios.create({
  baseURL: `http://localhost:4000/api`
  // headers: {}
});

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

export const removeMostSimilarWord = async (word: string): Promise<void> => {
  return operationAxios.delete(`/remove/similar/${word}`);
};
