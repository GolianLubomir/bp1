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
  /* Add your custom styles here, if needed */
  font-family: sans-serif; 
  height: 50px ;
  margin: 0;
}

/*.mathjax-container .mjx-chtml {
  font-family:  sans-serif !important;
  color : black;
}

.mjx-container .mjx-math .mjx-chtml{
  margin: 0 !important; 
}

.CtxtMenu_Attached_0{
    height: 50px;
    margin: 0 !important;
}

.MathJax{
    height: 50px; 
    margin: 0 !important;
}

.mjx-container .mjx-chtml {
  margin: 0 !important; 
  line-height: 1.2 !important; 
}*/
.mjx-container[jax="CHTML"][display="true"] {
  display: none !important; /* Change display to inline */
  margin: 0 !important; /* Set margin to 0 */
}
</style>
