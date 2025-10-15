# Configuration OAuth - Guide Complet de tous les Services

Ce guide liste **TOUS** les services qui nécessitent des credentials OAuth pour que tes utilisateurs puissent connecter leurs comptes.

## ⚠️ ATTENTION - URIs Multiples

**Google** et **Microsoft** nécessitent **plusieurs URIs de redirection** (7 pour Google, 6 pour Microsoft) car l'application sépare chaque service (Gmail, Calendar, Outlook, Teams, etc.) pour une meilleure granularité des permissions.

**❌ Erreur fréquente :** `redirect_uri_mismatch` = Tu as oublié d'ajouter **TOUS** les URIs requis.

**✅ Solution :** Lis attentivement les sections Google et Microsoft ci-dessous et ajoute **TOUS** les URIs listés.

---

## 📋 Liste Rapide des Services

| Service | Variables Requises | Redirect URI |
|---------|-------------------|--------------|
| 🔵 **Google** (Gmail, Drive, Calendar) | `GOOGLE_CLIENT_ID`<br>`GOOGLE_CLIENT_SECRET` | **7 URIs requis** ⚠️<br>Voir section complète |
| 🐙 **GitHub** | `GITHUB_CLIENT_ID`<br>`GITHUB_CLIENT_SECRET` | `/api/auth/oauth2/callback/github` |
| 📁 **GitHub Repo** | `GITHUB_REPO_CLIENT_ID`<br>`GITHUB_REPO_CLIENT_SECRET` | `/api/auth/oauth2/callback/github-repo` |
| 🐦 **X (Twitter)** | `X_CLIENT_ID`<br>`X_CLIENT_SECRET` | `/api/auth/oauth2/callback/x` |
| 📖 **Confluence** | `CONFLUENCE_CLIENT_ID`<br>`CONFLUENCE_CLIENT_SECRET` | `/api/auth/oauth2/callback/confluence` |
| 🎫 **Jira** | `JIRA_CLIENT_ID`<br>`JIRA_CLIENT_SECRET` | `/api/auth/oauth2/callback/jira` |
| 🗂️ **Airtable** | `AIRTABLE_CLIENT_ID`<br>`AIRTABLE_CLIENT_SECRET` | `/api/auth/oauth2/callback/airtable` |
| ⚡ **Supabase** | `SUPABASE_CLIENT_ID`<br>`SUPABASE_CLIENT_SECRET` | `/api/auth/oauth2/callback/supabase` |
| 📝 **Notion** | `NOTION_CLIENT_ID`<br>`NOTION_CLIENT_SECRET` | `/api/auth/oauth2/callback/notion` |
| 💬 **Discord** | `DISCORD_CLIENT_ID`<br>`DISCORD_CLIENT_SECRET` | `/api/auth/oauth2/callback/discord` |
| 🔷 **Microsoft** (Outlook, Teams, OneDrive) | `MICROSOFT_CLIENT_ID`<br>`MICROSOFT_CLIENT_SECRET` | **6 URIs requis** ⚠️<br>Voir section complète |
| 💼 **WealthBox** | `WEALTHBOX_CLIENT_ID`<br>`WEALTHBOX_CLIENT_SECRET` | `/api/auth/oauth2/callback/wealthbox` |
| ⚫ **Linear** | `LINEAR_CLIENT_ID`<br>`LINEAR_CLIENT_SECRET` | `/api/auth/oauth2/callback/linear` |
| 💜 **Slack** | `SLACK_CLIENT_ID`<br>`SLACK_CLIENT_SECRET` | `/api/auth/oauth2/callback/slack` |
| 🔴 **Reddit** | `REDDIT_CLIENT_ID`<br>`REDDIT_CLIENT_SECRET` | `/api/auth/oauth2/callback/reddit` |

---

## 🔵 1. Google Services (Gmail, Drive, Calendar)

**Variables requises :**
```bash
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx

# Pour Drive Picker (optionnel)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_API_KEY=AIzaSyXXX
NEXT_PUBLIC_GOOGLE_PROJECT_NUMBER=123456789
```

