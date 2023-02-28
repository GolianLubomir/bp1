<template>
    <div class="flex">
        <div>
            <p>Here is some math: \\(x^2 + y^2 = z^2\\)</p>
            <canvas class="w-96" style="width: 600px; height: 400px;" id="myChart"></canvas>
        </div>
        <div id="chart">
            <apexchart type="radialBar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>
//import { Chart } from 'chart.js/auto';
//import Vue from 'vue';
import VueApexCharts from 'vue3-apexcharts';



export default {
    
    name: 'Game',

    components: {
          apexchart: VueApexCharts,
        },

    data() {
        return {
            series: [90],
          chartOptions: {
            chart: {
              height: 350,
              type: 'radialBar',
              toolbar: {
                show: true
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                 hollow: {
                  margin: 0,
                  size: '65%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '36px',
                    show: true,
                  }
                }
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Percentil'],
          },
          
          
        };
        
  },



    
   /*mounted() {
    const data = {
      //labels: ['Red', 'Blue', 'Yellow'],
      datasets: [{
        data: [10, 90],
        backgroundColor: [
          'green',
          '#ddd'
        ],
        borderWidth: [0,0],
        innerWidth: 500,
        outerWidth: 100,
      }]
    };

    const options = {
      responsive: false,
      maintainAspectRatio: false,
      cutoutPercentage: 88,
        animation: {
            animationRotate: true,
            duration: 2000
        },
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        }
    };

    const myChart = new Chart(document.getElementById('myChart'), {
      type: 'doughnut',
      data: data,
      options: options
    });

    
    }*/
}
</script>

<style>

</style>