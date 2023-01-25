import axios from 'axios';

const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/compras`);
}
const createCompras = async (body)=>{
    return await axios.post(`${URI}/compras`,body)
}
const deleteCompras = async (id)=>{
    return await axios.delete(`${URI}/compras/${id}`)
}

const getId = async (id)=>{
    return await axios.get(`${URI}/comprasId/${id}`)
}

export default {getAll,createCompras,deleteCompras,getId}