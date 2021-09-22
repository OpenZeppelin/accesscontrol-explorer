import gql from 'graphql-tag';

export default gql`
query role($id: String)
{
  role(id: $id) {
    id
    roleOf(first: 1000) {
      contract {
        id
      }
      members(first: 1000) {
        account {
          id
        }
      }
    }
  }
}
`
