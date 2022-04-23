import { useCallback } from 'react'
import seed from 'seed-random'

export default function SeedCard({ setUpdatedAt, id, words }) {
    const random = seed(words)

    const remove = useCallback(() => {
        fetch(`/api/seeds?id=${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => setUpdatedAt(Date.now()))
    })

    return (
        <div className="flex flex-col w-1/2 p-4">
            <div className="rounded-sm bg-gray-100 p-4 space-y-4">
                <h2 className="flex text-xl items-center justify-center">
                    {words}
                </h2>
                <div className="flex flex-row flex-wrap">
                    {[...Array(8).keys()].map((i) => (
                        <span
                            className="flex w-1/2 items-center justify-center"
                            key={id + i}
                        >
                            {Math.round(random() * 100)}
                        </span>
                    ))}
                </div>
                <div className="flex items-center justify-center w-full">
                    <button
                        className="text-blue-500 underline"
                        onClick={remove}
                    >
                        remove
                    </button>
                </div>
            </div>
        </div>
    )
}
