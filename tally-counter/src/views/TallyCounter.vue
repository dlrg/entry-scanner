<template>
  <main>
    <counter :value="ownCount" name="Selber"/>
  </main>
</template>

<script>
import Counter from '../components/Counter'

export default {
  components: {
    Counter
  },
  data () {
    return {
      ownCount: 20,
      globalCount: 300
    }
  }
}
</script>

<style>

</style>
