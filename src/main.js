// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from './backend/axios'

import './main.css'

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

const state = {
  currentUser: {},
  userCharacters: [],
  allCharacters: [],
  rosters: [],
  basicCompos: [],
  globalError: ''
}

const getters = {
  currentUser: state => {
    return state.currentUser || {}
    // if (localStorage.user) {
    //   return JSON.parse(localStorage.getItem('user'))
    // } else {
    //   return {}
    // }
  },
  globalError: state => state.globalError,
  userCharacters: state => state.userCharacters,
  rosters: state => state.rosters,
  basicCompos: state => state.basicCompos
}

const mutations = {
  initialiseStore (state) {
    if (localStorage.getItem('user')) {
      state.currentUser = JSON.parse(localStorage.getItem('user'))
    } else {
      state.currentUser = {}
    }
  },
  SET_GLOBAL_ERROR: (state, error) => {
    state.globalError = error
  },
  RESET_GLOBAL_ERROR: (state) => {
    state.globalError = ''
  },
  CONNECT_USER: (state, user) => {
    state.currentUser = user
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.csrf = user.csrf
    localStorage.signedIn = true
  },
  DISCONNECT_USER: (state) => {
    state.currentUser = {}
    delete localStorage.user
    delete localStorage.csrf
    delete localStorage.signedIn
  },
  SET_USER_CHARACTERS: (state, chars) => {
    state.userCharacters = chars
  },
  ADD_USER_CHARACTER: (state, char) => {
    state.userCharacters.push(char)
  },
  SET_CHARACTERS: (state, chars) => {
    state.allCharacters = chars
  },
  DELETE_USER_CHARACTER: (state, char) => {
    state.userCharacters.splice(state.userCharacters.indexOf(char), 1)
  },
  SET_ROSTERS: (state, rosters) => {
    state.rosters = rosters
  },
  ADD_ROSTER: (state, roster) => {
    state.rosters.push(roster)
  },
  UPDATE_ROSTER: (state, roster) => {
    state.rosters[state.rosters.indexOf(roster.id)] = roster
  },
  DELETE_ROSTER: (state, roster) => {
    state.rosters.splice(roster.indexOf(roster), 1)
  },
  SET_BASIC_COMPOS: (state, compos) => {
    state.basicCompos = compos
  },
  ADD_BASIC_COMPO: (state, compo) => {
    state.basicCompos.push(compo)
  },
  UPDATE_COMPO: (state, compo) => {
    state.rosters[state.basicCompos.indexOf(compo.id)] = compo
  },
  DELETE_BASIC_COMPO: (state, compo) => {
    state.basicCompos.splice(compo.indexOf(compo), 1)
  }
}

