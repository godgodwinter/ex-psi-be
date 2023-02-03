const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
//database wide options
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    //prevent sequelize from pluralizing table names
    // define: {
    //     //prevent sequelize from pluralizing table names
    //     freezeTableName: true
    // },
    // operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.siswa = require("./siswa.model.js")(sequelize, Sequelize);
db.kelas = require("./kelas.model.js")(sequelize, Sequelize);

db.sekolah = require("./sekolah.model.js")(sequelize, Sequelize);
db.paket = require("./paket.model.js")(sequelize, Sequelize);

// RELASI
db.siswa.belongsTo(db.kelas, {
    foreignKey: {
        name: 'kelas_id'
    },
});

db.siswa.belongsTo(db.sekolah, {
    foreignKey: {
        name: 'sekolah_id'
    },
});

db.sekolah.belongsTo(db.paket, {
    foreignKey: {
        name: 'paket_id'
    },
});


module.exports = db;