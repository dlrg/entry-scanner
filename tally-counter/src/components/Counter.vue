<template>
  <div class="counter">
    <h1 class="counter__value">{{value}}</h1>
    <p class="counter__name">{{name}}</p>
  </div>
</template>

<script>
export default {
  props: {
    value: Number,
    name: String
  }
}
</script>

<style>

</style>
