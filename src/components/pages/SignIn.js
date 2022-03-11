import React, {useState} from 'react';
import '../../App.css';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


export default function SignIn({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
    console.log(token.data)
  }

  return (
    <form onSubmit={handleSubmit}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <label for="username">Username:</label>
                  <input type="text" onChange={e => setUserName(e.target.value)} id="username" required/>
                </li>
                <li>
                  <label for="email">Email:</label>
                  <input type="email" id="email" required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" onChange={e => setPassword(e.target.value)} id="password" required/>
                </li>
                <br></br>
              </ul>
              <h3>Your Preferences</h3>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
                <div>
                <label>
                  <input type="checkbox" class="radio" value="1" name="cryptoPref" />Crypto</label>
                <label>
                  <input type="checkbox" class="radio" value="1" name="stocksPref" />Stocks</label>
                </div> 
              
            </fieldset>
            <button>Sign Up</button>
            <button type="button" onClick={ () => this.changeView("logIn")}>Have an Account?</button>
          </form>
  );
}

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired
}