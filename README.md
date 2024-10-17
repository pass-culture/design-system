# pass Culture Design System

Bienvenue dans le dépôt GitHub du **Design System de pass Culture**. Ce projet regroupe les ressources essentielles pour maintenir une cohérence visuelle sur toutes les plateformes liées à pass Culture, incluant l'application native mobile/site web pour les jeunes bénéficiaires du pass, et le site web pour les professionnels.

## Introduction

Le **Design System de pass Culture** est conçu pour assurer une expérience utilisateur uniforme en fournissant des styles standardisés. L'objectif principal est de garantir une identité visuelle cohérente sur toutes les interfaces de pass Culture, qu'il s'agisse des jeunes ou des professionnels.

### Objectifs du Design System

- **Cohérence Visuelle** : Assurer que l'apparence des interfaces reste uniforme à travers toutes les plateformes.
- **Une seule source de vérité** : Centraliser tous les styles au sein du Design System pour garantir une consistance et une maintenance simplifiée à travers toutes les plateformes.
- **Réduction du Temps de Développement** : Les équipes peuvent se concentrer sur les fonctionnalités tout en utilisant des styles communs.
- **Accessibilité** : Faire en sorte que toutes les interfaces respectent les normes d'accessibilité les plus élevées. (RGAA et WCAG AAA)

## Fonctionnement

Le Design System de pass Culture est basé sur des **design tokens** qui sont exportés en JSON à partir de Figma puis transformés en CSS et JS.
Les JSONs sont disponibles dans le dossier `src/tokens` du Design System.

### Design Tokens

Les _design tokens_ sont des variables qui contiennent des valeurs réutilisables pour les couleurs, les typographies, les espacements, et d'autres éléments de style, assurant ainsi une cohérence visuelle et une facilité de maintenance.

Ces _design tokens_ permettent une application flexible et cohérente des styles, tout en facilitant les mises à jour globales du design. En centralisant ces valeurs, il devient facile de maintenir et de faire évoluer l'identité visuelle de pass Culture à travers toutes ses plateformes.

### JSONs

