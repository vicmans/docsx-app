const { getOneFileAndUpdate } = require("../db");

exports.changeStatus = async (req, res) => {
    const file = await getOneFileAndUpdate(req.params.id, req.body);
    res.json(file);
}