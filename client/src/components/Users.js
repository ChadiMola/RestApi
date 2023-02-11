import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5789/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5789/users/${id}`)
      .then((res) => {
        console.log(res.data.message);
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }

  return (
    <>
     <div className='d-flex flex-column align-items-center'>
    <Table className='mx-auto' style={{marginTop:'100px ',width:'80%'}} striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
        
          <tr key={user._id}>
              
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
            <Link to={`/userUpdate/${user._id}`}>
            <Button style={{marginRight:'20px'}} variant="success">
                Update              
            </Button>
              </Link>
              <Button variant="danger" onClick={() => deleteUser(user._id)}>
                Delete
              </Button>
              
            </td>
          </tr>
          
        ))}
        
      </tbody>
    </Table>
    <Link to="/newusers">
            <Button style={{marginRight:'20px'}} variant="primary">
                New User              
            </Button>
    </Link>
   </div>
    </>
  );
};

export default Users;
