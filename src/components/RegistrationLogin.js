
import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from 'styled-components';



  
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

  const [loginStatus, setLoginStatus] = useState(false);

  const register = async () => {
    const postRequest = await axios.post('/register' ,{
      username: usernameReg,
      password: passwordReg
    });
    console.log(postRequest.data)
  };

  const login = async () => {
    const response = await axios.post('/login', {username, password});
    console.log(response.data);
    if (response.data.auth === false) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
      localStorage.setItem("token", response.data.token);
    }
  };

  const userAuthenticated = async () => {
    const response  = await axios.get("/isAuth", {
      headers: {
        "x-access-token": localStorage.token
      }
    });
    // get the userId 
    console.log(response);

  }

  useEffect( () => {
    const getResponse = async () => {
      const response = await axios.get('/login');
      console.log(response);
    };

    getResponse();
  }, [])

  return (
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
      {loginStatus ? <button onClick={userAuthenticated}>User Auth</button>: "Nope"}
    </div>
  );
}

export default RegistrationLogin;
