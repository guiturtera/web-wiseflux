<template>
  
    <div>
      <Form @submit="handleSubmit" :validation-schema="schema" class='row mb-5'>
        <div class="form-group col-sm-5 col-md-5">
            <label for="startDate">Data inicial</label>
            <Field
              type="datetime-local"
              id="startDate"
              name="startDate"
              class="form-control"
              v-model="startDate"
            />
            <ErrorMessage name="startDate" class="text-danger" />
        </div>

          <div class="form-group col-sm-5 col-md-5">
            <label for="endDate">Data final</label>
            <Field
              type="datetime-local"
              id="endDate"
              name="endDate"
              class="form-control"
              v-model="endDate"
            />
            <ErrorMessage name="endDate" class="text-danger" />
        </div>

        <div class='form-group col-sm-2 col-md-2 mt-4'>
          <button type="submit" class="btn btn-primary" :disabled="loading"><span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
              <span> Filtrar</span>
          </button>
        </div>
      </Form>
    </div>

  <div class="row">
    <div class="col-sm-6">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">Consumo atual</h5>
          <p class="card-text">{{ dailyAverage.toFixed(2) }} {{ sensorUnit }} / dia</p>
        </div>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Consumo médio</h5>
          <p class="card-text">{{ weeklyDailyAverage.toFixed(2) }} {{ sensorUnit }} / dia</p>
        </div>
      </div>
    </div>

  <BarChart :key="chartKey" v-if="isMounted" :labels="labels" :datasets="dataset" :unit="sensorUnit"/>

  </div>
</template>


<script>
import BarChart from './BarChart.vue'
import SensorService from "../services/sensor.service"
import { subDays, format, differenceInDays, parse } from 'date-fns'

import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";

export default {
    props: {
      sensorId: Number,
      sensorUnit: String
    },
    data() {
      const schema = yup.object().shape({
        startDate: yup.date().required('Data inicial é obrigatória').max(new Date(), "Data deve ser no passado."),
        endDate: yup.date().required('Data final é obrigatória').max(new Date(), "Data deve ser no passado.").min(yup.ref('startDate'), 'Data final deve ser maior que inicial'),
      });

      return {
        isMounted: false,
        chartKey: 0,
        startDate: format(subDays(new Date(), 7), "yyyy-MM-dd'T'HH:mm"),
        endDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        measures: [],
        labels: [],
        dataset: [],
        dailyAverage: 0,
        weeklyDailyAverage: 0,
        loading: true,
        schema,
      }
    },
    components: {
        BarChart,
        Form,
        Field,
        ErrorMessage,
    },
    async created() {
      this.isMounted = false

      await this.updateSensorData()

      this.isMounted = true
    },
    methods: {
      async updateSensorData() {
        this.loading = true
        
        let formattedStartDate = new Date(this.startDate)
        let formattedEndDate = new Date(this.endDate)

        let dailyMeasures = []
        if (differenceInDays(formattedStartDate, formattedEndDate) < 60) {
          this.measures = (await SensorService.getHourlyAverageMeasures(this.sensorId, formattedStartDate, formattedEndDate)).data.response    
          dailyMeasures = (await SensorService.getDailyAverageMeasures(this.sensorId, formattedStartDate, formattedEndDate)).data.response
        } else {
          this.measures = (await SensorService.getDailyAverageMeasures(this.sensorId, formattedStartDate, formattedEndDate)).data.response
          dailyMeasures = this.measures
        }

        if (dailyMeasures.length > 0) {
          let sum = 0;
          for (let i = 0; i < dailyMeasures.length; i++) {
            sum += dailyMeasures[i]['measureValue'];
          }
          this.weeklyDailyAverage = sum / dailyMeasures.length;
          this.dailyAverage = dailyMeasures[dailyMeasures.length - 1]['measureValue']    
        }
          
        let res = this.sortedByDate(this.measures)
        this.labels = res['labels']
        this.dataset = res['dataset']
        
        this.updateChart()
        this.loading = false
        
      },
      updateChart() {
        this.chartKey += 1
      },
      sortedByDate(specified_measures) {
        const labels = [];
        const dataset = [];

        specified_measures = specified_measures.sort((a, b) => new Date(a.measureTime) - new Date(b.measureTime));
        specified_measures.forEach(obj => {
          labels.push(format(new Date(obj.measureTime), 'yyyy-MM-dd HH:mm:ss'));
          dataset.push(obj.measureValue);
        });

        return { labels, dataset }
      },
      handleSubmit() {
        this.updateSensorData()
      }
  }
}
</script>

<style>

</style>