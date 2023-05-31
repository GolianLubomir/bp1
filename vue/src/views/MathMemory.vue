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
          <h1 class="text-5xl text-white">Matematická pamäť</h1>
        </div>
        <div class="py-6 text-center">
          <h1 class="text-xl text-white">
            Zapamätajte si postupnosť matematických výrazov, a potom
             zapíšte ich výsledky.
          </h1>
          <button
              @click="startTrain"
              class="border rounded-full mt-20 px-2 py-2 bg-white font-bold text-gray-600 myButtonShadow hover:text-amber-600"
          >
              Kliknite tu a začnite.
          </button>
        </div>
      </div>

      <div v-if="trainRunning" class="h-96 flex items-center justify-center">
        <div>
          <div
            v-if="remember"
            class="flex flex-wrap items-center justify-center mx-auto max-w-screen-lg"
          >
            <TimerBar v-if="remember" :time="timeToRemember" :widthprops="'100%'"> </TimerBar>
            <div
              v-for="expression in expressionsSequence"
              :key="expression.id"
              class="w-40 my-2 flex items-center justify-center border"
            >
              <h1 class="text-4xl whitespace-nowrap text-white px-1 py-2">
                {{ expression.exp.num1 }}{{ expression.exp.sign
                }}{{ expression.exp.num2 }}
              </h1>
            </div>
          </div>
          <div v-if="repeat" class="">
            <div
              class="flex flex-wrap items-center justify-center mx-auto mt-20 max-w-screen-lg"
            >
              <div
                v-for="item in inputText"
                :key="item.id"
                class="w-40 my-2 flex items-center justify-center"
              >
                <input
                  type="text"
                  :id="`input-${item.id}`" 
                  v-model="item.input"
                  @keypress="numericInputCheck"
                  @keyup.enter="submit"
                  
                  class="bg-teal-500 default-none border-2 text-5xl text-white text-center h-14 w-40 pb-3 focus:border-slate-600 focus:ring-slate-600"
                />
              </div>
            </div>
            
          </div>
          <button
            v-if="repeat"
            @click="submit"
            class="bg-white px-3 py-1 my-6 text-black text-lg rounded-full"
          >
            Skontrolovať!
          </button>
        </div>

        <div>
          <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
            <div class="text-2xl text-white text-center">
              <p>Dokázal si si zapamätať postupnosť</p>
            </div>
          </div>

          <div v-if="trainingEnded" class="w-full h-80">
            <div class="text-4xl text-white text-center py-9">
              <p v-if="sequenceLength - 1 == 1" >{{ sequenceLength - 1 }} výrazu.</p>
              <p v-if="sequenceLength - 1 != 1" >{{ sequenceLength - 1 }} výrazov.</p>
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
import { ref, computed, watch, onMounted, inject, nextTick } from "vue";
import TimerBar from "../components/TimerBar.vue"
import store from "../store"
import ActivityTrackerComponent from "../components/ActivityTrackerComponent.vue"
//import MathJax from 'mathjax'


function genExspressionArray(length) {
  let arr = [];
  
  for (let i = 0; i < length; i++) {
    let difficulty = 10;
    if(i==1 || i==2) {
        difficulty = 20;
    } else if(i>=3) {
        difficulty = 30;
    }

    let num1 = Math.floor(Math.random() * difficulty) + 1;
    let num2 = Math.floor(Math.random() * difficulty) + 1;

    let result, sign;

    if (Math.floor(Math.random() * 2) == 0) {
      result = num1 + num2;
      sign = " + ";
    } else {
      if (num1 < num2) [num1, num2] = [num2, num1];
      result = num1 - num2;
      sign = " - ";
    }

    arr.push({
      id: i + 1,
      exp: {
        num1: num1.toString(),
        num2: num2.toString(),
        res: result.toString(),
        sign: sign,
      },
    });
  }

  console.log(arr);

  return arr;
}


