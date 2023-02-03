//IMPORT
const db = require("../../models");
// DB
const sekolah = db.sekolah;
const paket = db.paket;
const Op = db.Sequelize.Op;
// RELATION

// Fn
const getPaket = async (sekolah_id) => {
    try {
        const response = await paket.findOne({ where: { id: sekolah_id } });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

// EXPORT MODULE
module.exports = { getPaket }