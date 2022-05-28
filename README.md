![Statements](https://img.shields.io/badge/Backend%20Code%20Coverage-73.41%25-red.svg?style=flat&logo=jest)
![Statements](https://img.shields.io/badge/Frontend%20Code%20Coverage-92.3%25-brightgreen.svg?style=flat&logo=jest)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-) <!-- ALL-CONTRIBUTORS-BADGE:END -->![example workflow](https://github.com/psse-cpu/sophies-demo-2022/actions/workflows/node.js.yml/badge.svg)

# Sophies Demo

Demo project for SE-2223 and SE-2226: AY-2021-2022.

- Showcase baseline expectations and minimum requirements.

<!--ts-->

- [Sophies Demo](#sophies-demo)
  - [Getting Started](#getting-started)
    - [Removing packages without breaking the lockfile](#removing-packages-without-breaking-the-lockfile)
    - [Naming Convention used for Unit Tests](#naming-convention-used-for-unit-tests)
    - [Important links](#important-links)
  - [IMPORTANT NOTES: Deployment on <a href="https://render.com" rel="nofollow">Render</a>](#important-notes-deployment-on-render)
  - [For absent-minded / forgetful people](#for-absent-minded--forgetful-people)
  - [Contributors <g-emoji class="g-emoji" alias="sparkles" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2728.png">✨</g-emoji>](#contributors-)

<!-- Added by: michael, at: Thursday, 19 May, 2022 11:41:04 AM PST -->

<!--te-->

## Getting Started

1. **Optional:** Install Postgres 13 that closely mirrors the staging and prod
   DB on [Railway](https://railway.app/)

   Stop your existing locally-installed PostgreSQL Server.
   Two processes can't use the same port, otherwise ERROR -- `bind: address already in use`

   Alternatively, bind your Docker PG on a different port, e.g. `-p 5433:5432`.

   ```sh
   docker pull timescale/timescaledb:latest-pg13

   docker run -d --name pg13 -p 127.0.0.1:5432:5432 \
   > -e POSTGRES_PASSWORD=postgres timescale/timescaledb:latest-pg13

   # commands to start/stop the Dockerized PG:
   docker stop pg13
   docker start pg13
   ```

2. Install [`pnpm`](https://pnpm.io/) for your OS, or use NPM:
   - Windows
     ```sh
     choco install pnpm
     ```
   - Linux
     - Arch-based
     ```sh
     paru -S pnpm-bin # pnpm is flagged out-of-date
     ```
3. Clone repo and install dependencies:
   ```sh
   git clone git@github.com:psse-cpu/sophies-demo-2022.git
   cd sophies-demo-2022
   pnpm install
   ```
4. Create databases:
   ```sh
   createdb sophies_demo -U postgres -h localhost
   createdb sophies_demo_test -U postgres -h localhost
   ```
5. Manage secrets:

   - Replicate the Git-ignored `backend/.env` file:

     ```sh
     # replace with your own Postgre username, password, and database
     DATABASE_URL=postgres://postgres:postgres@localhost:5432/sophies_demo

     # replace with your own
     GOOGLE_OAUTH_CLIENT_ID=#<your client_id here>
     GOOGLE_OAUTH_REDIRECT_URL=http://localhost:3000/auth/google/redirect

     # DON'T USE THE PROD SECRET HERE, OR YOU WILL BE 🔥D!
     JWT_SECRET=#<your JWT secret here>
     JWT_EXPIRES_IN=1w

     FRONTEND_ORIGIN="http://localhost:9000"
     ```

   - and also for the `frontend/.env` file:
     ```sh
     VITE_BACKEND_ORIGIN="http://localhost:3000"
     ```
   - Follow [this tutorial][4] to set-up Google OAuth if you've never done it before
   - If you fork this for your own projects, [configure secrets for your repo][5] as well,
     such that CI will :white_check_mark: pass.
   - Do not change these parts of the [Github Actions config][7] **OR YOU WILL BE _:fire: "FIRED"_!**

     ```yaml
     env:
       DATABASE_URL: postgresql://postgres:postgres@postgres:5432/sophies_demo
       GOOGLE_OAUTH_CLIENT_ID: ${{ secrets.GOOGLE_OAUTH_CLIENT_ID }}
       GOOGLE_OAUTH_CLIENT_SECRET: ${{ secrets.GOOGLE_OAUTH_CLIENT_SECRET }}
       JWT_SECRET: ${{ secrets.JWT_SECRET }}
       FRONTEND_STAGING_DEPLOY_HOOK_URL: ${{ secrets.FRONTEND_STAGING_DEPLOY_HOOK_URL }}
       BACKEND_STAGING_DEPLOY_HOOK_URL: ${{ secrets.BACKEND_STAGING_DEPLOY_HOOK_URL }}
     ```

6. Run migrations and optionally, seeds:

   ```sh
   pnpm be migrate
   pnpm be seed
   ```

7. Start both frontend and backend:
   ```sh
   pnpm start:dev
   ```

### Removing packages without breaking the lockfile

Until [this question](https://github.com/pnpm/pnpm/discussions/4754) is answered,
removing packages from a subproject without a broken lockfile rewrite would be:

```sh
# from backend or frontend (fe)
pnpm be remove <some-package>
```

And from the root, just remove the entry in `package.json` and execute `pnpm i`.

### Naming Convention used for Unit Tests

- test classes with the outer `describe` level containing the class name
  - inner `describe` will be member names in [JSDoc 3 namepath format][3]
  - this convention is also used in:
    - [Yeoman](https://yeoman.io/contributing/testing-guidelines.html)
    - [Mocha](https://mochajs.org/)
    - [Better Specs](https://www.betterspecs.org/)
- Treat top-level functions in a module as static methods
  - Of course other types like constants won't need tests

```ts
// Dog.ts
export class Dog {
  static fromPojo(pojo: DogLike) {
    /*...*/
  }

  bark() {
    /*...*/
  }
}
```

```ts
// Dog.spec.ts
describe('Dog', () => {
  describe('.fromPojo()', () => {
    /*...*/
  })
  describe('#bark()', () => {
    /*...*/
  })
})
```

```ts
// NumberHelper.ts
export function zeropad(value: number, digits = 2) {/*...*/}
export function round(value: number, places = 2) {/*...*/}

// this won't need tests
export GOLDEN_RATIO = 1.61803
```

```ts
// NumberHelper.spec.ts
describe('NumberHelper', () => {
  describe('.zeropad', () => {
    /*...*/
  })
  describe('.round', () => {
    /*...*/
  })
})
```

### Important links

- [TypeORM 0.2.x Docs](https://orkhan.gitbook.io/typeorm/docs)
- TypeORM 0.3.x has breaking changes that don't work with `@nestjs/typeorm ` yet.
  - See [Github Issue][1] and [the warning in their docs][2].

## IMPORTANT NOTES: Deployment on [Render](https://render.com)

- Staging is auto-deployed when CI passes after a `git push origin main`
- Prod is manually deployed, per our minimum requirement.
- Databases are provisioned by Railway.
- Heroku is another free no-credit-card alternative, but [there's this ongoing issue][6]
  as of May 19, 2022.

## For absent-minded / forgetful people

It's not a good idea to use multiple package managers, and this project has only
been tested using [`pnpm`](https://pnpm.io/).

You can add this in your `.zshenv` for example:

```sh
NPM_PATH=$(which npm)
npm () {
  if [ -e pnpm-lock.yaml ] || [ -e ../pnpm-lock.yaml ]
  then
    echo "Please use pnpm with this project"
  else
    $NPM_PATH "$@"
  fi
}
```

<!-- TODO: remove once https://github.com/prettier/prettier/issues/11362 is solved -->
<!-- prettier-ignore -->
[:point_up_2: _credits_](https://stackoverflow.com/a/65831302/2310634)

It lowers the risk of typing `npm` instead of `pnpm`, since they're usually
typed in the monorepo root or `frontend/`/`backend/` roots.

One enticing alternative is to use [only-allow](https://github.com/pnpm/only-allow/)
but it doesn't [seem reliable](https://stackoverflow.com/a/63238108/2310634).

[1]: https://github.com/nestjs/typeorm/pull/1233
[2]: https://docs.nestjs.com/techniques/database#typeorm-integration
[3]: https://jsdoc.app/about-namepaths.html
[4]: https://dev.to/imichaelowolabi/how-to-implement-login-with-google-in-nest-js-2aoa
[5]: https://docs.github.com/en/actions/security-guides/encrypted-secrets
[6]: https://status.heroku.com/incidents/2413
[7]: .github/workflows/node.js.yml

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://hansdaduya.com"><img src="https://avatars.githubusercontent.com/u/49836841?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hans Gabriel B. Daduya</b></sub></a><br /><a href="#ideas-HansGabriel" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-HansGabriel" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#mentoring-HansGabriel" title="Mentoring">🧑‍🏫</a></td>
    <td align="center"><a href="https://github.com/uLan08"><img src="https://avatars.githubusercontent.com/u/14162336?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Patrick Rainier Juen</b></sub></a><br /><a href="#ideas-uLan08" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-uLan08" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#mentoring-uLan08" title="Mentoring">🧑‍🏫</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
