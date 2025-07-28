import React from 'react';

const Login = () => {
  return (
    <div style={{ padding: 50 }}>
      <h2>Admin Login</h2>
      <input placeholder="Email" /><br/><br/>
      <input type="password" placeholder="Password" /><br/><br/>
      <button>Login</button>
    </div>
  );
};

export default Login;
