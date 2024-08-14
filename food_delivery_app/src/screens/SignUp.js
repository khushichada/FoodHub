import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css'; // Custom CSS

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
            });

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert('Enter valid Credentials');
            } else {
                alert('Account created successfully');
            }
        } catch (error) {
            console.error("Error:", error);
            alert('An error occurred. Please try again.');
        }
    };

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <h2 className='text-success text-center mb-4'>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">UserName</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="Address">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                    <div className='text-center mt-3'>
                        <Link to='/login' className='btn btn-link'>Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
