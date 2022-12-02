const DEFAULT_PORT = 8081;

/**
 * If the preferredPort provided then returns with it otherwise try to find a free port
 *
 * @param preferredPort
 * @returns {Promise<number|*>}
 */
async function getEmulatorPort(preferredPort) {
  if (preferredPort)
    return preferredPort;

  const { default: getPort } = await import('get-port');

  return getPort({
    port: DEFAULT_PORT,
  });
}

module.exports = getEmulatorPort;
