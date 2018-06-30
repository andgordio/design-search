<template>
  <div class="bg-grey">
    <!-- Header -->
    <div class="fixed pin-t pin-l w-screen border-b border-grey-light bg-white z-10">
      <div class="max-w-md mx-auto h-16 flex items-center">
        <div>
          <input class="text-2xl py-2" type="text" name="" id="" placeholder="Search..." v-model="searchInput">
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
      if (this.searchInput) return this.plants.filter(plant => plant.name.includes(this.searchInput))
      return this.plants
    }
  },
  watch: {
    searchResult () {
      setTimeout(() => {
        for (let i in this.searchResult) {
          if (this.searchInput) {
            const starting = this.searchResult[i].name.indexOf(this.searchInput)
            const ending = starting + this.searchInput.length
            if (document.getElementById(`name-${i}`)) document.getElementById(`name-${i}`).innerHTML = `${this.searchResult[i].name.slice(0, starting)}<span class="bg-green-lighter">${this.searchResult[i].name.slice(starting, ending)}</span>${this.searchResult[i].name.slice(ending)}`
          } else {
            if (document.getElementById(`name-${i}`)) document.getElementById(`name-${i}`).innerHTML = this.searchResult[i].name
          }
        }
      }, 50)
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
