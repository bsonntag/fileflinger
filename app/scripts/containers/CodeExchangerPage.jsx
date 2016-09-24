import { connect } from 'react-redux'
import SimplePeer from 'simple-peer'

import CodeExchanger from '../components/CodeExchanger.jsx'
import { clearPeer, setPeer } from '../actions/peer-actions'

function mapState() {
  return {
  }
}

function mapDispatch(dispatch) {
  return {
    createPeer: options => {
      let peer = new SimplePeer(options)
      dispatch(setPeer(peer))
      return peer
    },
    releasePeer: () => dispatch(clearPeer),
  }
}

export default connect(mapState, mapDispatch)(CodeExchanger)
