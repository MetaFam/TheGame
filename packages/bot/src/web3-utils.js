/*
 * Implementation from web3.js (https://github.com/ethereum/web3.js/blob/master/lib/utils/utils.js)
 */

import CryptoJS from 'crypto-js';
import sha3lib from 'crypto-js/sha3';

export function validateAddress(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // check if it has the basic requirements of an address
    return false;
  }
  if (
    /^(0x)?[0-9a-f]{40}$/.test(address) ||
    /^(0x)?[0-9A-F]{40}$/.test(address)
  ) {
    // If it's all small caps or all all caps, return true
    return true;
  }
  // Otherwise check each case
  return isChecksumAddress(address);
}

function isChecksumAddress(address) {
  // Check each case
  const slicedAddress = address.replace('0x', '');
  const addressHash = sha3(slicedAddress.toLowerCase());

  for (let i = 0; i < 40; i += 1) {
    // the nth letter should be uppercase if the nth digit of casemap is 1
    if (
      (parseInt(addressHash[i], 16) > 7 &&
        address[i].toUpperCase() !== address[i]) ||
      (parseInt(addressHash[i], 16) <= 7 &&
        address[i].toLowerCase() !== address[i])
    ) {
      return false;
    }
  }
  return true;
}

function sha3(value, options) {
  let parseValue = value;
  if (options && options.encoding === 'hex') {
    if (value.length > 2 && value.substr(0, 2) === '0x') {
      parseValue = value.substr(2);
    }
    parseValue = CryptoJS.enc.Hex.parse(value);
  }

  return sha3lib(parseValue, {
    outputLength: 256,
  }).toString();
}
