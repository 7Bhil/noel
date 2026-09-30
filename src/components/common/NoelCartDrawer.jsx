import { useState } from 'react'
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, CheckCircle, Gift, Sparkles } from 'lucide-react'
import { noelAudio } from '../../utils/noelAudio'

export function NoelCartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
  })

  if (!isOpen) return null

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 40000 || subtotal === 0 ? 0 : 3000
  const total = subtotal + shipping

  const handleQuantity = (productId, delta) => {
    onUpdateQuantity?.(productId, delta)
    noelAudio.playChime()
  }

  const handleRemove = (productId) => {
    onRemoveItem?.(productId)
    noelAudio.playChime()
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.address) return

    const generatedId = `NOEL-${Math.floor(100000 + Math.random() * 900000)}`
    setOrderId(generatedId)
    setOrderCompleted(true)
    onClearCart?.()
    noelAudio.playChime()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-nuit-900/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-nuit-800 border-l border-dore/30 h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-neige/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Gift className="w-5 h-5 text-dore" />
            <h2 className="font-serif text-2xl text-neige font-normal">
              {orderCompleted
                ? 'Commande Féérique'
                : isCheckingOut
                ? 'Expédition des Cadeaux'
                : 'La Hotte de Noël'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neige/50 hover:text-neige transition-colors rounded-full hover:bg-nuit-700"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps */}
        {orderCompleted ? (
          <div className="my-auto text-center space-y-5 py-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-dore/20 border border-dore/40 flex items-center justify-center text-dore">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-dore">
                Préparation Enchanteresse
              </span>
              <h3 className="font-serif text-3xl text-neige">
                Joyeux Noël, {formData.name}
              </h3>
              <p className="font-sans text-xs text-neige-dim font-light max-w-xs mx-auto leading-relaxed">
                Votre commande n° <strong className="text-dore font-mono">{orderId}</strong> a été transmise aux lutins de l atelier. La lettre de confirmation a été envoyée à <strong className="text-neige">{formData.email}</strong>.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOrderCompleted(false)
                setIsCheckingOut(false)
                onClose()
              }}
              className="px-6 py-2.5 rounded-full bg-dore text-nuit-900 text-xs font-sans uppercase tracking-wider font-semibold hover:bg-dore-light transition-all"
            >
              Fermer et poursuivre
            </button>
          </div>
        ) : isCheckingOut ? (
          <form onSubmit={handleSubmitOrder} className="py-4 space-y-4 my-auto">
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-dore">Nom du destinataire</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nicolas de Myre"
                className="w-full px-3.5 py-2 rounded-xl bg-nuit-900 border border-neige/20 text-xs text-neige focus:outline-none focus:border-dore"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-dore">Courriel</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="noel@boreal.fr"
                className="w-full px-3.5 py-2 rounded-xl bg-nuit-900 border border-neige/20 text-xs text-neige focus:outline-none focus:border-dore"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-dore">Adresse de livraison</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="25 Chemin de l Étoile Polaire"
                className="w-full px-3.5 py-2 rounded-xl bg-nuit-900 border border-neige/20 text-xs text-neige focus:outline-none focus:border-dore"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[11px] font-mono uppercase text-dore">Ville &amp; Code Postal</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Rovaniemi / Paris"
                className="w-full px-3.5 py-2 rounded-xl bg-nuit-900 border border-neige/20 text-xs text-neige focus:outline-none focus:border-dore"
              />
            </div>

            {/* Total */}
            <div className="p-3 rounded-xl bg-nuit-900/90 border border-dore/20 space-y-1 text-xs">
              <div className="flex justify-between text-neige-dim">
                <span>Total à régler :</span>
                <span className="font-serif text-base text-dore font-semibold">{total.toLocaleString('fr-FR')} XOF</span>
              </div>
              <p className="text-[10px] text-neige-dim/50 font-light">
                Simulation de paiement immédiat sans intermédiaire.
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="w-1/3 py-2.5 rounded-xl border border-neige/20 text-xs text-neige-dim hover:text-neige"
              >
                Retour
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 rounded-xl bg-dore hover:bg-dore-light text-nuit-900 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Expédier les cadeaux
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 py-4 overflow-y-auto space-y-3">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3 text-neige/50">
                <Gift className="w-10 h-10 mx-auto opacity-30 text-dore" />
                <p className="font-serif text-lg text-neige">Votre hotte est vide</p>
                <p className="font-sans text-xs">Choisissez des présents enchantés dans l Atelier.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-nuit-900 border border-neige/10 flex items-center justify-between gap-3"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover border border-neige/15 flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-neige truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-mono text-dore">
                      {item.price.toLocaleString('fr-FR')} XOF
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-neige/20 rounded-lg bg-nuit-800">
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.id, -1)}
                        className="p-1 hover:text-dore text-neige/70"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono text-neige">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.id, 1)}
                        className="p-1 hover:text-dore text-neige/70"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 text-neige/40 hover:text-red-400 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Pied */}
        {!orderCompleted && !isCheckingOut && cartItems.length > 0 && (
          <div className="border-t border-neige/10 pt-4 space-y-3">
            <div className="space-y-1.5 text-xs text-neige-dim font-light">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-mono text-neige">{subtotal.toLocaleString('fr-FR')} XOF</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison</span>
                <span className="font-mono text-neige">
                  {shipping === 0 ? 'Offerts dès 40 000 XOF' : `${shipping.toLocaleString('fr-FR')} XOF`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium text-neige pt-1 border-t border-neige/10">
                <span>Total</span>
                <span className="font-serif text-lg text-dore font-semibold">
                  {total.toLocaleString('fr-FR')} XOF
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3 rounded-full bg-dore hover:bg-dore-light text-nuit-900 font-sans text-xs tracking-wider uppercase font-semibold shadow-lg shadow-dore/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Valider ma hotte de Noël</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
