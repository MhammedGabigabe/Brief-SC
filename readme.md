#  WorkSphere — Application Web de Gestion Visuelle du Personnel  

WorkSphere est une application web innovante permettant de gérer visuellement le personnel d’une entreprise sur un plan interactif de l’espace de travail.  
Elle combine design moderne, ergonomie, règles métier intelligentes et visualisation en temps réel.

---

##  Objectif du projet  

L’objectif principal est d’offrir une plateforme intuitive permettant :  
- D’ajouter, positionner, déplacer et supprimer des employés sur un plan d’étage interactif.  
- De respecter automatiquement les règles métiers liées aux rôles et aux zones autorisées.  
- De fournir une interface fluide, moderne et responsive accessible depuis tout appareil.  
- De centraliser toutes les informations du personnel dans une même interface.

---

##  Fonctionnalités principales  

###  Gestion du personnel  
- Ajout d’un employé via une modale complète :  
  - Nom  
  - Rôle  
  - Photo (URL)  
  - Email  
  - Téléphone  
  - Expériences (formulaire dynamique)  
- Prévisualisation de l’image avant validation.  
- Liste dynamique “Unassigned Staff”.  
- Déplacement d’un employé vers une zone du plan.  
- Bouton **X** pour retirer un employé d’une zone.

---

###  Plan interactif du bâtiment  
Le plan contient **6 zones** :  
- Salle de conférence  
- Réception  
- Salle des serveurs  
- Salle de sécurité  
- Salle du personnel  
- Salle d’archives  

Chaque zone contient :  
- Un bouton **+** pour ajouter un employé compatible  
- Un nombre maximal d’employés  
- Un surlignage rouge pâle si la zone obligatoire est vide (sauf conférence / personnel)

---

###  Règles d’accès (Business Logic)  
- **Réception** → Réceptionnistes uniquement  
- **Salle des serveurs** → Techniciens IT uniquement  
- **Salle de sécurité** → Agents de sécurité uniquement  
- **Manager** → accès illimité  
- **Nettoyage** → partout sauf Salle d’archives  
- **Autres rôles** → accès libre, hors zones restreintes

---

###  Profil détaillé  
En cliquant sur un employé, une fiche affiche :  
- Photo grand format  
- Informations personnelles  
- Expériences professionnelles  
- Localisation actuelle

---

###  Responsive + animations  
- Design moderne (Flexbox, Grid, formes arrondies, couleurs vert/orange/rouge).  
- Interface responsive Desktop → Mobile.  
- Animations CSS douces pour une experience fluide.

---

##  Technologies utilisées  
- **HTML5**  
- **CSS3** (Grid, Flexbox, animations)  
- **JavaScript (ES6)**  
- **LocalStorage**  
- **Git / GitHub**  

---

##  Organisation Agile  

### Rôle du Scrum Master  
- Gestion sur Trello / Jira / GitHub Projects  
- Gestion des branches Git  
- Présentation finale  

---

##  User Stories  

###  Concepteur  
- UI intuitive et fluide  
- Palette de couleurs cohérente  
- Version Desktop & Mobile  
- Icônes simples et modernes  

###  Développeur Front-End  
- Structure HTML + Sidebar “Unassigned Staff”  
- Modale d’ajout avec formulaire dynamique  
- Prévisualisation photo  
- Affichage du plan d’étage  
- Restrictions d’accès par rôle  
- Bouton X → retirer un employé  
- Bouton + → ajouter un employé compatible  
- Zones vides obligatoires → rouge pâle  
- Limitation du nombre d’employés  
- Responsive + animations  
- Validation W3C  
- Déploiement GitHub Pages / Vercel  

###  Scrum Master  
- Organisation Agile  
- Gestion des branches  
- Démonstration finale  

---

##  Installation & Lancement  

###  Cloner le projet  
```bash
git clone https://github.com/votre-nom/worksphere.git
cd worksphere
