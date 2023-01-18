import axios from 'axios';

const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/proveedor`);
}
const createProveedor = async (body)=>{
    return await axios.post(`${URI}/proveedor`,body)
}
const deleteProveedor = async (id)=>{
    return await axios.delete(`${URI}/proveedor/${id}`)
}

const getId = async (id)=>{
    return await axios.get(`${URI}/proveedorId/${id}`)
}
const updateProveedor = async (idProveedor,body)=>{
    return await axios.post(`${URI}/proveedor/${idProveedor}`,body)
}


export default {getAll,createProveedor,deleteProveedor,getId,updateProveedor}