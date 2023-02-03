//IMPORT
const db = require("../../models");
// DB
const sekolah = db.sekolah;
const paket = db.paket;
const Op = db.Sequelize.Op;
// RELATION

// public function
const getDataUjian = async (sekolah_id) => {
    try {
        const response = await paket.findOne({ where: { id: sekolah_id } });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

const periksaUjianAktif = async (sekolah_id) => {
    try {
        const response = await paket.findOne({ where: { id: sekolah_id } });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};


// private function
// fn
// EXPORT MODULE
module.exports = { getDataUjian, periksaUjianAktif }