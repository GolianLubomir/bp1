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
          <h1 class="text-5xl text-white">Math Memory</h1>
        </div>
        <div class="py-6 text-center">
          <h1 class="text-xl text-white">
            Remember the sequence of math expressions that appears and then
            write it in the fields.
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
            class="flex flex-wrap items-center justify-center mx-auto max-w-screen-lg"
          >
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
                  
                  v-model="item.input"
                  @keyup.enter="submit"
                  class="bg-teal-500 default-none border-2 text-5xl text-white h-14 w-40 pb-3 focus:border-slate-600 focus:ring-slate-600"
                />
              </div>
            </div>
            
          </div>
          <button
            v-if="repeat"
            @click="submit"
            class="bg-white px-3 py-1 my-6 text-black text-lg rounded-full"
          >
            Submit!
          </button>
        </div>

        <div>
          <div v-if="trainingEnded" class="pt-10 w-96 mx-auto text-center">
            <div class="text-2xl text-white text-center">
              <p>You can remember a sequence of</p>
            </div>
          </div>

          <div v-if="trainingEnded" class="w-full h-80">
            <div class="text-4xl text-white text-center py-9">
              <p>{{ sequenceLength - 1 }} expressions.</p>
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
import { ref, computed, watch, onMounted, inject } from "vue";
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

function genExspressionArray(size) {
  let arr;
  let arr2 = [];
  let difficulty;

  for (let i = 0; i < size; i++) {
    if(i==0){
        difficulty = 10
    }else if(i==1 || i==2) {
        difficulty = 20
    }else if(i==3) {
        difficulty = 30
    }else{
        difficulty = 50
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

    arr2.push({
      id: i + 1,
      exp: {
        num1: arr[0].toString(),
        num2: arr[1].toString(),
        res: arr[2].toString(),
        sign: arr[3],
      },
    });
  }

  console.log(arr2);

  return arr2;
}

export default {
  components: {
    XMarkIcon,
  },

  setup() {
    let timeoutID;
    let timeout = 2000;
    const state = reactive({
      trainingEnded: false,
      trainRunning: false,
      remember: false,
      repeat: false,
      intro: true,
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
      expressionsSequence: [
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
      state.sequenceLength = 1;
      data.inputText = [];

      /*data.inputText[0].input = "";
      data.inputText[1].input = "";
      data.inputText[2].input = "";*/
      training();
    };

    const leaveTrain = () => {
      clearInputs(state.sequenceLength);
      data.inputText = [];
      state.trainRunning = false;
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
      /*for(let i = 0; i < state.sequenceLength; i++){
        let arr = genMathExspression()
        console.log(arr)
        state.expressionsSequence[i+1].push(arr)
      }*/
      console.log(state.expressionsSequence);
      //console.log(state.expressionsSequence[1])
      state.repeat = false;
      state.remember = true;
      timeoutID = setTimeout(() => {
        state.remember = false;
        state.repeat = true;
      }, timeout*state.sequenceLength);
    };

    const areInputsCorect = (count) => {
      for (let i = 0; i < count; i++) {
        if (state.expressionsSequence[i].exp.res != data.inputText[i].input) {
          return false;
        }
      }
      return true;
    };

    const clearInputs = (count) => {
      if (data.inputText.length)
        for (let i = 0; i < count; i++) {
          data.inputText[i].input = "";
        }
    };

    const submit = () => {
      /*console.log(state.expressionsSequence[0].exp.res.toString())
        console.log(state.inputText1)
        console.log(state.inputText2)
        console.log(state.inputText3)*/
      if (areInputsCorect(state.sequenceLength)) {
        clearInputs(state.sequenceLength);
        /*data.inputText.forEach(inp => {
                    inp.input
                });*/
        /*data.inputText[0].input = "";
                data.inputText[1].input = "";
                data.inputText[2].input = "";*/
        state.sequenceLength++;
        training();
      } else {
        clearInputs(state.sequenceLength);
        data.inputText = [];
        state.remember = false;
        state.repeat = false;
        state.trainingEnded = true;
      }
    };


    /*const input = ref(null)

    watch(
      () => state.repeat,
      (newValue) => {
        if (newValue) {
          setTimeout(() => {
            input.value.focus()
          }, 0)
        }
      }
    )*/

  

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