const actions = {
  signin: (store, user) => {
    store.commit('RESET_GLOBAL_ERROR')
    return plainAxiosInstance.post('/signin', {
      name: user.name,
      password: user.password
    })
      .then(response => {
        store.commit('CONNECT_USER', response.data)
      })
      .catch(error => {
        store.commit('SET_GLOBAL_ERROR', error.response.data.error)
      })
  },
  signup: (store, user) => {
    return plainAxiosInstance.post('/signup', {
      name: user.name,
      password: user.password,
      password_confirmation: user.password_confirmation
    }).then(response => {
      store.commit('CONNECT_USER', response.data)
    }).catch(error => {
      store.commit('DISCONNECT_USER')
      store.commit('SET_GLOBAL_ERROR', error.response.data.error)
    })
  },
  signout: (store) => {
    store.commit('RESET_GLOBAL_ERROR')
    return securedAxiosInstance.delete('/signout')
      .then(response => {
        store.commit('DISCONNECT_USER')
      })
      .catch(() => {
        store.commit('SET_GLOBAL_ERROR', 'Cannot sign out')
      })
  },
  getUserCharacters: (store) => {
    return securedAxiosInstance.get('/api/v1/characters')
      .then(response => {
        store.commit('SET_USER_CHARACTERS', response.data)
      })
      .catch(error => {
        store.commit('SET_GLOBAL_ERROR', error.response.data.error)
      })
  },
  getAllCharacters: (store) => {
    return securedAxiosInstance.get('/api/v1/characters/all')
      .then(response => {
        store.commit('SET_CHARACTERS', response.data)
      }).catch(error => {
        store.commit('SET_GLOBAL_ERROR', error.response.data.error || 'Cannot fetch all characters')
      })
  },
  createCharacter: (store, newCharacter) => {
    return securedAxiosInstance.post('/api/v1/characters', {
      character: {
        name: newCharacter.char.name,
        race: newCharacter.char.race,
        ch_class: newCharacter.char.ch_class,
        roles: newCharacter.roles
      }
    }).then(response => {
      store.commit('ADD_USER_CHARACTER', response.data)
    }).catch(error => {
      store.commit('SET_GLOBAL_ERROR', error.response || 'Cannot create the character')
    })
  },
  deleteUserCharacter: (store, character) => {
    return securedAxiosInstance.delete(`/api/v1/characters/${character.id}`)
      .then(response => {
        store.commit('DELETE_USER_CHARACTER', character)
      })
      .catch(error => {
        store.commit('SET_GLOBAL_ERROR', error.response.data.error || 'Cannot delete the character')
      })
  },
  getRosters: (store) => {
    return securedAxiosInstance.get('/api/v1/rosters')
      .then(response => {
        store.commit('SET_ROSTERS', response.data)
      })
      .catch(error => {
        store.commit('SET_GLOBAL_ERROR', error.response.data.error)
      })
  },
  createRoster: (store, roster) => {
    return securedAxiosInstance.post('/api/v1/rosters', {
      roster: {
        name: this.newroster.name
      },
      compo_id: this.newroster.compoId
    }).then(response => {
      store.commit('ADD_ROSTER', response.data)
    }).catch(error => {
      store.commit('SET_GLOBAL_ERROR', error.response.data.error)
    })
  },
  updateRosterSlot: (store, rosterSlot) => {
    return securedAxiosInstance.patch(`/api/v1/rosters/${rosterSlot.rosterId}/update_slot`, {
      slot_id: rosterSlot.currentSlotIdd,
      character_id: rosterSlot.selectedChar,
      role: rosterSlot.selectedRole,
      goal: rosterSlot.selectedGoal,
      ch_class: rosterSlot.selectedClass,
      roster_id: rosterSlot.rosterId
    }).then(response => {
      store.commit('UPDATE_ROSTER', response.data)
      return response
    }).catch(error => {
      store.commit('SET_GLOBAL_ERROR', error.response.data.error || 'Cannot update roster')
      throw new Error('Cannot update roster')
    })
  },
  deleteRoster: (store, roster) => {
    return securedAxiosInstance.delete(`/api/v1/rosters/${roster.id}`)
      .then(response => {
        store.commit('DELETE_ROSTER', roster)
      })
  },
  getBasicCompos: (store) => {
    return securedAxiosInstance.get('/api/v1/basic_compos')
      .then(response => {
        store.commit('SET_ROSTERS', response.data)
      })
      .catch(error => {
        store.commit('SET_GLOBAL_ERROR', error.response.data.error)
      })
  },
  createBasicCompo: (store, newCompo) => {
    return securedAxiosInstance.post('/api/v1/basic_compos', {
      basic_compo: {
        name: newCompo.name
      },
      size: newCompo.size
    }).then(response => {
      store.commit('ADD_BASIC_COMPO', response.data)
    }).catch(error => {
      store.commit('SET_GLOBAL_ERROR', error.response.data.error)
    })
  },
  updateCompoSlot: (store, compoSlot) => {
    return securedAxiosInstance.patch(`/api/v1/basic_compos/${compoSlot.compoId}/update_slot`, {
      slot_id: compoSlot.currentSlotId,
      ch_class: compoSlot.selectedClass,
      role: compoSlot.selectedRole,
      goal: compoSlot.selectedGoal
    }).then(response => {
      store.commit('UPDATE_COMPO', response.data)
      return response
    }).catch(error => {
      store.commit('SET_GLOBAL_ERROR', error.response.data.error || 'Cannot update roster')
      throw new Error('Cannot update basic compo')
    })
  },
  deleteBasicCompo: (store, compo) => {
    return securedAxiosInstance.delete(`/api/v1/basic_compos/${compo.id}`)
      .then(response => {
        store.commit('DELETE_BASIC_COMPO', compo)
      })
  }
}

let store = new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  beforeCreate () {
    this.$store.commit('initialiseStore')
    this.$store.dispatch('getAllCharacters')
  },
  template: '<App/>'
})
