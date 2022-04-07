export interface Chain {
  id:        number;
  name?:     string;
  shortName: string;
  explorer:  string;
  subgraph:  string;
};

export const CHAINS: Chain[] = [
  {
    id:        1,
    name:      "mainnet",
    shortName: "eth",
    explorer:  "https://etherscan.io",
    subgraph:  "https://api.thegraph.com/subgraphs/name/amxx/access-control"
  },
  {
    id:        56,
    shortName: "bsc",
    explorer:  "https://bscscan.com",
    subgraph:  "https://api.thegraph.com/subgraphs/name/amxx/access-control-bsc"
  },
  {
    id:        137,
    name:      "polygon",
    shortName: "poly",
    explorer:  "https://polygonscan.com",
    subgraph:  "https://api.thegraph.com/subgraphs/name/amxx/access-control-matic"
  }
]

export default function getChain(name?: string): Chain {
  return CHAINS.find(chain => [ chain.id, chain.name, chain.shortName ].includes(name)) || CHAINS[0];
}