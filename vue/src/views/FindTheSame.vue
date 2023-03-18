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
            class="border rounded-full mt-4 px-2 pb-1 text-2xl text-white"
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
            class="h-24 p-3 flex items-center justify-center border cursor-pointer"
          >
            <h1
              v-if="expression.exp.num1"
              class="text-4xl whitespace-nowrap text-white px-1 py-2"
            >
              {{ expression.exp.num1 }}{{ expression.exp.sign
              }}{{ expression.exp.num2 }}
            </h1>
            <h1
              v-if="!expression.exp.num1"
              class="text-4xl whitespace-nowrap text-white px-1 py-2"
            >
              {{ expression.exp }}
            </h1>
          </div>
          <!--<div
            v-for="expression in expressions"
            :key="expression.id"
            @click="fnc(expression.id)"
            :class="{ 'grid-item-selected': selected.includes(expression.id), 'grid-item-found': found.includes(expression.id) }"
            class=" h-24 p-3 flex items-center justify-center border"
        >
            <h1 class="text-4xl whitespace-nowrap text-white px-1 py-2">
            {{ expression.exp.res }}
            </h1>
        </div>-->
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
              class="bg-white px-3 py-1 text-black rounded-full"
            >
              Try again!
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
//import MathJax from 'mathjax'

function genExspressionArray(size) {
  let arr;
  let arr2 = [];
  let difficulty;
  let results = [];

  for (let i = 0; i < size; i++) {
    if (i == 0) {
      difficulty = 10;
    } else if (i == 1 || i == 2) {
      difficulty = 20;
    } else if (i == 3) {
      difficulty = 30;
    } else {
      difficulty = 50;
    }
    //difficulty = (i+1)*10 % 50
    let num1 = Math.floor(Math.random() * difficulty) + 1;
    let num2 = Math.floor(Math.random() * difficulty) + 1;

    //let result = num1 + num2;

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
        exp: {
          num1: arr[0].toString(),
          num2: arr[1].toString(),
          res: arr[2].toString(),
          sign: arr[3],
        },
      });
      arr2.push({
        id: i + 1 + size,
        expId: i + 1,
        exp: arr[2].toString(),
      });
    }
  }

  console.log(arr2);
  shuffle(arr2);
  console.log(arr2);
  return arr2;
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array.sort(() => Math.random() - 0.5);
}

export default {
  components: {
    XMarkIcon,
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
      sequenceLength: 1,
      selectedId: [],
      selectedExpId: [],
      foundExpId: [],
      expressions: [
        /*{id:1, exp: {num1: "5", num2: "5", res: "10", sign: "+"}},
        {id:2, exp: {num1: "3", num2: "6", res: "9", sign: "+"}},
        {id:3, exp: {num1: "4", num2: "3", res: "1", sign: "-"}},*/
      ],
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
      state.trainRunning = true;
      state.intro = false;
      state.trainingEnded = false;
      training();
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      state.intro = true;
      state.trainingEnded = false;
      state.selectedId = [];
      state.selectedExpId = [];
      state.foundExpId = [];
    };

    const training = () => {
      state.expressions = genExspressionArray(8);
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
            state.selectedId = [];
            state.selectedExpId = [];
            state.foundExpId = [];
            time.value = (endTime.value - startTime.value) / 1000;
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
    };
  },

  mounted() {
      window.scrollTo(0, 0);
      console.log(this.running);
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
</style>
