<template>
  <div>
    <div class='mb-5' v-if='sensor'>
      <h2 class="mb-4">Dashboard</h2>
        <SensorDashboard :sensorId="sensor.sensorId" :sensorUnit="sensor.sensorUnit"/>
    </div>

    <div>
      <div class="container">
        <div class="row">
            <div class="col-sm-9">
                <h2>Configurações</h2>
            </div>
            <div class="col-sm-3">
                <div class= "col-sm-6">
                  <button @click='explainVariables' class="btn btn-secondary"><span>Info</span></button>
                </div>
            </div>
        </div>
    </div>
      <div v-if="sensor">
        <SensorHandler :fetchedSensor='sensor' mode='edit'/>

        <h4 @click="toggleAddSensorMeasure" class="btn btn-secondary">
          <span>Simular dados</span>
          <i :class="{ 'arrow-up': !showAddSensorMeasure, 'arrow-down': showAddSensorMeasure }"></i>
        </h4>
        <div>
          <Transition name="fade" mode="out-in">
            <AddSensorMeasure v-show="showAddSensorMeasure" :fetchedSensor='sensor'/>
          </Transition>
        </div>
      </div>
      <div v-else>
          <h3>Carregando sensor...</h3>
      </div>
    </div>
    
  </div>
</template>

<script>
import SensorService from "../services/sensor.service"
import SensorHandler from '../components/SensorHandler.vue';
import SensorDashboard from '../components/SensorDashboard.vue';
import AddSensorMeasure from '../components/AddSensorMeasure.vue';

export default {
  components: {
    SensorHandler,
    AddSensorMeasure,
    SensorDashboard
  },
  data() {
    return {
      sensor: null, 
      showAddSensorMeasure: false
    };
  },
  async created() {
    this.sensor = (await SensorService.getSensor(this.$route.params.sensorId)).data?.response;
  },
  methods: {
    explainVariables() {
      this.$swal({ 
          title: 'Informação', 
          html: `Hoje não existem integrações nativas com os sensores.<br><br>
          
Para realizar integrações, você precisará utilizar os campos de <b>Id</b> e <b>Chave</b>.<br><br>

Caso não exista uma integração nativa com seu sensor inteligente, é possível desenvolvê-la seguindo a <a href="https://wiseflux-prod.azurewebsites.net/swagger/index.html">documentação</a>.`, 
          icon: 'info',
          showConfirmButton: true,
          confirmButtonText: "Ok",
          confirmButtonColor: "gray"
        }
      )
    },
    toggleAddSensorMeasure() {
        this.showAddSensorMeasure = !this.showAddSensorMeasure;

        if (this.showAddSensorMeasure) {
          setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
          }, 10);
        }
      },
      async beforeRouteUpdate(to, from, next) {
        this.sensor = (await SensorService.getSensor(this.$route.params.sensorId)).data?.response;

        // Don't forget to call next() to indicate that the hook has finished
        next();
      },
  }
};
</script>

<style scoped>

  .arrow-up::before {
    content: '↑';
    display: inline-block;
    margin-left: 5px; /* adjust as needed */
  }

  .arrow-down::before {
    content: '↓';
    display: inline-block;
    margin-left: 5px; /* adjust as needed */
  }

</style>