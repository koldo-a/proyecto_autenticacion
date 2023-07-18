import React, { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './wheel.svg';
import './App.scss';

const App = () => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Verificar el estado de autenticación al cargar el componente
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:5000/check-authentication');
        setIsLoggedIn(response.data.isLoggedIn);
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };

    checkAuthentication();
  }, []);
  
  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', { email });
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email });
      console.log(response.data.message);
      setIsLoggedIn(true); // Establecer el estado isLoggedIn a true cuando se inicia sesión correctamente
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  
  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/logout');
      console.log(response.data.message);
      setIsLoggedIn(false); // Establecer el estado isLoggedIn a false cuando se cierra sesión correctamente
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>

      <div className='login1'>
        <div className='login2'>
          {isLoggedIn ? (
            <div>
              <p>¡Bienvenido! Estás autenticado.</p>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Correo electrónico"
              />
              <button onClick={handleRegister}>Registrar</button>
              <button onClick={handleLogin}>Iniciar sesión</button>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  </div>
);
        };

export default App;