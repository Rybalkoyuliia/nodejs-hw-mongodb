import { Router } from 'express';
import {
  addContactController,
  deleteContactController,
  getContactsController,
  getOneContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getOneContactController));

router.post('/contacts', ctrlWrapper(addContactController));

router.patch('/contacts/:id', ctrlWrapper(patchContactController));

router.delete('/contacts/:id', ctrlWrapper(deleteContactController));

export default router;
