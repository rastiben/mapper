import gql from 'graphql-tag';

export const UPLOAD_LOGO = gql`
mutation uploadLogo($file: Upload!){
    uploadLogo(file: $file)
}
`;