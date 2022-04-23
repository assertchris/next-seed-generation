import { promises } from 'fs'

export default async function handler(req, res) {
    let error = null

    if (req.method === 'GET') {
        const words = await promises.readFile(
            process.env.basePath + '/database/words.txt',
            'utf8'
        )

        res.status(200).json({
            words: words
                .split('\n')
                .sort(() => 0.5 - Math.random())
                .slice(0, 3),
        })
        return
    }

    if (error) {
        res.status(500).json({ error })
        return
    }

    res.status(400).json({ error: 'method not allowed' })
    return
}
