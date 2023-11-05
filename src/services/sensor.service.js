import api from './api'

class SensorService {
  getAllSensors() {
    return api.get('Sensor/get');
  }
}

export default new SensorService();