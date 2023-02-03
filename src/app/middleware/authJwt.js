const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Siswa = db.siswa;

verifyToken = (req, res, next) => {
    // let token = req.session.token;

    let token = req.headers['authorization'];
    let bearerToken = null;
    // console.log(token);
    if (!token) {
        return res.status(403).send({
            message: "No token provided!",
        });
    }
    if (typeof token !== 'undefined') {
        const bearer = token.split(" ");
        bearerToken = bearer[1];
    }
    // console.log('====================================');
    // console.log(config.secret);
    // console.log('====================================');
    jwt.verify(bearerToken, config.secret, (err, decoded) => {
        // console.log('====================================');
        // console.log(err);
        // console.log('====================================');
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!",
            });
        }
        // console.log('====================================');
        // console.log(decoded);
        // console.log('====================================');
        req.siswaId = decoded.id;
        req.meId = decoded.id;
        next();
    });
};


// isSiswa = async (req, res, next) => {
//     try {
//         const user = await Siswa.findByPk(req.userId);
//         const roles = await user.getRoles();

//         for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "admin") {
//                 return next();
//             }
//         }

//         return res.status(403).send({
//             message: "Require Admin Role!",
//         });
//     } catch (error) {
//         return res.status(500).send({
//             message: "Unable to validate User role!",
//         });
//     }
// };

// isAdmin = async (req, res, next) => {
//     try {
//         const user = await User.findByPk(req.userId);
//         const roles = await user.getRoles();

//         for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "admin") {
//                 return next();
//             }
//         }

//         return res.status(403).send({
//             message: "Require Admin Role!",
//         });
//     } catch (error) {
//         return res.status(500).send({
//             message: "Unable to validate User role!",
//         });
//     }
// };

// isModerator = async (req, res, next) => {
//     try {
//         const user = await User.findByPk(req.userId);
//         const roles = await user.getRoles();

//         for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "moderator") {
//                 return next();
//             }
//         }

//         return res.status(403).send({
//             message: "Require Moderator Role!",
//         });
//     } catch (error) {
//         return res.status(500).send({
//             message: "Unable to validate Moderator role!",
//         });
//     }
// };

// isModeratorOrAdmin = async (req, res, next) => {
//     try {
//         const user = await User.findByPk(req.userId);
//         const roles = await user.getRoles();

//         for (let i = 0; i < roles.length; i++) {
//             if (roles[i].name === "moderator") {
//                 return next();
//             }

//             if (roles[i].name === "admin") {
//                 return next();
//             }
//         }

//         return res.status(403).send({
//             message: "Require Moderator or Admin Role!",
//         });
//     } catch (error) {
//         return res.status(500).send({
//             message: "Unable to validate Moderator or Admin role!",
//         });
//     }
// };

const authJwt = {
    verifyToken,
    // isAdmin,
    // isModerator,
    // isModeratorOrAdmin,
};
module.exports = authJwt;