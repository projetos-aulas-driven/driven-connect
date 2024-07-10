import { Request, Response } from "express";
import { createContact, getAllContacts, getContact } from "../services/contacts-service";
import { CreateContactData } from "../protocols";
import httpStatus from "http-status";

export async function getContacts(req: Request, res: Response) {
  const contacts = await getAllContacts();
  return res.send(contacts);
}

export async function getSpecificContact(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.sendStatus(httpStatus.BAD_REQUEST);

  const contact = await getContact(id);
  return res.send(contact);
}

export async function postContact(req: Request, res: Response) {
  const contactData = req.body as CreateContactData;
  const newContact = await createContact(contactData);

  return res.status(httpStatus.CREATED).send(newContact);
}