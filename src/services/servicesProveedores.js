import axios from 'axios';
import authHeader from './authHeader'
const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/proveedor`,{headers:authHeader()});
}
const createProveedor = async (body)=>{
    return await axios.post(`${URI}/proveedor`,body,{headers:authHeader()})
}
const deleteProveedor = async (id)=>{
    return await axios.delete(`${URI}/proveedor/${id}`,{headers:authHeader()})
}

const getId = async (id)=>{
    return await axios.get(`${URI}/proveedorId/${id}`,{headers:authHeader()})
}
const updateProveedor = async (idProveedor,body)=>{
    return await axios.post(`${URI}/proveedor/${idProveedor}`,body,{headers:authHeader()})
}


export default {getAll,createProveedor,deleteProveedor,getId,updateProveedor}