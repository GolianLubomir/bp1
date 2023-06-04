<template>
  <div>
    <div class="justify-center">
      <div class="w-96 m-auto h-28">
        <div class="">
          <math-jax-component
            class="w-96 px-24 text-3xl whitespace-nowrap absolute text-white"
            :expression="mathjax"
          ></math-jax-component>
          <div class="flex justify-between mt-1">
            <!--<div class="text-white text-right right flex"> <p> O </p> <p> O </p> <p> O </p> </div>-->
            <p class="text-white text-xl">Score: {{ numCorrectGraphs }}</p>
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
          <!--<div class="mt-9 h-7 text-slate-100 text-lg w-28 font-bold  rounded-full py-0 px-4 ">
                    {{lastScore}} %
                </div>-->
          <div
            v-if="lastScore >= 70"
            class="mt-9 h-7 text-slate-100 text-lg w-28 font-bold rounded-full py-0 px-4"
          >
            Správne
          </div>
          <div
            v-if="!(lastScore >= 70)"
            class="mt-9 h-7 text-slate-100 text-lg w-28 font-bold rounded-full py-0 px-4"
          >
            Nesprávne
          </div>
          <button
            v-if="training"
            @click="nextDrawn"
            class="inline-block mt-9 h-7 hover:text-amber-600 text-gray-500 font-bold py-0 px-4 rounded-full bg-white myButtonShadow"
          >
            Next -
          </button>

          <button
            v-if="!training"
            @click="evaluate"
            class="inline-block bg-white mx-3 mt-9 h-7 hover:text-amber-600 text-gray-600 myButtonShadow font-bold px-4 rounded-full"
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
import { reactive } from "vue";
import MathJaxComponent from "../components/MathJaxComponent.vue";
import LivesComponent from "../components/LivesComponent.vue";

import store from "../store";
//import * as math from "mathjs";

