# OWArmory

A website for building, sharing, and finding loadouts for Overwatch Stadium

## Developing

Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

### Prisma

Upon first cloning the repository, or upon making any change to the prisma schema, it is necessary to (re)generate the Prisma Client definitions (found in `src/generated/prisma`) by running `pnpm prisma generate`.

Migrations can be applied with `pnpm prisma migrate dev`. If updates are made to `prisma/schema.prisma`, they can be tested before committing to the final changes by using `pnpm prisma db push` (note this may require the dev database to be reset). A new migration covering the final result can be generated using `pnpm prisma migrate dev --name migration_name_here`.

### Code Style

Linting and code formatting is run automatically when commiting via [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/lint-staged/lint-staged). You may also manually run code styling via `pnpm run lint` or `pnpm run format` to write fixes to disk.

## Building

To create a production version of OWArmory:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.
