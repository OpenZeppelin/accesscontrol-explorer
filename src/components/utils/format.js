import * as React from 'react';
import { Link              } from 'react-router-dom';
import { ethers            } from 'ethers';
import { roles as roledict } from './role-dict';

import { Identicon, EthAddress } from 'ethereum-react-components';

const url = (base, params = {}) => `/${base}?` + Object.entries(params).filter(entry => entry.every(Boolean)).map(entry => entry.join('=')).join('&');

export const Address = (props) => {
    const [ ensAddress, setEnsAddress ] = React.useState(undefined);
    const [ hexAddress, setHexAddress ] = React.useState(undefined);

    React.useEffect(() => {
        if (!props.address) return;
        try {
            setHexAddress(ethers.utils.getAddress(props.address));
            props.provider.lookupAddress(props.address).then(setEnsAddress);
        } catch {
            setEnsAddress(props.address);
            props.provider.resolveName(props.address).then(setHexAddress);
        }
    }, [ props.provider, props.address ]);

    return (
        <span className='d-flex align-items-center justify-content-center text-monospace'>
            <Identicon address={ hexAddress } size={ props.size || 'tiny' } className='mr-2'/>
            <Link to={ url('view', { address: hexAddress, role: props.role }) }>
                <EthAddress address={ ensAddress ?? hexAddress ?? props.address }/>
            </Link>
        </span>
    );
}

export const Role = (props)  => {
    const [ name, setName ] = React.useState(undefined);

    React.useEffect(() => {
        setName(roledict[props.role]);
    }, [ props.role ]);

    return (
        <span className='d-flex align-items-center justify-content-center text-monospace'>
            <Link to={ url('view', { address: props.address, role: props.role }) }>
                <EthAddress address={ name ?? props.role }/>
            </Link>
        </span>
    );
}