import gql from 'graphql-tag';

const query = gql`
query account($address: String, $limit: Int, $offset: Int)
{
  account(id: $address) {
    id
    asOwnable {
      owner { id }
    }
    asAccessControl {
      roles(first: $limit, skip: $offset) {
        id
        role {
          id
        }
      }
    }
    ownerOf(first: $limit, skip: $offset) {
      id
    }
    membership(first: $limit, skip: $offset) {
      accesscontrolrole {
        contract {
          id
        }
        role {
          id
        }
      }
    }
  }
}
`;

query.paginated = true;

query.merge = (prev, data) => ({
  account: {
      id:         prev?.account?.id        ?? data.account?.id,
      asOwnable:  prev?.account?.asOwnable ?? data.account?.asOwnable,
      ownerOf:    [].concat(prev?.account?.ownerOf,    data.account?.ownerOf   ).filter(Boolean),
      membership: [].concat(prev?.account?.membership, data.account?.membership).filter(Boolean),
      asAccessControl: {
          roles: [].concat(prev?.account?.asAccessControl?.roles, data.account?.asAccessControl?.roles).filter(Boolean),
      },
  },
});

query.size = (data) => Math.max(
  data?.account?.ownerOf?.length,
  data?.account?.membership?.length,
  data?.account?.asAccessControl?.roles?.length,
);

export default query;
