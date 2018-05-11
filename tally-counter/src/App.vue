<template>
  <section class="section-app">
    <router-view v-if="connection"/>
    <error message="Leider haben wir gerade keine Verbindung"/>
  </section>
</template>

<script>
import store from './store'
import Error from './components/Error'

export default {
  components: {
    Error
  },
  computed: {
    connection: () => store.state.connection
  }
}
</script>

<style lang="scss">

  html, body, .section-app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
  }
</style>
