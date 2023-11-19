<template>
  <div class="container mt-5">
    <Form @submit="handleSubmit" :validation-schema="schema">
      
    
      <div class="row">

        <div class="form-group col-sm-12 col-md-6">
          <label for="fromDate">Data inicial</label>
          <Field
            type="datetime-local"
            id="fromDate"
            name="fromDate"
            class="form-control"
            v-model="fromDate"
          />
          <ErrorMessage name="fromDate" class="text-danger" />
      </div>

        <div class="form-group col-sm-12 col-md-6">
          <label for="toDate">Data final</label>
          <Field
            type="datetime-local"
            id="toDate"
            name="toDate"
            class="form-control"
            v-model="toDate"
          />
          <ErrorMessage name="toDate" class="text-danger" />
      </div>

      </div>
      
      <div class="row">

        <div class="form-group col-sm-12 col-md-6">
          <label for="minValue">Valor mínimo ({{sensor.sensorUnit}})</label>
          <Field
            type="number"
            id="minValue"
            name="minValue"
            class="form-control"
            v-model="minValue"
          />
          <ErrorMessage name="minValue" class="text-danger" />
        </div>

        

        <div class="form-group col-sm-12 col-md-6">
          <label for="maxValue">Valor final ({{sensor.sensorUnit}})</label>
          <Field
            type="number"
            id="maxValue"
            name="maxValue"
            class="form-control"
            v-model="maxValue"
          />
          <ErrorMessage name="maxValue" class="text-danger" />
        </div>

      </div>

      <div class="row">
        <div class="form-group col-sm-12 col-md-6">
          <label for="interval">Intervalo (em minutos)</label>
          <Field
            type="number"
            id="interval"
            name="interval"
            class="form-control"
            v-model="interval"
          />
          <ErrorMessage name="interval" class="text-danger" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary mt-3" :disabled="loading"><span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
          <span> Adicionar valores simulados</span>
      </button>
    </Form>
  </div>
</template>

<script>
import SensorService from "../services/sensor.service"
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";
import { format, subDays, parseISO } from 'date-fns';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    fetchedSensor: Object
  },
  data() {
    const schema = yup.object({
      fromDate: yup.date().required('Data inicial é obrigatória').max(new Date(), "Data deve ser no passado."),
      toDate: yup.date().required('Data final é obrigatória').max(new Date(), "Data deve ser no passado.").min(yup.ref('fromDate'), 'Data final deve ser maior que inicial'),
      interval: yup
        .number()
        .required('Intervalo é necessário')
        .integer('Intervalo deve ser um número')
        .min(5, 'Intervalo deve ser igual ou maior que 5'),
      minValue: yup.number().required('Valor mínimo é obrigatório'),
      maxValue: yup.number().required('Valor máximo é obrigatório').min(yup.ref('minValue'), 'Valor máximo deve ser maior que mínimo'),
    });

    return {
      schema,
      sensor: null,
      fromDate: format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"), // 2018-06-12T19:30
      toDate: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      interval: '5',
      minValue: '20',
      maxValue: '40',
      loading: false
    };
  },
  async created() {
    this.sensor = this.fetchedSensor
  },
  methods: {
    async handleSubmit() {
      let fromDate = parseISO(this.fromDate)
      let toDate = parseISO(this.toDate)
      let interval = parseInt(this.interval)
      let minValue = parseInt(this.minValue)
      let maxValue = parseInt(this.maxValue)

      this.loading = true
      const randomMeasures = this.generateRandomMeasures(fromDate, toDate, minValue, maxValue, interval);
      await this.postRandomMeasures(randomMeasures);
      this.loading = false
    },

    generateRandomMeasures(startDate, endDate, minValue, maxValue, intervalInMinutes) {
      const data = [];
      const totalIntervals = Math.floor((endDate - startDate) / (intervalInMinutes * 60 * 1000));

        for (let i = 0; i <= totalIntervals; i++) {
            const currentDate = new Date(startDate.getTime() + i * intervalInMinutes * 60 * 1000);
            const randomValue = (Math.random() * (maxValue - minValue + 1)) + minValue;
            
            data.push({
              measureTime: currentDate.toISOString(),
              measureValue: randomValue,
            });
          }

          return data;
        },

        async postRandomMeasures(randomMeasures) {
          for (let i = 0; i < randomMeasures.length; i++) {
            try {
              let measure = randomMeasures[i]
              await SensorService.addMeasure(this.sensor.sensorId, this.sensor.sensorGuid, measure)
            } catch {
              console.log(`Failed generating measure ${measure}`)
            }
          }
        }
      },

};
</script>

<style scoped>
/* Add your additional styling here if needed */
</style>