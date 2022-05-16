/* eslint-disable unicorn/prevent-abbreviations -- Env is well-accepted */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
  }
}

/* eslint-enable unicorn/prevent-abbreviations */
