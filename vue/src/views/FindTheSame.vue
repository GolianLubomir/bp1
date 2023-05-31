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
          <h1 class="text-5xl text-white">Nájdi rovnaké</h1>
        </div>
        <div class="py-6 text-center">
          <h1 class="text-xl text-white">
            Nájdi a klikni na dve kartičky rovnakej hodnoty tak rýchlo ako môžeš.
          </h1>
          <h1 class="text-xl text-white">
            Budeme merať čas, potrebný na nájdenie všetkých dvojíc.
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
            Kliknite tu a začnite.
          </button>
        </div>
      </div>

      <div v-if="trainRunning" class="flex items-center justify-center">
        <div class="grid grid-cols-4 gap-2">
          
          <div
            v-for="expression in expressions"
            :key="expression.id"
            @click="fnc(expression.id, expression.expId)"
            :class="{
              'grid-item-selected': selectedId == expression.id , //.includes(expression.id),
              'grid-item-found': foundExpId.includes(expression.expId),
              'grid-item-mistake': mistakeId.includes(expression.id),
              'grid-item-none':
                !selectedId.includes(expression.id) &&
                !foundExpId.includes(expression.expId),

              'card-flip': true,
              'flipped': isFlipped(expression.id)
            }"
            class="h-24 px-3 relative w-48 cursor-pointer"
          >

            <div class="card-front">
              <!-- Here we create the 'front' of the card -->
            </div>
            <div class="card-back">
              <!-- The 'back' of the card contains the math-jax-component -->
              <math-jax-component class="mx-auto text-xl whitespace-nowrap text-gray-700" :expression="expression.exp"></math-jax-component>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
          <div class="text-2xl text-white text-center">
            <p>Váš čas riešenia je</p>
          </div>
        </div>

        <div v-if="trainingEnded" class="w-full h-80">
          <div class="text-4xl text-white text-center py-9">
            <p>{{ time }}</p>
            <p class="text-2xl pt-6">sekúnd.</p>
          </div>
          <div class="text-lg text-white text-center py-6">
            <button
              @click="startTrain"
              :disabled="!dataLoaded"
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
import { reactive, toRefs} from "vue";
import { ref, computed, watch, onMounted } from "vue";
import MathJaxComponent from '../components/MathJaxComponent.vue';
import ActivityTrackerComponent from "../components/ActivityTrackerComponent.vue"
import store from "../store"

//import MathJax from 'mathjax'


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
      mistakeId: [],
      expressions: [],
      flippedCard: null,
      mistakesCounter: 0,
      dataLoaded: false,
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
      state.mistakesCounter = 0;
      startGame();
      training();
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      state.intro = true;
      state.trainingEnded = false;
      endGame();
      state.selectedId = [];
      state.selectedExpId = [];
      state.foundExpId = [];
      state.dataLoaded= false;
      store.dispatch('fetchFindTheSameExpressions');
    };

    const training = () => {
      console.log(data.databaseExpressions)
      state.expressions = getExpressions();
      state.dataLoaded= false;
      store.dispatch('fetchFindTheSameExpressions');
      startStopwatch();
    };

    const fnc = (id, expId) => {

      if(state.foundExpId.includes(expId)){
        return
      }

      if (state.flippedCard == id) {
        state.flippedCard = null;
      } else if (id < 8){
        state.flippedCard = id;
      }else{

      }
      console.log(state.flippedCard)
      console.log(id, expId);
      if (state.selectedId.length > 0) {
        console.log("tusom");
        if (state.selectedExpId == expId && state.selectedId != id) {
          state.foundExpId.push(expId);
          if (state.foundExpId.length == 8) {
            stopStopwatch();
            state.trainRunning = false;
            state.trainingEnded = true;
            //state.dataLoaded = false;
            //store.dispatch('fetchFindTheSameExpressions');
            state.selectedId = [];
            state.selectedExpId = [];
            state.foundExpId = [];
            state.flippedCard = null;
            time.value = (((endTime.value - startTime.value) / 1000) + state.mistakesCounter * 4).toFixed(2);
            endGame();
            //saveScore()
          }
          state.selectedId = [];
          state.selectedExpId = [];
          
        } else if(state.selectedId == id){
          state.selectedId = [];
          state.selectedExpId = [];
          console.log("to iste");
        } else {
          state.mistakesCounter++;
          state.mistakeId.push(state.selectedId[0])
          state.mistakeId.push(id)
          setTimeout(() => {
            state.mistakeId = []
            state.flippedCard = null
          }, 800);

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
      time = time <= 120 ? time : 120;
      const activityData = {
          game_id: 4,
          training_time: time
      }
      store.dispatch("addSpentTime", activityData);
    };

    const getExpressions = () => {
      let arr = [];
      const length = 8;

      for( let i = 0; i < length; i++){
        const trainingData = store.state.game.training.findthesame[i];
        arr.push({
            id: i,
            expId: i,
            exp: trainingData.mathjax_1,
          });
          arr.push({
            id: i + length,
            expId: i,
            exp: trainingData.mathjax_2,
          });
      }

      //console.log(arr);
      shuffle(arr);
      //console.log(arr);
      return arr;
    }

    const shuffle = (array) => {
      array.sort(() => Math.random() - 0.5);
      return array.sort(() => Math.random() - 0.5);
    }

      const isFlipped = (id) => {
        return state.flippedCard == id || id >= 8 || state.foundExpId.includes(id);
      };

    return {
      ...toRefs(state),
      ...toRefs(data),
      isFlipped,
      startTrain,
      leaveTrain,
      fnc,
      stopwatch,
      running,
      startStopwatch,
      stopStopwatch,
      time,
      saveScore,
      onTimeSpent,
    };
  },

  beforeMount() {
      window.scrollTo(0, 0);
      store.dispatch('fetchFindTheSameExpressions'); 
      console.log("before mount");
  },

  unmounted(){
    //store.dispatch('fetchFindTheSameExpressions'); 
    console.log("unmounted");
  },


  created(){
    
    console.log("created");
  } 

};
</script>

<style>
/*.grid-item-selected {
  background-color: #053d39;
}
.grid-item-found {
  background-color: #0f766e;
  opacity: 0.5;
}
.grid-item-none {
  background-color: #0f766e;
}*/

.grid-item-selected {
  background-color: #76c1f4;
    border-radius: 10px;
}
.grid-item-found {
  background-color: #ffffff;
  opacity: 0.4;
  border-radius: 10px;
}
.grid-item-none {
  background-color: #fcfcfc;
  border-radius: 10px;
}

.grid-item-mistake {
  background-color: #fe5e76;
  border-radius: 10px;
}


.mjx-container{
  margin: 0;
}

.card-flip {
  perspective: 1000px;
  /*position: relative;*/
  width: 100%;
  height: 100%;
}

.card-front, .card-back {
  backface-visibility: hidden;
  transition: transform 0.8s;
  /*position: absolute;
  top: 0;
  left: 0;*/
}


.card-back {
  transform: rotateY(180deg);
}

.card-flip.flipped .card-back {
  transform: rotateY(0deg);
}

.card-flip.flipped .card-front {
  transform: rotateY(180deg);
}

</style>
