# Sophies Demo

Demo project for SE-2223 and SE-2226: AY-2021-2022.

- Showcase baseline expectations and minimum requirements.

### Writing Unit Tests

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
