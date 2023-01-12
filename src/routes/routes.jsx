import * as React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Ganados, Cobranza ,Clientes} from "../pages";
import { BarraMenu } from "../components/common/barraMenu";
import NuevoGanado from "../pages/ganado/nuevoGanado";
import NuevoCliente from "../pages/cliente/nuevoCliente";
import EditarGanado from "../pages/ganado/editarGanado"

export const Ruta = (
  <React.Fragment>
    <BarraMenu>
      <Routes>
        <Route exact={true} path="/cobranza" element={<Cobranza />} />
        <Route exact={true} path="/clientes" element={<Clientes />} />
        <Route exact={true} path="/NuevoCliente" element={<NuevoCliente/>} />
        <Route exact={true} path="/nuevoGanado" element={<NuevoGanado />} />
        <Route exact={true} path="/editarGanado/:id" element={<EditarGanado />} />
        <Route path="/" element={<Ganados />} />
      </Routes>
    </BarraMenu>
  </React.Fragment>
);
