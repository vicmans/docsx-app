const express = require("express");
const app = express();
const cors = require("cors");
const multer  = require('multer');
const path  = require('path');
const  bodyParser = require('body-parser')
const {upload, files, changeStatus} = require('./actions');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const fileFilter = (req, file, cb) => {
  const allowedTypes = /docx$/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only .docx are allowed'), false);
  }
};

const uploadMulter = multer({
  storage,
  fileFilter,
})

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json())

const router = express.Router()

router.post("/upload", uploadMulter.single('file'), upload);

router.get("/files", files);

router.put("/files/:id/status", changeStatus);

app.use('/api', router);

module.exports = app;