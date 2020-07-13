<template>
  <div>
    <h3>Add a new Basic compo</h3>
    <form @submit.prevent="addCompo" class="col-md-8 mx-auto">
      <div class="form-group">
        <input type="text" autofocus autocomplete class="form-control" placeholder="The compo's name" v-model="newCompo.name">
      </div>

      <div class="form-group text-left">
        <label for="size">Size</label>
        <select v-model="newCompo.size" class="form-control" name="size">
          <option value="40">40</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="10">10</option>
        </select>
      </div>

      <input type="submit" value="Validate" class="btn btn-success">
    </form>

    <hr>

    <div class="col-md-10 mx-auto">
      <table class="table table-hover">
        <thead>
          <th>Name</th>
          <th>Size</th>
          <th></th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="compo in basicCompos" :key="compo.id" :compo="compo">
            <td>{{compo.name}}</td>
            <td>{{Object.values(compo.template).length}}</td>
            <td>-</td>
            <td><button @click.prevent="editCompo(compo)" class="btn btn-primary">Edit</button></td>
            <td><button @click.prevent="removeCompo(compo)" class="btn btn-danger">X</button></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BasicCompos',
  data () {
    return {
      newCompo: []
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.getBasicCompos()
    }
  },
  computed: {
    ...mapState(['basicCompos'])
  },
  methods: {
    ...mapActions([
      'getBasicCompos',
      'createBasicCompo',
      'deleteBasicCompo'
    ]),
    addCompo () {
      const value = this.newCompo
      if (!value) {
        return
      }
      this.createBasicCompo(this.newCompo)
        .then(response => {
          this.newCompo = []
        })
    },
    removeCompo (compo) {
      this.deleteBasicCompo(compo)
    },
    editCompo (compo) {
      this.$router.replace(`/basic-compos/${compo.id}`)
    }
  }
}
</script>
