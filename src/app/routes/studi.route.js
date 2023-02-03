const studiController = require("../controllers/studi/studi.controller")
const { authJwt } = require("../middleware");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
        next();
    });

    app.get("/api/siswa/data/ujian", [authJwt.verifyToken], studiController.getDataUjian);
    app.get("/api/siswa/data/periksa/ujianaktif", [authJwt.verifyToken], studiController.periksaUjianAktif);
};