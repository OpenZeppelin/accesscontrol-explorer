import * as React   from 'react';
import * as graphql from '../../graphql';
import * as format  from '../utils/format'
import Fetch        from '../utils/Fetch';
import Page         from '../utils/Page';

import { Table } from 'react-bootstrap';

const AccountRole = (props) => {
    const [ address, setAddress ] = React.useState(undefined);

    React.useEffect(() => {
        props.provider.resolveName(props.params.address).then(setAddress);
    }, [ props.provider, props.params.address ]);

    return (
        <Fetch variables = {{ id: `${address?.toLowerCase()}/${props.params.role.toLowerCase()}` }} query = {graphql.accountrole}>
            <AccountRole.renderer {...props}/>
        </Fetch>
    );
};

AccountRole.renderer = (props) => {
    const address = props.results?.accessControlRole?.contract?.id;
    const role    = props.results?.accessControlRole?.role?.id;
    const admin   = props.results?.accessControlRole?.admin;
    const adminOf = props.results?.accessControlRole?.adminOf ?? [];
    const members = props.results?.accessControlRole?.members ?? [];

    return <Page
        header={
            <>
                <format.Role {...props} role={ role }/>
                <format.Address {...props} address={ address } size='small'/>
            </>
        }
        sections={
            [
                admin && {
                    title: `Role is administered by`,
                    body: (
                        <Table bordered size='sm' className='align-middle text-center my-3'>
                            <tbody>
                            <tr>
                                <td>
                                    <format.Role {...props} address={ admin.contract.id } role={ admin.role.id }/>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    ),
                },
                !!adminOf.length && {
                    title: `Role is administrator of ${ adminOf.length } roles`,
                    body: (
                        <Table bordered size='sm' className='align-middle text-center my-3'>
                            <tbody>
                            {
                                adminOf.map((role, i) =>
                                    <tr key={ i }>
                                        <td>
                                            <format.Role {...props} address={ role.contract.id } role={ role.role.id }/>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    ),
                },
                !!members.length && {
                    title: `Role has ${ members.length } members`,
                    body: (
                        <Table bordered size='sm' className='align-middle text-center my-3'>
                            <tbody>
                            {
                                members.map(({ account }, i) =>
                                    <tr key={ i }>
                                        <td>
                                            <format.Address {...props} address={ account.id }/>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    ),
                },
            ].filter(Boolean)
        }
    />;
};

export default AccountRole;