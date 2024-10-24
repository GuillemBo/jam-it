import Event from '../models/eventModel.js';
import Group from '../models/groupModel.js';
import Application from '../models/applicationModel.js';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';


export const createApplication = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      // Si hay errores de validación, responde con un estado 400 Bad Request
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { id_group, id_event, titulodeloquehago, descriptiondeloquehago } = req.body;

          // Verificar si el grupo y el evento existen
      const groupExists = await Group.findByPk(id_group);
      const eventExists = await Event.findByPk(id_event);

      if (!groupExists || !eventExists) {
        return res.status(404).json({
          code: -7,
          message: 'Group or Event not found'
        });
      }

      let newApplication;
      try {
        newApplication = await Application.create({ id_group, id_event, titulodeloquehago, descriptiondeloquehago, status: 'pending' });
      } catch (error) {
        // Si hay un error de duplicación de clave única (por ejemplo, título duplicado)
        if (error.name === 'SequelizeUniqueConstraintError') {
          res.status(400).json({
            code: -61,
            message: 'Duplicate Application'
          });
        }
        return res.status(500).json({
          code: -100,
          message: 'An error occurred while creating the application',
          error: error.message
        });
      }
  
      if (!newApplication) {
        return res.status(404).json({
          code: -6,
          message: 'Error When Creating the Application'
        });
      }
  
      // Enviar una respuesta al cliente
      res.status(200).json({
        code: 1,
        message: 'Application Created Successfully',
        data: newApplication
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: -100,
        message: 'An error occurred while creating the application'
      });
    }
  };

  export const getApplications = async( req, res ) => {
    try {
      const applications = await Application.findAll({
        include: [
            { model: Group, attributes: ['name'] }, // Incluir el nombre del grupo
            { model: Event, attributes: ['name'] }  // Incluir el nombre del evento
        ]
      });
      return res.status(200).json({
        code: 1,
        message: 'Applications retrieved successfully',
        data: applications
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: -100,
        message: 'An error ocurred while retrieveng the applications',
        error: error.message
      });
    }
  }


  export const getApplicationById = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { id } = req.params;
  
      const application = await Application.findByPk(id, {
        include: [
            { model: Group, attributes: ['name'] },
            { model: Event, attributes: ['name'] }
        ]
    });
      if (!application) {
        return res.status(404).json({
          code: -6,
          message: 'Application not found'
        });
      }
  
      // Enviar una respuesta al cliente
      res.status(200).json({
        code: 1,
        message: 'Application retrieved successfully',
        data: application
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: -100,
        message: 'An error occurred while retrieving the application'
      });
    }
  };

  export const updateApplicationStatus = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      // Si hay errores de validación, responde con un estado 400 Bad Request
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { id } = req.params;
      const { status } = req.body;
  
  
      const application = await Application.findByPk(id);
      if (!application) {
        return res.status(404).json({
          code: -3,
          message: `Application not found with ID: ${id}`
        });
      }

      const eventId = application.id_event; // Asumiendo que tienes un campo eventId en la aplicación
      const event = await Event.findByPk(eventId); // Encuentra el evento relacionado

      // Si el nuevo estado es "accepted"
      if (status === 'accepted') {
          // Actualiza el id_application del evento
          event.id_application = id; // Establecer el id de la aplicación aceptada
          await event.save();

          // Rechazar todas las otras aplicaciones del mismo evento
          await Application.update(
              { status: 'rejected' },
              { where: { id_event: eventId, id_application: { [Op.ne]: id } } } // Rechaza todas menos la aceptada
          );
      }

      else if (status === 'rejected') {
        // Si la aplicación rechazada es la aceptada, elimina el id_application del evento
        if (event.id_application == id) {
            event.id_application = null; // Limpia el id_application
            await event.save();
        }
      }
  
      application.status = status;
      await application.save();
  
      res.status(200).json({
        code: 1,
        message: 'Application status Updated Successfully',
        data: application
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: -100,
        message: 'An error occurred while updating the application status'
      });
    }
  };

  export const deleteApplication = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      // Si hay errores de validación, responde con un estado 400 Bad Request
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { id } = req.params;
  
      // Buscar  por su ID en la base de datos y eliminarlo
      const application = await Application.destroy({ where: { id_application: id } });
  
      // Verificar si fue encontrado y eliminado
      if (!application) {
        return res.status(404).json({
          code: -100,
          message: 'Application Not Found'
        });
       }
   
      // Enviar una respuesta al cliente
      res.status(200).json({
        code: 1,
        message: 'Application Deleted Successfully'
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: -100,
        message: 'An error occurred while deleting the application'
      });
    }
  };