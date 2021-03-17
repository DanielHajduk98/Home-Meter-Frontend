<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "LineChart",

  data() {
    return {
      options: {
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
      }
    };
  },

  props: ["title", "min", "max"],

  mixins: [reactiveProp],
  extends: Line,
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style scoped></style>
