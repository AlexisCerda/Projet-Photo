# Projet Photo

Logan SAGET / Alexis CERDA

Application web de galerie photo consommant une API REST distante, développée en **TypeScript** et bundlée avec **esbuild**.

---

## Fonctionnalités



### Exercice 1 

- Détails d'une image avec Handlebars et requêtes API

### Exercice 2 et 3

#### Chargement de la galerie
- Récupération des photos depuis l'API REST via `fetch`
- Affichage des miniatures en grille 3 colonnes (CSS Grid)
- Navigation paginée avec 5 boutons : **First / Previous / Load / Next / Last**


### Exercice 4 

- Option de clic sur une photo de la galerie pour en afficher les détails

### Exercice 5

#### Lightbox
- Clic sur une miniature → ouverture d'une lightbox plein écran
- Affichage de la photo en haute résolution avec son titre Boutons de navigation entre les photos de la galerie actuellement choisie.
- Les boutons se masquent automatiquement en début et en fin de galerie
- Loader au chargement de l'image



---

## API utilisée

```
Base URL : https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api
```

Endpoints appelés :
- `GET /photos` liste paginée des photos
- `GET /photos/{id}` détail d'une photo (URL haute résolution, titre, description)
