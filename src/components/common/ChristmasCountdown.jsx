import { useState, useEffect } from 'react'
import { Sparkles, Clock } from 'lucide-react'

export function ChristmasCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Cible : 25 Décembre 2026 à 00:00:00
    const targetDate = new Date('2026-12-25T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-nuit-800/80 border border-dore/30 backdrop-blur-md shadow-2xl max-w-xl mx-auto space-y-4">
      <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-dore">
        <Clock className="w-3.5 h-3.5" />
        <span>Compte à Rebours avant la Nuit de Noël</span>
      </div>

      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="p-3 rounded-2xl bg-nuit-900/80 border border-neige/10">
          <span className="font-serif text-3xl md:text-4xl text-neige font-normal block">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-neige-dim/60">Jours</span>
        </div>

        <div className="p-3 rounded-2xl bg-nuit-900/80 border border-neige/10">
          <span className="font-serif text-3xl md:text-4xl text-neige font-normal block">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-neige-dim/60">Heures</span>
        </div>

        <div className="p-3 rounded-2xl bg-nuit-900/80 border border-neige/10">
          <span className="font-serif text-3xl md:text-4xl text-neige font-normal block">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-neige-dim/60">Min</span>
        </div>

        <div className="p-3 rounded-2xl bg-nuit-900/80 border border-neige/10">
          <span className="font-serif text-3xl md:text-4xl text-dore font-semibold block animate-pulse">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-dore/80">Sec</span>
        </div>
      </div>
    </div>
  )
}
