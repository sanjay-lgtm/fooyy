import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [credentials, setCredentials] = useState({ username: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:9918/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                username: credentials.username, email: credentials.email, password: credentials.password, location: credentials.geolocation
            })
        });
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Name </label>
                        <input type="text" className="form-control" name='username' value={credentials.username}
                            onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp"
                            name='email' value={credentials.email}
                            onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                            name='password' value={credentials.password}
                            onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFors="exampleInputPassword1" className="form-label">Location</label>
                        <input type="geolocation" className="form-control" id="exampleInputPassword1"
                            name='geolocation' value={credentials.geolocation}
                            onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger '>Already a user</Link>
                </form>
            </div>
        </>
    )
}