import * as React   from 'react';
import * as graphql from '../../graphql';
import * as format  from '../utils/format'
import Fetch        from '../utils/Fetch';

import { Container, Card, Accordion, Table } from 'react-bootstrap';

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
        props.provider.resolveName(props.params.address).then(setAddress).catch(console.error);
    }, [ props.provider, props.params.address ]);

    return (
        <Container>
        <Fetch variables={{ address: address?.toLowerCase() }} query={graphql.account}>
            <Account.renderer {...props}/>
        </Fetch>
        </Container>
    );
}

Account.renderer = (props) => {
    const id       = props.results?.account?.id;
    const owner    = props.results?.account?.asOwnable?.owner.id;
    const roles    = props.results?.account?.asAccessControl?.roles.map(role => role.role.id) ?? [];
    const ownerOf  = props.results?.account?.ownerOf.map(ownable => ownable.id) ?? [];
    const memberOf = props.results?.account?.membership.map(membership => ({ contract: membership.accesscontrolrole.contract.id, roleId: membership.accesscontrolrole.role.id })) ?? [];

    return (
        <>
            <Card bg='light' className='my-3'>
                <Card.Header className='text-center'>
                    <h3 className='my-3'><format.Address { ...props } address={ id }/></h3>
                </Card.Header>
            </Card>
            <Accordion>
                {
                    owner &&
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            Contract is Ownable
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table bordered size='sm' className='text-center my-3'>
                                <tbody>
                                    <tr>
                                        <td>
                                            Owner
                                        </td>
                                        <td>
                                            <format.Address { ...props } address={ owner }/>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                }{
                    !!roles.length &&
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            Contract is AccessControl with { roles.length } roles
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table bordered size='sm' className='text-center my-3'>
                                <tbody>
                                {
                                    roles.map((roleId, i) =>
                                        <tr key={i}>
                                            <td>
                                                <format.Role address={ id } role={ roleId }/>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                }{
                    !!ownerOf.length &&
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            Account owns { ownerOf.length } contracts
                        </Accordion.Header>
                        <Accordion.Body>
                        <Table bordered size='sm' className='text-center my-3'>
                                <tbody>
                                {
                                    ownerOf.map((address, i) =>
                                        <tr key={i}>
                                            <td>
                                                <format.Address { ...props } address={ address }/>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                }{
                    !!memberOf.length &&
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            Account is member of { memberOf.unique(({ contract }) => contract).length } contracts
                        </Accordion.Header>
                        <Accordion.Body>
                        <Table bordered size='sm' className='text-center my-3'>
                                <tbody>
                                {
                                    Object.entries(memberOf.groupBy('contract')).map(([ contract, roles ], i) => roles.map(({ roleId }, j) =>
                                        <tr key={ `${i}-${j}` }>
                                            {
                                                j === 0 &&
                                                <td rowSpan={ roles.length } className='align-middle'><format.Address {...props} address={ contract }/></td>
                                            }
                                            <td><format.Role address={ contract } role={ roleId }/></td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                }
            </Accordion>
        </>
    );
};

export default Account;