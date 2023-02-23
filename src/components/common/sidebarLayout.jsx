
import { Outlet } from 'react-router-dom';
import React, { Fragment,useState } from "react";
import { Link, Navigate,useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
const secret = 'reyes#2023[</>]';

export const SidebarLayout = () => {
  
  const [activeToggle,setActiveToggle] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token")
  const myDecodedToken = decodeToken(token);

    const togle = () => {
        const estado = activeToggle
        setActiveToggle(!estado)
    }

    const cerrarSession = ()=>{
      localStorage.removeItem("token")
      navigate('/login')
    }
  
  return(
    <Fragment>
    <div className={activeToggle ? 'sb-sidenav-toggled':"sb-nav-fixed"}>
       <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            
            <a className="navbar-brand ps-3" href="index.html">Ganaderia Reyes <i className="fa-solid fa-crown"></i></a>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" onClick={()=>{togle()}} ><i className="fas fa-bars"></i></button>
            
            
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <span style={{color:'white'}}>{myDecodedToken?myDecodedToken.nombre:''} {myDecodedToken?myDecodedToken.apellido:''}</span>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" onClick={() => cerrarSession()}>Cerrar sesión</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
      
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <Link className="nav-link" to={"/ganados"}>
                  Ganados
                </Link>
                <Link className="nav-link" to={"/cobranza"}>
                  Cobranza
                </Link>
                <Link className="nav-link" to={"/clientes"}>
                  Clientes
                </Link>
                <Link className="nav-link" to={"/proveedor"}>
                  Proveedores
                </Link>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              Start Bootstrap
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4" style={{ paddingTop: 20 }}>
            <Outlet />
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2022
                </div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
     </div>
  </Fragment>
  );
};