### Configuration :
1. **Console :** https://console.cloud.google.com/
2. **Créer projet** ou sélectionner un existant
3. **Activer APIs :**
   - Gmail API
   - Google Drive API
   - Google Calendar API
4. **Credentials → Create OAuth 2.0 Client ID**
   - Type : Web application
   - **⚠️ IMPORTANT : Ajouter TOUS ces URIs (7 en production + 7 en local = 14 URIs) :**
     ```
     https://www.ekinox.app/api/auth/oauth2/callback/google-email
     https://www.ekinox.app/api/auth/oauth2/callback/google-calendar
     https://www.ekinox.app/api/auth/oauth2/callback/google-drive
     https://www.ekinox.app/api/auth/oauth2/callback/google-docs
     https://www.ekinox.app/api/auth/oauth2/callback/google-sheets
     https://www.ekinox.app/api/auth/oauth2/callback/google-forms
     https://www.ekinox.app/api/auth/oauth2/callback/google-vault

     http://localhost:3000/api/auth/oauth2/callback/google-email
     http://localhost:3000/api/auth/oauth2/callback/google-calendar
     http://localhost:3000/api/auth/oauth2/callback/google-drive
     http://localhost:3000/api/auth/oauth2/callback/google-docs
     http://localhost:3000/api/auth/oauth2/callback/google-sheets
     http://localhost:3000/api/auth/oauth2/callback/google-forms
     http://localhost:3000/api/auth/oauth2/callback/google-vault
     ```
5. **OAuth consent screen → Scopes (ajouter ces scopes de base) :**
   ```
   https://www.googleapis.com/auth/userinfo.email
   https://www.googleapis.com/auth/userinfo.profile
   https://www.googleapis.com/auth/gmail.send
   https://www.googleapis.com/auth/gmail.labels
   https://www.googleapis.com/auth/calendar
   https://www.googleapis.com/auth/drive.file
   ```

**💡 Pourquoi 7 URIs différents ?** Chaque service Google (Gmail, Calendar, Drive, Docs, Sheets, Forms, Vault) utilise son propre callback pour plus de sécurité et de granularité dans les permissions.

**Services supportés avec ces scopes :**
- **Gmail** : Envoi, gestion des labels
- **Calendar** : Lecture/écriture des événements
- **Drive/Docs/Sheets** : Accès aux fichiers créés par l'app

**⚠️ Scopes avancés (optionnels, nécessitent activation API et approbation Google) :**
- `https://www.googleapis.com/auth/forms.responses.readonly` - Pour Google Forms (requiert Google Forms API)
- `https://www.googleapis.com/auth/ediscovery` - Pour Google Vault (Google Workspace uniquement)
- `https://www.googleapis.com/auth/devstorage.read_only` - Pour Cloud Storage (rarement nécessaire)

**💡 Conseil :** Commence avec les scopes de base. Les scopes avancés sont complexes à obtenir et rarement nécessaires pour la plupart des workflows.

---

## 🐙 2. GitHub

**Variables requises :**
```bash
GITHUB_CLIENT_ID=Iv1.xxx
GITHUB_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://github.com/settings/developers
2. **New OAuth App**
3. **Settings :**
   - Application name : Ekinox
   - Homepage URL : https://www.ekinox.app
   - Authorization callback URL :
     ```
     https://www.ekinox.app/api/auth/oauth2/callback/github
     http://localhost:3000/api/auth/oauth2/callback/github
     ```

---

## 📁 3. GitHub Repo Access (séparé)

**Variables requises :**
```bash
GITHUB_REPO_CLIENT_ID=Iv1.xxx
GITHUB_REPO_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://github.com/settings/developers
2. **New OAuth App** (deuxième app, séparée de la première)
3. **Settings :**
   - Application name : Ekinox Repo Access
   - Homepage URL : https://www.ekinox.app
   - Authorization callback URL :
     ```
     https://www.ekinox.app/api/auth/oauth2/callback/github-repo
     http://localhost:3000/api/auth/oauth2/callback/github-repo
     ```
