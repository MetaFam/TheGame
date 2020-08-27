/*
 * Implementation from web3.js (https://github.com/ethereum/web3.js/blob/master/lib/utils/utils.js)
 */

const CryptoJS = require('crypto-js')
const sha3lib = require('crypto-js/sha3')

function validateAddress(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false
  } else if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true
  } else {
    // Otherwise check each case
    return isChecksumAddress(address)
  }
}

function isChecksumAddress(address) {
  // Check each case
  address = address.replace('0x', '')
  var addressHash = sha3(address.toLowerCase())

  for (var i = 0; i < 40; i++) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false
    }
  }
  return true
}

function sha3(value, options) {
  if (options && options.encoding === 'hex') {
    if (value.length > 2 && value.substr(0, 2) === '0x') {
      value = value.substr(2)
    }
    value = CryptoJS.enc.Hex.parse(value)
  }

  return sha3lib(value, {
    outputLength: 256,
  }).toString()
}

module.exports = { validateAddress }
