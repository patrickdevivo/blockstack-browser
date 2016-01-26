import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'

function mapStateToProps(state) {
  return {
    encryptedMnemonic: state.keychain.encryptedMnemonic
  }
}

class MainScreen extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

class WelcomeScreen extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    encryptedMnemonic: PropTypes.string
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentHasNewProps(encryptedMnemonic) {
    if (encryptedMnemonic === null) {
      this.context.router.push('/landing')
    } else {
      this.context.router.push('/bookmarks')
    }
  }

  componentWillMount() {
    this.componentHasNewProps(this.props.encryptedMnemonic)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.encryptedMnemonic !== this.props.encryptedMnemonic) {
      this.componentHasNewProps(this.props.encryptedMnemonic)
    }
  }

  render() {
    const accountExists = this.props.encryptedMnemonic
    return (
      <div>
      { accountExists ?
        <MainScreen children={this.props.children} />
      :
        <WelcomeScreen children={this.props.children} />
      }
      {
        (() => {
          if (process.env.NODE_ENV !== 'production') {
            //const DevTools = require('./components/DevTools')
            //return <DevTools />
          }
        })()
      }
      </div>
    )
  }
}


export default connect(mapStateToProps)(App)
