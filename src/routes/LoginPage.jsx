import { useState } from 'react'
import axios from 'axios'
const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = {
            email,
            password,
        }
        const response = await axios.get('http://localhost:3000/users/login', form, { headers: {
            "Access-Control-Allow-Origin": "*"
          }})
        console.log(response.data)
      };

    return <div>
        <h2>Iniciar Usuario</h2>
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

export default LoginPage;