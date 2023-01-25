import * as React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Ganados, Cobranza ,Clientes, Proveedores, Compras} from "../pages";
import { BarraMenu } from "../components/common/barraMenu";
import NuevoGanado from "../pages/ganado/nuevoGanado";
import NuevoCliente from "../pages/cliente/nuevoCliente";
import NuevoProveedor from "../pages/proveedores/nuevoProveedor";
import EditarGanado from "../pages/ganado/editarGanado"
import EditarCliente from "../pages/cliente/editarCliente"
import EditarProveedor from "../pages/proveedores/editarProveedor"

export const Ruta = (
  <React.Fragment>
    <BarraMenu>
      <Routes>
        <Route exact={true} path="/cobranza" element={<Cobranza />} />
        <Route exact={true} path="/compras" element={<Compras />} />
        <Route exact={true} path="/clientes" element={<Clientes />} />
        <Route exact={true} path="/proveedor" element={<Proveedores />} />
        <Route exact={true} path="/NuevoCliente" element={<NuevoCliente/>} />
        <Route exact={true} path="/nuevoProveedor" element={<NuevoProveedor/>} />
        <Route exact={true} path="/nuevoGanado" element={<NuevoGanado />} />
        <Route exact={true} path="/editarGanado/:id" element={<EditarGanado />} />
        <Route exact={true} path="/editarCliente/:id" element={<EditarCliente />} />
        <Route exact={true} path="/editarProveedor/:id" element={<EditarProveedor/>} />
        <Route path="/" element={<Ganados />} />
      </Routes>
    </BarraMenu>
  </React.Fragment>
);
