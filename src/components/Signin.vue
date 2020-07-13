<template>
  <div class="max-w-sm m-auto my-8">

    <div class="border p-10 rounded shadow">
      <h3 class="text-2xl mb-6">Sign In</h3>

      <form @submit.prevent="doSignin">
        <div class="form-group">
          <label for="name" class="label">Name</label>
          <input type="name" v-model="name" class="form-control" id="name" placeholder="Your name">
        </div>

        <div class="form-group">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password">
        </div>

        <button type="submit" class="btn btn-success">Sign In</button>

        <div class="my-4">
          <router-link to="/signup" class="link">Sign Up</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Signin',
  data () {
    return {
      name: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser'
    })
  },
  methods: {
    ...mapActions({
      signin: 'signin'
    }),
    doSignin () {
      let that = this
      this.signin({
        name: that.name,
        password: that.password
      }).then((response) => {
        that.checkSignedIn()
      })
    },
    checkSignedIn () {
      if (localStorage.csrf) {
        this.$router.replace('/characters')
      } else if (this.$router.currentRoute.path !== '/') {
        this.$router.replace('/')
      }
    }
  }
}
</script>
