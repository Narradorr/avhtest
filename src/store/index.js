import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    structure: null
  },
  mutations: {
    setStructure(state, data) {
      state.structure = data
    },
    removeSeed(state, seed) {
      console.log(state.structure);
      console.log("delete");
      console.log(state.structure, seed);
    }
  },
  actions: {
    async getStructure({ commit }) {
      axios.get('divisions.json').then(res => {
        commit('setStructure', res.data)
      })

    },
    async removeSeed({ commit }, seed) {
      commit('removeSeed', seed)
    }
  },
  modules: {
  }
})
