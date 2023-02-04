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
        const response = await ujian_proses_kelas.findAll({ where: { kelas_id: me?.kelas?.id }, include: [db.ujian_proses] });
        dataUjian = response;
        let data = [];
        // const { id, status, kelas_id, paketsoal_id, ujian_proses_id, tgl, created_at, updated_at } = response;
        // dataUjian = { id, status, kelas_id, paketsoal_id, ujian_proses_id, tgl, created_at, updated_at };

        // dataUjian.tgl = response?.ujian_proses?.tgl;
        // dataUjian.ujian_proses_status = response?.ujian_proses?.status;
        // const paketsoal = await ujian_paketsoal.findOne({ where: { id: paketsoal_id } });
        // dataUjian.nama = paketsoal?.nama;

        // dataUjian.response = response;

        for (const tempData of response) {
            // let jumlah_soal = 0;
            // let status = 'Belum';
            // let tipe = 'Pilihan ganda';

            tempData.setDataValue("tgl", response?.ujian_proses?.tgl)
            tempData.setDataValue("ujian_proses_status", response?.ujian_proses?.status);
            const paketsoal = await ujian_paketsoal.findOne({ where: { id: tempData.paketsoal_id } });
            tempData.setDataValue("nama", paketsoal?.nama)
            data.push(tempData)
        }
        return data;
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
const getDataUjianEdit = async (meId, ujian_proses_kelas_id) => {
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
        console.log('tes');
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
const doMulaiUjian = async (meId, ujian_proses_kelas_id, ujian_paketsoal_kategori_id) => {
    try {
        let data = null;
        const me = await fn_get_me(meId);
        const periksaKelas = await fn_is_kelas_saya_terdaftar(me.kelas_id);
        // const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
        // // console.log(periksaKelas);
        if (periksaKelas == false) {
            return {
                success: false,
                data: "Kelas tidak terdaftar"
            }
        }
        const periksaSiswaSudahDaftarUjian = await fn_is_siswa_sudah_daftar_ujian(ujian_proses_kelas_id, meId);
        if (periksaSiswaSudahDaftarUjian) {
            const ujian_proses_kelas_siswa_id = await fn_get_ujian_proses_kelas_siswa_id(meId);
            // console.log(ujian_proses_kelas_siswa_id);
            // * periksa sudah memulai ujian ?
            const periksa_apakah_sudah_memulai_ujian = await fn_is_sudah_memulai_ujian(ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id);
            if (periksa_apakah_sudah_memulai_ujian) {
                let sisa_waktu = 0
                let sisa_waktu_dalam_menit = 0
                // getData Kategori
                const getDataKategori = await db.ujian_proses_kelas_siswa_kategori.findOne({ where: { ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id } })
                if (getDataKategori.tgl_mulai) {
                    let get_fn_get_sisa_waktu = await fn_get_sisa_waktu(getDataKategori.tgl_selesai)
                    sisa_waktu = get_fn_get_sisa_waktu.detik;
                    sisa_waktu_dalam_menit = get_fn_get_sisa_waktu.menit;

                } else {
                    //! ketika direset
                    let tgl_mulai = moment()
                    getDataKategori.setDataValue("tgl_mulai", tgl_mulai)
                    let getWaktudalamPaketWhereKategori = await db.ujian_paketsoal_kategori.findOne({ where: { id: ujian_paketsoal_kategori_id } })
                    let waktu = getWaktudalamPaketWhereKategori.waktu;
                    let tgl_selesai = await fn_get_tgl_selesai(tgl_mulai, waktu);
                    console.log(tgl_mulai.format("YYYY-MM-DD H:m:ss"), tgl_selesai.format("YYYY-MM-DD H:m:ss"), "Aktif");
                    sisa_waktu = waktu * 60;
                    sisa_waktu_dalam_menit = waktu;

                    getDataKategori.setDataValue("tgl_mulai", tgl_mulai.format("YYYY-MM-DD H:m:ss"))
                    getDataKategori.setDataValue("tgl_selesai", tgl_selesai.format("YYYY-MM-DD H:m:ss"))
                    const formUpdate = await db.ujian_proses_kelas_siswa_kategori.findOne({ where: { ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id } });
                    formUpdate.set({
                        tgl_mulai: tgl_mulai.format("YYYY-MM-DD H:m:ss"),
                        tgl_selesai: tgl_selesai.format("YYYY-MM-DD H:m:ss"),
                        status: "Aktif"
                    });
                    // As above, the database still has "formUpdate" and "green"
                    await formUpdate.save();
                }
                // get info paket yang aktif
                // ! 
                getDataKategori.setDataValue("sisa_waktu", sisa_waktu)
                getDataKategori.setDataValue("sisa_waktu_dalam_menit", sisa_waktu_dalam_menit)
                return {
                    success: true,
                    data: getDataKategori,
                }

            }
            // !bug
            const periksaUjianAktif = await fn_periksa_ujian_aktif(meId);
            if (periksaUjianAktif) {
                if (periksaUjianAktif.status == "Aktif" || periksaUjianAktif.sisa_waktu < 1) {
                    return {
                        success: false,
                        data: [],
                        message: "Selesaikan ujian aktif terlebih dahulu"
                    }
                }
            }
            console.log(periksaUjianAktif);
            //
            // !clear
            let getWaktu = await db.ujian_paketsoal_kategori.findOne({ where: { id: ujian_paketsoal_kategori_id } })
            tgl_selesai = await fn_get_tgl_selesai(moment().format("YYYY-MM-DD H:m:ss"), getWaktu.waktu);
            const doInsertProsesSiswaKategori = await db.ujian_proses_kelas_siswa_kategori.create({
                ujian_proses_kelas_siswa_id,
                tgl_mulai: moment().format("YYYY-MM-DD H:m:ss"),
                tgl_selesai: tgl_selesai.format("YYYY-MM-DD H:m:ss"),
                waktu: getWaktu.waktu,
                ujian_paketsoal_kategori_id,
                created_at: moment().format(),
                updated_at: moment().format(),
            });
            doInsertProsesSiswaKategori.setDataValue("sisa_waktu", getWaktu.waktu * 60)
            doInsertProsesSiswaKategori.setDataValue("sisa_waktu_dalam_menit", getWaktu.waktu)
            return {
                success: true,
                data: doInsertProsesSiswaKategori,
            }
            // * fnPeriksaUjianAktif 
            // 'message' => 'Selesaikan ujian aktif terlebih dahulu'
            // *else
            // getUjianProsesKelasSiswaId
            // insert data mulai ujian then get sisa waktu
            return {
                success: true,
                data: "Siswa Sudah daftar",
            }
        }
        return {
            success: true,
            data: "Siswa Belum daftar",
        }
    } catch (error) {
        console.log(error.message);
    }
};


const getSoal = async (meId, ujian_proses_kelas_id, ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_kategori_id) => {

    let data = null;
    const me = await fn_get_me(meId);
    const periksaKelas = await fn_is_kelas_saya_terdaftar(me.kelas_id);
    // const getDataKelas = await ujian_proses_kelas.findOne({ where: { id: ujian_proses_kelas_id } });
    // // console.log(periksaKelas);
    if (periksaKelas == false) {
        return {
            success: false,
            data: "Kelas tidak terdaftar"
        }
    }

    const getUjian_proses_kelas_siswa_kategori = await db.ujian_proses_kelas_siswa_kategori.findOne({ where: { id: ujian_proses_kelas_siswa_kategori_id } })
    const periksaWaktuHabis = await fn_is_waktu_habis(getUjian_proses_kelas_siswa_kategori.tgl_mulai, getUjian_proses_kelas_siswa_kategori.tgl_selesai)
    // console.log(periksaWaktuHabis);
    if (periksaWaktuHabis === false) {
        return {
            success: false,
            data: "Waktu Ujian telah habis!"
        }
    }

    const get_ujian_paketsoal_kategori = await db.ujian_paketsoal_kategori.findOne({ where: { id: ujian_paketsoal_kategori_id } })
    let random_soal = get_ujian_paketsoal_kategori.random_soal == 'Aktif' ? true : false;
    let random_pilihanjawaban = get_ujian_paketsoal_kategori.random_pilihanjawaban == 'Aktif' ? true : false;
    let getSoal = await db.ujian_paketsoal_soal.findAll({
        where: {
            ujian_paketsoal_kategori_id
        },
        order: [['nomer_urut', 'ASC']]
    })
    console.log(getSoal);
    let result_getSoal = random_soal ? fn_random_array(getSoal) : getSoal;
    console.log(result_getSoal);


    let dataSoal = [];
    for (const soal of getSoal) {
        let pilihan_jawaban = await db.ujian_paketsoal_soal_pilihanjawaban.findAll({ where: { ujian_paketsoal_soal_id: soal.id } })
        let result_pilihan_jawaban = random_pilihanjawaban ? fn_random_array(pilihan_jawaban) : pilihan_jawaban;
        let getJawabanKu = await db.ujian_proses_kelas_siswa_kategori_hasil.findOne({ where: { ujian_paketsoal_soal_id: soal.id, ujian_proses_kelas_siswa_kategori_id } })
        soal.setDataValue("jawaban_ku", getJawabanKu ? getJawabanKu.kode_jawaban : "-")
        let periksa_file_audio = await db.ujian_files.findOne({ where: { kode_soal: soal.kode_soal } })
        let file_audio = null
        if (periksa_file_audio) {
            file_audio = `${process.env.BASE_URL_FILES}${periksa_file_audio.files}`
        }
        soal.setDataValue("audio", file_audio)
        soal.setDataValue("pilihan_jawaban", result_pilihan_jawaban)
        dataSoal.push(soal)
    }
    data = dataSoal
    // elseseses
    return {
        success: true,
        data: result_getSoal,
    }
}

// private function
// !fn-ujian-studi
const fn_periksa_ujian_aktif = async (meId) => {
    try {
        const response = await db.ujian_proses_kelas_siswa_kategori.findOne({
            where: { status: "Aktif" }, include: [
                {
                    model: db.ujian_proses_kelas_siswa,
                    attributes: ['id', 'status'],
                    where: {
                        siswa_id: meId,
                        status: "Aktif"
                        // !include where ujian proses where status=="Aktif"//belum
                    }
                }
            ]
        });

        console.log(response);
        if (response) {
            let getSisaWaktu = await fn_get_sisa_waktu(response.tgl_selesai)
            response.setDataValue("sisa_waktu", getSisaWaktu.detik)
            response.setDataValue("sisa_waktu_dalam_menit", getSisaWaktu.menit)
            if (response.sisa_waktu < 0) {
                return null
            }
        }
        return response;
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
        result.detik = parseInt(duration.asSeconds().toFixed(0))
        result.menit = parseFloat(duration.asMinutes().toFixed(2))
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
        const mulai = moment(tgl_mulai);
        const selesai = moment(tgl_selesai);
        const now = moment();
        let result = now.isBetween(mulai, selesai);
        if (result) {
            return true
        }
        return false
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

const fn_is_sudah_memulai_ujian = async (ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id) => {
    try {
        const response = await db.ujian_proses_kelas_siswa_kategori.count({ where: { ujian_paketsoal_kategori_id, ujian_proses_kelas_siswa_id } });
        if (response < 1) {
            return false
        }
        return true
    } catch (error) {
        console.log(error.message);
    }
};

const fn_get_tgl_selesai = async (tgl_mulai, waktu) => {
    try {
        const result = moment(tgl_mulai).add(waktu, 'm');;
        return result;

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
const fn_get_ujian_proses_kelas_siswa_id = async (meId) => {
    try {
        const response = await db.ujian_proses_kelas_siswa.findOne({ where: { siswa_id: meId } });
        return response.id;
    } catch (error) {
        console.log(error.message);
    }
};
const fn_random_array = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};
// EXPORT MODULE
module.exports = { getDataUjian, getDataUjianEdit, periksaUjianAktif, doUjianDaftar, periksa_daftar, getKategoriSoal, getKategoriSoalDetail, doMulaiUjian, getSoal }