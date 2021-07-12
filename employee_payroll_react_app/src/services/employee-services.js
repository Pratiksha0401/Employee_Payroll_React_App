import config from '../config/config.js';
//const AxiosService = require('./axios-service').default;
import  AxiosService from './axios-service';
const axios = require('axios').default;

export default class EmployeeService {
    baseUrl = config.baseUrl;

    addEmployee(data) {
        console.log(data);
        return AxiosService.postService(`${this.baseUrl}create`, data);
        
    }

    getAllEmployees() {
        return AxiosService.getService(`${this.baseUrl}`);
      }

    deleteEmployee(id){
        return AxiosService.deleteService(`${this.baseUrl}delete/${id}`);
    }  

    updateEmployee(id,data){
        return AxiosService.updateService(`${this.baseUrl}update/${id}`, data);
    }

    getEmployeeById(id){
        return AxiosService.getService(`${this.baseUrl}get/${id}`);
    }

    getEmployeeByNameKeyword(nameKeyword){
        return AxiosService.getService(`${this.baseUrl}getByNameKeyword/${nameKeyword}`);
    }
}