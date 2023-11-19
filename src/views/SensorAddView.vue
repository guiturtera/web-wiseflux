<template>
  <div>
    <SensorHandler @sensorAdded="redirectToCreatedSensor" mode='add'/>
  </div>
</template>

<script>
import SensorHandler from '../components/SensorHandler.vue'
export default {
  components: { SensorHandler },
  methods: {
    redirectToCreatedSensor(sensor) {
        this.$router.push(`/sensores/${sensor.sensorId}`)
    }
  }
}
</script>

<style>

</style>