import gql from 'graphql-tag';

export default gql`
query address($id: String)
{
  account(id: $id) {
    id
    asAccessControl {
      roles(first: 1000) {
        role {
          id
        }
        members(first: 1000) {
          account {
            id
          }
        }
      }
    }
    asOwnable {
      owner { id }
    }
    membership(first: 1000) {
      accesscontrolrole {
        contract {
          id
        }
        role {
          id
        }
      }
    }
    ownerOf(first: 1000) {
      id
    }
  }
}
`