4. **Permissions (scopes automatiques) :**
   - `user:email` - Lire l'email de l'utilisateur
   - `repo` - Accès complet aux repos (lecture/écriture)
   - `read:user` - Lire le profil utilisateur
   - `workflow` - Gérer les GitHub Actions workflows

---

## 🐦 4. X (Twitter)

**Variables requises :**
```bash
X_CLIENT_ID=xxx
X_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://developer.twitter.com/en/portal/dashboard
2. **Create Project → Create App**
3. **User authentication settings :**
   - OAuth 2.0 : Enabled
   - Type : Web App
   - Callback URL :
     ```
     https://www.ekinox.app/api/auth/oauth2/callback/x
     http://localhost:3000/api/auth/oauth2/callback/x
     ```
   - Permissions : Read and write
4. **Scopes requis (automatiques avec OAuth 2.0) :**
   - `tweet.read` - Lire les tweets
   - `tweet.write` - Publier des tweets
   - `users.read` - Lire les profils utilisateurs
   - `offline.access` - Refresh token

---

## 📖 5. Confluence

**Variables requises :**
```bash
CONFLUENCE_CLIENT_ID=xxx
CONFLUENCE_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://developer.atlassian.com/console/myapps/
2. **Create → OAuth 2.0 integration**
3. **Callback URL :**
   ```
   https://www.ekinox.app/api/auth/oauth2/callback/confluence
   http://localhost:3000/api/auth/oauth2/callback/confluence
   ```
