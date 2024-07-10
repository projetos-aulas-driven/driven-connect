import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.phone.deleteMany();
  await prisma.contact.deleteMany();
});

describe("POST /contacts", () => {
  it("should create a contact", async () => {
    const data = {
      fullname: "diego",
      email: "diego.pinho@driven.com.br",
      picture: "diego.png",
      phones: ["11947026341"]
    };

    const { status } = await api.post("/contacts").send(data);

    expect(status).toBe(201);
  });

});


describe("GET /contacts", () => {

  it("should return an specific contact", async () => {
    // create scenario
    const { id } = await prisma.contact.create({
      data: {
        fullname: "Polícia",
        phones: {
          create: {
            number: "190"
          }
        }
      }
    });

    const { status, body } = await api.get(`/contacts/${id}`);
    expect(status).toBe(200);
    expect(body).toMatchObject({
      id: id,
      fullname: "Polícia",
      phones: [
        {
          number: "190"
        }
      ]
    });
  });


  it("should return all contacts", async () => {

    // create scenario
    await prisma.contact.create({
      data: {
        fullname: "Polícia",
        phones: {
          create: {
            number: "190"
          }
        }
      }
    });

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