import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './routes/Login';
import { CreateUser } from './routes/CreateUser';
import { Dashboard } from './routes/Dashboard';
import { Profile } from './routes/Profile';
import { PublicProfile } from './routes/PublicProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='login' element={<Login />}/>
      <Route path='create-user' element={<CreateUser />}/>
      <Route path='dashboard' element={<Dashboard />}/>
      <Route path='profile' element={<Profile />}/>
      <Route path=':username' element={<PublicProfile />}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
