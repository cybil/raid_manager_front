<template>
  <div>
    <h3>Roster {{roster.name}}</h3>

    <div class="flex flex-align-center flex-items-center col-md-11 mx-auto">
      <div v-for="grpNum in (Object.values(compo).length / 5)" :key="grpNum">
        <SlotSelector
          v-for="(currentSlot, slotIndex) in Object.values(compo).slice((grpNum - 1) * 5, ((grpNum - 1) * 5) + 5)" :key="slotIndex"
          :theSlot="currentSlot"
          :rosterId="roster.id"
        />
      </div>
   </div>

  </div>
</template>

<script>
import SlotSelector from './SlotSelector.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'roster',
  components: { SlotSelector },
  data () {
    return {
      roster: '',
      selectedCharacter: [],
      error: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get(`/api/v1/rosters/${this.$route.params.id}`)
        .then(response => {
          this.roster = response.data
          this.getAllCharacters()
        })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  computed: {
    ...mapState(['allCharacters']),
    compo () {
      if (this.roster === '') {
        return []
      }
      return Object.values(this.roster.template)
    }
  },
  methods: {
    ...mapActions([
      'getAllCharacters'
    ]),
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    }
  }
}
</script>
