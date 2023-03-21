<template>
  <div class="pt-10">
    <span
      v-if="trainRunning || trainingEnded"
      @click="leaveTrain"
      class="absolute right-5"
    >
      <XMarkIcon
        class="block h-8 w-8 border border-gray-600 rounded-full p-1 text-gray-600 transition duration-300 ease-in-out hover:rounded-lg cursor-pointer"
      />
    </span>





    <div v-if="intro" class="h-96">
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
          class="border rounded-full mt-4 px-2 pb-1 text-2xl text-white"
        >
          Click here to start.
        </button>
      </div>
    </div>





    <div v-if="trainRunning"  class="flex justify-center mb-16">
      <!--<canvas ref="canvas" width="400" height="400" class="bg-white"></canvas>-->
      <GraphCanvasComponent @update-score="updateScore"> </GraphCanvasComponent>
      <!--<div class="text-white text-lg p-3">
        <p v-for="scoreItem in score" :key="scoreItem.percent"> Score: {{scoreItem.percent}}</p>
      </div>-->
      
    </div>

 
    <div>
        <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
          <div class="text-2xl text-white text-center"> 
            <p>Your average percentage of drawing graphs is</p>
          </div>
        </div>

        <div v-if="trainingEnded" class="w-full h-80">
          <div class="text-4xl text-white text-center py-9">
            <p>{{ percentAverage }} %</p>
            <p class="text-1xl pt-6">and deviation</p>
            <p class="text-3xl pt-6">{{deviationAverage}}</p>
          </div>
          <div class="text-lg text-white text-center py-6">
            <button
              @click="startTrain"
              class="bg-white px-3 py-1 text-black rounded-full"
            >
              Try again!
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


function genExpression(){
    return "x*x"
}

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



    let graphNum = 1
    let percentArray = []
    const state = reactive({
        trainingEnded: false,
        trainRunning: false,
        intro: true,
        isDrawing: false,
    })
    const data = reactive({
        percentAverage: 0,
        deviationAverage: 0,
        score: {
            
        },
    })

    const startTrain = () => {
      state.trainRunning = true;
      state.intro = false;
      state.trainingEnded = false;

      
    };

    const stopTrain = () => {
      state.trainRunning = false;
      state.intro = false;
      state.trainingEnded = true;
      saveScore()
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      state.intro = true;
      state.trainingEnded = false;
    };


    /*const training = () => {

        if(graphNum <= 5){

            let arrexpression =  genExpression()

            

        }else{
            averageOfTimes.value = getAverage(times)
            averageOfTimes.value += penalties.value
            trainingEnded.value = true;
            
        }
            
    }*/

    const updateScore = (score) => {+
      score.forEach(element => {
        console.log("updateScore: " + element.percent)
      });
        
        data.score = score
        if(data.score.length == 5){
          calcResult()
          stopTrain();
        }
        //data.score.deviation = score.deviation

    };

    const calcResult = () => {
      let percentAvg = 0
      let deviationAvg = 0 
      data.score.forEach(el => {
        console.log(el.percent, el.deviation)
        percentAvg += parseFloat(el.percent)
        deviationAvg += parseFloat(el.deviation)
      });

      console.log(percentAvg, deviationAvg)
      console.log(data.score.length)

      data.percentAverage = (percentAvg / data.score.length).toFixed(2)
      data.deviationAverage = (deviationAvg / data.score.length).toFixed(2)
      console.log(data.percentAverage, data.deviationAverage)
    } 

    const saveScore = () => {
      const score = {
          game_id: 5,
          score: data.percentAverage
      }

      store.dispatch('addScore', score);
    }

    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      updateScore
    };

  },

  mounted() {
      window.scrollTo(0, 0);
      console.log(this.running);
  }
  
  
};
</script>

<style></style>
