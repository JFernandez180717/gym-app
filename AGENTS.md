# Repository instructions

## Structure

- This is not a single Node workspace: `back/` and `front/` have separate dependency manifests and lockfiles. Run package commands from the package directory, not the repository root.
- `back/` is a NestJS API. Its entrypoint is `back/src/main.ts`; it exposes Swagger at `/api`, listens on `PORT` (default `3000`), enables credentialed CORS for `http://localhost:3000`, and applies JWT/role guards globally.
- `front/` is a Nuxt 4 app. Pages live under `front/app/pages`; API calls go through `front/app/composables/useApi.ts` and use credentials. The configured API base is currently `http://localhost:3001`, so check the port configuration when running both apps locally.
- PostgreSQL is defined by the root `docker-compose.yml` and is exposed on host port `5435`. Prisma schema and client generation are under `back/prisma/`.

## Commands

Backend (`cd back`):

```bash
npm install
npm run start:dev
npm run build
npm run lint
npm test
npm run test:e2e
```

- Run one backend unit test with Jest's path filter, for example: `npm test -- auth.service.spec.ts`.
- Backend formatting is `npm run format`; it uses Prettier with single quotes and trailing commas. `npm run lint` includes `--fix`, so inspect the diff after running it.

Frontend (`cd front`):

```bash
pnpm install
pnpm dev
pnpm build
pnpm generate
pnpm preview
```

- Use pnpm for the frontend; `front/pnpm-lock.yaml` is the dependency lockfile and `front/.npmrc` enables `shamefully-hoist=true`.
- The frontend currently has no test or lint script; use `pnpm build` or `pnpm generate` for focused verification.

## Environment and database

- Backend configuration loads `.env.${NODE_ENV || 'development'}` via `ConfigModule`; local development therefore expects `back/.env.development` even though the checked-in template is `back/.env.example`.
- `DATABASE_URL` is required by Prisma and `JWT_SECRET` is required for authentication. Never commit populated env files or secrets.
- `npx prisma generate` is required after Prisma schema/dependency changes. Use `npx prisma migrate dev --name <name>` for local schema changes; review the generated migration before relying on Docker deployment.
- Compose reads `DB_USER`, `DB_PASS`, `DB_NAME`, `DATABASE_URL`, `JWT_SECRET`, and `PORT` from the environment. The backend image runs `prisma migrate deploy` before starting, so confirm deployable migrations exist before using `docker compose up --build`.

## Testing and changes

- Backend unit tests are `*.spec.ts` files under `back/src`; e2e tests use `back/test/jest-e2e.json` and may require a running/configured database.
- Keep backend feature code organized by Nest module under `back/src` (`auth`, `users`, `roles`, `branches`, `companies`); shared HTTP behavior belongs under `back/src/common`.
- When changing API contracts, update the backend DTO/controller behavior and the frontend composable/consumer together, then verify the configured ports and credentialed requests.
