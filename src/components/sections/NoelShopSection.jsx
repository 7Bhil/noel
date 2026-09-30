import { useState } from 'react'
import { Plus, Check, Sparkles, Gift } from 'lucide-react'
import { NOEL_PRODUCTS } from '../../data/noelProducts'
import { noelAudio } from '../../utils/noelAudio'

export function NoelShopSection({ onAddToCart }) {
  const [addedId, setAddedId] = useState(null)

  const handleAdd = (product) => {
    onAddToCart?.(product)
    noelAudio.playChime()
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <section
      id="boutique"
      aria-labelledby="title-boutique"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 py-28 z-10"
    >
      <div className="max-w-6xl mx-auto w-full space-y-16">
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-dore font-sans font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-dore" />
            <span>Le Marché Boréal &bull; Noël 2026</span>
            <Sparkles className="w-3.5 h-3.5 text-dore" />
          </p>
          <h2
            id="title-boutique"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-neige"
          >
            Les Trésors de l&apos;Atelier
          </h2>
          <p className="font-sans text-sm text-neige-dim font-light leading-relaxed">
            Objets d artisanat rares, boîtes musicales et confections festives : offrez l enchantement de la féérie hivernale à vos proches.
          </p>
        </header>

        {/* Grille des articles féériques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NOEL_PRODUCTS.map((product) => {
            const isJustAdded = addedId === product.id

            return (
              <article
                key={product.id}
                className="relative rounded-3xl bg-nuit-800/70 border border-neige/10 hover:border-dore/50 backdrop-blur-md shadow-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden"
              >
                {/* Image HD */}
                <div className="relative w-full h-52 overflow-hidden bg-nuit-900 border-b border-neige/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit-900/90 via-transparent to-transparent opacity-60" />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-nuit-900/80 backdrop-blur-md border border-dore/40 text-[10px] font-mono text-dore">
                    {product.badge}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-dore">
                    {product.category}
                  </span>

                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl text-neige font-normal group-hover:text-dore transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-neige-dim/80 font-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Pied de la carte avec prix en XOF */}
                <div className="p-6 pt-0 mt-4 flex items-center justify-between border-t border-neige/10 pt-4">
                  <div>
                    <span className="text-[11px] text-neige-dim/60 font-sans block">Prix</span>
                    <span className="font-serif text-xl md:text-2xl text-dore font-semibold">
                      {product.price.toLocaleString('fr-FR')} XOF
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans tracking-wide uppercase transition-all duration-200 ${
                      isJustAdded
                        ? 'bg-dore text-nuit-900 font-semibold shadow-lg shadow-dore/30'
                        : 'bg-neige/10 hover:bg-dore hover:text-nuit-900 text-neige border border-neige/20 hover:border-dore'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Ajouté</span>
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4" />
                        <span>Offrir</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
