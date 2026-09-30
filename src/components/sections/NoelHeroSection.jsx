import { Sparkles, ArrowDown, Gift, Volume2, VolumeX } from 'lucide-react'
import { noelAudio } from '../../utils/noelAudio'

export function NoelHeroSection({ onExploreShop, isPlayingSound, onToggleSound }) {
  return (
    <header className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-6 py-20 z-10">
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dore/10 border border-dore/30 text-xs font-mono text-dore backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Féérie Boréale &bull; Décembre 2026</span>
        </div>

        <div className="space-y-4">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-neige tracking-tight leading-none">
            Le Village Boréal
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-dore-light">
            L&apos;Enchantement des Fêtes &bull; Boutique Artisanale
          </p>
        </div>

        <p className="font-sans text-sm md:text-base text-neige-dim font-light max-w-xl mx-auto leading-relaxed">
          Poussez les portes de notre atelier scandinave. Découvrez nos créations faites main, boîtes musicales et confections rares prêtes à émerveiller vos tablées.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExploreShop}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-dore hover:bg-dore-light text-nuit-900 font-sans text-xs tracking-widest uppercase font-semibold shadow-xl shadow-dore/20 transition-all duration-300 hover:scale-105"
          >
            <Gift className="w-4 h-4 text-nuit-900" />
            <span>Découvrir la Boutique</span>
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label="Contrôle de la musique de fête"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-nuit-800/80 border border-neige/20 hover:border-dore text-neige text-xs font-sans transition-all"
          >
            {isPlayingSound ? (
              <>
                <Volume2 className="w-4 h-4 text-dore" />
                <span>Mélodie active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-neige/40" />
                <span>Activer l ambiance</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Flèche invitant au scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neige-dim/40 text-xs font-mono uppercase tracking-widest">
        <span>Défiler</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-dore" />
      </div>
    </header>
  )
}
