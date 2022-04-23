const sqlite3 = require('sqlite3').verbose()

export const connect = () =>
    new sqlite3.Database(process.env.basePath + '/database/database.sqlite')
