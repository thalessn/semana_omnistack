import axios from 'axios';


const api = axios.create({
    baseURL: 'http://10.10.10.102:3004'
    //Como está rodando no emulador e necessário infomar o ip do computador
    //que está hospedando a api para que o aplicativo possa acessar.
})

export default api;