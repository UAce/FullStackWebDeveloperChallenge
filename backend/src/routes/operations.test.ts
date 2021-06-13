import supertest from "supertest";

import { app, server } from "../index";
import { delay } from "../common/utils";

const request = supertest(app);

describe("Test Operations APIs", () => {
  beforeAll(done => {
    const waitForAppReady = async (): Promise<void> => {
      let appReady = false;
      app.on("ready", () => (appReady = true));

      while (!appReady) {
        await delay(500);
      }
    };
    waitForAppReady().then(done);
  });

  afterAll(async () => {
    server.close();
    await delay(2000);
  });

  it("GET /api/search/:word should return an array of similar words", async () => {
    const result = await request.get("/api/search/cry").send();

    expect(result.status).toBe(200);
    expect(result.body.length).toBeGreaterThan(0);
  });

  it("POST /api/add should add a new word to the corpus", async () => {
    const word = "supertest";
    await request
      .post("/api/add")
      .send({ word })
      .expect(201);

    const result = await request
      .get("/api/search/supertes")
      .send()
      .expect(200);
    expect(result.body.length).toBeGreaterThan(0);
    expect(result.body[0].target).toBe(word);
  });

  it("POST /api/add should throw 409 if word already exists in the corpus", async () => {
    const word = "newWord";
    await request
      .post("/api/add")
      .send({ word })
      .expect(201);

    await request
      .post("/api/add")
      .send({ word })
      .expect(409);
  });

  it("DELETE /api/remove/similar/:word should delete the most similar word from the corpus", async () => {
    const word = "cry";
    const searchResult = await request
      .get(`/api/search/${word}`)
      .send()
      .expect(200);
    expect(searchResult.body.length).toBeGreaterThan(0);

    const mostSimilarWord = searchResult.body[0].target;
    const deleteResult = await request
      .delete(`/api/remove/similar/${word}`)
      .send()
      .expect(200);
    expect(deleteResult.text).toBe(mostSimilarWord);
  });

  it("DELETE /api/remove/similar/:word should throw 404 if no similar words are found", async () => {
    const word = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const result = await request
      .get(`/api/search/${word}`)
      .send()
      .expect(200);
    expect(result.body.length).toBe(0);

    await request
      .delete(`/api/remove/similar/${word}`)
      .send()
      .expect(404);
  });
});
