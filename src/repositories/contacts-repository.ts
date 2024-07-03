import prisma from "../database";
import { contacts, phones } from "@prisma/client";
import { CreateContactData } from "../protocols";

type ContactWithPhones = contacts & {
  phones: phones
}

export async function selectAllContacts() {
  const contacts = await prisma.contacts.findMany();

  const contactsWithPhones: ContactWithPhones[] = [];

  for (const contact of contacts) {
    const phones = await prisma.phones.findFirst({
      where: {
        contact_id: contact.id
      }
    })

    contactsWithPhones.push({
      ...contact, phones
    })
  }

  return contacts;
}

export async function insertContact(contactData: CreateContactData) {
  const { id: contactId } = await createContact(contactData);
  await savePhonesFromContact(contactId, contactData.phones);
}

async function createContact(contactData: CreateContactData) {
  const contact = await prisma.contacts.create({
    data: {
      fullname: contactData.fullname,
      email: contactData.email,
      picture: contactData.picture
    }
  });

  return contact;
}

async function savePhonesFromContact(contactId: number, phones: string[]) {
  await prisma.phones.createMany({
    data: phones.map(phone => {
      return {
        contact_id: contactId,
        number: phone
      }
    })
  });
}