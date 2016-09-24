import { connect } from 'react-redux'

import FileReceiver from '../components/FileReceiver.jsx'
import { clearPeer } from '../actions/peer-actions'

function mapState(state) {
  return {
    peer: state.peer,
  }
}

function mapDispatch(dispatch) {
  return {
    releasePeer: () => dispatch(clearPeer),
  }
}

export default connect(mapState, mapDispatch)(FileReceiver)
