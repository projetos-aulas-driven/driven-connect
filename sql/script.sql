CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  picture VARCHAR(255)
);

CREATE TABLE phones (
  id SERIAL PRIMARY KEY,
  number VARCHAR(20) NOT NULL,
  contact_id INTEGER NOT NULL,
  CONSTRAINT fk_contato_id
      FOREIGN KEY(contact_id) 
      REFERENCES contacts(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);