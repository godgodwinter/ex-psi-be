//IMPORT
const db = require("../../models");
// MOMENT 
//* https://devhints.io/moment
const moment = require('moment');
const localization = require('moment/locale/id')
moment.updateLocale("id", localization);
// DB
const Siswa = db.siswa;
const kelas = db.kelas;
const sekolah = db.sekolah;
// proses
const { ujian_paketsoal, ujian_proses_kelas_siswa, ujian_proses_kelas, ujian_proses_kelas_siswa_kategori } = require("../../models");
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

const periksaUjianAktif = async (meId) => {
    try {
        // const response = await paket.findOne({ where: { id: sekolah_id } });
        let data = null;
        const me = await fn_get_me(meId);
        const resProsesKelas = await ujian_proses_kelas.findOne({ where: { kelas_id: me?.kelas?.id }, include: [db.ujian_proses] });
        let ujian_proses_kelas_id = resProsesKelas.id;
        const resProsesKelasSiswa = await ujian_proses_kelas_siswa.findOne({ where: { ujian_proses_kelas_id } });
        let ujianProsesKelasSiswaId = resProsesKelasSiswa.id;
        const resProsesKelasSiswaKategori = await ujian_proses_kelas_siswa_kategori.findOne({ where: { ujian_proses_kelas_siswa_id: ujianProsesKelasSiswaId, status: 'Aktif' }, order: [['updated_at', 'desc']] });
        let { id, ujian_proses_kelas_siswa_id, status, hasil_per_kategori, tgl_mulai, tgl_selesai, waktu, ujian_paketsoal_kategori_id, created_at, updated_at } = resProsesKelasSiswaKategori;
        data = { id, ujian_proses_kelas_siswa_id, status, hasil_per_kategori, tgl_mulai, tgl_selesai, waktu, ujian_paketsoal_kategori_id, created_at, updated_at };
        // console.log(moment().format("YYYY-MMMM-DD"));
        let getSisaWaktu = await fn_get_sisa_waktu(tgl_selesai);
        data.sisa_waktu = getSisaWaktu?.detik;
        data.sisa_waktu_dalam_menit = getSisaWaktu?.menit;
        data.ujian_proses_kelas_id = ujian_proses_kelas_id;
        data.ujian_proses_kelas_siswa = resProsesKelasSiswa;
        data.getSisaWaktu = getSisaWaktu;
        if (data.sisa_waktu < 0) {
            return null
        }
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
        let result = {
            detik: 0,
            menit: 0
        };
        let selesai = moment(tgl_selesai);
        let now = moment();
        let duration = moment.duration(selesai.diff(now));
        result.detik = duration.asSeconds().toFixed(0)
        result.menit = duration.asMinutes().toFixed(2)
        result.now = now
        result.selesai = selesai
        // result = parseInt(Date.parse(tgl_selesai)) - parseInt(Date.parse(moment().format("YYYY-MM-DD H:i:s")));
        // console.log(result);
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        return result;
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