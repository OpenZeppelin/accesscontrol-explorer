import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils.js';
import { keccak256 } from 'ethereum-cryptography/keccak.js';

export function toChecksumAddress(address: string): string {
  address = address.replace(/^0x/, '').toLowerCase();
  const addressBytes = utf8ToBytes(address);
  const hash = toHex(keccak256(addressBytes));

  let ret = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
}
