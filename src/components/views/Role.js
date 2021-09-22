import { Container, Table } from 'react-bootstrap';
import SlideToggle from 'react-slide-toggle';

import * as format from '../utils/format';

const fallback = (process) => (data) => !!data ? process(data) : process.error(data);

const Role = (props) => {
    const data = {
        roleFor: (props.results?.role?.roleOf || []).reduce((acc, role) => Object.assign(
                acc,
                { [role.contract.id]: role.members.map(member => member.account.id)}
            ), {}),
    };

    return <Container>
        <h1>{ format.role(props.results?.role?.id) }</h1>
        <ul>
            { fallback(RoleFor)(data.roleFor) }
        </ul>
    </Container>;
}

const RoleFor = (roleFor) => <SlideToggle collapsed={false} render={ ({ toggle, setCollapsibleElement }) =>
    <>
        <li onClick={toggle} role={ !!Object.keys(roleFor).length ? 'button': '' }>
            Used by {Object.keys(roleFor).length} contracts
        </li>
        <Table bordered hover size='sm' ref={setCollapsibleElement}>
        {
            !!Object.keys(roleFor).length &&
            <tbody>
            {
                Object.entries(roleFor).map(([ contract, members ], i) =>
                    <tr key={i}>
                        <td>{ format.address(contract) }</td>
                        <td>{ members.length } active members</td>
                    </tr>
                )
            }
            </tbody>
        }
        </Table>
    </>
}/>;

export default Role;