const DEV_APP_PORT_BIND_ERRORS = [
  '[datastore] Exiting due to exception: java.io.IOException: Failed to bind',
  '[datastore] Exiting due to exception: java.net.BindException: Address already in use',
]

function isPortAlreadyInUse(text) {
  return DEV_APP_PORT_BIND_ERRORS
    .some(message => text.includes(message))
}

module.exports = isPortAlreadyInUse
