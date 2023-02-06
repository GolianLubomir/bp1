<template>
  <div>
    <span v-if="trainRunning" @click="leaveTrain" class="absolute right-5">
      <XMarkIcon
        class="block h-8 w-8 border border-gray-600 rounded-full p-1 text-gray-600 transition duration-300 ease-in-out hover:rounded-lg cursor-pointer"
      />
    </span>

    <div class="h-96 mb-20">
      <div v-if="intro" class="h-96">
        <div class="py-2 text-center">
          <h1 class="text-5xl text-white">Number Memory</h1>
        </div>
        <div class="py-6 text-center">
          <h1 class="text-xl text-white">
            Remember the number that appears and then write it in the field
          </h1>
          <button
            @click="startTrain"
            class="border rounded-full mt-4 px-2 pb-1 text-2xl text-white"
          >
            Click here to start.
          </button>
        </div>

        <!--<div>
                    <p>Here is an example of a mathematical expression: $\frac{1}{2}$. $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</p>
                    <p>Here is another expression: $sqrt{2x^2+5x+3}$.</p>
                    <p>When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they
                        are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</p>
                </div>-->
      </div>

      <div v-if="trainRunning" class="h-96 flex items-center justify-center">
        <div>
          <div
            v-if="remember"
            class="pb-10 w-min h-24 mx-auto flex items-center justify-center"
          >
            <p class="text-white text-5xl">{{ numbersSequence }}</p>
          </div>

          <div v-if="repeat" class="pb-10 w-min h-24 mx-auto">
            <input
              type="text"
              v-model="inputText"
              @keyup.enter="submit"
              class="bg-teal-500 border-4 text-5xl text-white h-16 w-96 pb-3"
            />
            <button
              @click="submit"
              class="bg-white px-3 py-1 my-6 text-black text-lg rounded-full"
            >
              Submit!
            </button>
          </div>
        </div>

        <div>
          <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
            <div class="text-2xl text-white text-center">
              <p>You can remember a sequence of</p>
            </div>
          </div>

          <div v-if="trainingEnded" class="w-full h-80">
            <div class="text-4xl text-white text-center py-9">
              <p>{{ sequenceLength - 1 }} numbers.</p>
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
  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { reactive, toRefs } from "vue";
import { ref, computed, watch, onMounted } from "vue";
//import MathJax from 'mathjax'

function genNumberSequence(size) {
  let sequence = "";
  for (var i = 0; i < size; i++) {
    let num = Math.floor(Math.random() * 10);
    let str1 = num.toString();
    let str2 = sequence.concat(str1);
    sequence = str2;
  }

  return sequence;
}

export default {
  components: {
    XMarkIcon,
  },

  setup() {
    let timeoutID
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
    });

    const data = reactive({
      expectedAnswer: null,
      answer: null,
    });

    const startTrain = () => {
      state.trainRunning = true;
      state.intro = false;
      state.trainingEnded = false;
      state.sequenceLength = 1;
      
      training();
    };

    const leaveTrain = () => {
      state.trainRunning = false;
      state.intro = true;
      state.inputText = "";
      state.trainingEnded = false;
      clearTimeout(timeoutID)
    };

    const training = () => {
      state.numbersSequence = genNumberSequence(state.sequenceLength);
      state.repeat = false;
      state.remember = true;
      timeoutID = setTimeout(() => {
        state.remember = false;
        state.repeat = true;
      }, 3000);
    };

    const submit = () => {
      if (state.numbersSequence == state.inputText) {
        state.sequenceLength++;
        state.inputText = "";
        training();
      } else {
        state.remember = false;
        state.repeat = false;
        state.trainingEnded = true;
      }
    };

    /*watch(() => state.inputText, (newValue) => {
            state.message = `Your input: ${newValue}`;
         });*/

    return {
      ...toRefs(state),
      ...toRefs(data),
      startTrain,
      leaveTrain,
      submit,
    };
  },
};
</script>

<style></style>
