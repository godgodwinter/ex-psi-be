// https://sequelize.org/docs/v6/core-concepts/raw-queries/
// import Post from "../models/PostModel.js";

// const siswa = require("../models/siswa.models.js");
const db = require("../models");
const Siswa = db.siswa;
const kelas = db.kelas;
const Op = db.Sequelize.Op;
const getMeUjian = async (req, res) => {
    try {
        const response = await Siswa.findAll({ include: kelas });
        response.forEach((item) => {
            item.test = "tes";
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { getMeUjian }