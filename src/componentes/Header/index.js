// Importa useState y useEffect
import React, { useContext, useState } from "react"; 
import Nike from "../../images/img01.jpg";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/Dataprovider";
import Dropdown from 'react-bootstrap/Dropdown';
import Login from "../Login"; // Importa el componente de Login
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión
  const [username, setUsername] = useState(""); // Estado para almacenar el nombre de usuario
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visualización del modal

  const handleLogin = (email) => {
    // Actualiza el estado de inicio de sesión y el nombre de usuario
    setIsLoggedIn(true);
    setUsername(email);
    // Oculta el modal después de iniciar sesión
    setShowModal(false);
  };

  const handleLogout = () => {
    // Cierra la sesión estableciendo el estado de inicio de sesión en false y eliminando el nombre de usuario
    setIsLoggedIn(false);
    setUsername("");
 
  
  };

  const value = useContext(DataContext);
  const [menu, setMenu] = value.menu;
  const [carrito] = value.carrito;

  const toogleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header>
      <Link to="/">
        <div className="logo">
          <img src={Nike} alt="logo" width="150" />
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/productos">PRODUCTOS</Link>
        </li>
        <li>
          <Link to="/crudProductos">CRUD PRODUCTOS</Link>
        </li>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            REPORTES
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/cantidadProductos">Ver Cantidad de Productos Ingresados</Dropdown.Item>
            <Dropdown.Item href="/masVendidos">Ver Productos mas vendidos</Dropdown.Item>
            <Dropdown.Item href="/ganancias">Ver Ganancias</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
      <div className="cart" onClick={toogleMenu}>
        <box-icon name="cart"></box-icon>
        <span className="item_total">{carrito.length}</span>
      </div>

      {/* Renderiza el modal para el formulario de inicio de sesión */}
      <Login showModal={showModal} setShowModal={setShowModal} onLogin={handleLogin} />

      {!isLoggedIn ? (
        // Renderiza el botón de "Iniciar sesión" cuando el usuario no ha iniciado sesión
        <button className="login-button" onClick={() => setShowModal(true)}>Iniciar sesión</button>
      ) : (
        <div className="login-button">
          <p>Bienvenido, {username}</p>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
};
