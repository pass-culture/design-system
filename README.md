# Design System du pass Culture

Ce _repository_ contient le code nécessaire à la génération des _design tokens_ du Design System du pass Culture. Si vous cherchez des informations plus générales à propos de ce design system, rendez-vous sur [la documentation](https://zeroheight.com/6b27136ed).

Si vous êtes développeur·euse ou designer·euse, et que vous voulez utiliser le Design System du pass Culture, vous pouvez commencer avec les [kits de démarrage](https://zeroheight.com/6b27136ed/p/02dbf9-kit-de-demarrage).

## Installation et utilisation

La dernière version de la librairie peut être installée dans un projet avec la commande suivante :

```bash

yarn add https://github.com/pass-culture/design-system.git#[TAG_VERSION]

```

La librairie donne accès aux _design tokens_ soit via un fichier de variables CSS qu'on peut importer cette manière :

```css
@import 'design-system/build/css/variables.css';
```

Dans ce cas, les variables CSS sont directement déclarées à la racine de l'arbre du document.

Ou bien via un fichier typescript depuis lequel on importe l'objet contenant les _design tokens_ :

```js
import * as designSystemTokens from 'design-system/dist/build/ts/index.web'
```

## Création d'un nouveau _tag_

A chaque nouvelle version des _design tokens_, un nouveau tag est généré. La création du nouveau tag se fait de la manière suivante :

1. Créer une nouvelle branche depuis main avec le nom `pc-[NUMERO_TICKET ou BSR]`
2. Générer un nouveau _build_ :

```bash

yarn build

```

3. _Commit_ les changements et les poussez sur la branche

4. Créer une PR de la branche vers main

5. Une fois la PR approuvée et mergée, basculer sur main et exécuter la commande suivante :

```bash

./scripts/generate_dist_case.sh

```

> Il faudra peut-être installer jq si ce n'est pas déjà fait :
>
> ```bash
> brew  install  jq
> ```
>
> Il se peut qu'il faille modifier les permissions pour exécuter le script :
>
> ```bash
> chmod  +x  ./scripts/generate_dist_case.sh
> ```

## Fonctionnement du _build_

Le but du _build_ est de transformer l'objet JSON contenant les _design tokens_ exportés depuis Figma en des fichiers exploitables par les applications du pass Culture (les fichiers `variables.css` ou `index.web.ts` donnés en exemple plus haut).

### Transformation des _design tokens_

On utilise la librairie [style-dictionary](https://github.com/amzn/style-dictionary) qui nous permet de configurer des _pipelines_ qui appliquent des transformations spécifiques pour chaque environnement de destination.

Ces fichiers de configuration se trouvent dans `src/configs` et permettent de construire :

- Le fichier `variables.css` contenant des variables CSS
- Le fichier `index.web.ts` exportant un object typescript `theme`

### Autres fichiers générés

On génère aussi deux autres fichiers :

- `font-faces.css` contenant les définitions des typographies utilisées dans les _design tokens_
- `font-preloads.ts` contenant la liste des _preloads_ à injecter dans le HTML des applications pour que les glyphes des typographies soient téléchargés en premier

## Structure des _design tokens_

En cours de construction...
