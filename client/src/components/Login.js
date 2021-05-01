import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../store/appSlice';
import {Form, Input, Button} from 'antd';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const form = {
    weight: '100vw',
    height: '100%',
    marginRight: '20vw',
    marginLeft: '20vw',
    padding: '20px',
    alignItems: 'center',

  };
  const formInput = {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    borderWidth: '1px',
    boxSizing: 'border-box'
  };
  const input = {
    borderWidth: '1px',
    borderColor: "#000",
    borderStyle: 'solid',
    borderRadius: '4px',

  };
  const inputSubmit = {
    width: "100%",
    backgroundColor: "#000",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center'

  };


  const handleSubmit = () => {

    dispatch(loginUser({email, password}));
  };
  return (
    <Form
      name="basic"
      onFinish={handleSubmit}
      //onFinishFailed={onFinishFailed}
      style={form}
    >
      <h2>Connexion</h2>

      <Form.Item
        label="Email"
        name="email"
        style={formInput}

      >
        <Input
          value={email}
          onChange={event => setEmail(event.target.value)}
          style={input}
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        style={formInput}
      >
        <Input.Password
          value={password}
          onChange={event => setPassword(event.target.value)}
          style={input}
        />
      </Form.Item>

      <Form.Item>
        <Button  htmlType="submit"  style={inputSubmit}>
          Se connecter
        </Button>
      </Form.Item>


    </Form>

  );
};

export default Login;
