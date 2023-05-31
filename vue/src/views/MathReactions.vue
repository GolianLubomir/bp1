<template>
  <div class="pt-10">
    <span v-if="trainRunning" @click="leaveTrain" class="absolute right-5">
      <XMarkIcon
        class="block h-8 w-8 border border-gray-600 rounded-full p-1 text-gray-600 transition duration-300 ease-in-out hover:rounded-lg cursor-pointer"
      />
    </span>

    <div class="h-96 mb-20">
      <div v-if="intro" class="h-96">
        <div class="py-2 text-center">
          <h1 class="text-5xl text-white">Matematický reakčný čas</h1>
        </div>
        <div class="py-6 text-center">
          <h1 class="text-xl text-white">
            Rozhodni čo najrýchlejšie, či je tvrdenie pravdivé alebo nepravdivé.
          </h1>
          <button
            @click="startTrain"
            class="border rounded-full mt-20 px-2 py-2 bg-white font-bold text-gray-600 myButtonShadow hover:text-amber-600"
          >
            Kliknite tu a začnite.
          </button>
        </div>
      </div>

      <div v-if="trainRunning" class="">
        <div v-if="!trainingEnded" class="pb-10 w-min mx-auto text-center flex">
          <div class="w-full text-end">
            <h1 class="text-4xl whitespace-nowrap text-white px-1 py-2">
              {{ num1 }} {{ sign }} {{ num2 }}
            </h1>
          </div>

          <div class="text-6xl text-center text-white">
            <h1 class="w-12 text-5xl text-white">=</h1>
          </div>
          <div class="w-full text-start">
            <h1 class="text-4xl text-white px-1 py-2">{{ result }}</h1>
          </div>
        </div>

        <div v-if="trainingEnded" class="pb-10 w-96 mx-auto text-center flex">
          <div class="text-2xl text-white text-center">
            <p>
              Tvoj priemerný reakčný čas pri riešení matematických výrazov je
            </p>
          </div>
        </div>

        <div v-if="!trainingEnded" class="w-full h-80 flex">
          <div
            @click="userAnswered(false)"
            class="h-full w-1/2 border-r-2 border-zinc-300 flex items-center justify-center text-4xl text-white transition-all duration-300 ease-in-out hover:bg-teal-700"
          >
            Nepravda
          </div>
          <div
            @click="userAnswered(true)"
            class="h-full w-1/2 border-l-2 border-zinc-300 flex items-center justify-center text-4xl text-white transition-all duration-300 ease-in-out hover:bg-teal-700"
          >
            Pravda
          </div>
        </div>

        <div v-if="trainingEnded" class="w-full h-80">
          <div class="text-4xl text-white text-center py-6">
            <p>{{ averageOfTimes }}</p>
          </div>
          <div class="text-lg text-white text-center py-6">
            <button
              @click="startTrain"
              class="inline-block bg-white mx-3 hover:text-amber-600 text-gray-600 myButtonShadow font-bold py-1 px-4 rounded-full"
            >
              Skúste to znova!
            </button>
            <button
              @click="saveScore"
              :disabled="scoreSaved"
              class="inline-block bg-white mx-3 hover:text-amber-600 text-gray-600 myButtonShadow font-bold py-1 px-4 rounded-full"
            >
              <p v-if="!scoreSaved">Uložiť skóre</p>
              <p v-if="scoreSaved">Skóre uložené</p>
            </button>
          </div>
        </div>
        <div>
          <!--<p>{{ stopwatch }}</p>
                    <button v-if="!running" @click="startStopwatch" class=" bg-blue-500 btn btn-blue">Start</button>
                    <button v-if="running" @click="stopStopwatch" class=" bg-blue-500 btn btn-red">Stop</button>-->
        </div>
      </div>
    </div>

    <ActivityTrackerComponent
      :startMeasurement="startMeasurement"
      :stopMeasurement="stopMeasurement"
      @time-spent="onTimeSpent"
    />
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { reactive, toRefs } from "vue";
import { ref, computed, watch, onMounted } from "vue";
import store from "../store";
import MathJaxComponent from "../components/MathJaxComponent.vue";
import ActivityTrackerComponent from "../components/ActivityTrackerComponent.vue";
//import MathJax from 'mathjax'

/*function genExpression() {
    
    let arr;
    let num1 = Math.floor(Math.random() * 50)+1
    let num2 = Math.floor(Math.random() * 50)+1

    //let result = num1 + num2;

    if(Math.floor(Math.random() * 2) == 0){
        arr = [num1, num2, num1+num2, " + ", "true"];
    }else{
        if(num1 > num2){
            arr = [num1, num2, num1-num2, " - ", "true"];
        }else{
            arr = [num2, num1, num2-num1, " - ", "true"];
        }
               
    }
    
    if(Math.floor(Math.random() * 2) == 0){
        arr[4] = false
        let offset = Math.floor(Math.random()*9) + 1;
        if(Math.floor(Math.random() * 2) == 0){
            arr[2] = arr[2]+offset;
        }else{
            arr[2] = arr[2]-offset;
        }       
    }else{
        arr[4] = true
    }


    return arr;


}*/

