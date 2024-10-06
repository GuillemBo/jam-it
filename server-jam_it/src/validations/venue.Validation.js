import { body, check } from 'express-validator';
//body():se utiliza para validar los campos en el cuerpo (body)
//check():se utiliza para validar los campos en el cuerpo (body), los parámetros de la ruta (params)

export const venueValidator = [
    body("title")
        .exists()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title should be a string")
        .isLength({ min: 3 })
        .withMessage("Title should be at least 3 characters"),
    
    body("address")
        .exists()
        .withMessage("Address is required")
        .isString()
        .withMessage("Address should be a string")
        .isLength({ min: 10 })
        .withMessage("Address should be at least 10 characters"),
    
    body("capacity")
        .exists()
        .withMessage("Capacity is required")
        .isInt({ min: 1 })
        .withMessage("Capacity should be a positive integer"),

    check('user_id')
        .exists()
        .withMessage('User ID is required')
        .isInt()
        .withMessage('User ID must be an integer')
];