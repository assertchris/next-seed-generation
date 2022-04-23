const sqlite3 = require('sqlite3').verbose()
const {
    promises: { readFile },
} = require('fs')

module.exports = async () => {
    console.log('Migrating database...')

    const db = new sqlite3.Database(__dirname + '/database.sqlite')
    const statements = await readFile(__dirname + '/migrations.sql', 'utf8')

    db.exec(statements)

    db.each("SELECT name FROM sqlite_master WHERE type='table'", (_, row) => {
        if (row.name === 'sqlite_sequence') {
            return
        }

        console.log(`Created table ${row.name}`)
    })

    db.close()
}
