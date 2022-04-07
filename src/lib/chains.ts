export interface Chain {
  id:         number;
  name:       string;
  shortName?: string;
  explorer:   string;
  subgraph:   string;
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
    name:      "binance",
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

export const DEFAULT_CHAIN = CHAINS[0];

// get chain from a descriptor (name, short name or chain id)
export function getChain(name: string): Chain {
  return CHAINS.find(chain => [ chain.id, chain.name, chain.shortName ].includes(name)) || DEFAULT_CHAIN;
}

// if no short name is available for EIP-3770, revert to using CAIP-10
export function getChainDesc(chain: Chain): string {
  return chain.shortName ?? `eip155:${chain.id}`;
}