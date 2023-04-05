<template>
    <div>
        <p class="text-lg text-center py-2">Statistics</p>
        <div>
        <apexchart  height="300" type="line" :options="chartOptions" :series="chartSeries"></apexchart>
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
        const allScoreData = store.state.user.scores[gameName].all;
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
    setup() {
    const chartOptions = reactive({
      chart: {
        id: "line-chart",
      },
      /*xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },*/
      markers: {
        size: 7,
      },
      fill:{
            //colors:['#e63946', '#06d6a0','#fb8500' ]//colors:['#ef476f', '#9b5de5', '#06d6a0']
            colors:['#76c0f5'],
        },

    });

    /*const chartSeries = reactive([
      {
        name: "Series 1",
        data: [],// [30, 40, 25, 50, 49, 21, 70, 51, 40, 65, 30, 20],
        color:'#76c0f5',
      },
    ]);*/


    return {
      chartOptions,
      //chartSeries,
    };
  },

}
</script>

<style>

</style>