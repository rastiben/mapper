import gql from 'graphql-tag';

export const CURRENT_USER = gql`
{
    currentUser{
        email
    }
}
`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        email
    }
  }
`;

export const LOGOUT = gql`
mutation{
    logout
}
`;