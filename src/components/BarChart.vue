<template>
  <div>
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>

</template>

<script>
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default {
  name: 'BarChart',
  props: {
    labels: Object,
    datasets: Object
  },
  components: { Line },
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [ {
          label: 'Consumo em W/h',
          backgroundColor: '#f87979',
          data: this.datasets
        }]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>