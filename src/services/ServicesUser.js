import axios from 'axios';

const URI = 'http://localhost:4000'

const Login = async (body)=>{
    return await axios.post(`${URI}/user`,body)
}

export default {Login}