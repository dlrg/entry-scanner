<template>
  <div>
    Total: {{ entriesToday.length }}
    Eingang: {{ entriesEingang.length }}
    Ausgang: {{ entriesAusgang.length }}
    Differenz: {{ entriesEingang.length - entriesAusgang.length }}
  </div>
</template>

<script>
function isToday(td) {
  let d = new Date();
  return (
    td.getDate() == d.getDate() &&
    td.getMonth() == d.getMonth() &&
    td.getFullYear() == d.getFullYear()
  );
}
export default {
  name: "App",
  computed: {
    entries() {
      return this.$store.getters["entry/list"];
    },
    entriesToday() {
      return this.entries.filter(entry => isToday(new Date(entry.createdAt)));
    },
    entriesEingang() {
      return this.entriesToday.filter(
        entry => entry.direction === "SCANNER-EINGANG"
      );
    },
    entriesAusgang() {
      return this.entriesToday.filter(
        entry => entry.direction === "SCANNER-AUSGANG"
      );
    }
  },
  created() {
    this.$store.dispatch("entry/find");
  }
};
</script>

<style lang="scss">
</style>
