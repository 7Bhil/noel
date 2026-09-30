import { useState } from 'react'
import { Mail, Send, CheckCircle, Sparkles, Heart } from 'lucide-react'
import { noelAudio } from '../../utils/noelAudio'

const STORAGE_KEY_WISHLIST = 'noel_boreal_wishlist_2026'

export function WishlistLetterSection() {
  const [wish, setWish] = useState('')
  const [sender, setSender] = useState('')
  const [sent, setSent] = useState(false)
  const [wishesList, setWishesList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WISHLIST)
      return saved
        ? JSON.parse(saved)
        : [
            { id: 1, sender: 'Léa', wish: 'De la neige pour Noël et des rires partagés' },
            { id: 2, sender: 'Gabriel', wish: 'Une boîte à musique pour bercer les nuits' },
          ]
    } catch {
      return []
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!wish.trim() || !sender.trim()) return

    const newWish = {
      id: Date.now(),
      sender: sender.trim(),
      wish: wish.trim(),
    }

    const updated = [newWish, ...wishesList]
    setWishesList(updated)
    try {
      localStorage.setItem(STORAGE_KEY_WISHLIST, JSON.stringify(updated))
    } catch {
      // Ignorer
    }

    noelAudio.playChime()
    setSent(true)
    setWish('')
    setSender('')
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section
      id="lettre-au-pere-noel"
      aria-labelledby="title-lettre"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-24 z-10"
    >
      <div className="max-w-4xl mx-auto w-full space-y-12">
        <header className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-dore font-sans font-medium flex items-center justify-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-dore" />
            <span>La Boîte aux Lettres Enchantée</span>
          </p>
          <h2
            id="title-lettre"
            className="font-serif text-4xl md:text-5xl font-normal text-neige"
          >
            Votre Vœu sous l&apos;Étoile
          </h2>
          <p className="font-sans text-sm text-neige-dim font-light leading-relaxed">
            Écrivez un souhait chaleureux pour la nuit de Noël. Votre mot rejoint les pensées bienveillantes du village.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Formulaire Lettre de Noël */}
          <div className="lg:col-span-6 p-7 md:p-8 rounded-3xl bg-nuit-800/80 border border-neige/15 backdrop-blur-md shadow-2xl space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-mono uppercase text-dore">Votre prénom ou signature</label>
                <input
                  type="text"
                  required
                  maxLength={30}
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Éléonore"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-nuit-900 border border-neige/20 text-xs text-neige focus:outline-none focus:border-dore"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-[11px] font-mono uppercase text-dore">Votre vœu pour Noël (max 100 caractères)</label>
                <textarea
                  required
                  maxLength={100}
                  rows={3}
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  placeholder="Que la paix et la joie réchauffent chaque foyer..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-nuit-900 border border-neige/20 text-xs text-neige focus:outline-none focus:border-dore resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-dore hover:bg-dore-light text-nuit-900 font-sans text-xs tracking-wider uppercase font-semibold shadow-lg shadow-dore/20 flex items-center justify-center gap-2 transition-all"
              >
                {sent ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-nuit-900" />
                    <span>Vœu expédié aux étoiles</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-nuit-900" />
                    <span>Déposer dans la boîte aux lettres</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Registre des vœux du village */}
          <div className="lg:col-span-6 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-dore block text-left">
              Les Vœux du Village ({wishesList.length})
            </span>
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {wishesList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-nuit-800/60 border border-neige/10 text-left space-y-1.5 backdrop-blur-sm"
                >
                  <p className="font-serif italic text-sm text-neige font-normal">
                    « {item.wish} »
                  </p>
                  <span className="text-[10px] font-mono text-dore/80 block">
                    Par {item.sender} &bull; Étoile de Noël
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
