<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 rounded shadow">
      <h3 class="text-2xl mb-6">Sign Up</h3>

      <form @submit.prevent="doSignup()">
        <div class="form-group">
          <label for="ame" class="label">Name</label>
          <input type="text" v-model="name" class="form-control" id="email" placeholder="John">
        </div>

<!--         <div class="form-group">
          <label for="email" class="label">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" placeholder="xxx@example.com">
        </div>
 -->
        <div class="form-group">
          <label for="password" class="label">Password</label>
          <input type="password" v-model="password" class="form-control" id="password">
        </div>

        <div class="form-group">
          <label for="password_confirmation" class="label">Password confirmation</label>
          <input type="password" v-model="password_confirmation" class="form-control" id="password_confirmation">
        </div>

        <button type="submit" class="btn btn-success">Sign Up</button>

        <div class="my-4">
          <router-link to="/signin" class="link">Sign In</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    doSignup () {
      this.signup({
        name: this.name,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/characters')
      }
    }
  }
}
</script>
