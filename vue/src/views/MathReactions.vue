<template>
    <div >
        <span v-if="trainRunning" @click="leaveTrain" class="absolute right-5">
            <XMarkIcon  class=" block h-8 w-8 border border-gray-600 rounded-full p-1 text-gray-600 transition  duration-300 ease-in-out hover:rounded-lg cursor-pointer"  />
        </span>
        
        <div class="h-96 mb-20">
            <div v-if="intro" class="h-96">
                <div class="py-2 text-center" > 
                    <h1 class="text-5xl text-white"> Math Reaction Time </h1>    
                </div>
                <div class="py-6 text-center" > 
                    <h1 class="text-xl text-white"> If the expression is true, click as quickly as you can. </h1>    
                    <button @click="startTrain" class="border rounded-full mt-4 px-2 pb-1 text-2xl text-white"> Click here to start. </button>
                </div>

                <!--<div>
                    <p>Here is an example of a mathematical expression: $\frac{1}{2}$. $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</p>
                    <p>Here is another expression: $sqrt{2x^2+5x+3}$.</p>
                    <p>When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they
                        are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</p>
                </div>-->

                
            </div>

            <div v-if="trainRunning" class="">
                <div v-if="!trainingEnded" class="pb-10 w-min mx-auto text-center flex" > 
                    <div class="w-full text-end">  
                        <h1 class="text-4xl whitespace-nowrap text-white px-1 py-2"> {{num1}} {{sign}} {{num2}} </h1>
                    </div>
                    <div class="text-6xl text-center text-white">  
                        <h1 class="w-12 text-5xl text-white "> = </h1>
                    </div>
                    <div class="w-full text-start">  
                        <h1 class="text-4xl text-white px-1 py-2">  {{result}} </h1>
                    </div>
                </div>

                <div v-if="trainingEnded" class="pb-10 w-96 mx-auto text-center flex" > 
                    <div class="text-2xl text-white text-center">
                        <p>Your average reaction time when solving mathematical expressions is</p>
                    </div>
                </div>

                <div v-if="!trainingEnded" class="w-full  h-80 flex ">
                    <div @click="userAnswered(false)" class=" h-full w-1/2 border-r-2 border-zinc-300 flex items-center justify-center text-4xl text-white transition-all duration-300 ease-in-out hover:bg-teal-700">
                        False
                    </div>
                    <div @click="userAnswered(true)" class=" h-full w-1/2 border-l-2 border-zinc-300 flex items-center justify-center text-4xl text-white transition-all duration-300 ease-in-out hover:bg-teal-700">
                        True
                    </div>
                </div>

                <div v-if="trainingEnded" class="w-full h-80">
                    <div class="text-4xl text-white text-center py-6">
                        <p>{{ averageOfTimes }}</p>
                    </div>
                    <div class="text-lg text-white text-center py-6">
                        <button @click="startTrain" class="bg-white px-3 py-1 text-black rounded-full"> Try again!</button>
                    </div>
                </div>
                <div>
                    <!--<p>{{ stopwatch }}</p>
                    <button v-if="!running" @click="startStopwatch" class=" bg-blue-500 btn btn-blue">Start</button>
                    <button v-if="running" @click="stopStopwatch" class=" bg-blue-500 btn btn-red">Stop</button>-->
                </div>
            </div>
        </div>



    </div>
</template>

<script >

import { XMarkIcon } from "@heroicons/vue/24/outline"
import { reactive, toRefs } from 'vue'
import { ref, computed, watch, onMounted } from 'vue';
//import MathJax from 'mathjax'

function genExspression() {
    
    let arr;
    let num1 = Math.floor(Math.random() * 50)+1
    let num2 = Math.floor(Math.random() * 50)+1

    //let result = num1 + num2;

    if(Math.floor(Math.random() * 2) == 0){
        arr = [num1, num2, num1+num2, " + ", "true"];
    }else{
        if(num1 > num2){
            arr = [num1, num2, num1-num2, " - ", "true"];
        }else{
            arr = [num2, num1, num2-num1, " - ", "true"];
        }
               
    }
    
    if(Math.floor(Math.random() * 2) == 0){
        arr[4] = false
        let offset = Math.floor(Math.random()*9) + 1;
        if(Math.floor(Math.random() * 2) == 0){
            arr[2] = arr[2]+offset;
        }else{
            arr[2] = arr[2]-offset;
        }       
    }else{
        arr[4] = true
    }


    return arr;


}

function getAverage(array) {
    let sum = 0
    for(let i=0; i<array.length; i++){
        sum += array[i]
    }
    console.log(sum / array.length)
    return parseFloat((sum / array.length).toFixed(3));
}





export default{


    components: {
        XMarkIcon,
    },


    setup() {
        const startTime = ref(0);
        const endTime = ref(0);
        const running = ref(false);
        const trainingEnded = ref(false);
        const penalties = ref(0);
        let intervalId = null;
        let exampleNum = 1;
        let times = [];
        const averageOfTimes = ref(0);

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

        /*onMounted(() => {
            watch(stopwatch, () => {});
        });*/

        const state = reactive({
            trainRunning: false,
            intro: true
        })

        const data = reactive({
            num1: 0,
            num2: 0,
            sign: "",
            result: 0,
            expectedAnswer: null,
            answer: null
        })

        const startTrain = () => {
            trainingEnded.value = false
            exampleNum = 1
            times = []
            penalties.value = 0;
            state.intro = false
            training()
            setTimeout(() => {
                state.trainRunning = true
                
            }, 50);

        }

        const leaveTrain = () => {
            state.trainRunning = false
            state.intro = true
            
        }

        const userAnswered = (answer) => {
            if(data.expectedAnswer == answer) {
                stopStopwatch()
                times.push((endTime.value - startTime.value) / 1000)
                console.log(times)
                exampleNum++
                training()
            }else{
                stopStopwatch()
                penalties.value += 2 
                console.log(times)
                training()
            }
            
        }



        const training = () => {
            if(exampleNum <= 5){
                let arr =  genExspression()
                console.log(arr)
                data.num1 = arr[0]
                data.num2 = arr[1]
                data.sign = arr[3]
                data.result = arr[2]
                data.expectedAnswer = arr[4]
                startStopwatch()
                

            }else{
                averageOfTimes.value = getAverage(times)
                averageOfTimes.value += penalties.value
                trainingEnded.value = true;
            }
            
        }
        

        return {
            ...toRefs(state),
            ...toRefs(data),
            startTrain,
            leaveTrain,
            userAnswered,
            stopwatch,
            running,
            trainingEnded,
            startStopwatch,
            stopStopwatch,
            averageOfTimes,
        }
    }
}


//\sqrt{\frac{2x}{4z}+x^{2}}+\lim_{x\rightarrow \infty }x^{2}\frac{x}{2x}
</script>

<style>

</style>