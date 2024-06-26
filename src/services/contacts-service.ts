import { CreateContactData } from "../protocols";
import { insertContact, selectAllContacts } from "../repositories/contacts-repository";

export async function getAllContacts() {
  const contacts = await selectAllContacts();
  return contacts;
}

export async function createContact(contactData: CreateContactData) {
  const newContact = await insertContact(contactData);
  return newContact;
}