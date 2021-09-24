import * as graphql from '../../graphql';
import * as format  from '../utils/format'
import Fetch        from '../utils/Fetch';

import { Container, Card, Accordion, Table } from 'react-bootstrap';

const Role = (props) =>
    <Container>
    <Fetch variables = {{ id: `${props.params.address.toLowerCase()}/${props.params.role.toLowerCase()}` }} query = {graphql.accountrole}>
        <Role.renderer {...props}/>
    </Fetch>
    </Container>;

Role.renderer = (props) => {
    const address = props.results?.accessControlRole?.contract?.id;
    const role    = props.results?.accessControlRole?.role?.id;
    const admin   = props.results?.accessControlRole?.admin;
    const adminOf = props.results?.accessControlRole?.adminOf ?? [];
    const members = props.results?.accessControlRole?.members ?? [];

    return (
        <>
            <Card bg='light' className='my-3'>
                <Card.Header className='text-center'>
                    <h3 className='my-3'>Role: <format.Role role={ role }/></h3>
                    <h3 className='my-3'>Contract: <format.Address {...props} address={ address }/></h3>
                </Card.Header>
            </Card>
            <Accordion>
                {
                    admin &&
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            Role is administered by
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table bordered size='sm' className='align-middle text-center my-3'>
                                <tbody>
                                <tr>
                                    <td>
                                        <format.Role address={ admin.contract.id } role={ admin.role.id }/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                }{
                    !!adminOf.length &&
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            Role is administrator of { adminOf.length } roles
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table bordered size='sm' className='align-middle text-center my-3'>
                                <tbody>
                                {
                                    adminOf.map((role, i) =>
                                        <tr key={ i }>
                                            <td>
                                                <format.Role address={ role.contract.id } role={ role.role.id }/>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                }{
                    !!members.length &&
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            Role has { members.length } members
                        </Accordion.Header>
                        <Accordion.Body>
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
                        </Accordion.Body>
                    </Accordion.Item>
                }
            </Accordion>
        </>
    );
};

export default Role;



// {/* <Fetch variables = {{ id: `${props.params.address.toLowerCase()}/${props.params.role.toLowerCase()}` }} query = {graphql.accountrole}> */}
// const AccountRole = (props) =>
//     <Container>
//     <Fetch variables = {{ role: props.params.role.toLowerCase() }} query = {graphql.role}>
//         <AccountRole.renderer {...props}/>
//     </Fetch>
//     </Container>;

// AccountRole.renderer = (props) => {
//     const id        = props.results.role?.id;
//     const contracts = props.results.role?.roleOf.map(role => role.contract.id) ?? [];

//     return (
//         <>
//             <Card bg='light' className='my-3'>
//                 <Card.Header className='text-center'>
//                     <h3 className='my-3'><format.Role role={ id }/></h3>
//                 </Card.Header>
//             </Card>
//             <Accordion>
//                 <Accordion.Item eventKey="0">
//                         <Accordion.Header>
//                             Role is used in { contracts.length } contracts
//                         </Accordion.Header>
//                         <Accordion.Body>
//                             <Table bordered size='sm' className='align-middle text-center my-3'>
//                                 <tbody>
//                                 {
//                                     contracts.map((contract, i) =>
//                                         <tr key={i}>
//                                             <td>
//                                                 <format.Address {...props} address={ contract } role={ id }/>
//                                             </td>
//                                         </tr>
//                                     )
//                                 }
//                                 </tbody>
//                             </Table>
//                         </Accordion.Body>
//                     </Accordion.Item>
//             </Accordion>
//         </>
//     );
// };
