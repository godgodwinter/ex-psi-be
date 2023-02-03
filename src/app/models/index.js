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
// MASTERING
db.siswa = require("./siswa.model.js")(sequelize, Sequelize);
db.kelas = require("./kelas.model.js")(sequelize, Sequelize);

db.sekolah = require("./sekolah.model.js")(sequelize, Sequelize);
db.paket = require("./paket.model.js")(sequelize, Sequelize);
// !MASTERING-RELASI
db.siswa.belongsTo(db.kelas, {
    foreignKey: {
        name: 'kelas_id'
    },
});

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
// !MASTERING-RELASI
// MASTERING-END

// UJIAN-STUDI
// paketsoal
db.ujian_paketsoal = require("./studi/ujian_paketsoal.model.js")(sequelize, Sequelize);
// proses
db.ujian_proses = require("./studi/ujian_proses.model.js")(sequelize, Sequelize);
db.ujian_proses_kelas = require("./studi/ujian_proses_kelas.model.js")(sequelize, Sequelize);
db.ujian_proses_kelas_siswa = require("./studi/ujian_proses_kelas_siswa.model.js")(sequelize, Sequelize);
db.ujian_proses_kelas_siswa_kategori = require("./studi/ujian_proses_kelas_siswa_kategori.model.js")(sequelize, Sequelize);
db.ujian_proses_kelas_siswa_kategori_hasil = require("./studi/ujian_proses_kelas_siswa_kategori_hasil.model.js")(sequelize, Sequelize);

db.ujian_proses_kelas.belongsTo(db.ujian_proses, {
    foreignKey: {
        name: 'ujian_proses_id'
    },
});
db.ujian_proses_kelas.belongsTo(db.ujian_paketsoal, {
    foreignKey: {
        name: 'paketsoal_id'
    },
});
// !MASTERING-RELASI
// UJIAN-STUDI-END


module.exports = db;