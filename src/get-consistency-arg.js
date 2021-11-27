/**
 * Calculate the consistency command line argument.
 * Depend from the engine how to set data directory for the emulator
 * @param options
 * @returns {(string|string)[]|*[]}
 */
function getConsistencyArg(options) {
  return options.consistency ? ['--consistency', options.consistency] : []
}

module.exports = getConsistencyArg
