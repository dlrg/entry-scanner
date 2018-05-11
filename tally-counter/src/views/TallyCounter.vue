<template>
  <section :class="{blink}" @transitionend="blink = false">
    <main @click="count">
      <counter :value="currentVisitors" name="Besucher aktuell"/>
      <counter :value="ownCount" name="Selber gezählte Besucher"/>
    </main>
    <stationSelect v-model="stationId" class="stationSelect"/>
  </section>
</template>

<script>
import Counter from '../components/Counter'
import StationSelect from '../components/StationSelect'
import { mapActions } from 'vuex'

export default {
  components: {
    Counter,
    StationSelect
  },
  data () {
    return {
      ownCount: 0,
      blink: false,
      stationId: null
    }
  },
  computed: {
    currentVisitors () {
      let currentVisitors = this.$store.getters['statistics/get']('currentVisitors')
      return currentVisitors ? currentVisitors.data : 0
    }
  },
  methods: {
    ...mapActions('entry', {
      enter: 'create'
    }),
    count () {
      const { stationId } = this
      if (stationId) {
        navigator.vibrate(100)
        this.blink = true
        this.ownCount++
        this.enter({
          stationId
        })
      }
    }
  },
  created () {
    this.$store.dispatch('statistics/get', 'currentVisitors')
  }
}
</script>

<style scoped>
  section {
    height: 100%;
    background-color: #2980b9;
    font-family: Arial, Helvetica, sans-serif;
    transition: 50ms background-color ease-in-out;
  }

  main {
    height: 100%;
  }

  * {
    touch-action: none;
  }

  .blink {
    background-color: #27ae60;
  }

  .stationSelect {
    position: absolute;
    bottom: 0
  }
</style>
