import React, { Fragment, useState, useEffect, useRef } from "react";
import servicesCliente from "../../services/servicesCliente";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

const Clientes = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState("");
  const [clientesTotal, setClientesTotal] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [idToro, setIdToro]=useState(0)
  const clienteRef = useRef(true);
  const ClientePage = 15;
  const pagesVisited = pageNumber * ClientePage;

  useEffect(() => {
    if (clienteRef.current) {
      clienteRef.current = false;
      getClientes();
    }
  }, []);

  const getClientes = async () => {
    const response = await servicesCliente.getAll();
    console.log("rss",response);
    if (response.status === 200) {
      setClientesTotal(response.data.data);
      setCliente(response.data.data);
    }
  };
  const displayClientes = cliente.slice(pagesVisited, pagesVisited + ClientePage);

  const eliminarModal = async (id) => {
    setIsOpen(true);
    //setIdCliente(id)
  };

//   const eliminar = async ()=>{
//     await servicesCliente.deleteGanado(idToro);
//     getToros();
//     setIsOpen(false);
//     toast.success("Se elimino correctamente");
//   }


  const editar = async (id) => {
    navigate(`/editarGanado/${id}`);
  };

  const pageCount = Math.ceil(clientesTotal.length / ClientePage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
 
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="container">
      <div>
        <ToastContainer type="info" theme="dark" />
      </div>
      <Link to={"/nuevoCliente"}>
        <button type="button" className="btn btn-primary">
          + Nuevo Cliente
        </button>
      </Link>
      {/* <Modal
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

  </Modal> */}

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(displayClientes)
            ? displayClientes.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{element.nombres}</td>
                    <td>{element.apellidos}</td>
                    <td>{element.direccion}</td>
                    <td>{element.telefono}</td>
                    <td>
                      <button
                        style={{ border: "none" }}
                        onClick={() => {
                          editar(element.idCliente);
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
                          eliminarModal(element.idCliente);
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
export default Clientes;
