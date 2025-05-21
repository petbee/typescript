/* eslint-disable n/global-require */

exports.hasPackage = (pkg) => {
  try {
    require(pkg)

    return true
  } catch (e) {
    return false
  }
}
