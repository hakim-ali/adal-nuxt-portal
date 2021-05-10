import { Adal } from './adal-plugin/index'

export default ({ app, error, $axios }, inject) => {
  inject(
    'adal',
    new Adal({
      config: {
        tenant: '1cd57418-25f0-4cc7-9650-d531201ffbe4',
        clientId: 'd47c1ea1-fe98-4dee-b220-6514a8b3dbb8',
        redirectUri: 'http://localhost:3000',
        cacheLocation: 'localStorage',
      },
    })
  )
}
