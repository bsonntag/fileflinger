import _ from 'lodash'
import { connect } from 'react-redux'
import React, { PropTypes } from 'react'

import App from '../components/App.jsx'
import { changeRoute, goBack } from '../actions/route-actions'

import CodeExchangerPage from './CodeExchangerPage.jsx'
import FileReceiverPage from './FileReceiverPage.jsx'
import FileSenderPage from './FileSenderPage.jsx'

const Router = React.createClass({
  propTypes: {
    changeRoute: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    route: PropTypes.string.isRequired,
  },
  changeRouteProp(route) {
    return _.partial(this.props.changeRoute, route)
  },
  render() {
    switch(this.props.route) {
      case 'start-send':
        return this.renderStartSend()
      case 'send':
        return this.renderSend()
      case 'start-receive':
        return this.renderStartReceive()
      case 'receive':
        return this.renderReceive()
      case 'main':
      default:
        return this.renderMain()
    }
  },
  renderStartSend() {
    return <CodeExchangerPage
      cancel={this.props.goBack}
      isInitiator={true}
      next={this.changeRouteProp('send')}
    >
    </CodeExchangerPage>
  },
  renderSend() {
    return <FileSenderPage
      cancel={this.changeRouteProp('main')}
    >
    </FileSenderPage>
  },
  renderStartReceive() {
    return <CodeExchangerPage
      cancel={this.props.goBack}
      isInitiator={false}
      next={this.changeRouteProp('receive')}
    >
    </CodeExchangerPage>
  },
  renderReceive() {
    return <FileReceiverPage
      cancel={this.changeRouteProp('main')}
    >
    </FileReceiverPage>
  },
  renderMain() {
    return <App
      goToSend={this.changeRouteProp('start-send')}
      goToReceive={this.changeRouteProp('start-receive')}
    >
    </App>
  },
})

function mapStateToProps(state) {
  return {
    route: state.route.current,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: route => dispatch(changeRoute(route)),
    goBack: () => dispatch(goBack()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)
