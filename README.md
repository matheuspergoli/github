# GitHub Explorer

Aplicação web para buscar perfis do GitHub por username e explorar os repositórios públicos desse usuário.

Projeto construído em **monorepo**, com foco em organização, reaproveitamento de UI e boa experiência de desenvolvimento.

## Links

- Aplicação em produção: [Acessar GitHub Explorer](https://github-website-explorer.vercel.app/)

## Escopo implementado

- Busca por usuário do GitHub na home
- Exibição de perfil com dados principais (avatar, bio, seguidores, localização, email etc.)
- Listagem de repositórios públicos
- Ordenação de repositórios (nome e estrelas)
- Paginação da listagem
- Tela de detalhes de repositório
- Tema claro/escuro/sistema com persistência em `localStorage`
- Tratamento de loading, not found e erros (incluindo limite de requisições da API)

## Tecnologias

### Core

- `React 19`
- `TypeScript`
- `Vite 8`
- `TanStack Router`
- `TanStack Query`
- `TanStack Start` + `Nitro` (SSR/build)

### UI e estilos

- `Tailwind CSS v4`
- `@base-ui/react`
- `shadcn` (base de componentes)
- `@tabler/icons-react`
- `sonner` (toasts)

### Qualidade e monorepo

- `pnpm workspaces`
- `Turborepo`
- `Biome` (format/lint)

## Decisões técnicas

- Organização por feature em `apps/website/src/features` para concentrar regras de domínio
- Separação de responsabilidades entre `libs` (infra/config), `routes` (navegação) e `shared` (componentes globais)
- Dados remotos com `TanStack Query` para cache, estados assíncronos e previsibilidade
- Roteamento com `TanStack Router` para estrutura tipada e navegação baseada em arquivo
- Build/SSR com `TanStack Start` + `Nitro` para execução local e deploy na Vercel

## Arquitetura (monorepo)

```text
.
├── apps/
│   └── website/          # Aplicação principal (GitHub Explorer)
├── packages/
│   └── ui/               # Biblioteca de componentes reutilizáveis
├── tooling/
│   ├── tailwind/         # Config e estilos compartilhados
│   └── typescript/       # Configurações TS compartilhadas
├── turbo.json            # Pipeline de tasks do monorepo
└── pnpm-workspace.yaml   # Definição dos workspaces
```

## Rotas da aplicação

- `/` -> página inicial com busca por username
- `/user/:username` -> perfil do usuário + lista de repositórios
- `/repo/:owner/:repository` -> detalhes de um repositório específico

## Integração com GitHub API

A aplicação consome a API pública do GitHub via `axios`:

- `GET /users/:username`
- `GET /users/:username/repos?per_page=100`
- `GET /repos/:owner/:repo`

Observações:

- Não exige autenticação para funcionar
- Pode sofrer rate limit da API pública (tratado na UI)

## Como rodar localmente

### Requisitos

- `Node.js` 20+
- `pnpm` 10+

### Passos

```bash
pnpm install
pnpm dev
```

Isso inicia o monorepo em modo de desenvolvimento. O endereço local será exibido no terminal.

## Scripts úteis

No diretório raiz:

- `pnpm dev` -> sobe os apps em desenvolvimento via Turbo
- `pnpm build` -> build de todos os workspaces
- `pnpm start` -> executa apps em modo start
- `pnpm typecheck` -> checagem de tipos em todo o monorepo
- `pnpm check` -> lint + ajustes com Biome
- `pnpm format` -> formatação com Biome
- `pnpm clean` -> limpeza de caches/artefatos

## Estrutura técnica (website)

Em `apps/website/src`:

- `routes/` -> rotas de arquivo (home, usuário, repositório)
- `features/github/` -> queries, ordenação, paginação e componentes da feature
- `libs/api.ts` -> cliente `axios` para API do GitHub
- `libs/query.ts` -> configuração central do TanStack Query
- `shared/components/` -> componentes globais (erro, loading, tema, etc)

## O que foi priorizado no projeto

- Separação clara entre app, UI compartilhada e tooling
- Código tipado e organizado por feature
- Fluxo de dados previsível com TanStack Query
- Reaproveitamento de componentes via pacote `@repo/ui`
- Boa UX para estados de carregamento e erro
