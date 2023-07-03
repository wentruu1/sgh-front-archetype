import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Login</Link>
          </li>
        </ul>

        <hr />

        <Routes>
          <Route path="/" exact>
            <LoginPage/>
          </Route>
          <Route path="/register">
            <RegisterPage/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