function genExpression() {
  let arr;
  let num1 = Math.floor(Math.random() * 90) + 11;
  let num2 = Math.floor(Math.random() * 90) + 11;

  switch (Math.floor(Math.random() * 2)) {
    case 0: // Addition
      arr = [num1, num2, num1 + num2, " + ", true];
      break;
    case 1: // Subtraction
      if (num1 > num2) {
        arr = [num1, num2, num1 - num2, " - ", true];
      } else {
        arr = [num2, num1, num2 - num1, " - ", true];
      }
      break;
    case 2: // Multiplication
      num1 = num1 * 2 <= 10 ? num1 * 2 + 10 : num1 * 2;
      num2 = num2 % 10 >= 3 ? num2 % 10 : (num2 % 10) + 3;
      arr = [num1, num2, num1 * num2, " * ", true];
      break;
  }

  if (Math.floor(Math.random() * 2) == 0) {
    arr[4] = false;
    let offset = Math.floor(Math.random() * 9) + 1;
    if (Math.floor(Math.random() * 2) == 0) {
      arr[2] = arr[2] + offset;
    } else {
      arr[2] = Math.abs(arr[2] - offset);
    }
  } else {
    arr[4] = true;
  }

  return arr;
}

function getAverage(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  console.log(sum / array.length);
  return parseFloat((sum / array.length).toFixed(3));
}

export default {
  components: {
    XMarkIcon,
    MathJaxComponent,
    ActivityTrackerComponent,
  },

  setup() {
    const startTime = ref(0);
    const endTime = ref(0);
    const running = ref(false);
    const trainingEnded = ref(false);
    const penalties = ref(0);
    let intervalId = null;
    let exampleNum = 1;
    let times = [];
    const averageOfTimes = ref(0);



    /*const stopwatch = computed(() => {
            if (running.value) {
                return (Date.now() - startTime.value) / 1000;
            } else {
                return (endTime.value - startTime.value) / 1000;
            }
        });*/

    const startStopwatch = () => {
      running.value = true;
      startTime.value = Date.now();
      /*intervalId = setInterval(() => {
                stopwatch.value;
            }, 10);*/
    };

    const stopStopwatch = () => {
      running.value = false;
      endTime.value = Date.now();
      clearInterval(intervalId);
    };

    /*onMounted(() => {
            watch(stopwatch, () => {});
        });*/

    const state = reactive({
      trainRunning: false,
      intro: true,
      scoreSaved: false,
      startMeasurement: false,
      stopMeasurement: false,
    });

    const data = reactive({
      num1: 0,
      num2: 0,
      sign: "",
      result: 0,
      expectedAnswer: null,
      answer: null,
    });

    const startTrain = () => {
      trainingEnded.value = false;
      state.scoreSaved = false;
      exampleNum = 1;
      times = [];
      penalties.value = 0;
      state.intro = false;
      startGame();
      training();
      setTimeout(() => {
        state.trainRunning = true;
      }, 50);
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      state.intro = true;
      endGame();
    };

    const userAnswered = (answer) => {
      if (data.expectedAnswer == answer) {

        stopStopwatch();
        times.push((endTime.value - startTime.value) / 1000);
        console.log(times);
        exampleNum++;
        training();
      } else {

        stopStopwatch();
        penalties.value += 2;
        console.log(times);
        training();
      }
    };

    const training = () => {
      if (exampleNum <= 10) {
        let arr = genExpression();
        console.log(arr);
        data.num1 = arr[0];
        data.num2 = arr[1];
        data.sign = arr[3];
        data.result = arr[2];
        data.expectedAnswer = arr[4];
        startStopwatch();
      } else {
        let avgTime = getAverage(times);
        avgTime += penalties.value;
        averageOfTimes.value = avgTime.toFixed(3);
        trainingEnded.value = true;
        endGame();
        //saveScore()
      }
    };

    const saveScore = () => {
      const score = {
        game_id: 1,
        score: averageOfTimes.value,
      };

      store.dispatch("addScore", score);
      state.scoreSaved = true;
    };

    const startGame = () => {
      state.startMeasurement = true;
      state.stopMeasurement = false;
    };

    const endGame = () => {
      state.stopMeasurement = true;
      state.startMeasurement = false;
    };

    const onTimeSpent = (time) => {
      console.log("Time spent:", time);
      time = time <= 30 ? time : 30;
      const activityData = {
        game_id: 1,
        training_time: time,
      };
      store.dispatch("addSpentTime", activityData);
    };

    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      userAnswered,
      //stopwatch,
      running,
      trainingEnded,
      startStopwatch,
      stopStopwatch,
      averageOfTimes,
      saveScore,
      onTimeSpent,

    };
  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style></style>
