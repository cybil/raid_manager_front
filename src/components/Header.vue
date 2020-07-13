<template>
  <div class="flex">
    <div>
      <img src="@/assets/logo.png" class="logo-header">
    </div>

    <div class="flex flex-items-center">
      <router-link v-if="!isSignedIn" to="/" class="nav-link">Sign In</router-link>
      <router-link v-if="!isSignedIn" to="/signup" class="nav-link">Sign Up</router-link>
      <router-link v-if="isSignedIn" to="/characters" class="nav-link">My Characters</router-link>
      <router-link v-if="isSignedIn && currentUser.user.officer" to="/rosters" class="nav-link">Rosters</router-link>
      <router-link v-if="isSignedIn && currentUser.user.officer" to="/basic-compos" class="nav-link">Basic compos</router-link>
      <router-link v-if="isSignedIn && currentUser.user.officer" to="/characters/all" class="nav-link">All Characters</router-link>
      <a v-if="isSignedIn" href="javascript:void(0);" @click.prevent="doSignout()" class="nav-link">Sign out</a>

      <div v-if="currentUser.csrf" class="nav-link">
        Connected as: {{currentUser.user.name}}
      </div>
    </div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters({
      currentUser: 'currentUser'
    }),
    isSignedIn () {
      return this.currentUser.csrf || localStorage.csrf
    }
  },
  methods: {
    ...mapActions({
      signout: 'signout'
    }),
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    doSignout () {
      this.signout().then(() => {
        delete localStorage.csrf
        delete localStorage.signedIn
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
.logo-header {
  padding: 10px;
  width: 100px;
}
</style>