En utilisant la librairie [style-dictionary](https://github.com/amzn/style-dictionary), on peut répondre à beaucoup de besoins complexes de création des fichiers `css/js` à partir du JSON. En revanche, il faut que le JSON respecte certaines règles pour que la transformation se passe bien.

#### Singulier vs pluriel

Chaque clé est retranscrite dans les nom des variables créées, on veut donc que les noms des clés soient au singulier :

Mauvais exemple ❌ :

```json
{
  "colors": {
    "secondary": {
      "value": "#111111"
    }
  }
}
```

Qui donnerait :

```css
--colors-secondary: #111111;
```

Bon exemple ✅ :

```json
{
  "color": {
    "secondary": {
      "value": "#111111"
    }
  }
}
```

Pour obtenir :

```css
--color-secondary: #111111;
```

#### Précision du nom des clés

Pour que les noms des variables créées soit pertinent, le nom d’une clé ne doit pas faire référence directement au contenu du token.

Mauvais exemple ❌ :

```json
{
  "fontFamily": {
    "montserrat": {
      "value": "Montserrat"
    }
  }
}
```

Qui donnerait :

```css
--font-family-montserrat: Montserrat;
```

Bon exemple ✅ :

```json
{
  "fontFamily": {
    "base": {
      "value": "Montserrat"
    }
  }
}
```

Pour obtenir :

```css
--font-family-base: Montserrat;
```

#### Structure globale

Chaque clé est retranscrite dans les nom des variables créées, on veut donc que la structure du JSON représente exactement les conventions de nommage qu’on a décidées.

Mauvais exemple ❌ :

```json
{
  "global": {
    "color": {
      "secondary": {
        "value": "#111111"
      }
    }
  }
}
```

Qui donnerait :

```css
--global-color-secondary: #111111;
```

On préfère donc un JSON sans la clé “global” ✅ :

```json
{
  "color": {
    "secondary": {
      "value": "#111111"
    }
  }
}
```

Pour obtenir :

```css
--color-secondary: #111111;
```

#### Référence à un autre token

On peut faire référence à un autre token dans la “value”. Pour que la référence choisie puisse être trouvée sans ambigüité, il faut que le chemin vers cette valeur soit absolu :

Mauvais exemple ❌ :

```json
{
  "color": {
    "primary": {
      "value": "#111111"
    },
    "secondary": {
      "value": "{primary}"
    }
  }
}
```

Bon exemple ✅ :

```json
{
  "color": {
    "primary": {
      "value": "#111111"
    },
    "secondary": {
      // 👇 ici le chemin est absolu depuis la racine du JSON
      "value": "{color.primary}"
    }
  }
}
```

#### Typage et transformations px → rem

Dans le JSON, si les valeurs de taille ne peuvent être définies qu’en pixels (limitation Figma), il faut qu’elles respectent certaines règles pour être transformées en rem dans la lib :

- Avoir un attribut `“category”: “size”` dans le token
- Etre un nombre sans unité (et pas la chaine de caractères d’un nombre)

Mauvais exemple ❌ :

```json
"lineHeight": {
  "S": {
    "value": "21"
  },
}
```

Bon exemple ✅ :

```json
"lineHeight": {
  "S": {
    "value": 21,
    "attributes": {
      "category": "size"
    }
  },
}
```

Ce qui donne :

```css
--line-height-s: 1.3125rem;
```

#### Thème pro vs thème app native

Pour avoir des fichiers générés qui soient différentes sur l’app native et sur l’app pro (dans le cas de la couleur primaire par exemple qui n’est pas la même), on peut surcharger certains tokens.

La lib style-dictionary permet de générer les fichiers css/js/ts à partir de plusieurs fichiers JSON. On doit donc avoir 3 fichiers JSON :

- Le fichier design-tokens.json qui contient les tokens qui ont des valeurs communes à l'app native et à pro (on peut donc omettre le token color.primary)
- Le fichier design-tokens-pro.json qui continent uniquement les tokens qui sont spécifiques à pro
- Le fichier design-tokens-native.json qui continent uniquement les tokens qui sont spécifiques à l'app native

## Documentation

La documentation du Design System est disponible sur le site zeroheight.com. Vous pouvez y accéder en suivant ce lien : [pass Culture Design System](https://zeroheight.com/6b27136ed)

**Zeroheight** est une plateforme de documentation en ligne qui permet de présenter les composants, les styles et les directives de conception de manière claire et structurée. Celle-ci n'est pas réservée qu'aux développeurs, mais peut être consultée par tous les membres de l'équipe pour comprendre les principes de conception et les bonnes pratiques à suivre.
Vous y trouverez toutes les informations nécessaires pour utiliser le Design System de pass Culture dans vos projets.

## Créer une nouvelle version

Les équipes design modifient les design tokens, ce qui génère un nouveau fichier tokens.json.

Pour créer une nouvelle version du Design System :

1. Créer une nouvelle branche depuis main avec le nom pc-[NUMERO_TICKET ou BSR].
2. Générer le nouveau dossier build en exécutant la commande :

```bash
yarn build
```

3. Committez les changements et poussez-les sur la branche.
4. Créez une Pull Request (PR) de la branche vers main.
5. Une fois la PR approuvée et fusionnée, basculez sur main et exécutez la commande suivante :

```bash
./scripts/generate_dist_case.sh
```

- Vous devrez peut-être installer jq si ce n'est pas déjà fait :

```bash
brew install jq
```

- Il se peut que vous deviez modifier les permissions pour exécuter le script :

```bash
chmod +x ./scripts/generate_dist_case.sh
```

## Intégration dans PC App Native

### Installation

Pour intégrer le Design System dans le projet `app-native`, il est nécessaire d'ajouter le package npm correspondant dans le projet :

```json
"design-system": "https://github.com/pass-culture/design-system.git#[TAG_VERSION]"
```

Puis lancez la commande `yarn install` pour installer le package.

### Application des Styles Typographiques

L'intégration des styles typographiques peut se faire directement dans un composant react étant donné que nous utilisons `styled-component`.

Pour l'utiliser il suffit de récupérer ce dont on a besoin via la theme ex : `theme.designSystem.typographie.NOM_DE_LA_TYPO` ou `theme.designSystem.colors.NOM_DE_LA_COULEUR`

Pour la typographie vous avez une autre solution qui s'offre à vous :
Utiliser notre composant custom Text => `TypoDS.NOM_DE_LA_TYPO`

#### Pourquoi utiliser le thème du design system ?

**Uniformité** : En appliquant les mêmes styles sur l'ensemble de l'application, vous assurez une cohérence visuelle qui renforce l'identité de pass Culture.

**Simplicité d'implémentation** : Les développeurs peuvent rapidement et facilement appliquer les styles standards, évitant ainsi de recréer manuellement les propriétés CSS à chaque fois.

**Maintenance simplifiée** : Toute mise à jour du Design System est automatiquement propagée à l'ensemble du projet, garantissant une mise à jour rapide et homogène des styles sur l'application.

## Intégration dans PC Pro

### Installation

Pour intégrer le Design System dans le projet `Pro`, il est nécessaire d'ajouter le package npm correspondant dans le projet :

```json
"design-system": "https://github.com/pass-culture/design-system.git#[TAG_VERSION]"
```

Puis lancez la commande `yarn install` pour installer le package.

### Application des Styles Typographiques

L'intégration des styles typographiques ne se fait pas via un composant React dédié, mais par l'application de classes CSS pré-définies qui sont directement importées depuis le Design System. Ces classes sont ensuite utilisées pour styliser les différents éléments textuels.

#### Avantages de l'Utilisation des Classes Typographiques

**Cohérence** : Tous les textes du site suivent les mêmes directives de style, ce qui renforce l'identité visuelle de pass Culture.

**Simplicité** : Les développeurs peuvent appliquer des styles de manière uniforme sans avoir à redéfinir manuellement les propriétés CSS.

**Facilité de Mise à Jour** : Toute modification des styles dans le Design System se répercute automatiquement sur l'ensemble du site.
