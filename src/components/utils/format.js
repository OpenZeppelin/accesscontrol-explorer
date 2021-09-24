import * as React from 'react';
import { Link              } from 'react-router-dom';
import { roles as roledict } from './role-dict';

const url = (base, params = {}) => `/${base}?` + Object.entries(params).filter(entry => entry.every(Boolean)).map(entry => entry.join('=')).join('&');

export const Address = (props) => {
    const [ ensAddress, setEnsAddress ] = React.useState(undefined);
    const [ hexAddress, setHexAddress ] = React.useState(undefined);

    React.useEffect(() => {
        if (props.address) {
            props.provider.resolveName(props.address).then(setHexAddress).catch(console.error);
        }
    }, [ props.provider, props.address ]);

    React.useEffect(() => {
        if (hexAddress && hexAddress?.toLowerCase() === props.address?.toLowerCase()) {
            props.provider.lookupAddress(hexAddress).then(setEnsAddress);
        } else {
            setEnsAddress(props.address);
        }
    }, [ props.provider, props.address, hexAddress ]);

    return (
        <Link to={ url('view', { address: props.address, role: props.role }) } className='text-monospace'>
            { ensAddress ?? hexAddress ?? props.address }
        </Link>
    );
}

export const Role = (props)  => {
    const [ name, setName ] = React.useState(undefined);

    React.useEffect(() => {
        setName(roledict[props.role]);
    }, [ props.role ]);

    return (
        <Link to={ url('view', { address: props.address, role: props.role }) } className='text-monospace'>
            { name ?? props.role }
        </Link>
    );
}