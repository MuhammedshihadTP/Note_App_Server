import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createNote, getNotes, updateNote, deleteNote, getNoteById } from '../controllers/note.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { noteSchema } from '../validations/note.validations.js';
import { getAllUsers, getUserById } from '../controllers/auth.controller.js';

const router = Router();

router.use(authMiddleware);

//user
router.get("/users", getAllUsers);
router.get("/user/:id", getUserById);

// notes
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', validate(noteSchema), createNote);
router.put('/:id', validate(noteSchema), updateNote);
router.delete('/:id', deleteNote);

export default router;
