import axios from 'axios';

const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/cobranza`);
}
const createCobranza = async (body)=>{
    return await axios.post(`${URI}/cobranza`,body)
}
const getDetalleCobranza = async (body)=>{
    return await axios.post(`${URI}/cobranzaDetalle`,body)
}
const createPago = async (body)=>{
    return await axios.post(`${URI}/pago`,body)
}
// const getId = async (id)=>{
//     return await axios.get(`${URI}/toroId/${id}`)
// }
// const updateGanado = async (idToro,body)=>{
//     return await axios.post(`${URI}/toroId/${idToro}`,body)
// }


export default {getAll,createCobranza,getDetalleCobranza,createPago}