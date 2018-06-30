<template>
  <div class="bg-grey">
    <!-- Header -->
    <div class="fixed pin-t pin-l w-screen border-b border-grey-light bg-white z-10">
      <div class="max-w-md mx-auto h-16 flex items-center">
        <div class="w-full">
          <input class="text-2xl py-2 w-full" type="text" name="" id="" placeholder="Search..." v-model="searchInput">
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="fixed pin-t pin-l w-screen h-screen overflow-scroll">
      <div class="mt-8 pt-8"></div>
      <div class="max-w-md min-h-screen mx-auto pt-8">
        <div v-for="(plant, i) in searchResult" :key="i" class="border border-grey-light rounded px-4 py-3 mb-3">
          <div class="text-lg font-semibold pb-2" :id="`name-${i}`"></div>
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
      searchInput: ''
    }
  },
  computed: {
    searchResult () {
      if (this.searchInput) return this.plants.filter(plant => plant.name.toUpperCase().includes(this.searchInput.toUpperCase()))
      return this.plants
    }
  },
  watch: {
    searchResult () {
      setTimeout(() => {
        for (let i in this.searchResult) {
          if (this.searchInput) {
            const queryIndexStart = this.searchResult[i].name.toUpperCase().indexOf(this.searchInput.toUpperCase())
            const queryIndexEnd = queryIndexStart + this.searchInput.length
            let wordIndexStart = null
            let wordIndexEnd = null
            if (queryIndexStart === 0) {
              wordIndexStart = 0
            } else {
              let stringBeforeQueryStart = this.searchResult[i].name.slice(0, queryIndexStart)
              let indexOfClosestSpace = stringBeforeQueryStart.lastIndexOf(' ')
              if (indexOfClosestSpace === -1) {
                wordIndexStart = 0
              } else {
                wordIndexStart = indexOfClosestSpace + 1
              }
            }
            if (queryIndexEnd === this.searchResult[i].name.length - 1) {
              wordIndexEnd = this.searchResult[i].name.length - 1
            } else {
              let stringAfterQueryEnds = this.searchResult[i].name.slice(queryIndexEnd)
              let indexOfClosestClosingSpace = stringAfterQueryEnds.indexOf(' ') + queryIndexEnd
              console.log(`colosest space: ${indexOfClosestClosingSpace}`)
              if (indexOfClosestClosingSpace === -1) {
                wordIndexEnd = this.searchResult[i].name.length - 1
              } else {
                wordIndexEnd = indexOfClosestClosingSpace
              }
            }
            console.log(`word end: ${wordIndexEnd}`)
            const innerHTML = `${this.searchResult[i].name.slice(0, wordIndexStart)}<span class="bg-yellow-light">${this.searchResult[i].name.slice(wordIndexStart, wordIndexEnd)}</span>${this.searchResult[i].name.slice(wordIndexEnd)}`
            if (document.getElementById(`name-${i}`)) document.getElementById(`name-${i}`).innerHTML = innerHTML
          } else {
            if (document.getElementById(`name-${i}`)) document.getElementById(`name-${i}`).innerHTML = this.searchResult[i].name
          }
        }
      }, 100)
    }
  },
  mounted () {
    for (let i in this.searchResult) {
      document.getElementById(`name-${i}`).innerHTML = this.searchResult[i].name
    }
  }
}
</script>

<style>

</style>
