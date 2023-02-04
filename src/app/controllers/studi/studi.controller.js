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
exports.getDataUjianEdit = async (req, res) => {
    // console.log(req.body);
    try {
        let success = false;
        let message = "Tidak ada ujian aktif";
        let response = await studiService.getDataUjianEdit(req.meId, req.params.ujian_proses_kelas_id);
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


exports.doUjianDaftar = async (req, res) => {
    // console.log(req.params.ujian_proses_kelas_id);
    try {
        let success = false;
        let data = null
        // let message = "Tidak ada ujian aktif";
        let response = await studiService.doUjianDaftar(req.meId, req.params.ujian_proses_kelas_id);
        if (response) {
            success = response.success;
            data = response.data;
            paketsoal_id = response.paketsoal_id
            // message = "Ujian aktif ditemukan";
        } else {
            data = "Kelas tidak terdaftar untuk paket ini!";
        }
        return res.status(200).send({
            success,
            data,
            paketsoal_id
            // message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.periksa_daftar = async (req, res) => {
    // console.log(req.params.ujian_proses_kelas_id);
    try {
        let success = false;
        let data = null
        // let message = "Tidak ada ujian aktif";
        let response = await studiService.periksa_daftar(req.meId, req.params.ujian_proses_kelas_id);
        if (response) {
            success = response.success;
            data = response.data;
            // message = "Ujian aktif ditemukan";
        } else {
            data = "Siswa Belum daftar";
        }
        return res.status(200).send({
            success,
            data,
            // message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.getKategoriSoal = async (req, res) => {
    // console.log(req.params.ujian_proses_kelas_id);
    try {
        let success = false;
        let data = null
        // let message = "Tidak ada ujian aktif";
        let response = await studiService.getKategoriSoal(req.meId, req.params.ujian_proses_kelas_id, req.params.ujian_paketsoal_id);
        if (response) {
            success = response.success;
            data = response.data;
            // message = "Ujian aktif ditemukan";
        } else {
            data = "-";
        }
        return res.status(200).send({
            success,
            data,
            // message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.getKategoriSoalDetail = async (req, res) => {
    // console.log(req.params.ujian_proses_kelas_id);
    try {
        let success = false;
        let data = null
        // let message = "Tidak ada ujian aktif";
        let response = await studiService.getKategoriSoalDetail(req.meId, req.params.ujian_paketsoal_id, req.params.kategori_id);
        if (response) {
            success = response.success;
            data = response.data;
            // message = "Ujian aktif ditemukan";
        } else {
            data = "-";
        }
        return res.status(200).send({
            success,
            data,
            // message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.doMulaiUjian = async (req, res) => {
    // console.log(req.params.ujian_proses_kelas_id);
    try {
        let success = false;
        let data = null
        // let message = "Tidak ada ujian aktif";
        let response = await studiService.doMulaiUjian(req.meId, req.params.ujian_proses_kelas_id, req.params.ujian_paketsoal_kategori_id);
        if (response) {
            success = response.success;
            data = response.data;
            message = response.message;
            // message = "Ujian aktif ditemukan";
        } else {
            data = "-";
        }
        return res.status(200).send({
            success,
            data,
            message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.getSoal = async (req, res) => {
    // console.log(req.params.ujian_proses_kelas_id);
    try {
        let success = false;
        let data = null
        // let message = "Tidak ada ujian aktif";
        let response = await studiService.getSoal(req.meId, req.params.ujian_proses_kelas_id, req.params.ujian_paketsoal_kategori_id, req.params.ujian_proses_kelas_siswa_kategori_id);
        if (response) {
            success = response.success;
            data = response.data;
            message = response.message;
            // message = "Ujian aktif ditemukan";
        } else {
            data = "-";
        }
        return res.status(200).send({
            success,
            data,
            message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.doInsertJawaban = async (req, res) => {
    // console.log(req.params.ujian_proses_kelas_id);
    try {
        let success = false;
        let data = null
        // let message = "Tidak ada ujian aktif";
        let dataForm = {
            ujian_paketsoal_soal_id: req.body.ujian_paketsoal_soal_id,
            kode_soal: req.body.kode_soal,
            ujian_paketsoal_soal_pilihanjawaban_id: req.body.ujian_paketsoal_soal_pilihanjawaban_id,
            kode_jawaban: req.body.kode_jawaban,
        }
        // console.log('====================================');
        // console.log(dataForm);
        // console.log('====================================');
        let response = await studiService.doInsertJawaban(req.meId, req.params.ujian_proses_kelas_siswa_kategori_id, dataForm);
        if (response) {
            success = response.success;
            data = response.data;
            message = response.message;
            // message = "Ujian aktif ditemukan";
        } else {
            data = "-";
        }
        return res.status(200).send({
            success,
            data,
            message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};
exports.doFinish = async (req, res) => {
    // console.log(req.params.ujian_proses_kelas_id);
    try {
        let success = false;
        let data = null
        // let message = "Tidak ada ujian aktif";
        let response = await studiService.doFinish(req.meId, req.params.ujian_proses_kelas_siswa_kategori_id);
        if (response) {
            success = response.success;
            data = response.data;
            message = response.message;
            // message = "Ujian aktif ditemukan";
        } else {
            data = "-";
        }
        return res.status(200).send({
            success,
            data,
            message
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};