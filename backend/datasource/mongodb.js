const config = require('../src/config');
const mongoose = require('mongoose');
mongoose.connect(config.dbpath);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const fileSchema = new mongoose.Schema({
  filename: String,
  filesize: Number,
  status: String,
  timestamps: Date,
});
fileSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
fileSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});

const FileModel = mongoose.model('File', fileSchema);

function getFiles(status = '') {
  let query = {};
  if (status) query = {status}
  return FileModel.find(query);
}

async function create(data) {
  const newItem = new FileModel({
    ...data,
    timestamps: new Date(),
  });
  await newItem.save();
  return FileModel.find();
}

async function getOneFileAndUpdate(id, data) {
  await FileModel.updateOne({ _id: id }, { status: data.status })
  return FileModel.findById(id);

}

module.exports = {
  getFiles,
  create,
  getOneFileAndUpdate,
}