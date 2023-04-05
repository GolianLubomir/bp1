<template>
    <div>
        <p class="text-lg text-center py-2">Description</p>
        <p class="px-6"> {{description}} </p>
    </div>
</template>

<script >
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
    //name: "Description",
    computed: {
    description() {
      // get the current game name from the route
      const store = useStore();
      const router = useRouter();
      const gameName = router.currentRoute.value.name;
        console.log("game name: " + gameName);
      // get the description for the current game from the store
      const description = store.state.game.data.description[gameName];

      return description;
    },
    },
    /*setup(){
        const store = useStore();


        return {
            description: computed(() => store.state.game.data.description.mathReactions) 
        }
    }*/
}


</script>

<style>

</style>