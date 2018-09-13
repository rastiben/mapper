import gql from 'graphql-tag';

export const UPDATE_CONDUCTEUR = gql`
mutation updateConducteur($_id: String!, $conducteur: ConducteurInput!){
    updateConducteur(_id: $_id,input: $conducteur){
        _id
        conducteur
    }
}
`;

export const ADD_CONDUCTEUR = gql`
mutation addConducteur($conducteur: ConducteurInput!){
  addConducteur(input: $conducteur){
      _id
      conducteur
  }
}
`;

export const REMOVE_CONDUCTEUR = gql`
mutation removeConducteur($_id: String!){
  removeConducteur(_id: $_id){
      _id
  }
}
`;

export const CONDUCTEURS = gql`
{
    conducteurs{
        _id
        conducteur
    }
}
`;