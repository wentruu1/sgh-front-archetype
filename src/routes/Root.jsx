import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Sistema de Gestion de Horarios</h1>

          <nav>
            <ul>
              <li>
                <Link to={`/login`}>Login</Link>
              </li>
              <li>
                <Link to={`/register`}>Register</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet/>
        </div>
      </>
    );
  }