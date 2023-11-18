<template>
  <div>
    <div v-if="sensor">
      <!-- Sensor Name -->
      <Form @submit="handleSubmit" :validation-schema="schema">
      <div class="form-group row mt-4">
        <label for="sensorName" class="col-sm-2 col-form-label">Nome:</label>
        <div class="col-sm-8">
          <Field
            id="sensorName"
            v-model="sensor.sensorName"
            :disabled="!isEditMode && mode == 'edit'"
            as="input"
            class="form-control"
            name="sensorName"
          />
        </div>
        <ErrorMessage name="sensorName" class="text-danger" />
      </div>

      <div class="form-group row mt-3">
        <label for="sensorName" class="col-sm-2 col-form-label">Tipo:</label>
        <div class="col-sm-8">
          <Field
            id="sensorType"
            v-model="sensor.sensorType"
            :disabled="mode == 'edit'"
            as="select"
            class="form-control"
            name="sensorType" 
          >
            <option value="" disabled="disabled">Selecione um tipo de sensor</option>
            <option value='Electricity'>Eletricidade</option>
            <option value='Water'>Água</option>
            <option value='Gas'>Gás</option>
          </Field>
        </div>
        <ErrorMessage name="sensorType" class="text-danger" />
      </div>

      <!-- Sensor Type -->
      <div class="form-group row mt-3" v-if='mode == "edit"'>
        <label for="sensorGuid" class="col-sm-2 col-form-label">Identificador único:</label>
        <div class="col-sm-8">
          <div class="input-group">
            <input id="sensorGuid" v-model="sensor.sensorId" disabled class="form-control" />
            <div class="input-group-append">
              <button @click="copyToClipboard(sensor.sensorId)" class="btn btn-primary">Copiar</button>
            </div>
          </div>
        </div>
      </div>


      <!-- Sensor Guid -->
      <div class="form-group row mt-3" v-if='mode == "edit"'>
        <label for="sensorGuid" class="col-sm-2 col-form-label">Chave de integração:</label>
        <div class="col-sm-8">
          <div class="input-group">
            <input id="sensorGuid" v-model="sensor.sensorGuid" disabled class="form-control" />
            <div class="input-group-append">
              <button @click="copyToClipboard(sensor.sensorGuid)" class="btn btn-primary">Copiar</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if='mode == "edit"' class="col-sm-12 mt-3 mb-3">
        <button v-if="isEditMode" :disabled="isLoading" type="submit" class="btn btn-primary">Salvar</button>
        <button v-else @click="toggleEditMode" class="btn btn-success">Editar</button>
      </div>
      <div v-else class="col-sm-12 mt-3 mb-3">
        <button :disabled="isLoading" type="submit" class="btn btn-primary">Adicionar</button>
      </div>
      </Form>
    </div>
    <div v-else>
        <h3>Carregando sensor...</h3>
    </div>
  </div>
</template>

<script>
import SensorService from "../services/sensor.service"
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    fetchedSensor: Object,
    mode: String
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
    if (this.mode == 'add') {
        this.sensor = (await SensorService.getSensor(this.$route.params.sensorId)).data?.response;
    } else {
        this.sensor = this.fetchedSensor
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

        // Provide user feedback with fade-out effect
        const feedbackElement = document.createElement("div");
        feedbackElement.innerText = "Copiado com sucesso!";
        feedbackElement.style.position = "fixed";
        feedbackElement.style.top = "50%";
        feedbackElement.style.left = "50%";
        feedbackElement.style.transform = "translateX(-50%)";
        feedbackElement.style.padding = "10px";
        feedbackElement.style.background = "#4CAF50";
        feedbackElement.style.color = "white";
        feedbackElement.style.borderRadius = "5px";
        feedbackElement.style.zIndex = "9999";
        document.body.appendChild(feedbackElement);

        // Optionally, remove the feedback after a few seconds with fade-out effect
        setTimeout(() => {
            feedbackElement.style.transition = "opacity 1s ease-out"; // Add fade-out transition
            feedbackElement.style.opacity = "0"; // Fade out
            setTimeout(() => {
            document.body.removeChild(feedbackElement);
            }, 1000); // 1 second for the fade-out transition
        }, 3000); // Adjust the total duration as needed
    },

    toggleEditMode() {
      this.isEditMode = !this.isEditMode;
    },

    async handleSubmit() {
      try {
        this.loading = true
        let newSensor = {
          "sensorName": this.sensor['sensorName'],
          "sensorType": this.sensor['sensorType']
        }
        
        if (this.mode == 'edit') await SensorService.updateSensor(this.sensor.sensorId, newSensor);
        else await SensorService.addSensor(newSensor);
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