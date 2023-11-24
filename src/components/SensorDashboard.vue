<template>
  <BarChart  v-if="isMounted" :labels="hourly_labels" :datasets="hourly_values"/>
</template>


<script>
import { ref } from 'vue'
import BarChart from './BarChart.vue'
import SensorService from "../services/sensor.service"
import { subDays, format } from 'date-fns'

export default {
    props: {
      sensorId: Number
    },
    data() {
      return {
        isMounted: false,
        start_date: null,
        end_date: null,
        hourly_average_measures: [],
        hourly_labels: [],
        hourly_values: [],
        daily_average_measures: [],
        daily_labels: [],
        daily_values: [],
        monthly_average_measures: [],
        monthly_labels: [],
        monthly_values: []
      }
    },
    components: {
        BarChart
    },
    async created() {
      this.isMounted = false
      this.start_date = new Date()
      this.end_date = subDays(this.start_date, 7)

      this.hourly_average_measures = (await SensorService.getHourlyAverageMeasures(this.sensorId, this.start_date, this.end_date)).data.response
      let res = this.sortdByDate(this.hourly_average_measures)
      this.hourly_labels = res['labels']
      this.hourly_values = res['dataset']
      this.isMounted = true
    },
    mounted() {
    },
    methods: {
      sortdByDate(specified_measures) {
        const labels = [];
        const dataset = [];

        specified_measures.forEach(obj => {
          labels.push(obj.measureTime);
          dataset.push(obj.measureValue);
        });

        return { labels, dataset }
      }
    }
}
</script>

<style>

</style>