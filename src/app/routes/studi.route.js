const studiController = require("../controllers/studi/studi.controller")
const { authJwt } = require("../middleware");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
        next();
    });

    app.get("/api/siswa/data/ujian", [authJwt.verifyToken], studiController.getDataUjian);//sudah
    app.get("/api/siswa/data/ujian/:ujian_proses_kelas_id", [authJwt.verifyToken], studiController.getDataUjianEdit);//
    app.get("/api/siswa/data/periksa/ujianaktif", [authJwt.verifyToken], studiController.periksaUjianAktif);//sudah
    app.post("/api/siswa/data/ujian/:ujian_proses_kelas_id/ujian_daftar", [authJwt.verifyToken], studiController.doUjianDaftar);
    app.get("/api/siswa/data/ujian/:ujian_proses_kelas_id/periksa_daftar", [authJwt.verifyToken], studiController.periksa_daftar);
    app.get("/api/siswa/data/ujian/proses_kelas/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_id/kategori_soal", [authJwt.verifyToken], studiController.getKategoriSoal); //pilihan paket
    app.get("/api/siswa/data/ujian/:ujian_paketsoal_id/kategori_soal_detail/:kategori_id", [authJwt.verifyToken], studiController.getKategoriSoalDetail); //instruksi dll
    app.post("/api/siswa/data/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/mulai_ujian", [authJwt.verifyToken], studiController.doMulaiUjian);
    app.post("/api/siswa/data/dataujian/:ujian_proses_kelas_id/paketsoal/:ujian_paketsoal_kategori_id/getsoal/:ujian_proses_kelas_siswa_kategori_id", [authJwt.verifyToken], studiController.getSoal);
    app.post("/api/siswa/data/dataujian/proses/kategori/:ujian_proses_kelas_siswa_kategori_id/insertjawaban", [authJwt.verifyToken], studiController.doInsertJawaban);
    app.post("/api/siswa/data/dataujian/proses/finish/:ujian_proses_kelas_siswa_kategori_id", [authJwt.verifyToken], studiController.doFinish);
};