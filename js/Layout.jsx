const React = require('react')

const Layout = (props) => (
  <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
    <header className='mdl-layout__header'>
      <div className='mdl-layout__header-row'>
        <h4 className='mdl-layout-spacer layout-title'>Vote App</h4>
        <nav className='mdl-navigation mdl-layout--large-screen-only'>
          <a className='mdl-navigation__link' href=''>Link</a>
          <a className='mdl-navigation__link' href=''>Link</a>
          <a className='mdl-navigation__link' href=''>Link</a>
          <a className='mdl-navigation__link' href=''>Link</a>
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
