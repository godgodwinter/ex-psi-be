// import { getUsersService } from "../services/PostService.js";
const { getUsersService } = require("../services/PostService.js")
const getUsers = async (req, res) => {
    try {
        const response = await getUsersService();
        // const response = "tes";
        // console.log(response[0].id);
        let result = {
            success: true,
            data: response,
            message: "Data get successfully",
        };
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = getUsers