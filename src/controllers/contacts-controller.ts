import { Request, Response } from "express";
import { createContact, getAllContacts } from "../services/contacts-service";
import { CreateContactData } from "../protocols";
import httpStatus from "http-status";

export async function getContacts(req: Request, res: Response) {
  const contacts = await getAllContacts();
  return res.send(contacts);
}

export async function postContact(req: Request, res: Response) {
  const contactData = req.body as CreateContactData;
  await createContact(contactData);

  return res.status(httpStatus.CREATED);
}