<template>
  <div>
    <div>
      <div class="container">
        <div class="row">
            <div class="col-sm-9">
                <h2>Configurações do sensor</h2>
            </div>
            <div class="col-sm-3">
                <button @click='explainVariables' class="btn btn-secondary"><span>Info</span></button>
            </div>
        </div>
    </div>
      <div v-if="sensor">
        <SensorHandler :fetchedSensor='sensor' mode='edit'/>
        <AddSensorMeasure :fetchedSensor='sensor'/>
      </div>
      <div v-else>
          <h3>Carregando sensor...</h3>
      </div>
    </div>

    <div>
      <h2 class="mt-5">Dashboard do sensor</h2>
      <div v-for="measure in sensorMeasures" :key="measure.MeasureId">
        <p>Value: {{ measure.MeasureValue }}</p>
        <p>Time: {{ measure.MeasureTime }}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
import SensorService from "../services/sensor.service"
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";
import SensorHandler from '../components/SensorHandler.vue';
import AddSensorMeasure from '../components/AddSensorMeasure.vue';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    SensorHandler,
    AddSensorMeasure
  },
  data() {
    const schema = yup.object().shape({
      sensorName: yup.string().required("Nome do sensor é obrigatório"),
      sensorType: yup.string().required("É necessário selecionar um tipo de sensor").oneOf(['Electricity', 'Water', 'Gas'], "Tipo de sensor inválido!"),
    });

    return {
      sensor: null, 
      sensorMeasures: [],
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
    }
  }
};
</script>

<style scoped>
/* Add your additional styling here if needed */
</style>