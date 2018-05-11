<template>
  <select :value="value" @change="$emit('input', $event.target.value)">
    <option :value="undefined" hidden disabled>Keine Station ausgewählt</option>
    <option v-for="station of stations" :key="station._id" :value="station._id">{{ station.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'StationSelect',
  props: ['value'],
  computed: {
    stations () {
      return this.$store.getters['station/list']
    }
  },
  created () {
    this.$store.dispatch('station/find')
  }
}
</script>

<style lang="scss" scoped>
  select {
    padding: 1.5em;
    width: 100%;
    background-color: #fff;
  }
</style>
