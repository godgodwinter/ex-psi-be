module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USERNAME || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DB: process.env.DB_DATABASE || "db-psikotest",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};