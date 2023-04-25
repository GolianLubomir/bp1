<template>
  <div>
    <div class="flex">
      <p class="text-xl text-slate-600 font-bold text-center pb-2 w-1/2">Description</p>
      <p class="text-xl text-slate-600 font-bold text-center pb-2 w-1/2">Instructions</p>
    </div>
    
    <div class="flex text-center pb-8 pt-6">
      <p class="w-1/2 px-16 text-lg border-r-2"> <span v-html="description.about"></span> </p>
      <p class="w-1/2 px-16 text-lg border-l-2"> <span v-html="description.instructions"></span> </p>
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

<style >
/*.highlight-text {
  text-slate-600 font-bold
}*/
</style>
