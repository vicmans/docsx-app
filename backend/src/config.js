require("dotenv").config();

const config = {
    port: parseInt(process.env.PORT || "3000"),
    dbtype: String(process.env.DB_TYPE || "json"),
    dbpath: String(process.env.DB_URL || "data/files.json"),
};

if (process.env.NODE_ENV === 'test') {
    config.dbtype = "json"
    config.dbpath = "data/test.json"
}

module.exports = config;