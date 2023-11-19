<template>
    <div v-if="sensor">
      <!-- Sensor Name -->
      <Form @submit="handleSubmit" :validation-schema="schema">
      <div class="form-group row mt-4">
        <div class="col-sm-6">
          <label for="sensorName" class="col-form-label">Nome</label>
          <div>
            <Field
              id="sensorName"
              v-model="sensor.sensorName"
              :disabled="!isEditMode && mode == 'edit'"
              as="input"
              class="form-control"
              name="sensorName"
            />
          <ErrorMessage name="sensorName" class="text-danger" />
          </div>
        </div>

        <div class="col-sm-6">
          <label for="sensorName" class="col-form-label">Tipo</label>
          <div>
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
          <ErrorMessage name="sensorType" class="text-danger" />
          </div>
        </div>
        
      </div>

      <div class="form-group row mt-3">
        <!-- Sensor Type -->
        <div class="col-sm-6" v-if='mode == "edit"'>
          <label for="sensorGuid" class="col-form-label">Identificador único</label>
          <div>
            <div class="input-group">
              <input id="sensorGuid" v-model="sensor.sensorId" disabled class="form-control" />
              <div class="input-group-append">
                <button @click="copyToClipboard(sensor.sensorId)" class="btn btn-primary" type="button">Copiar</button>
              </div>
            </div>
          </div>
        </div>


        <!-- Sensor Guid -->
        <div class="col-sm-6" v-if='mode == "edit"'>
          <label for="sensorGuid" class="col-form-label">Chave de integração</label>
          <div>
            <div class="input-group">
              <input id="sensorGuid" v-model="sensor.sensorGuid" disabled class="form-control" />
              <div class="input-group-append">
                <button @click="copyToClipboard(sensor.sensorGuid)" class="btn btn-primary" type="button">Copiar</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div v-if='mode == "edit"' class="col-sm-12 mt-3 mb-3">
        <button v-if="isEditMode" :disabled="isLoading" type="submit" class="btn btn-primary mr-2" style="margin-right: 1%;">Salvar</button>
        <button v-else @click="toggleEditMode" class="btn btn-success" style="margin-right: 1%;" type="button">Editar</button>
        <button v-if="mode == 'edit'" @click="deleteSensor" class="btn btn-danger mr-2" type="button">Deletar</button>
      </div>
      <div v-else class="col-sm-12 mt-3 mb-3">
        <button :disabled="isLoading" type="submit" class="btn btn-primary">Adicionar</button>
      </div>
      </Form>
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
      isEditMode: false,
      isLoading: false,
      errorMessage: null,
      schema
    };
  },
  async created() {
    if (this.mode == 'add') {
        this.sensor = {
          "sensorId": null,
          "sensorName": "",
          "sensorType": ""
        }
    } else {
        this.sensor = this.fetchedSensor
    }
  },
  methods: {
    feedback(feedbackText, backgroundColor, textColor, duration) {
        const feedbackElement = document.createElement("div");
        feedbackElement.innerText = feedbackText;
        feedbackElement.style.position = "fixed";
        feedbackElement.style.top = "20%";
        feedbackElement.style.left = "50%";
        feedbackElement.style.transform = "translateX(-50%)";
        feedbackElement.style.padding = "10px";
        feedbackElement.style.background = backgroundColor;
        feedbackElement.style.color = textColor;
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
        }, duration); // Adjust the total duration as needed
    },

    copyToClipboard(value) {
        const el = document.createElement("textarea");
        el.value = value;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        this.feedback("Copiado com sucesso!", "#4CAF50", "white", 2000)
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
        
        if (this.mode == 'edit') {
            await SensorService.updateSensor(this.sensor.sensorId, newSensor);
            this.$emit('sensorUpdated', this.sensorId)
        } 
        else {
            let res = (await SensorService.addSensor(newSensor)).data.response;
            this.$emit('sensorAdded', res)
        }
        this.isEditMode = false;
        this.errorMessage = null;
      } catch (error) {
        this.errorMessage = "Failed to update sensor. Please try again.";
      } finally {
        this.loading = false
      }
    },

    async tryToDeleteSensor(sensorId) {
      try {
        let deleteStatus = (await SensorService.deleteSensor(sensorId)).status
        if (deleteStatus == 200) {
          this.feedback("Sensor deletado com sucesso!", "#4CAF50", "white", 6000)
          this.$router.push("/sensores")
        } else {
          
        }
      } catch (error) {
        if(error.message == 'Request failed with status code 404') {
          this.feedback("Sensor deletado com sucesso!", "#4CAF50", "white", 6000)
          this.$router.push("/sensores")
        } else {
          this.feedback('Falha ao deletar sensor!', "#4CAF50", "white", 2000)
        }
      }
      
    },

    async deleteSensor() {
      if (this.sensor.sensorId) {
        let isConfirmed = (await this.$swal({ 
          title: "Tem certeza?", 
          text: "Você irá perder todos os dados coletados do sensor!",
          icon: "warning", 
          showConfirmButton: true,
          confirmButtonText: "Deletar",
          confirmButtonColor: "red",
          showDenyButton: true,
          denyButtonText: "Cancelar",
          denyButtonColor: "gray"
        })).isConfirmed;

        if (isConfirmed) {
          await this.tryToDeleteSensor(this.sensor.sensorId)
        }
      }
    }
  },
};
</script>

<style scoped>
/* Add your additional styling here if needed */
</style>