import { loadCorpus, wordBank } from "../common/corpusLoader";

describe("Test Corpus loader", () => {
  it("Load corpus should popular the In-memory word bank", async () => {
    await loadCorpus();
    expect(wordBank.size).toBeGreaterThan(0);
  });
});
