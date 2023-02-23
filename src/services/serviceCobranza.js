import axios from 'axios';
import authHeader from './authHeader'

const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/cobranza`,{headers:authHeader()});
}
const createCobranza = async (body)=>{
    return await axios.post(`${URI}/cobranza`,body,{headers:authHeader()})
}
const getDetalleCobranza = async (body)=>{
    return await axios.post(`${URI}/cobranzaDetalle`,body,{headers:authHeader()})
}
const createPago = async (body)=>{
    return await axios.post(`${URI}/pago`,body,{headers:authHeader()})
}
// const getId = async (id)=>{
//     return await axios.get(`${URI}/toroId/${id}`)
// }
// const updateGanado = async (idToro,body)=>{
//     return await axios.post(`${URI}/toroId/${idToro}`,body)
// }


export default {getAll,createCobranza,getDetalleCobranza,createPago}