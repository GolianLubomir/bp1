<template>
    <div>
        <p class="text-xl text-slate-600 font-bold text-center pb-2">Statistics</p>
        <div>
        <apexchart  height="300" type="area" :options="chartOptions" :series="chartSeries"></apexchart>
        </div>
    </div>
</template>

<script>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import VueApexCharts from 'vue3-apexcharts';

export default {
    components: {
        apexchart: VueApexCharts,
    },
    computed: {
        chartSeries() {
          // get the current game name from the route
          const store = useStore();
          const router = useRouter();
          const gameName = router.currentRoute.value.name;
              console.log("game name: " + gameName);
          // get the description for the current game from the store
          //const allScoreData = store.state.user.scores[gameName].all;
          const allScoreData = store.state.user.scores[gameName]?.all || [];
          if (allScoreData.length === 0) {
            return [];
          }
          const chartData = [];
          allScoreData.forEach(item => {
              chartData.push(item.score)
          });
          console.log("game dataqq " + chartData);
          const chartSeries = [
              {
              name: gameName, 
              data: chartData,
              color: "#76c0f5",
              },
          ];

          return chartSeries;
        },
    },
    data() {
      return {
        chartOptions: reactive({
          chart: {
            id: "line-chart",
            type: "area", // set chart type to "area"
          },
          fill: {
            type: "solid", // set fill type to "solid"
            opacity: 0.4, // set fill opacity
          },
          stroke: {
            width: 2, // set stroke width
            curve: "smooth", // set curve type
          },
          dataLabels: {
            enabled: false
          },
          /*xaxis: {
            labels: {
              show: false
            }
          }*/
        }),
      };
    },

}
</script>

<style>

</style>