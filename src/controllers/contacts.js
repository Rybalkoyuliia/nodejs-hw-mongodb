import {
  addContact,
  deleteContact,
  getAll,
  getContactById,
  updateContact,
} from '../services/contactsService.js';

import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const contacts = await getAll();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getOneContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

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
  console.log(payload);
  const result = await addContact(payload);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await updateContact(id, payload);
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
  const { id } = req.params;
  const contact = await deleteContact(id);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  console.log(contact);
  res.status(204).send();
};
