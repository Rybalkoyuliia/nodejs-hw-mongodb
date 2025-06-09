import { ContactsCollection } from '../db/models/contacts.js';

export const getAll = async () => await ContactsCollection.find();

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};
