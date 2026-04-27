# Blog MERN Backend (Node.js + Express + MongoDB)

Backend API для блогу: авторизація користувачів (JWT), CRUD статей, завантаження зображень.

## Технології

- Node.js (ESM, `"type": "module"`)
- Express 5
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- `bcrypt` для хешування паролів
- `express-validator` для валідації
- `multer` для upload файлів
- ESLint

## Структура проєкту

```text
.
├── controllers/
│   ├── PostControllers.js
│   ├── UserController.js
│   └── index.js
├── models/
│   ├── Post.js
│   └── User.js
├── utils/
│   ├── checkAuth.js
│   ├── handleValidationsErrors.js
│   └── index.js
├── validations/
│   └── validations.js
├── uploads/
├── env.json
├── eslint.config.js
├── index.js
└── package.json
```

## Налаштування

Створіть `env.json` у корені:

```json
{
  "dbUser": "<mongo_user>",
  "dbPassword": "<mongo_password>",
  "dbTable": "<db_name>",
  "secret": "<jwt_secret>"
}
```

> `env.json` містить секрети. Не публікуйте реальні значення в репозиторії.

## Встановлення і запуск

```bash
npm install
npm run dev
```

Сервер запускається на `http://localhost:4444`.

## API

### Auth

#### POST `/auth/register`
Реєстрація користувача.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "12345",
  "fullName": "User Name",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

#### POST `/auth/login`
Логін користувача.

**Body:**

```json
{
  "email": "user@example.com",
  "password": "12345"
}
```

#### GET `/auth/me`
Отримати поточного користувача.

**Header:**

```http
Authorization: Bearer <jwt_token>
```

### Upload

#### POST `/upload`
Завантаження одного зображення.

**Header:**

```http
Authorization: Bearer <jwt_token>
```

**Form-Data:**
- `image` — файл

**Response:**

```json
{
  "url": "/uploads/<filename>"
}
```

### Posts

#### GET `/posts`
Отримати список статей (з `user` через `populate`).

#### GET `/posts/:id`
Отримати одну статтю за id і збільшити `viewsCount` на 1.

#### POST `/posts`
Створити статтю (потрібен токен).

**Header:**

```http
Authorization: Bearer <jwt_token>
```

**Body:**

```json
{
  "title": "Заголовок",
  "text": "Текст статті",
  "imageUrl": "/uploads/example.jpg",
  "tags": "react,mern"
}
```

#### PATCH `/posts/:id`
Оновити статтю (потрібен токен).

#### DELETE `/posts/:id`
Видалити статтю (потрібен токен).

## Валідації (express-validator)

- `email` — валідний email
- `password` — мінімум 5 символів
- `fullName` — мінімум 3 символи
- `title` — мінімум 3 символи
- `text` — мінімум 5 символів
- `tags` — optional, перевіряється як `string`
- `imageUrl` — optional, `string`

При помилках валідації повертається `400` і масив помилок.

## Схеми даних

### User

- `fullName: String` (required)
- `email: String` (required, unique)
- `passwordHash: String` (required)
- `avatarUrl: String`
- `createdAt`, `updatedAt`

### Post

- `title: String` (required)
- `text: String` (required, unique)
- `tags: Array` (default `[]`)
- `viewsCount: Number` (default `0`)
- `user: ObjectId` (ref `User`, required)
- `imageUrl: String`
- `createdAt`, `updatedAt`

## Команди

```bash
npm run dev       # запуск через nodemon
npm run lint      # перевірка ESLint
npm run lint:fix  # автофікс ESLint
```

