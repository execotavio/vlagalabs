# Integração Payload CMS

Este documento descreve a integração do Payload CMS no projeto Vlagalabs-site.

## 📋 Visão Geral

O blog do site foi migrado de uma implementação customizada usando Prisma + Next.js API Routes para **Payload CMS 3.0**, um CMS headless moderno, code-first e TypeScript-native.

## 🎯 Por que Payload CMS?

- **Code-First**: Toda a configuração é feita em TypeScript, permitindo versionamento e controle total
- **Next.js Native**: Projetado especificamente para integração com Next.js 15+ e App Router
- **Auto-Generated Admin UI**: Interface administrativa completa gerada automaticamente
- **TypeScript**: Type safety completo em toda a aplicação
- **Flexível**: Suporte a relacionamentos, uploads de mídia, rich text, e muito mais
- **Self-Hosted**: Controle total sobre dados e infraestrutura

## 📁 Estrutura de Arquivos

```
/
├── src/
│   ├── collections/          # Definições de coleções do Payload
│   │   ├── Posts.ts         # Coleção de posts do blog
│   │   ├── Media.ts         # Coleção de mídia (imagens)
│   │   └── Users.ts         # Coleção de usuários
│   ├── payload.config.ts    # Configuração principal do Payload
│   └── payload-types.ts     # Tipos TypeScript gerados automaticamente
├── app/
│   ├── (payload)/           # Rotas isoladas do Payload
│   │   ├── admin/           # Painel administrativo
│   │   └── api/             # API REST do Payload
│   └── blog/                # Páginas públicas do blog
├── lib/
│   └── payload.ts           # Cliente Payload para uso em Server Components
├── components/
│   └── lexical-content.tsx  # Componente para renderizar rich text
└── media/                   # Diretório de uploads de mídia
```

## 🚀 Como Usar

### Acessar o Painel Admin

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse o painel admin em:
   ```
   http://localhost:3000/admin
   ```

3. Faça login com suas credenciais (você precisará criar o primeiro usuário na primeira execução)

### Criar um Post

1. No painel admin, vá para **Posts**
2. Clique em **Create New**
3. Preencha os campos:
   - **Título**: Título do post
   - **Slug**: URL amigável (ex: `meu-primeiro-post`)
   - **Resumo**: Breve descrição
   - **Conteúdo**: Conteúdo rich text usando o editor Lexical
   - **Imagem de Capa**: Upload opcional de imagem
   - **Status**: `Rascunho` ou `Publicado`
   - **Data de Publicação**: Data/hora de publicação
   - **Autor**: Selecionado automaticamente

4. Clique em **Save** ou **Save and Publish**

### Fazer Upload de Mídia

1. No painel admin, vá para **Media**
2. Clique em **Upload** ou arraste arquivos
3. As imagens são automaticamente redimensionadas em diferentes tamanhos
4. Use a mídia nos seus posts através do campo "Imagem de Capa"

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como referência):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vlagalabs"
PAYLOAD_SECRET="seu-secret-key-aqui"
```

### Banco de Dados

Payload CMS usa o mesmo banco de dados PostgreSQL que o resto da aplicação. Para inicializar as tabelas do Payload:

```bash
npm run payload migrate
```

## 📝 Collections (Coleções)

### Posts

Coleção principal para posts do blog:

- **title** (text): Título do post
- **slug** (text, unique): URL slug
- **excerpt** (textarea): Resumo opcional
- **content** (richText): Conteúdo usando Lexical editor
- **coverImage** (upload): Imagem de capa (relacionamento com Media)
- **status** (select): `draft` ou `published`
- **publishedAt** (date): Data de publicação
- **author** (relationship): Relacionamento com Users

### Media

Gerencia uploads de imagens:

- **alt** (text): Texto alternativo para acessibilidade
- Gera automaticamente thumbnails em múltiplos tamanhos
- Armazenamento local em `/media`

### Users

Sistema de autenticação integrado:

- **name** (text): Nome do usuário
- **email** (email): Email (usado para login)
- **password**: Senha criptografada
- Autenticação integrada do Payload

## 🔐 Controle de Acesso

- **Posts publicados**: Acessíveis publicamente
- **Posts em rascunho**: Apenas usuários autenticados
- **Criar/Editar/Deletar**: Apenas usuários autenticados
- **Media pública**: Todas as imagens são acessíveis publicamente
- **Upload de mídia**: Apenas usuários autenticados

## 🎨 Renderização de Conteúdo

O conteúdo rich text é armazenado em formato Lexical JSON e renderizado usando o componente `LexicalContent`:

```tsx
import { LexicalContent } from '@/components/lexical-content'

<LexicalContent content={post.content} />
```

O componente suporta:
- Parágrafos
- Headings (h1-h6)
- Listas (ordenadas e não ordenadas)
- Links
- Formatação de texto (negrito, itálico, sublinhado, tachado, código)

## 🔄 Migração de Dados

Para migrar posts existentes do sistema antigo (Prisma) para Payload CMS:

1. Use a API Local do Payload:
```typescript
import { getPayloadClient } from '@/lib/payload'

const payload = await getPayloadClient()

await payload.create({
  collection: 'posts',
  data: {
    title: 'Título',
    slug: 'slug',
    content: { root: { children: [/* lexical nodes */] } },
    status: 'published',
    // ...
  }
})
```

2. Ou use a REST API:
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Título", "slug": "slug", ...}'
```

## 📚 Recursos Adicionais

- [Documentação Oficial do Payload CMS](https://payloadcms.com/docs)
- [Guia de Integração Next.js](https://payloadcms.com/docs/getting-started/installation)
- [Lexical Editor](https://lexical.dev/)
- [Payload CMS Collections](https://payloadcms.com/docs/configuration/collections)
- [Payload CMS Access Control](https://payloadcms.com/docs/access-control/overview)

## 🐛 Troubleshooting

### Erro ao conectar ao banco de dados
- Verifique se `DATABASE_URL` está correta no `.env`
- Certifique-se de que o PostgreSQL está rodando
- Execute `npm run payload migrate` para criar as tabelas

### Admin UI não carrega
- Limpe o cache: `rm -rf .next`
- Verifique se `PAYLOAD_SECRET` está definido
- Certifique-se de que Next.js 15+ está instalado

### Imagens não aparecem
- Verifique se o diretório `/media` existe e tem permissões de escrita
- Confirme que a imagem foi feita upload com sucesso no admin
- Verifique os logs do servidor para erros de upload

## 🔄 Alterações Principais

### Removido
- ❌ API Routes customizadas em `/app/api/blog`
- ❌ Admin panel customizado em `/app/admin/blog`
- ❌ Queries diretas do Prisma nas páginas
- ❌ Sistema de autenticação NextAuth para o blog (ainda pode ser usado no frontend)

### Adicionado
- ✅ Payload CMS 3.0 com admin UI completo
- ✅ Coleções TypeScript type-safe
- ✅ Editor Lexical rico em recursos
- ✅ Sistema de upload de mídia com redimensionamento automático
- ✅ API REST completa gerada automaticamente
- ✅ Autenticação integrada do Payload
- ✅ Componente de renderização Lexical

### Mantido
- ✅ Páginas públicas do blog (`/blog` e `/blog/[slug]`)
- ✅ Design e estilo existentes
- ✅ Estrutura de URLs
- ✅ Banco de dados PostgreSQL
