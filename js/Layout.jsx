const React = require('react')

const Layout = (props) => (
  <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
    <header className='mdl-layout__header'>
      <div className='mdl-layout__header-row'>
        <h4 className='mdl-layout-spacer layout-title'>
          <a style={{color: '#fff', textDecoration: 'none'}} href='/'>Vote App</a>
        </h4>
        <nav className='mdl-navigation mdl-layout--large-screen-only'>
          <a className='mdl-navigation__link' href='/create-poll'>Create Poll</a>
          <a className='mdl-navigation__link' href='/auth/github'>Login - Github</a>
          <a className='mdl-navigation__link' href='/account'>Account</a>
          <a className='mdl-navigation__link' href='/logout'>Logout</a>
        </nav>
      </div>
    </header>
    <main className='mdl-layout__content'>
      <div className='page-content'>{props.children}</div>
    </main>
  </div>
)

const { element } = React.PropTypes

Layout.propTypes = {
  children: element.isRequired
}

module.exports = Layout
