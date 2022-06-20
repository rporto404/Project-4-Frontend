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
      console.log('Failed to Create New Account')
      alert('Failed to create new account.')
      return
    }).then((response) => {
      console.log('Created New Account with ' + email);
      alert(`Created new account with ` + email + `!`)
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    axios.put('https://floating-fortress-76589.herokuapp.com/api/useraccount/login', {
      email: email,
      password: pass,
    }).catch((error) => {
      console.log('Log in Failed')
      alert(`User account doesn't exist/incorrect details. Please try again!`)
      return
    }).then((response) => {
      if (response) {
        setUserId(response.data.id)
        setHideAccount(!hideAccount)
        console.log('Logged in with ' + email)
        alert(`Logged in with ` + email + `!`)
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
      alert(`User deleted.`)
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
        <div>
          <button onClick={handleShowLogin}>Show Login</button>
          <h1>Create A New Account</h1>
          <form onSubmit={handleSubmitNew}>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              id='email'
              autoComplete='off'
              onChange={(event) => {setEmail(event.target.value)}}
              value={email}
              required
            />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              autoComplete='off'
              onChange={(event) => {setPass(event.target.value)}}
              value={pass}
              required
            />
            <button>Create Account</button>
          </form>
        </div>
      </> :
      <>
        <div>
          <button onClick={handleShowLogin}>Show Create Account</button>
          <h1>Sign In To Account</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor='email'>Email:</label>
            <input
              type='text'
              id='email'
              autoComplete='off'
              onChange={(event) => {setEmail(event.target.value)}}
              value={email}
              required
            />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              autoComplete='off'
              onChange={(event) => {setPass(event.target.value)}}
              value={pass}
              required
            />
            <button>Log In</button>
          </form>
        </div>
      </>
    }
    </> :
    <>
      <div>
        <h5>Logged in with {email}</h5> <br/>
        <button onClick={handleLogout}>Log Out</button>
        <button onClick={handleDelete}>Delete Account</button>
      </div>
    </>
    }
    </>
  )
}

export default Login;
