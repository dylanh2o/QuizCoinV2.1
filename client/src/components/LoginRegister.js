import React, {useState} from 'react';
import Login from './Login';
import Register from './Register';



const LoginRegister = () => {

  const [form, setForm] = useState('Login');
  const change = {
    color: "black",
    margin: "8px 20px",

  };
  return (
<>

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
