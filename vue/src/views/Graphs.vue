<template>
  <div class="pt-0">
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
        <h1 class="text-5xl text-white">Graphs</h1>
      </div>
      <div class="py-6 text-center">
        <h1 class="text-xl text-white">
          Find and click on two squares of the same value as fast as you can.
        </h1>
        <h1 class="text-xl text-white">We will measure your solution time.</h1>
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
            <p>Your graph drawing score is</p>
          </div>
        </div>

        <div v-if="trainingEnded" class="w-full h-80">
          <div class="text-4xl text-white text-center py-6">
            <p>{{score}}</p>
            
          </div>
          <div class="text-xl text-white text-center"> 
            <p>Your average percentage of all graphs drawn is</p> 
            <p>{{ percentAverage }} %</p>
          </div>

          <div class="text-lg text-white text-center py-12">
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
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { reactive, toRefs } from "vue";
import { ref, computed, watch, onMounted } from "vue";
import store from "../store"
import GraphCanvasComponent from "../components/GraphCanvasComponent.vue";
import { useStore } from 'vuex';


export default {
  components: {
    XMarkIcon,
    GraphCanvasComponent
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
    })
    const data = reactive({
        percentAverage: 0,
        //deviationAverage: 0,
        score: 0
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
    };

    const stopTrain = () => {
      state.trainRunning = false;
      state.intro = false;
      state.trainingEnded = true;
      state.dataLoaded = false;
      store.dispatch('fetchGraphsExpressions');
      //saveScore()
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      state.intro = true;
      state.trainingEnded = false;
      state.dataLoaded = false;
      store.dispatch('fetchGraphsExpressions');
    };


    const updateScore = (score) => {
      /*score.forEach(element => {
        console.log("updateScore: " + element.percent)
      });*/
        
        data.score = score.numCorrectGraphs
        //if(data.score.length == 5){
          calcResult(score.percentArr)
          stopTrain();
        //}
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

    

    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      updateScore,
      saveScore,
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
