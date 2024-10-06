import { body } from 'express-validator';

export const eventValidator = [
    body("venue_id")
        .exists()
        .withMessage("Venue ID is required")
        .isInt({ min: 1 })
        .withMessage("Venue ID should be a valid integer"),
    
    body("f_ini")
        .exists()
        .withMessage("Start date is required")
        .isISO8601()
        .withMessage("Start date should be a valid ISO 8601 date"),
    
    body("f_end")
        .exists()
        .withMessage("End date is required")
        .isISO8601()
        .withMessage("End date should be a valid ISO 8601 date")
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.f_ini)) {
                throw new Error("End date must be after start date");
            }
            return true;
        }),

    body("name")
        .optional()
        .isString()
        .withMessage("Name should be a string")
        .isLength({ min: 3 })
        .withMessage("Name should be at least 3 characters long"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description should be a string"),

    body("payment")
        .optional()
        .isDecimal()
        .withMessage("Payment should be a decimal value"),

    body("event_type")
        .exists()
        .withMessage("Event type is required")
        .isString()
        .withMessage("Event type should be a string"),

    body("date_end_bid")
        .exists()
        .withMessage("Bid end date is required")
        .isISO8601()
        .withMessage("Bid end date should be a valid ISO 8601 date")
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.f_ini)) {
                throw new Error("Bid end date must be before the event start date");
            }
            return true;
        }),

    body("price")
        .exists()
        .withMessage("Price is required")
        .isInt({ min: 0 })
        .withMessage("Price should be a valid integer greater than or equal to 0")
];