export default {
  setup() {
    const data = reactive({
      expressions: store.state.game.training.graphs,
      mathjax: store.state.game.training.graphs[1],
      currentExpression: store.state.game.training.graphs[0],
      score: [],
      scores: [],
      maxDeviation: 1,
      lastScore: 0,
      expCounter: 2,
      mathjaxCounter: 3,
      canvas: null,
      context: null,
      canvasWidth: null,
      canvasHeight: null,
      lives: 3,
      numCorrectGraphs: 0,
    });

    const state = reactive({
      training: true,
      isDrawing: false,
      correctDrawn: false,
      trainingEnded: false,
      drawEnded: false,
    });

    return {
      data,
      state,
    };
  },

  components: {
    MathJaxComponent,
    LivesComponent,
  },

  computed: {
    mathjax() {
      return this.data.mathjax;
    },
    training() {
      return this.state.training;
    },
    drawEnded() {
      return this.state.drawEnded;
    },
    lastScore() {
      return this.data.lastScore;
    },
    lives() {
      return this.data.lives;
    },
    numCorrectGraphs() {
      return this.data.numCorrectGraphs;
    },
  },

  methods: {
    checkScore(score) {
      //console.log(score.length)
      //console.log(this.data.score.length)
      let lastScore = score.slice(-1)[0].percent;

      this.data.lastScore = lastScore;
      this.data.score = score;

      if (lastScore > 70) {
        this.data.numCorrectGraphs++;
      } else {
        this.data.lives--;
      }

      console.log(score.slice(-1)[0].percent);

      //console.log("update score")
      if (this.data.lives == 0) {
        this.state.training = false;
        this.state.drawEnded = true;
      } else {
        this.state.drawEnded = true;
      }

      this.updateScore();
      //this.data.mathjax = this.data.exps[this.data.counter];
      //this.data.counter += 2;
    },

    updateScore() {
      const score = {
        numCorrectGraphs: this.data.numCorrectGraphs,
        percentArr: this.data.score,
        trainingEnded: this.state.trainingEnded,
      };
      this.$emit("update-score", score);
    },

    evaluate() {
      this.state.trainingEnded = true;
      this.updateScore();
    },

    nextDrawn() {
      this.state.drawEnded = false;
      this.clearCanvas(this.data.context, this.data.canvas);
      this.data.mathjax = this.data.expressions[this.data.mathjaxCounter];
      this.data.mathjaxCounter += 2;
      console.log("next drawn ");
    },

    clearCanvas(context, canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      this.drawAxis(
        this.data.context,
        this.data.canvasWidth,
        this.data.canvasHeight
      );
      console.log("clearujem");
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
      this.drawAxisLabels(context, width, height);
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
    },

    drawPoints(context, width, height, points) {
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
    },

    getShortestDistance(correctPoints, userX, userY, deviation) {
      let shortestDistance = Infinity;
      for (let point of correctPoints) {
        if (point.x < userX - deviation || point.x > userX + deviation) {
          continue;
        }
        let distance = Math.sqrt(
          Math.pow(point.x - userX, 2) + Math.pow(point.y - userY, 2)
        );
        if (distance < shortestDistance) {
          shortestDistance = distance;
        }
      }
      return shortestDistance === Infinity ? null : shortestDistance;
    },

    interpolation(points, x) {
      // Sort points by x-value in ascending order
      points.sort((a, b) => a.x - b.x);

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
    },

    endDrawing(context, width, height, points) {
      this.state.isDrawing = false;

      // Code to compare the drawn graph with the correct math graph

      let numUserCorrectPoints = 0;
      let numRelevantCorrectPoints = 0;
      let numRelevantCorrectPoints1 = 0;
      let numRelevantCorrectPoints2 = 0;
      let userPoints = [];

      console.log("points length: " + points.length);

      if (points.length < 50 || points.length > 700) {
        this.clearCanvas(context, this.data.canvas);
        this.state.correctDrawn = false;
        return;
      }

      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        userPoints.push({
          x: (point.x - width / 2) / (width / 20),
          y: (height / 2 - point.y) / (height / 20),
        });
      }

      let correctPoints = [];
      let userInterpolatedPoints = [];

      for (let x = -10; x <= 10; x += 0.05) {
        let correctY = this.correctGraph(x);
        if (correctY <= 10 && correctY >= -10 && !isNaN(correctY)) {
          numRelevantCorrectPoints1++;
        }

        correctPoints.push({
          x: x,
          y: correctY,
        });
      }

      for (let x = -10; x <= 10; x += 0.05) {
        const userY = this.interpolation(userPoints, x); // Calculate the user's y-value at x using interpolation

        userInterpolatedPoints.push({
          x: x,
          y: userY,
        });

        if (userY != null) {
          numRelevantCorrectPoints2++;
        }
      }

      for (let x = -10; x <= 10; x += 0.05) {
        const userX = x;
        let matchingPoints = userInterpolatedPoints.filter(
          (point) => point.x == x
        );
        let userY = matchingPoints.length > 0 ? matchingPoints[0].y : null;

        if (userY != null) {
          let shortestDistance = this.getShortestDistance(
            correctPoints,
            userX,
            userY,
            this.data.maxDeviation
          );

          if (
            shortestDistance !== null &&
            shortestDistance < this.data.maxDeviation
          ) {
            numUserCorrectPoints++;
          }
        }
      }

      console.log("Relevant correct points1: " + numRelevantCorrectPoints1);
      console.log("Relevant correct points2: " + numRelevantCorrectPoints2);
      console.log("Num user correct points: " + numUserCorrectPoints);
      this.drawPoints(context, width, height, correctPoints);

      //drawPoints(interpolationPoints);
      //drawPoints(interpolationInvPoints);

      // Calculate the percentage of correct points
      numRelevantCorrectPoints =
        numRelevantCorrectPoints1 >= numRelevantCorrectPoints2
          ? numRelevantCorrectPoints1
          : numRelevantCorrectPoints2;

      const percentCorrect =
        (numUserCorrectPoints / numRelevantCorrectPoints) * 100;
      console.log(`Percentage of correct points: ${percentCorrect}%`);

      this.data.scores.push({
        percent: percentCorrect.toFixed(2),
      });

      this.state.correctDrawn = true;
      this.data.currentExpression = this.data.expressions[this.data.expCounter];
      this.data.expCounter += 2;

      return;
    },

    correctGraph(x) {
      //const scope = { x: x };
      //return math.evaluate(this.data.currentExpression, scope);
      return eval(this.data.currentExpression);
    },
  },

  mounted() {
    const canvas = this.$refs.canvas;
    const context = canvas.getContext("2d");
    this.data.canvas = canvas;
    this.data.context = context;
    const width = canvas.width;
    const height = canvas.height;
    this.data.canvasWidth = width;
    this.data.canvasHeight = height;
    let points = [];

    this.drawAxis(context, width, height);

    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("mousedown", (event) => {
      if (this.state.drawEnded) {
        return;
      }
      this.state.isDrawing = true;
      points = [];
      lastX = event.offsetX;
      lastY = event.offsetY;
      //.strokeStyle = "#000"
    });

    canvas.addEventListener("mousemove", (event) => {
      if (this.state.isDrawing) {
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        points.push({
          x: lastX,
          y: lastY,
        });

        lastX = event.offsetX;
        lastY = event.offsetY;
      }
    });

    canvas.addEventListener("mouseleave", () => {
      if (this.state.isDrawing) {
        this.endDrawing(context, width, height, points);
        if (this.state.correctDrawn) {
          this.checkScore(this.data.scores);
        }
      }
    });

    canvas.addEventListener("mouseup", () => {
      if (this.state.isDrawing) {
        this.endDrawing(context, width, height, points);
        if (this.state.correctDrawn) {
          this.checkScore(this.data.scores);
        }
      }
    });
  },
};
</script>

<style></style>
