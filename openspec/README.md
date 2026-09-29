# OpenSpec — gym-app

OpenSpec artifacts for the gym-app monorepo.

## Layout

- `config.yaml` — project context, Strict TDD flag, testing capabilities, phase routing.
- `specs/` — system-level specifications (capabilities, requirements, scenarios).
- `changes/` — proposed deltas (`proposal.md`, `specs/`, `design.md`, `tasks.md`).
- `changes/archive/` — completed and verified changes.

## How to use

1. Run `/sdd-explore` to clarify an idea into a proposal.
2. Run `/sdd-new` to scaffold a new change folder.
3. Iterate through `proposal.md` → `specs/` → `design.md` → `tasks.md`.
4. `/sdd-apply` to implement against the tasks.
5. `/sdd-verify` to prove the implementation matches the spec.
6. `/sdd-archive` to fold deltas into `specs/`.

Strict TDD is enabled: every implementation task MUST land tests first (or co-commit
failing-then-passing assertions) and verify via `npm test` / `npm run test:e2e`.
