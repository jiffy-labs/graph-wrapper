import type { NetworkType } from "../common/networks";
import type { AddressActivity } from "../common/types";
import { formatUserOpsToMatchJiffyscanOutput } from "../utils.ts/decoder";
import { getDataFromGraph } from "../utils.ts/graphRequest";


const ADDRESS_ACTIVITY_QUERY = (start_block: number, end_block: number): string => {
  if ((start_block == 0 && end_block == 0) || start_block > end_block) {
    return `
    query AddressActivityQuery($address: Bytes, $first: Int, $skip: Int) {
      accounts(where: {address: $address}) {
        id
        address
        blockNumber
        blockTime
        factory
        paymaster
        transactionHash
        userOpHash
        userOpsCount
      }
      deposits(where: {account: $address}) {
        totalDeposit
      }
      userOps(first: $first, skip: $skip, orderBy: blockTime, orderDirection: desc, where: { or: [{ sender: $address }, { target: $address }] }) {
        id
        sender
        target
        actualGasCost
        transactionHash
        actualGasUsed
        success
        revertReason
        blockTime
        blockNumber
        paymaster
        network
        userOpHash
        input 
        nonce
        beneficiary
        entryPoint
      }
  }`;
  } else if (end_block != 0) {
    return `
    query AddressActivityQuery($address: Bytes, $first: Int, $skip: Int, $start_block: Int, $end_block: Int) {
      accounts(where: {address: $address}) {
        id
        address
        blockNumber
        blockTime
        factory
        paymaster
        transactionHash
        userOpHash
        userOpsCount
      }
      deposits(where: {account: $address}) {
        totalDeposit
      }
      userOps(first: $first, skip: $skip, orderBy: blockTime, orderDirection: desc, where: {
    and: 
      [
          {or: [{sender: $address}, {target: $address}]},
          {blockNumber_gte: $start_block}, 
          {blockNumber_lte: $end_block},
      ]
    }) {
        id
        sender
        target
        actualGasCost
        transactionHash
        actualGasUsed
        success
        revertReason
        blockTime
        paymaster
        network
        userOpHash
        input 
        nonce
        beneficiary
        entryPoint
        blockNumber
      }
    }`;
  } else if (start_block != 0 && end_block == 0) {
    return `
    query AddressActivityQuery($address: Bytes, $first: Int, $skip: Int, $start_block: Int, $end_block: Int) {
      accounts(where: {address: $address}) {
        id
        address
        blockNumber
        blockTime
        factory
        paymaster
        transactionHash
        userOpHash
        userOpsCount
      }
      deposits(where: {account: $address}) {
        totalDeposit
      }
      userOps(first: $first, skip: $skip, orderBy: blockTime, orderDirection: desc, where: {
        and: 
          [
              {or: [{sender: $address}, {target: $address}]},
              {blockNumber_gte: $start_block},
          ]
        }) {
        id
        sender
        target
        actualGasCost
        transactionHash
        actualGasUsed
        success
        revertReason
        blockTime
        paymaster
        network
        userOpHash
        input 
        nonce
        beneficiary
        entryPoint
        blockNumber
      }
  }`;
  } else {
    return `
    query AddressActivityQuery($address: Bytes, $first: Int, $skip: Int) {
      accounts(where: {address: $address}) {
        id
        address
        blockNumber
        blockTime
        factory
        paymaster
        transactionHash
        userOpHash
        userOpsCount
      }
      deposits(where: {account: $address}) {
        totalDeposit
      }
      userOps(first: $first, skip: $skip, orderBy: blockTime, orderDirection: desc, where: { or: [{ sender: $address }, { target: $address }] }) {
        id
        sender
        target
        actualGasCost
        transactionHash
        actualGasUsed
        success
        revertReason
        blockTime
        blockNumber
        paymaster
        network
        userOpHash
        input 
        nonce
        beneficiary
        entryPoint
      }
  }`
  }
};

export const getAddressActivityFromGraph = async (network: NetworkType, address: `0x${string}`, first: number, skip: number, start_block: number, end_block: number, graphApiKey: string): Promise<any> => {
  const variables = {
    address,
    first,
    skip,
    start_block,
    end_block
  }
  const res = await getDataFromGraph(ADDRESS_ACTIVITY_QUERY(start_block, end_block), variables, network, graphApiKey);

  let addressActivity: AddressActivity = {
    accountDetail: { userOps: [] },
  };
  // console.log(res.userOps.length)
  if (res.accounts.length > 0) {
    addressActivity['accountDetail'] = res.accounts[0];
  }
  addressActivity['accountDetail']['userOps'] = res.userOps;

  addressActivity.accountDetail.userOps = formatUserOpsToMatchJiffyscanOutput(addressActivity.accountDetail.userOps);
  return addressActivity;
}

