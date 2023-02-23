import React, { Fragment, useState, useEffect, useRef } from "react";
import ServicesUser from "../../services/ServicesUser";
import { useParams, useNavigate } from "react-router-dom";

const  bcrypt = require('bcryptjs');

const Login = () => {

const [usuario, setUsuario] = useState("");
const [contraseña, setContraseña] = useState(""); 
const [incorrecto,setIncorrecto]=useState(false)
const navigate = useNavigate();
const autenticar = async ()=>{

	//const passwordHash = await bcrypt.hash(contraseña,8)
	const user = {
		username:usuario,
		password:contraseña
	}

	try{
		const dataUsuario = await  ServicesUser.Login(user)  
		const token = dataUsuario.data.data.access_token
		localStorage.setItem("token",token)
		navigate("/cobranza")
	}catch(error){
		setIncorrecto(true)
		//alert("credenciales incorrectas")
	}
	}
	

return (
<div  className="login"> 
<div className="container" >
	<div className="d-flex justify-content-center h-100">
		<div className="card-login">
			<div className="card-header" style={{textAlign:'center'}}>
				<h3>LOGIN</h3>
			</div>
			{incorrecto &&
			<span style={{color:"orangered",paddingLeft:20,fontWeight:"bold"}}>credenciales Incorrectas</span> }
			<div className="card-body">
				<form>
					<div className="input-group mb-3">
					<span  style={{background:'#FFC312'}} className="input-group-text "><i className="fas fa-user"></i></span>
					<input type="text" className="form-control" placeholder="usuario"  onChange={(e) => setUsuario(e.target.value)}/>
					</div>
					<div className="input-group mb-3">
					<span  style={{background:'#FFC312'}} className="input-group-text "><i className="fas fa-key"></i></span>
					<input type="password" className="form-control" placeholder="contraseña" onChange={(e) => setContraseña(e.target.value)}/>
					</div>
					<div className="form-group" style={{textAlign:'center'}}>
						<input type="button" value="Ingresar" className="btn float-right login_btn" onClick={() => autenticar()}/>
					</div>
				</form>
			</div>
			
		</div>
	</div>
</div>
</div>
    );
  };
  export default Login;