import Fetch        from '../utils/FetchPaginated';
import * as graphql from '../../graphql';
import * as format  from '../utils/format'

Array.prototype.unique = function(op = x => x) {
    return this.filter((obj, i) => this.findIndex(entry => op(obj) === op(entry)) === i);
}

Array.prototype.groupBy = function(key) {
    return this.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

const Address = (props) =>
    <Fetch
        variables = {{ id: props.params.id?.toLowerCase() }}
        query     = {graphql.address}
        merge     = {Address.merge}
        limit     = {Address.limit}
        render    = {Address.renderer}
        {...props}
    />

Address.merge = (prev, data) => ({
    account: {
        id:         prev?.account?.id        ?? data.account?.id,
        asOwnable:  prev?.account?.asOwnable ?? data.account?.asOwnable,
        ownerOf:    [].concat(prev?.account?.ownerOf,    data.account?.ownerOf   ).filter(Boolean),
        membership: [].concat(prev?.account?.membership, data.account?.membership).filter(Boolean),
        asAccessControl: {
            roles: [].concat(prev?.account?.asAccessControl?.roles, data.account?.asAccessControl?.roles).filter(Boolean),
        },
    },
})

Address.limit = (data) => Math.max(
    data?.account?.ownerOf?.length,
    data?.account?.membership?.length,
    data?.account?.asAccessControl?.roles?.length,
)

Address.renderer = (props) => {
    const id       = props.results?.account?.id;
    const owner    = props.results?.account?.asOwnable?.owner.id;
    const roles    = props.results?.account?.asAccessControl?.roles.map(role => role.role.id) ?? [];
    const ownerOf  = props.results?.account?.ownerOf.map(ownable => ownable.id) ?? [];
    const memberOf = props.results?.account?.membership.map(membership => ({ contract: membership.accesscontrolrole.contract.id, roleId: membership.accesscontrolrole.role.id })) ?? [];
    return (
        <ul>
            <li>
                { format.address(id) }
            </li>
            {
                owner &&
                <li>
                    Contract is Ownable with owner: { format.address(owner) }
                </li>
            }
            {
                !!roles.length &&
                <li>
                    Contract is AccessControl with { roles.length } roles:
                    <ul>
                        { roles.map((roleId, i) => <li key={i}>{ format.role(roleId) }</li>)}
                    </ul>
                </li>
            }
            {
                !!ownerOf.length &&
                <li>
                    owns {ownerOf.length} contracts:
                    <ul>
                        { ownerOf.map((address, i) => <li key={i}>{ format.address(address) }</li>)}
                    </ul>
                </li>
            }
            {
                !!memberOf.length &&
                <li>
                    member of {memberOf.unique(({ contract }) => contract).length} contracts:
                    <ul>
                        {
                            Object.entries(memberOf.groupBy('contract')).map(([ contract, roles ], i) =>
                                <li key={i}>
                                    { format.address(contract) }
                                    <ul>{ roles.map(({ roleId }, j) => <li key={j}>{ format.role(roleId) }</li>) }</ul>
                                </li>
                            )
                        }
                    </ul>
                </li>
            }
        </ul>
    );
}

export default Address;