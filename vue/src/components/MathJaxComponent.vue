<template>
  <div ref="mathContainer" class="mathjax-container"></div>
</template>

<script>
export default {
  name: "MathJaxComponent",
  props: {
    expression: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.renderMath();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.renderMath();
    });
  },
  methods: {
    renderMath() {
      if (typeof window.MathJax === "undefined") {
        setTimeout(() => {
          this.renderMath();
        }, 50);
      } else {
        this.$refs.mathContainer.innerHTML = this.expression;
        window.MathJax.typesetClear();
        window.MathJax.typesetPromise([this.$refs.mathContainer]).catch((err) =>
          console.error("Error typesetting math:", err)
        );
      }
    },
  },
};
</script>

<style scoped>
.mathjax-container {
  font-family: sans-serif;
  height: 50px;
  margin: 0;
}

.mjx-container[jax="CHTML"][display="true"] {
  display: none !important;
  margin: 0 !important;
}
</style>
