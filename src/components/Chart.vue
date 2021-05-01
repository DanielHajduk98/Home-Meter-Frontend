<script>
import { Line, mixins } from "vue-chartjs";
import zoomPlugin from "chartjs-plugin-zoom";

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["min", "max"],
  mounted() {
    this.addPlugin(zoomPlugin);
    this.renderChart(this.chartData, this.options);
  },

  watch: {
    min: function() {
      this.$data._chart.destroy();
      this.renderChart(this.chartData, this.options);
    },

    max: function() {
      this.$data._chart.destroy();
      this.renderChart(this.chartData, this.options);
    }
  },

  data() {
    return {
      options: {
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsiveAnimationDuration: 0,
        responsive: true,
        maintainAspectRatio: false,
        type: "line",
        scales: {
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
                min: this.min,
                max: this.max
              }
            }
          ]
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "x"
            },
            zoom: {
              enabled: true,
              mode: "x",
              overScaleMode: "x",
              speed: 0.1,
              threshold: 2,
              sensitivity: 3
            }
          }
        }
      }
    };
  }
};
</script>

<style></style>
