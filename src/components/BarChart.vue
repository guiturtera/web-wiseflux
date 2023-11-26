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
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'
import { Line } from 'vue-chartjs'
import 'chartjs-adapter-date-fns';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

export default {
  name: 'BarChart',
  props: {
    labels: Object,
    datasets: Object,
    unit: String
  },
  components: { Line },
  data() {
    return {
      chartData: {
        labels: this.labels,
        datasets: [ {
          label: 'Consumo em ' + this.unit,
          borderColor: '#A1CAF1',
          backgroundColor: '#A1CAF1',
          pointRadius: 0,
          data: this.datasets
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            // time: {
            //   displayFormats: {
            //       quarter: 'MMM YYYY'
            //   }
            // },
            title: {
              display: false
            }
          },
          y: {
            title: {
              display: false
            }
          }
        },
        
          yAxes: [{
          ticks: {
            reverse: true,
          },
        }]
      }
    }
  }
}
</script>