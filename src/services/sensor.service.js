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
  getMeasures(sensorId, start_date, end_date) {
    return api.get(`SensorMeasure/get/${sensorId}`, { params: { start_date, end_date } })
  }
  getHourlyAverageMeasures(sensorId, start_date, end_date) {
    return api.get(`SensorMeasure/get/averageByHour/${sensorId}`, { params: { start_date, end_date } })
  }
  getDailyAverageMeasures(sensorId, start_date, end_date) {
    return api.get(`SensorMeasure/get/averageByDay/${sensorId}`, { params: { start_date, end_date } })
  }
  getMonthlyAverageMeasures(sensorId, start_date, end_date) {
    return api.get(`SensorMeasure/get/averageByMonth/${sensorId}`, { params: { start_date, end_date } })
  }
}

export default new SensorService();