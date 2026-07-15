# Vlaga Labs

Site institucional estatico da Vlaga Labs, com blog, SEO e publicacao no Cloudflare Pages.

Producao:

https://vlagalabs.com.br

Repositorio:

https://github.com/execotavio/vlagalabs

## Estado atual

Este projeto roda com Next.js em modo estatico. O site publico nao depende de servidor, banco de dados, API routes, Payload, Prisma ou NextAuth.

O build gera a pasta `out`, que deve ser publicada pelo Cloudflare Pages.

## Stack

- Next.js com App Router
- React
- Tailwind CSS
- Markdown para posts do blog
- Decap CMS para edicao de posts em `/admin`
- Cloudflare Pages para build, deploy, CDN e HTTPS

## Estrutura principal

- `app/page.tsx`: pagina inicial institucional
- `app/blog/page.tsx`: listagem estatica do blog
- `app/blog/[slug]/page.tsx`: pagina estatica de cada post
- `app/sitemap.ts`: sitemap gerado no build
- `components/`: secoes visuais do site
- `components/faq.tsx`: FAQ visivel e Schema.org `FAQPage`
- `content/blog/`: posts em Markdown
- `lib/blog.ts`: leitura, ordenacao e filtragem dos posts
- `public/admin/`: Decap CMS
- `public/uploads/`: imagens enviadas pelo CMS
- `public/_headers`: headers de seguranca e cache usados pelo Cloudflare Pages
- `public/_redirects`: redirects de `www` e HTTP para `https://vlagalabs.com.br`
- `wrangler.toml`: configuracao do projeto para Cloudflare Pages

## Desenvolvimento local

Instale as dependencias:

```bash
npm ci
```

Suba o servidor local:

```bash
npm run dev
```

Abra:

```text
http://localhost:3000
```

Rotas importantes:

- `/`: site institucional
- `/blog`: listagem do blog
- `/blog/automacoes-ia-vendas`: exemplo de post publicado
- `/admin`: Decap CMS

## Build estatico

```bash
npm run build
```

O `next.config.js` usa:

- `output: "export"`
- `trailingSlash: true`
- `images.unoptimized: true`

Com isso, o Next exporta HTML, CSS, JS e assets para `out`.

Arquivos esperados no export:

- `out/index.html`
- `out/blog/index.html`
- `out/blog/<slug>/index.html`
- `out/admin/index.html`
- `out/sitemap.xml`
- `out/robots.txt`
- `out/favicon.png`
- `out/_headers`
- `out/_redirects`

## Publicacao no Cloudflare Pages

O deploy deve acontecer automaticamente a cada push na branch `main`, usando a integracao do Cloudflare Pages com GitHub.

Configuracao recomendada no Cloudflare Pages:

- Framework preset: `None`
- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`
- Node.js version: `20`

Fluxo esperado:

1. Commit na `main`
2. Cloudflare Pages instala dependencias com `npm ci`
3. Cloudflare Pages roda `npm run build`
4. Cloudflare Pages publica a pasta `out`

O dominio configurado para producao e:

```text
vlagalabs.com.br
```

No Cloudflare Pages, adicione os dominios customizados no painel do projeto:

- `vlagalabs.com.br`
- `www.vlagalabs.com.br`

O arquivo `public/_redirects` redireciona `www` e HTTP para `https://vlagalabs.com.br`.

Se o dominio estiver usando Cloudflare DNS, o proprio Cloudflare Pages pode criar os registros DNS necessarios. Para apex domain, o dominio precisa estar como uma zone no Cloudflare.

## Blog

Os posts ficam em:

```text
content/blog/*.md
```

Cada post e renderizado no build. Isso significa que o conteudo ja sai em HTML rastreavel, sem depender de fetch client-side.

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

Posts com:

```yaml
published: false
```

nao aparecem no blog nem no sitemap.

## Decap CMS

O CMS fica em:

```text
/admin
```

Configuracao:

```text
public/admin/config.yml
```

Backend atual:

- repo: `execotavio/vlagalabs`
- branch: `main`
- media folder: `public/uploads`
- public folder: `/uploads`
- OAuth bridge: `https://cms-auth.vlagalabs.com.br`

Ao salvar um post no CMS, o Decap cria um commit na branch `main`. Esse commit dispara um novo deploy no Cloudflare Pages.

Somente usuarios com permissao de push no repositorio conseguem publicar.

## SEO

O site esta preparado para busca com:

- metadata por pagina no App Router
- canonical URL para `https://vlagalabs.com.br`
- Open Graph
- Twitter cards
- `robots.txt` com referencia para o sitemap
- `sitemap.xml` com home, blog e posts publicados
- JSON-LD `Organization` e `WebSite` na home
- JSON-LD `BlogPosting` em cada post
- JSON-LD `FAQPage` no FAQ
- conteudo do blog renderizado no HTML durante o build

## Identidade visual

Os assets oficiais ficam em `public`:

- `public/logo.svg`
- `public/logo.png`
- `public/brand-profile.png`
- `public/favicon.png`
- `public/favicon.svg`
- `public/og-image.png`

Cores principais:

- verde escuro: `#002c22`
- laranja: `#ff6b1a`
- cinza claro: `#eaeaea`

As variaveis ficam em `app/globals.css`.

## Cuidados comuns

Se aparecer erro de chunk do Next, como `Cannot find module './373.js'`, normalmente e cache corrompido em `.next`.

Resolucao:

```bash
rm -rf .next
npm run dev
```

Se o favicon parecer antigo, teste em aba anonima ou faca hard refresh. Navegadores costumam manter favicon em cache por bastante tempo.

## Comandos uteis

```bash
npm run dev
npm run build
git status --short --branch
git pull --rebase origin main
git push origin main
```
