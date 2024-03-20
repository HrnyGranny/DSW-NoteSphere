import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
function MainPage() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Link to="notes">Open the notes page</Link>
            </header>
        </div>
    );
}

export default MainPage;
