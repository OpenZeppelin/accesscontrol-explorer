import * as graphql from '../../graphql';
import * as format  from '../utils/format'
import Fetch        from '../utils/Fetch';

import { Container, Card, Accordion, Table } from 'react-bootstrap';

const Role = (props) =>
    <Container>
    <Fetch variables = {{ role: props.params.role.toLowerCase() }} query = {graphql.role}>
        <Role.renderer {...props}/>
    </Fetch>
    </Container>;

Role.renderer = (props) => {
    const id        = props.results.role?.id;
    const contracts = props.results.role?.roleOf.map(role => role.contract.id) ?? [];

    return (
        <>
            <Card bg='light' className='my-3'>
                <Card.Header className='text-center'>
                    <h3 className='my-3'><format.Role role={ id }/></h3>
                </Card.Header>
            </Card>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        Role is used in { contracts.length } contracts
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table bordered size='sm' className='align-middle text-center my-3'>
                            <tbody>
                            {
                                contracts.map((contract, i) =>
                                    <tr key={i}>
                                        <td>
                                            <format.Address {...props} address={ contract } role={ id }/>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};

export default Role;