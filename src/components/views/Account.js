import * as React   from 'react';
import * as graphql from '../../graphql';
import * as format  from '../utils/format'
import Fetch        from '../utils/Fetch';
import Page         from '../utils/Page';

import { Table } from 'react-bootstrap';

Array.prototype.unique = function(op = x => x) {
    return this.filter((obj, i) => this.findIndex(entry => op(obj) === op(entry)) === i);
}

Array.prototype.groupBy = function(key) {
    return this.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const Account = (props) => {
    const [ address, setAddress ] = React.useState(undefined);

    React.useEffect(() => {
        props.provider.resolveName(props.params.address).then(setAddress);
    }, [ props.provider, props.params.address ]);

    return (
        <Fetch variables={{ address: address?.toLowerCase() }} query={graphql.account}>
            <Account.renderer {...props}/>
        </Fetch>
    );
};

Account.renderer = (props) => {
    const id       = props.results?.account?.id;
    const owner    = props.results?.account?.asOwnable?.owner.id;
    const roles    = props.results?.account?.asAccessControl?.roles.map(role => role.role.id) ?? [];
    const ownerOf  = props.results?.account?.ownerOf.map(ownable => ownable.id) ?? [];
    const memberOf = props.results?.account?.membership.map(membership => ({ contract: membership.accesscontrolrole.contract.id, roleId: membership.accesscontrolrole.role.id })) ?? [];

    return <Page
        header={
            <format.Address {...props} address={ id } size='small'/>
        }
        sections={
            [
                owner && {
                    title: `Contract is Ownable`,
                    body: (
                        <Table bordered size='sm' className='text-center my-3'>
                            <tbody>
                                <tr>
                                    <td>
                                        Owner
                                    </td>
                                    <td>
                                        <format.Address {...props} address={ owner }/>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    ),
                },
                !!roles.length && {
                    title: `Contract is AccessControl with ${ roles.length } roles`,
                    body: (
                        <Table bordered size='sm' className='text-center my-3'>
                            <tbody>
                            {
                                roles.map((roleId, i) =>
                                    <tr key={i}>
                                        <td>
                                            <format.Role {...props} address={ id } role={ roleId }/>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    ),
                },
                !!ownerOf.length && {
                    title: `Account owns ${ ownerOf.length } contracts`,
                    body: (
                        <Table bordered size='sm' className='text-center my-3'>
                            <tbody>
                            {
                                ownerOf.map((address, i) =>
                                    <tr key={i}>
                                        <td>
                                            <format.Address {...props} address={ address }/>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    ),
                },
                !!memberOf.length && {
                    title: `Account is member of ${ memberOf.unique(({ contract }) => contract).length } contracts`,
                    body: (
                        <Table bordered size='sm' className='text-center my-3'>
                            <tbody>
                            {
                                Object.entries(memberOf.groupBy('contract')).map(([ contract, roles ], i) => roles.map(({ roleId }, j) =>
                                    <tr key={ `${i}-${j}` }>
                                        {
                                            j === 0 &&
                                            <td rowSpan={ roles.length } className='align-middle'><format.Address {...props} address={ contract }/></td>
                                        }
                                        <td><format.Role {...props} address={ contract } role={ roleId }/></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    ),
                },
            ].filter(Boolean)
        }
    />;
};

export default Account;