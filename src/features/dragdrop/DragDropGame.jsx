import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function DragDropGame({ buckets, initialCards, onComplete }) {
    const [cards, setCards] = useState(initialCards.map(c => ({ ...c, assigned: null, correct: null, dragging: false })))
    const [hoverBucket, setHoverBucket] = useState(null)
    const [selectedCardId, setSelectedCardId] = useState(null)
    const dragImageRef = useRef(null)
    const [pointerDrag, setPointerDrag] = useState(null)
    const [paletteOpen, setPaletteOpen] = useState(false)
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : false)

    useEffect(() => {
        function handleResize() {
            const desktop = window.innerWidth >= 768
            setIsDesktop(desktop)
            if (desktop) setPaletteOpen(false)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function onDragStart(e, id) {
        const target = e.currentTarget
        try {
            const clone = target.cloneNode(true)
            clone.style.position = 'absolute'
            clone.style.top = '-9999px'
            clone.style.left = '-9999px'
            clone.style.pointerEvents = 'none'
            clone.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)'
            clone.style.transform = 'scale(1.02)'
            document.body.appendChild(clone)
            dragImageRef.current = clone
            const rect = target.getBoundingClientRect()
            const offsetX = e.clientX - rect.left
            const offsetY = e.clientY - rect.top
            e.dataTransfer.setDragImage(clone, offsetX, offsetY)
        } catch (err) {}

        e.dataTransfer.setData('text/plain', id)
        e.dataTransfer.effectAllowed = 'move'
        setCards(prev => prev.map(c => c.id === id ? { ...c, dragging: true } : c))
    }

    function onDragEnd() {
        if (dragImageRef.current) {
            try { document.body.removeChild(dragImageRef.current) } catch (e) {}
            dragImageRef.current = null
        }
        setCards(prev => prev.map(c => c.dragging ? { ...c, dragging: false } : c))
    }

    function selectCard(cardId) {
        setSelectedCardId(cardId)
        if (!isDesktop) setPaletteOpen(false)
        setHoverBucket(null)
        setCards(prev => prev.map(c => c.id === cardId ? { ...c, dragging: true } : c))
    }

    function discardSelectedCard() {
        if (!selectedCardId) return
        setCards(prev => prev.map(c => c.id === selectedCardId ? { ...c, assigned: null, correct: null, dragging: false } : c))
        setSelectedCardId(null)
    }

    function assignSelectedCard(bucket) {
        if (!selectedCardId) return
        setCards(prev => prev.map(c => c.id === selectedCardId ? { ...c, assigned: bucket, correct: c.answer === bucket, dragging: false } : c))
        setSelectedCardId(null)
        setHoverBucket(null)
        if (!isDesktop) setPaletteOpen(false)
    }

    useEffect(() => {
        function onMove(e) {
            setPointerDrag(d => d ? { ...d, x: e.clientX, y: e.clientY } : d)
            const el = document.elementFromPoint(e.clientX, e.clientY)
            let bucketEl = el
            while (bucketEl && !bucketEl.dataset?.bucket && !bucketEl.dataset?.palette) {
                bucketEl = bucketEl.parentElement
            }
            if (bucketEl && bucketEl.dataset?.bucket) setHoverBucket(bucketEl.dataset.bucket)
            else setHoverBucket(null)
        }

        function onUp(e) {
            if (!pointerDrag) return
            const el = document.elementFromPoint(e.clientX, e.clientY)
            let bucketEl = el
            while (bucketEl && !bucketEl.dataset?.bucket && !bucketEl.dataset?.palette) {
                bucketEl = bucketEl.parentElement
            }

            if (bucketEl && bucketEl.dataset?.bucket) {
                const bucket = bucketEl.dataset.bucket
                setCards(prev => prev.map(c => c.id === pointerDrag.id ? { ...c, assigned: bucket, correct: c.answer === bucket, dragging: false } : c))
            } else if (bucketEl && bucketEl.dataset?.palette) {
                setCards(prev => prev.map(c => c.id === pointerDrag.id ? { ...c, assigned: null, correct: null, dragging: false } : c))
            }

            setPointerDrag(null)
            setHoverBucket(null)
            setCards(prev => prev.map(c => c.id === pointerDrag.id ? { ...c, dragging: false } : c))
        }

        if (pointerDrag) {
            window.addEventListener('pointermove', onMove)
            window.addEventListener('pointerup', onUp)
        }

        return () => {
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
        }
    }, [pointerDrag])

    function onDropBucket(e, bucket) {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain')
        setCards(prev => prev.map(c => {
            if (c.id !== id) return c
            const isCorrect = c.answer === bucket
            return { ...c, assigned: bucket, correct: isCorrect, dragging: false }
        }))
        setHoverBucket(null)
        setPaletteOpen(false)
    }

    function onDropPalette(e) {
        e.preventDefault()
        const id = e.dataTransfer.getData('text/plain')
        setCards(prev => prev.map(c => c.id === id ? { ...c, assigned: null, correct: null, dragging: false } : c))
        setPaletteOpen(false)
    }

    function onDragOver(e) {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    function onBucketDragOver(e, bucket) {
        e.preventDefault()
        setHoverBucket(bucket)
        e.dataTransfer.dropEffect = 'move'
    }

    function startPointerDrag(e, card) {
        if (e.button !== 0) return
        e.preventDefault()
        setPointerDrag({ id: card.id, text: card.text, x: e.clientX, y: e.clientY })
        setHoverBucket(null)
        setCards(prev => prev.map(c => c.id === card.id ? { ...c, dragging: true } : c))
    }

    function resetGame() {
        setCards(initialCards.map(c => ({ ...c, assigned: null, correct: null, dragging: false })))
        setSelectedCardId(null)
    }

    const selectedCard = cards.find(c => c.id === selectedCardId)
    const allCorrect = cards.every(c => c.assigned !== null && c.correct === true)

    return (
        <div className="space-y-6">
            <div className="mb-4 flex flex-col gap-6">
                <div className="md:hidden flex items-center gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setPaletteOpen(!paletteOpen)}
                        className="w-full">
                        {paletteOpen ? '✕ Fermer Palette' : '≡ Ouvrir Palette'}
                    </Button>
                </div>

                {(paletteOpen || isDesktop) && (
                    <div
                        className={`${paletteOpen && !isDesktop ? 'fixed inset-0 bg-black/50 z-40 flex items-end' : 'hidden md:block'}`}
                        onClick={() => paletteOpen && !isDesktop && setPaletteOpen(false)}>
                        <div className={`${paletteOpen && !isDesktop ? 'w-full bg-background rounded-t-lg shadow-lg' : ''}`} onClick={(e) => e.stopPropagation()}>
                            <div
                                data-palette="true"
                                onDragOver={onDragOver}
                                onDrop={(e) => { onDropPalette(e); setPaletteOpen(false) }}
                                className={`min-h-[140px] p-4 bg-muted rounded-lg border ${paletteOpen && !isDesktop ? 'm-4' : ''}`}>
                                <div className="space-y-3">
                                    {cards.filter(c => c.assigned === null && !c.dragging && c.id !== selectedCardId).map(card => (
                                        <div
                                            key={card.id}
                                            draggable={isDesktop}
                                            onDragStart={(e) => isDesktop && onDragStart(e, card.id)}
                                            onDragEnd={isDesktop ? onDragEnd : undefined}
                                            onPointerDown={(e) => isDesktop && startPointerDrag(e, card)}
                                            onClick={() => !isDesktop && selectCard(card.id)}
                                            className={`px-3 py-2 bg-background border rounded shadow-sm touch-none ${isDesktop ? 'cursor-move' : 'cursor-pointer'}`}>
                                            {card.text}
                                        </div>
                                    ))}
                                </div>
                                {/* <div className="mt-3 text-xs text-muted-foreground">Faites glisser un élément dans un bucket, ou tapez pour le sélectionner sur mobile.</div> */}
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-2">
                            <Button variant="ghost" onClick={resetGame}>Reset</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {buckets.map(bucket => (
                            <div
                                key={bucket}
                                data-bucket={bucket}
                                onClick={() => assignSelectedCard(bucket)}
                                onDragOver={(e) => onBucketDragOver(e, bucket)}
                                onDrop={(e) => onDropBucket(e, bucket)}
                                onDragLeave={() => setHoverBucket(null)}
                                className={`min-h-[100px] p-3 rounded-lg border-2 flex flex-col items-start gap-2 ${hoverBucket === bucket ? 'border-primary/80 bg-primary/5' : 'border-dashed bg-muted/10'} cursor-pointer`}> 
                                <div className="font-bold">{bucket}</div>
                                <div className="flex-1 w-full space-y-2">
                                    {cards.filter(c => c.assigned === bucket && c.id !== selectedCardId).map(c => (
                                        <div key={c.id} draggable={isDesktop} onDragStart={(e) => isDesktop && onDragStart(e, c.id)} onDragEnd={isDesktop ? onDragEnd : undefined} onPointerDown={(e) => isDesktop && startPointerDrag(e, c)}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                if (!isDesktop) selectCard(c.id)
                                            }}
                                            className={`w-full px-3 py-2 rounded shadow-sm border ${c.correct === true ? 'border-green-500 bg-green-50' : c.correct === false ? 'border-red-400 bg-red-50' : 'border'} ${isDesktop ? 'cursor-move' : 'cursor-pointer'}`}>
                                            <div className="text-sm">{c.text}</div>
                                            <div className="text-xs text-muted-foreground">{c.correct === true ? 'Correct' : c.correct === false ? 'Incorrect' : 'En attente'}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {pointerDrag && !selectedCardId && (
                <div style={{
                    position: 'fixed',
                    left: pointerDrag.x + 12,
                    top: pointerDrag.y + 12,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transform: 'scale(1.1) rotate(5deg)',
                    opacity: 0.95,
                }}>
                    <div className="px-3 py-2 bg-white rounded border" style={{
                        boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                    }}>
                        {pointerDrag.text}
                    </div>
                </div>
            )}

            {selectedCard && (
                <div className="fixed inset-x-0 bottom-0 z-50 bg-white border-t border-slate-200 shadow-lg p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="text-sm text-muted-foreground">Carte sélectionnée</div>
                            <div className="mt-2 px-3 py-2 bg-slate-50 border rounded text-sm font-medium">{selectedCard.text}</div>
                            <div className="mt-2 text-xs text-muted-foreground">Tapez sur un bucket pour l'assigner ou appuyez sur ✕ pour annuler.</div>
                        </div>
                        <button
                            type="button"
                            onClick={discardSelectedCard}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-red-50 text-red-600 hover:bg-red-100">
                            ✕
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-4 flex justify-between">
                <div className="text-sm">
                    {allCorrect ? (
                        <span className="text-green-600 font-semibold">✓ Tous les éléments sont corrects!</span>
                    ) : (
                        <span className="text-muted-foreground">
                            {cards.filter(c => c.correct === true).length} / {cards.length} correct
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
