# Semantix

[Jouez au jeu!](https://paul-ohl.github.io/Semantix/)

## Maquette Figma

Ce projet a été conçu à partir d'une maquette [Figma](https://www.figma.com/design/OE1dBSohiKKraTv42753Wd/Semantix).

## Développement

Pendant le développement, pour "hot-reload" le css avec tailwind:
```bash
tailwind -i ./tailwind.css -o ./style.css --watch
```

Pour produire le css minified de production:
```bash
tailwind -i ./tailwind.css -o ./style.css --minify
```
Cette étape est inutile car une [Github Action](./.github/workflows/build-tailwindcss.yaml) est là pour le faire.

