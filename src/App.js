import React from 'react';
import Login from './Auth';
import logo from './wheel.svg';
import './styles/App.scss';



const App = () => {

  return (
    <div className='content1'>
      <div className='content2'><Login /></div>
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