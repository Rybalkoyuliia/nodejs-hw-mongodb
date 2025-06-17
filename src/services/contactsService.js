import { ContactsCollection } from '../db/models/contacts.js';

export const getAll = async () => await ContactsCollection.find();

export const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const addContact = async (payload) =>
  await ContactsCollection.create(payload);

export const updateContact = async (id, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (id) =>
  await ContactsCollection.findOneAndDelete({
    _id: id,
  });
