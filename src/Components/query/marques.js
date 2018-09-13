import gql from 'graphql-tag';

export const UPDATE_MARQUE = gql`
mutation updateMarque($_id: String!, $marque: MarqueInput!){
    updateMarque(_id: $_id,input: $marque){
        _id
        marque
        color
    }
}
`;

export const ADD_MARQUE = gql`
mutation addMarque($marque: MarqueInput!){
  addMarque(input: $marque){
      _id
      marque
      color
  }
}
`;

export const REMOVE_MARQUE = gql`
mutation removeMarque($_id: String!){
  removeMarque(_id: $_id){
      _id
  }
}
`;

export const MARQUES = gql`
{
    marques{
        _id
        marque
        color
    }
}
`;