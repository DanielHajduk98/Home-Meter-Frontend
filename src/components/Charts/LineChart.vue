<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  name: "LineChart",

  mixins: [reactiveProp],
  extends: Line,
  props: ["options"],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style scoped></style>
