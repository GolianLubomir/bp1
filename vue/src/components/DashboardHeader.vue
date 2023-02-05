<template>
  <div class=" flex h-full">
        <div class="mx-3">
            <div class="text-base text-3xl leading-none text-gray-700 whitespace-nowrap pt-3">
                {{ user.name }}
            </div>
            <div class="text-sm text-md leading-none text-gray-500 py-2">
                {{ user.email }}
            </div>
        </div>
        <div class="w-full h-full flex justify-end">
            <div class=" w-48 h-full relative">
                <p class="text-sm absolute right-6 top-2 font-bold text-red-600">-2%</p>
                <div class="rounded-full border-8 border-green-400 w-32 h-32 mx-auto mt-3 text-center">
                    
                    <p class="py-9 text-2xl text-red-500"> 85% </p>
                    
                </div>
                <p class="text-center font-bold text-gray-500"> Number Memory </p>
            </div>
            <div class=" w-48 h-full relative">
                <p class="text-sm absolute right-6 top-2 font-bold text-green-600">+8%</p>
                <div class="rounded-full border-8 border-green-400 w-32 h-32 mx-auto mt-3 text-center">
                    
                    <p class="py-9 text-2xl text-green-600"> 62% </p>
                    
                </div>
                <p class="text-center font-bold text-gray-500"> Reaction Time </p>
            </div>
            <div class=" w-48 h-full mr-12 relative">
                <p class="text-sm absolute right-6 top-2 font-bold text-red-600">-5%</p>
                <div class="rounded-full border-8 border-green-400 w-32 h-32 mx-auto mt-3 text-center">
                    
                    <p class="py-9 text-2xl text-red-500"> 43% </p>
                    
                </div>
                <p class="text-center font-bold text-gray-500"> Reaction Time </p>
            </div>
            <div class=" w-48 h-full">
                <div class="rounded-full border-8 border-cyan-300 w-36 h-36 mx-auto my-3 text-center">
                    <p class="pt-6 text-sm"> Training time: </p>
                    <p class="py-1 text-2xl"> 13:42:21 </p>
                    
                </div>
            </div>
        </div>

  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.state.user.data),
    };
  }
};
</script>

<style>

</style>