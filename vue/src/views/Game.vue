<template>
    <div class="flex justify-center">
        <!--<div>
            <p>Here is some math: \\(x^2 + y^2 = z^2\\)</p>
            <canvas class="w-96" style="width: 600px; height: 400px;" id="myChart"></canvas>
        </div>-->
        <canvas ref="canvas"  width="400" height="400" class="bg-white"></canvas>
        <div>
        <button @click="clearCanvas()" class="bg-white w-32 p-2 mx-2 my-12">Clear Canvas</button>

    </div>
    </div>
</template>

<script>
//import { Chart } from 'chart.js/auto';
//import Vue from 'vue';




export default {
    data() {
        return{

        }
    },

    mounted() {
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');

        // Your code to draw axes and values on the canvas goes here

        const width = canvas.width;
        const height = canvas.height;

        let points = [];

        drawAxis();

        function drawAxis(){
           // Draw x-axis
           context.strokeStyle = "#333"
            context.beginPath();
            context.moveTo(0, height / 2);
            context.lineTo(width, height / 2);
            context.stroke();

            // Draw y-axis
            context.beginPath();
            context.moveTo(width / 2, 0);
            context.lineTo(width / 2, height);
            context.stroke();

            // Draw x-axis ticks
            for (let x = -10; x <= 10; x++) {
            const xPos = (x + 10) * (width / 20);
            context.beginPath();
            context.moveTo(xPos, height / 2 - 5);
            context.lineTo(xPos, height / 2 + 5);
            context.stroke();
            }

            // Draw y-axis ticks
            for (let y = -10; y <= 10; y++) {
            const yPos = (y + 10) * (height / 20);
            context.beginPath();
            context.moveTo(width / 2 - 5, yPos);
            context.lineTo(width / 2 + 5, yPos);
            context.stroke();
            } 
        }

        function clearCanvas(){
            context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            drawAxis();

        }

        function drawPoints(points){
            console.log("drawujem pointy")
            console.log(points)
            context.strokeStyle = "#FF0000"
            let canvasPoints = []

            for (let i = 0; i < points.length; i++) {
            const point = points[i];
            //const x = points[i].x;
            //const y = points[i].y;
            canvasPoints.push({
                x: (point.x + width / 2) ,
                y: (height / 2 + point.y) 
            });
        }
            
            for (let i = 0; i < canvasPoints.length - 1; i++) {
                const point = canvasPoints[i];
                const point2 = canvasPoints[i+1]
                console.log(point, point2)
                context.beginPath();
                context.moveTo(point.x, point.y);
                context.lineTo(point2.x, point2.y);
                context.stroke();
            }
            //context.stroke();
        }

    
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        canvas.addEventListener('mousedown', (event) => {
        isDrawing = true;
        points = [];
        clearCanvas();
        lastX = event.offsetX;
        lastY = event.offsetY;
        context.strokeStyle = "#000000"
        });

        canvas.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            
            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();

            //console.log("x: " + lastX + " y:" + lastY)

            points.push({
                x: lastX,
                y: lastY,
            })

            lastX = event.offsetX;
            lastY = event.offsetY;
            
        }
        });

        function correctGraph(x) {
            return x; // Replace with your own math function
        }

        canvas.addEventListener('mouseup', () => {
        isDrawing = false;
        const threshold = 1;
        let error = 0;
        // Your code to compare the drawn graph with the correct math graph goes here
        let numCorrectPoints = 0;
        let userPoints = [];
        
        console.log(points)
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            //const x = points[i].x;
            //const y = points[i].y;
            userPoints.push({
                x: (point.x - width / 2) / (width/20),
                y: (height / 2 - point.y) / (height / 20)
            });
        }

        let correctPoints = [];
        for (let x = -10; x <= 10; x += 0.1) {
            const userY = interpolation(userPoints, x); // Calculate the user's y-value at x using interpolation
            const correctY = correctGraph(x); // Calculate the correct y-value at x
            
            correctPoints.push({
                x: x,
                y: correctY,
            })
            error += Math.abs(userY - correctY); // Add the difference between the user's y-value and the correct y-value to the error
            console.log(userY, correctY)
            if (Math.abs(userY - correctY) < threshold) {
            numCorrectPoints++;
            }
        } 

        drawPoints(correctPoints);

            // Calculate the correct y-value at x
            // correctY = (height / 2) - (correctGraph(x) * (height / 20));
            
            // Check if the user's point is within the acceptable threshold of the correct y-value
            /*console.log(y, correctY)
            if (Math.abs(y - correctY) < threshold) {
            numCorrectPoints++;
            }*/
        

        // Calculate the percentage of correct points
        const percentCorrect = (numCorrectPoints / points.length) * 100;

        // Output the percentage of correct points
        console.log(`Percentage of correct points: ${percentCorrect}%`);
            return{
                
            }
        });

        function interpolation(points, x) {
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
        }
    }
    
    


}
</script>

<style>

</style>