import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import services from "../../services/servicesGanado";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const NuevoGanado = () => {
  const [numero, setNumero] = useState("");
  const [color, setColor] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const [peso, setPeso] = useState("");
 


  const guardarGanado = async () => {
  
    if(numero.length == 0){
      toast.error("Complete el campo Número");
      return
    }
    if(color.length == 0){
      toast.error("Complete el campo Color");
      return
    }
    if(estado.length == 0){
      toast.error("Complete el campo Estado");
      return
    }
    if(peso.length == 0){
      toast.error("Complete el campo Peso");
      return
    }
  
    const formData = new FormData();
    formData.append('numero',numero)
    formData.append('estado',estado)
    formData.append('color',color)
    formData.append('peso',peso)
    //formData.append('imagen',file)

    
    const respuesta = await services.createGanado(formData);
    toast.success("Se creo correctamente");
     reset();
  }
  const reset = () => {
    setNumero("");
    setEstado("Disponible");
    setColor("");
    setPeso("");
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
            <Form.Label>Numero</Form.Label>
            <Form.Control  value={numero} placeholder="Ingrese el numero" type="number" onChange={(e) => setNumero(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value={"Disponible"}>Disponible</option>
              <option value={"Enfermo"}>Enfermo</option>
              <option value={"Muerto"}>Muerto</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control value={color} placeholder="Ingrese el Color" onChange={(e) => setColor(e.target.value)}/>
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Peso</Form.Label>
            <Form.Control value={peso} placeholder="Ingrese el Peso" type="number" onChange={(e) => setPeso(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
      </Row>
      <Form.Group className="mb-3">
      <Col>
        <button type="button" className="btn btn-primary" onClick={() => guardarGanado()}>
        Agregar
      </button>
    </Col>
      </Form.Group>
    </Container>
  );
};
export default NuevoGanado;
