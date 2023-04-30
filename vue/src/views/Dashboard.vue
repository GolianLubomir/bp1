<template>
  <div class="py-6 px-6">
    <div
      class="h-56 max-w-screen-xl mx-auto border-2 border-gray-200 bg-slate-100 rounded-lg px-3 py-3"
    >
      <DashboardHeader> </DashboardHeader>
    </div>
    <div class="my-6 flex mx-auto max-w-screen-xl">
      <div
        class="w-32 h-fit mr-6 border-2 border-gray-200 bg-slate-100 rounded-lg hidden sm:block"
      >
        <div class="mx-4 my-4 w-24 h-24 rounded-lg bg-white">
          <router-link :to="'/training/mathreactions'" tag="a" class="">
            <img
              src="../icon/math-reaction-icon.png"
              alt="math-reaction-icon"
              class="h-20 mx-auto pt-2"
            />
          </router-link>
        </div>
        <div class="mx-4 my-4 w-24 h-24 rounded-lg bg-white">
          <router-link :to="'/training/numbermemory'" tag="a">
            <img
              src="../icon/number-memory-icon.png"
              alt="number-memory-icon"
              class="h-20 mx-auto pt-2"
            />
          </router-link>
        </div>
        <div class="mx-4 my-4 w-24 h-24 rounded-lg bg-white">
          <router-link :to="'/training/mathmemory'" tag="a">
            <img
              src="../icon/math-memory-icon.png"
              alt="math-memory-icon"
              class="h-20 mx-auto pt-2"
            />
          </router-link>
        </div>
        <div class="mx-4 my-4 w-24 h-24 rounded-lg bg-white">
          <router-link :to="'/training/findthesame'" tag="a">
            <img
              src="../icon/math-reaction-icon.png"
              alt="math-reaction-icon"
              class="h-20 mx-auto pt-2"
            />
          </router-link>
        </div>
        <div class="mx-4 my-4 w-24 h-24 rounded-lg bg-white">
          <router-link :to="'/training/graphs'" tag="a">
            <img
              src="../icon/graphs-icon.png"
              alt="graphs-icon"
              class="h-20 mx-auto pt-2"
            />
          </router-link>
        </div>
        <div class="mx-4 my-4 w-24 h-24 rounded-lg bg-white">
          <router-link :to="'/training/numbersystems'" tag="a">
            <img
              src="../icon/number-systems-icon.png"
              alt="number-systems-icon"
              class="h-20 mx-auto pt-2"
            />
          </router-link>
        </div>
      </div>
      <div class="w-full">
        <div class="ml-0 bg-slate-100 border-2 border-gray-200 flex rounded-lg">
          <div
            class="grid grid-cols-1 gap-0 w-9/10 mx-auto md:grid-cols-2 lg:grid-cols-3"
          >
            <div
              class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"
            >
              <router-link :to="'/training/numbermemory'">
                <StatsTileComponent
                  title="Math Reactions"
                  linkTo="MathReactions"
                  :points="score['MathReactions'].best"
                  :percentil="[score['MathReactions'].percentile]"
                >
                </StatsTileComponent>
              </router-link>
            </div>
            <div
              class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"
            >
              <StatsTileComponent
                title="Number Memory"
                linkTo="NumberMemory"
                :points="score['NumberMemory'].best"
                :percentil="[score['NumberMemory'].percentile]"
              >
              </StatsTileComponent>
            </div>
            <div
              class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"
            >
              <StatsTileComponent
                title="Math Memory"
                linkTo="MathMemory"
                :points="score['MathMemory'].best"
                :percentil="[score['MathMemory'].percentile]"
              >
              </StatsTileComponent>
            </div>
            <div
              class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"
            >
              <StatsTileComponent
                title="Find the Same"
                linkTo="FindTheSame"
                :points="score['FindTheSame'].best"
                :percentil="[score['FindTheSame'].percentile]"
              >
              </StatsTileComponent>
            </div>
            <div
              class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"
            >
              <StatsTileComponent
                title="Graphs"
                linkTo="Graphs"
                :points="score['Graphs'].best"
                :percentil="[score['Graphs'].percentile]"
              >
              </StatsTileComponent>
            </div>
            <div
              class="mx-4 my-4 w-content h-80 rounded-lg tile-shadow bg-white"
            >
              <StatsTileComponent
                title="Number Systems"
                linkTo="NumberSystems"
                :points="score['NumberSystems'].best"
                :percentil="[score['NumberSystems'].percentile]"
              >
              </StatsTileComponent>
            </div>
          </div>
        </div>
        <div
          class="w-full h-96 my-6 border-2 border-gray-200 bg-slate-100 rounded-lg"
        >
          <div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
import StatsTileComponent from "../components/StatsTileComponent.vue";
import DashboardHeader from "../components/DashboardHeader.vue";
import Icon from "../components/Icon.vue";
import TimerBar from "../components/TimerBar.vue";
import { computed, onMounted } from "vue";

import store from "../store";

export default {
  components: {
    PageComponent,
    StatsTileComponent,
    DashboardHeader,
    Icon,
    TimerBar,
  },

  created() {
    //this.$store.dispatch('fetchScores');

    store.dispatch("fetchScores");
    store.dispatch("getSpentTime");
  },

  setup() {
    return {
      score: computed(() => store.state.user.scores),
    };
  },
};
</script>

<style>
.tile-shadow {
  box-shadow: 6px -3px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
}

.tile-shadow:hover {
  box-shadow: 3px 3px 20px rgba(59, 59, 59, 0.3);
  transform: translate3d(0px, -5px, 0px);
}
</style>
