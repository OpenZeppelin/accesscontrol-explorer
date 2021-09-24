import * as graphql from '../../graphql';
import * as format  from '../utils/format'
import Fetch        from '../utils/Fetch';
import Page         from '../utils/Page';

import { Table } from 'react-bootstrap';

const Role = (props) =>
    <Fetch variables = {{ role: props.params.role.toLowerCase() }} query = {graphql.role}>
        <Role.renderer {...props}/>
    </Fetch>;

Role.renderer = (props) => {
    const id        = props.results.role?.id;
    const contracts = props.results.role?.roleOf.map(role => role.contract.id) ?? [];

    return <Page
        header={
            <format.Role role={ id }/>
        }
        sections={[{
            title: `Role is used in ${ contracts.length } contracts`,
            body: (
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
            ),
        }]}
    />;
};

export default Role;