import { CHAINID_NETWORK_MAP, NETWORK_GRAPH_MAP } from "./constants";

export type NetworkType = keyof typeof NETWORK_GRAPH_MAP;

export const getGraphUrl = (network: NetworkType, graphApiKey: string): string | null => {
    const url = NETWORK_GRAPH_MAP[network];
    if (url) {
        return url.replace('{API_KEY}', graphApiKey); // Replace API key if it exists
    }
    return null;
}

export const getNetworksSupported = () => {
    const networkKeys = Object.keys(NETWORK_GRAPH_MAP); // Extracting keys from NETWORK_GRAPH_MAP
    return networkKeys;
}

export const getChainIdFromNetwork = (network: string): number | undefined => {
    const entry = Object.entries(CHAINID_NETWORK_MAP).find(
        ([, value]) => value === network
    );
    return entry ? Number(entry[0]) : undefined;
};