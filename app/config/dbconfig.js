require('dotenv').config()

const development = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: "mysql"
}

const test = {
    host: process.env.DB_HOST || "127.0.0.1",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_DATABASE || "test_database",
    dialect: "mysql",
    logging: false // Disable logging in test environment
}

module.exports = {
    development,
    test
}