<template>
  <div></div>
</template>

<script>
export default {
  props: {
    startMeasurement: Boolean,
    stopMeasurement: Boolean,
  },
  data() {
    return {
      startTime: 0,
      endTime: 0,
    };
  },
  methods: {
    start() {
      this.startTime = Date.now();
    },
    stop() {
      this.endTime = Date.now();
      const timeSpent = Math.round((this.endTime - this.startTime) / 1000);
      this.$emit("time-spent", timeSpent);
    },
  },
  watch: {
    startMeasurement(newVal) {
      if (newVal) {
        this.start();
      }
    },
    stopMeasurement(newVal) {
      if (newVal) {
        this.stop();
      }
    },
  },
};
</script>
