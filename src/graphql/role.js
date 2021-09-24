import gql from 'graphql-tag';

const query = gql`
query role($role: String, $limit: Int, $offset: Int)
{
  role(id: $role) {
    id
    roleOf(first: $limit, skip: $offset) {
      contract {
        id
      }
    }
  }
}
`

query.paginated = true;

query.merge = (prev, data) => ({
  role: {
    id:     prev?.role?.id ?? data?.role?.id,
    roleOf: [].concat(prev?.role?.roleOf, data?.role?.roleOf).filter(Boolean),
  },
});

query.size = (data) => data.role?.roleOf?.length;

export default query;
