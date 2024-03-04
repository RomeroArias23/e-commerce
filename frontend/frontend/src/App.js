import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './pages/home';
import RegisterForm from './components/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home}/>
      
        <Route path="/about" element={<div>About</div>} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        {/* Add more routes here for other pages */}
      </Routes>
    </Router>
  );
}

export default App;
