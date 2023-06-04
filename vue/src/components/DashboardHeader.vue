<template>
  <div class="h-full text-center sm:text-left sm:flex">
    <div class="px-4 sm:border-r-2">
      
      <div
        class="text-base text-xl font-semibold sm:font-normal sm:text-3xl leading-none text-gray-700 whitespace-nowrap pt-3"
      >
        {{ user.name }}
      </div>
      <div class="text-sm leading-none text-gray-500 py-2">
        {{ user.email }}
      </div>
    </div>

    <div class="w-full h-full ml-6 hidden overflow-auto xl:block">
      <div class="mx-6 my-3">
        <ul>
          <li class="flex pb-1">
            <img src="../icon/math-reaction-icon.png" width="25" alt="" />
            <p class="pl-2 pr-10 font-bold text-gray-700 w-56">Matematické reakcie</p>
             <span class="font-bold text-gray-700 w-8">#{{ score['MathReactions'].standing }}</span> 
             <span class=" pl-2 text-gray-700"> / {{ score['MathReactions'].total }}</span> 
          </li>
          <li class="flex pb-1">
            <img src="../icon/number-memory-icon.png" width="25" alt="" />
            <p class="pl-2 pr-10 font-bold text-gray-700 w-56">Číselná pamäť</p>
             <span class="font-bold text-gray-700 w-8">#{{ score['NumberMemory'].standing }}</span> 
             <span class=" pl-2 text-gray-700"> / {{ score['NumberMemory'].total }}</span> 
          </li>
          <li class="flex pb-1">
            <img src="../icon/math-memory-icon.png" width="25" alt="" />
            <p class="pl-2 pr-10 font-bold text-gray-700 w-56">Matematická pamäť</p>
             <span class="font-bold text-gray-700 w-8">#{{ score['MathMemory'].standing }}</span> 
             <span class=" pl-2 text-gray-700"> / {{ score['MathMemory'].total }}</span> 
          </li>
          <li class="flex pb-1">
            <img src="../icon/find-the-same-icon.png" width="25" alt="" />
            <p class="pl-2 pr-10 font-bold text-gray-700 w-56">Nájdi rovnaké</p>
             <span class="font-bold text-gray-700 w-8">#{{ score['FindTheSame'].standing }}</span> 
             <span class=" pl-2 text-gray-700"> / {{ score['FindTheSame'].total }}</span> 
          </li>
          <li class="flex pb-1">
            <img src="../icon/graphs-icon.png" width="25" alt="" />
            <p class="pl-2 pr-10 font-bold text-gray-700 w-56">Grafy</p>
             <span class="font-bold text-gray-700 w-8">#{{ score['Graphs'].standing }}</span> 
             <span class=" pl-2 text-gray-700"> / {{ score['Graphs'].total }}</span> 
          </li>
          <li class="flex">
            <img src="../icon/number-systems-icon.png" width="25" alt="" />
            <p class="pl-2 pr-10 font-bold text-gray-700 w-56">Číselné sústavy</p>
             <span class="font-bold text-gray-700 w-8">#{{ score['NumberSystems'].standing }}</span> 
             <span class=" pl-2 text-gray-700"> / {{ score['NumberSystems'].total }}</span> 
          </li>
        </ul>
      </div>
    </div>

    <div class="w-fit mx-auto flex sm:w-full sm:justify-end">
      <div class=" ">
        <TrainingTimeComponent
          :seriesprops1="[
            activity && activity.MathReactions
              ? activity.MathReactions.weeklyActivity
              : 0,
            activity && activity.NumberMemory
              ? activity.NumberMemory.weeklyActivity
              : 0,
            activity && activity.MathMemory
              ? activity.MathMemory.weeklyActivity
              : 0,
          ]"
          :seriesprops2="[
            activity && activity.FindTheSame
              ? activity.FindTheSame.weeklyActivity
              : 0,
            activity && activity.Graphs ? activity.Graphs.weeklyActivity : 0,
            activity && activity.NumberSystems
              ? activity.NumberSystems.weeklyActivity
              : 0,
          ]"
        ></TrainingTimeComponent>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import TrainingTimeComponent from "./TrainingTimeComponent.vue";
import ActivityComponent from "./ActivityComponent.vue";

export default {
  components: {
    TrainingTimeComponent,
    XMarkIcon,
    ActivityComponent,
  },

  setup() {
    const store = useStore();

    return {
      user: computed(() => store.state.user.data),
      score: computed(() => store.state.user.scores),
      activity: computed(() => store.state.user.activity),
    };
  },
};
</script>

<style></style>
