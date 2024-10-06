// src/controllers/eventController.js
import Event from '../models/eventModel.js';
import { validationResult } from 'express-validator';

// Obtener todos los eventos
export const getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json(events);
    } catch (error) {
        console.error("Error al obtener los eventos:", error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
};

// Obtener un evento por ID
export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error al obtener el evento:", error);
        res.status(500).json({ message: 'Error al obtener el evento' });
    }
};

// Crear un nuevo evento
export const addEvent = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { venue_id, application_id, f_ini, f_end, name, description, payment, event_type, date_end_bid, price } = req.body;
        
        const newEvent = await Event.create({
            venue_id,
            application_id,
            f_ini,
            f_end,
            name,
            description,
            payment,
            event_type,
            date_end_bid,
            price
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error("Error al crear el evento:", error);
        res.status(500).json({ message: 'Error al crear el evento' });
    }
};

// Actualizar un evento existente
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { venue_id, application_id, f_ini, f_end, name, description, payment, event_type, date_end_bid, price } = req.body;
        
        event.venue_id = venue_id || event.venue_id;
        event.application_id = application_id || event.application_id;
        event.f_ini = f_ini || event.f_ini;
        event.f_end = f_end || event.f_end;
        event.name = name || event.name;
        event.description = description || event.description;
        event.payment = payment || event.payment;
        event.event_type = event_type || event.event_type;
        event.date_end_bid = date_end_bid || event.date_end_bid;
        event.price = price || event.price;

        await event.save();
        res.status(200).json(event);
    } catch (error) {
        console.error("Error al actualizar el evento:", error);
        res.status(500).json({ message: 'Error al actualizar el evento' });
    }
};

// Eliminar un evento
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }

        await event.destroy();
        res.status(200).json({ message: 'Evento eliminado correctamente' });
    } catch (error) {
        console.error("Error al eliminar el evento:", error);
        res.status(500).json({ message: 'Error al eliminar el evento' });
    }
};
