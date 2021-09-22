import { Link              } from 'react-router-dom';
import { ethers            } from 'ethers';
import { roles as roledict } from './role-dict';

export const address = address => <Link to={`/address?id=${address}`} className='text-monospace'>{ethers.utils.getAddress(address)}</Link>;
export const role    = roleid  => <Link to={`/role?id=${roleid}`    } className='text-monospace'>{roledict[roleid] ?? roleid }</Link>;