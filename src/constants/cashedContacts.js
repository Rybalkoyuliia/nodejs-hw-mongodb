import { ContactsCollection } from '../db/models/contacts.js';

export const cashedContacts = Object.keys(
  ContactsCollection.schema.paths,
).filter((key) => !['__v'].includes(key));
