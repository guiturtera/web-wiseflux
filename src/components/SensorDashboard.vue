<template>
  <BarChart :labels="month_labels" :datasets="month_values"/>
</template>


<script>
import BarChart from './BarChart.vue'
import SensorService from "../services/sensor.service"
import { subDays, format } from 'date-fns'

export default {
    props: {
      sensorId: Number
    },
    data() {
      return {
        measures: [],
        month_labels: [],
        month_values: []
      }
    },
    components: {
        BarChart
    },
    async created() {
      let current_date = new Date()
      this.measures = (await SensorService.getMeasures(this.sensorId, current_date, subDays(current_date, 7))).data.response
      this.formatBarData()
    },
    methods: {
      formatBarData() {
        let grouped_by = Object.groupBy(this.measures, (measure) => format(new Date(measure.measureTime), 'MM/yyyy'))

        this.month_labels = Object.keys(grouped_by)
        this.month_values = []
        for (let i = 0; i < this.month_labels; i++) {
          console.log(i)
        }

      }
    }
}
</script>

<style>

</style>