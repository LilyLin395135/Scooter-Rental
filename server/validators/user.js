import { body } from 'express-validator';

export const createUserValidator = [
  body('name')
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 255 }).withMessage('Name is too long.'),
  body('cellphone')
    .notEmpty().withMessage('Cellphone is required.')
    .isMobilePhone('zh-TW').withMessage('Cellphone format is invalid.'),
];