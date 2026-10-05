# MachineCare - API REST de Gestion Industrielle

**MachineCare** est une API REST sécurisée conçue pour centraliser la gestion d'un parc de machines et le suivi des pannes au sein d'un atelier industriel (Safi, Maroc). Elle permet de suivre un incident de son signalement jusqu'à sa résolution tout en garantissant la fiabilité des données et la sécurité des accès.

---

##  Fonctionnalités Principales

* **Authentification & Sécurité :** Inscription, connexion sécurisée par hachage des mots de passe (`bcryptjs`) et délivrance d'un **JWT (JSON Web Token)**. Toutes les routes métier sont protégées.
* **Gestion des Machines :** 
  * Création avec référence unique, nom, atelier et état (`disponible`, `en maintenance`, `hors service`).
  * Consultation, modification, suppression et filtrage par atelier ou état.
  * Consultation de l'historique des signalements d'une machine spécifique.
* **Signalement et Suivi des Pannes :**
  * Déclaration de pannes rattachées à une machine existante.
  * Filtrage des signalements par machine ou par statut (`ouvert`, `en cours`, `résolu`).
  * **Règle métier critique :** Interdiction de marquer un signalement comme `résolu` sans fournir une **note de résolution** (la date de résolution est enregistrée automatiquement).

---

##  Stack Technique

* **Environnement :** Node.js (Modules ES - ESM) & Express.js
* **Base de données :** MongoDB & Mongoose
* **Sécurité :** JSON Web Token (JWT), Bcryptjs
* **Conteneurisation :** Docker & Docker Compose

---

##  Structure du Projet

```text
MachineCare/
├── src/
├── config/
│   └── db.js            # Configuration de la connexion MongoDB
├── Controllers/
│   ├── auth.controller.js
│   ├── machine.controller.js
│   └── signalement.controller.js
├── Models/
│   ├── user.model.js
│   ├── machine.model.js
│   └── signalement.model.js
├── middlewares/
│   └── auth.middleware.js   # Vérification du token JWT
├── routes/
│   ├── auth.routes.js
│   ├── machine.routes.js
│   └── signalement.routes.js
└── server.js            # Point d'entrée de l'application
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── package.json
