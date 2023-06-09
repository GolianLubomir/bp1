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
          <h1 class="text-5xl text-white">Číselná pamäť</h1>
        </div>
        <div class="py-6 text-center">
          <h1 class="text-xl text-white">
            Zapamätaj si číslo, ktoré sa objaví, a potom ho zapíš do poľa.
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
        <div v-if="remember || repeat" class="w-96">
          <NumberSequenceComponent
            :numbersSequence="numbersSequence"
            :remember="remember"
            :repeat="repeat"
            :timeToRemember="timeToRemember"
            @submit="submit"
          />
        </div>

        <div>
          <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
            <div class="text-2xl text-white text-center">
              <p>Dokážeš si zapamätať postupnosť</p>
            </div>
          </div>

          <div v-if="trainingEnded" class="w-full h-80">
            <div class="text-4xl text-white text-center py-9">
              <p v-if="sequenceLength - 1 == 1">
                {{ sequenceLength - 1 }} čísla.
              </p>
              <p v-if="sequenceLength - 1 != 1">
                {{ sequenceLength - 1 }} čísel.
              </p>
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
import TimerBar from "../components/TimerBar.vue";
import NumberSequenceComponent from "../components/NumberSequenceComponent.vue";
import ActivityTrackerComponent from "../components/ActivityTrackerComponent.vue";
import store from "../store";

function genNumberSequence(length) {
  let sequence = "";
  for (let i = 0; i < length; i++) {
    sequence += Math.floor(Math.random() * 10);
  }
  return sequence;
}

export default {
  components: {
    XMarkIcon,
    TimerBar,
    NumberSequenceComponent,
    ActivityTrackerComponent,
  },

  setup() {
    let timeoutID;
    const state = reactive({
      trainingEnded: false,
      trainRunning: false,
      remember: false,
      repeat: false,
      stillCorrect: true,
      intro: true,
      inputText: "",
      usersSeq: "",
      sequenceLength: 1,
      numbersSequence: "",
      timeToRemember: 3,
      inputmy: null,
      scoreSaved: false,
      startMeasurement: false,
      stopMeasurement: false,
    });

    const data = reactive({
      expectedAnswer: null,
      answer: null,
    });

    const startTrain = () => {
      state.trainRunning = true;
      state.intro = false;
      state.trainingEnded = false;
      state.scoreSaved = false;
      state.sequenceLength = 1;
      state.inputText = "";
      startGame();
      training();
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      endGame();
      state.intro = true;
      state.inputText = "";
      state.trainingEnded = false;
      clearTimeout(timeoutID);
    };

    const training = () => {
      state.numbersSequence = genNumberSequence(state.sequenceLength);
      state.repeat = false;
      state.remember = true;
      state.timeToRemember = 3 + state.sequenceLength / 2;
      timeoutID = setTimeout(() => {
        state.remember = false;
        state.repeat = true;
      }, state.timeToRemember * 1000);
    };

    const submit = (result) => {
      state.remember = false;
      state.repeat = false;
      if (result) {
        state.sequenceLength++;
        state.inputText = "";
        training();
      } else {
        state.remember = false;
        state.repeat = false;
        state.trainingEnded = true;
        endGame();
      }
    };

    const saveScore = () => {
      const score = {
        game_id: 2,
        score: state.sequenceLength - 1,
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
      time = time <= 120 ? time : 120;
      const activityData = {
        game_id: 2,
        training_time: time,
      };
      store.dispatch("addSpentTime", activityData);
    };

    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      submit,
      saveScore,
      onTimeSpent,
    };
  },

  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
