import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import { useEffect, useState,useRef } from "react";
import services from "../../services/servicesGanado";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarGanado = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [ganadoId, setGanadoId] = useState("");
  const [numero, setNumero] = useState("");
  const [color, setColor] = useState("");
  const [estado, setEstado] = useState("");
  const [peso, setPeso] = useState("");
  const [redirect, setRedirect] = useState(false);
  const getId = useRef(true);
  const [vista, setVista]= useState(false);

  useEffect( () => {
    //setGanadoId(params.id);
    if(getId.current){
      getId.current = false;
     getById(params.id);
     setGanadoId(params.id)
 } }, []);

  const getById = async (id) => {
    const response = await services.getId(id);
    if(response.status === 200){
      const result = response.data.data;
      setNumero(result[0].arete);
      setEstado(result[0].estado);
      setColor(result[0].color);
      setPeso(result[0].peso);
      //setFile(result[0].imagen);
    }
    
  };
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
    //formData.append("idToro",ganadoId)
    formData.append("numero", numero);
    formData.append("estado", estado);
    formData.append("color", color);
    formData.append("peso", peso);
    //formData.append("imagen", file);
    
    //await services.updateGanado(ganadoId,formData);

    const respuesta = await services.updateGanado(ganadoId,formData);
  
    if(respuesta.status == 200){
      toast.success("Se Actualizo correctamente");
      navigate(`/`);
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
            <Form.Label>Numero</Form.Label>
            <Form.Control
              placeholder="Ingrese el numero"
              type="number"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
               <option value={"Disponible"}>Disponible</option>
               <option value={"Enfermo"}>Enfermo</option>
               <option value={"Muerto"}>Muerto</option>
               <option value={"Vendido"}>Vendido</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              value={color}
              placeholder="Ingrese el Color"
              onChange={(e) => setColor(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Peso</Form.Label>
            <Form.Control
              placeholder="Ingrese el Peso"
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
      </Row>
      <Form.Group className="mb-3">
        <Col>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => guardarGanado()}
          >
            Actualizar
          </button>
        </Col>
      </Form.Group>
    </Container>
  );
};
export default EditarGanado;
