import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <nav>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li></li>
            </nav>
        </header>
    );
}