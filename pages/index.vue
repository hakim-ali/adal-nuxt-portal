<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Adal.js Authentication Using NuxtJS, Azure
        </v-card-title>
        <v-card-text v-if="isAuthenticated">
          <v-list three-line>
            <template v-for="(value, propertyName) in profile">
              <v-list-item :key="propertyName">
                <v-list-item-content>
                  <v-list-item-title>{{ propertyName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ value }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card-text>
        <v-card-actions class="mx-auto">
          <v-btn
            class="mx-auto ma-4"
            large
            width="300"
            color="primary"
            @click="login"
            v-if="!isAuthenticated"
          >
            Login
          </v-btn>
          <v-btn
            class="mx-auto ma-4"
            large
            width="300"
            color="primary"
            @click="logout"
            v-else
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      // isAuthenticated: false,
      // profile: null,
    }
  },

  computed: {
    isAuthenticated() {
      return this.$adal?.isAuthenticated()
    },
    profile() {
      const userProfile = this.$adal?.getUserProfile() || {}
      return {
        given_name: userProfile.given_name,
        family_name: userProfile.family_name,
        name: userProfile.name,
        unique_name: userProfile.unique_name,
        upn: userProfile.upn,
      }
    },
  },

  mounted() {},

  methods: {
    login() {
      this.$adal.initialize().then((res) => {
        if (!res.isAuthenticated) {
          this.$adal.signIn()
        }
      })
    },
    logout() {
      this.$adal.signOut()
    },
  },
}
</script>
