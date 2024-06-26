import { Request, Response } from "express";
import { createContact, getAllContacts } from "../services/contacts-service";
import { CreateContactData } from "../protocols";

export async function getContacts(req: Request, res: Response) {
  const contacts = await getAllContacts();
  return res.send(contacts);
}

export async function postContact(req: Request, res: Response) {
  const contactData = req.body as CreateContactData;
  const contact = await createContact(contactData);

  return res.send(contact);
}