# 💳 GUIDE DE CONFIGURATION STRIPE POUR EKINOX

## 🎯 Vue d'ensemble

Ce guide vous explique comment configurer Stripe pour Ekinox avec les plans tarifaires configurés.

---

## 📊 Structure Tarifaire Ekinox (Vos Prix)

### 🆓 **GRATUIT** (Free Tier)
- **Prix :** $0/mois
- **Crédits AI inclus :** **$5**
- **Limites :**
  - 10 exécutions sync/minute
  - 50 exécutions async/minute
  - $5 de coût IA/mois
  - 7 jours de logs
  - 1 workspace

### ⭐ **PRO**
- **Prix :** **$30/mois** ou **$300/an** (17% de réduction)
- **Crédits AI inclus :** **$20**
- **Limites :**
  - 25 exécutions sync/minute
  - 200 exécutions async/minute
  - $20 de coût IA/mois (overage facturé au-delà)
  - 30 jours de logs
  - 3 workspaces
- **Fonctionnalités bonus :** Support prioritaire, Copilot inclus

### 👥 **TEAM**
- **Prix :** **$100/mois** ou **$1000/an** (17% de réduction)
- **Crédits AI inclus :** **$60**
- **Limites :**
  - 75 exécutions sync/minute
  - 500 exécutions async/minute
  - $60 de coût IA/mois (overage facturé au-delà)
  - 90 jours de logs
  - 10 workspaces
- **Fonctionnalités bonus :** Collaboration temps réel, SSO, gestion d'équipe

### 🏢 **ENTREPRISE**
- **Prix :** **$500/mois** ou **$5000/an** (17% de réduction)
- **Crédits AI inclus :** **$300**
- **Limites :**
  - 150 exécutions sync/minute
  - 1000 exécutions async/minute
  - $300 de coût IA/mois (overage facturé au-delà)
  - Logs illimités
  - Workspaces illimités
- **Fonctionnalités bonus :** SLA garanti, support dédié 24/7

---

## 💰 MODÈLE ÉCONOMIQUE (Important !)

### **Comment ça marche ?**

1. **Utilisateur paie** : $30/mois (Plan Pro)
2. **Crédits inclus** : $20 d'usage IA
3. **Utilisation réelle** :
   - Si < $20 → Pas de frais supplémentaires ✅
   - Si > $20 → **Overage facturé** (ex: $35 usage → $15 overage)

### **Vos Revenus** :

**Scénario Plan Pro ($30/mois)** :

| Utilisateur | Usage AI | Overage | Votre Revenu | Vos Coûts AI | Marge |
|-------------|----------|---------|--------------|--------------|-------|
| Light | $10 | $0 | **$30** | $10 | **$20** (66%) |
| Normal | $20 | $0 | **$30** | $20 | **$10** (33%) |
| Heavy | $35 | $15 | **$45** | $35 | **$10** (22%) |

**Vous ne perdez JAMAIS d'argent** : Les overages couvrent 100% des coûts AI excédentaires !

---

## 🔧 Configuration des Webhooks Stripe

### 1. ⚡ Créer le Webhook Endpoint

**Étapes :**
1. Dashboard Stripe → **"Developers"** → **"Webhooks"**
2. **"Add endpoint"**
3. **Endpoint URL :** `https://www.ekinox.app/api/webhooks/stripe`
4. **Events to send (Critique !)** :
   ```
   ✅ customer.subscription.created
   ✅ customer.subscription.updated
   ✅ customer.subscription.deleted
   ✅ invoice.payment_succeeded
   ✅ invoice.payment_failed
   ✅ invoice.finalized          ← IMPORTANT pour les overages !
   ✅ customer.created
   ✅ customer.updated
   ```
5. **Créer le webhook**
6. **📋 Copier le Webhook Secret** (`whsec_...`)

---

## 📝 VARIABLES D'ENVIRONNEMENT (À Configurer)

### **Dans ton `.env` (Production)** :

