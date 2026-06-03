import { useState, useEffect, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks';

function shuffle(array) {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr

}
export default function FillInTheGaps({ promptText, initialCards, onProgress }) {
    const [cards, setCards] = useState(() =>
        (shuffle(initialCards) ?? []).map((c) => ({
            ...c,
            assigned: null,
            correct: null,
            dragging: false,
        }))
    )
    const [hoverBucket, setHoverBucket] = useState(null)
    const [selectedCardId, setSelectedCardId] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorTimeout, setErrorTimeout] = useState(null)


    const parsedPrompt = useMemo(() => {
        const parts = promptText.split(/(\{\{[^}]+\}\})/g)

        return parts.map((part, i) => {
            const match = part.match(/^\{\{([^}]+)\}\}$/)

            if (match) {
                return {
                    type: "gap",
                    id: match[1],
                    key: `${match[1]}-${i}`,
                }
            }

            return {
                type: "text",
                content: part,
                key: `text-${i}`,
            }
        })
    }, [promptText])

    const allCorrect = cards.every(
        (c) => c.assigned !== null && c.answer === c.assigned
    )

    useEffect(() => {
        if (onProgress) {
            onProgress(allCorrect)
        }
    }, [allCorrect, onProgress])

    function onDragStart(e, id) {
        e.dataTransfer.setData("text/plain", id)
        e.dataTransfer.effectAllowed = "move"

        setCards((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, dragging: true } : c
            )
        )
    }

    function onDragEnd() {
        setCards((prev) =>
            prev.map((c) => ({ ...c, dragging: false }))
        )
    }

    useEffect(() => {
        if (onProgress) {
            onProgress(allCorrect)
        }
    }, [allCorrect, onProgress])

    function onDragStart(e, id) {
        e.dataTransfer.setData("text/plain", id)
        e.dataTransfer.effectAllowed = "move"

        setCards((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, dragging: true } : c
            )
        )
    }

    function onDragEnd() {
        setCards((prev) =>
            prev.map((c) => ({ ...c, dragging: false }))
        )
    }

    function assignCardToBucket(cardId, bucket) {
        const card = cards.find((c) => c.id === cardId)

        if (!card) return

        const occupied = cards.some(
            (c) => c.assigned === bucket && c.id !== cardId
        )

        if (occupied) return

        const isCorrect = card.answer === bucket

        setCards((prev) =>
            prev.map((c) =>
                c.id === cardId
                    ? {
                        ...c,
                        assigned: bucket,
                        correct: isCorrect,
                        dragging: false,
                    }
                    : c
            )
        )

        setSelectedCardId(null)
        setHoverBucket(null)

        if (!isCorrect) {
            setErrorMessage(
                "Ce n'est pas le bon mot ici — il retourne dans la boîte !"
            )

            if (errorTimeout) {
                clearTimeout(errorTimeout)
            }

            const timeoutId = setTimeout(() => {
                setCards((prev) =>
                    prev.map((c) =>
                        c.id === cardId && c.correct === false
                            ? {
                                ...c,
                                assigned: null,
                                correct: null,
                            }
                            : c
                    )
                )

                setErrorMessage(null)
                setErrorTimeout(null)
            }, 3000)

            setErrorTimeout(timeoutId)
        }
    }


    return (
        <div className="bg-slate-50">
            <div className="max-w-5xl mx-auto p-6">

                {/* PROMPT WITH GAPS */}
                <div className="bg-white border rounded-xl p-6 text-lg leading-relaxed mb-8">
                    {parsedPrompt.map((part) => {
                        if (part.type === "text") {
                            return (
                                <ReactMarkdown
                                    key={part.key}
                                    remarkPlugins={[remarkBreaks]}
                                    components={{
                                        // IMPORTANT: keep inline flow inside sentence
                                        p: ({ children }) => <span>{children}</span>,
                                    }}>
                                    {part.content}
                                </ReactMarkdown>
                            )
                        }

                        const card = cards.find(
                            (c) => c.assigned === part.id
                        )

                        return (
                            <span
                                key={part.key}
                                onDragOver={(e) => {
                                    e.preventDefault()
                                    setHoverBucket(part)
                                }}
                                onDragLeave={() =>
                                    setHoverBucket(null)
                                }
                                onDrop={(e) => {
                                    e.preventDefault()

                                    const id =
                                        e.dataTransfer.getData("text/plain")

                                    // ✅ SAME FUNCTION USED
                                    assignCardToBucket(id, part.id)
                                }}
                                onClick={() =>
                                    selectedCardId &&
                                    assignCardToBucket(
                                        selectedCardId,
                                        part.id
                                    )
                                }
                                className={`
                                    inline-flex
                                    min-w-[120px]
                                    mx-1
                                    px-3 py-1
                                    border-b-2
                                    border-violet-300
                                    items-center
                                    justify-center
                                    ${hoverBucket === part
                                        ? "border-violet-400 bg-violet-50"
                                        : "border-violet-200 bg-white"
                                    }
                                `}
                            >
                                {card ? (
                                    <span
                                        className={
                                            card.correct
                                                ? "text-green-600 font-medium"
                                                : "text-red-500"
                                        }
                                    >
                                        {card.text}
                                    </span>
                                ) : (
                                    <span className="text-slate-300">
                                        _______
                                    </span>
                                )}
                            </span>
                        )
                    })}
                </div>

                {/* WORD BANK */}
                <div className="flex flex-wrap gap-3 p-4 bg-slate-100 rounded-xl border">
                    {cards
                        .filter((c) => c.assigned === null)
                        .map((card) => (
                            <div
                                key={card.id}
                                draggable
                                onDragStart={(e) =>
                                    onDragStart(e, card.id)
                                }
                                onDragEnd={onDragEnd}
                                onClick={() =>
                                    setSelectedCardId(
                                        card.id === selectedCardId
                                            ? null
                                            : card.id
                                    )
                                }
                                className="
                                    px-4 py-2
                                    bg-white
                                    border
                                    rounded-lg
                                    cursor-grab
                                    active:cursor-grabbing
                                "
                            >
                                {card.text}
                            </div>
                        ))}
                </div>
                {/* ERROR */}
                {errorMessage && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-xl">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>

    )
}