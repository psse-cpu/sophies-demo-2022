# Sophies Demo

Demo project for SE-2223 and SE-2226: AY-2021-2022.

- Showcase baseline expectations and minimum requirements.

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

[:point*up_2: \_credits*](https://stackoverflow.com/a/65831302/2310634)

It lowers the risk of typing `npm` instead of `pnpm`, since they're usually
typed in the monorepo root or `frontend/`/`backend/` roots.

One enticing alternative is to use [only-allow](https://github.com/pnpm/only-allow/)
but it doesn't [seem reliable](https://stackoverflow.com/a/63238108/2310634).
