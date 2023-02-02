const db = require("../models");
const config = require("../config/auth.config");
const Siswa = db.siswa;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.signin = async (req, res) => {
    console.log(req.body);
    try {
        const user = await Siswa.scope('withPassword').findOne({
            where: {
                username: req.body.email,
            },
        });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        // console.log('tes', req.body.password, user.password);
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        const expiredTimer = 86400 * 7; // 24 hours
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: expiredTimer,
        });

        // let authorities = [];
        // const roles = await user.getRoles();
        // for (let i = 0; i < roles.length; i++) {
        //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
        // }

        req.session.token = token;


        //     "token":"",
        // "token2": "aaa",
        // "code": 200,
        // "token_type": "bearer",
        // "expires_in": 10080
        return res.status(200).send({
            token,
            code: 200,
            token_type: "bearer",
            expires_in: expiredTimer,
            id: user.id,
            username: user.username,
            nama: user.nama,
            token
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};