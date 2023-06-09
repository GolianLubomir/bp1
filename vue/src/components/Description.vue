<template>
  <div>
    <div class="content">
      <div
        ref="textContent"
        :class="{ gradient: !expanded }"
        class="text-container"
        :style="{ maxHeight: expanded ? 'none' : '170px' }"
      >
        <div class="lg:flex">
          <div class="lg:w-1/2 lg:border-r-2">
            <p class="text-xl text-slate-600 font-bold text-center pb-2 w-full">
              Popis
            </p>
            <p class="w-full text-center px-16 text-lg">
              <span v-html="description.about"></span>
            </p>
          </div>

          <div class="lg:w-1/2 lg:border-l-2 pt-10 lg:pt-0">
            <p class="text-xl text-slate-600 font-bold text-center pb-2 w-full">
              Inštrukcie
            </p>
            <p class="w-full text-center px-16 text-lg">
              <span v-html="description.instructions"></span>
            </p>
          </div>
        </div>
      </div>

      <button
        @click="toggleExpanded"
        class="read-more-button w-full pt-8 text-lg font-medium text-gray-500 hover:text-teal-600"
      >
        {{ expanded ? "Zbaliť" : "Rozbaliť" }}
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "Description",
  mounted() {
    const store = useStore();
    const router = useRouter();

    const gameName = router.currentRoute.value.name;
    const description = store.state.game.data.description[gameName];
    this.description = description;
  },
  data() {
    return {
      description: "",
      expanded: false,
    };
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
      if (!this.expanded) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },
};
</script>

<style>
.text-container {
  overflow: hidden;
  position: relative;
}

.gradient {
  mask-image: linear-gradient(to bottom, black 75%, transparent);
}
</style>
