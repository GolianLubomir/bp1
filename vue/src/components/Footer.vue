<template>
  <footer class="footer bg-white text-gray-600 py-6 mt-2">
    <div class="container mx-auto px-4">
      <div class="text-center block justify-around md:flex">
        <div>
          <p class="text-sm">
            &copy; {{ currentYear }} Ľubomír Golian. All rights reserved.
          </p>
          <p class="text-sm">Built with love using Vue.js</p>
          <p class="text-sm pt-3">
            Našiel si chybu? Daj mi vedieť:
            <a href="mailto:xgolianl@stuba.sk" class="text-blue-500"
              >xgolianl@stuba.sk</a
            >
          </p>
        </div>
        <div>
          <p class="text-sm pt-3 md:pt-0">Icons made by:</p>
          <p class="text-sm">
            <a
              class="hover:opacity-50"
              href="https://www.flaticon.com/authors/freepik"
              target="_blank"
              title="mathematics icons"
              >Mathematics icons created by Freepik - Flaticon</a
            >
          </p>
          <p class="text-sm">
            <a
              class="hover:opacity-50"
              href="https://www.flaticon.com/authors/rabit-jes"
              target="_blank"
              title="mathematics icons"
              >Mathematics icons created by Rabit Jes - Flaticon</a
            >
          </p>
          <p class="text-sm">
            <a
              class="hover:opacity-50"
              href="https://www.flaticon.com/authors/good-ware"
              target="_blank"
              title="calculus icons"
              >Calculus icons created by Good Ware - Flaticon</a
            >
          </p>
        </div>
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

<style scoped>
.icon-credit {
  margin-top: 1em;
}
.icon-sources {
  list-style-type: none;
}
.contact {
  margin-top: 1em;
}
</style>
