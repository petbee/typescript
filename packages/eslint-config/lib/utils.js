/* eslint-disable n/global-require */

exports.hasPackage = (pkg) => {
  try {
    require(pkg)

    return true
  } catch (e) {
    return false
  }
}
exports.getFlat = (config) => {
  return config && config.flat ? (Array.isArray(config.flat) ? config.flat : [config.flat]) : []
}
