<template>
  <div>
    <p class="text-lg text-center py-2">Description</p>
    <p class="px-6">{{ description }}</p>
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
    console.log(gameName);
    const description = store.state.game.data.description[gameName];
    console.log("mounted: " + description);
    this.description = description;
  },
  data() {
    return {
      description: "",
    };
  },
};
</script>
