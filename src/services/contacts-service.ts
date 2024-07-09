import { CreateContactData } from "../protocols";
import { insertContact, selectAllContacts, selectContactByFullname, selectContactById } from "../repositories/contacts-repository";

export async function getAllContacts() {
  const contacts = await selectAllContacts();
  return contacts;
}

export async function getContact(id: number) {
  const contact = await selectContactById(id);
  if (!contact) throw {
    type: "not_found",
    message: "contact not found."
  }

  return contact;
}

export async function createContact(contactData: CreateContactData) {
  const existingContact = await selectContactByFullname(contactData.fullname);
  if (existingContact) throw {
    type: "conflict",
    message: "contact already exists"
  }

  return await insertContact(contactData);
}