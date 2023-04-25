<template>
  <div >
    

    <div class="justify-center">
        <div class="w-96 m-auto h-28" >
            <div class="">
                <math-jax-component class="w-96 px-24 text-3xl whitespace-nowrap absolute text-white" :expression="mathjax"></math-jax-component>
                <div class="flex justify-between mt-1">
                    <!--<div class="text-white text-right right flex"> <p> O </p> <p> O </p> <p> O </p> </div>-->
                    <p class="text-white text-xl ">Score: {{numCorrectGraphs}}</p> 
                    <LivesComponent :lives="lives" /> 
                </div>
            </div>
            <!--<button
                v-if="!training"
              @click="updateScore"
              class="inline-block bg-white mx-3 my-10 hover:text-amber-600 text-gray-600 myButtonShadow font-bold py-1 px-4 rounded-full"
            >
              Vyhodnotiť
            </button>-->
            <div v-if="drawEnded" class="w-full flex justify-between">
                <div class="mt-9 h-7 text-slate-100 text-lg w-28 font-bold  rounded-full py-0 px-4 ">
                    {{lastScore}} %
                </div>
                <button
                    v-if="training"
                    @click="nextDrawn"
                    class="inline-block mt-9 h-7 hover:text-amber-600 text-gray-500  font-bold py-0 px-4 rounded-full bg-white myButtonShadow"
                    >
                    Next - 
                </button>

                <button
                    v-if="!training"
                    @click="updateScore"
                    class="inline-block bg-white mx-3 mt-9 h-7  hover:text-amber-600 text-gray-600 myButtonShadow font-bold px-4 rounded-full"
                    >
                    Evaluate
                </button>
                
            </div>
            
        </div>
      <canvas ref="canvas" width="400" height="400" class="bg-white"></canvas>
      
    </div>


  </div>
</template>

<script>
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { reactive, toRefs } from "vue";
import { ref, computed, watch, onMounted } from "vue";
import MathJaxComponent from '../components/MathJaxComponent.vue';
import LivesComponent from '../components/LivesComponent.vue'; 

import store from "../store"

