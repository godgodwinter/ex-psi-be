const db = require("../../models");
const config = require("../../config/auth.config");
const sekolahService = require("../../services/sekolah/sekolah.service")
const Siswa = db.siswa;
const kelas = db.kelas;
const sekolah = db.sekolah;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.getDataUjian = async (req, res) => {
    // console.log(req.body);
    try {

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
