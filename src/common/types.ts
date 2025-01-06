export type JiffyscanUserOp = {
    id: string;
    transactionHash: string;
    chainId: number;
    userOpHash: string;
    sender: string;
    accountSender: {
        factory: string;
    };
    paymaster: string;
    nonce: string;
    actualGasCost: number;
    actualGasPrice: number;
    actualGasUsed: number;
    success: boolean;
    status: string;
    revertReason: string | null;
    blockTime: number;
    timeSeenInAltMempool: string | null;
    timeSeenInMainMempool: string | null;
    factory: string | null;
    input: string;
    target: string;
    accountTarget: {
        factory: string;
    };
    callData: string;
    preDecodedCallData: string;
    beneficiary: string;
    blockNumber: number;
    verificationGasLimit: string;
    preVerificationGas: string;
    maxFeePerGas: number;
    maxPriorityFeePerGas: number;
    paymasterAndData: string;
    signature: string;
    entryPoint: string;
    block: number;
    network: string;
    value: string;
}

// Define the type for Account Detail
export type AccountDetail = {
    id?: string;
    address?: string;
    blockNumber?: string;
    blockTime?: string;
    factory?: string;
    paymaster?: string;
    transactionHash?: string;
    userOpHash?: string;
    userOpsCount?: string;
    userOps: JiffyscanUserOp[];
};

// Define the main type that includes both AccountDetail and UserOps
export type AddressActivity = {
    accountDetail: AccountDetail;
};