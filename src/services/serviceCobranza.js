import axios from 'axios';

const URI = 'http://localhost:4000'


const getAll = async () => {
    return await axios.get(`${URI}/cobranza`);
}
// const createCliente = async (body)=>{
//     return await axios.post(`${URI}/cliente`,body)
// }
// const deleteGanado = async (id)=>{
//     return await axios.delete(`${URI}/toro/${id}`)
// }

// const getId = async (id)=>{
//     return await axios.get(`${URI}/toroId/${id}`)
// }
// const updateGanado = async (idToro,body)=>{
//     return await axios.post(`${URI}/toroId/${idToro}`,body)
// }


export default {getAll}