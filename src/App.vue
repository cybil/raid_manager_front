<template>
  <div id="app" class="global-bg">
    <Header />
    <div v-if="globalError" class="alert alert-danger col-md-11 mx-auto">{{ globalError }}</div>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    ...mapGetters([
      'globalError'
    ])
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
