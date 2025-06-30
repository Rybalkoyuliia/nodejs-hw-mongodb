import {
  addContact,
  deleteContact,
  getAll,
  getContactById,
  updateContact,
} from '../services/contactsService.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage, sortOrder, sortBy, type, isFavourite } = req.query;

  const contacts = await getAll({
    ...parsePaginationParams({ page, perPage }),
    ...parseSortParams({ sortOrder, sortBy }),
    filter: parseFilterParams({ type, isFavourite }),
    userId: req.user._id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getOneContactController = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);

  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const payload = req.body;
  const result = await addContact({ ...payload, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const payload = req.body;
  const result = await updateContact(contactId, payload, req.user._id);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).send();
};
