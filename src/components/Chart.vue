<script>
import { Line, mixins } from "vue-chartjs";
import zoomPlugin from "chartjs-plugin-zoom";

const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["range"],

  mounted() {
    this.addPlugin({
      id: "chartAreaBorder",
      beforeDraw(chart) {
        const { ctx } = chart;
        const chartArea = chart.chartArea;
        if (chart.options.plugins.zoom.zoom.enabled) {
          ctx.save();
          ctx.strokeStyle = "#999999";
          ctx.lineWidth = 1;
          ctx.strokeRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
          );
          ctx.restore();
        }
      }
    });
    this.addPlugin(zoomPlugin);
    this.renderChart(this.chartData, this.options);
  },

  watch: {
    range: function() {
      this.options.scales.xAxes[0].ticks.min = this.range.min;
      this.options.scales.xAxes[0].ticks.max = this.range.max;
      this.renderChart(this.chartData, this.options);
    }
  },

  methods: {
    focus() {
      const enabled = !this.$data._chart.options.plugins.zoom.zoom.enabled;
      this.$data._chart.options.plugins.zoom.zoom.enabled = enabled;
      this.$data._chart.options.plugins.zoom.pan.enabled = enabled;
      this.$data._chart.update();
    },
    unFocus() {
      this.$data._chart.options.plugins.zoom.zoom.enabled = false;
      this.$data._chart.options.plugins.zoom.pan.enabled = false;
      this.$data._chart.update();
    },
    resetZoom() {
      this.$data._chart.resetZoom();
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
                  millisecond: "HH:mm:ss.SSS",
                  second: "HH:mm:ss",
                  minute: "HH:mm",
                  hour: "HH:mm"
                }
              },
              ticks: {
                min: this.range.min,
                max: this.range.max
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
              enabled: false,
              mode: "x",
              overScaleMode: "x",
              speed: 0.1,
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
