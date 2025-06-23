import { Router } from 'express';
import {
  addContactController,
  deleteContactController,
  getContactsController,
  getOneContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getOneContactController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(addContactController),
);

router.patch(
  '/contacts/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));

export default router;
