# 💳 GUIDE DE CONFIGURATION STRIPE pour EKINOX

## 🎯 Vue d'ensemble

Ce guide vous explique comment configurer Stripe pour Ekinox avec les 4 tiers de pricing SaaS.

---

## 📊 Structure Tarifaire Ekinox

### 🆓 **GRATUIT** (Free Tier)
- **Prix :** 0€/mois
- **Limites :**
  - 10 exécutions sync/minute
  - 50 exécutions async/minute
  - 100€ de coût IA/mois
  - 7 jours de logs
  - 1 workspace

### ⭐ **PRO**
- **Prix :** 29€/mois ou 290€/an (17% de réduction)
- **Limites :**
  - 25 exécutions sync/minute
  - 200 exécutions async/minute
  - 1000€ de coût IA/mois
  - 30 jours de logs
  - 3 workspaces
- **Fonctionnalités bonus :** Support prioritaire, analytics avancés

### 👥 **ÉQUIPE** (Team)
- **Prix :** 99€/mois ou 990€/an (17% de réduction)
- **Limites :**
  - 75 exécutions sync/minute
  - 500 exécutions async/minute
  - 5000€ de coût IA/mois
  - 90 jours de logs
  - 10 workspaces
- **Fonctionnalités bonus :** Collaboration avancée, SSO, gestion d'équipe

### 🏢 **ENTREPRISE** (Enterprise)
- **Prix :** 499€/mois ou 4990€/an (17% de réduction)
- **Limites :**
  - 150 exécutions sync/minute
  - 1000 exécutions async/minute
  - 50000€ de coût IA/mois
  - Logs illimités
  - Workspaces illimités
- **Fonctionnalités bonus :** On-premise, SLA, support dédié

---

## 🚀 Étapes de Configuration Stripe

### 1. 📝 Accéder au Dashboard Stripe

1. Connectez-vous sur https://dashboard.stripe.com
2. Assurez-vous d'être en mode **"Test"** pour commencer
3. Dans le menu de gauche, allez dans **"Products"**

### 2. 🆓 Créer le Produit GRATUIT

**Pourquoi créer un produit gratuit ?** Même si c'est gratuit, Stripe permet de tracker les utilisateurs et gérer les upgrades.

**Étapes :**
1. Cliquez **"Add product"**
2. **Nom :** `Ekinox Free`
3. **Description :** `Plan gratuit Ekinox - Découvrez l'automatisation IA no-code`
4. **Prix :**
   - **Recurring :** Monthly
   - **Price :** `0.00` EUR
5. **Advanced :**
   - **Usage type :** Licensed (par utilisateur)
   - **Payment behavior :** Charge automatically
6. **Créer le produit**
7. **📋 Notez le Price ID** qui commence par `price_` (ex: `price_1ABC123free`)

### 3. ⭐ Créer le Produit PRO

**Étapes :**
1. **"Add product"**
2. **Nom :** `Ekinox Pro`
3. **Description :** `Plan Pro Ekinox - Automatisation IA pour professionnels`
4. **Pricing :**

   **Prix Mensuel :**
   - **Recurring :** Monthly
   - **Price :** `29.00` EUR
   - **📋 Notez Price ID mensuel :** `price_1ABC123pro_monthly`

   **Prix Annuel (optionnel mais recommandé) :**
   - Cliquez **"Add another price"**
   - **Recurring :** Yearly
   - **Price :** `290.00` EUR
   - **📋 Notez Price ID annuel :** `price_1ABC123pro_yearly`

5. **Features à ajouter dans la description :**
   ```
   ✅ 25 exécutions sync/minute
   ✅ 200 exécutions async/minute
   ✅ 1000€ coût IA/mois
   ✅ 30 jours de logs
   ✅ 3 workspaces
   ✅ Support prioritaire
   ✅ Analytics avancés
   ```

### 4. 👥 Créer le Produit ÉQUIPE

**Étapes :**
1. **"Add product"**
2. **Nom :** `Ekinox Team`
3. **Description :** `Plan Équipe Ekinox - Collaboration et gestion d'équipe`
4. **Pricing :**
   - **Mensuel :** `99.00` EUR → Price ID: `price_1ABC123team_monthly`
   - **Annuel :** `990.00` EUR → Price ID: `price_1ABC123team_yearly`

5. **Features :**
   ```
   ✅ 75 exécutions sync/minute
   ✅ 500 exécutions async/minute
   ✅ 5000€ coût IA/mois
   ✅ 90 jours de logs
   ✅ 10 workspaces
   ✅ Collaboration temps réel
   ✅ SSO (Single Sign-On)
   ✅ Gestion d'équipe avancée
   ```

### 5. 🏢 Créer le Produit ENTREPRISE

**Étapes :**
1. **"Add product"**
2. **Nom :** `Ekinox Enterprise`
3. **Description :** `Plan Entreprise Ekinox - Solution complète avec support dédié`
4. **Pricing :**
   - **Mensuel :** `499.00` EUR → Price ID: `price_1ABC123enterprise_monthly`
   - **Annuel :** `4990.00` EUR → Price ID: `price_1ABC123enterprise_yearly`

5. **Features :**
   ```
   ✅ 150+ exécutions sync/minute
   ✅ 1000+ exécutions async/minute
   ✅ 50000€+ coût IA/mois
   ✅ Logs illimités
   ✅ Workspaces illimités
   ✅ Déploiement on-premise
   ✅ SLA garanti
   ✅ Support dédié 24/7
   ✅ Formation personnalisée
   ```

---

## 🔧 Configuration des Webhooks

