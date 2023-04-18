<template>
  <footer class="footer bg-white text-gray-600 py-2 mt-6">
    <div class="container mx-auto px-4">
      <div class="text-center ">
        <p class="text-sm">&copy; {{ currentYear }} Ľubomír Golian. All rights reserved.</p>
        <p class="text-sm">Built with love using Vue.js</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style>
.footer {
  /* Add your custom footer styles here */
}
</style>
