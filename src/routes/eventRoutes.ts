// routes/eventRoutes.ts
import { Router } from 'express';
import { getEvents, createEvent, getEventById, updateEvent, deleteEvent } from '../controllers/eventController';

const router = Router();

router.get('/', getEvents);            // GET /events
router.post('/', createEvent);         // POST /events
router.get('/:id', getEventById);      // GET /events/:id
router.put('/:id', updateEvent);       // PUT /events/:id
router.delete('/:id', deleteEvent);    // DELETE /events/:id

export default router;
