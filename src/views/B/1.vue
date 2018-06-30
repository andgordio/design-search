<template>
  <div class="bg-grey">
    <!-- Header -->
    <div class="fixed pin-t pin-l w-screen border-b border-grey-light bg-white z-20">
      <div class="max-w-md mx-auto h-16 flex items-center">
        <div class="w-full">
          <input class="text-2xl py-2 px-4 w-full" type="text" name="" id="" placeholder="Search..." v-model="searchInput" @keydown.enter="searchPressed()" @focus="searchInputFocused()">
        </div>
      </div>
    </div>
    <!-- Suggestions -->
    <div class="fixed pin-l w-screen z-10 bg-white" style="top: 64px;" v-if="doShowSuggestions">
      <div class="max-w-md mx-auto flex items-center border border-grey-light rounded-b">
        <div class="w-full">
          <div class="px-4 py-3 hover:bg-grey-lighter cursor-pointer" v-for="(suggestion, i) in suggestions" :key="`sug-${i}`" @click="suggestionPressed(i)">
            <span class="text-sm text-grey">search for {{searchInput}} in</span> {{suggestion}}
          </div>
          <div class="px-4 py-3 hover:bg-grey-lighter cursor-pointer" @click="searchPressed()">
            <span class="text-sm text-grey">search for {{searchInput}} everywhere</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="fixed pin-t pin-l w-screen h-screen overflow-scroll">
      <div class="mt-8 pt-8"></div>
      <div class="max-w-md min-h-screen mx-auto pt-8 px-4">
        <div v-for="(plant, i) in searchResult" :key="i" class="border border-grey-light rounded px-4 py-3 mb-3">
          <div class="text-lg font-semibold pb-2">{{plant.name}}</div>
          <div class="">{{plant.path.country}} / {{plant.path.state}}<span v-if="plant.path.city"> / {{plant.path.city}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import plantsjson from './../../assets/i2s-search.json'

export default {
  data () {
    return {
      plants: plantsjson,
      searchResult: plantsjson,
      searchInput: '',
      doShowSuggestions: false,
      suggestionsType: null,
      suggestions: []
    }
  },
  computed: {
    searchResultTemp () {
      if (this.searchInput) return this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()))
      return this.plants
    }
  },
  methods: {
    searchInputFocused () {
      if (this.searchInput) this.doShowSuggestions = true
    },
    searchPressed () {
      this.doShowSuggestions = false
      this.searchResult = this.searchResultTemp
    },
    suggestionPressed (index) {
      this.doShowSuggestions = false
      if (this.suggestionsType === 'countries') this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()) && plant.path.country === this.suggestions[index])
      if (this.suggestionsType === 'states') this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()) && plant.path.state === this.suggestions[index])
    }
  },
  watch: {
    searchInput () {
      if (this.searchInput) {
        this.doShowSuggestions = true
        const filteredResults = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()))
        let countries = []
        let states = []
        // let cities = []
        for (let i in filteredResults) {
          if (countries.length === 0) {
            countries.push(filteredResults[i].path.country)
          } else {
            let isThere = false
            for (let j in countries) {
              if (countries[j] === filteredResults[i].path.country) isThere = true
            }
            if (!isThere) countries.push(filteredResults[i].path.country)
          }
        }
        // console.log(countries.length)
        if (countries.length > 1) {
          this.suggestionsType = 'countries'
          this.suggestions = countries
        } else {
          for (let i in filteredResults) {
            if (states.length === 0) {
              states.push(filteredResults[i].path.state)
            } else {
              let isThere = false
              for (let j in states) {
                if (states[j] === filteredResults[i].path.state) isThere = true
              }
              if (!isThere) states.push(filteredResults[i].path.state)
            }
          }
          // if (countries.lenght > 1) {
          this.suggestionsType = 'states'
          this.suggestions = states
          // }
        }
        // filteredResults.map(item => {
        // })
      } else {
        this.doShowSuggestions = false
        // this.searchResult = plantsjson
      }
    }
  }
}
</script>

<style>

</style>
