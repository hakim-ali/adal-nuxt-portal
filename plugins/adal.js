import { Adal } from './adal-plugin/index'

export default ({ app, error, $axios }, inject) => {
  inject(
    'adal',
    new Adal({
      config: {
        tenant: 'your aad tenant',
        clientId: 'your aad application client id',
        redirectUri: 'http://localhost:3000',
        cacheLocation: 'localStorage',
      },
    })
  )
}
