const SignalEncoder = {
  encode,
  decode,
}

function encode(signal) {
  return btoa(JSON.stringify(signal))
}

function decode(data) {
  return JSON.parse(atob(data))
}

export default SignalEncoder