```bash
# ═══════════════════════════════════════════════════
# STRIPE CONFIGURATION
# ═══════════════════════════════════════════════════

# Clés Stripe (Mode Live)
STRIPE_SECRET_KEY=sk_live_votre_clé_stripe
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret

# Price IDs (Récupérer depuis Stripe Dashboard → Products)
# ⚠️ IMPORTANT : Utiliser les Price IDs MENSUELS par défaut
STRIPE_FREE_PRICE_ID=price_xxx_free          # Prix gratuit (0$)
STRIPE_PRO_PRICE_ID=price_xxx_pro_monthly    # $30/mois
STRIPE_TEAM_PRICE_ID=price_xxx_team_monthly  # $100/mois
STRIPE_ENTERPRISE_PRICE_ID=price_xxx_ent_monthly  # $500/mois

# ═══════════════════════════════════════════════════
# LIMITES DE COÛTS IA (Crédits Inclus)
# ═══════════════════════════════════════════════════
# ⚠️ Ces montants représentent les CRÉDITS IA INCLUS dans chaque plan
# Au-delà, l'utilisateur paie l'overage

FREE_TIER_COST_LIMIT=5          # $5 inclus (gratuit)
PRO_TIER_COST_LIMIT=20          # $20 inclus ($30 abonnement)
TEAM_TIER_COST_LIMIT=60         # $60 inclus ($100 abonnement)
ENTERPRISE_TIER_COST_LIMIT=300  # $300 inclus ($500 abonnement)

# Activer le système de billing
BILLING_ENABLED=true
NEXT_PUBLIC_BILLING_ENABLED=true
```

---

## 💡 RECOMMANDATIONS POUR LES LIMITES

### **Pourquoi ces chiffres ?**

| Plan | Prix | Crédits AI | % du Prix | Marge Min |
|------|------|------------|-----------|-----------|
| Free | $0 | **$5** | - | Test gratuit |
| Pro | $30 | **$20** | 67% | **$10** (33%) |
| Team | $100 | **$60** | 60% | **$40** (40%) |
| Enterprise | $500 | **$300** | 60% | **$200** (40%) |

### **Logique** :

1. **Free ($5)** : Permet 100-300 requêtes Copilot pour tester
2. **Pro ($20)** : ~300-400 requêtes Copilot/mois + workflows
3. **Team ($60)** : ~1000 requêtes Copilot + heavy workflows
4. **Enterprise ($300)** : ~5000 requêtes Copilot + très heavy usage

### **Marge garantie** :

- **Pro** : $10 minimum (même si utilisateur consomme tout)
- **Team** : $40 minimum
- **Enterprise** : $200 minimum

**Avec overages, la marge augmente !** 📈

---

## 📋 CHECKLIST CONFIGURATION STRIPE

### **✅ Étape 1 : Produits Stripe**

Dans Stripe Dashboard → Products :

- [ ] Produit "Ekinox Pro" créé
- [ ] Prix mensuel $30 configuré → Copier `STRIPE_PRO_PRICE_ID`
- [ ] Prix annuel $300 configuré (optionnel)
- [ ] Produit "Ekinox Team" créé
- [ ] Prix mensuel $100 configuré → Copier `STRIPE_TEAM_PRICE_ID`
- [ ] Prix annuel $1000 configuré (optionnel)
- [ ] Produit "Ekinox Entreprise" créé
- [ ] Prix mensuel $500 configuré → Copier `STRIPE_ENTERPRISE_PRICE_ID`
- [ ] Prix annuel $5000 configuré (optionnel)

### **✅ Étape 2 : Webhook**

- [ ] Webhook créé sur `https://www.ekinox.app/api/webhooks/stripe`
- [ ] Events sélectionnés :
  - [ ] customer.subscription.*
  - [ ] invoice.payment_*
  - [ ] invoice.finalized (CRITIQUE pour overages !)
  - [ ] customer.created
  - [ ] customer.updated
- [ ] Webhook Secret copié → `STRIPE_WEBHOOK_SECRET`

### **✅ Étape 3 : Variables d'Env**

Ajouter dans Vercel → Settings → Environment Variables :

```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_TEAM_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...

FREE_TIER_COST_LIMIT=5
PRO_TIER_COST_LIMIT=20
TEAM_TIER_COST_LIMIT=60
ENTERPRISE_TIER_COST_LIMIT=300

BILLING_ENABLED=true
NEXT_PUBLIC_BILLING_ENABLED=true
```

### **✅ Étape 4 : Variables Manquantes Critiques**

D'après l'analyse du code, il te faut aussi :

