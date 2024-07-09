import supertest from "supertest";
import app from "../src/app";
import { array } from "joi";

const api = supertest(app);

describe("GET /contacts", () => {

  it("should return an specific contact", async () => {
    const { status, body } = await api.get("/contacts/1");
    expect(status).toBe(200);
    expect(body).toEqual({
      "id": 1,
      "fullname": "Polícia",
      "email": null,
      "picture": null,
      "phones": [
        {
          "id": 1,
          "number": "190",
          "contactId": 1
        }
      ]
    });
  });


  it("should return all contacts", async () => {
    const { status, body } = await api.get("/contacts");
    expect(status).toBe(200);
    expect(body).toHaveLength(1);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          fullname: expect.any(String),
          phones: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              number: expect.any(String),
            })
          ])
        })
      ])
    )
  });
});