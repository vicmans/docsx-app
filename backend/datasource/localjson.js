const path = require('path');
const config = require('../src/config');
const { writeFileSync, existsSync } = require('fs');

const dbpath = path.join(process.cwd(), config.dbpath);
let files = [];

function dbInit() {
	if (existsSync(dbpath)) {
		files = require(dbpath);
	} else {
		writeFileSync(dbpath, '[]');
		files = []
	}
}

dbInit();

function getFiles(status = '') {
	if (!Array.isArray(files)) files = []
	return files.filter(file => !status ? true : file.status == status);
}

function create(data) {
	if (!Array.isArray(files)) files = []
	if (Array.isArray(files)) {
		files.push({
			...data,
			id: +new Date(),
		})
		writeFileSync(dbpath, JSON.stringify(files, null, 2));
		return files;
	}
}

function getOneFileAndUpdate(id, data) {
	if (!Array.isArray(files)) files = []
	if (Array.isArray(files)) {
		const fileIndex = files.findIndex(file => file.id == id);
		if (fileIndex < 0) {
			throw Error(404);
		}
		files[fileIndex].status = data.status;
		writeFileSync(dbpath, JSON.stringify(files, null, 2));
		return files[fileIndex];
	}
}

module.exports = {
	getFiles,
	create,
	getOneFileAndUpdate,
}