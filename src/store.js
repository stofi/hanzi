import Vue from 'vue'
import Vuex from 'vuex'

const dictionary = require('./assets/dictionary.json')
const wordData = require('./assets/data.json')
const words = wordData.map(w => w.Chinese)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    characters: {
      ...dictionary,
    },
    words: [...words],
  },
  getters: {
    getCharaterEntry: () => char => dictionary[char],
    getWordEntry: state => word => {
      const index = state.words.findIndex(w => w.length > 1 && w.match(word))
      return index != -1 ? wordData[index] : null
    },
  },
  mutations: {},
  actions: {},
})
