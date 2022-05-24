/* eslint-disable @typescript-eslint/explicit-module-boundary-types -- it's JS! */
export function handleCredentialResponse(response) {
  fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/auth/google`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${response.credential}`,
    },
  })
}

export function addGoogleSignInButton() {
  window.google.accounts.id.initialize({
    client_id:
      /* eslint-disable-next-line no-secrets/no-secrets -- not a secret */
      '996696542954-2v8hbeclgnnsqni5remvl2428c5suuha.apps.googleusercontent.com',
    callback: handleCredentialResponse,
  })

  window.google.accounts.id.renderButton(
    document.querySelector('#googleSignIn'),
    {
      theme: 'filled_blue',
      shape: 'pill',
      size: 'large',
      logo_alignment: 'center',
    } // customization attributes
  )
}

/* eslint-enable @typescript-eslint/explicit-module-boundary-types -- dude it's JS! */
