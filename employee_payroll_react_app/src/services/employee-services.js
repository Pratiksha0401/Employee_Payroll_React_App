import config from '../config/config.js';
//const AxiosService = require('./axios-service').default;
import  AxiosService from './axios-service';
const axios = require('axios').default;

export default class EmployeeService {
    baseUrl = config.baseUrl;
    addEmployee(data) {
        console.log(data);
        return AxiosService.postService(`${this.baseUrl}employee`, data);
        
    }

    getAllEmployees() {
        return AxiosService.getService(`${this.baseUrl}employee`);
      }
}