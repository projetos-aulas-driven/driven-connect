import prisma from "../../src/database";
import { faker } from '@faker-js/faker';

import { CreateContactData } from "../../src/protocols";

export function createNewContactBody(): CreateContactData {
  return {
    fullname: faker.person.fullName(),
    email: faker.internet.email(),
    picture: faker.internet.url(),
    phones: generatePhones(faker.number.int({
      min: 1,
      max: 3
    }))
  }
}

export async function createNewRandomContact() {
  const { fullname, email, picture, phones } = createNewContactBody();
  const contact = await prisma.contact.create({
    data: {
      fullname,
      email,
      picture,
      phones: {
        createMany: {
          data: phones.map(phone => {
            return {
              number: phone
            }
          })
        }
      }
    },
    include: {
      phones: true
    }
  });

  return contact;
}

function generatePhones(numberOfPhones: number) {
  const phones = [];
  for (let i = 0; i < numberOfPhones; i++) {
    phones.push(faker.phone.number());
  }

  return phones;
}
