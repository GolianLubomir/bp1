<template>
  <div>
    <div class="content">
      <div ref="textContent" :class="{ 'gradient': !expanded }" class="text-container" :style="{ maxHeight: expanded ? 'none' : '170px' }">
        <div class="flex">
          <p class="text-xl text-slate-600 font-bold text-center pb-2 w-1/2">Description</p>
          <p class="text-xl text-slate-600 font-bold text-center pb-2 w-1/2">Instructions</p>
        </div>
        
        <div class="flex text-center pb-8 pt-6">
          <p class="w-1/2 px-16 text-lg border-r-2"> <span v-html="description.about"></span> </p>
          <p class="w-1/2 px-16 text-lg border-l-2"> <span v-html="description.instructions"></span> </p>
        </div>
      </div>


      <button @click="toggleExpanded" class="read-more-button w-full pt-8 text--600 text-lg font-medium text-teal-700 hover:text-teal-600">
          {{ expanded ? 'Read Less' : 'Read More' }}
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
    console.log(gameName);
    const description = store.state.game.data.description[gameName];
    console.log("mounted: " + description);
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
        /*this.$nextTick(() => {
          const element = this.$refs.textContent;
          //const top = element.getBoundingClientRect().top + window.pageYOffset - element.clientTop;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });*/
      }
    }
  }
};
</script>

<style >
.text-container {
  overflow: hidden;
  position: relative;
}

.gradient {
  mask-image: linear-gradient(to bottom, black 75%, transparent);
}
</style>
