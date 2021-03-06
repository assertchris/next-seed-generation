import { useState } from 'react'
import Head from 'next/head'
import SeedField from '../components/seed-field'
import SeedList from '../components/seed-list'

export default function Index() {
    const [updatedAt, setUpdatedAt] = useState(Date.now())

    return (
        <>
            <Head>
                <title>Seeded random numbers</title>
                <meta
                    name="description"
                    content="Demonstration of the code required to create seeded random numbers"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container mx-auto p-8 space-y-4 text-gray-900">
                <h1 className="text-2xl">Seeded random numbers</h1>
                <p>
                    This is a demonstration of the code required to create
                    seeded random numbers. This is useful for re-creating levels
                    that are procedurally generated. Shuffle until you like the
                    seed words, and then generate to see a sample of random
                    numbers that are generated for the seed words.
                </p>
                <p>
                    You can also reuse seed words to see that the random numbers
                    generated match the seed words.
                </p>
                <SeedField setUpdatedAt={setUpdatedAt} />
                <SeedList setUpdatedAt={setUpdatedAt} updatedAt={updatedAt} />
            </main>
        </>
    )
}