```bash
# Rate Limiting (Optionnel - fallback aux defaults)
RATE_LIMIT_FREE_SYNC=10
RATE_LIMIT_FREE_ASYNC=50
RATE_LIMIT_PRO_SYNC=25
RATE_LIMIT_PRO_ASYNC=200
RATE_LIMIT_TEAM_SYNC=75
RATE_LIMIT_TEAM_ASYNC=500
RATE_LIMIT_ENTERPRISE_SYNC=150
RATE_LIMIT_ENTERPRISE_ASYNC=1000

# Retention des logs (Optionnel)
FREE_PLAN_LOG_RETENTION_DAYS=7

# Cost Multiplier (Optionnel - default 1.0)
COST_MULTIPLIER=1.0
```

---

## 🎯 CONFIGURATION `.env` COMPLÈTE RECOMMANDÉE

Voici TOUTES les variables pour un SaaS fonctionnel :

```bash
# ═══════════════════════════════════════════════════
# CORE APPLICATION
# ═══════════════════════════════════════════════════
DATABASE_URL=postgresql://user:pass@host:5432/ekinox
BETTER_AUTH_URL=https://www.ekinox.app
BETTER_AUTH_SECRET=xxxxx_min_32_chars_xxxxx
ENCRYPTION_KEY=xxxxx_min_32_chars_xxxxx
INTERNAL_API_SECRET=xxxxx_min_32_chars_xxxxx
NEXT_PUBLIC_APP_URL=https://www.ekinox.app

# ═══════════════════════════════════════════════════
# STRIPE BILLING (CRITIQUE !)
# ═══════════════════════════════════════════════════
STRIPE_SECRET_KEY=sk_live_votre_clé
STRIPE_WEBHOOK_SECRET=whsec_votre_webhook_secret

# Price IDs (depuis vos screenshots Stripe)
STRIPE_FREE_PRICE_ID=price_xxx              # Gratuit $0
STRIPE_PRO_PRICE_ID=price_xxx               # $30/mois (prix par défaut)
STRIPE_TEAM_PRICE_ID=price_xxx              # $100/mois (prix par défaut)
STRIPE_ENTERPRISE_PRICE_ID=price_xxx        # $500/mois (prix par défaut)

# Crédits IA inclus (IMPORTANT pour le modèle économique)
FREE_TIER_COST_LIMIT=5          # $5 inclus dans gratuit
PRO_TIER_COST_LIMIT=20          # $20 inclus dans Pro ($30)
TEAM_TIER_COST_LIMIT=60         # $60 inclus dans Team ($100)
ENTERPRISE_TIER_COST_LIMIT=300  # $300 inclus dans Enterprise ($500)

# Activer le billing
BILLING_ENABLED=true
NEXT_PUBLIC_BILLING_ENABLED=true

# ═══════════════════════════════════════════════════
# COPILOT (CRITIQUE !)
# ═══════════════════════════════════════════════════
COPILOT_API_KEY=votre_clé_copilot_sim_ai
SIM_AGENT_API_URL=https://copilot.sim.ai

# ═══════════════════════════════════════════════════
# AI PROVIDERS (Minimum 1 requis)
# ═══════════════════════════════════════════════════
OPENAI_API_KEY=sk-proj-votre_clé
ANTHROPIC_API_KEY_1=sk-ant-votre_clé

# ═══════════════════════════════════════════════════
# EMAIL (RECOMMANDÉ)
# ═══════════════════════════════════════════════════
RESEND_API_KEY=re_votre_clé
FROM_EMAIL_ADDRESS=noreply@ekinox.app
EMAIL_DOMAIN=ekinox.app
EMAIL_VERIFICATION_ENABLED=true

# ═══════════════════════════════════════════════════
# STORAGE S3 (RECOMMANDÉ)
# ═══════════════════════════════════════════════════
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=ekinox-files
S3_LOGS_BUCKET_NAME=ekinox-logs
S3_KB_BUCKET_NAME=ekinox-knowledge
S3_EXECUTION_FILES_BUCKET_NAME=ekinox-executions
S3_COPILOT_BUCKET_NAME=ekinox-copilot
S3_PROFILE_PICTURES_BUCKET_NAME=ekinox-profiles

# ═══════════════════════════════════════════════════
# REDIS (OPTIONNEL mais recommandé)
# ═══════════════════════════════════════════════════
REDIS_URL=redis://default:xxx@eu1-xxx.upstash.io:6379

# ═══════════════════════════════════════════════════
# WEBSOCKET (OPTIONNEL)
# ═══════════════════════════════════════════════════
# Si déployé séparément :
SOCKET_SERVER_URL=https://socket.ekinox.app
NEXT_PUBLIC_SOCKET_URL=https://socket.ekinox.app

# ═══════════════════════════════════════════════════
# TRIGGER.DEV (OPTIONNEL - désactivé au début)
# ═══════════════════════════════════════════════════
TRIGGER_DEV_ENABLED=false
NEXT_PUBLIC_TRIGGER_DEV_ENABLED=false

# ═══════════════════════════════════════════════════
# RATE LIMITING (Optionnel - defaults intelligents)
# ═══════════════════════════════════════════════════
RATE_LIMIT_FREE_SYNC=10
RATE_LIMIT_FREE_ASYNC=50
RATE_LIMIT_PRO_SYNC=25
RATE_LIMIT_PRO_ASYNC=200
RATE_LIMIT_TEAM_SYNC=75
RATE_LIMIT_TEAM_ASYNC=500
RATE_LIMIT_ENTERPRISE_SYNC=150
RATE_LIMIT_ENTERPRISE_ASYNC=1000
```

