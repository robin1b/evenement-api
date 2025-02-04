// controllers/eventController.ts
import { Request, Response } from 'express';
import Event from '../models/Event';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, date, location, description, isFree } = req.body;
    // Basisvalidatie: verplichte velden
    if (!name || !date || !location) {
      return res.status(400).json({ message: 'name, date en location zijn verplicht' });
    }
    const newEvent = new Event({
      name,
      date,
      location,
      description,
      isFree,
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event niet gevonden' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, date, location, description, isFree } = req.body;
    // Basisvalidatie
    if (!name || !date || !location) {
      return res.status(400).json({ message: 'name, date en location zijn verplicht' });
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date, location, description, isFree },
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event niet gevonden' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event niet gevonden' });
    }
    res.json({ message: 'Event succesvol verwijderd' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
