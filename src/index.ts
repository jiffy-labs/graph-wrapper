import type { NetworkType } from "./common/networks";
import { getAddressActivityFromGraph } from "./queries/getAddressActivity";
import { getNetworkMetadata } from "./queries/getSubgraphMetaData";
import { getUserOpDetails } from "./queries/getUserOp";

export class JiffyscanGraphClient {
    private graphApiKey: string;

    constructor(graphApiKey: string) {
        if (!graphApiKey) {
            throw new Error("API key is required.");
        }
        this.graphApiKey = graphApiKey;
    }

    // Example method to demonstrate usage
    public getGraphApiKey(): string {
        return this.graphApiKey;
    }

    public async getNetworkStatus(network: NetworkType): Promise<any> {
        return getNetworkMetadata(network, this.graphApiKey)
    }

    public async getUserOp(network: NetworkType, userOpHash: `0x${string}`): Promise<any> {
        return getUserOpDetails(network, userOpHash, this.graphApiKey)
    }

    public async getAddressActivity(network: NetworkType, address: `0x${string}`, first: number, skip: number, start_block: number, end_block: number) {
        return getAddressActivityFromGraph(network, address, first, skip, start_block, end_block, this.graphApiKey);
    }

}