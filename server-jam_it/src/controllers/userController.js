import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import fs from 'fs';

export const getUser = async (req, res) => {
  try {

    const user_data = {
      "id_user": req.user.id_user,
      "name": req.user.name,
      "email": req.user.email,
      "role": req.user.role,
      "created_at": req.user.created_at,
    };

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'User Detail',
      data: user_data 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while obtaining the USER'
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const errors = validationResult(req);

    // Si hay errores de validación, responde con un estado 400 Bad Request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Buscar un usuario por su ID en la base de datos
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        code: -6,
        message: `No user found with ID: ${id}`
      });
    }

    // Enviar una respuesta al cliente
    res.status(200).json({
      code: 1,
      message: 'User retrieved successfully',
      data: user
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while retrieving the user'
    });
  }
};


// CODIGO PARA SUBIR FOTOS (POR SI QUIERO MAS ADELANTE)

export const uploadPhoto = async (req, res) => {
  try {
    const rutaArchivo = "./src/uploads/"; // Ruta completa al archivo que deseas eliminar
    //await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).json({
        code: -101,
        message: 'Please upload a file!'
      });
    }

    //Si el usuario tiene foto, se la eliminamos
    if (req.user.photo != null) {
      console.log("Ruta:" + rutaArchivo + req.user.photo);
      fs.access(rutaArchivo + req.user.photo, fs.constants.F_OK, (err) => {
        if (err) {
          console.log('The file does not exist or cannot be accessed');
          /*res.status(400).json({
            code: -102,
            message: 'The file does not exist or cannot be accessed',
            error: err
          });*/
        } else {
          // Eliminar el archivo
          fs.unlink(rutaArchivo + req.user.photo, (err) => {
            if (err) {
              console.error('Error al eliminar el archivo', err);
              return res.status(500).json({
                code: -103,
                message: 'Error deleting file',
                error: err
              });
            }
            console.log('El archivo ha sido eliminado correctamente.');
          });
        }
       
      });
    } else console.log("El usuario no tiene foto, la seteo en la DB");

    //Actualizo la imagen del usuario
    console.log("Guardo la imagen: " + req.file.filename + " en el id de usuario: " + req.user.id_user);
    await User.update({ photo: req.file.filename }, { where: { id_user: req.user.id_user } })
    return res.status(200).json({
      code: 1,
      message: "Uploaded the file successfully: " + req.file.originalname,
    });

  } catch (err) {

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      error: `${err}`
    });
  }
};