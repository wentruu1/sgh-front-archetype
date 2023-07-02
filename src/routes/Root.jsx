import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";


export default function Root() {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(to bottom, #E5E6E4, #272D2D)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          minHeight: "100vh",

        }}
      >
        <div id="sidebar">

          <nav className="navbar, center, fixed-top" style={{ backgroundColor: "#E5E6E4" }}>
            <div className="container-fluid">
              <div className="row d-flex">
                <div className="col">
                  <h1 style={{ paddingTop: "10px" }}>
                    <Link to={'/'} style={{ textDecoration: "none", color: "inherit" }}>Sistema de Gestión de Usuarios</Link>
                  </h1>

                  <Link to={`/login`} className="btn btn-dark me-2" style={{ padding: "8px 16px", fontSize: "14px" }}>
                    Iniciar Sesión
                  </Link>
                  <Link to={`/register`} className="btn btn-dark" style={{ padding: "8px 16px", fontSize: "14px", marginRight:"10px"}}>
                    Registrar Usuario
                  </Link>
                  <Link to={'/registrar'} className="btn btn-dark" style={{padding: "8px 16px", fontSize: "14px", marginRight:"10px"}}> Registrar Horarios</Link>
                  <Link to={'/buscar'} className="btn btn-dark" style={{padding: "8px 16px", fontSize: "14px"}}>Buscar </Link>
                </div>
                <div className="col text-end" style={{ paddingTop: "10px" }}>
                  <a href="https://usm.cl/"> <img src="/img/descargar.png" alt="logo" /></a> 
                </div>


              </div>
            </div>
            <br />
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
      </div>
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          fontSize: 20,
          width: "100%",
        }}
      >
        <div className="center">
          <span style={{ color: "white" }}>Astral innovation © 2023</span>
        </div>
      </footer>
    </>
  );
}
