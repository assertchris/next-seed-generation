import { useEffect, useState } from 'react'
import SeedCard from './seed-card'

export default function SeedList({ updatedAt, setUpdatedAt }) {
    const [seeds, setSeeds] = useState([])

    useEffect(() => {
        fetch('/api/seeds')
            .then((response) => response.json())
            .then((json) => setSeeds(json.seeds))
    }, [updatedAt])

    return (
        <section className="flex flex-row flex-wrap">
            {seeds.map((seed) => (
                <SeedCard setUpdatedAt={setUpdatedAt} key={seed.id} {...seed} />
            ))}
        </section>
    )
}
