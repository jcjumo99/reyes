import axios from 'axios';
import authHeader from './authHeader'
const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/toro`,{headers:authHeader()});
}
const createGanado = async (body)=>{
    return await axios.post(`${URI}/toro`,body,{headers:authHeader()})
}
const deleteGanado = async (id)=>{
    return await axios.delete(`${URI}/toro/${id}`,{headers:authHeader()})
}

const getId = async (id)=>{
    return await axios.get(`${URI}/toroId/${id}`,{headers:authHeader()})
}
const updateGanado = async (idToro,body)=>{
    return await axios.post(`${URI}/toroId/${idToro}`,body,{headers:authHeader()})
}

const updateGanadoVendido = async (idToro)=>{
    return await axios.post(`${URI}/toroIdVendido/${idToro}`,{headers:authHeader()})
}

export default {getAll,createGanado,deleteGanado,getId,updateGanado,updateGanadoVendido}