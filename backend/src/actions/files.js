const { getFiles } = require("../db");

exports.files = async (req, res) => {
    const {status} = req.query;
    const files = await getFiles(status);
    res.status(200).json({files});
}