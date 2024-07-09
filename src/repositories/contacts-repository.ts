import prisma from "../database";
import { CreateContactData } from "../protocols";

export async function selectAllContacts() {
  const contacts = await prisma.contact.findMany({
    include: {
      phones: true
    }
  });

  return contacts;
}

export async function selectContactById(id: number) {
  return await prisma.contact.findFirst({
    where: { id },
    include: {
      phones: true
    }
  })
}

export async function selectContactByFullname(fullname: string) {
  return await prisma.contact.findUnique({
    where: { fullname }
  });
}

export async function insertContact(contactData: CreateContactData) {
  const contact = await prisma.contact.create({
    data: {
      fullname: contactData.fullname,
      email: contactData.email,
      picture: contactData.picture,
      phones: {
        createMany: {
          data: contactData.phones.map(phone => {
            return {
              number: phone
            }
          })
        }
      }

    }
  });

  return contact;
}