export default {
  components: {
    XMarkIcon,
    TimerBar,
    ActivityTrackerComponent,
  },

  setup() {
    let timeoutID;
    //let timeToRemember = 2000;
    const state = reactive({
      trainingEnded: false,
      trainRunning: false,
      remember: false,
      repeat: false,
      intro: true,
      scoreSaved: false,
      timeToRemember: 2000,
      inputText1: "",
      inputText2: "",
      inputText3: "",
      inputText4: "",
      inputText5: "",
      inputText6: "",
      inputText7: "",
      inputText8: "",
      inputText9: "",
      inputText10: "",
      sequenceLength: 1,
      expressionsSequence: [],
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
      inputs: [
        state.inputText1,
        state.inputText2,
        state.inputText3,
        state.inputText4,
        state.inputText5,
        state.inputText6,
        state.inputText7,
        state.inputText8,
        state.inputText9,
        state.inputText10,
      ],
      inputText: [],
    });

    const startTrain = () => {
      state.trainRunning = true;
      state.intro = false;
      state.trainingEnded = false;
      state.scoreSaved = false;
      state.sequenceLength = 1;
      data.inputText = [];
      startGame();
      training();
    };

    const leaveTrain = () => {
      data.inputText = [];
      state.trainRunning = false;
      endGame();
      state.intro = true;
      state.trainingEnded = false;
      clearTimeout(timeoutID);
    };

    const training = () => {
      state.expressionsSequence = genExspressionArray(state.sequenceLength);
      data.inputText.push({
        id: state.sequenceLength,
        input: data.inputs[state.sequenceLength - 1],
      });

      console.log(state.expressionsSequence);
      state.repeat = false;
      state.remember = true;
      state.timeToRemember = 3 + state.sequenceLength * (state.sequenceLength/2)
      timeoutID = setTimeout(() => {
        state.remember = false;
        state.repeat = true;
      }, state.timeToRemember * 1000);
    };

    const focusFirstEmptyInput = async () => {
      await nextTick();
      const emptyInput = data.inputText.find((input) => !input.input);
      if (emptyInput) {
        const inputEl = document.getElementById(`input-${emptyInput.id}`);
        if (inputEl) {
          inputEl.focus();
        }
      }
    };

    const areInputsCorect = (count) => {
      for (let i = 0; i < count; i++) {
        if (state.expressionsSequence[i].exp.res != data.inputText[i].input) {
          return false;
        }
      }
      return true;
    };

    const areInputsFilled = (count) => {
        for (let i = 0; i < count; i++) {
          if(data.inputText[i].input == ''){
            return false;
          }
        }
        return true;
    };

    const clearInputs = (count) => {
        for (let i = 0; i < count; i++) {
          data.inputText[i].input = "";
        }
    };

    watch(
      () => state.repeat,
      (newValue) => {
          if (newValue) {
          setTimeout(() => {
              focusFirstEmptyInput();
          }, 0);
          }
      }
    );

    const checkLength = (inputId) => {
      console.log("check length" + inputId)
      const expectedSeq = state.expressionsSequence[inputId-1].exp.res
      const inputSeq = data.inputText[inputId-1].input

      if( expectedSeq.length == inputSeq.length){
        focusFirstEmptyInput();
      }
    }

    const numericInputCheck = (e) => {
      const ch = String.fromCharCode(e.which);
      if (!(/[0-9]/.test(ch))) {
        e.preventDefault();
      }
    };

    const submit = () => {

      if(areInputsFilled(state.sequenceLength)){
        if (areInputsCorect(state.sequenceLength)) {
          clearInputs(state.sequenceLength);
          state.sequenceLength++;
          training();
        } else {
          clearInputs(state.sequenceLength);
          data.inputText = [];
          state.remember = false;
          state.repeat = false;
          state.trainingEnded = true;
          endGame();
        }
      }else{
        focusFirstEmptyInput();
      }
      
    };

    const saveScore = () => {
      const score = {
          game_id: 3,
          score: state.sequenceLength - 1
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
            game_id: 3,
            training_time: time
        }
        store.dispatch("addSpentTime", activityData);
      };

    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      numericInputCheck,
      submit,
      saveScore,
      focusFirstEmptyInput,
      checkLength,
      onTimeSpent,
    };
  },

  mounted() {
      window.scrollTo(0, 0);
  }
};
</script>

<style></style>
