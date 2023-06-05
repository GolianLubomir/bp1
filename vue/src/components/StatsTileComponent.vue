<template>
  <div class="px-6 py-1 text-center">
    <h1
      class="text-lg sm:text-xl lg:text-2xl font-bold text-slate-600 mb-2 whitespace-nowrap border-b-2"
    >
      {{ title }}
    </h1>
    <div id="chart">
      <apexchart
        type="radialBar"
        height="220"
        :options="chartOptions"
        :series="percentil"
      >
      </apexchart>
    </div>
    <p class="text-lg pb-1">
      Skóre:
      <span class="text-2xl">{{ points }}</span> bodov
    </p>
    <router-link
      :to="{ name: linkTo }"
      tag="a"
      class="text-lg font-bold underline decoration-2 text-sky-500"
    >
      Trénovať
    </router-link>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    points: {
      type: Number,
      default: 0,
    },
    percentil: {
      type: Array,
      default: [50],
    },
    linkTo: {
      type: String,
      default: "Home",
    },
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
          type: "radialBar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: "65%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "67%",
              margin: 0,
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px",
              },
              value: {
                formatter: function (val) {
                  return parseInt(val);
                },
                color: "#111",
                fontSize: "36px",
                show: true,
              },
            },
          },
        },
        fill: {
          colors: ["#06d6a0"],
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Percentil"],
      },
    };
  },
};
</script>

<style>
.my-border {
  border-width: 12px;
}
</style>
