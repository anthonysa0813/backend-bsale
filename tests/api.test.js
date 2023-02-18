const request = require("supertest");
const { runCode } = require("../controller/questions");

describe("Api test", () => {
  test("it should run Javascript code", async () => {
    const response = await request(runCode)
      .post("/run-code")
      .send({ code: "2 + 2" });
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.body.result).toBe(4);
  });
});
