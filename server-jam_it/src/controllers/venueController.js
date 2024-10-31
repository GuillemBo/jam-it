import Venue from '../models/venueModel.js';
import { validationResult } from 'express-validator';

export const getVenues = async( req, res) => {
  try {
    const venues = await Venue.findAll();
    return res.status(200).json({
      code: 1,
      message: 'Venues retrieved successfully',
      data: venues
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error ocurred while retrieveng the venues',
      error: error.message
    });
  }
}

export const getVenueById = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const venue = await Venue.findByPk(id);
    if (!venue) {
      return res.status(404).json({
        code: -6,
        message: `No venue found with ID: ${id}`
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Venue retrieved successfully',
      data: venue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while retrieving the venue'
    });
  }
};

export const createVenue = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_user, title, address, capacity } = req.body;
    let newVenue;
    try {
      newVenue = await Venue.create({ id_user, title, address, capacity });
    } catch (error) {
      // Si hay un error de duplicación de clave única (por ejemplo, título duplicado)
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          code: -61,
          message: 'Duplicate Venue Title'
        });
      }
    }

    if (!newVenue) {
      return res.status(404).json({
        code: -6,
        message: 'Error When Creating the Venue'
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Venue Created Successfully',
      data: newVenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while creating the venue'
    });
  }
};


export const updateVenue = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, address, capacity } = req.body;


    const venue = await Venue.findByPk(id);
    if (!venue) {
      return res.status(404).json({
        code: -3,
        message: `Venue not found with ID: ${id}`
      });
    }

    venue.title = title;
    venue.address = address;
    venue.capacity = capacity
    await venue.save();

    res.status(200).json({
      code: 1,
      message: 'Venue Updated Successfully',
      data: venue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while updating the venue'
    });
  }
};

export const deleteVenue = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Buscar un venue por su ID en la base de datos y eliminarlo
    const deletedVenue = await Venue.destroy({ where: { id_venue: id } });

    // Verificar si el venue fue encontrado y eliminado
    if (!deletedVenue) {
      return res.status(404).json({
        code: -100,
        message: 'Venue Not Found'
      });
     }
 
    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Venue Deleted Successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while deleting the venue'
    });
  }
};

export const getVenuesByUserId = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;

    // Obtener venues del usuario junto con los eventos asociados
    const venues = await Venue.findAll({
      where: { id_user: userId },
    });

    if (!venues.length) {
      return res.status(404).json({
        code: -6,
        message: `No venues found for user ID: ${userId}`
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Venues by user id retrieved successfully',
      data: venues
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while retrieving Venues by user id'
    });
  }
};