### 6. ⚡ Créer le Webhook Endpoint

Les webhooks permettent à Stripe de notifier Ekinox des changements d'abonnement.

**Étapes :**
1. Dans Stripe Dashboard → **"Developers"** → **"Webhooks"**
2. **"Add endpoint"**
3. **Endpoint URL :** `https://www.ekinox.app/api/webhooks/stripe`
   - ⚠️ Remplacez par votre vraie URL de production
   - Pour dev local : `https://your-ngrok-url.com/api/webhooks/stripe`
4. **Events to send :**
   ```
   ✅ customer.subscription.created
   ✅ customer.subscription.updated
   ✅ customer.subscription.deleted
   ✅ invoice.payment_succeeded
   ✅ invoice.payment_failed
   ✅ customer.created
   ✅ customer.updated
   ```
5. **Créer le webhook**
6. **📋 Notez le Webhook Secret** qui commence par `whsec_`

---

## 📝 Configuration dans Ekinox

### 7. 🔐 Variables d'Environnement

Une fois vos produits créés, ajoutez dans votre fichier `.env` :

```bash
# Stripe Configuration
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"  # Mode test d'abord
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_from_step_6"

# Price IDs récupérés des étapes précédentes
STRIPE_FREE_PRICE_ID="price_1ABC123free"
STRIPE_PRO_PRICE_ID="price_1ABC123pro_monthly"
STRIPE_TEAM_PRICE_ID="price_1ABC123team_monthly"
STRIPE_ENTERPRISE_PRICE_ID="price_1ABC123enterprise_monthly"

# Limites de coûts (en euros)
FREE_TIER_COST_LIMIT=100
PRO_TIER_COST_LIMIT=1000
TEAM_TIER_COST_LIMIT=5000
ENTERPRISE_TIER_COST_LIMIT=50000

# Activer le billing
BILLING_ENABLED=true
NEXT_PUBLIC_BILLING_ENABLED=true
```

---

## 🧪 Tests et Validation

### 8. ✅ Tester les Paiements

**En mode Test :**
1. Utilisez les cartes de test Stripe :
   - **Succès :** `4242 4242 4242 4242`
   - **Échec :** `4000 0000 0000 0002`
   - **3D Secure :** `4000 0000 0000 3220`

2. **Date d'expiration :** N'importe quelle date future
3. **CVC :** N'importe quel code 3 chiffres
4. **ZIP :** N'importe quel code postal

**Tester chaque plan :**
- ✅ Inscription gratuite
- ✅ Upgrade Free → Pro
- ✅ Upgrade Pro → Team
- ✅ Upgrade Team → Enterprise
- ✅ Downgrade Enterprise → Team
- ✅ Annulation d'abonnement

### 9. 📊 Vérifier les Webhooks

1. Dans Stripe Dashboard → **"Developers"** → **"Webhooks"**
2. Cliquez sur votre webhook
3. Vérifiez que les événements arrivent bien
4. Statut : **"Succeeded"** en vert ✅

---

## 🚀 Passage en Production

### 10. 🔄 Mode Live

**Une fois les tests validés :**

1. **Toggle en mode Live** dans Stripe Dashboard
2. **Recréer tous les produits** (les prix test ne marchent pas en live)
3. **Recréer le webhook** avec la vraie URL de prod
4. **Mettre à jour le .env** avec les nouvelles clés live :
   ```bash
   STRIPE_SECRET_KEY="sk_live_your_live_secret_key"
   STRIPE_WEBHOOK_SECRET="whsec_new_live_webhook_secret"
   # + nouveaux Price IDs live
   ```

---

## 💡 Conseils Pro

### 🎨 **Personnalisation Checkout**
- **Logo :** Uploadez le logo Ekinox dans Stripe Settings
- **Couleurs :** Configurez la palette Ekinox (#1e40af)
- **Emails :** Personnalisez les emails de factures

### 📈 **Analytics**
- Activez **Stripe Sigma** pour analytics avancés
- Configurez les **Revenue Recognition**
- Utilisez **Stripe Radar** pour la prévention fraude

### 🔔 **Notifications**
- Configurez les **Slack notifications** pour nouveaux paiements
- Activez les **Email alerts** pour les paiements échoués

### 💰 **Optimisation Revenus**
- **Essai gratuit :** 14 jours sur Pro/Team/Enterprise
- **Promotion annuelle :** 17% de réduction (2 mois offerts)
- **Coupons :** `LAUNCH50` pour 50% de réduction les 3 premiers mois

---

## 🆘 Troubleshooting

### ❌ **Problèmes Courants**

**Webhook ne fonctionne pas :**
- Vérifiez l'URL (doit être HTTPS en prod)
- Testez avec ngrok en développement
- Vérifiez les logs Ekinox pour erreurs

**Price ID invalide :**
- Assurez-vous d'utiliser les price IDs (pas product IDs)
- Vérifiez que vous êtes dans le bon mode (test/live)

**Paiement refusé :**
- Vérifiez que Stripe est activé dans votre pays
- Confirmez la configuration des moyens de paiement

**Upgrade/Downgrade ne marche pas :**
- Vérifiez que les abonnements sont bien liés aux Price IDs
- Testez les webhooks subscription.updated

---

## 📞 Support

**Stripe Support :** https://support.stripe.com
**Documentation Stripe :** https://stripe.com/docs
**Ekinox Integration Guide :** Voir documentation technique

---

**✨ Une fois configuré, votre SaaS Ekinox sera prêt à encaisser ! 💰**

*Guide créé le 9 octobre 2025 - Version 1.0*
