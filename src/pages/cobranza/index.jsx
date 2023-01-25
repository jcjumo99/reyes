import React, { Fragment, useState, useEffect, useRef } from "react";
import serviceCobranza from "../../services/serviceCobranza";
import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "3px solid #dc3545",
  },
};
const Cobranza = () => {
  const navigate = useNavigate();
  const [cobranza, setCobranza] = useState("");
  const [cobranzaTotal, setCobranzaTotal] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [detallePago, setDetallePago] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDetalle, setModalDetalle] = useState(false);
  const [pagoEstado, setPagoEstado] = useState(false);
  const [pago, setPago] = useState("");
  const [debeTotal, setDebeTotal] = useState("");
  const [idCobranza, setIdCobranza] = useState(0);
  const init = useRef(true);
  const cobranzaPage = 15;
  const pagesVisited = pageNumber * cobranzaPage;
  useEffect(() => {
    if (init.current) {
      init.current = false;
      getCobranza();
    }
  });

  const getCobranza = async () => {
    const response = await serviceCobranza.getAll();
    console.log(response);
    if (response.status === 200) {
      setCobranzaTotal(response.data.data);
      setCobranza(response.data.data);
    }
  };

  const eliminarModal = async (id) => {
    setIsOpen(true);
    setIdCobranza(id);
  };
  function closeModal() {
    //setIsOpen(false);
    setPago("")
    setModalDetalle(false);
  }
  const eliminar = async () => {
    // await servicesGanado.deleteGanado(idToro);
    // getToros();
    // setIsOpen(false);
    // toast.success("Se elimino correctamente");
  };

  const detalleVenta = async (id) => {
    setIdCobranza(id);
    const detalle = { idcobranza: id };
    const respuesta = await serviceCobranza.getDetalleCobranza(detalle);
    setDetallePago(respuesta.data.data);
    console.log(respuesta);
    setModalDetalle(true);
  };

  const displayCobranza = cobranza.slice(
    pagesVisited,
    pagesVisited + cobranzaPage
  );

  const pageCount = Math.ceil(cobranzaTotal.length / cobranzaPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const pagar = async () => {
    if (pago == 0) {
      toast.error("Complete el campo pago");
      return;
    }
    if(pago > debeTotal){
      toast.error("El pago debe ser menor q la deuda");
      return;
    }
    const pagoVenta = {idVenta:idCobranza,pago:pago}
    const respuesta = await serviceCobranza.createPago(pagoVenta);
    console.log("res",respuesta)
    if(respuesta.status == 200 ){
      toast.success("se Pago COrrectamente")
      getCobranza();
      setModalDetalle(false);
    }else{
      toast.error("Ocurrio un Problema");
    }
    setPago("")
  }
  return (
    <div className="container">
      <div>
        <ToastContainer type="info" theme="dark" />
      </div>
      <Link to={"/nuevaVenta"}>
        <button type="button" className="btn btn-primary">
          + Nueva venta
        </button>
      </Link>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>¿Está seguro(a) que desea eliminar</h2>
        <div className="container">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-3">
              <button
                className="btn-primary"
                style={{ borderRadius: "5px" }}
                onClick={closeModal}
              >
                cancelar
              </button>
            </div>
            <div className="col-3">
              <button
                className="btn-danger"
                style={{ borderRadius: "5px" }}
                onClick={eliminar}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={modalDetalle}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Detalle de Pago</h2>
        <div className="container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Total</th>
                <th scope="col">Pago</th>
                <th scope="col">Debe</th>
                <th scope="col">Fecha</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(detallePago)
                ? detallePago.map((element, index) => {
                  
                    return (
                      <tr key={index}>
                        {/* {element.estado == 1?<td className="badge bg-danger">No Cancelado</td>:<td className="badge bg-success">Cancelado</td>} */}
                        <td>{element.total}</td>
                        <td>{element.pago}</td>
                        <td>{element.debe}</td>
                        <td>{new Date(element.fecha).toLocaleDateString()}</td>
                      </tr>
                    );  
                  })
                : null}
            </tbody>
          </table>
          <div className="row">
            <div className="col-3">
              <button
                className="btn-primary"
                style={{ borderRadius: "5px" }}
                onClick={closeModal}
                
              >
                cerrar
              </button>
            </div>
            <div className="col-9">
              <div className="row">
                <div className="col-6">
                  <input style={{width:"100px"}} value={pago}
                  onChange={(e) => setPago(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <button
                    disabled={pagoEstado}
                    className={"btn-" + (pagoEstado == false ? "success" : "secondary")} 
                    style={{ borderRadius: "5px" }}
                    onClick={pagar}
                  >
                    Pagar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Cliente</th>
            <th scope="col">kilos</th>
            <th scope="col">precio * kg</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Total</th>
            <th scope="col">Pago</th>
            <th scope="col">Debe</th>
            <th scope="col">Fecha</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(displayCobranza)
            ? displayCobranza.map((element, index) => {
                return (
                  <tr
                    key={index}
                    className={
                      "table-" + (element.estado == 1 && element.debe > 0 ? "danger" : "success")
                    }
                  >
                    <td>{index}</td>
                    {/* {element.estado == 1?<td className="badge bg-danger">No Cancelado</td>:<td className="badge bg-success">Cancelado</td>} */}
                    <td>
                      {element.nombres} {element.apellidos}
                    </td>
                    <td>{element.peso}</td>
                    <td>{element.precioKilo}</td>
                    <td>{element.cantidad}</td>
                    <td>{element.total}</td>
                    <td>{element.pago}</td>
                    <td>{element.debe}</td>
                    <td>{new Date(element.fecha).toLocaleDateString()}</td>
                    {element.estado == 1 ? (
                      <td>
                        {" "}
                        <button
                          style={{ border: "none" }}
                          onClick={() => {
                            detalleVenta(element.idcobranza)
                            setPagoEstado(element.debe == 0 ? true:false);
                            setDebeTotal(element.debe)
                          }}
                        >
                          <i className="fa-solid fa-eye" color="blue"></i>
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}

                    <td>
                      <button
                        style={{ border: "none" }}
                        onClick={() => {
                          eliminarModal(element.idCobranza);
                        }}
                      >
                        <i className="fa-solid fa-trash" color="red"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="siguiente >"
        onPageChange={changePage}
        pageCount={pageCount}
        previousLabel="< atras"
        containerClassName="paginationBtn"
        previousClassName="previousBtn"
        nextClassName="nextBtn"
        activeClassName="paginationActive"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Cobranza;
