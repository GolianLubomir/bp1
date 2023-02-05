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
    setup(){
        const store = useStore();


        return {
            description: computed(() => store.state.game.data.description.mathReactions) 
        }
    }
}


</script>

<style>

</style>