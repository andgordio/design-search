<template>
  <div class="bg-grey" id="d1">
    <!-- Header -->
    <div class="fixed pin-t pin-l w-screen bg-green z-20">
      <div class="max-w-md mx-auto flex items-center relative" style="height: 84px;">
        <div class="absolute pin-t pin-l text-2xl font-light" style="top: 29px; left: 16px;">
          <span class="text-green">{{searchInput}}</span>
          <span class="text-green-darker">{{suffix}}</span>
        </div>
        <div class="absolute w-full flex items-center">
          <!-- <div class="pl-6 w-12">
            <button v-if="searchResult.length === 501"><i class="ion-md-search text-2xl"></i></button>
            <button v-else @click="backFromSearchPressed()"><i class="ion-md-arrow-back text-2xl"></i></button>
          </div> -->
          <div class="flex-1">
            <input class="text-2xl py-3 px-6 w-full bg-transparent text-white font-light" type="text" name="" id="line0" tabindex="0" placeholder="Search..." v-model="searchInput" @keydown.enter="searchPressed()" @keydown.down="downPressedFrom(0)" @keydown.up="upPressedFrom(0)" @focus="searchInputFocused()" @blur="searchInputFocusLost()" @input="suffix = ''"> <!---->
          </div>
        </div>
      </div>
    </div>
    <!-- Suggestions -->
    <div class="fixed pin-l w-screen z-10 bg-green" style="top: 84px;" v-if="doShowSuggestions" @click="hideSuggestions()">
      <div class="max-w-md mx-auto flex items-center rounded-b">
        <div class="w-full text-green-darker">
          <div class="px-6 py-3 rounded-full hover:bg-green-dark cursor-pointer" v-for="(suggestion, i) in suggestions" :tabindex="i+1" :id="`line${i+1}`" :key="`sug-${i}`" @focus="suggestionFocused(suggestion)" @mouseover="suggestionFocused(suggestion)" @mouseout="searchInputFocused()" @click.stop="suggestionPressed(i)" @keydown.enter="suggestionPressed(i)" @keydown.down="downPressedFrom(i+1)" @keydown.up="upPressedFrom(i+1)">
            <span class="text-sm text-white">{{searchInputTemp || searchInput}}</span> in {{suggestion}}
          </div>
          <div class="px-6 py-3 hover:bg-green-dark cursor-pointer" v-for="(path, i) in suggestionsPaths" :tabindex="i+1+suggestions.length" :id="`line${i+1+suggestions.length}`" :key="`path-${i}`" @focus="pathFocused(path)" @mouseover="pathFocused(path)" @mouseout="searchInputFocused()" @click.stop="suggestionPathPressed(path)" @keydown.enter="suggestionPathPressed(path)" @keydown.down="downPressedFrom(i+1+suggestions.length)" @keydown.up="upPressedFrom(i+1+suggestions.length)">
            <span class="text-sm text-white">all</span> in {{path.name}}
          </div>
          <div class="px-6 py-3 hover:bg-green-dark cursor-pointer" v-if="searchResultTemp.length || suggestionsPaths.length" :tabindex="suggestions.length+1+suggestionsPaths.length" :id="`line${suggestions.length+1+suggestionsPaths.length}`" @focus="everywhereFocused()" @mouseover="everywhereFocused()" @mouseout="searchInputFocused()" @click.stop="searchPressed()" @keydown.enter="searchPressed()" @keydown.down="downPressedFrom(suggestions.length+1+suggestionsPaths.length)" @keydown.up="upPressedFrom(suggestions.length+1+suggestionsPaths.length)">
            <span class="text-sm text-white">{{searchInputTemp || searchInput}}</span> everywhere
          </div>
          <div v-else class="px-6 py-3">
            found nowhere :(
          </div>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="fixed pin-t pin-l w-screen h-screen overflow-scroll" @click="hideSuggestions()">
      <div class="mt-8 pt-8"></div>
      <div class="max-w-md min-h-screen mx-auto pt-8 px-4">
        <!-- <div v-if="selectedSuggestion" class="pb-6 text-2xl font-bold">{{selectedSuggestion}} <span @click="removeSelectedSuggestionPressed()"><i class="ion-md-close text-sm text-grey-light cursor-pointer py-2"></i></span></div> -->
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
      allCountries: null,
      allStates: null,
      allCities: null,
      searchResult: plantsjson,
      searchInput: '',
      searchInputTemp: '',
      doShowSuggestions: false,
      suggestionsType: null,
      suggestions: [],
      suggestionsPaths: [],
      selectedSuggestion: null,
      suffix: '',
      suffixTemp: ''
    }
  },
  computed: {
    searchResultTemp () {
      if (this.searchInput) return this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()))
      return this.plants
    }
  },
  methods: {
    //
    // EVENTS
    //
    searchInputFocused () {
      if (this.searchInput) this.doShowSuggestions = true
      // this.suffix = ''
      if (!this.suffixTemp) this.suffix = ''
      else this.suffix = this.suffixTemp
      if (this.searchInputTemp) {
        this.searchInput = this.searchInputTemp
        this.searchInputTemp = ''
      }
    },
    searchInputFocusLost () {
      // setTimeout(() => {
      //   this.doShowSuggestions = false
      // }, 100)
    },
    suggestionFocused (suggestion) {
      this.suffix = ` in ${suggestion}`
      if (this.searchInputTemp) {
        this.searchInput = this.searchInputTemp
        this.searchInputTemp = ''
      }
    },
    suggestionBlured (suggestion) {
      //
    },
    pathFocused (path) {
      if (!this.searchInputTemp) this.searchInputTemp = this.searchInput
      if (!this.suffixTemp) this.suffix = ''
      this.searchInput = path.name
      this.suffix = ''
    },
    everywhereFocused () {
      if (this.searchInputTemp) {
        this.searchInput = this.searchInputTemp
        this.searchInputTemp = ''
      }
      this.suffix = ` everywhere`
    },
    searchPressed () {
      if (!this.suffix) {
        this.doShowSuggestions = false
        this.suffix = ' everywhere'
        this.suffixTemp = ' everywhere'
        this.searchResult = this.searchResultTemp
        this.selectedSuggestion = null
        this.searchInputTemp = ''
        this.suggestItems()
        this.suggestPaths()
      } else {
        if (this.selectedSuggestion.parameter === 'area') {
          this.suggestionPressed(this.selectedSuggestion.index)
        } else if (this.selectedSuggestion.parameter === 'path') {
          this.suggestionPathPressed(this.selectedSuggestion.path)
        }
      }
      document.getElementById('line0').blur()
    },
    backFromSearchPressed () {
      this.searchInput = ''
      this.searchInputTemp = ''
      this.suffix = ''
      this.suffixTemp = ''
      this.searchResult = this.plants
      this.selectedSuggestion = null
    },
    suggestionPressed (index) {
      if (this.suggestionsType === 'countries') this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()) && plant.path.country === this.suggestions[index])
      if (this.suggestionsType === 'states') this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()) && plant.path.state === this.suggestions[index])
      if (this.suggestionsType === 'cities') this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()) && plant.path.city === this.suggestions[index])
      // this.searchInput = `${this.searchInput} in ${this.suggestions[index]}`
      this.suffix = ` in ${this.suggestions[index]}`
      this.suffixTemp = ` in ${this.suggestions[index]}`
      this.searchInputTemp = ''
      this.suggestItems()
      this.suggestPaths()
      this.selectedSuggestion = {parameter: 'area', type: this.suggestionsType, name: this.suggestions[index], index}
      setTimeout(() => {
        this.doShowSuggestions = false
      }, 0)
    },
    suggestionPathPressed (path) {
      const prefix = this.searchInput
      if (path.type === 'country') this.searchResult = this.plants.filter(plant => plant.path.country === path.name)
      if (path.type === 'state') this.searchResult = this.plants.filter(plant => plant.path.state === path.name)
      if (path.type === 'city') this.searchResult = this.plants.filter(plant => plant.path.city === path.name)
      this.suffix = path.name.slice(prefix.length)
      this.suffixTemp = path.name.slice(prefix.length)
      this.searchInputTemp = ''
      this.suggestItems()
      this.suggestPaths()
      this.selectedSuggestion = {parameter: 'path', path}
      setTimeout(() => {
        this.doShowSuggestions = false
      }, 0)
    },
    hideSuggestions () {
      this.suffix = this.suffixTemp
      this.doShowSuggestions = false
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
      else document.getElementById(`line${this.suggestions.length + this.suggestionsPaths.length + 1}`).focus()
    },
    removeSelectedSuggestionPressed () {
      if (this.searchInput) this.searchResult = this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()))
      else this.searchResult = this.plants
      this.selectedSuggestion = null
    },
    //
    // ACTIONS
    //
    suggestItems () {
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
    },
    suggestPaths () {
      // console.log(this.allCountries)
      // console.log(this.allStates)
      // console.log(this.allCities)
      this.suggestionsPaths = []
      for (let i in this.allCountries) {
        if (this.allCountries[i].toUpperCase().includes(this.searchInput.toUpperCase())) this.suggestionsPaths.push({type: 'country', name: this.allCountries[i]})
      }
      for (let i in this.allStates) {
        if (this.allStates[i].toUpperCase().includes(this.searchInput.toUpperCase())) this.suggestionsPaths.push({type: 'state', name: this.allStates[i]})
      }
      for (let i in this.allCities) {
        if (this.allCities[i].toUpperCase().includes(this.searchInput.toUpperCase())) this.suggestionsPaths.push({type: 'city', name: this.allCities[i]})
      }
      // console.log(this.suggestionsPaths)
    },
    populateAllCountries () {
      const countries = []
      for (let i in this.plants) {
        if (countries.length === 0) {
          countries.push(this.plants[i].path.country)
        } else {
          let isThere = false
          for (let j in countries) {
            if (countries[j] === this.plants[i].path.country) isThere = true
          }
          if (!isThere) countries.push(this.plants[i].path.country)
        }
      }
      this.allCountries = countries
    },
    populateAllStates () {
      const states = []
      for (let i in this.plants) {
        if (states.length === 0) {
          states.push(this.plants[i].path.state)
        } else {
          let isThere = false
          for (let j in states) {
            if (states[j] === this.plants[i].path.state) isThere = true
          }
          if (!isThere) states.push(this.plants[i].path.state)
        }
      }
      this.allStates = states
    },
    populateAllCities () {
      const cities = []
      for (let i in this.plants) {
        if (!this.plants[i].path.city) {
          //
        } else if (cities.length === 0) {
          cities.push(this.plants[i].path.city)
        } else {
          let isThere = false
          for (let j in cities) {
            if (cities[j] === this.plants[i].path.city) isThere = true
          }
          if (!isThere) cities.push(this.plants[i].path.city)
        }
      }
      this.allCities = cities
    }
  },
  watch: {
    searchInput () {
      if (this.searchInput && !this.searchInputTemp) {
        this.doShowSuggestions = true
        this.suggestItems()
        this.suggestPaths()
      } else if (!this.searchInput && !this.searchInputTemp) {
        this.doShowSuggestions = false
        // this.searchResult = plantsjson
      }
    }
  },
  created () {
    this.populateAllCountries()
    this.populateAllStates()
    this.populateAllCities()
  }
}
</script>

<style lang="scss" scoped>
#d1 {
  font-family: 'IBM Plex Serif', apple-system, Roboto, serif;
}
</style>
