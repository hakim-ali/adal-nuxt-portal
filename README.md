# ADAL-NUXT

A sample Vue.js application showcasing usage of [ADAL JS](https://github.com/AzureAD/azure-activedirectory-library-for-js). using [Nuxt.js](https://nuxtjs.org/) framework.

The purpose of this example is to demonstrate usage of ADAL JS from the `adal-angular` module for managing authentication with Azure AD in the context of a typical Vue.js single page application with Nuxt.Js framework.

# Authentication with Azure AD with Adal.js in NuxtJS

### 1- Setup Vuejs with Nuxt.js framework

The first thing to to create vue.js project with Nuxt.js framework using Using [create-nuxt-app](https://nuxtjs.org/docs/2.x/get-started/installation) and you can do that by running the preceding command.

```
yarn create nuxt-app <project-name>
```

It will ask you some questions (name, Nuxt options, UI framework, TypeScript, linter, testing framework, etc. To find out more about all the options see the [Create Nuxt app](https://github.com/nuxt/create-nuxt-app/blob/master/README.md).

Screenshot as reference:

![enter image description here](https://github.com/hakim-ali/adal-nuxt-portal/blob/master/nuxt-project-settings.png)

Once all questions are answered, it will install all the dependencies. The next step is to navigate to the project folder and launch it:

### 2- Dependencies

Install the `adal-angular` module for managing authentication with Azure AD.

```JavaScript
"dependencies": {
    "adal-angular": "^1.0.18",
},
```

### 3- ADAL wrapper module:

Create the adal-plugin under the plugins folder for adal operations. Checkout the code under `/plugins/ada-plugin`

Then we create the file `plugins/adal.js`

```JavaScript
import { Adal } from  './adal-plugin/index'
export  default ({ app, error, $axios }, inject) => {
	inject(
		'adal',
		new  Adal({
			config: {
				tenant: 'your aad tenant',
				clientId: 'your aad application client id',
  				redirectUri:  'http://localhost:3000',
				cacheLocation:  'localStorage',
			},
		})
	)
}
```

Then we add the file path inside the `plugins` key of our `nuxt.config.js`. The plugins property lets you add Vue.js plugins easily to your main application. All the paths defined in the `plugins` property will be imported before initializing the main application.

```JavaScript
plugins: [{ src:  '@/plugins/adal', ssr:  false, mode:  'client' }],
```

Initialise ADAL at application load in service injection - before the app is created. So no need to Initialise manually.

You'll usually need to get an access token for some resource (usually an API you want your SPA to consume). The resource identifier should be associated with another Azure Active Directory application which represents the resource you're requesting:

```JavaScript
this.$adal
	.acquireToken()
	.then((token) => {
		console.log(token)
	})
	.catch((error) => {
		console.log(error)
	})
```

ADAL can be queried to determine whether the user has been properly authenticated:

```JavaScript
this.$adal.isAuthenticated()
```

It can be useful to get access to the current users JWT token/profile. This will contain user information, assigned groups, app roles and other handy things.

```JavaScript
this.$adal.getUserProfile()
```

Wrapper functions to invoke log in and log out actions:

```JavaScript
signIn() {
  this.$adal.login();
},
signOut() {
  this.$adal.logOut();
}
```

## In your Vue components

Use functions from ADAL in your Vue components to drive the view. i.e. - `v-if="isAuthenticated"`

```JavaScript
computed: {
  isAuthenticated() {
	return  this.$adal?.isAuthenticated()
  },
  profile() {
	return this.$adal?.getUserProfile() || {}
  }
},
methods: {
  login() {
    this.$adal?.signIn();
  },
  logOut() {
    this.$adal?.signOut();
  },
}
```

### Build and run this sample:

```bash
# install dependencies
$ yarn install
# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

### Thanks to

Matt-Ankerson - https://github.com/matt-ankerson/vue-adal
