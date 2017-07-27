const React = require('react')

const Login = (props) => {
  return (
    <div className='login-wrapper'>
      <div className='auth-link'>
        <a className='auth-github' href='/auth/github'>
          <img className='github-mark' src='/public/icons/GitHub-Mark.png' alt='Github' />
          Login with GitHub
        </a>
      </div>
      <div className='auth-link'>
        <a className='auth-twitter' href='/auth/twitter'>
          <img className='twitter-mark' src='/public/icons/twitter-icon.png' alt='Twitter' />
          Login with Twitter
        </a>
      </div>
      <div className='auth-link'>
        <a className='auth-google' href='/auth/google'>
          <img className='google-mark' src='/public/icons/google-mark.png' alt='Google' />
          Login with Google
        </a>
      </div>
    </div>
  )
}

module.exports = Login
