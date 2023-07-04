import axios from "axios";
import store from "./store"

const axiosClient = axios.create({
    //baseURL: 'http://localhost:8000/api'
    //baseURL: 'https://site96.webte.fei.stuba.sk/bp/be/api'
    //baseURL: 'https://api.mathtrainer.sk/api'
    baseURL: 'http://localhost:8081/api'
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`;
    return config;
})

export default axiosClient;


                                                                                  