export default {
    /*props: {
      expression: {
        type: Array,
        required: true,
      },   
      mathjax: {
        type: String,
        required: true,
      },   
    },*/

    setup(){
        const data = reactive({
            exps: store.state.game.training.graphs,
            mathjax: store.state.game.training.graphs[1],
            score: [],
            lastScore: 0,
            counter: 3,
            canvas: null,
            context: null,
            canvasWidth: null,
            canvasHeight: null,
            lives: 3,
            numCorrectGraphs: 0,
        })

        const state = reactive({
            training: true,
            drawEnded: false,
        })

        return {
            data,
            state
        }
    },



    components: {
        MathJaxComponent,
        LivesComponent,
    },

    computed: {
        mathjax(){
            return this.data.mathjax
        },
        training(){
            return this.state.training
        },
        drawEnded(){
            return this.state.drawEnded
        },
        lastScore(){
            return this.data.lastScore
        },
        lives(){
            return this.data.lives
        },
        numCorrectGraphs(){
            return this.data.numCorrectGraphs
        }

    },

    methods: {
        checkScore (score){
            //console.log(score.length)
            //console.log(this.data.score.length)
            let lastScore = score.slice(-1)[0].percent

            this.data.lastScore = lastScore
            this.data.score = score

            if(lastScore > 70){
                
                this.data.numCorrectGraphs++
            }else{
                this.data.lives--
            }

            
            console.log(score.slice(-1)[0].percent)


            //console.log("update score")
            if(this.data.lives == 0){
                this.state.training = false;
                this.state.drawEnded = true;
            }else{
                this.state.drawEnded = true;
            }
            //this.data.mathjax = this.data.exps[this.data.counter];
            //this.data.counter += 2;
        },

        updateScore (){
            const score = {
                numCorrectGraphs: this.data.numCorrectGraphs,
                percentArr: this.data.score
            }
            this.$emit('update-score', score);
        },

        nextDrawn(){
            this.state.drawEnded = false;
            this.clearCanvas(this.data.context, this.data.canvas);
            this.data.mathjax = this.data.exps[this.data.counter];
            this.data.counter += 2;
            console.log("next drawn ")
        },

        clearCanvas(context, canvas) {
            context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            this.drawAxis(this.data.context, this.data.canvasWidth, this.data.canvasHeight);
            console.log("clearujem")
        },

        drawAxis(context, width, height) {
            // Draw x-axis
            context.strokeStyle = "#000";
            context.beginPath();
            context.moveTo(0, height / 2);
            context.lineTo(width, height / 2);
            context.stroke();

            // Draw y-axis
            context.beginPath();
            context.moveTo(width / 2, 0);
            context.lineTo(width / 2, height);
            context.stroke();

            // Draw Grid
            // Draw x-axis ticks
            for (let x = -10; x <= 10; x++) {
                const xPos = (x + 10) * (width / 20);
                context.beginPath();
                context.moveTo(xPos, 0);
                context.lineTo(xPos, height);
                context.strokeStyle = "#ddd"; // Set the color of the grid lines
                context.stroke();

                // Draw the tick mark at the bottom of the canvas
                context.beginPath();
                context.moveTo(xPos, height / 2 - 5);
                context.lineTo(xPos, height / 2 + 5);
                context.strokeStyle = "#000"; // Set the color of the tick marks
                context.stroke();
            }

            // Draw Grid
            // Draw y-axis ticks
            for (let y = -10; y <= 10; y++) {
                const yPos = (y + 10) * (height / 20);
                context.beginPath();
                context.moveTo(0, yPos);
                context.lineTo(height, yPos);
                context.strokeStyle = "#ddd"; // Set the color of the grid lines
                context.stroke();

                // Draw the tick mark at the bottom of the canvas
                context.beginPath();
                context.moveTo(width / 2 - 5, yPos);
                context.lineTo(width / 2 + 5, yPos);
                context.strokeStyle = "#000"; // Set the color of the tick marks
                context.stroke();
            }

            this.drawAxisLabels(context, width, height)
        },

        drawAxisLabels(context, width, height) {
            context.font = "11px Arial";
            context.fillStyle = "#000";
            context.textAlign = "center";
            context.textBaseline = "middle";

            // Draw x-axis numbers
            for (let x = -9; x <= 9; x++) {
                const xPos = (x + 10) * (width / 20);
                context.fillText(x, xPos, height / 2 + 12);
            }

            // Draw y-axis numbers
            for (let y = -9; y <= 9; y++) {
                if (y === 0) continue; // Skip the label at the origin
                const yPos = (y + 10) * (height / 20);
                context.fillText(-y, width / 2 - 12, yPos); // The negative sign is to make the positive numbers on top and negative numbers on the bottom
            }
        }


    },

    

    mounted() {
        let score1 = [];
        let correctDrawn = false;
        
            /*.push({
                percent: 55,
                deviation: 23,
            })*/
        //this.updateScore(score)

        const canvas = this.$refs.canvas;
        const context = canvas.getContext("2d");
        this.data.canvas = canvas;
        this.data.context = context;
        const width = canvas.width;
        const height = canvas.height;
        this.data.canvasWidth = width;
        this.data.canvasHeight = height;
        let points = [];
        const threshold = 2;
        let counter = 2;

        drawAxis();

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        //const allExpressions = store.state.game.training.graphs;
        const allExpressions = this.data.exps
        let expression = allExpressions[0]
        //let mathjax = allExpressions[1]

        canvas.addEventListener("mousedown", (event) => {
            /*if(this.state.drawEnded){
                return
            }*/
            isDrawing = true;
            points = [];
            clearCanvas();
            lastX = event.offsetX;
            lastY = event.offsetY;
            context.strokeStyle = "#000000";
        });

        canvas.addEventListener("mousemove", (event) => {
        if (isDrawing) {
            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();

            //console.log("x: " + lastX + " y:" + lastY)

            points.push({
            x: lastX,
            y: lastY,
            });

            lastX = event.offsetX;
            lastY = event.offsetY;
        }
        });

        function correctGraph(x) {
            //console.log (eval('Math.log(x)'))
            //console.log ("'" + expression + "'")

            return eval(expression); 
        }

        canvas.addEventListener("mouseleave", () => {
            if (isDrawing) {
                endDrawing();
                if(correctDrawn){
                   this.checkScore(score1); 
                }
                
            }
            
        });

        canvas.addEventListener("mouseup", () => {
            if (isDrawing) {
                endDrawing();
                if(correctDrawn){
                   this.checkScore(score1); 
                }
            }

        });

        function endDrawing() {
            isDrawing = false;

            let error = 0;
            // Your code to compare the drawn graph with the correct math graph goes here
            let numUserCorrectPoints = 0;
            let numRelevantCorrectPoints = 0;
            let numRelevantCorrectPoints1 = 0;
            let numRelevantCorrectPoints2 = 0;
            let userPoints = [];
            let difference = 0;
            let yUser = [];
            let yCorrect = [];
            console.log(points.length);
            if (points.length < 50 || points.length > 700) {
                clearCanvas();
                correctDrawn = false;
                return;
            }

            //console.log(points);
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                userPoints.push({
                x: (point.x - width / 2) / (width / 20),
                y: (height / 2 - point.y) / (height / 20),
                });
            }

            let correctPoints = [];
            for (let x = -10; x <= 10; x += 0.05) {
                //console.log("-------x: " + x);
                const userY = interpolation(userPoints, x); // Calculate the user's y-value at x using interpolation
                let correctY = correctGraph(x); // Calculate the correct y-value at x
                //console.log(userY, correctY);
                //if(correctY > 10 || correctY < -10){
                if ((correctY > 10 || correctY < -10) || isNaN(correctY)) {
                //correctY = null;
                    
                } else {
                numRelevantCorrectPoints1++;
                //console.log(userY, correctY);
                }
                if (userY == null) {
                //correctY = null;
                } else {
                numRelevantCorrectPoints2++;
                }

                correctPoints.push({
                x: x,
                y: correctY,
                });

                yUser.push(userY);
                yCorrect.push(correctY);

                

                //if (userY != null){
                const userX = x;
                const correctX = interpolationInv(correctPoints, userY, x);
                //console.log("userX: " + userX + " correctX: " + correctX)
                //console.log("userY: " + userY,"  correctY: " + correctY)
                if (userY != null) {
                    const differenceX = Math.abs(userX - correctX);
                    const differenceY = Math.abs(userY - correctY);
                    
                    //console.log("differenceX: " + differenceX + " differenceY: " + differenceY)

                    difference = (differenceX < differenceY && correctX !=null) ? differenceX : differenceY;

                    error += difference;
                    //console.log("++: " + difference)
                    //console.log(userX, correctX);
                    //console.log(userY, correctY);
                    //console.log("Rozdiel x: " + differenceX + " y: " + differenceY);
                    //console.log("Rozdiel: " + difference);
                    if (difference < threshold) {
                        //console.log("Correct");
                        numUserCorrectPoints++;
                        //console.log("++++++++++++++++")
                    }
                }

                //}

                //error += Math.abs(userY - correctY); // Add the difference between the user's y-value and the correct y-value to the error
                //console.log("Rozdiel: " + Math.abs(userY - correctY))
                //console.log("Error: " + error)
                //console.log(userY, correctY)
                //if ( (userY != null) && (difference < threshold)) {
                //            console.log("Correct")
                //            numUserCorrectPoints++;
                //        }
            }
            console.log("Relevant correct points1: " + numRelevantCorrectPoints1);
            console.log("Relevant correct points2: " + numRelevantCorrectPoints2);
            console.log("Num user correct points: " + numUserCorrectPoints);
            drawPoints(correctPoints);

            // Calculate the percentage of correct points
            numRelevantCorrectPoints =
                numRelevantCorrectPoints1 >= numRelevantCorrectPoints2
                ? numRelevantCorrectPoints1
                : numRelevantCorrectPoints2;
            const percentCorrect =
                (numUserCorrectPoints / numRelevantCorrectPoints) * 100;
            console.log("Bigger correct points: " + numRelevantCorrectPoints);
            // Output the percentage of correct points
            console.log("Error: " + error);
            console.log(`Percentage of correct points: ${percentCorrect}%`);

            console.log("Similarity: " + similarity(yUser, yCorrect));
            
            score1.push({
                percent: percentCorrect.toFixed(2),
                //deviation: error.toFixed(2),
            })



            correctDrawn = true;

            expression = allExpressions[counter]
            counter += 2;
            
            return;
        }
        
        
        function similarity(y1, y2) {
            let correlation = 0;
            let mean_y1 = y1.reduce((acc, val) => acc + val, 0) / y1.length;
            let mean_y2 = y2.reduce((acc, val) => acc + val, 0) / y2.length;
            let sum_xy = 0;
            let sum_x2 = 0;
            let sum_y2 = 0;
            for (let i = 0; i < y1.length; i++) {
                let deviation_y1 = y1[i] - mean_y1;
                let deviation_y2 = y2[i] - mean_y2;
                sum_xy += deviation_y1 * deviation_y2;
                sum_x2 += Math.pow(deviation_y1, 2);
                sum_y2 += Math.pow(deviation_y2, 2);
            }
            correlation = sum_xy / Math.sqrt(sum_x2 * sum_y2);
            return correlation;
        }

        function drawAxisLabels() {
            context.font = "11px Arial";
            context.fillStyle = "#000";
            context.textAlign = "center";
            context.textBaseline = "middle";

            // Draw x-axis numbers
            for (let x = -9; x <= 9; x++) {
                const xPos = (x + 10) * (width / 20);
                context.fillText(x, xPos, height / 2 + 12);
            }

            // Draw y-axis numbers
            for (let y = -9; y <= 9; y++) {
                if (y === 0) continue; // Skip the label at the origin
                const yPos = (y + 10) * (height / 20);
                context.fillText(-y, width / 2 - 12, yPos); // The negative sign is to make the positive numbers on top and negative numbers on the bottom
            }
        }


        function drawAxis() {
            // Draw x-axis
            context.strokeStyle = "#000";
            context.beginPath();
            context.moveTo(0, height / 2);
            context.lineTo(width, height / 2);
            context.stroke();

            // Draw y-axis
            context.beginPath();
            context.moveTo(width / 2, 0);
            context.lineTo(width / 2, height);
            context.stroke();

            // Draw Grid
            // Draw x-axis ticks
            for (let x = -10; x <= 10; x++) {
                const xPos = (x + 10) * (width / 20);
                context.beginPath();
                context.moveTo(xPos, 0);
                context.lineTo(xPos, height);
                context.strokeStyle = "#ddd"; // Set the color of the grid lines
                context.stroke();

                // Draw the tick mark at the bottom of the canvas
                context.beginPath();
                context.moveTo(xPos, height / 2 - 5);
                context.lineTo(xPos, height / 2 + 5);
                context.strokeStyle = "#000"; // Set the color of the tick marks
                context.stroke();
            }

            // Draw Grid
            // Draw y-axis ticks
            for (let y = -10; y <= 10; y++) {
                const yPos = (y + 10) * (height / 20);
                context.beginPath();
                context.moveTo(0, yPos);
                context.lineTo(height, yPos);
                context.strokeStyle = "#ddd"; // Set the color of the grid lines
                context.stroke();

                // Draw the tick mark at the bottom of the canvas
                context.beginPath();
                context.moveTo(width / 2 - 5, yPos);
                context.lineTo(width / 2 + 5, yPos);
                context.strokeStyle = "#000"; // Set the color of the tick marks
                context.stroke();
            }

             drawAxisLabels();
        }

        function clearCanvas() {
            context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            drawAxis();
        }

        function drawPoints(points) {
            //console.log("drawujem pointy");
            //console.log(points)
            context.strokeStyle = "#FF0000";
            let canvasPoints = [];

            // Calculate points to canvas dimension
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                canvasPoints.push({
                x: point.x * (width / 20) + width / 2,
                y: height / 2 - point.y * (height / 20),
                });
            }

            //Draw correct graph
            for (let i = 0; i < canvasPoints.length - 1; i++) {
                const point = canvasPoints[i];
                const point2 = canvasPoints[i + 1];
                //console.log(point, point2)
                context.beginPath();
                context.moveTo(point.x, point.y);
                context.lineTo(point2.x, point2.y);
                context.stroke();
            }
        }

        function interpolation(points, x) {
            // Sort points by x-value in ascending order
            //console.log(points)
            //points.sort((a, b) => a.x - b.x);
            //.log(points)
            // Find the two points that bracket x
            let leftPoint = null;
            let rightPoint = null;
            for (let i = 0; i < points.length; i++) {
                if (points[i].x < x) {
                leftPoint = points[i];
                } else if (points[i].x >= x && !rightPoint) {
                rightPoint = points[i];
                }
            }

            // If x is less than the smallest x-value or greater than the largest x-value, return null
            if (!leftPoint || !rightPoint) {
                return null;
            }

            // Calculate the slope of the line between the two points
            const slope = (rightPoint.y - leftPoint.y) / (rightPoint.x - leftPoint.x);

            // Calculate the y-value at x using linear interpolation
            const y = leftPoint.y + slope * (x - leftPoint.x);

            return y;
        }

        function interpolationInv(points, y, closestX) {
            // Sort points by x-value in ascending order
            //console.log(points)
            //points.sort((a, b) => a.x - b.x);
            //.log(points)
            // Find the two points that bracket x
            let leftPoint = null;
            let rightPoint = null;
            for (let i = 0; i < points.length; i++) {
                if (points[i].y < y) {
                leftPoint = points[i];
                } else if (points[i].y >= y && !rightPoint) {
                rightPoint = points[i];
                }
            }

            // If x is less than the smallest x-value or greater than the largest x-value, return null
            if (!leftPoint || !rightPoint) {
                return null;
            }

            // Calculate the slope of the line between the two points
            const slope = (rightPoint.x - leftPoint.x) / (rightPoint.y - leftPoint.y);

            // Calculate the y-value at x using linear interpolation
            const x = leftPoint.x + slope * (y - leftPoint.y);

            if (closestX) {
                let closestPoint = null;
                let closestDistance = Infinity;
                for (let i = 0; i < points.length; i++) {
                const distance = Math.abs(points[i].x - x);
                if (distance < closestDistance) {
                    closestPoint = points[i];
                    closestDistance = distance;
                }
                }
                return closestPoint.x;
            }

            return x;
        }
    },
};



/* 
function similarity($y1, $y2) {
  $correlation = 0;
  $mean_y1 = array_sum($y1) / count($y1);
  $mean_y2 = array_sum($y2) / count($y2);
  $sum_xy = 0;
  $sum_x2 = 0;
  $sum_y2 = 0;
  for ($i = 0; $i < count($y1); $i++) {
    $deviation_y1 = $y1[$i] - $mean_y1;
    $deviation_y2 = $y2[$i] - $mean_y2;
    $sum_xy += $deviation_y1 * $deviation_y2;
    $sum_x2 += pow($deviation_y1, 2);
    $sum_y2 += pow($deviation_y2, 2);
  }
  $correlation = $sum_xy / sqrt($sum_x2 * $sum_y2);
  return $correlation;
}

*/ 
</script>

<style></style>
