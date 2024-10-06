import Group from '../models/groupModel.js';
import { validationResult } from 'express-validator';

export const getGroups = async( req, res ) => {
  try {
    const groups = await Group.findAll();
    return res.status(200).json({
      code: 1,
      message: 'Groups retrieved successfully',
      data: groups
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error ocurred while retrieveng the groups',
      error: error.message
    });
  }
}

export const getGroupById = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).json({
        code: -6,
        message: 'No group found with ID: ${id'
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Group retrieved successfully',
      data: group
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while retrieving the group'
    });
  }
};

export const createGroup = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, name } = req.body;
    let newGroup;
    try {
      newGroup = await Group.create({ user_id, name });
    } catch (error) {
      // Si hay un error de duplicación de clave única (por ejemplo, título duplicado)
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
          code: -61,
          message: 'Duplicate Group Title'
        });
      }
    }

    if (!newGroup) {
      return res.status(404).json({
        code: -6,
        message: 'Error When Creating the Group'
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Group Created Successfully',
      data: newGroup
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while creating the group'
    });
  }
};


export const updateGroup = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name } = req.body;


    const group = await Group.findByPk(id);
    if (!group) {
      return res.status(404).json({
        code: -3,
        message: `Group not found with ID: ${id}`
      });
    }

    group.name = title;

    await group.save();

    res.status(200).json({
      code: 1,
      message: 'Group Updated Successfully',
      data: group
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while updating the group'
    });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const deletedGroup = await Group.destroy({ where: { id_group: id } });

    // Verificar si el venue fue encontrado y eliminado
    if (!deletedGroup) {
      return res.status(404).json({
        code: -100,
        message: 'Group Not Found'
      });
     }
 
    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'Group Deleted Successfully'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while deleting the group'
    });
  }
};