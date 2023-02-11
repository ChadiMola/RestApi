import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

const CreateUser = () => {
 const navigate= useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
const [error, setError] = useState(false)
  const onChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(false)
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post('http://localhost:5789/users', body,config);
      console.log(res.data);
      navigate('/users')
    } catch (err) {
      console.error(err.response.data)
      setError(true);
    }
  };

  return (
    <div className='container-fluid w-25 ' style={{marginTop:'190px'}}>
     { error&&<div class="alert alert-danger" role="alert">
  Duplcated Email
</div>}
      <h1>Create User</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Button variant="primary" style={{marginTop:'30px'}} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
