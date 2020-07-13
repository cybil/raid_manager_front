<template>
  <div>
    <div class="col-md-10 mx-auto">
      <table class="table table-hover">
        <thead>
          <th>Name</th>
          <th>Race</th>
          <th>Class</th>
          <th>Roles</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="char in allCharacters" :key="char.id" :char="char">
            <td>{{char.name}}</td>
            <td>{{char.race.toUpperCase()}}</td>
            <td><b :class="colorForClass(char.ch_class)">{{char.ch_class.toUpperCase()}}</b></td>
            <td class="flex flex-items-center flex-align-between" style="max-width: 100px;">
              <img v-if="char.roles.includes('tank')" src="@/assets/tank.png" class="logo-role">
              <img v-if="char.roles.includes('heal')" src="@/assets/heal.png" class="logo-role">
              <img v-if="char.roles.includes('dps')" src="@/assets/dps.png" class="logo-role">
            </td>
            <td><button @click.prevent="removeCharacter(char)" class="btn btn-danger">X</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AllCharacters',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['allCharacters'])
  },
  methods: {
    ...mapActions({
      deleteUserCharacter: 'deleteUserCharacter'
    }),
    colorForClass (chClass) {
      return `text-${chClass}`
    },
    removeCharacter (character) {
      this.deleteUserCharacter(character)
    }
  }
}
</script>
