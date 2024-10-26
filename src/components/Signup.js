import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
      });

      const json = await response.json();
      console.log(json);
      if(json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/");
        props.showAlert("Account Created Successfully", "success");
      } else {
        props.showAlert("Invalid Details", "danger");
      }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className="container mt-3">
        <h2>Create an account to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={credentials.name} name="name" onChange={onChange} minLength={3} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} name="cpassword" onChange={onChange} minLength={5} required />
            </div>
            <button disabled={credentials.name.length <3 || credentials.password.length<5 || credentials.cpassword.length<5} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup