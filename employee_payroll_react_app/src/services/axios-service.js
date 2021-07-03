const axios = require('axios').default;

class AxiosService {
    postService(url = '', payload=null, tokenRequired=false, httOptions = null){
        /* handles post operations 
            params : id : id of questions or comments to add/post
            APIendpoints : endpoint i.e 'comments/' , 'answers/' , 'editquestions'
        */
       return axios.post(url, payload, tokenRequired && httOptions);
    }
}

module.export = new AxiosService()