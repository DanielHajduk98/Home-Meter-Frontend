<script>
import { Line, mixins } from "vue-chartjs";

export default {
  name: "LineChart",

  props: ["title", "min", "max"],

  mixins: [mixins.reactiveProp],
  extends: Line,
  mounted() {
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
        responsive: true,
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
                unit: "minute",
                displayFormats: {
                  second: "HH:mm:ss",
                  minute: "HH:mm"
                }
              },
              ticks: {
                min: this.min.toISOString(),
                max: this.max.toISOString(),
                fontColor: "white"
              }
            }
          ]
        }
      };
    }
  }
};
</script>

<style scoped></style>
