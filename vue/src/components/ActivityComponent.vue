<template>
  <div>
    <apexchart
      height="120"
      width="350"
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " activity";
            },
          },
        },
      },
      chartSeries: [
        {
          name: "Activity",
          data: [5, 7, 3, 8, 2, 6, 4],
        },
      ],
    };
  },
};
</script>
