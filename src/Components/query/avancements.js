import gql from 'graphql-tag';

export const UPDATE_AVANCEMENT = gql`
mutation updateAvancement($_id: String!, $avancement: AvancementInput!){
    updateAvancement(_id: $_id,input: $avancement){
        _id
        avancement
    }
}
`;

export const ADD_AVANCEMENT = gql`
mutation addAvancement($avancement: AvancementInput!){
  addAvancement(input: $avancement){
      _id
      avancement
  }
}
`;

export const REMOVE_AVANCEMENT = gql`
mutation removeAvancement($_id: String!){
  removeAvancement(_id: $_id){
      _id
  }
}
`;

export const AVANCEMENTS = gql`
{
    avancements{
        _id
        avancement
    }
}
`;