const db = require("../../models");
const config = require("../../config/auth.config");
const studiService = require("../../services/studi/studi.service")
const Siswa = db.siswa;
const kelas = db.kelas;
const sekolah = db.sekolah;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.getDataUjian = async (req, res) => {
    // console.log(req.body);
    try {
        const response = await studiService.getDataUjian(req.meId);

        return res.status(200).send({
            success: true,
            data: response
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};


exports.periksaUjianAktif = async (req, res) => {
    // console.log(req.body);
    try {
        let success = false;
        let message = "Tidak ada ujian aktif";
        let response = await studiService.periksaUjianAktif(req.meId);
        if (response) {
            success = true;
            message = "Ujian aktif ditemukan";
        } else {
            response = { ujian_proses_kelas_id: null }
        }
        return res.status(200).send({
            success,
            data: response,
            message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};