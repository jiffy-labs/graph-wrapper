import { JiffyscanGraphClient } from '../src/index';
import { getUserOpDetails } from '../src/queries/getUserOp';

function compareObjects(obj1: any, obj2: any): { missingInObj1: string[], missingInObj2: string[], differentValues: Record<string, { obj1: any; obj2: any }> } {
    const missingInObj1: string[] = [];
    const missingInObj2: string[] = [];
    const differentValues: Record<string, { obj1: any; obj2: any }> = {};

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check for keys in obj2 that are missing in obj1
    for (const key of keys2) {
        if (!(key in obj1)) {
            missingInObj1.push(key);
        } else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
            differentValues[key] = { obj1: obj1[key], obj2: obj2[key] };
        }
    }

    // Check for keys in obj1 that are missing in obj2
    for (const key of keys1) {
        if (!(key in obj2)) {
            missingInObj2.push(key);
        }
    }
    // console.log({ missingInObj1, missingInObj2, differentValues })
    return { missingInObj1, missingInObj2, differentValues };
}

describe('ApiClient', () => {
    const graphApiKey = Bun.env.GRAPH_API_KEY || '';
    const client = new JiffyscanGraphClient(graphApiKey);


    it('should throw an error if API key is not provided', () => {
        expect(() => new JiffyscanGraphClient("")).toThrow("API key is required.");
    });

    it('should instantiate successfully with a valid API key', () => {
        expect(client.getGraphApiKey()).toBe(graphApiKey);
    });

    it('should return metadata of a chain', async () => {
        const response = await client.getNetworkStatus('base')

        expect(response).toHaveProperty('_meta');
        expect(response._meta).toHaveProperty('block');
        expect(response._meta.block).toHaveProperty('hash', expect.any(String));
        expect(response._meta.block).toHaveProperty('number', expect.any(Number));
        expect(response._meta.block).toHaveProperty('parentHash', expect.any(String));
        expect(response._meta.block).toHaveProperty('timestamp', expect.any(Number));
        expect(response._meta).toHaveProperty('deployment', expect.any(String));
        expect(response._meta).toHaveProperty('hasIndexingErrors', expect.any(Boolean));
    })

    it('Should return user op hash', async () => {
        const response = await client.getUserOp("sepolia", "0x7e4ba0a376476010d3e4ade7b5e5783a74174d3672c620c3148ddcc0f3a58e01");
        const expectedObject = {
            "userOps": [
                {
                    "accountGasLimits": "0x00000000000000000000000000007c5400000000000000000000000000006638",
                    "accountSender": {
                        "factory": "0x91e60e0613810449d098b0b5ec8b51a0fe8c8985"
                    },
                    "accountTarget": {
                        "factory": "0x91e60e0613810449d098b0b5ec8b51a0fe8c8985"
                    },
                    "actualGasCost": "1206154599613171",
                    "actualGasUsed": "111823",
                    "baseFeePerGas": "7786283677",
                    "beneficiary": "0x05736be876755de230e809784def1937dcb6303e",
                    "blockNumber": "7414883",
                    "blockTime": "1735933428",
                    "callData": "",
                    "target": "0x4c8058ebd8bf4bf0f43d94f83389cb770fc93a0b",
                    "callGasLimit": null,
                    "entryPoint": "0x0000000071727de22e5e9d8baf0edac6f37da032",
                    "erc20Transfers": [],
                    "erc721Transfers": [],
                    "factory": "0x",
                    "gasFees": "0x000000000000000000000000b2d05e000000000000000000000000040fba65b4",
                    "gasLimit": "189647",
                    "gasPrice": "7886283677",
                    "id": "0x7e4ba0a376476010d3e4ade7b5e5783a74174d3672c620c3148ddcc0f3a58e01-1",
                    "initCode": "0x",
                    "input": "0x765e827f000000000000000000000000000000000000000000000000000000000000004000000000000000000000000005736be876755de230e809784def1937dcb6303e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000002f9e0de0c8a7a9ed7af4a31225b6245b45d31c5a0000000000000000000000000000000000000000000000000000000000001c7d0000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000007c5400000000000000000000000000006638000000000000000000000000000000000000000000000000000000000000b934000000000000000000000000b2d05e000000000000000000000000040fba65b4000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000084b61d27f60000000000000000000000004c8058ebd8bf4bf0f43d94f83389cb770fc93a0b0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000812cc0c7981d846b9f2a16276556f6e8cb52bfb6330000000000000000000000000000718b0000000000000000000000000000000000000000000000006778403a22e49bbf688ae951e18f2b300cf97a1bee6b5cad30b98a11bd100972bcf20ba42b7c5ed26fb42668072ea31953bca184dc73a6a97dc95522dd9c8a32e690cb371c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041dec8874a467863555902fde25b71738da5e2142346f7dc111cd4b032732ef14a0cadc6b4abd9c56f9636c048f5ca4b507ffed778d1697659e7d8e911dd6e0bbc1c00000000000000000000000000000000000000000000000000000000000000",
                    "maxFeePerGas": null,
                    "maxPriorityFeePerGas": null,
                    "network": "sepolia",
                    "nonce": "7293",
                    "paymaster": "0x2cc0c7981d846b9f2a16276556f6e8cb52bfb633",
                    "paymasterAndData": "0x2cc0c7981d846b9f2a16276556f6e8cb52bfb6330000000000000000000000000000718b0000000000000000000000000000000000000000000000006778403a22e49bbf688ae951e18f2b300cf97a1bee6b5cad30b98a11bd100972bcf20ba42b7c5ed26fb42668072ea31953bca184dc73a6a97dc95522dd9c8a32e690cb371c",
                    "paymasterRevertReason": null,
                    "preVerificationGas": "47412",
                    "revertReason": null,
                    "sender": "0x2f9e0de0c8a7a9ed7af4a31225b6245b45d31c5a",
                    "signature": "0xdec8874a467863555902fde25b71738da5e2142346f7dc111cd4b032732ef14a0cadc6b4abd9c56f9636c048f5ca4b507ffed778d1697659e7d8e911dd6e0bbc1c",
                    "success": true,

                    "transactionHash": "0x6a6a2f9a9e13d84699fdcc2b1dc77f811656c11c739e6682807ec42977486695",
                    "userOpHash": "0x7e4ba0a376476010d3e4ade7b5e5783a74174d3672c620c3148ddcc0f3a58e01",
                    "verificationGasLimit": null,
                    "preDecodedCallData": "0xb61d27f60000000000000000000000004c8058ebd8bf4bf0f43d94f83389cb770fc93a0b000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",

                }
            ]
        }
        expect(response).toEqual(expectedObject);
    })

    it('should return address activity', async () => {
        const res = await client.getAddressActivity('sepolia', '0x2bbac9aad155c87343070feedfd03a855c77e695', 1, 0, 0, 0);

        // Expect the response to have the accountDetail property
        expect(res).toHaveProperty('accountDetail');

        // Expect accountDetail to have specific properties
        expect(res.accountDetail).toHaveProperty('id', '0x2bbac9aad155c87343070feedfd03a855c77e695');
        expect(res.accountDetail).toHaveProperty('address', '0x2bbac9aad155c87343070feedfd03a855c77e695');
        expect(res.accountDetail).toHaveProperty('blockNumber');
        expect(res.accountDetail).toHaveProperty('blockTime');
        expect(res.accountDetail).toHaveProperty('factory');
        expect(res.accountDetail).toHaveProperty('paymaster');
        expect(res.accountDetail).toHaveProperty('transactionHash');
        expect(res.accountDetail).toHaveProperty('userOpHash');
        expect(res.accountDetail).toHaveProperty('userOpsCount');
        expect(res.accountDetail).toHaveProperty('userOps');

        // Optionally, you can check the userOps array length
        expect(Array.isArray(res.accountDetail.userOps)).toBe(true);
        expect(res.accountDetail.userOps.length).toBeGreaterThan(0); // Assuming there should be at least one user operation
    });
});