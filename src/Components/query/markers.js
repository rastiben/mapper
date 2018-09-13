import gql from 'graphql-tag';

export const MARKERS = gql`
{
  markers{
    _id
    lat
    lng
    signature
    confirmation
    client
    lieu
    montantttc
    montantht
    ouverture
    livraison
    dispo
    agence
    avancement
    commercial
    conducteur
    marque
  }
  agences{
    _id
    agence    
  }
  avancements{
    _id
    avancement    
  }
  commerciaux{
    _id
    commercial    
  }
  conducteurs{
    _id
    conducteur    
  }
  marques{
    _id
    marque 
    color   
  }
}
`;

export const UPDATE_MARKER = gql`
mutation updateMarker($_id: String!, $marker: MarkerInput!){
    updateMarker(_id: $_id,input: $marker){
        _id
        lat
        lng
        client
        signature
        confirmation
        agence
        commercial
        marque
        client
        lieu
        montantttc
        montantht
        conducteur
        avancement
        ouverture
        livraison
        dispo
    }
}
`;

export const ADD_MARKER = gql`
mutation addMarker($marker: MarkerInput!){
  addMarker(input: $marker){
      _id
      lat
      lng
      client
      signature
      confirmation
      agence
      commercial
      marque
      client
      lieu
      montantttc
      montantht
      conducteur
      avancement
      ouverture
      livraison
      dispo
  }
}
`;