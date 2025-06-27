# Procetra Project Structure

## Основные папки

- **client/** — фронтенд на React
  - **src/components/** — React-компоненты (UI, модальные окна и т.д.)
  - **src/http/** — API-запросы к серверу
  - **src/store/** — MobX-сторы (состояние приложения)
- **server/** — бэкенд на Node.js + Express
  - **controllers/** — обработчики запросов (логика для Brand, Type, Product и т.д.)
  - **routes/** — роутеры Express (маршруты для API)
  - **prisma/** — схема базы данных (schema.prisma)
  - **middleware/** — промежуточные обработчики (например, обработка ошибок)
  - **db.js** — подключение к базе данных

## Пример структуры

```
Procetra/
├── client/
│   └── src/
│       ├── components/
│       ├── http/
│       └── store/
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   ├── middleware/
│   └── db.js
```

## Основные файлы

- **server/controllers/brandController.js** — логика для создания и получения брендов
- **server/routes/brandRouter.js** — маршруты для брендов
- **server/controllers/typeBrandController.js** — логика для связей Brand <-> Type
- **server/routes/typeBrandRouter.js** — маршруты для связей Brand <-> Type
- **server/index.js** — запуск сервера и подключение роутеров

## Как искать нужный код

- **API-запросы** — ищи в `client/src/http/`
- **UI и формы** — ищи в `client/src/components/`
- **Работа с состоянием** — ищи в `client/src/store/`
- **Бизнес-логика и работа с БД** — ищи в `server/controllers/`
- **Маршруты API** — ищи в `server/routes/`

---

> **Совет:**  
> Используй поиск по проекту (`Ctrl+Shift+F` в VS Code) и переход к определению (`F12`), чтобы быстро находить нужные файлы и функции.

---

Если нужно добавить описание для конкретного модуля — просто дополни этот файл!

# Не забудь поставить звезду

## npm run dev - запуск сервера

## npm start - запуск клиента
