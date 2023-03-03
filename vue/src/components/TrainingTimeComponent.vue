<template>
  <div class="px-0 py-0 text-center flex">
    
   
    <div id="chart" class="w-48">
      <apexchart type="radialBar" height="220" :options="chartOptions" :series="seriesprops1"></apexchart>
    </div>
    <div id="chart1" class="w-48">
      <apexchart type="radialBar" height="220" :options="chartOptions1" :series="seriesprops2"></apexchart>
    </div>
    
  </div>
  
</template>

<script>

import {useRouter} from "vue-router"
import VueApexCharts from 'vue3-apexcharts';
/*const props = defineProps({
    title: "String",
    percent: "String",
    points: "String",


})*/




export default {
  props: {
    seriesprops1: {
      type: Array,
      default: [50, 50, 50],
    },
    seriesprops2: {
      type: Array,
      default: [50, 50, 50],
    },
  },

  components: {
          apexchart: VueApexCharts,
        },

  data() {
        return {
            var: this.seriesprops1,
            series: [25, 55, 67],
          chartOptions: {
            chart: {
              height: 350,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                hollow: {
                  margin: 3,
                  size: '40%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: false,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: ['#FFF', '#FFF', '#FFF'],
                  strokeWidth: '100%',
                  margin: 3, // margin is in pixels
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 4,
                    opacity: 0.25
                  }
                },
                dataLabels: {
                  name: {
                    fontSize: '15px',
                    offsetY: -7,
                    color: '#888',
                  },
                  value: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    offsetY: -4,

                  },
                  total: {
                    show: true,
                    label: 'Total',
                    fontSize: '15px',
                    color: '#888',
                    formatter: function (w) {
                      // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                      console.log(w)
                      let sum = w.config.series[0] + w.config.series[1] + w.config.series[2]
                      return sum + " min"          
                    }
                  }
                }
              }
            },

            fill:{
                //colors:['#00bbf9', '#ffd166', '#06d6a0']
            },
            
            stroke: {
              lineCap: 'round',
              color: '#111'

            },
            labels: ['Math Reactions', 'Number Memory', 'Math Memory'],
          },



           series1: [17, 55, 97],
          chartOptions1: {
            chart: {
              height: 350,
              type: 'radialBar',
            },
            plotOptions: {
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                hollow: {
                  margin: 3,
                  size: '40%',
                  background: '#fff',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '100%',
                  margin: 3, // margin is in pixels
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 0,
                    opacity: 0.25
                  }
                },
                dataLabels: {
                  name: {
                    fontSize: '22px',
                    offsetY: -7,
                    color: '#888',
                  },
                  value: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    //color: '#888',
                    offsetY: -4,

                  },
                  total: {
                    show: true,
                    label: 'Total',
                    fontSize: '15px',
                    color: '#888',
                    formatter: function (w) {
                      // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                      let sum = w.config.series[0] + w.config.series[1] + w.config.series[2]
                      return sum + " min"
                      
                    }
                    
                  }
                }
              }
            },
            fill:{
                //colors:['#e63946', '#06d6a0','#fb8500' ]//colors:['#ef476f', '#9b5de5', '#06d6a0']
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Apples', 'Oranges', 'Bananas'],
          },
          
          
        };
          
          
        //};

        
        
  },
  mounted() {
    console.log(this.seriesprops1);
  },



}


</script>

<style>

</style>