---

## 📊 ANALYSE DE RENTABILITÉ

### **Plan Pro ($30/mois)** :

**Crédits inclus** : $20

**Scénario utilisateur normal** :
- Copilot : 200 requêtes × $0.06 = $12
- Workflows : 500 exécutions × $0.01 = $5
- **Total usage** : $17

**Vos revenus** :
- Abonnement : $30
- Overage : $0 (sous la limite de $20)
- **Total** : **$30**

**Vos coûts** :
- Copilot (sim.ai) : $12
- OpenAI (workflows) : $5
- Infrastructure : $3
- **Total** : **$20**

**Marge** : **$10** (33% de marge)

---

### **Plan Team ($100/mois)** :

**Crédits inclus** : $60

**Scénario équipe (3 utilisateurs)** :
- Copilot : 600 requêtes × $0.06 = $36
- Workflows : 2000 exécutions × $0.01 = $20
- **Total usage** : $56

**Vos revenus** :
- Abonnement : $100
- Overage : $0 (sous $60)
- **Total** : **$100**

**Vos coûts** :
- Copilot : $36
- OpenAI : $20
- Infrastructure : $5
- **Total** : **$61**

**Marge** : **$39** (39% de marge)

---

## 🚨 VARIABLES MANQUANTES CRITIQUES

J'ai vérifié le code et **il manque ces variables importantes** :

### **1. API Key Encryption (Sécurité)** :
```bash
API_ENCRYPTION_KEY=xxxxx_min_32_chars_xxxxx
```
Sans ça, les API keys OAuth ne sont pas chiffrées correctement.

### **2. Webhook pour les Overages** :
```bash
# Dans Stripe, ajouter l'event :
invoice.finalized
```
Sans cet event, les overages ne sont PAS facturés automatiquement !

### **3. Free Tier Price ID** :
```bash
STRIPE_FREE_PRICE_ID=price_xxx
```
Créer un produit "Free" à $0/mois dans Stripe.

---

## 📝 GUIDE CRÉATION PRODUIT GRATUIT

Dans Stripe Dashboard :

1. **Products** → **Add Product**
2. **Name** : `Ekinox Free`
3. **Pricing** :
   - Recurring : Monthly
   - Price : **$0.00** USD
4. **Save** → Copier le Price ID

---

## ✅ CHECKLIST FINALE

### **Dans Stripe Dashboard** :

- [ ] Produit "Ekinox Free" créé ($0/mois)
- [ ] Produit "Ekinox Pro" créé ($30/mois par défaut)
- [ ] Produit "Ekinox Team" créé ($100/mois par défaut)
- [ ] Produit "Ekinox Entreprise" créé ($500/mois par défaut)
- [ ] Webhook configuré avec **invoice.finalized** inclus
- [ ] Mode LIVE activé (après tests)

### **Dans Vercel Environment Variables** :

