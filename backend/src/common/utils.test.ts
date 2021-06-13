import { findSimilarWords } from "./utils";

describe("Test Utils function", () => {
  it("Find similar words should return a list of similar words in decreasing order of rating", async () => {
    const word = "hell";
    const wordList = ["hello", "hellooa"];
    const result = await findSimilarWords(word, wordList);
    expect(result.length).toBe(2);
    expect(result[0].rating).toBeGreaterThan(result[1].rating);
  });
});
