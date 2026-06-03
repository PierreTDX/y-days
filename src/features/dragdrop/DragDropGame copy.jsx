import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

function shuffle(array) {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

export default function DragDropGame({ buckets, initialCards, onComplete, onProgress }) {
    const [cards, setCards] = useState(
        shuffle(initialCards).map((c) => ({
            ...c,
            assigned: null,
            correct: null,
            dragging: false,
        }))
    )

    

    const [hoverBucket, setHoverBucket] = useState(null)
    const [selectedCardId, setSelectedCardId] = useState(null)

    const [burgerOpen, setBurgerOpen] = useState(false)
    
    
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorTimeout, setErrorTimeout] = useState(null)

    useEffect(() => {
        return () => {
            if (errorTimeout) clearTimeout(errorTimeout)
        }
    }, [errorTimeout])

    const allCorrect = cards.every(
        (c) => c.assigned !== null && c.correct === true
    )

    useEffect(() => {
        if (onProgress) onProgress(allCorrect)
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

    const badgeColors = [
        "bg-violet-100 text-violet-600",
        "bg-yellow-100 text-yellow-700",
        "bg-rose-100 text-rose-600",
        "bg-slate-100 text-slate-600",
    ]

    return (
        <div className="bg-slate-50">
            <div className="max-w-5xl mx-auto p-6">

                {/* TITLE */}
                <div className="mb-8">
                    <h1 className="text-xl sm:text-4xl font-bold tracking-tight mb-2">
                        Reconstitue le prompt
                    </h1>

                    <p className="hidden md:hidden text-sm text-slate-500">
                        Réorganise le prompt. Pour ce faire,
                        faites glisser une carte depuis la boîte à mots
                        et dépose-la dans la zone que tu juges
                        appropriée.
                    </p>
                    <p className="block md:hidden text-sm text-slate-500">
                        Réorganise le prompt. Pour ce faire,
                        faites clique sur une carte dans la boîte à mots
                        puis clique sue la zone que tu juges
                        appropriée.
                    </p>
                </div>

                {/* ROLE SLOTS */}
                <div className="space-y-3 mb-8">
                    {buckets.map((bucket, index) => {
                        const bucketCard = cards.find(
                            (c) => c.assigned === bucket
                        )

                        return (
                            <div
                                key={bucket}
                                className="flex items-center gap-3"
                            >
                                {/* LETTER */}
                                <div
                                    className={`
                            w-10 h-10
                            rounded-md
                            flex items-center justify-center
                            font-semibold
                            text-sm
                            ${badgeColors[index]}
                        `}
                                >
                                    {bucket.charAt(0)}
                                </div>

                                {/* SLOT */}
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault()
                                        setHoverBucket(bucket)
                                    }}
                                    onDragLeave={() =>
                                        setHoverBucket(null)
                                    }
                                    onDrop={(e) => {
                                        e.preventDefault()

                                        const id =
                                            e.dataTransfer.getData(
                                                "text/plain"
                                            )

                                        assignCardToBucket(id, bucket)
                                    }}
                                    onClick={() =>
                                        selectedCardId &&
                                        assignCardToBucket(
                                            selectedCardId,
                                            bucket
                                        )
                                    }
                                    className={`
                            flex-1
                            min-h-[52px]
                            rounded-lg
                            border
                            border-dashed
                            px-3
                            flex items-center
                            transition-all
                            cursor-pointer
                            ${hoverBucket === bucket
                                            ? "border-violet-400 bg-violet-50"
                                            : "border-violet-200 bg-white"
                                        }
                        `}
                                >
                                    {bucketCard ? (
                                        <div
                                            draggable
                                            onDragStart={(e) =>{
                                                if (bucketCard?.correct) return
                                                onDragStart(e, bucketCard.id)
                                            }}
                                            onClick={() => {
                                                if (window.innerWidth >= 768 || bucketCard?.correct) return
                                                if (bucketCard.id !== selectedCardId) {
                                                    setSelectedCardId(bucketCard.id)
                                                }
                                            }}
                                            onDragEnd={onDragEnd}
                                            className={`
                                px-3 py-2
                                rounded-lg
                                border
                                text-sm
                                bg-white
                                ${bucketCard.correct
                                                    ? "border-green-400"
                                                    : "border-red-400 bg-red-50"
                                                }
                            `}
                                        >
                                            {bucketCard.text}
                                        </div>
                                    ) : (
                                        <div className="w-full text-center text-violet-300">
                                            ...
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* ================= MOBILE BURGER TRIGGER ================= */}
                <div className="md:hidden mb-6 flex flex-col items-center gap-2">
                    <button
                        className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl shadow-md active:scale-[0.98] transition"
                        onClick={() => setBurgerOpen(true)}
                    >
                        ☰ Ouvrir la boîte à mots
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                        Appuie ici pour ouvrir la palette de cartes
                    </p>
                </div>

                {/* ================= WORD BOX (DESKTOP) ================= */}
                <div className="hidden md:block">
                    <div className="font-medium mb-3">Boîte à mots</div>

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
                                    className={`
                                        px-4 py-2 bg-white border rounded-lg text-sm cursor-grab
                                        ${
                                            selectedCardId === card.id
                                                ? "border-violet-400 bg-violet-50"
                                                : "border-slate-200"
                                        }
                                    `}
                                >
                                    {card.text}
                                </div>
                            ))}
                    </div>
                </div>

                {/* ================= BURGER MODAL ================= */}
                {burgerOpen && (
                    <div className="fixed inset-0 bg-black/40 z-50 md:hidden"
                        onClick={() => setBurgerOpen(false)}
                    >
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[60vh] overflow-auto" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            
                            <div className="flex justify-between mb-3">
                                <span className="font-medium">
                                    Boîte à mots
                                </span>
                                <button onClick={() => setBurgerOpen(false)}>
                                    ✕
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {cards
                                    .filter((c) => c.assigned === null)
                                    .map((card) => (
                                        <div
                                            key={card.id}
                                            className="px-3 py-2 border rounded-lg text-sm bg-white"
                                            onClick={() => {
                                                setSelectedCardId(card.id)
                                                setBurgerOpen(false)
                                            }}
                                        >
                                            {card.text}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* pinned selected card */}
                {selectedCardId  && (
                    <div className="fixed bottom-4 left-4 right-4 bg-white border shadow-lg rounded-xl p-3 md:hidden z-40 flex justify-between items-center">
                        <span className="text-sm">
                            {cards.find(c => c.id === selectedCardId )?.text}
                        </span>
                        <button
                            onClick={() => setMobileSelectedCardId(null)}
                            className="text-red-500"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* ERROR */}
                {errorMessage && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-xl z-50">
                        ⚠️ {errorMessage}
                    </div>
                )}
            </div>
        </div>
    )
}