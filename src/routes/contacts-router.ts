import { Router } from "express";
import { postContact, getContacts } from "../controllers/contacts-controller";
import { validateSchema } from "../middlewares/schema-validation";
import contactSchema from "../schemas/contact-schema";

const contactRouter = Router();

contactRouter.get("/contacts", getContacts);
contactRouter.post("/contacts", validateSchema(contactSchema), postContact);


export default contactRouter;