# Sophies Demo

Demo project for SE-2223 and SE-2226: AY-2021-2022.

- Showcase baseline expectations and minimum requirements.

### Important links

- [TypeORM 0.2.x Docs](https://orkhan.gitbook.io/typeorm/docs)
- TypeORM 0.3.x has breaking changes that don't work with `@nestjs/typeorm ` yet.
  - See [Github Issue][1] and [the warning in their docs][2].

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
