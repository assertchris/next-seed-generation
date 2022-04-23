import { connect } from './_common'

export default async function handler(req, res) {
    return new Promise((resolve, reject) => {
        let error = null

        if (req.method === 'GET') {
            const db = connect()
            const seeds = []

            db.each(
                'SELECT * FROM Seeds',
                (err, row) => {
                    if (err) {
                        error = err
                        return
                    }

                    // transform as needed...
                    seeds.push(row)
                },
                () => {
                    db.close()
                    res.status(200).json({ seeds })
                    resolve()
                }
            )

            return
        }

        if (req.method === 'POST') {
            const body = req.body

            if (!body.words) {
                res.status(400).json({ error: 'words missing' })
                resolve()
                return
            }

            const db = connect()

            const statement = db.prepare('INSERT INTO Seeds (words) VALUES (?)')
            statement.run(body.words)

            statement.finalize(() => {
                db.close()
                res.status(200).json({})
                resolve()
            })

            return
        }

        if (req.method === 'DELETE') {
            const query = req.query

            if (!query.id) {
                res.status(400).json({ error: 'id missing' })
                resolve()
                return
            }

            const db = connect()

            const statement = db.prepare('DELETE FROM Seeds WHERE id = ?')
            statement.run(query.id)

            statement.finalize(() => {
                db.close()
                res.status(200).json({})
                resolve()
            })

            return
        }

        if (error) {
            res.status(500).json({ error })
            reject()
            return
        }

        res.status(400).json({ error: 'method not allowed' })
        resolve()
    })
}
