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
  deleteSensor(sensorId) {
    return api.delete(`Sensor/delete/${sensorId}`)
  }
  addMeasure(sensorId, sensorGuid, measureToAdd) {
    return api.post(`SensorMeasure/add/${sensorId}/${sensorGuid}`, measureToAdd)
  }
  getMeasures(sensorId, startDate, endDate) {
    return api.get(`SensorMeasure/get/${sensorId}`, { params: { startDate, endDate } })
  }
  getHourlyAverageMeasures(sensorId, startDate, endDate) {
    return api.get(`SensorMeasure/get/averageByHour/${sensorId}`, { params: { startDate, endDate } })
  }
  getDailyAverageMeasures(sensorId, startDate, endDate) {
    return api.get(`SensorMeasure/get/averageByDay/${sensorId}`, { params: { startDate, endDate } })
  }
  getMonthlyAverageMeasures(sensorId, startDate, endDate) {
    return api.get(`SensorMeasure/get/averageByMonth/${sensorId}`, { params: { startDate, endDate } })
  }
}

export default new SensorService();