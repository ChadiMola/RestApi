import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UserUpdate = () => {
  const { userId }=useParams()
  const navigate= useNavigate()
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5789/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchUser();
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5789/users/${userId}`, user);
      setUser(res.data);
      navigate('/users')
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className='container-fluid w-25 ' style={{marginTop:'190px'}}>
      <h1>Update User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Button style={{marginTop:'30px'}} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UserUpdate;
