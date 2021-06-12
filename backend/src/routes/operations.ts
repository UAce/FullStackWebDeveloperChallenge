import express from "express";

import {
  getSimilarWords,
  addWord,
  removeMostSimilarWord
} from "../handlers/operations";

const Router = express.Router();

/*
 * Operation 1:
 *
 * Given a query consisting of a single word, display the
 * 3 most similar words in the search corpus according to some similarity
 * metric of your choosing
 */
Router.get("/search/:word", getSimilarWords);

/*
 * Operation 2:
 *
 * Given a single word w, update the search corpus with w.
 * The new word w should immediately be queryable
 */
Router.post("/add", addWord);

/*
 * Operation 3:
 *
 * Given a single word w, remove the most similar word to w
 * in the corpus from further search results
 */
Router.delete("/remove/similar/:word", removeMostSimilarWord);
// Router.delete("/remove/:word", removeWord);

export default Router;
