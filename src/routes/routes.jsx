import *  as React   from "react";
//import  { useState, useEffect, useRef } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Ganados, Cobranza ,Clientes, Proveedores} from "../pages";
import { BarraMenu } from "../components/common/barraMenu";
import NuevoGanado from "../pages/ganado/nuevoGanado";
import NuevoCliente from "../pages/cliente/nuevoCliente";
import NuevaVenta from "../pages/cobranza/nuevaVenta";
import NuevoProveedor from "../pages/proveedores/nuevoProveedor";
import EditarGanado from "../pages/ganado/editarGanado"
import EditarCliente from "../pages/cliente/editarCliente"
import EditarProveedor from "../pages/proveedores/editarProveedor"
import RequireAuth from "../pages/login/requireAuth";
import Login from "../pages/login/index";
import BarraTitulo from "../components/common/barraTitulo";
import { SidebarLayout } from "../components/common/sidebarLayout";


export const Ruta = (

    <Routes>
      <Route exact={true} path="/" element={<SidebarLayout/>}>
        <Route index element={
          <RequireAuth><Cobranza/></RequireAuth>}/>
        <Route exact={true} path="/proveedor" element={
          <RequireAuth><Proveedores/></RequireAuth>}/>
          <Route exact={true} path="/ganados" element={
          <RequireAuth><Ganados/></RequireAuth>}/>
        <Route exact={true} path="/cobranza"  element={
          <RequireAuth><Cobranza/></RequireAuth>}/>
        <Route exact={true} path="/nuevaVenta" element={
          <RequireAuth><NuevaVenta/></RequireAuth>}/>
        <Route exact={true} path="/clientes" element={
          <RequireAuth><Clientes/></RequireAuth>}/>
        <Route exact={true} path="/NuevoCliente" element={
          <RequireAuth><NuevoCliente/></RequireAuth>}/>
        <Route exact={true} path="/nuevoProveedor" element={
          <RequireAuth><NuevoProveedor/></RequireAuth>}/>
        <Route exact={true} path="/nuevoGanado" element={
          <RequireAuth><NuevoGanado/></RequireAuth>}/>
        <Route exact={true} path="/editarGanado/:id" element={
          <RequireAuth><EditarGanado/></RequireAuth>}/>
        <Route exact={true} path="/editarCliente/:id" element={
          <RequireAuth><EditarCliente/></RequireAuth>}/>
        <Route exact={true} path="/editarProveedor/:id" element={
          <RequireAuth><EditarProveedor/></RequireAuth>}/>
      </Route>  
        <Route exact={true} path="/login" element={<Login/>}/> 
    </Routes>
  
  );
