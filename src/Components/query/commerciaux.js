import gql from 'graphql-tag';

export const UPDATE_COMMERCIAL = gql`
mutation updateCommercial($_id: String!, $commercial: CommercialInput!){
    updateCommercial(_id: $_id,input: $commercial){
        _id
        commercial
    }
}
`;

export const ADD_COMMERCIAL = gql`
mutation addCommercial($commercial: CommercialInput!){
  addCommercial(input: $commercial){
      _id
      commercial
  }
}
`;

export const REMOVE_COMMERCIAL = gql`
mutation removeCommercial($_id: String!){
  removeCommercial(_id: $_id){
      _id
  }
}
`;

export const COMMERCIAUX = gql`
{
    commerciaux{
        _id
        commercial
    }
}
`;