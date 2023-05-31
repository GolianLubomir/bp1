<template>
  <div class="pt-0">
    <div class="h-2.5">
        <TimerBar v-if="trainRunning" :time="timeToSolve" :widthprops="'100%'"> </TimerBar>
    </div>


    <span
      v-if="trainRunning || trainingEnded"
      @click="leaveTrain"
      class="absolute right-5 top-24"
    >
      <XMarkIcon
        class="block h-8 w-8 border border-gray-600 rounded-full p-1 text-gray-600 transition duration-300 ease-in-out hover:rounded-lg cursor-pointer"
      />
    </span>





    <div v-if="intro" class="h-96 pt-10 mb-20">
      <div class="py-2 text-center">
        <h1 class="text-5xl text-white">Grafy</h1>
      </div>
      <div class="py-6 text-center">
        <h1 class="text-xl text-white">
          Nakresli grafy zadaných matematických funkcií.
        </h1>
        <h1 class="text-xl text-white">Budeme sledovať, koľko grafov zvládneš správne nakresliť za dva minúty.</h1>
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





    <div v-if="trainRunning"  class="flex justify-center mb-8">
      <!--<canvas ref="canvas" width="400" height="400" class="bg-white"></canvas>-->
      <GraphCanvasComponent @update-score="updateScore"  > </GraphCanvasComponent>
      <!--<div class="text-white text-lg p-3">
        <p v-for="scoreItem in score" :key="scoreItem.percent"> Score: {{scoreItem.percent}}</p>
      </div>-->
      
    </div>

 
    <div>
        <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
          <div class="text-2xl text-white text-center"> 
            <p>Tvoje skóre v kreslení grafov je</p>
          </div>
        </div>

        <div v-if="trainingEnded" class="w-full h-80">
          <div class="text-4xl text-white text-center py-6">
            <p>{{score}}</p>
            
          </div>
          <div class="text-xl text-white text-center"> 
            <p>Tvoje priemerná zhoda zo všetkých nakreslených grafov je</p> 
            <p>{{ percentAverage }} %</p>
          </div>

          <div class="text-lg text-white text-center py-12">
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
import store from "../store"
import GraphCanvasComponent from "../components/GraphCanvasComponent.vue";
import TimerBar from "../components/TimerBar.vue";
import ActivityTrackerComponent from "../components/ActivityTrackerComponent.vue"
import { useStore } from 'vuex';


export default {
  components: {
    XMarkIcon,
    GraphCanvasComponent,
    TimerBar,
    ActivityTrackerComponent,
  },

  methods:{
    
  },



  data() {
    return {};
  },


  setup() {


    const store = useStore();
    //let graphNum = 1
    //let percentArray = []

    //const allExpressions = {}

    const state = reactive({
        trainingEnded: false,
        trainRunning: false,
        dataLoaded: false,
        intro: true,
        isDrawing: false,
        scoreSaved: false,
        startMeasurement: false,
        stopMeasurement: false,
    })
    const data = reactive({
        percentAverage: 0,
        //deviationAverage: 0,
        timeToSolve: 120,
        score: 0,
        percentArr: [],
        timeoutId: null,
    })

    watch(
      () => store.state.game.training.graphs,
      (newValue) => {
        
        state.dataLoaded = true;
      }
    );

    const startTrain = () => {
      state.trainRunning = true;
      state.intro = false;
      state.trainingEnded = false;
      state.scoreSaved = false;
      startGame();
      training();
    };

    const training = () => {
      //startStopwatch();
      data.timeoutId = setTimeout(() => {
            calcResult(data.percentArr)
            stopTrain()
        }, data.timeToSolve * 1000);
    };

    const stopTrain = () => {
      state.trainRunning = false;
      endGame();
      clearTimeout(data.timeoutId)
      state.intro = false;
      state.trainingEnded = true;
      state.dataLoaded = false;
      store.dispatch('fetchGraphsExpressions');
      //saveScore()
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      endGame();
      clearTimeout(data.timeoutId)
      state.intro = true;
      state.trainingEnded = false;
      state.dataLoaded = false;
      store.dispatch('fetchGraphsExpressions');
    };


    const updateScore = (score) => {
      /*score.forEach(element => {
        console.log("updateScore: " + element.percent)
      });*/
        console.log("updateScore: " + score.trainingEnded)
        data.score = score.numCorrectGraphs
        data.percentArr = score.percentArr
        if(score.trainingEnded){
          calcResult(score.percentArr)
          stopTrain();
        }
    };

    const calcResult = (array) => {
      console.log(array)
      let percentAvg = 0
      //let deviationAvg = 0 
      array.forEach(el => {
        percentAvg += parseFloat(el.percent)
        //deviationAvg += parseFloat(el.deviation)
      });

      //console.log(percentAvg)
      console.log("length: " + array.length)
      console.log("sum percent: " + percentAvg)

      data.percentAverage = (percentAvg / array.length).toFixed(2)
      //data.deviationAverage = (deviationAvg / data.score.length).toFixed(2)
      console.log("priemer: " + data.percentAverage)
    } 

    const saveScore = () => {
      const score = {
          game_id: 5,
          score: data.score
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
      const activityData = {
          game_id: 5,
          training_time: time
      }
      store.dispatch("addSpentTime", activityData);
    };

    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      updateScore,
      saveScore,
      onTimeSpent,
      /*expression: computed(() => {
        return allExpressions
      }),*/
      /*mathjax: computed(() => {
        return mathjax_i
      })*/
    };

  },

  mounted() {
      window.scrollTo(0, 0);
      store.dispatch('fetchGraphsExpressions');
  }
  
  
};
</script>

<style></style>