4. **Permissions (dans l'interface Atlassian) :**

   Dans la console Atlassian, tu verras des **permissions simplifiées** :
   - ✅ **Confluence API** → Cocher **"READ"** et **"WRITE"**
   - ✅ **User identity API** → Cocher **"Read"**

   Ces permissions cochées vont **automatiquement** inclure les scopes granulaires suivants :
   - `read:page:confluence`
   - `write:page:confluence`
   - `read:me`
   - `offline_access`

**💡 Astuce :** Atlassian utilise un système à 2 niveaux : des **permissions visuelles** dans l'interface (READ/WRITE) qui se traduisent en **scopes OAuth granulaires** en arrière-plan. Tu n'as pas besoin de taper les scopes manuellement !

---

## 🎫 6. Jira

**Variables requises :**
```bash
JIRA_CLIENT_ID=xxx
JIRA_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://developer.atlassian.com/console/myapps/
2. **Create → OAuth 2.0 integration**
3. **Callback URL :**
   ```
   https://www.ekinox.app/api/auth/oauth2/callback/jira
   http://localhost:3000/api/auth/oauth2/callback/jira
   ```
4. **Permissions (dans l'interface Atlassian) :**

   Dans la console Atlassian, tu verras des **permissions simplifiées** :
   - ✅ **Jira API** → Cocher **"READ"** et **"WRITE"**
   - ✅ **User identity API** → Cocher **"Read"**

   Ces permissions cochées vont **automatiquement** inclure les 14+ scopes granulaires suivants :
   - `read:jira-user`, `read:jira-work`, `write:jira-work`
   - `write:issue:jira`, `read:project:jira`, `read:issue-type:jira`
   - `read:me`, `offline_access`, `read:issue-meta:jira`
   - `read:issue-security-level:jira`, `read:issue.vote:jira`
   - `read:issue.changelog:jira`, `read:avatar:jira`, `read:issue:jira`
   - Et d'autres scopes liés aux permissions READ/WRITE

**💡 Astuce :** Ne cherche pas les scopes granulaires dans l'interface ! Atlassian les génère automatiquement quand tu coches READ/WRITE. L'interface affiche seulement les permissions haut niveau.

---

## 🗂️ 7. Airtable

**Variables requises :**
```bash
AIRTABLE_CLIENT_ID=xxx
AIRTABLE_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://airtable.com/create/oauth
2. **Create OAuth integration**
3. **Redirect URI :**
   ```
   https://www.ekinox.app/api/auth/oauth2/callback/airtable
   http://localhost:3000/api/auth/oauth2/callback/airtable
   ```
4. **Scopes requis (cocher TOUS ces scopes) :**
   - ✅ `data.records:read` - Lire les enregistrements
   - ✅ `data.records:write` - Créer/modifier les enregistrements
   - ✅ `user.email:read` - Lire l'email de l'utilisateur
   - ✅ `webhook:manage` - Gérer les webhooks pour déclencher des workflows
   - ✅ `schema.bases:read` - Lire la structure des bases et tables

**⚠️ Important :** Si tu oublies un scope, tu auras l'erreur `invalid_scope`. Vérifie bien que **tous** sont cochés dans la console Airtable.

---

## ⚡ 8. Supabase

**Variables requises :**
```bash
SUPABASE_CLIENT_ID=xxx
SUPABASE_CLIENT_SECRET=xxx
```

### Configuration :
1. **Dashboard :** https://supabase.com/dashboard
2. **Organization Settings → OAuth Apps → Create OAuth App**
3. **Settings :**
   - Name : Ekinox
   - Description : Workflow automation platform
   - Website URL : https://www.ekinox.app
   - Callback URL :
     ```
     https://www.ekinox.app/api/auth/oauth2/callback/supabase
     http://localhost:3000/api/auth/oauth2/callback/supabase
     ```
4. **Scopes requis :**
   ```
   database.read
   database.write
   projects.read
   ```

**Note :** Supabase OAuth donne accès à la Management API pour gérer les projets et bases de données. Les utilisateurs pourront :
- Lire et écrire dans leurs tables Supabase
- Lister leurs projets
- Exécuter des requêtes SQL via les workflows

---

## 📝 9. Notion

**Variables requises :**
```bash
NOTION_CLIENT_ID=xxx
NOTION_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://www.notion.so/my-integrations
2. **New integration**
3. **OAuth settings :**
   - Type : Public
   - Redirect URI :
     ```
     https://www.ekinox.app/api/auth/oauth2/callback/notion
     http://localhost:3000/api/auth/oauth2/callback/notion
     ```
4. **Capabilities & Scopes requis :**
   - `workspace.content` - Accès au contenu du workspace
   - `workspace.name` - Lire le nom du workspace
   - `page.read` - Lire les pages
   - `page.write` - Créer/modifier les pages

**💡 Note :** Les scopes Notion sont regroupés sous "Capabilities" dans l'interface. Assure-toi d'activer "Read content", "Update content" et "Insert content".

---

## 💬 10. Discord

**Variables requises :**
```bash
DISCORD_CLIENT_ID=xxx
DISCORD_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://discord.com/developers/applications
2. **New Application**
3. **OAuth2 → Redirects :**
   ```
   https://www.ekinox.app/api/auth/oauth2/callback/discord
   http://localhost:3000/api/auth/oauth2/callback/discord
   ```
4. **Scopes requis :**
   - `identify` - Identifier l'utilisateur
   - `guilds` - Lire les serveurs de l'utilisateur
   - `guilds.members.read` - Lire les membres des serveurs
   - `bot` - Ajouter un bot au serveur
   - `messages.read` - Lire les messages

**⚠️ Note :** Le scope `messages.read` nécessite l'approbation de Discord si utilisé publiquement.

---

## 🔷 11. Microsoft (Outlook, Teams, OneDrive, SharePoint)

**Variables requises :**
```bash
MICROSOFT_CLIENT_ID=xxx
MICROSOFT_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade
2. **New registration**
3. **Redirect URI :**
   - Type : Web
   - **⚠️ IMPORTANT : Ajouter TOUS ces URIs (6 en production + 6 en local = 12 URIs) :**
     ```
     https://www.ekinox.app/api/auth/oauth2/callback/outlook
     https://www.ekinox.app/api/auth/oauth2/callback/microsoft-teams
     https://www.ekinox.app/api/auth/oauth2/callback/microsoft-excel
     https://www.ekinox.app/api/auth/oauth2/callback/microsoft-planner
     https://www.ekinox.app/api/auth/oauth2/callback/onedrive
     https://www.ekinox.app/api/auth/oauth2/callback/sharepoint

     http://localhost:3000/api/auth/oauth2/callback/outlook
     http://localhost:3000/api/auth/oauth2/callback/microsoft-teams
     http://localhost:3000/api/auth/oauth2/callback/microsoft-excel
     http://localhost:3000/api/auth/oauth2/callback/microsoft-planner
     http://localhost:3000/api/auth/oauth2/callback/onedrive
     http://localhost:3000/api/auth/oauth2/callback/sharepoint
     ```
4. **API permissions (Microsoft Graph - ajouter TOUS ces scopes) :**

   **Scopes de base :**
   - `openid` - Connexion utilisateur
   - `profile` - Profil utilisateur
   - `email` - Email utilisateur
   - `User.Read` - Lire le profil
   - `offline_access` - Refresh token

   **Outlook (Mail) :**
   - `Mail.Read` - Lire les emails
   - `Mail.ReadWrite` - Modifier les emails
   - `Mail.ReadBasic` - Lecture basique
   - `Mail.Send` - Envoyer des emails

   **Teams (Chat & Channels) :**
   - `Chat.Read` - Lire les chats
   - `Chat.ReadWrite` - Écrire dans les chats
   - `Chat.ReadBasic` - Lecture basique des chats
   - `Channel.ReadBasic.All` - Lire les infos des channels
   - `ChannelMessage.Send` - Envoyer des messages
   - `ChannelMessage.Read.All` - Lire les messages

   **OneDrive & SharePoint (Files) :**
   - `Files.Read` - Lire les fichiers
   - `Files.ReadWrite` - Modifier les fichiers
   - `Sites.Read.All` - Lire les sites SharePoint

   **Planner (Tasks) :**
   - `Group.ReadWrite.All` - Gérer les groupes
   - `Group.Read.All` - Lire les groupes
   - `Tasks.ReadWrite` - Gérer les tâches

5. **Certificates & secrets → New client secret**

**💡 Pourquoi 6 URIs différents ?** Chaque service Microsoft (Outlook, Teams, Excel, Planner, OneDrive, SharePoint) utilise son propre callback pour une meilleure gestion des permissions par service.

**Services supportés :**
- **Outlook** : Lecture/envoi d'emails
- **Teams** : Messages dans channels et chats
- **Excel/OneDrive** : Gestion de fichiers
- **Planner** : Gestion de tâches et projets
- **SharePoint** : Accès aux sites et documents

---

## 💼 12. WealthBox

**Variables requises :**
```bash
WEALTHBOX_CLIENT_ID=xxx
WEALTHBOX_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://app.crmworkspace.com/settings/api
2. **Create OAuth application**
3. **Redirect URI :**
   ```
   https://www.ekinox.app/api/auth/oauth2/callback/wealthbox
   http://localhost:3000/api/auth/oauth2/callback/wealthbox
   ```
4. **Scopes requis :**
   - `login` - Authentification utilisateur
   - `data` - Accès aux données CRM

---

## ⚫ 13. Linear

**Variables requises :**
```bash
LINEAR_CLIENT_ID=xxx
LINEAR_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://linear.app/settings/api
2. **Create OAuth application**
3. **Callback URLs :**
   ```
   https://www.ekinox.app/api/auth/oauth2/callback/linear
   http://localhost:3000/api/auth/oauth2/callback/linear
   ```
4. **Scopes requis :**
   - `read` - Lire les issues, projets, équipes
   - `write` - Créer/modifier issues et commentaires

---

## 💜 14. Slack

**Variables requises :**
```bash
SLACK_CLIENT_ID=xxx.xxx
SLACK_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://api.slack.com/apps
2. **Create New App → From scratch**
3. **OAuth & Permissions → Redirect URLs :**
   ```
   https://www.ekinox.app/api/auth/oauth2/callback/slack
   http://localhost:3000/api/auth/oauth2/callback/slack
   ```
4. **Bot Token Scopes (ajouter TOUS ces scopes) :**
   - `channels:read` - Lire les infos des channels publics
   - `channels:history` - Lire l'historique des messages publics
   - `groups:read` - Lire les infos des channels privés
   - `groups:history` - Lire l'historique des channels privés
   - `chat:write` - Envoyer des messages
   - `chat:write.public` - Envoyer dans les channels publics
   - `users:read` - Lire les infos utilisateurs
   - `files:write` - Upload de fichiers
   - `canvases:write` - Créer/modifier des canvases Slack

**⚠️ Important :** Ces scopes sont pour le **Bot Token**, pas le User Token. Slack requiert des permissions bot pour les workflows automatisés.

---

## 🔴 15. Reddit

**Variables requises :**
```bash
REDDIT_CLIENT_ID=xxx
REDDIT_CLIENT_SECRET=xxx
```

### Configuration :
1. **Console :** https://www.reddit.com/prefs/apps
2. **Create application**
3. **Type :** Web app
4. **Redirect URI :**
   ```
   https://www.ekinox.app/api/auth/oauth2/callback/reddit
   http://localhost:3000/api/auth/oauth2/callback/reddit
   ```
5. **Scopes (automatiques) :**
   - `identity` - Identifier l'utilisateur
   - `read` - Lire les posts et commentaires

---

## 📝 Template .env Complet

Voici toutes les variables à ajouter dans ton `.env` :

```bash
# ============================================
# OAUTH SERVICES CONFIGURATION
# ============================================

# Google Services (Gmail, Drive, Calendar)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
NEXT_PUBLIC_GOOGLE_API_KEY=
NEXT_PUBLIC_GOOGLE_PROJECT_NUMBER=

# GitHub
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# GitHub Repo (séparé)
GITHUB_REPO_CLIENT_ID=
GITHUB_REPO_CLIENT_SECRET=

# X (Twitter)
X_CLIENT_ID=
X_CLIENT_SECRET=

# Atlassian - Confluence
CONFLUENCE_CLIENT_ID=
CONFLUENCE_CLIENT_SECRET=

# Atlassian - Jira
JIRA_CLIENT_ID=
JIRA_CLIENT_SECRET=

# Airtable
AIRTABLE_CLIENT_ID=
AIRTABLE_CLIENT_SECRET=

# Supabase
SUPABASE_CLIENT_ID=
SUPABASE_CLIENT_SECRET=

# Notion
NOTION_CLIENT_ID=
NOTION_CLIENT_SECRET=

# Discord
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Microsoft (Outlook, Teams, OneDrive, SharePoint)
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=

# WealthBox
WEALTHBOX_CLIENT_ID=
WEALTHBOX_CLIENT_SECRET=

# Linear
LINEAR_CLIENT_ID=
LINEAR_CLIENT_SECRET=

# Slack
SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=

# Reddit
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
```

---

## ⚠️ Important

### En Production
N'oublie pas d'ajouter **TOUTES** les variables d'environnement sur ton hébergeur :
- Vercel : Project Settings → Environment Variables
- Railway : Variables tab
- Docker : Fichier `.env` ou docker-compose

### Redirect URIs
Assure-toi que **TOUS** les redirect URIs correspondent **EXACTEMENT** à ton domaine :
```
https://www.ekinox.app/api/auth/oauth2/callback/[service]
```

Pas d'espace, pas de trailing slash !

### Services Optionnels
Tu n'es **pas obligé** de configurer tous les services. Configure uniquement ceux que tu veux proposer à tes utilisateurs.

Si une variable manque, le service ne sera tout simplement pas disponible (pas d'erreur).

---

## 🧪 Test

Pour tester si un service est bien configuré :
1. Va dans ton workflow
2. Ajoute un bloc du service (ex: Gmail, Slack, etc.)
3. Clique sur "Connect account"
4. ✅ Tu devrais être redirigé vers la page OAuth du service

Si erreur 400/401 → vérifie les credentials et redirect URIs !

