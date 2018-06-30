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
                code: '1',
                name: 'Basic'
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
                name: 'Basic'
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
