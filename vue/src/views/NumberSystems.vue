<template>
  <div class="pb-1">
    <div class="h-2.5">
        <TimerBar v-if="trainRunning" :time="timeToSolve" :widthprops="'100%'"> </TimerBar>
    </div>
    

    <span
      v-if="trainRunning || trainingEnded"
      @click="leaveTrain"
      class="absolute pt-6 right-5"
    >
      <XMarkIcon
        class="block h-8 w-8 border border-gray-600 rounded-full p-1 text-gray-600 transition duration-300 ease-in-out hover:rounded-lg cursor-pointer"
      />
    </span>

    <div class="h-96 pt-10  mb-20">
      <div v-if="intro" class="h-96">
        <div class="py-2 text-center">
          <h1 class="text-5xl text-white">Number systems conversions</h1>
        </div>
        <div class="py-6 text-center">
          <h1 class="text-xl text-white">
            Convert numbers in any system .
          </h1>
          <h1 class="text-xl text-white">
            We will measure how many conversions you can do.
          </h1>
          <button
              @click="startTrain"
              class="border rounded-full mt-20 px-2 py-2 bg-white font-bold text-gray-600 myButtonShadow hover:text-amber-600"
          >
              Click here to start.
          </button>
        </div>
      </div>

      <div v-if="trainRunning">
        <div class="flex pt-10 pb-0 justify-center">
          <NumSysInputComponent @update-score="updateScore">
          </NumSysInputComponent>
          <NumSysInputComponent @update-score="updateScore">
          </NumSysInputComponent>
          <NumSysInputComponent @update-score="updateScore">
          </NumSysInputComponent>
        </div>
        <p class="text-white text-2xl">Score: {{ score }}</p>
      </div>

      <div>
        <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
          <div class="text-2xl text-white text-center">
            <p>Your score in 1 minute is</p>
          </div>
        </div>

        <div v-if="trainingEnded" class="w-full h-80">
          <div class="text-4xl text-white text-center py-9">
            <p>{{ score }}</p>
            <p class="text-2xl pt-6">conversions.</p>
          </div>
          <div class="text-lg text-white text-center py-6">
            <button
                  @click="startTrain"
                  
                  class="inline-block bg-white mx-3 hover:text-amber-600 text-gray-600 myButtonShadow font-bold py-1 px-4 rounded-full"
                  >
                  Try again!
              </button>
              <button
                  @click="saveScore"
                  :disabled="scoreSaved"
                  class="inline-block bg-white mx-3 hover:text-amber-600 text-gray-600 myButtonShadow font-bold py-1 px-4 rounded-full"
                  >
                  <p v-if="!scoreSaved">Save score</p>
                  <p v-if="scoreSaved">Score saved</p>
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import NumSysInputComponent from "../components/NumSysInputComponent.vue";
import TimerBar from "../components/TimerBar.vue";
import { reactive, toRefs } from "vue";
import { ref, computed, watch, onMounted } from "vue";
import store from "../store"

export default {
  components: {
    NumSysInputComponent,
    XMarkIcon,
    TimerBar,
  },

  setup() {
    const startTime = ref(0);
    const endTime = ref(0);
    const running = ref(false);
    let intervalId = null;
    const time = ref(0);
    //let score = ref(0);

    /*const stopwatch = computed(() => {
      if (running.value) {
        return (Date.now() - startTime.value) / 1000;
      } else {
        return (endTime.value - startTime.value) / 1000;
      }
    });

    const startStopwatch = () => {
      running.value = true;
      startTime.value = Date.now();
      intervalId = setInterval(() => {
        stopwatch.value;
      }, 10);
    };

    const stopStopwatch = () => {
      running.value = false;
      endTime.value = Date.now();
      clearInterval(intervalId);
    };*/

    const state = reactive({
      trainingEnded: false,
      trainRunning: false,
      intro: true,
      scoreSaved: false,

    });

    const data = reactive({
        score: 0,
        timeToSolve: 120,
    });

    const startTrain = () => {
      data.score = 0;
      state.trainRunning = true;
      state.intro = false;
      state.trainingEnded = false;
      state.scoreSaved = false;
      training();
    };

    const stopTrain = () => {
      state.trainRunning = false;
      state.intro = false;
      state.trainingEnded = true;
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      state.intro = true;
      state.trainingEnded = false;

    };

    const training = () => {
      //startStopwatch();
      setTimeout(() => {
            stopTrain()
        }, data.timeToSolve * 1000);
    };

    const updateScore = () => {
        console.log("parent updateScore")
        data.score += 1

    };

    const saveScore = () => {
      const score = {
          game_id: 6,
          score: data.score
      }

      store.dispatch('addScore', score);
      state.scoreSaved = true;
    }


    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      updateScore,
      saveScore,
    };
  },

  mounted() {
      window.scrollTo(0, 0);
  }
};
</script>

<style></style>

<!--<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import NumSysInputComponent from '../components/NumSysInputComponent.vue'
import TimerBar from "../components/TimerBar.vue"

export default {
    components:{
        NumSysInputComponent,
        XMarkIcon,
        TimerBar
    },

    data() {
        return {
            score: 0
        }
    },

    methods: {
        updateScore(){
            console.log("parent updateScore")
            this.score += 1
        }
    }
}
</script>-->
