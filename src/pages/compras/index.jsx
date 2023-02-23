import React, { Fragment, useState, useEffect, useRef } from "react";
import servicesCompras from "../../services/servicesCompras";
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

const Compras = () => {
  const navigate = useNavigate();
  const [idCompras, setIdCompras]=useState(0);
  const [compras, setCompras] = useState("");
  const [comprasTotal, setComprasTotal] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [idToro, setIdToro]=useState(0)
  const comprasRef = useRef(true);
  const ComprasPage = 15;
  const pagesVisited = pageNumber * ComprasPage;

  useEffect(() => {
    if (comprasRef.current) {
        comprasRef.current = false;
      getCompras();
    }
  }, []);

  const getCompras = async () => {
    const response = await servicesCompras.getAll();
    console.log(response);
    if (response.status === 200) {
      setComprasTotal(response.data.data);
      setCompras(response.data.data);
    }
  };
  const displayCompras = compras.slice(pagesVisited, pagesVisited + ComprasPage);

  const eliminarModal = async (id) => {
    setIsOpen(true);
    setIdCompras(id)
  };

  const eliminar = async ()=>{
    console.log(idCompras)
    await servicesCompras.deleteCompras(idCompras);
    getCompras();
    setIsOpen(false);
    toast.success("Se elimino correctamente");
  }


  const editar = async (id) => {
    navigate(`/editarCompras/${id}`);
  };

  const pageCount = Math.ceil(comprasTotal.length / ComprasPage);

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
      <Link to={"/nuevaCompra"}>
        <button type="button" className="btn btn-primary">
          + Nueva Compra
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
            <th scope="col">N°</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Kilos</th>
            <th scope="col">Precio * kg</th>
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
          {Array.isArray(displayCompras)
            ? displayCompras.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{element.nombres} {element.apellidos}</td>
                    <td>{element.peso}</td>
                    <td>{element.preciokg}</td>
                    <td>{element.cantidad}</td>
                    <td>{element.total}</td>
                    <td>{element.pago}</td>
                    <td>{element.debe}</td>
                    <td>{new Date(element.fecha).toLocaleDateString()}</td>
                    <td>
                    <button
                        style={{ border: "none" }}
                        onClick={() => {
                          editar(element.idCompras);
                        }}
                      >
                        <i
                          class="fa-solid fa-eye"
                          color="blue"
                        ></i>
                      </button>
                    </td>
                    <td>
                      <button
                        style={{ border: "none" }}
                        onClick={() => {
                          eliminarModal(element.idCompras);
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
export default Compras;