- [ ] `STRIPE_SECRET_KEY` (sk_live_...)
- [ ] `STRIPE_WEBHOOK_SECRET` (whsec_...)
- [ ] `STRIPE_FREE_PRICE_ID`
- [ ] `STRIPE_PRO_PRICE_ID`
- [ ] `STRIPE_TEAM_PRICE_ID`
- [ ] `STRIPE_ENTERPRISE_PRICE_ID`
- [ ] `FREE_TIER_COST_LIMIT=5`
- [ ] `PRO_TIER_COST_LIMIT=20`
- [ ] `TEAM_TIER_COST_LIMIT=60`
- [ ] `ENTERPRISE_TIER_COST_LIMIT=300`
- [ ] `BILLING_ENABLED=true`
- [ ] `NEXT_PUBLIC_BILLING_ENABLED=true`
- [ ] `API_ENCRYPTION_KEY` (min 32 chars)

### **Autres Variables Critiques** :

- [ ] `DATABASE_URL`
- [ ] `BETTER_AUTH_SECRET`
- [ ] `ENCRYPTION_KEY`
- [ ] `INTERNAL_API_SECRET`
- [ ] `COPILOT_API_KEY`
- [ ] `OPENAI_API_KEY`
- [ ] `RESEND_API_KEY`
- [ ] `AWS_*` (S3 storage)
- [ ] `REDIS_URL` (Upstash - optionnel)

---

## 🧪 TEST DE CONFIGURATION

### **Tester les Paiements** :

```bash
# 1. Carte de test Stripe
4242 4242 4242 4242
Expiration : 12/34
CVC : 123

# 2. Créer un compte sur www.ekinox.app
# 3. Aller dans Settings → Billing
# 4. Upgrade vers Pro ($30/mois)
# 5. Vérifier dans Stripe Dashboard que le paiement est passé
# 6. Vérifier dans Ekinox que la limite est passée de $5 à $20
```

### **Tester les Overages** :

```bash
# 1. Utiliser beaucoup de Copilot pour dépasser $20
# 2. Attendre fin du mois (ou simuler avec invoice.finalized)
# 3. Vérifier que Stripe facture l'overage
# 4. Vérifier que currentPeriodCost se reset à 0
```

---

## 💰 SIMULATION REVENUS

### **Avec 100 utilisateurs** :

| Plan | Utilisateurs | Revenu/mois | Coûts AI | Infra | Marge |
|------|--------------|-------------|----------|-------|-------|
| Free | 50 | $0 | $50 | $20 | **-$70** ⚠️ |
| Pro | 40 | $1,200 | $480 | $40 | **$680** ✅ |
| Team | 8 | $800 | $320 | $30 | **$450** ✅ |
| Enterprise | 2 | $1,000 | $400 | $20 | **$580** ✅ |
| **TOTAL** | **100** | **$3,000** | **$1,250** | **$110** | **$1,640** ✅ |

**Marge totale** : **$1,640/mois** (55% de marge) 🚀

---

## 🚨 VARIABLES MANQUANTES DANS LE GUIDE

J'ai trouvé ces variables importantes qui manquent :

### **1. Encryption supplémentaire** :
```bash
API_ENCRYPTION_KEY=xxxxx_min_32_chars_xxxxx
```

### **2. Cost Multiplier** :
```bash
COST_MULTIPLIER=1.0
```
Permet d'ajuster les coûts globalement (1.0 = prix réels, 1.2 = +20% de marge)

### **3. Retention logs** :
```bash
FREE_PLAN_LOG_RETENTION_DAYS=7
```

**Ces 3 variables sont optionnelles mais recommandées !**

---

## ✅ RÉSUMÉ POUR TOI

**1. Limites à mettre dans `.env`** :
```bash
FREE_TIER_COST_LIMIT=5
PRO_TIER_COST_LIMIT=20
TEAM_TIER_COST_LIMIT=60
ENTERPRISE_TIER_COST_LIMIT=300
```

**2. Price IDs Stripe** :
- Récupérer les Price IDs **mensuels** dans Stripe → Products → Ton produit → Copy price ID
- Les mettre dans `STRIPE_PRO_PRICE_ID`, `STRIPE_TEAM_PRICE_ID`, etc.

**3. Webhook Event Critique** :
- ✅ Ajouter `invoice.finalized` dans ton webhook Stripe (sinon overages pas facturés !)

**Veux-tu que je mette à jour le `STRIPE_CONFIGURATION_GUIDE.md` avec tes vrais tarifs et que je génère un `.env.example` complet ?**