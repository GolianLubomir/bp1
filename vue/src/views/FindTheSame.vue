<template>
  <div class="pt-10">
    <span v-if="trainRunning || trainingEnded" @click="leaveTrain" class="absolute right-5">
      <XMarkIcon
        class="block h-8 w-8 border border-gray-600 rounded-full p-1 text-gray-600 transition duration-300 ease-in-out hover:rounded-lg cursor-pointer"
      />
    </span>

    <div class="h-96 mb-20">
      <div v-if="intro" class="h-96">
        <div class="py-2 text-center">
          <h1 class="text-5xl text-white">Find the Same</h1>
        </div>
        <div class="py-6 text-center">
          <h1 class="text-xl text-white">
            Find and click on two squares of the same value as fast as you can.
          </h1>
          <h1 class="text-xl text-white">
            We will measure your solution time.
          </h1>
          <button
            @click="startTrain"
            :disabled="!dataLoaded"
            :class="{
              'opacity-70': !dataLoaded,
              'opacity-100': dataLoaded
            }"
            class="border rounded-full mt-20 px-2 py-2 bg-white font-bold text-gray-600 myButtonShadow hover:text-amber-600"
          >
            Click here to start.
          </button>
        </div>
      </div>

      <div v-if="trainRunning" class="flex items-center justify-center">
        <div class="grid grid-cols-4 gap-1">
          <div
            v-for="expression in expressions"
            :key="expression.id"
            @click="fnc(expression.id, expression.expId)"
            :class="{
              'grid-item-selected': selectedId.includes(expression.id),
              'grid-item-found': foundExpId.includes(expression.expId),
              'grid-item-none':
                !selectedId.includes(expression.id) &&
                !foundExpId.includes(expression.expId),
            }"
            class="h-24 px-3 relative w-48 border cursor-pointer"
          >
            <math-jax-component class="mx-auto text-2xl whitespace-nowrap text-white" :expression="expression.exp"></math-jax-component>
          </div>
        </div>
      </div>
      <div>
        <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
          <div class="text-2xl text-white text-center">
            <p>Your solution time is</p>
          </div>
        </div>

        <div v-if="trainingEnded" class="w-full h-80">
          <div class="text-4xl text-white text-center py-9">
            <p>{{ stopwatch }}</p>
            <p class="text-2xl pt-6">seconds.</p>
          </div>
          <div class="text-lg text-white text-center py-6">
            <button
              @click="startTrain"
              :disabled="!dataLoaded"
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
import { reactive, toRefs } from "vue";
import { ref, computed, watch, onMounted } from "vue";
import MathJaxComponent from '../components/MathJaxComponent.vue';
import store from "../store"

//import MathJax from 'mathjax'


