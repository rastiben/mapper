import gql from 'graphql-tag';

export const CURRENT_USER = gql`
{
    currentUser{
        _id
        username
        admin
        agence
        conducteur
    }
}
`;

export const USERS = gql`
{
    users{
        _id
        username
        admin
        agence
        conducteur
        created
        updated
    }
}
`;


export const LOGIN = gql`
mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
        _id
        username
        admin
        agence
        conducteur
    }
  }
`;

export const LOGOUT = gql`
mutation{
    logout
}
`;

export const REMOVE_USER = gql`
mutation removeUser($_id: String!){
    removeUser(_id: $_id){
        _id
    }
}
`;

export const ADD_USER = gql`
mutation addUser($user: UserInput!){
    addUser(input: $user){
        _id
        username
        admin
        agence
        conducteur
        created
        updated
    }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($_id: String!, $user: UserInput!){
    updateUser(_id: $_id, input: $user){
        _id
        username
        admin
        agence
        conducteur
        created
        updated
    }
}
`;