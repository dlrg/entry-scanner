<template>
  <main @click="count">
    <counter class="counter" :value="ownCount" name="Selber"/>
    <counter class="counter" :value="ownCount" name="Selsssber"/>
    <stationSelect class="stationSelect"/>
  </main>
</template>

<script>
import Counter from '../components/Counter'
import StationSelect from '../components/StationSelect'

export default {
  components: {
    Counter,
    StationSelect
  },
  data () {
    return {
      ownCount: 20,
      globalCount: 300
    }
  },
  methods: {
    count () {
      navigator.vibrate(100)
    }
  }
}
</script>

<style scoped>
  main {
    height: 100%;
    background-color: #2980b9;
    font-family: Arial, Helvetica, sans-serif;
  }

  .stationSelect {
    position: absolute;
    bottom: 0
  }
</style>
