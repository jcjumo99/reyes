import React, { Fragment, useState, useEffect, useRef } from "react";
import servicesGanado from "../../services/servicesGanado";
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

const Ganados = () => {
  const navigate = useNavigate();
  const [ganados, setGanado] = useState("");
  const [ganadosTotal, setGanadosTotal] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idToro, setIdToro]=useState(0)
  const toro = useRef(true);
  const toroPage = 15;
  const pagesVisited = pageNumber * toroPage;
 

  useEffect(() => {
    if (toro.current) {
      toro.current = false;
      getToros();
    }
  }, [ganados]);

  const getToros = async () => {
    const response = await servicesGanado.getAll();
    console.log(response);
    if (response.status === 200) {
      setGanadosTotal(response.data.data);
      setGanado(response.data.data);
    }
  };

  const displayToros = ganados.slice(pagesVisited, pagesVisited + toroPage);

  const eliminarModal = async (id) => {
    setIsOpen(true);
    setIdToro(id)
  };

  const eliminar = async ()=>{
    await servicesGanado.deleteGanado(idToro);
    getToros();
    setIsOpen(false);
    toast.success("Se elimino correctamente");
  }
  const editarVendido = async (id) => {
    await servicesGanado.updateGanadoVendido(id);
    getToros();
    toast.success("Se actualizo correctamente");
  };

  const editar = async (id) => {
    navigate(`/editarGanado/${id}`);
  };

  const pageCount = Math.ceil(ganadosTotal.length / toroPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
 
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="container">
        <div>
        <ToastContainer 
          type="info"
          theme="dark"/>
      </div>
      <Link to={"/nuevoGanado"}>
        <button type="button" className="btn btn-primary">
          + Nuevo Ganado
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
            <th scope="col">Color</th>
            <th scope="col">Peso</th>
            <th scope="col">Fecha</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(displayToros)
            ? displayToros.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.arete}</td>
                    <td>
                      <span className={"badge bg-"+(
                        element.estado=='Vendido'?'success':
                        element.estado=='Disponible'?'primary':
                        element.estado=='Muerto'?'secondary':'warning')}>
                        {element.estado}
                        </span></td>
                    <td>{element.color}</td>
                    <td>{element.peso}</td>
                    <td>{new Date(element.fecha).toLocaleDateString()}</td>

                    <td>
                      <button
                        style={{ border: "none" }}
                        onClick={() => {
                          editarVendido(element.idToros);
                        }}
                      >
                        <i
                          className="fa-solid fa-sack-dollar"
                          color="green"
                        ></i>
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ border: "none" }}
                        onClick={() => {
                          editar(element.idToros);
                        }}
                      >
                        <i
                          className="fa-solid fa-pen-to-square"
                          color="blue"
                        ></i>
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ border: "none" }}
                        onClick={() => {
                          eliminarModal(element.idToros);
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

export default Ganados;
