// src/controllers/eventController.js
import Event from '../models/eventModel.js';
import Application from '../models/applicationModel.js';
import Group from '../models/groupModel.js';
import Venue from '../models/venueModel.js';
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
        const errors = validationResult(req);
    
        // Si hay errores de validación, responde con un estado 400 Bad Request
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const { id } = req.params;
    
        // Buscar un usuario por su ID en la base de datos
        const event = await Event.findByPk(id);
        if (!event) {
          return res.status(404).json({
            code: -6,
            message: `No event found with ID: ${id}`
          });
        }
    
        // Enviar una respuesta al cliente
        res.status(200).json({
          code: 1,
          message: 'Event retrieved successfully',
          data: event
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          code: -100,
          message: 'An error occurred while retrieving the event'
        });
      }
    };

// Crear un nuevo evento
export const addEvent = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id_venue, id_application, f_ini, f_end, name, description, payment, event_type, date_end_bid, price } = req.body;
        
        const newEvent = await Event.create({
            id_venue,
            id_application,
            f_ini,
            f_end,
            name,
            description,
            payment,
            event_type,
            date_end_bid,
            price
        });

        res.status(201).json({
            code: 1,
            message: 'Event Created Successfully',
            data: newEvent
          });;
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

        const { id_venue, id_application, f_ini, f_end, name, description, payment, event_type, date_end_bid, price } = req.body;
        
        event.id_venue = id_venue || event.id_venue;
        event.id_application = id_application || event.id_application;
        event.f_ini = f_ini || event.f_ini;
        event.f_end = f_end || event.f_end;
        event.name = name || event.name;
        event.description = description || event.description;
        event.payment = payment || event.payment;
        event.event_type = event_type || event.event_type;
        event.date_end_bid = date_end_bid || event.date_end_bid;
        event.price = price || event.price;

        await event.save();
        res.status(200).json({
            code: 1,
            message: 'Event Updated Successfully',
            data: event
          });;
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


// Obtener eventos y postulaciones por Venue
export const getEventsWithApplications = async (req, res) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Encuentra los eventos de la venue
        const events = await Event.findAll({
            include: [
                {
                    model: Application, // Incluir aplicaciones asociadas al evento
                    include: [Group]    // Incluir el grupo relacionado con la aplicación
                },
                {
                    model: Venue, // Incluir información del venue
                    attributes: ['title', 'address'] // Selecciona las columnas que quieras del venue
                }
            ]
        });

        res.status(200).json(events);
    } catch (error) {
        console.error('Error al obtener eventos con aplicaciones:', error);
        res.status(500).json({ error: 'Error al obtener eventos con aplicaciones' });

    }
}
