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
@import 'design-system/build/pro/variables-light.css';
```

Dans ce cas, les variables CSS sont directement déclarées à la racine de l'arbre du document.

Ou bien via un fichier typescript depuis lequel on importe l'objet contenant les _design tokens_ :

```js
import * as tokens from 'design-system/dist/build/jeune/index.web.light.ts'
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

Le but du _build_ est de transformer l'objet JSON contenant les _design tokens_ exportés depuis Figma en des fichiers exploitables par les applications du pass Culture (les fichiers `variables.light.css` ou `index.web.dark.ts` donnés en exemple plus haut).

### Transformation des _design tokens_

On utilise la librairie [style-dictionary](https://github.com/amzn/style-dictionary) qui nous permet de configurer des _pipelines_ qui appliquent des transformations spécifiques pour chaque environnement de destination.

Ces fichiers de configuration se trouvent dans `src/configs` et permettent de construire pour chaque _brand_ les fichiers de variables déclinés pour chaque plateforme et pour chaque thème concernés.

### Autres fichiers générés

On génère aussi deux autres fichiers :

- Le fichier `font-faces.css` contenant les définitions des typographies utilisées dans les _design tokens_
- Le fichier `font-preloads.ts` contenant la liste des _preloads_ à injecter dans le HTML des applications pour que les glyphes des typographies soient téléchargés en premier

## Structure des _design tokens_

Les _design tokens_ sont séparés en deux catégories :

- Les _global tokens_, c'est à dire les valeurs par défaut des tokens
- Les _tokens_ de thèmes qui surchargent les valeurs par défaut au moment du _build_

### _Global tokens_

Les _global tokens_ sont organisés par groupe. On a par exmeple `typography` ou `color`. Chacun de ces groupes est divisé en plusieurs fichiers :

- Les _primitive tokens_ qui font référence à des valeurs absolues (par ex: `color-grey-0: "#fff"`)
- Les _semantic tokens_ qui sont des abstractions des _primitive tokens_. Ils peuvent être lié à un style partagé par les applications (par ex: `color-text-default`), ou a un composant spécifique (par ex: `button-color-background-default-hover`)

### _Theme tokens_

Les _theme tokens_ sont regroupés dans des fichiers spécifiques pour chaque thème possible sur les plateformes du pass (tel que `dark.json` pour le thème sombre).

### _Override tokens_

Les _override tokens_ sont regroupés dans des fichiers spécifiques pour chaque plateforme et chaque thème possible (tel que `pro-dark.json` pour la surcharge du thème sombre sur l'application pro).

### Comment ajouter une brand ?

- Ajouter à `src/configs/brands` une config de plateformes et de thèmes pour la nouvelle brand
- Ajouter un fichier de surcharge pour chaque thème dans `src/tokens/overrides` sous la forme `[BRAND]-[THEME].json`

### Comment ajouter un thème ?

- Ajouter le thème aux listes des thèmes dnas les configs de brand concernées dans `src/configs/brands`
- Ajouter un fichier de surcharge pour chaque brand dans `src/tokens/overrides` sous la forme `[BRAND]-[THEME].json`
