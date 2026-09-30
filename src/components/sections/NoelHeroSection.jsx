import { Sparkles, ArrowDown, Gift, Volume2, VolumeX, TreePine, Mail } from 'lucide-react'
import { ChristmasCountdown } from '../common/ChristmasCountdown'

export function NoelHeroSection({
  onExploreShop,
  onExploreTree,
  onExploreLetter,
  isPlayingSound,
  onToggleSound,
}) {
  return (
    <header className="relative min-h-screen w-full flex flex-col justify-center items-center text-center px-6 py-24 z-10 space-y-10">
      <div className="max-w-3xl space-y-6">
        <div className="space-y-4">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-neige tracking-tight leading-none drop-shadow-xl">
            Le Village Boréal
          </h1>
          <p className="font-serif italic text-xl md:text-2xl text-dore-light">
            La Magie de Noël &bull; Contes, Vœux &amp; Boutique d&apos;Hiver
          </p>
        </div>

        <p className="font-sans text-sm md:text-base text-neige-dim font-light max-w-xl mx-auto leading-relaxed">
          Poussez les portes de notre village sous les flocons. Décorez le grand sapin magique, déposez vos vœux sous l&apos;étoile polaire et trouvez vos présents féériques.
        </p>

        {/* Compte à rebours jusqu'à Noël */}
        <div className="pt-2">
          <ChristmasCountdown />
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onExploreShop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dore hover:bg-dore-light text-nuit-900 font-sans text-xs tracking-widest uppercase font-semibold shadow-xl shadow-dore/20 transition-all duration-300 hover:scale-105"
          >
            <Gift className="w-4 h-4 text-nuit-900" />
            <span>Boutique de Noël</span>
          </button>

          <button
            type="button"
            onClick={onExploreTree}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sapin hover:bg-sapin-light border border-dore/30 text-neige font-sans text-xs tracking-widest uppercase font-medium shadow-lg transition-all duration-300"
          >
            <TreePine className="w-4 h-4 text-dore" />
            <span>Décorer le Sapin</span>
          </button>

          <button
            type="button"
            onClick={onExploreLetter}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-nuit-800 border border-neige/20 hover:border-dore text-neige font-sans text-xs tracking-widest uppercase font-medium transition-all"
          >
            <Mail className="w-4 h-4 text-dore" />
            <span>Écrire un Vœu</span>
          </button>

          <button
            type="button"
            onClick={onToggleSound}
            aria-label="Contrôle de la musique de fête"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-nuit-800/80 border border-neige/15 text-neige text-xs font-sans hover:border-dore transition-all"
          >
            {isPlayingSound ? (
              <>
                <Volume2 className="w-4 h-4 text-dore" />
                <span>Carillons actifs</span>
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
      <div className="pt-6 flex flex-col items-center gap-1.5 text-neige-dim/40 text-xs font-mono uppercase tracking-widest">
        <span>Explorer la féérie</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-dore" />
      </div>
    </header>
  )
}
