<template>
  <div class="px-6 py-1 text-center">
    <h1  class="text-2xl font-bold text-slate-600 mb-2 whitespace-nowrap  border-b-2"> {{title}} </h1>
    <!--<div class="py-6 mx-auto w-36 h-36 my-border border-green-500 rounded-full text-center">
        <p class="text-3xl text-slate-600 py-4">
           {{percent}}%
        </p>
    </div>-->
    <div id="chart">
      <apexchart type="radialBar" height="220" :options="chartOptions" :series="seriesprops">
        
      </apexchart>
    </div>
    <p  class="text-lg pb-1"> Score: <span class="text-2xl">{{points}}</span>  points </p>
    <router-link :to="{name: linkTo}" tag="a" class="text-lg font-bold underline decoration-2 text-sky-500"> Play </router-link>
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
    title: {
      type: String,
      default: "",
    },
    percent: {
      type: String,
      default: "",
    },
    points: {
      type: String,
      default: "",
    },
    seriesprops: {
      type: Array,
      default: [50],
    },
    linkTo: {
      type: String,
      default: "Home",
    }
  },

  components: {
          apexchart: VueApexCharts,
        },

  data() {
        return {
            series: [90],
          chartOptions: {
            chart: {
              height: 50,
              
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
              //type: 'gradient',
              colors: ['#06d6a0'],
              /*gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 1,
                gradientFromColors: ['#888888'],
                gradientToColors: ['#64CF51'],
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [25, 50]
              }*/
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Percentil'],
          },
          
          
        };
        
  },



  /*setup() {
    const router = useRouter()

    function goToHome() {
      router.push("/")
    }

    return {
      goToHome,
    }
  },*/
}


</script>

<style>
.my-border{
    border-width: 12px;
}
</style>