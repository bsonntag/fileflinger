export const encodeSignal = signal => btoa(JSON.stringify(signal));
export const decodeSignal = code => JSON.parse(atob(code));
