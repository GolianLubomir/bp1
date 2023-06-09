<template>
  <div class="px-0 py-0 text-center flex relative">
    <div id="chart" class="md:w-48">
      <apexchart
        type="radialBar"
        height="220"
        :options="chartOptions"
        :series="serprops1"
      ></apexchart>
    </div>
    <div id="chart1" class="md:w-48">
      <apexchart
        type="radialBar"
        height="220"
        :options="chartOptions1"
        :series="serprops2"
      ></apexchart>
    </div>
    <span class="absolute cursor-pointer right-0 bottom-5 border border-gray-400 text-gray-500 text-xs rounded-full w-5 h-5 " @click="openModal"> i </span>
    <InfoModal :isOpen="isModalOpen" @close="isModalOpen = false"></InfoModal>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import InfoModal from './InfoModal.vue'

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

  computed: {
    serprops1() {
      return [
        Math.round(this.seriesprops1[0] * 10),
        Math.round(this.seriesprops1[1] * 7),
        Math.round(this.seriesprops1[2] * 7),
      ];
    },
    serprops2() {
      return [
        Math.round(this.seriesprops2[0] * 7),
        Math.round(this.seriesprops2[1] * 3),
        Math.round(this.seriesprops2[2] * 5),
      ];
    },
  },

  components: {
    apexchart: VueApexCharts,
    InfoModal,
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
    },
  },

  data() {
    return {
      isModalOpen: false,
      var: this.seriesprops1,
      series: [25, 55, 67],
      chartOptions: {
        responsive: [
          {
            breakpoint: 780,
            options: {
              chart: {
                width: 120,
                height: 170,
              },
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    value: {
                      fontSize: "12px",
                    },
                    total: {
                      fontSize: "12px",
                    },
                  },
                },
              },
            },
          },
        ],
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 3,
              size: "40%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: false,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: ["#FFF", "#FFF", "#FFF"],
              strokeWidth: "100%",
              margin: 3,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 4,
                opacity: 0.25,
              },
            },
            dataLabels: {
              name: {
                fontSize: "15px",
                offsetY: -7,
                color: "#888",
              },
              value: {
                fontSize: "16px",
                fontWeight: "bold",
                offsetY: -4,
              },
              total: {
                show: true,
                label: "Total",
                fontSize: "15px",
                color: "#888",
                formatter: function (w) {
                  let sum = Math.round(
                    w.config.series[0] / 10 +
                      w.config.series[1] / 7 +
                      w.config.series[2] / 7
                  );
                  return sum + " min";
                },
              },
            },
          },
        },

        fill: {
          colors: ["#76c0f5", "#fe5f77", "#f7cb73"],
        },

        stroke: {
          lineCap: "round",
          color: "#111",
        },
        labels: ["Matematické reakcie", "Číselná pamäť", "Matematická pamäť"],
      },

      series1: [17, 55, 97],
      chartOptions1: {
        responsive: [
          {
            breakpoint: 780,
            options: {
              chart: {
                width: 120,
                height: 170,
              },
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    value: {
                      fontSize: "12px",
                    },
                    total: {
                      fontSize: "12px",
                    },
                  },
                },
              },
            },
          },
        ],
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 3,
              size: "40%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "100%",
              margin: 3,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 0,
                opacity: 0.25,
              },
            },
            dataLabels: {
              name: {
                fontSize: "22px",
                offsetY: -7,
                color: "#888",
              },
              value: {
                fontSize: "16px",
                fontWeight: "bold",
                offsetY: -4,
              },
              total: {
                show: true,
                label: "Total",
                fontSize: "15px",
                color: "#888",
                formatter: function (w) {
                  let sum = Math.round(
                    w.config.series[0] / 7 +
                      w.config.series[1] / 3 +
                      w.config.series[2] / 5
                  );
                  return sum + " min";
                },
              },
            },
          },
        },
        fill: {
          colors: ["#76c0f5", "#fe5f77", "#f7cb73"],
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Nájdi rovnaké", "Grafy", "Číselné sústavy"],
      },
    };
  },
};
</script>

<style></style>
