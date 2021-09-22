import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient   } from 'apollo-client';
import { InMemoryCache  } from 'apollo-cache-inmemory';
import { HttpLink       } from 'apollo-link-http';

import * as graphql from '../graphql';
import Fetch        from './utils/Fetch';
import QueryParser  from './utils/QueryParser';
import * as views   from './views';

import 'bootstrap/dist/css/bootstrap.min.css'

const App = (props) =>
  <ul>
    <li><Link to='/address?id=0x41545f8b9472D758bB669ed8EaEEEcD7a9C4Ec29'>Example address</Link></li>
    <li><Link to='/role?id=0x8619cecd8b9e095ab43867f5b69d492180450fe862e6b50bfbfb24b75dd84c8a'>Example roleid</Link></li>
  </ul>;

const URI = 'https://api.thegraph.com/subgraphs/name/amxx/access-control';

const Core = (props) => {
  const uri    = URI;
  const cache  = new InMemoryCache();
  const link   = new HttpLink({ uri });
  const client = new ApolloClient({ cache, link });

  return (
    <>
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/'        render={ (routing) => <QueryParser routing={routing}><App                                                  {...props}/></QueryParser> }/>
        <Route exact path='/address' render={ (routing) => <QueryParser routing={routing}><Fetch query={graphql.address} render={views.address} {...props}/></QueryParser> }/>
        <Route exact path='/role'    render={ (routing) => <QueryParser routing={routing}><Fetch query={graphql.role   } render={views.role   } {...props}/></QueryParser> }/>
      </Router>
    </ApolloProvider>
    </>
  );
}

export default Core;
