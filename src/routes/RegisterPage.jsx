import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    const handleCerrarResultado = () => {
      setShowModal(false);
      navigate('/login');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = {
            email,
            password,
        }
        const response = await axios.post('http://localhost:3000/users', form, { headers: {
            "Access-Control-Allow-Origin": "*"
          }})
        console.log(response.status)
        setShowModal(true)
      };

      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <div style={{ backgroundColor: "#F2F2F2", padding: "40px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <h2>Registrar Usuario</h2>
            <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
              <div>
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
              </div>
              <div>
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px" }} />
              </div>
              <button type="submit" className="btn btn-dark">Registrar</button>
            </form>
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Registro exitoso</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Se ha registrado el usuario correctamente.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCerrarResultado}>
              Cerrar
            </Button>
        </Modal.Footer>
      </Modal>
        </div>
        
      );
      
}

export default RegisterPage;