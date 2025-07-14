import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAll = async ({
  page = 1,
  perPage = 10,
  sortOrder,
  sortBy,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find({ userId });
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavorite === 'boolean') {
    contactsQuery.where('isFavorite').equals(filter.isFavorite);
  }
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  return await ContactsCollection.findOne({ _id: contactId, userId });
};

export const addContact = async (payload) =>
  await ContactsCollection.create(payload);

export const updateContact = async (id, payload, userId, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId },
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

export const deleteContact = async (contactId, userId) =>
  await ContactsCollection.findOneAndDelete({ _id: contactId, userId });
