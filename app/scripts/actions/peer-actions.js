export function setPeer(peer) {
  return {
    type: 'PEER_SET',
    peer,
  }
}

export function clearPeer() {
  return {
    type: 'PEER_CLEAR',
  }
}
