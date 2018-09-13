import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login.js';
import registerServiceWorker from './registerServiceWorker';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';


const link = createHttpLink({
    uri: '/graphql',
    credentials: 'include'
})

export const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
});

//console.log(client);

ReactDOM.render(<ApolloProvider client={client}><Login /></ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
