import axios from 'axios';

const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/toro`);
}
const createGanado = async (body)=>{
    return await axios.post(`${URI}/toro`,body)
}
const deleteGanado = async (id)=>{
    return await axios.delete(`${URI}/toro/${id}`)
}

const getId = async (id)=>{
    return await axios.get(`${URI}/toroId/${id}`)
}
const updateGanado = async (idToro,body)=>{
    return await axios.post(`${URI}/toroId/${idToro}`,body)
}

const updateGanadoVendido = async (idToro)=>{
    return await axios.post(`${URI}/toroIdVendido/${idToro}`)
}

export default {getAll,createGanado,deleteGanado,getId,updateGanado,updateGanadoVendido}