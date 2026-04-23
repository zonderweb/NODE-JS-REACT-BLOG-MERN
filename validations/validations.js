import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Не вірний формат ел.пошти').isEmail(),
  body('password', 'Пароль має містити мінімум 5 символів').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Не вірний формат ел.пошти').isEmail(),
  body('password', 'Пароль має містити мінімум 5 символів').isLength({ min: 5 }),
  body('fullName', 'Вкажіть Імʼя, мінімум 3 символи').isLength({ min: 3 }),
  body('avatarUrl', 'Не вірне посилання на аватарку').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Введіть заголовок статті').isLength({ min: 3 }).isString(),
  body('text', 'Введіть текст статті').isLength({ min: 5 }).isString(),
  body('tags', 'Не вірний формат тегів (вкажіть масив)').optional().isString(),
  body('imageUrl', 'Не вірне посилання на зображення').optional().isString(),
];
