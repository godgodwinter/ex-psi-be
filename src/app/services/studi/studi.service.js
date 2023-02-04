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
const { ujian_paketsoal, ujian_proses_kelas_siswa, ujian_proses_kelas, ujian_proses_kelas_siswa_kategori, ujian_paketsoal_kategori, ujian_paketsoal_soal } = require("../../models");
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


// !DAFTAR
const doUjianDaftar = async (meId, ujian_proses_kelas_id) => {
    try {
        let data = null;
        const me = await fn_get_me(meId);
        const periksaKelas = await fn_is_kelas_saya_terdaftar(me.kelas_id);
        const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
        // console.log(periksaKelas);
        if (periksaKelas == false) {
            return false
        }
        // periksa apakah siswa sudah daftar ujian
        const periksaSiswaSudahDaftarUjian = await fn_is_siswa_sudah_daftar_ujian(ujian_proses_kelas_id, meId);
        if (periksaSiswaSudahDaftarUjian) {
            return {
                success: false,
                data: "Data sudah ada",
                paketsoal_id: getDataKelas.paketsoal_id
            }
        }
        // insert ujian_proses_kelas_siswa
        const doInsertProsesSiswa = await ujian_proses_kelas_siswa.create({
            ujian_proses_kelas_id,
            siswa_id: meId,
            status: "Aktif",
            created_at: moment().format(),
            updated_at: moment().format(),
        });
        console.log(doInsertProsesSiswa);
        // !jika periksa kelas ada dan proses selanjutnya true

        return {
            success: true,
            data: doInsertProsesSiswa,
            paketsoal_id: getDataKelas.paketsoal_id
        }

    } catch (error) {
        console.log(error.message);
    }
};
const periksa_daftar = async (meId, ujian_proses_kelas_id) => {
    try {
        let data = null;
        const me = await fn_get_me(meId);
        // periksa apakah siswa sudah daftar ujian
        const periksaSiswaSudahDaftarUjian = await fn_is_siswa_sudah_daftar_ujian(ujian_proses_kelas_id, meId);
        if (periksaSiswaSudahDaftarUjian) {
            return {
                success: true,
                data: "Siswa Sudah daftar",
            }
        }
        return data

    } catch (error) {
        console.log(error.message);
    }
};
const getKategoriSoal = async (meId, ujian_proses_kelas_id, ujian_paketsoal_id) => {
    try {
        let data = null;
        const me = await fn_get_me(meId);
        const periksaKelas = await fn_is_kelas_saya_terdaftar(me.kelas_id);
        const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
        // console.log(periksaKelas);
        if (periksaKelas == false) {
            return {
                success: false,
                data: "Kelas tidak terdaftar"
            }
        }


        // periksa apakah siswa sudah daftar ujian
        const periksaSiswaSudahDaftarUjian = await fn_is_siswa_sudah_daftar_ujian(ujian_proses_kelas_id, meId);
        if (periksaSiswaSudahDaftarUjian) {
            //  ujian_paketsoal_kategori get wher ujian_paketsoal_id
            const getKategori = await ujian_paketsoal_kategori.findAll({ where: { ujian_paketsoal_id: ujian_paketsoal_id } })

            // console.log(ujian_paketsoal_id, getKategori);
            for (const tempData of getKategori) {
                let jumlah_soal = 0;
                let status = 'Belum';
                let tipe = 'Pilihan ganda';

                const getStatsPerKategori = await db.ujian_paketsoal_soal.count({
                    where: {
                        ujian_paketsoal_kategori_id: tempData.id, deleted_at: null
                    }
                })
                // console.log(tempData.id, getStatsPerKategori);
                let getStatus = await db.ujian_proses_kelas_siswa_kategori.findOne({
                    where: {
                        ujian_paketsoal_kategori_id: tempData.id
                    },
                    include: [
                        {
                            model: db.ujian_proses_kelas_siswa,
                            attributes: ['id', 'status'],
                            where: {
                                siswa_id: meId
                            }
                        }
                    ]
                })
                // console.log(getStatus, tempData.id);
                // break;
                status = getStatus?.status;
                let getSisaWaktu = 0;
                if (getStatus) {
                    if (getStatus?.status == 'Aktif') {
                        getSisaWaktu = await fn_get_sisa_waktu(getStatus.tgl_selesai);
                        if (getSisaWaktu.detik < 1) {
                            status = 'Selesai'
                        }
                    }
                }
                tempData.setDataValue("jumlah_soal", getStatsPerKategori)
                tempData.setDataValue("status", getStatus ? status : 'Belum')
                tempData.setDataValue("jml_soal", getStatsPerKategori)
                tempData.setDataValue("tipe", tipe)
                // data.push(element);
            }

            return {
                success: true,
                data: getKategori,
                periksa: true
            }
        }

    } catch (error) {
        console.log(error.message);
    }
};

const getKategoriSoalDetail = async (meId, ujian_proses_kelas_id, kategori_id) => {
    try {
        let data = null;
        const me = await fn_get_me(meId);
        const periksaKelas = await fn_is_kelas_saya_terdaftar(me.kelas_id);
        const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
        // console.log(periksaKelas);
        if (periksaKelas == false) {
            return {
                success: false,
                data: "Kelas tidak terdaftar"
            }
        }
        data = await db.ujian_paketsoal_kategori.findOne({ where: { id: kategori_id } })
        return {
            success: true,
            data
        }
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
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


// return response;
// periksa jika belum maka insert

const fn_is_waktu_habis = async (tgl_mulai, tgl_selesai) => {
    try {
        // const response = await Siswa.findOne({ where: { id }, include: kelas });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
};


const fn_is_kelas_saya_terdaftar = async (kelas_id) => {
    try {
        let result = false;
        const response = await ujian_proses_kelas.count({ where: { kelas_id, status: 'Aktif' } });
        if (response > 0) {
            result = true;
        }
        return result;
    } catch (error) {
        console.log(error.message);
    }
};

const fn_is_siswa_sudah_daftar_ujian = async (ujian_proses_kelas_id, meId) => {
    try {
        const response = await ujian_proses_kelas_siswa.count({ where: { ujian_proses_kelas_id, siswa_id: meId } });
        if (response < 1) {
            return false
        }
        return true;
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
module.exports = { getDataUjian, periksaUjianAktif, doUjianDaftar, periksa_daftar, getKategoriSoal, getKategoriSoalDetail }