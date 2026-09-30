# Le Village Boréal &bull; Noël 2026

Boutique féérique et immersive de Noël 2026 en **Front-End pur** (Vite + React JSX + Tailwind CSS v3 + Canvas 2D + Web Audio API).

Explorez le village sous la neige, découvrez nos créations artisanales faites main (boîtes à musique, coffrets boréaux, globes enchantés, bougies d'hiver) et commandez vos cadeaux en Franc CFA (XOF).

---

## 1. Principes et Architecture

- **Front-End UNIQUEMENT** : Zéro backend, zéro base de données distante, déploiement statique instantané sur Netlify ou Vercel (`dist/`).
- **Catalogue en Franc CFA (XOF)** : 6 articles féériques avec visuels haute définition.
- **Panier d'Achat Réactif & Persistant** : Hotte de Noël sauvegardée dans le `localStorage` (`noel_boreal_cart_2026`).
- **Tunnel de Commande Intégré** : Formulaire d'expédition sans intermédiaire avec génération de numéro de commande unique (`NOEL-XXXXXX`).
- **Moteur Sonore Procédural** : Synthèse de carillons et clochettes célestes via l'API Web Audio native du navigateur.
- **Ambiance Visuelle** : Chute de flocons de neige en Canvas 2D en boucle continue et fluide.

---

## 2. Commandes Utiles

```bash
# Lancement en développement
npm run dev

# Construction de production
npm run build

# Prévisualisation du build
npm run preview
```
