//import { axios } from "axios";
const axios = require('axios').default;

export default  {
    postService(url = '', payload=null, tokenRequired=false, httOptions = null){
        /* handles post operations 
            params : id : id of questions or comments to add/post
            APIendpoints : endpoint i.e 'comments/' , 'answers/' , 'editquestions'
        */
       return axios.post(url, payload, tokenRequired && httOptions);
    },

    getService(url = '', tokenRequired=false, httOptions = null){

       return axios.get(url, tokenRequired && httOptions);
    },

    deleteService(url = '',payload=null, tokenRequired=false, httOptions = null){

        return axios.delete(url, payload, tokenRequired && httOptions);
     }

}

//module.export = new AxiosService();
