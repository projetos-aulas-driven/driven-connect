import { Router } from "express";
import { postContact, getContacts, getSpecificContact } from "../controllers/contacts-controller";
import { validateSchema } from "../middlewares/schema-validation";
import contactSchema from "../schemas/contact-schema";

const contactRouter = Router();

contactRouter.get("/contacts", getContacts);
contactRouter.get("/contacts/:id", getSpecificContact);
contactRouter.post("/contacts", validateSchema(contactSchema), postContact);


export default contactRouter;