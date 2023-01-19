import React ,{Fragment, useState, useEffect, useRef }from "react";

import serviceCobranza from "../../services/serviceCobranza";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border:'3px solid #dc3545',
  },
};
 const Cobranza = () => {

  const navigate = useNavigate();
  const [cobranza, setCobranza] = useState("");
  const [cobranzaTotal, setCobranzaTotal] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idCobranza, setIdCobranza]=useState(0)
  const init = useRef(true);
  const cobranzaPage = 15;
  const pagesVisited = pageNumber *  cobranzaPage;
  ;

  useEffect(()=>{
    if (init.current) {
      init.current = false;
      getCobranza();
    }
    
  });

   const getCobranza=async () =>{
    const response = await serviceCobranza.getAll();
    console.log(response)
    if (response.status === 200) {
      setCobranzaTotal(response.data.data);
      setCobranza(response.data.data);
    }
  }

  const eliminarModal = async (id) => {
    setIsOpen(true);
    setIdCobranza(id)
  };
  function closeModal() {
    setIsOpen(false);
  }
  const eliminar = async ()=>{
    // await servicesGanado.deleteGanado(idToro);
    // getToros();
    // setIsOpen(false);
    // toast.success("Se elimino correctamente");
  }

  const editar = async (id) => {
    navigate(`/editarGanado/${id}`);
  };

  console.log("respuestaCo",cobranza)
  const displayCobranza = cobranza.slice(pagesVisited, pagesVisited + cobranzaPage);

  const pageCount = Math.ceil(cobranzaTotal.length / cobranzaPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
    <div>
    <ToastContainer 
      type="info"
      theme="dark"/>
  </div>

  <Modal
    isOpen={modalIsOpen}
    ariaHideApp={false}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <h2>¿Está seguro(a) que desea eliminar</h2>
    <div className="container">
      <div className="row">
        <div className="col-6">

        </div>
        <div className="col-3"> 
            <button className="btn-primary"  style={{borderRadius:"5px"}} onClick={closeModal}>cancelar</button>
        </div>
        <div className="col-3">
            <button  className="btn-danger"  style={{borderRadius:"5px"}} onClick={eliminar}>Eliminar</button>
        </div>
      </div>

    </div>

  </Modal>

  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">N°</th>
        <th scope="col">Estado</th>
        <th scope="col">Importe</th>
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
              <tr key={index}>
                <td>{index}</td>
                <td>-</td>
                <td>{element.importe}</td>
                <td>{element.pago}</td>
                <td>{element.debe}</td>
                <td>{new Date(element.fecha).toLocaleDateString()}</td>

                <td>
                  <button
                    style={{ border: "none" }}
                    onClick={() => {
                      editar(element.idCobranza);
                    }}
                  >
                    <i
                      className="fa-solid fa-eye"
                      color="blue"
                    ></i>
                  </button>
                </td>
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