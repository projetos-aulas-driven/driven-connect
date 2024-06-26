import db from "../database";
import { Contact, CreateContactData } from "../protocols";

export async function selectAllContacts() {
  const result = await db.query<Contact>(`SELECT * FROM contacts c`);
  const contacts = result.rows;

  for (const contact of contacts) {
    const telefonesResult = await db.query('SELECT * FROM phones WHERE contact_id = $1', [contact.id]);
    contact.phones = telefonesResult.rows;
  }

  return contacts;
}

export async function insertContact(contactData: CreateContactData) {
  const { id: contactId } = await createContact(contactData);
  await savePhonesFromContact(contactId, contactData.phones);
}

async function createContact(contactData: CreateContactData) {
  const { fullname, picture, email } = contactData;
  const result = await db.query(`
    INSERT INTO contacts (fullname, picture, email) 
    VALUES ($1, $2, $3) 
    RETURNING *
  `, [fullname, picture, email]);

  return result.rows[0];
}

async function savePhonesFromContact(contactId: number, phones: string[]) {
  const phonePromises = phones.map(phone => {
    return db.query(`
      INSERT INTO phones (contact_id, number) 
      VALUES ($1, $2) 
      RETURNING *
    `, [contactId, phone]);
  });

  await Promise.all(phonePromises);
}