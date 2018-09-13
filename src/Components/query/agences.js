import gql from 'graphql-tag';

export const UPDATE_AGENCE = gql`
mutation updateAgence($_id: String!, $agence: AgenceInput!){
    updateAgence(_id: $_id,input: $agence){
        _id
        agence
    }
}
`;

export const ADD_AGENCE = gql`
mutation addAgence($agence: AgenceInput!){
  addAgence(input: $agence){
      _id
      agence
  }
}
`;

export const REMOVE_AGENCE = gql`
mutation removeAgence($_id: String!){
  removeAgence(_id: $_id){
      _id
  }
}
`;

export const AGENCES = gql`
{
    agences{
        _id
        agence
    }
}
`;