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
      <div className='auth-link'>
        <a href='/auth/twitter'>
          <img className='twitter-mark' src='/public/icons/twitter-icon.png' alt='Twitter' />
        </a>
        <a className='auth-twitter' href='/auth/twitter'>
          Login with Twitter
        </a>
      </div>
      <div className='auth-link'>
        <a href='/auth/google'>
          <img className='google-mark' src='/public/icons/google-mark.png' alt='Google' />
        </a>
        <a className='auth-google' href='/auth/google'>
          Login with Google
        </a>
      </div>
    </div>
  )
}

export default Login
