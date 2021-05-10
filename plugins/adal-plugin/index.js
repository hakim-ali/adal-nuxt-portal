import AuthenticationContext from 'adal-angular/lib/adal.js'

export class Adal {
  constructor(options) {
    this.authenticationContext = null
    this.config = options.config

    this.initialize()
  }

  /**
   * @return {Promise}
   */
  initialize() {
    this.authenticationContext = new AuthenticationContext(this.config)

    return new Promise((resolve, reject) => {
      if (
        this.authenticationContext.isCallback(window.location.hash) ||
        window.self !== window.top
      ) {
        // redirect to the location specified in the url params.
        this.authenticationContext.handleWindowCallback()
      } else {
        // try pull the user out of local storage
        const user = this.authenticationContext.getCachedUser()

        if (user) {
          resolve({ isAuthenticated: true, user })
        } else {
          resolve({ isAuthenticated: false })
          // no user at all - go sign in.
          // this.signIn()
        }
      }
    })
  }

  /**
   * @return {Promise.<String>} A promise that resolves to an ADAL token for resource access
   */
  acquireToken() {
    return new Promise((resolve, reject) => {
      this.authenticationContext.acquireToken(
        '<azure active directory resource id>',
        (error, token) => {
          if (error || !token) {
            return reject(error)
          } else {
            return resolve(token)
          }
        }
      )
    })
  }

  /**
   * Issue an interactive authentication request for the current user and the api resource.
   */
  acquireTokenRedirect() {
    this.authenticationContext.acquireTokenRedirect(
      '<azure active directory resource id>'
    )
  }

  /**
   * @return {Boolean} Indicates if there is a valid, non-expired access token present in localStorage.
   */
  isAuthenticated() {
    // getCachedToken will only return a valid, non-expired token.
    if (this.authenticationContext.getCachedToken(this.config.clientId)) {
      return true
    }
    return false
  }

  /**
   * @return An ADAL user profile object.
   */
  getUserProfile() {
    return this.authenticationContext.getCachedUser().profile
  }

  signIn() {
    this.authenticationContext.login()
  }

  signOut() {
    this.authenticationContext.logOut()
  }
}
