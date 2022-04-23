import { useEffect, useRef, useCallback } from 'react'

export default function SeedField({ setUpdatedAt }) {
    const inputRef = useRef()

    const fetchNewWords = (input) => {
        fetch('/api/words')
            .then((response) => response.json())
            .then((json) => {
                input.value = json.words.join(' ')
                setUpdatedAt(Date.now())
            })
    }

    useEffect(() => {
        if (!inputRef.current) {
            return
        }

        fetchNewWords(inputRef.current)
    }, [inputRef])

    const shuffle = useCallback(() => {
        if (!inputRef.current) {
            return
        }

        fetchNewWords(inputRef.current)
    })

    const generate = useCallback(() => {
        if (!inputRef.current) {
            return
        }

        fetch('/api/seeds', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                words: inputRef.current.value,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                fetchNewWords(inputRef.current)
            })
    })

    const inputStyles =
        'flex flex-grow border-gray-500 rounded-sm bg-gray-100 py-2 px-4'
    const buttonStyles =
        'flex flex-shrink border-gray-500 rounded-sm bg-gray-100 py-2 px-4'

    return (
        <div className="flex flex-row space-x-2">
            <input type="text" className={inputStyles} ref={inputRef} />
            <button className={buttonStyles} onClick={shuffle}>
                shuffle
            </button>
            <button className={buttonStyles} onClick={generate}>
                generate
            </button>
        </div>
    )
}
