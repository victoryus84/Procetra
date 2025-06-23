require('dotenv').config();
const { Client } = require('pg');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Функция для создания базы, если её нет
const createDatabaseIfNotExists = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
    });

    try {
        await client.connect();
        const dbName = process.env.DB_NAME;
        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname = $1`,
            [dbName]
        );

        if (result.rowCount === 0) {
            console.log(`Database "${dbName}" does not exist. Creating...`);
            await client.query(`CREATE DATABASE "${dbName}"`);
            console.log(`Database "${dbName}" created successfully.`);
        } else {
            console.log(`Database "${dbName}" already exists.`);
        }
    } catch (error) {
        console.error('Error checking/creating database:', error.message);
    } finally {
        await client.end();
    }
};

// Если файл запускается напрямую — создать базу
if (require.main === module) {
    createDatabaseIfNotExists();
}

// Экспортируем и Prisma, и функцию создания базы
module.exports = {
    prisma,
    createDatabaseIfNotExists,
};