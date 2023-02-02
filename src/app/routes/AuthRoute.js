const authController = require("../controllers/AuthController")
module.exports = function (app) {
    app.use(function (req, res, next) {
        // res.header(
        //     "Access-Control-Allow-Headers",
        //     "Origin, Content-Type, Accept"
        // );
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type,accept,access_token,X-Requested-With');
        // console.log('====================================');
        // console.log(req.body);
        // console.log('====================================');
        next();
    });



    app.post("/api/siswa/auth/login", authController.signin);

    // app.post("/api/auth/signout", controller.signout);
};