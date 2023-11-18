<template>
  <div>
    <h2>Sensor Configuration</h2>
    <div v-if="sensor">
      <div class="form-group row">
        <label for="sensorName" class="col-sm-2 col-form-label">Sensor Name:</label>
        <div class="col-sm-8">
          <input id="sensorName" v-model="sensor.sensorName" readonly class="form-control" />
        </div>
        <div class="col-sm-2">
          <button @click="copyToClipboard(sensor.sensorName)" class="btn btn-primary">Copy</button>
        </div>
      </div>

      <div class="form-group row">
        <label for="sensorGuid" class="col-sm-2 col-form-label">Chave:</label>
        <div class="col-sm-8">
          <input id="sensorGuid" v-model="sensor.sensorGuid" readonly class="form-control" />
        </div>
        <div class="col-sm-2">
          <button @click="copyToClipboard(sensor.sensorGuid)" class="btn btn-primary">Copy</button>
        </div>
      </div>

      <div class="form-group row">
        <label for="sensorType" class="col-sm-2 col-form-label">Type:</label>
        <div class="col-sm-8">
          <input id="sensorType" v-model="sensor.sensorType" readonly class="form-control" />
        </div>
        <div class="col-sm-2">
          <button @click="copyToClipboard(sensor.sensorType)" class="btn btn-primary">Copy</button>
        </div>
      </div>
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

export default {
  data() {
    return {
      sensor: null, 
      sensorMeasures: [], // Array of sensor measure objects
    };
  },
  async created() {
    this.sensor = (await SensorService.getAllSensors()).data?.response;

    // Fetch measures based on the retrieved sensorId
    if (this.sensor && this.sensor.sensorId) {
      const measuresResponse = await SensorService.getSensorMeasures(this.sensor.sensorId);
      this.sensorMeasures = measuresResponse.data?.response;
    }
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
  },
};
</script>

<style scoped>
/* Add your additional styling here if needed */
</style>