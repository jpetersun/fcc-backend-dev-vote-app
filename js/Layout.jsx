const React = require('react')
const MenuIcon = require('./MenuIcon')

const title = {
  textAlign: 'center',
  color: '#000'
}

const titleLink = {
  color: '#000',
  textDecoration: 'none'
}

const content = {
  padding: '0 20px 0 20px',
  maxWidth: '600px',
  margin: '0 auto'
}
// const navigation = {
//   textAlign: 'center',
//   display: 'flex',
//   flexDirection: 'column'
// }
const navigationLink = {
  // margin: '1rem',
  color: '#999',
  fontSize: '20px',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '100%',
  textDecoration: 'none',
  marginTop: '1rem'
}

const menuIcon = {
  width: '40px',
  position: 'fixed',
  top: '2rem',
  right: '2rem'
}

function Nav (props) {
  if (!props.warn) {
    return null
  }
  return (
    <nav className='navigation-mobile'>
      <a style={navigationLink} href='/create-poll'>Create Poll</a>
      <a style={navigationLink} href='/account'>Account</a>
      <a style={navigationLink} href='/logout'>Logout</a>
    </nav>
  )
}

class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.handleIconClick = this.handleIconClick.bind(this)
    this.state = {
      showWarning: false
    }
  }

  handleIconClick (e) {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }))
  }

  render () {
    return (
      <div className='layout'>
        <header className='header'>
          <div className='menu-icon' style={menuIcon}>
            <a onClick={this.handleIconClick} href='javascript:void(0)'>
              <MenuIcon />
            </a>
          </div>
          <Nav warn={this.state.showWarning} />
        </header>
        <h1 style={title} className='layout-title'>
          <a style={titleLink} href='/'>Vote On It</a>
        </h1>
        <nav className='navigation'>
          <a href='/create-poll'>Create Poll</a>
          <a href='/account'>Account</a>
          <a href='/logout'>Logout</a>
        </nav>
        <main className=''>
          <div style={content} className='content'>{this.props.children}</div>
        </main>
      </div>
    )
  }
}

const { element } = React.PropTypes

Layout.propTypes = {
  children: element.isRequired
}

module.exports = Layout
