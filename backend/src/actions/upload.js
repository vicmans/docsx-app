const { create } = require("../db");

exports.upload = (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded or invalid file type.');
    }
    const file = req.file;
    const data = {
      filename: req.body.filename || file.originalname,
      timestamps: new Date(),
      filesize: file.size,
      status: 'uploaded',
    }
    create(data);
    return res.json(data);
}