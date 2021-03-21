<script>
import { Line, mixins } from "vue-chartjs";
import zoomPlugin from "chartjs-plugin-zoom";

export default {
  name: "LineChart",

  props: ["title", "min", "max"],

  mixins: [mixins.reactiveProp],
  extends: Line,
  mounted() {
    this.addPlugin(zoomPlugin);
    this.renderChart(this.chartdata, this.options);
  },

  watch: {
    min: function() {
      this.$data._chart.destroy();
      this.renderChart(this.chartData, this.options);
    }
  },

  computed: {
    options: function() {
      return {
        // animation: {
        //   duration: 0
        // },
        // hover: {
        //   animationDuration: 0
        // },
        // responsiveAnimationDuration: 0,
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          fontColor: "white",
          text: this.title
        },
        parsing: {
          xAxisKey: "created_at",
          yAxisKey: "temperature"
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "white"
              }
            }
          ],
          xAxes: [
            {
              type: "time",
              time: {
                tooltipFormat: "ll HH:mm",
                displayFormats: {
                  second: "HH:mm:ss",
                  minute: "HH:mm",
                  hour: "HH:mm"
                }
              },
              ticks: {
                min: this.min.toISOString(),
                max: this.max.toISOString(),
                fontColor: "white"
              }
            }
          ]
        },
        plugins: {
          zoom: {
            pan: {
              enabled: false
            },
            zoom: {
              enabled: true,

              drag: true,

              mode: "x",

              overScaleMode: "x",

              rangeMin: {
                y: null
              },
              rangeMax: {
                y: null
              },

              speed: 0.1,

              threshold: 2,

              sensitivity: 3,

              // Function called while the user is zooming
              onZoom: function() {
                console.log(`I'm zooming!!!`);
              },
              // Function called once zooming is completed
              onZoomComplete: function() {
                console.log(`I was zoomed!!!`);
              },
              // Function called when wheel input occurs without modifier key
              onZoomRejected: function() {
                console.log(`I didn't start zooming!`);
              }
            }
          }
        }
      };
    }
  }
};
</script>

<style scoped></style>
