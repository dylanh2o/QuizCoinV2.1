import React, {useState} from 'react';
import {Form, Input, Button} from 'antd';
import feathersAPI from '../feathers';

const Register = () => {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [result, setResult] = useState(null);
const professor = false;
  const handleSubmit = async() => {
try{
  const result = await feathersAPI.service('users').create({name, lastname, email, password,professor});
  setResult(result);
  console.log(result);
}catch(error){
  throw Error(error);
}
  };
  const form = {
    weight: '100vw',
    height: '100%',
    marginRight: '20vw',
    marginLeft: '20vw',
    padding: '20px',
    alignItems: 'center',

  };
  const formInput = {
    width: '50%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    borderWidth: '1px',
    boxSizing: 'border-box'
  };
  const formEmail = {
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
  return (
    <Form
      name="basic"
      onFinish={handleSubmit}
      //onFinishFailed={onFinishFailed}
      style={form}
    >
      <h2>Inscription</h2>
      <Form.Item
        label="Prenom"
        name="name"
        style={formInput}
      >
        <Input
          value={name}
          onChange={event => setName(event.target.value)}
          style={input}
        />
      </Form.Item>
      <Form.Item
        label="Nom"
        name="lastname"
        style={formInput}
      >
        <Input
          value={lastname}
          onChange={event => setLastname(event.target.value)}
          style={input}
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        style={formEmail}
      >
        <Input
          value={email}
          onChange={event => setEmail(event.target.value)}
          style={input}
        />
      </Form.Item>

      <Form.Item
        label="Mot de passe"
        name="password"
        style={formInput}
      >
        <Input.Password
          value={password}
          onChange={event => setPassword(event.target.value)}
          style={input}
        />
      </Form.Item>
      <Form.Item
        label="Retaper le mot de passe"
        name="password2"
        style={formInput}
      >
        <Input.Password
          value={password2}
          onChange={event => setPassword2(event.target.value)}
          style={input}
        />
      </Form.Item>
      <Form.Item>
        <Button  htmlType="submit"  style={inputSubmit}>
          S'inscrire
        </Button>
      </Form.Item>
    </Form>

  );
};

export default Register;
