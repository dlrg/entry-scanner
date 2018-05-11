<template>
  <div>
    <p>
      Eingang: {{ entriesEingang.length }}
      Ausgang: {{ entriesAusgang.length }}
      Differenz: {{ entriesEingang.length - entriesAusgang.length }}
    </p>
    <line-chart :data="lineData"/>
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
import timebucket from "timebucket";
export default {
  name: "App",
  computed: {
    entries() {
      return this.$store.getters["entry/list"].map(entry => {
        let station = this.$store.getters["station/get"](entry.stationId);
        if (!station) return entry;
        return { ...entry, direction: station.direction };
      });
    },
    entriesToday() {
      return this.entries; //.filter(entry => isToday(new Date(entry.createdAt)));
    },
    entriesEingang() {
      return this.entriesToday.filter(entry => entry.direction === 1);
    },
    entriesAusgang() {
      return this.entriesToday.filter(entry => entry.direction === -1);
    },
    lineData() {
      let dataEingang = {};
      for (let entry of this.entriesEingang) {
        if (!entry.createdAt) continue;
        let bucket = timebucket("m", new Date(entry.createdAt)).toDate();
        if (!dataEingang[bucket]) dataEingang[bucket] = 0;
        dataEingang[bucket]++;
      }
      let dataAusgang = {};
      for (let entry of this.entriesAusgang) {
        if (!entry.createdAt) continue;
        let bucket = timebucket("m", new Date(entry.createdAt)).toDate();
        if (!dataAusgang[bucket]) dataAusgang[bucket] = 0;
        dataAusgang[bucket]--;
      }
      let dataTotal = {};
      let bucketData = {};

      for (let entry of this.entries) {
        if (!entry.createdAt) continue;
        let bucket = timebucket("m", new Date(entry.createdAt)).toDate();
        if (!bucketData[bucket]) bucketData[bucket] = 0;
        bucketData[bucket] += entry.direction;
      }
      let cur = 0;
      Object.keys(bucketData)
        .sort((a, b) => (a > b ? 1 : -1))
        .forEach(key => {
          cur += bucketData[key];
          dataTotal[key] = cur;
        });
      return [
        {
          name: "Eingang",
          data: dataEingang
        },
        {
          name: "Ausgang",
          data: dataAusgang
        },
        {
          name: "Total",
          data: dataTotal
        }
      ];
    }
  },
  created() {
    this.$store.dispatch("entry/find");
    this.$store.dispatch("station/find");
  }
};
</script>

<style lang="scss">
</style>
