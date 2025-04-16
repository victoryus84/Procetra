require('dotenv').config(); // Load environment variables
const { Sequelize } = require('sequelize');
const { Client } = require('pg'); // Use pg client to create the database if it doesn't exist

// Initialize Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        logging: false, // Disable logging for cleaner output
    }
);

// Function to create the database if it doesn't exist
const createDatabaseIfNotExists = async () => {
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL to check/create database.');

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
        console.log('PostgreSQL client connection closed.');
    }
};

// Function to initialize the database
const initDatabase = async () => {
    try {
        await createDatabaseIfNotExists(); // Ensure the database exists

        console.log('Connecting to the database...');
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');

        console.log('Synchronizing the database...');
        await sequelize.sync({ force: true }); // Use `force: true` to drop and recreate tables
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error initializing the database:', error.message);
    } finally {
        await sequelize.close();
        console.log('Database connection closed.');
    }
};

// Run the initialization if this file is executed directly
if (require.main === module) {
    initDatabase();
}

// Export the Sequelize instance and initDatabase function
module.exports = { sequelize, initDatabase };