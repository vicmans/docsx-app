const config = require('./config');

function getDb() {
    if (config.dbtype === 'json') {
        return require('../datasource/localjson')
    }
    if (config.dbtype === 'mongodb') {
        return require('../datasource/mongodb')
    }
    throw Error('Invalid Database type');
}

module.exports = getDb();