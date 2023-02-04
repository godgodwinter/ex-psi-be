// https://sequelize.org/docs/v6/core-concepts/raw-queries/
// import Post from "../models/PostModel.js";

// const siswa = require("../models/siswa.models.js");
const db = require("../models");
const Siswa = db.siswa;
const kelas = db.kelas;
const Op = db.Sequelize.Op;
const getUsersService = async (req, res) => {
    try {
        const response = await Siswa.findAll({ offset: 0, limit: 10, include: kelas });
        response.forEach((item) => {
            item.test = "tes";
        });
        // // const response = "tes";
        // // res.status(200).json(response);
        // const response = [
        //     { id: 1, name: "11" },
        //     { id: 2, name: "22" },
        // ];
        // const response = await getAll();

        console.log(response);
        // response.forEach((item) => {
        //   item.test = "tes";
        // });
        // response[0].test = "testttt";
        // console.log("ini response", response.length, response[0].test);
        return response;
    } catch (error) {
        console.log(error.message);
    }
};

const getAll = async () => {
    try {
        // const response = await Post.findAll();
        // response.setDataValue("testObjek", "some value");
        // response.forEach((item) => {
        //     // item.test = "tes";
        //     item.setDataValue("testObjek", "some value");
        // });
        // return response;
    } catch (error) {
        console.log(error.message);
    }
    // return "test";
};
// export default PostService;
module.exports = { getAll, getUsersService }