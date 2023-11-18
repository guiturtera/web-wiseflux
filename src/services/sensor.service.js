import api from './api'

class SensorService {
  getAllSensors() {
    return api.get('Sensor/get');
  }
  getSensor(sensorId) {
    return api.get(`Sensor/get/${sensorId}`)
  }
  addSensor(sensorToAdd) {
    return api.post('Sensor/add', sensorToAdd)
  }
  updateSensor(sensorId, sensorToUpdate) {
    return api.put(`Sensor/edit/${sensorId}`, sensorToUpdate)
  }
}

export default new SensorService();