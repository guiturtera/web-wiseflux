<script>
import SensorService from "../services/sensor.service"
import ElectricityIcon from "../components/icons/IconElectricity.vue"
import WaterIcon from "../components/icons/IconWaterDrop.vue"
import GasIcon from "../components/icons/IconGas.vue"

export default {
  components: { ElectricityIcon, WaterIcon, GasIcon },
  data() {
    return {
      userSensors: null
    }
  },
  methods: {
    getSensorType(sensorType) {
      if (sensorType == 'Electricity') return "Eletricidade"
      else if (sensorType == 'Water') return "Água"
      else return "Gás"
    }
  },
  async created() {
    this.userSensors = (await SensorService.getAllSensors()).data?.response;
  }
}
</script>

<template>
  <div>  
      <div v-if="userSensors">
        <div class="row row-cols-1 row-cols-md-3 g-4">

          <div v-for="sensor in userSensors" :key="sensor.sensorId">
            
            <div class="col" @click="$router.push(`/sensores/${sensor.sensorId}`)">
              <div class="card">
                
                <div class="card-body">
                  <div class="card-title-wrapper">
                  <h5 class="card-title">{{sensor.sensorName}}</h5>
                  <electricity-icon v-if="sensor.sensorType == 'Electricity'" class="item"></electricity-icon>
                  <water-icon v-if="sensor.sensorType == 'Water'" class="item"></water-icon>
                  <gas-icon v-if="sensor.sensorType == 'Gas'" class="item"></gas-icon>
                
                  </div>        
                    <p class="card-text">
                      Id: {{sensor.sensorId}}<br>
                      Chave: {{sensor.sensorGuid.substring(10)}}...<br>
                      Tipo do sensor: {{getSensorType(sensor.sensorType)}}<br>
                      Medida: {{sensor.sensorUnit}}
                    </p>
                  </div>

                </div>
              </div>
            </div>
        </div>
        
          <h5 v-if="userSensors.length == 0">Parece que você não possui nenhum sensor...</h5>
          <button type="button" class="btn btn-primary mt-5" @click="$router.push(`/sensores/adicionar`)">+ Adicionar novo sensor</button>
      </div>

      <div v-else>
        <h4>Carregando sensores...</h4>
      </div>
      
  </div>
</template>

<style scoped>
.card {
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.1);
  cursor: pointer;
  background: lightblue;
}

.card-title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  flex: 1;
  margin: 0; /* To remove default margin on the heading element */
}

.item {
  width: 40px;
  height: 40px;
  border: 1px black solid;
  border-radius: 50%;
  /*flex: 0 0 auto auto; /* Prevent the icon from growing with text size */
  margin-left: 10px; /* Add spacing between the title and icon */
  vertical-align: middle;
}
</style>