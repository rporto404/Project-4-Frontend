import React, { useState } from 'react'
import axios from 'axios'

const Login = (props) => {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [hideAccount, setHideAccount] = useState(true)

  const handleSubmitNew = (event) => {
    event.preventDefault()
    axios.post('https://floating-fortress-76589.herokuapp.com/api/useraccount', {
      email: email,
      password: pass,
    }).catch((error) => {
      if (error) {
        console.log('Failed to Create New Account')
        alert('Failed to create new account.')
      }
    }).then((response) => {
      if (response) {
        console.log('Created New Account with ' + email);
        alert(`Created new account with ` + email + `!`)
      }
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    axios.put('https://floating-fortress-76589.herokuapp.com/api/useraccount/login', {
      email: email,
      password: pass,
    }).catch((error) => {
      if (error) {
        console.log('Log in Failed')
        alert(`User account doesn't exist/incorrect details. Please try again!`)
      }
    }).then((response) => {
      if (response) {
        setUserId(response.data.id)
        setHideAccount(!hideAccount)
        console.log('Logged in with ' + email)
        props.setToggleLoggedIn(true)
      }
    })
  }

  const handleLogout = (event) => {
    setUserId('')
    setHideAccount(!hideAccount)
    props.setToggleLoggedIn(false)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if (userId === '') {
      console.log('No User to Delete')
      alert('No user to delete.')
      return
    } else {
      axios.delete(`https://floating-fortress-76589.herokuapp.com/api/useraccount/${userId}`)
      console.log('User Deleted.')
      handleLogout()
    }
  }

  const handleShowLogin = (event) => {
    setShowLogin(!showLogin)
  }

  return (
    <>
      { hideAccount ?
      <>
      { showLogin ?
      <>
        <div className='border'>
          <button className="btn btn-primary" onClick={handleShowLogin}>Show Login</button>
          <br/>
          <br/>
          <br/>
          <h1>Create A New Account</h1>
          <form className="text-center" onSubmit={handleSubmitNew}>
            <br/>
            <br/>
            <input
              type='text'
              id='email'
              autoComplete='off'
              onChange={(event) => {setEmail(event.target.value)}}
              value={email}
              required
              placeholder="Username"
            />
            <br/>
            <br/>
            <input
              type='password'
              id='password'
              autoComplete='off'
              onChange={(event) => {setPass(event.target.value)}}
              value={pass}
              required
              placeholder="Password"
            />
            <br/>
            <br/>
            <button className="btn btn-success">Create Account</button>
          </form>
        </div>
      </> :
      <>
        <div>
          <button className="btn btn-primary" onClick={handleShowLogin}>Create Account</button>
          <br/>
          <br/>
          <br/>
          <h1>Sign In To Account</h1>
          <form onSubmit={handleLogin}>
            <br/>
            <br/>
            <input
              type='text'
              id='email'
              autoComplete='off'
              onChange={(event) => {setEmail(event.target.value)}}
              value={email}
              required
              placeholder='Username'
            />
            <br/>
            <br/>
            <input
              type='password'
              id='password'
              autoComplete='off'
              onChange={(event) => {setPass(event.target.value)}}
              value={pass}
              required
              placeholder='Password'
            />
            <br/>
            <br/>
            <button className='btn btn-success'>Log In</button>
          </form>
        </div>
      </>
    }
    </> :
    <>
      <div className='border p-0 w-80% rounded m-auto'>
        <h5 className='p-0 m-0'>Logged in with {email}</h5> <br/>
        <div className='btn-group p-2'>
          <button className='btn btn-secondary' onClick={handleLogout}>Log Out</button>
          <button className='btn btn-danger' onClick={handleDelete}>Delete Account</button>
        </div>
      </div>
    </>
    }
    </>
  )
}

export default Login;
