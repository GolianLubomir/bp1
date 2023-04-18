<template>
  <div class="w-96">
    
    <TimerBar v-if="remember" :time="timeToRemember" :widthprops="'100%'"> </TimerBar>
    <div v-if="remember" class="pb-10 w-full h-24 mx-auto flex items-center justify-center">
      <p class="text-white text-5xl">{{ numbersSequence }}</p>
    </div>
    <div v-if="repeat" class="pb-10 w-min h-24 mx-auto">
      <input
        ref="input"
        type="text"
        focused="true"
        v-model="inputText"
        @keyup.enter="submit"
        class="bg-teal-500 border-2 text-center text-5xl text-white h-16 w-96 pb-3 focus:border-slate-600 focus:ring-slate-600"
      />
      <button
        @click="submit"
        class="bg-white px-3 py-1 my-6 text-black text-lg rounded-full"
      >
        Submit!
      </button>
    </div>
  </div>
</template>

<script>

import { ref, watch} from 'vue';
import TimerBar from "../components/TimerBar.vue"


  export default {
    props: {
      numbersSequence: String,
      remember: Boolean,
      repeat: Boolean,
      timeToRemember: Number,
    },
    components: {
        TimerBar,
    },

    setup(props) {
        const input = ref(null);

        watch(
        () => props.repeat,
        (newValue) => {
            if (newValue) {
            setTimeout(() => {
                input.value.focus();
            }, 0);
            }
        }
        );

        return {
        input,
        };
    },

    methods: {

      submit() {
        console.log(this.numbersSequence + " " + this.inputText)
        const result = this.numbersSequence == this.inputText ? true : false;
        console.log(result);
        this.$emit("submit", result);
        this.inputText = '';
      },
    },

    data(){
        return {
            timeToRememberComp: 3,
            inputText: '',
            result: false,
            timeoutID: null,
        }
    },
  };
</script>
