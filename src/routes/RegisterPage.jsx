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

    return <div>
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Contraseña</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default RegisterPage;