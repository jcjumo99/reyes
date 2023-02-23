import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import { useEffect, useState,useRef } from "react";
import servicesProveedores from "../../services/servicesProveedores";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarProveedor = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [proveedorId, setProveedorId] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const getId = useRef(true);
  
    useEffect( () => {
      //setGanadoId(params.id);
      if(getId.current){
        getId.current = false;
       getById(params.id);
       setProveedorId(params.id)
   } }, []);
  
    const getById = async (id) => {
      const response = await servicesProveedores.getId(id);
  
      
      if(response.status === 200){
        const result = response.data.data;
        setDireccion(result[0].direccion);
        setTelefono(result[0].telefono);
        setNombres(result[0].nombres);
        setApellidos(result[0].apellidos);
        //setFile(result[0].imagen);
      }
      
    };
    const guardarProveedor = async () => {
    
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
      const proveedor = {
        direccion:direccion,
        telefono:telefono,
        nombres:nombres,
        apellidos:apellidos,
      }
  
      const respuesta = await servicesProveedores.updateProveedor(proveedorId,proveedor);
      if(respuesta.status == 200){
        toast.success("Se Actualizo correctamente");
        navigate(`/proveedor`);
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
          <button type="button" className="btn btn-primary" onClick={() => guardarProveedor()}>
          Actualizar
        </button>
      </Col>
        </Form.Group>
      </Container>
    );
  };
  export default EditarProveedor;
  