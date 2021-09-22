import { Container, Table } from 'react-bootstrap';
import SlideToggle from 'react-slide-toggle';

import * as format from '../utils/format';

const fallback = (process) => (data) => !!data ? process(data) : process.error(data);

const Address = (props) => {
    const data = {
        owner:   props.results?.account?.asOwnable?.owner.id,
        ownerOf: props.results?.account?.ownerOf.map(({ id }) => id),
        members: Object.fromEntries(
            props.results?.account?.asAccessControl?.roles
            .filter(role => role.members.length)
            .map(role => [
                role.role.id, role.members.map(member => member.account.id)
            ]) ?? []
        ),
        memberOf: (props.results?.account?.membership || [])
            .reduce((acc, { accesscontrolrole }) =>
                Object.assign(acc, { [accesscontrolrole.contract.id]: [].concat(acc[accesscontrolrole.contract.id] || [], accesscontrolrole.role.id) }),
                {},
            ),
    }
    return <Container>
        <h1>{ format.address(props.results?.account?.id) }</h1>
        <ul>
            { fallback(Owner   )(data.owner   ) }
            { fallback(Members )(data.members ) }
            { fallback(OwnerOf )(data.ownerOf ) }
            { fallback(MemberOf)(data.memberOf) }
        </ul>
    </Container>;
};

const Owner = (owner) => <SlideToggle collapsed={false} render={ ({ toggle, setCollapsibleElement }) =>
    <>
        <li onClick={toggle} role={ !!owner ? 'button': '' }>
            Ownable contract (1 owner)
        </li>
        <Table bordered hover size='sm' ref={setCollapsibleElement}>
        <tbody>
        {
            <tr>
                <td>Owner:</td>
                <td>{ format.address(owner) }</td>
            </tr>
        }
        </tbody>
        </Table>
    </>
}/>;

const OwnerOf = (ownerOf) => <SlideToggle collapsed={false} render={ ({ toggle, setCollapsibleElement }) =>
    <>
        <li onClick={toggle} role={ !!ownerOf.length ? 'button': '' }>
            Is owner of {ownerOf.length} contracts
        </li>
        {
            !!ownerOf.length &&
            <Table bordered hover size='sm' ref={setCollapsibleElement}>
            <tbody>
            {
                ownerOf.map((address, i) =>
                    <tr key={i}>
                        <td>{ format.address(address) }</td>
                    </tr>
                )
            }</tbody>
            </Table>
        }
    </>
}/>;

const Members = (members) => <SlideToggle collapsed={false} render={ ({ toggle, setCollapsibleElement }) =>
    <>
        <li onClick={toggle} role={ !!Object.keys(members).length ? 'button': '' }>
        {
            Object.keys(members).length
            ? `AccessControl contract (${
                Object.keys(members).length
            } roles, ${
                Object.values(members).flat().filter((k, i, a) => a.indexOf(k) === i).length
            } members)`
            : `Not an AccessControl contract`
        }
        </li>
        {
            !!Object.keys(members).length &&
            <Table bordered hover size='sm' ref={setCollapsibleElement}>
            <tbody>
            {
                Object.entries(members).map(([ roleId, addresses ], i) => addresses.map((address, j) =>
                    <tr key={`${i}-${j}`}>
                        { !j && <td rowSpan={addresses.length}>{ format.role(roleId) }</td> }
                        <td>{ format.address(address) }</td>
                    </tr>
                ))
            }
            </tbody>
            </Table>
        }
    </>
}/>;

const MemberOf = (memberOf) => <SlideToggle collapsed={false} render={ ({ toggle, setCollapsibleElement }) =>
    <>
        <li onClick={toggle} role={ !!Object.keys(memberOf).length ? 'button': '' }>
            Has a role in {Object.keys(memberOf).length} contracts
        </li>
        {
            !!Object.keys(memberOf).length &&
            <Table bordered hover size='sm' ref={setCollapsibleElement}>
            <tbody>
            {
                Object.entries(memberOf).map(([ address, roleIds ], i) => roleIds.map((roleId, j) =>
                    <tr key={`${i}-${j}`}>
                        { !j && <td rowSpan={roleIds.length}>{ format.address(address) }</td> }
                        <td>{ format.role(roleId) }</td>
                    </tr>
                ))
            }
            </tbody>
            </Table>
        }
    </>
}/>;


Owner.error = (data) => <li>Not an Ownable contract</li>;
OwnerOf.error = (data) => OwnerOf([]);
Members.error = (data) => MemberOf({});
MemberOf.error = (data) => MemberOf({});


export default Address;