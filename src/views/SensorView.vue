<template>
  <div>
    <h2>Configurações do sensor:</h2>
    <div v-if="sensor">
      <SensorHandler :fetchedSensor='sensor' mode='edit'/>
    </div>
    <div v-else>
        <h3>Carregando sensor...</h3>
    </div>

    <h2>Sensor Measures</h2>
    <div v-for="measure in sensorMeasures" :key="measure.MeasureId">
      <p>Value: {{ measure.MeasureValue }}</p>
      <p>Time: {{ measure.MeasureTime }}</p>
    </div>
  </div>
</template>

<script>
import SensorService from "../services/sensor.service"
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";
import SensorHandler from '../components/SensorHandler.vue';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    SensorHandler
  },
  data() {
    const schema = yup.object().shape({
      sensorName: yup.string().required("Nome do sensor é obrigatório"),
      sensorType: yup.string().required("É necessário selecionar um tipo de sensor").oneOf(['Electricity', 'Water', 'Gas'], "Tipo de sensor inválido!"),
    });

    return {
      sensor: null, 
      sensorMeasures: [],
      isEditMode: false,
      isLoading: false,
      errorMessage: null,
      schema
    };
  },
  async created() {
    this.sensor = (await SensorService.getSensor(this.$route.params.sensorId)).data?.response;

    // Fetch measures based on the retrieved sensorId
    //if (this.sensor && this.sensor.sensorId) {
      //const measuresResponse = await SensorService.getSensorMeasures(this.sensor.sensorId);
      //this.sensorMeasures = measuresResponse.data?.response;
    //}
  },
  methods: {
    copyToClipboard(value) {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      // Optionally, you can provide user feedback here
    },

    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },

    async handleEdit() {
      this.loading = true
      try {
        let editedSensor = {
          "sensorName": this.sensor['sensorName'],
          "sensorType": this.sensor['sensorType']
        }
        await SensorService.updateSensor(this.sensor.sensorId, editedSensor);
        this.isEditMode = false;
        this.errorMessage = null;
      } catch (error) {
        console.error("Error updating sensor:", error);
        this.errorMessage = "Failed to update sensor. Please try again.";
      } finally {
        this.loading = false
      }
    },
  },
};
</script>

<style scoped>
/* Add your additional styling here if needed */
</style>