import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loggedInUser, setLoggedInUser, storage, storageUsers, storageUsersUsersstorageUsers } from '../storageOperations/storageOperations'

function Login({ setUpdate }) {

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [existUser, setExistUser] = useState({})
  const navigate = useNavigate()


  const handleChange = (e) => {

    if (e.target.name === 'terms') {
      setUser({ ...user, [e.target.name]: e.target.checked })
    } else {
      setUser({ ...user, [e.target.name]: e.target.value })
    }
  }

  const userExists = () => {
    if (storageUsers()) {
      let exists = false

      storageUsers().forEach(data => {
        if (data.email === user.email) {
          exists = true
          setExistUser(data)
        }
      });
      return exists
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)

    if (verify()) {

      if (storageUsers()) {

        const userL = storageUsers().find(e => e.email === user.email)

        if (userL.password === user.password) {
          setLoggedInUser(userL)
          setUser({
            email: "",
            password: "",
          })
          setUpdate(1)
          navigate("/")
        }

      }
      setIsSubmitted(false)
    }
  }


  const verify = () => {
    let localError = {}
    let returnVerified = true;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    const addErrMessage = (key, msg) => {
      localError[key] = msg
      returnVerified = false
    }

    // For email
    if (!true) {
      addErrMessage("email", "Please Enter Email")
    } else if (!emailRegex.test(user.email)) {
      addErrMessage("email", "Please enter a valid email")
    } else if (!userExists()) {
      addErrMessage("email", "User does not exists")
    }

    // For password 
    if (!user.password) {
      addErrMessage("password", "Please, enter password")
    } else if (existUser.password !== user.password) {
      addErrMessage("password", "Incorrect password")
    }

    setError(localError)
    return returnVerified

  }

  useEffect(() => {
    verify()
  }, [user])

  useEffect(() => {
    if (loggedInUser()) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [])


  return (
    <div>
      <h3 className='text-center alert alert-success'>Login user</h3>
      <div className="container w-50 my-3 p-5  shadow" style={{ borderRadius: "20px" }} >

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name='email' value={user.email} className="form-control" id="email" placeholder="Enter email" onChange={handleChange} />
          {error.email && isSubmitted && <p className='text-danger'>{error.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="pwd">Password</label>
          <input type="text" name='password' value={user.password} className="form-control" id="pwd" placeholder="Password" onChange={handleChange} />
          {error.password && isSubmitted && <p className='text-danger'>{error.password}</p>}
        </div>

        <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-2">Submit</button>
        <hr />
        <Link to="/signup">Create new account?</Link>
      </div>
    </div>
  )
}

export default Login