import React, {useState} from 'react';
import Login from './Login';
import Register from './Register';

import {UserOutlined} from '@ant-design/icons';
import Identicon from 'identicon.js';
import {Button, Modal} from 'antd';
import {logoutUser} from '../store/appSlice';


const LoginRegister = () => {

  const [form, setForm] = useState('Login');
  const change = {
    color: "black",
    margin: "8px 20px",

  };
  const container = {
    backgroundColor: 'black',

  };
  const logo = {
    color: 'white',
    fontSize: '5vw',

    weight: '100vw',
    height: '20vh',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
<>
  <div style={container}>
    <div style={logo}>
      QuizCoin
    </div>

  </div>
    {form === 'Login' ? (
      <Login/>
      ) : (
          <Register/>
      )}

  {form === 'Login' ? (
<div style={change}>
  Pas de compte ? ->
    <a   href='#' onClick={()=>setForm('Register')}>S'inscrire</a>
  </div>
  ) : (
    <div style={change}>
      Déjà un compte ? ->
      <a   href='#' onClick={()=>setForm('Login')}>Se connecter</a>
    </div>
  )}


</>

  );
};

export default LoginRegister;
