<template>
  <div class="bg-grey">
    <!-- Header -->
    <div class="fixed pin-t pin-l w-screen border-b border-grey-light bg-white z-20">
      <div class="max-w-md mx-auto h-16 flex items-center">
        <div class="w-full">
          <input class="text-2xl py-2 px-4 w-full" type="text" name="" id="line0" tabindex="0" placeholder="Search..." v-model="searchInput" @keydown.enter="searchPressed()" @keydown.down="downPressedFrom(0)" @keydown.up="upPressedFrom(0)" @focus="searchInputFocused()" @blur="searchInputFocusLost()">
        </div>
      </div>
    </div>
    <!-- Suggestions -->
    <div class="fixed pin-l w-screen z-10 bg-white" style="top: 64px;" v-if="doShowSuggestions">
      <div class="max-w-md mx-auto flex items-center border border-grey-light rounded-b">
        <div class="w-full">
          <div class="px-4 py-3 hover:bg-grey-lighter cursor-pointer" v-for="(suggestion, i) in suggestions" :tabindex="i+1" :id="`line${i+1}`" :key="`sug-${i}`" @click="suggestionPressed(i)" @keydown.enter="suggestionPressed(i)" @keydown.down="downPressedFrom(i+1)" @keydown.up="upPressedFrom(i+1)">
            <span class="text-sm text-grey">search for {{searchInput}} in</span> {{suggestion}}
          </div>
          <div class="px-4 py-3 hover:bg-grey-lighter cursor-pointer" v-if="searchResultTemp.length" :tabindex="suggestions.length+1" :id="`line${suggestions.length+1}`" @click="searchPressed()" @keydown.enter="searchPressed()" @keydown.down="downPressedFrom(suggestions.length+1)" @keydown.up="upPressedFrom(suggestions.length+1)">
            <span class="text-sm text-grey">search for {{searchInput}} everywhere</span>
          </div>
          <div v-else class="px-4 py-3">
            found nowhere :(
          </div>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="fixed pin-t pin-l w-screen h-screen overflow-scroll">
      <div class="mt-8 pt-8"></div>
      <div class="max-w-md min-h-screen mx-auto pt-8 px-4">
        <div v-if="selectedSuggestion" class="pb-6 text-2xl font-bold">{{selectedSuggestion}} <span @click="removeSelectedSuggestionPressed()"><i class="ion-md-close text-sm text-grey-light cursor-pointer py-2"></i></span></div>
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
      suggestions: [],
      selectedSuggestion: null
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
    searchInputFocusLost () {
      // setTimeout(() => {
      //   this.doShowSuggestions = false
      // }, 100)
    },
    searchPressed () {
      this.doShowSuggestions = false
      this.searchResult = this.searchResultTemp
      document.getElementById('line0').blur()
    },
    suggestionPressed (index) {
      console.log(index)
      this.doShowSuggestions = false
      if (this.suggestionsType === 'countries') this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()) && plant.path.country === this.suggestions[index])
      if (this.suggestionsType === 'states') this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()) && plant.path.state === this.suggestions[index])
      if (this.suggestionsType === 'cities') this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()) && plant.path.city === this.suggestions[index])
      this.selectedSuggestion = this.suggestions[index]
    },
    downPressedFrom (index) {
      if (document.getElementById(`line${index + 1}`)) document.getElementById(`line${index + 1}`).focus()
      else {
        setTimeout(() => {
          document.getElementById(`line0`).selectionStart = 10000
          document.getElementById(`line0`).selectionEnd = 10000
          document.getElementById(`line0`).focus()
        }, 0)
      }
    },
    upPressedFrom (index) {
      if (index === 1) {
        setTimeout(() => {
          document.getElementById(`line0`).selectionStart = 10000
          document.getElementById(`line0`).selectionEnd = 10000
          document.getElementById(`line0`).focus()
        }, 0)
      } else if (index !== 0) document.getElementById(`line${index - 1}`).focus()
      else document.getElementById(`line${this.suggestions.length + 1}`).focus()
    },
    removeSelectedSuggestionPressed () {
      this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()))
      this.selectedSuggestion = null
    }
  },
  watch: {
    searchInput () {
      if (this.searchInput) {
        this.doShowSuggestions = true
        const filteredResults = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()))
        let countries = []
        let states = []
        let cities = []
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
          if (states.length > 1) {
            this.suggestionsType = 'states'
            this.suggestions = states
          } else {
            for (let i in filteredResults) {
              if (cities.length === 0) {
                cities.push(filteredResults[i].path.city)
              } else {
                let isThere = false
                for (let k in cities) {
                  if (cities[k] === filteredResults[i].path.city) isThere = true
                }
                if (!isThere) cities.push(filteredResults[i].path.city)
              }
            }
            if (cities.length > 1) {
              this.suggestionsType = 'cities'
              this.suggestions = cities
            } else if (states.length > 1) {
              this.suggestionsType = 'states'
              this.suggestions = states
            } else {
              this.suggestionsType = 'countries'
              this.suggestions = countries
            }
          }
        }
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
