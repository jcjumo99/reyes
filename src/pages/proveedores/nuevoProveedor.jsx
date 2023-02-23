import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import servicesProveedores from "../../services/servicesProveedores";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NuevoProveedor = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
 
  const guardarProveedor = async () => {
  
    if(nombres.length == 0){
      toast.error("Complete el campo Nombre");
      return
    }
    if(apellidos.length == 0){
      toast.error("Complete el campo Apellido");
      return
    }
    if(direccion.length == 0){
      toast.error("Complete el campo Dirección");
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
    const respuesta = await servicesProveedores.createProveedor(proveedor);
    toast.success("Se creo correctamente");
     reset();
  }
  const reset = () => {
    setNombres("");
    setApellidos("");
    setDireccion("");
    setTelefono("");
}

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
        Agregar
      </button>
    </Col>
      </Form.Group>
    </Container>
  );
};
export default NuevoProveedor;
