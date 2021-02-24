
import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageDefault from './PageDefault';
import { useHistory } from 'react-router-dom';

const Registration = styled.div`
    
text-align: center;
margin: 12px;
& > * {
  display: block;
  margin: 0 auto;
  margin-bottom: 12px;
}
`;

function RegistrationLogin() {

  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const register = async () => {
    const postRequest = await axios.post('/register' ,{
      username: usernameReg,
      password: passwordReg
    });
    console.log(postRequest.data)
  };

  const login = async () => {
    const response = await axios.post('/login', {username, password});
    if (response.data.auth === false) {
      localStorage.setItem("logged", false);
    } else {
      localStorage.setItem("logged", true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("uid", response.data.data.id);
      userAuthenticated();
    }
  };

  const userAuthenticated = async () => {

    const response  = await axios.get("/isAuth", {
      headers: {
        "x-access-token": localStorage.token
      }
    });
    if (response.statusText === "OK") {
      history.push("/dashboard")
    }
    

  }

  useEffect( () => {
    const getResponse = async () => {

    };
    getResponse();
  }, [])


  const history = useHistory();
  return (
    <PageDefault>
      {localStorage.token ? history.push("/dashboard"): (
        <div className="RegistrationLogin">
        <Registration>
          <h1>Registration</h1>
          <label>Username</label>
          <input type="text" onChange={e => {
            setUsernameReg(e.target.value);
          }} />
          <label>Password</label>
          <input type="text" onChange={e => {
            setPasswordReg(e.target.value);
          }} />
          <button onClick={register}>Register</button>
        </Registration>
        <Registration>
          <h1>Login</h1>
          <input type="text" placeholder="Username..." onChange={e => {
            setUsername(e.target.value);
          }} />
          <input type="password" placeholder="Password .." onChange={e => {
            setPassword(e.target.value);
          }} />
          <button onClick={login}>Login</button>
        </Registration>
      </div>
      )
    
    }
  </PageDefault>
  );
}

export default RegistrationLogin;
