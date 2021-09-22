import Fetch        from '../utils/FetchPaginated';
import * as graphql from '../../graphql';
import * as format  from '../utils/format'

const Role = (props) =>
    <Fetch
        variables = {{ id: props.params.id?.toLowerCase() }}
        query     = {graphql.role}
        merge     = {Role.merge}
        limit     = {Role.limit}
        render    = {Role.renderer}
        {...props}
    />

Role.merge = (prev, data) => ({
    role: {
        id:     prev?.role?.id ?? data?.role?.id,
        roleOf: [].concat(prev?.role?.roleOf, data?.role?.roleOf).filter(Boolean),
    },
})

Role.limit = (data) => data.role?.roleOf?.length

Role.renderer = (props) => {
    const id        = props.results.role?.id;
    const contracts = props.results.role?.roleOf.map(role => role.contract.id) ?? [];
    return (
        <ul>
            <li>
                { format.role(id) }
            </li>
            <li>
                usages: {contracts.length}
                <ul>
                    { contracts.map((contract, i) => <li key={i}>{ format.address(contract) }</li>) }
                </ul>
            </li>
        </ul>
    );
}

export default Role;