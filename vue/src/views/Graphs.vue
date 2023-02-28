<!--<template>
    
  <div>
    <v-stage :config="stageConfig" @mousedown="startDrawing" @mousemove="continueDrawing" @mouseup="stopDrawing">
      <v-layer :config="layerConfig">
        <v-line :config="xAxisConfig" />
        <v-line :config="yAxisConfig" />
        <v-path v-for="path in paths" :key="path" />:config="path" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script >
import { Vue, VueKonva, Path, Stage, Layer } from "vue-konva";
import {  } from "konva";


export default {
  components: {
    VPath: Path,
    VStage: Stage,
    VLayer: Layer
  },
  data() {
    return {
      stageConfig: {
        width: 400,
        height: 400
      },
      layerConfig: {},
      xAxisConfig: {
        points: [0, 0, 400, 0],
        stroke: "black"
      },
      yAxisConfig: {
        points: [0, 0, 0, 400],
        stroke: "black"
      },
      paths: []
    };
  },
  methods: {
    startDrawing(event) {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();

      this.paths.push({
        points: [mousePos.x, mousePos.y],
        stroke: "black",
        strokeWidth: 2,
        tension: 0.5,
        closed: false
      });
    },
    /*continueDrawing(event) {
      const stage = event.target.getStage();
      const mousePos = stage.getPointerPosition();
      const currentPath = this.paths[this.paths.length - 1];
      currentPath.points.push(mousePos.x, mousePos.y);
    },*/
    stopDrawing(event) {
      const stage = event.target.getStage();
      stage.batchDraw();
    }
  }
};
</script>-->


<template>
  <div class="">
    <div class="bg-slate-200 w-fit mx-auto">
        <v-stage
        
            ref="stage"
            :config="configKonva"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            >
            <v-layer ref="layer">
                <v-line
                v-for="line in lines"
                :key="line.id"
                :config="{
                    stroke: 'black',
                    points: line.points,
                }"
                />
            </v-layer>
            <v-layer :config="layerConfig">
                <v-line :config="xAxisConfig" />
                <v-line :config="yAxisConfig" />
                <v-line :config="functionConfig" />
            </v-layer>
        </v-stage>
    </div>

    <div>
        <button @click="clear()" class="bg-white w-32 p-2 mx-2 my-12">Clear Canvas</button>
        <button @click="back()" class="bg-white w-32 p-2 mx-2 my-12">Back</button>
    </div>
    
  </div>
</template>

<script>
import { evaluate as mathEval } from 'mathjs';
const width = 400 //window.innerWidth;
const height = 400 //window.innerHeight;
//const pixelRatio = 3
export default {
  data() {
    return {
      lines: [],
      isDrawing: false,
      configKonva: {
        width: width,
        height: height,
        //pixelRatio: pixelRatio
      },
      layerConfig: {},
      xAxisConfig: {
        points: [0, 200, 400, 200],
        stroke: "gray"
      },
      yAxisConfig: {
        points: [200, 0, 200, 400],
        stroke: "gray"
      },
      functionConfig: {
        points: [],
        //points: [87.5, 130, 87.5, 130, 88.5, 130, 89.5, 130, 90.5, 180], //[0, 0, 100, 100, 200, 0, 300, 100, 400, 0],
        //points: [199.5, 200, 200.5, 199, 201.5, 196, 202.5, 191, 203.5, 184, 204.5, 175, 205.5, 164, 206.5, 151, 207.5, 136, 208.5, 119, 209.5, 100, 210.5, 79, 211.5, 56, 212.5, 31, 213.5, 4],
        //points: [185.5, 4, 186.5, 31, 187.5, 56, 188.5, 79, 189.5, 100, 190.5, 119, 191.5, 136, 192.5, 151, 193.5, 164, 194.5, 175, 195.5, 184, 196.5, 191, 197.5, 196, 198.5, 199, 199.5, 200, 200.5, 199, 201.5, 196, 202.5, 191, 203.5, 184, 204.5, 175, 205.5, 164, 206.5, 151, 207.5, 136, 208.5, 119, 209.5, 100, 210.5, 79, 211.5, 56, 212.5, 31, 213.5, 4],
        //points: [194.5, 325, 195.5, 264, 196.5, 227, 197.5, 208, 198.5, 201, 199.5, 200, 200.5, 199, 201.5, 192, 202.5, 173, 203.5, 136, 204.5, 75],
        stroke: "red"
      },
      expression: 'cos(x)'
    };
  },
  
  methods: {
    handleMouseDown(e) {
        this.lines = [];
      this.isDrawing = true;
      const pos = e.target.getStage().getPointerPosition();
      this.lines = [...this.lines, { points: [pos.x, pos.y] }];
    },
    handleMouseMove(e) {
      // no drawing - skipping
      if (!this.isDrawing) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = this.lines[this.lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // replace last
      this.lines.splice(this.lines.length - 1, 1, lastLine);
    },

    handleMouseUp() {
      this.isDrawing = false;
      console.log(this.lines)
        //this.lines = this.genFunc()
    },

    clear(){
        this.lines = [];
    },
    back(){
        this.lines.pop();
    },

   /* genFunc(){
        let line = []
        let line2 = []
        let x = 0

        while(x*x*x < 200 && x < 200){
            line.push((x + 0.5 * -1) + 200)
            line.push(( x*x*x * -1 ) + 200)
            x++
        }

       x--
       x = x*-1
        while(x != 0){
            line2.push((x + 0.5 *-1) + 200)
            line2.push(( x*x*x * -1 ) + 200)
            x++
        }
        console.log(line2)
        console.log(line)
        let lineline = line2.concat(line)
        console.log(lineline)
        return line
    }*/
  },
  /*mounted() {
    // calculate the points for the function y = x^2
    for (let x = 0; x <= 100; x++) {
        if(x*x > 200){
            break
        }
      this.functionConfig.points.push( x);
      this.functionConfig.points.push( x * x );
    }
    console.log(this.functionConfig.points)
  }*/
  /*mounted() {
    const stageWidth = this.configKonva.width;
    const stageHeight = this.configKonva.height;

    // calculate the points for the function y = x^2
    for (let x = -100; x <= 100; x++) {
      const adjustedX = x + stageWidth / 2;
      const adjustedY = -x * x  + stageHeight / 2;
      this.functionConfig.points.push(adjustedX);
      this.functionConfig.points.push(adjustedY);
    }
  }*/
  /*mounted() {
    const stageWidth = this.configKonva.width;
    const stageHeight = this.configKonva.height;

    // calculate the points for the function y = f(x)
    for (let x = -100; x <= 100; x++) {
      const adjustedX = x + stageWidth / 2;
      const adjustedY = -mathEval(this.expression.replace('x', x)) + stageHeight / 2;
      this.functionConfig.points.push(adjustedX);
      this.functionConfig.points.push(adjustedY);
    }
  }*/
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>

