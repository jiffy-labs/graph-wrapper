import { NetworkType } from "../common/networks";
import { formatUserOpsToMatchJiffyscanOutput } from "../utils.ts/decoder";
import { getDataFromGraph } from "../utils.ts/graphRequest";


const USER_OP_QUERY = `
query GetUserOpHashDetails($userOpHash: Bytes) {
  userOps(first: $first, skip: $skip, orderBy: blockTime, orderDirection: desc, where: {userOpHash: $userOpHash}) {
    verificationGasLimit
    userOpHash
    transactionHash
    target
    accountTarget {
      factory
    }
    success
    signature
    sender
    accountSender {
      factory
    }
    revertReason
    preVerificationGas
    paymasterAndData
    paymaster
    nonce
    network
    initCode
    maxPriorityFeePerGas
    maxFeePerGas
    input
    gasPrice
    id
    gasLimit
    factory
    callGasLimit
    callData
    blockTime
    blockNumber
    accountGasLimits
    gasFees
    paymasterRevertReason
    beneficiary
    baseFeePerGas
    actualGasUsed
    actualGasCost
    entryPoint
    erc20Transfers {
      contractAddress
      decimals
      from
      id
      name
      symbol
      to
      value
    }
    erc721Transfers(first: 10) {
      contractAddress
      from
      id
      name
      symbol
      to
      tokenId
    }
  }
}`

export const getUserOpDetails = async (network: NetworkType, userOpHash: `0x${string}`, graphApiKey: string): Promise<any> => {
  const variables = {
    userOpHash: userOpHash
  }
  const res = await getDataFromGraph(USER_OP_QUERY, variables, network, graphApiKey);
  let userOps
  if ('userOps' in res) {
    userOps = res.userOps;
  }
  userOps = formatUserOpsToMatchJiffyscanOutput(userOps);
  return { userOps };
}