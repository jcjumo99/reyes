import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import { useEffect, useState,useRef } from "react";
import servicesCliente from "../../services/servicesCliente";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarCliente = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [clienteId, setClienteId] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [redirect, setRedirect] = useState(false);
  const getId = useRef(true);
  const [vista, setVista]= useState(false);

  useEffect( () => {
    //setGanadoId(params.id);
    if(getId.current){
      getId.current = false;
     getById(params.id);
     setClienteId(params.id)
 } }, []);

  const getById = async (id) => {
    const response = await servicesCliente.getId(id);

    
    if(response.status === 200){
      const result = response.data.data;
      setDireccion(result[0].direccion);
      setTelefono(result[0].telefono);
      setNombres(result[0].nombres);
      setApellidos(result[0].apellidos);
      //setFile(result[0].imagen);
    }
    
  };
  const guardarCliente = async () => {
  
    if(nombres.length == 0){
      toast.error("Complete el campo Nombres");
      return
    }
    if(apellidos.length == 0){
      toast.error("Complete el campo Apellidos");
      return
    }
    if(direccion.length == 0){
      toast.error("Complete el campo Direccion");
      return
    }
    if(telefono.length == 0){
      toast.error("Complete el campo Telefono");
      return
    }
    const cliente = {
      direccion:direccion,
      telefono:telefono,
      nombres:nombres,
      apellidos:apellidos,
    }

    const respuesta = await servicesCliente.updateCliente(clienteId,cliente);
    if(respuesta.status == 200){
      toast.success("Se Actualizo correctamente");
      navigate(`/clientes`);
    }else{
      toast.error("Ocurrio un problema");
    }

  };

  
  return (
   
    <Container>
      
      <div>
        <ToastContainer 
          type="info"
          theme="dark"/>
      </div>
      <Row>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Nombres</Form.Label>
            <Form.Control  value={nombres} placeholder="Ingrese los Nombres" type="text" onChange={(e) => setNombres(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control  value={apellidos} placeholder="Ingrese los Apellidos" type="text" onChange={(e) => setApellidos(e.target.value)}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Direccion</Form.Label>
            <Form.Control value={direccion} placeholder="Ingrese el Direccion" onChange={(e) => setDireccion(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control value={telefono} placeholder="Ingrese el Telefono" type="number" onChange={(e) => setTelefono(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
      </Row>
      <Form.Group className="mb-3">
      <Col>
        <button type="button" className="btn btn-primary" onClick={() => guardarCliente()}>
        Actualizar
      </button>
    </Col>
      </Form.Group>
    </Container>
  );
};
export default EditarCliente;
