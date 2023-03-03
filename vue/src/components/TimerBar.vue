<template>
  <div class="timer-bar" :style="{ width: widthprops }">
    <div class="bar" :style="{ width: barWidth }"></div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      required: true
    },
    widthprops: {
        type: String,
        default: "100%"
    }
  },
  data() {
    return {
      timerId: null,
      startTime: null,
      barWidth: '100%'
    }
  },
  
  
  methods: {
    /*startTimer(){
        this.startTime = new Date().getTime()
        this.timerId = setInterval(this.updateBar, 100)
    },*/
    updateBar() {
      const elapsedTime = new Date().getTime() - this.startTime
      const remainingTime = this.time * 1000 - elapsedTime
      const remainingPercentage = Math.max(0, (remainingTime / (this.time * 1000)) * 100)
      this.barWidth = `${remainingPercentage}%`
      if (remainingPercentage === 0) {
        clearInterval(this.timerId)
      }
    }
  },
  mounted() {
    this.startTime = new Date().getTime()
    this.timerId = setInterval(this.updateBar, 100)
  },
  beforeDestroy() {
    clearInterval(this.timerId)
  }
}
</script>

<style scoped>
.timer-bar {
  width: 75%;
  height: 10px;
  /*border: 1px solid black;*/
}

.bar {
  height: 100%;
  background-color: rgb(255, 255, 255);
  transition: 0.1s linear;
  border-radius: 10px;
}
</style>
