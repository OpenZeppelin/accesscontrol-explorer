import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient   } from 'apollo-client';
import { InMemoryCache  } from 'apollo-cache-inmemory';
import { HttpLink       } from 'apollo-link-http';

import QueryParser from './utils/QueryParser';
import View        from './views';

const App = (props) =>
    <ul>
        <li><Link to='/view?address=0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29'>Example address</Link></li>
        <li><Link to='/view?role=0x8619cecd8b9e095ab43867f5b69d492180450fe862e6b50bfbfb24b75dd84c8a'>Example roleid</Link></li>
    </ul>;

const Core = (props) => {
    const uri      = props.endpoint;
    const cache    = new InMemoryCache();
    const link     = new HttpLink({ uri });
    const client   = new ApolloClient({ cache, link });

    return (
        <ApolloProvider client={client}>
        <Router>
            <Route exact path='/'     render={ (routing) => <QueryParser routing={routing}><App  {...props}/></QueryParser>}/>
            <Route exact path='/view' render={ (routing) => <QueryParser routing={routing}><View {...props}/></QueryParser>}/>
        </Router>
        </ApolloProvider>
    );
}

export default Core;
