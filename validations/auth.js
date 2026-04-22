import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Не вірний формат ел.пошти').isEmail(),
  body('password', 'Пароль має містити мінімум 5 символів').isLength({ min: 5 }),
  body('fullName', 'Вкажіть Імʼя, мінімум 3 символи').isLength({ min: 3 }),
  body('avatarUrl', 'Не вірне посилання на аватарку').optional().isURL(),
];
