import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import servicesCliente from "../../services/servicesCliente";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import serviceCobranza from "../../services/serviceCobranza";

const NuevaVenta = () => {
  const [nombres, setNombres] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [peso, setPeso] = useState("");
  const [total, setTotal] = useState("");
  const [pago, setPago] = useState("");
  const [precioKilo, setPrecioKilo] = useState("");
  const clienteRef = useRef(true);
  const [cliente, setCliente] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [estado,setEstado]=useState(false)
  

  useEffect(() => {
    if (clienteRef.current) {
      clienteRef.current = false;
      getClientes();
    }
  }, []);
  const getClientes = async () => {
    console.log("clientes");
    const respuesta = await servicesCliente.getAll();
    console.log(respuesta.data.data);
    setCliente(respuesta.data.data);
  };
  const selectClient =(e)=>{
    console.log("cliente",e)
    setIdCliente(e)
  }
  const onchangePeso = (e)=>{
    setPeso(e)
    setTotal(e*precioKilo)
  }

  const onchangePesoKilo = (e)=>{
    //setPeso(e)
    setPrecioKilo(e)
    setTotal(e*peso)
  }

  const guardarVenta = async () => {
    if (idCliente == 0) {
      toast.error("Complete el campo Cliente");
      return;
    }
    if (cantidad.length == 0) {
      toast.error("Complete el campo Cantidad");
      return;
    }
    if (peso.length == 0) {
      toast.error("Complete el campo Peso");
      return;
    }
    if (precioKilo.length == 0) {
      toast.error("Complete el campo Precio");
      return;
    }

    const venta = {
      cliente: idCliente,
      cantidad: cantidad,
      peso: peso,
      precioKilo:precioKilo,
      total: total,
      pago:pago,
      estado: estado == true ? 1 : 0,
    };

    console.log(venta)

    if(estado == false){
      if(pago == total){
        await serviceCobranza.createCobranza(venta)
        toast.success("Se vendio correctamente");
        
      }else{
        toast.error("EL pago no es el correcto");
        return;
      }
    }else{
      await serviceCobranza.createCobranza(venta)
      toast.success("Se vendio correctamente");
    }
    // const respuesta = await servicesCliente.createCliente(cliente);
    // console.log(respuesta);
    // toast.success("Se creo correctamente");
    // reset();
  };
  // const reset = () => {
  //   console.log("rest");
  //   setNombres("");
  //   setCantidad("");
  //   setPeso("");
  //   setTotal("");
  // };

  return (
    <Container>
      <div>
        <ToastContainer type="info" theme="dark" />
      </div>
      <Row>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Select onChange={(e)=> selectClient(e.target.value)}>
            <option value="0">seleccione Cliente</option>
              {Array.isArray(cliente) ? cliente.map((option, index) => {
                
              return(  
                <option key={index} value={option.idCliente}>
                  {option.nombres} {option.apellidos}
                </option>
                
              )}):null}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              value={cantidad}
              placeholder="Ingrese los Apellidos"
              type="number"
              onChange={(e) => setCantidad(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Peso</Form.Label>
            <Form.Control
              value={peso}
              placeholder="Ingrese el Direccion"
              type="number"
              onChange={(e) => onchangePeso(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Precio x kilo</Form.Label>
            <Form.Control
              value={precioKilo}
              placeholder="Ingrese el Telefono"
              type="number"
              onChange={(e) => onchangePesoKilo(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Total</Form.Label>
            <Form.Control
              disabled
              value={total}
              placeholder="Ingrese el Telefono"
              type="number"
              onChange={(e) => setTotal(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
          <Form.Group className="mb-3">
            <Form.Label>Pago</Form.Label>
            <Form.Control
              value={pago}
              placeholder="Ingrese el Telefono"
              type="number"
              onChange={(e) => setPago(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col lg={6} sm={12}>
        <Form.Group className="mb-3">
          <Form.Check
            inline
            label="Debe ?"
            name="group1"
            checked={estado}
            onChange={(e)=> setEstado(!estado)}
            //type={1}
            //id={`inline-${1}-1`}
          />
          </Form.Group>
        </Col>
      </Row>
      <Row></Row>
      <Form.Group className="mb-3">
        <Col>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => guardarVenta()}
          >
            Agregar
          </button>
        </Col>
      </Form.Group>
    </Container>
  );
};
export default NuevaVenta;
