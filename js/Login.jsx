const React = require('react')

const Login = (props) => {
  return (
    <a className='auth-github' href='/auth/github'>
      <img className='github-mark' src='/public/icons/GitHub-Mark.png' alt='Github'/>
      Login with GitHub
    </a>
  )
}

module.exports = Login
