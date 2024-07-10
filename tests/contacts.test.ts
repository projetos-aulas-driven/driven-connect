import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/database";
import { createNewContactBody, createNewRandomContact } from "./factories/contact-factory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.phone.deleteMany();
  await prisma.contact.deleteMany();
});

describe("POST /contacts", () => {
  it("should create a contact", async () => {
    const data = createNewContactBody();
    const { status } = await api.post("/contacts").send(data);
    expect(status).toBe(201);
  });

});


describe("GET /contacts", () => {

  it("should return an specific contact", async () => {
    const contact = await createNewRandomContact();
    const { status, body } = await api.get(`/contacts/${contact.id}`);
    expect(status).toBe(200);
    expect(body).toMatchObject({
      id: contact.id,
      fullname: contact.fullname,
      phones: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          number: expect.any(String),
        })
      ])
    });
  });


  it("should return all contacts", async () => {

    await createNewRandomContact();
    await createNewRandomContact();

    const { status, body } = await api.get("/contacts");
    expect(status).toBe(200);
    expect(body).toHaveLength(2);
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