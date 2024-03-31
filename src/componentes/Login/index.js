import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Importa los componentes de modal y botón de react-bootstrap
import { useNavigate } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ onLogin, showModal, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false); // Función para cerrar el modal



  const handleLogin = () => {
    //  usuario y la contraseña
    if (email === "admin" && password === "admin") {
      // Si las credenciales son correctas, llama a la función onLogin
      onLogin(email);
      // Redirige a la página principal
      navigate("/");
      // Cierra el modal
      setShowModal(false);
    } else {
      // Si las credenciales son incorrectas, muestra un mensaje de error
      setError("Usuario o contraseña incorrectos");
    }

    
  };
// Función para limpiar los campos del formulario
const clearFields = () => {
  setEmail("");
  setPassword("");
  setError("");
};


  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="error-message">{error}</p>}
          <FormGroup>
            <Label htmlFor="email">Nombre de usuario:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nombre de Usuario"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {handleClose();clearFields();}}>Cerrar</Button> {/* Botón para cerrar el modal */}
          <Button variant="primary" onClick={handleLogin}>Ingresar</Button> {/* Botón para iniciar sesión */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
