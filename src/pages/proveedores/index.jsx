import React, { Fragment, useState, useEffect, useRef } from "react";
import servicesProveedores from "../../services/servicesProveedores";
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

const Proveedores = () => {
  const navigate = useNavigate();
  const [idProveedores, setIdProveedores]=useState(0);
  const [proveedores, setProveedores] = useState("");
  const [proveedoresTotal, setProveedoresTotal] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [idToro, setIdToro]=useState(0)
  const proveedoresRef = useRef(true);
  const ProveedoresPage = 15;
  const pagesVisited = pageNumber * ProveedoresPage;


  useEffect(() => {
    if (proveedoresRef.current) {
        proveedoresRef.current = false;
      getProveedores();
    }
  }, []);

  const getProveedores = async () => {
    const response = await servicesProveedores.getAll();
    if (response.status === 200) {
      setProveedoresTotal(response.data.data);
      setProveedores(response.data.data);
    }
  };
  const displayProveedores = proveedores.slice(pagesVisited, pagesVisited + ProveedoresPage);

  const eliminarModal = async (id) => {
    setIsOpen(true);
    setIdProveedores(id)
  };

  const eliminar = async ()=>{
    await servicesProveedores.deleteProveedor(idProveedores);
    getProveedores();
    setIsOpen(false);
    toast.success("Se elimino correctamente");
  }


  const editar = async (id) => {
    navigate(`/editarProveedor/${id}`);
  };

  const pageCount = Math.ceil(proveedoresTotal.length / ProveedoresPage);

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
      <Link to={"/nuevoProveedor"}>
        <button type="button" className="btn btn-primary">
          + Nuevo Proveedor
        </button>
      </Link>
      {
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
  
  
  }

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
          {Array.isArray(displayProveedores)
            ? displayProveedores.map((element, index) => {
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
                          editar(element.idProveedor);
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
                          eliminarModal(element.idProveedor);
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
export default Proveedores;
