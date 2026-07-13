# Vlaga Labs

Site institucional estatico da Vlaga Labs, publicado no GitHub Pages em:

https://vlagalabs.com.br

## Desenvolvimento

```bash
npm ci
npm run dev
```

## Build estatico

```bash
npm run build
```

O Next.js esta configurado com `output: "export"` e gera a pasta `out`, que e publicada pelo GitHub Actions em `.github/workflows/pages.yml`.

## Blog

Os posts ficam em `content/blog/*.md` e sao renderizados estaticamente durante o build.

Campos usados no frontmatter:

- `title`
- `slug`
- `date`
- `excerpt`
- `coverImage`
- `author`
- `tags`
- `published`
- `seoTitle`
- `seoDescription`

Posts com `published: false` nao aparecem no blog nem no sitemap.

## CMS

O Decap CMS fica em `/admin` e usa a configuracao em `public/admin/config.yml`.

Para publicar posts pela interface web:

1. Crie um OAuth App no GitHub para o repositorio `execotavio/vlagalabs`.
2. Configure um OAuth bridge no Cloudflare Worker em `https://cms-auth.vlagalabs.com.br`.
3. Use a callback URL indicada pelo OAuth bridge escolhido.
4. Garanta que os editores tenham permissao de push no repositorio.

Ao salvar um post no Decap CMS, ele cria um commit na branch `main`. O GitHub Actions faz o build e publica a nova versao no GitHub Pages.
