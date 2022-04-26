export interface Chain {
  id:         number;
  name:       string; // human redeable name
  shortName?: string; // ERC3770 identifier
  descr:      string; // descriptor (ERC3770 if available, or "eip155:id" fallback)
  explorer:   string; // link to the block explorer
  subgraph:   string; // link to the subgraph
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
].map(chain => Object.assign(chain, { descr: chain.shortName ?? `eip155:${chain.id}` }));

export const DEFAULT_CHAIN = CHAINS[0];

export function getChain(name: string): Chain {
  return CHAINS.find(chain => [ chain.id.toString(), chain.name, chain.shortName ].includes(name)) || DEFAULT_CHAIN;
}