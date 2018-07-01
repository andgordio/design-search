<template>
  <div id="app">
    <router-view/>
    <PrototypeManager :managerProps="managerProps"/>
  </div>
</template>

<script>
import PrototypeManager from './components/PrototypeManager'

export default {
  components: {
    PrototypeManager
  },
  name: 'app',
  data () {
    return {
      toggleManager: false,
      managerProps: {
        name: 'prototypeName',
        description: 'prototypeDescription',
        author: 'prototypeAuthor',
        website: 'authorWebsite',
        // todo: allow to define FAB style — fab: 'white' // options: 'white', 'transparent', 'transparent-dark'
        date: 'prototypeDate',
        iterations: [
          {
            code: 'B',
            name: 'Suggestions',
            versions: [
              {
                code: '3',
                name: 'Navigation around paths'
              },
              {
                code: '2',
                name: 'Navigation with arrows'
              },
              {
                code: '1',
                name: 'Basic suggestions'
              }
            ]
          },
          {
            code: 'A',
            name: 'Search as a Filter',
            versions: [
              {
                code: '3',
                name: 'Highlight word'
              },
              {
                code: '2',
                name: 'Highlight query'
              },
              {
                code: '1',
                name: 'Basic filter'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
</style>
