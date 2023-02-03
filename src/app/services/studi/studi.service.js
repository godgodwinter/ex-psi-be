//IMPORT
const { ujian_paketsoal } = require("../../models");
const db = require("../../models");
// DB
const Siswa = db.siswa;
const kelas = db.kelas;
const sekolah = db.sekolah;
const ujian_proses_kelas = db.ujian_proses_kelas;
const Op = db.Sequelize.Op;
// RELATION

// public function
const getDataUjian = async (meId) => {
    try {
        const me = await fn_get_me(meId);
        let dataUjian = {};
        const response = await ujian_proses_kelas.findOne({ where: { kelas_id: me?.kelas?.id }, include: [db.ujian_proses] });
        dataUjian = response;
        const { id, status, kelas_id, paketsoal_id, ujian_proses_id, tgl, created_at, updated_at } = response;
        dataUjian = { id, status, kelas_id, paketsoal_id, ujian_proses_id, tgl, created_at, updated_at };
        dataUjian.tgl = response?.ujian_proses?.tgl;
        dataUjian.ujian_proses_status = response?.ujian_proses?.status;
        const paketsoal = await ujian_paketsoal.findOne({ where: { id: paketsoal_id } });
        dataUjian.nama = paketsoal?.nama;
        // dataUjian.response = response;
        return dataUjian;
    } catch (error) {
        console.log(error.message);
    }
};

const periksaUjianAktif = async (sekolah_id) => {
    try {
        // const response = await paket.findOne({ where: { id: sekolah_id } });
        let data = null;
        return data;
    } catch (error) {
        console.log(error.message);
    }
};


// private function
// !fn-ujian-studi
const fn_periksa_ujian_aktif = async (id) => {
    try {
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
};

const fn_get_sisa_waktu = async (tgl_selesai) => {
    try {
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
};


const fn_is_waktu_habis = async (tgl_mulai, tgl_selesai) => {
    try {
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
};


const fn_is_kelas_saya_teerdaftar = async (kelas_id) => {
    try {
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
};

const fn_is_sudah_daftar = async (ujian_proses_kelas_id) => {
    try {
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
};

const fn_is_sudah_memulai_ujian = async (ujian_paketsoal_kategori_id) => {
    try {
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
};

const fn_get_tgl_selesai = async (ujian_paketsoal_kategori_id) => {
    try {
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
};

// !fn
const fn_get_me = async (id) => {
    try {
        const response = await Siswa.findOne({ where: { id }, include: kelas });
        return response;
    } catch (error) {
        console.log(error.message);
    }
};
// EXPORT MODULE
module.exports = { getDataUjian, periksaUjianAktif }