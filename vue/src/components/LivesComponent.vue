<template>
  <div class="flex justify-end">
    <img
      v-for="n in lives"
      :key="n"
      src="../icon/heart.png"
      alt="heart"
      class="w-6 mx-1 mt-1"
    />
  </div>
</template>

<script>
export default {
  props: {
    lives: {
      type: Number,
      required: true,
    },
  },
};
</script>
