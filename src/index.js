import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ethers } from 'ethers';

import 'bootstrap/dist/css/bootstrap.min.css'
import './css/accordion.css'

import Core from './components/Core';

// const CHAIN = 'mainnet';
const CHAIN = 'https://mainnet.infura.io/v3/c4ab9a26a54148e288b6e010a65a8f18';
const URI   = 'https://api.thegraph.com/subgraphs/name/amxx/access-control';

ReactDOM.render(
    <Core provider={ethers.getDefaultProvider(CHAIN)} endpoint={URI}/>,
    document.getElementById('root')
);
