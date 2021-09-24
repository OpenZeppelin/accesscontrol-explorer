import gql from 'graphql-tag';

const accountrole = gql`
query accessControlRole($id: String, $limit: Int, $offset: Int)
{
  accessControlRole(id: $id) {
    id
    contract {
      id
    }
    role {
      id
    }
    admin {
      contract { id }
      role { id }
    }
    adminOf(first: $limit, skip: $offset) {
      contract { id }
      role { id }
    }
    members(first: $limit, skip: $offset) {
      account { id }
    }
  }
}
`;

accountrole.paginated = true;

accountrole.merge = (prev, data) => data
// accountrole.merge = (prev, data) => ({
//   accessControlRole: {
//     id:       prev?.accessControlRole?.id       ?? data.accessControlRole?.id,
//     contract: prev?.accessControlRole?.contract ?? data.accessControlRole?.contract,
//     role:     prev?.accessControlRole?.role     ?? data.accessControlRole?.role,
//     admin:    prev?.accessControlRole?.admin    ?? data.accessControlRole?.admin,
//     adminOf:  [].concat(prev?.accessControlRole?.adminOf, data.accessControlRole?.adminOf).filter(Boolean),
//     members:  [].concat(prev?.accessControlRole?.members, data.accessControlRole?.members).filter(Boolean),
//   },
// });

accountrole.size = (data) => Math.max(
  data?.accessControlRole?.members?.length,
  data?.accessControlRole?.adminOf?.length,
);

export default accountrole;
