import config from '../config/config.js';
//import AxiosService from './axios-service'
const axios = require('axios').default;

export default class EmployeeService {
    baseUrl = config.baseUrl;
    addEmployee(data) {
        return axios.post(`${this.baseUrl}employee`, data);
    }
}