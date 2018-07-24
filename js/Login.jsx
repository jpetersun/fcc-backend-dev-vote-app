import React from 'react'

const Login = (props) => {
  return (
    <div className='login-wrapper'>
      <div className='auth-link'>
        <a href='/auth/github'>
          <img className='github-mark' src='/public/icons/GitHub-Mark.png' alt='Github' />
        </a>
        <a className='auth-github' href='/auth/github'>
          Login with GitHub
        </a>
      </div>
    </div>
  )
}

export default Login
