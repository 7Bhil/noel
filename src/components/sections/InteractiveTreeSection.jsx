import { useState } from 'react'
import { Sparkles, Star, Plus, Check } from 'lucide-react'
import { noelAudio } from '../../utils/noelAudio'

const ORNAMENT_TYPES = [
  { id: 'gold-star', label: 'Étoile Dorée', color: '#e5b85c' },
  { id: 'red-bauble', label: 'Boule Rouge Rubis', color: '#d93838' },
  { id: 'silver-bell', label: 'Clochette d Argent', color: '#c0d0dc' },
  { id: 'ice-crystal', label: 'Cristal de Givre', color: '#7ea4be' },
]

export function InteractiveTreeSection({ onOrnamentCountChange }) {
  const [ornaments, setOrnaments] = useState([
    { id: 1, type: 'gold-star', x: 50, y: 18 },
    { id: 2, type: 'red-bauble', x: 42, y: 38 },
    { id: 3, type: 'silver-bell', x: 58, y: 42 },
    { id: 4, type: 'ice-crystal', x: 35, y: 62 },
    { id: 5, type: 'red-bauble', x: 65, y: 65 },
    { id: 6, type: 'gold-star', x: 50, y: 75 },
  ])
  const [selectedType, setSelectedType] = useState('gold-star')
  const [isGlowing, setIsGlowing] = useState(true)

  const handleTreeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    // Vérifier si le clic est grossièrement dans la silhouette triangulaire du sapin
    if (y < 12 || y > 88) return
    const allowedWidth = (y / 100) * 80
    if (Math.abs(x - 50) > allowedWidth / 2) return

    const newOrnament = {
      id: Date.now(),
      type: selectedType,
      x,
      y,
    }

    setOrnaments((prev) => {
      const next = [...prev, newOrnament]
      onOrnamentCountChange?.(next.length)
      return next
    })
    noelAudio.playChime()
  }

  const handleToggleLights = () => {
    setIsGlowing((prev) => !prev)
    noelAudio.playChime()
  }

  return (
    <section
      id="sapin-enchante"
      aria-labelledby="title-sapin"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 z-10"
    >
      <div className="max-w-4xl mx-auto w-full space-y-10 text-center">
        <header className="space-y-3 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-dore font-sans font-medium flex items-center justify-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-dore" />
            <span>Rituel Hivernal &bull; Le Sapin Magique</span>
          </p>
          <h2
            id="title-sapin"
            className="font-serif text-4xl md:text-5xl font-normal text-neige"
          >
            Illuminez le Grand Sapin
          </h2>
          <p className="font-sans text-sm text-neige-dim font-light leading-relaxed">
            Choisissez un ornement et touchez les branchages pour décorer le sapin du village. Vos vœux s&apos;illuminent avec la tombée de la nuit.
          </p>
        </header>

        {/* Sélecteur d'ornements */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {ORNAMENT_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setSelectedType(type.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans transition-all duration-200 border flex items-center gap-2 ${
                selectedType === type.id
                  ? 'bg-dore/20 border-dore text-dore font-medium shadow-md shadow-dore/10 scale-105'
                  : 'bg-nuit-800/80 border-neige/15 text-neige-dim hover:border-dore/40'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: type.color }}
              />
              <span>{type.label}</span>
            </button>
          ))}

          <button
            type="button"
            onClick={handleToggleLights}
            className="px-4 py-2 rounded-full text-xs font-sans bg-nuit-800 border border-neige/20 text-neige hover:border-dore transition-colors ml-2"
          >
            {isGlowing ? 'Guirlandes : Allumées' : 'Guirlandes : Éteintes'}
          </button>
        </div>

        {/* Sapin interactif stylisé */}
        <div
          onClick={handleTreeClick}
          className="relative w-72 sm:w-80 md:w-96 h-[460px] mx-auto cursor-crosshair select-none group"
          title="Cliquez sur le sapin pour accrocher votre ornement"
        >
          {/* Étoile au sommet */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
            <Star
              className={`w-9 h-9 text-dore drop-shadow-[0_0_20px_rgba(229,184,92,0.9)] transition-transform duration-500 group-hover:scale-110 ${
                isGlowing ? 'animate-twinkle' : 'opacity-40'
              }`}
              fill="currentColor"
            />
          </div>

          {/* Silhouette du sapin à 3 étages */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
            {/* Étage supérieur */}
            <div
              className={`w-32 h-36 bg-gradient-to-b from-sapin to-sapin-dark rounded-t-full border border-dore/20 shadow-xl transition-all ${
                isGlowing ? 'shadow-[0_0_40px_rgba(20,60,43,0.6)]' : ''
              }`}
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
            {/* Étage intermédiaire */}
            <div
              className="-mt-14 w-52 h-44 bg-gradient-to-b from-sapin to-sapin-dark rounded-t-full border border-dore/20 shadow-xl"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
            {/* Étage inférieur */}
            <div
              className="-mt-16 w-72 h-52 bg-gradient-to-b from-sapin-light/80 to-sapin-dark rounded-t-full border border-dore/20 shadow-2xl"
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            />
            {/* Tronc en bois */}
            <div className="w-10 h-10 bg-amber-950 rounded-b-md border border-neige/10 -mt-2" />
          </div>

          {/* Guirlandes lumineuses festives */}
          {isGlowing && (
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-28 left-24 w-2 h-2 rounded-full bg-dore shadow-[0_0_12px_#ffe8a3] animate-pulse" />
              <div className="absolute top-36 right-24 w-2 h-2 rounded-full bg-baie-light shadow-[0_0_12px_#d93838] animate-pulse delay-100" />
              <div className="absolute top-52 left-16 w-2.5 h-2.5 rounded-full bg-neige shadow-[0_0_12px_#fff] animate-pulse delay-200" />
              <div className="absolute top-64 right-16 w-2.5 h-2.5 rounded-full bg-dore shadow-[0_0_12px_#ffe8a3] animate-pulse delay-300" />
              <div className="absolute top-80 left-12 w-3 h-3 rounded-full bg-baie-light shadow-[0_0_15px_#d93838] animate-pulse delay-150" />
              <div className="absolute top-84 right-12 w-3 h-3 rounded-full bg-dore shadow-[0_0_15px_#ffe8a3] animate-pulse delay-75" />
            </div>
          )}

          {/* Ornements accrochés par le visiteur */}
          {ornaments.map((orn) => {
            const ornData = ORNAMENT_TYPES.find((t) => t.id === orn.type) || ORNAMENT_TYPES[0]
            return (
              <div
                key={orn.id}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-125"
                style={{ left: `${orn.x}%`, top: `${orn.y}%` }}
              >
                <div
                  className="w-4 h-4 rounded-full border border-white/60 shadow-lg"
                  style={{
                    backgroundColor: ornData.color,
                    boxShadow: isGlowing ? `0 0 14px ${ornData.color}` : 'none',
                  }}
                />
              </div>
            )
          })}
        </div>

        <p className="text-xs font-mono text-dore/80">
          {ornaments.length} décorations scintillantes accrochées sur le sapin
        </p>
      </div>
    </section>
  )
}
