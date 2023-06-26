import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

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
        navigate('/login');
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
        </div>
      );
      
}

export default RegisterPage;