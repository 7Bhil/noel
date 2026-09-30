import { useState, useEffect } from 'react'
import { SnowCanvas } from './components/canvas/SnowCanvas'
import { NoelHeroSection } from './components/sections/NoelHeroSection'
import { InteractiveTreeSection } from './components/sections/InteractiveTreeSection'
import { WishlistLetterSection } from './components/sections/WishlistLetterSection'
import { NoelShopSection } from './components/sections/NoelShopSection'
import { NoelCartDrawer } from './components/common/NoelCartDrawer'
import { ShoppingBag, TreePine, Mail, Gift } from 'lucide-react'
import { noelAudio } from './utils/noelAudio'

const STORAGE_KEY_NOEL_CART = 'noel_boreal_cart_2026'

export default function App() {
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Persistance du panier dans le localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOEL_CART)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOEL_CART, JSON.stringify(cartItems))
    } catch {
      // Ignorer
    }
  }, [cartItems])

  const handleToggleSound = () => {
    const nextState = !isPlayingSound
    setIsPlayingSound(nextState)
    if (nextState) {
      noelAudio.start()
    } else {
      noelAudio.stop()
    }
  }

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateCartQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const totalQuantity = cartItems.reduce((acc, i) => acc + i.quantity, 0)
  const totalPrice = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <div className="relative min-h-screen bg-nuit-900 text-neige font-sans selection:bg-dore selection:text-nuit-900 overflow-x-hidden">
      {/* Chute de neige féérique en arrière-plan */}
      <SnowCanvas />

      {/* Barre de navigation féérique en haut */}
      <nav
        aria-label="Navigation du village"
        className="fixed top-6 left-6 z-40 hidden md:flex items-center gap-2 p-1.5 rounded-full bg-nuit-800/80 border border-neige/15 backdrop-blur-md text-xs font-sans"
      >
        <button
          type="button"
          onClick={() => scrollTo('sapin-enchante')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-sapin/60 hover:text-dore transition-colors"
        >
          <TreePine className="w-3.5 h-3.5 text-dore" />
          <span>Le Sapin</span>
        </button>
        <button
          type="button"
          onClick={() => scrollTo('lettre-au-pere-noel')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-nuit-700 hover:text-dore transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-dore" />
          <span>La Boîte aux Vœux</span>
        </button>
        <button
          type="button"
          onClick={() => scrollTo('boutique')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-nuit-700 hover:text-dore transition-colors"
        >
          <Gift className="w-3.5 h-3.5 text-dore" />
          <span>L&apos;Atelier Cadeaux</span>
        </button>
      </nav>

      {/* Bouton Panier Flottant avec badge réactif */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        aria-label="Ouvrir la hotte de cadeaux"
        className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-nuit-800/85 border border-dore/40 backdrop-blur-md text-neige hover:bg-nuit-800 hover:border-dore transition-all shadow-xl shadow-dore/10"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 text-dore" />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-dore text-nuit-900 font-mono text-[10px] font-bold flex items-center justify-center animate-pulse">
              {totalQuantity}
            </span>
          )}
        </div>
        <span className="text-xs font-sans font-medium hidden sm:inline">
          {totalQuantity > 0
            ? `${totalPrice.toLocaleString('fr-FR')} XOF`
            : 'Hotte de Noël'}
        </span>
      </button>

      {/* Tiroir de panier féérique */}
      <NoelCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Parcours immersif complet de Noël */}
      <main className="relative z-10">
        <NoelHeroSection
          onExploreShop={() => scrollTo('boutique')}
          onExploreTree={() => scrollTo('sapin-enchante')}
          onExploreLetter={() => scrollTo('lettre-au-pere-noel')}
          isPlayingSound={isPlayingSound}
          onToggleSound={handleToggleSound}
        />
        <InteractiveTreeSection />
        <WishlistLetterSection />
        <NoelShopSection onAddToCart={handleAddToCart} />
      </main>

      {/* Pied de page chaleureux */}
      <footer className="relative z-10 border-t border-neige/10 py-12 px-6 text-center space-y-3 bg-nuit-900/80 backdrop-blur-md">
        <p className="text-xs text-neige-dim font-light">
          Créé pour perpétuer la magie et la chaleur de Noël 2026 &bull; Le Village Boréal
        </p>
        <p className="text-[11px] text-neige-dim/50 font-mono">
          Tarification en Franc CFA (XOF) &bull; Expédition féérique offerte dès 40 000 XOF
        </p>
      </footer>
    </div>
  )
}
