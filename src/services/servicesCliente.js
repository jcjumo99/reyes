import axios from 'axios';
import authHeader from './authHeader'

const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/cliente`,{headers:authHeader()});
}
const createCliente = async (body)=>{
    return await axios.post(`${URI}/cliente`,body,{headers:authHeader()})
}
const deleteCliente = async (id)=>{
    return await axios.delete(`${URI}/cliente/${id}`,{headers:authHeader()})
}

const getId = async (id)=>{
    return await axios.get(`${URI}/clienteId/${id}`,{headers:authHeader()})
}
const updateCliente = async (idCliente,body)=>{
    return await axios.post(`${URI}/cliente/${idCliente}`,body,{headers:authHeader()})
}


export default {getAll,createCliente,deleteCliente,getId,updateCliente}