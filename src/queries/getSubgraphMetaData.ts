import type { NetworkType } from "../common/networks";
import { getDataFromGraph } from "../utils.ts/graphRequest";


const META_DATA_QUERY = `
  query MetaQuery {
  _meta {
    deployment
    hasIndexingErrors
    block {
      hash
      number
      parentHash
      timestamp
    }
  }
}
`;


export const getNetworkMetadata = async (network: NetworkType, graphApiKey: string): Promise<void> => {
  const res = await getDataFromGraph(META_DATA_QUERY, {}, network, graphApiKey);
  return res;
}
