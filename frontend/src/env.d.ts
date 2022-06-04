declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
  }
}

// for native html elements
declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    dataTestid?: string
  }
}

// for vue components
declare module '@vue/runtime-core' {
  declare interface AllowedComponentProps {
    dataTestid?: string
    ariaLabel?: string
  }
}

export {}
