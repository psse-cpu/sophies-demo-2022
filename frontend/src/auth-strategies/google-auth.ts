export interface GoogleAuthResponse {
  credential: string
}

type GoogleAuthCallback = (response: GoogleAuthResponse) => void
interface GoogleAuthConfig {
  client_id: string
  callback: GoogleAuthCallback
}

// TODO: revisit the docs and improve the typings, hopefully 🙏 turn it into a lib
interface GoogleButtonStyling {
  theme: 'filled_blue'
  shape: 'pill'
  size: 'large'
  logo_alignment: 'center'
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize(config: GoogleAuthConfig): void
          renderButton(
            element: HTMLElement,
            styleConfig: GoogleButtonStyling
          ): void
        }
      }
    }
  }
}

export function addGoogleSignInButton(onSignIn: GoogleAuthCallback): void {
  window.google.accounts.id.initialize({
    client_id:
      /* eslint-disable-next-line no-secrets/no-secrets -- not a secret */
      '996696542954-2v8hbeclgnnsqni5remvl2428c5suuha.apps.googleusercontent.com',
    callback: onSignIn,
  })

  const div = document.querySelector<HTMLDivElement>('#googleSignIn')
  if (div) {
    window.google.accounts.id.renderButton(
      div,
      {
        theme: 'filled_blue',
        shape: 'pill',
        size: 'large',
        logo_alignment: 'center',
      } // customization attributes
    )
  }
}
