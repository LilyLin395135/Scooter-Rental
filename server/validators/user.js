import { body } from 'express-validator';

export const createUserValidator = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('cellphone').notEmpty().withMessage('Cellphone is required.'),
  body('cellphone').isMobilePhone('zh-TW').withMessage('Cellphone format is invalid.'),
];