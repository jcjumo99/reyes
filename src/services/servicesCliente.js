import axios from 'axios';

const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/cliente`);
}
const createCliente = async (body)=>{
    return await axios.post(`${URI}/cliente`,body)
}
const deleteCliente = async (id)=>{
    return await axios.delete(`${URI}/cliente/${id}`)
}

const getId = async (id)=>{
    return await axios.get(`${URI}/clienteId/${id}`)
}
const updateCliente = async (idCliente,body)=>{
    return await axios.post(`${URI}/cliente/${idCliente}`,body)
}


export default {getAll,createCliente,deleteCliente,getId,updateCliente}