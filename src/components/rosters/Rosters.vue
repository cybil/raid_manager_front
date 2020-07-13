<template>
  <div>
    <h3>Add a new roster</h3>

    <form @submit.prevent="addroster" class="col-md-8 mx-auto">
      <div class="form-group">
        <input type="text" autofocus autocomplete class="form-control" placeholder="Your roster's name" v-model="newroster.name">
      </div>

      <div class="form-group text-left">
        <label for="compoId">Compo</label>
        <select v-model="newroster.compoId" class="form-control" name="compoId">
          <option v-for="compo in basicCompos" :key="compo.id" :value="compo.id">
            {{ compo.name }} [{{ Object.values(compo.template).length }}]
          </option>
        </select>
      </div>

      <input type="submit" value="Validate" class="btn btn-success">
    </form>

    <hr>

    <div class="col-md-10 mx-auto">
      <table class="table table-hover">
        <thead>
          <th>Name</th>
          <th>Compo</th>
          <th>Status</th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="roster in rosters" :key="roster.id" :roster="roster">
            <td>{{ roster.name }}</td>
            <td>{{ Object.values(roster.template).length }}</td>
            <td>{{ statusFor(roster) }}</td>
            <td><button @click.prevent="editRoster(roster)" class="btn btn-primary">Edit</button></td>
            <td><button @click.prevent="removeRoster(roster)" class="btn btn-danger">X</button></td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'rosters',
  data () {
    return {
      newroster: [],
      editedroster: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.getRosters().then(response => {
        this.getBasicCompos()
      })
    }
  },
  computed: {
    ...mapState(['rosters', 'basicCompos'])
  },
  methods: {
    ...mapActions([
      'getRosters',
      'createRoster',
      'deleteRoster',
      'getBasicCompos'
    ]),
    statusFor (roster) {
      let compo = Object.values(roster.template)
      let filledSlots = compo.filter(slot => slot.character_id !== null)
      return `${filledSlots.length} / ${compo.length}`
    },
    addroster () {
      const value = this.newroster
      if (!value) {
        return
      }
      this.createRoster().then(response => {
        this.newroster = ''
      })
    },
    removeRoster (roster) {
      this.deleteRoster(roster)
    },
    editRoster (roster) {
      this.$router.replace(`/rosters/${roster.id}`)
    }
  }
}
</script>