export default {
  components: {
    XMarkIcon,
    MathJaxComponent,
  },

  setup() {
    const startTime = ref(0);
    const endTime = ref(0);
    const running = ref(false);
    let intervalId = null;
    const time = ref(0);

    const stopwatch = computed(() => {
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
    };

    const state = reactive({
      trainingEnded: false,
      trainRunning: false,
      intro: true,
      scoreSaved: false,
      sequenceLength: 1,
      selectedId: [],
      selectedExpId: [],
      foundExpId: [],
      expressions: [],
      dataLoaded: false,
    });

    const data = reactive({ 
      num1: 0,
      num2: 0,
      sign: "",
      result: 0,
      expectedAnswer: null,
      answer: null,
      databaseExpressions: null
    });

    watch(
      () => store.state.game.training.findthesame,
      (newValue) => {
        data.databaseExpressions = newValue;
        state.dataLoaded = true;
      }
    );

    const startTrain = () => {
      state.trainRunning = true;
      state.intro = false;
      state.trainingEnded = false;
      state.scoreSaved = false;
      training();
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      state.intro = true;
      state.trainingEnded = false;
      state.selectedId = [];
      state.selectedExpId = [];
      state.foundExpId = [];
      state.dataLoaded= false;
      store.dispatch('fetchFindTheSameExpressions');
    };

    const training = () => {
      console.log(data.databaseExpressions)
      state.expressions = getExpressions(8);
      startStopwatch();
    };

    const fnc = (id, expId) => {
      console.log(id, expId);
      if (state.selectedId.length > 0) {
        console.log("tusom");
        if (state.selectedExpId == expId && state.selectedId != id) {
          state.foundExpId.push(expId);
          if (state.foundExpId.length == 8) {
            stopStopwatch();
            state.trainRunning = false;
            state.trainingEnded = true;
            state.dataLoaded = false;
            store.dispatch('fetchFindTheSameExpressions');
            state.selectedId = [];
            state.selectedExpId = [];
            state.foundExpId = [];
            time.value = (endTime.value - startTime.value) / 1000;
            //saveScore()
          }
          state.selectedId = [];
          state.selectedExpId = [];
        } else {
          state.selectedId = [];
          state.selectedExpId = [];
          console.log("chyba");
        }
      } else {
        console.log("hier");
        state.selectedId.push(id);
        state.selectedExpId.push(expId);
      }
      console.log(state.selectedId);
      console.log(state.foundExpId);
    };


    const saveScore = () => {
      const score = {
          game_id: 4,
          score: time.value
      }

      store.dispatch('addScore', score);
      state.scoreSaved = true;
    }

    const getExpressions = (size) => {
      let arr;
      let arr2 = [];
      let difficulty;
      let results = [];

      for (let i = 0; i < 2; i++) {

        difficulty = 50
        let num1 = Math.floor(Math.random() * difficulty) + 1;
        let num2 = Math.floor(Math.random() * difficulty) + 1;

        if (Math.floor(Math.random() * 2) == 0) {
          arr = [num1, num2, num1 + num2, " + "];
        } else {
          if (num1 > num2) {
            arr = [num1, num2, num1 - num2, " - "];
          } else {
            arr = [num2, num1, num2 - num1, " - "];
          }
        }

        if (results.includes(arr[2])) {
          console.log(arr[2]);
          console.log(results);
          --i;
        } else {
          results.push(arr[2]);

          arr2.push({
            id: i + 1,
            expId: i + 1,
            exp: '$${' + arr[0] + ' ' + arr[3] + ' ' + arr[1] + '}$$',
          });
          arr2.push({
            id: i + 1 + size,
            expId: i + 1,
            exp: '$${' + arr[2].toString() + '}$$',
          });
        }
      }

      for( let i = 0; i < 6; i++){
        arr2.push({
            id: i + 3,
            expId: i + 3,
            exp: store.state.game.training.findthesame[i].mathjax_1,
          });
          arr2.push({
            id: i + 3 + size,
            expId: i + 3,
            exp: store.state.game.training.findthesame[i].mathjax_2,
          });
      }


      console.log(arr2);
      shuffle(arr2);
      console.log(arr2);
      return arr2;
    }

    const shuffle = (array) => {
      array.sort(() => Math.random() - 0.5);
      return array.sort(() => Math.random() - 0.5);
    }

    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      fnc,
      stopwatch,
      running,
      startStopwatch,
      stopStopwatch,
      time,
      saveScore,
    };
  },

  beforeMount() {
      window.scrollTo(0, 0);
      store.dispatch('fetchFindTheSameExpressions'); 
      console.log("before mount");
  },

  unmounted(){
    store.dispatch('fetchFindTheSameExpressions'); 
    console.log("unmounted");
  },


  created(){
    
    console.log("created");
  } 

};
</script>

<style>
.grid-item-selected {
  background-color: #053d39;
}
.grid-item-found {
  background-color: #0f766e;
  opacity: 0.5;
}
.grid-item-none {
  background-color: #0f766e;
}
.mjx-container{
  margin: 0;
}

</style>
