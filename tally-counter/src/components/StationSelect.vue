<template>
  <select>
    <option>Station 1</option>
    <option>Station 2</option>
    <option>Station 3</option>
  </select>
</template>

<script>
export default {
  props: {
    value: Number,
    name: String
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
