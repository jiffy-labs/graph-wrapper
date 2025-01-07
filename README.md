# getAddressActivity

A TypeScript utility for querying address activity from a blockchain graph API. This package provides a function to retrieve detailed account activity, including user operations and deposits, for a specified address.

## Features

-   Query address activity within specified block ranges.
-   Retrieve account details, user operations, and deposit information.
-   Format user operations to match Jiffyscan output.

## Installation

Install the package using npm:

```bash
npm install your-package-name
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Usage

Here's a basic example of how to use the `getAddressActivityFromGraph` function:

```typescript
import { JiffyscanGraphClient } from "your-package-name";

// Initialize the client with your Graph API key
const graphApiKey = "your-graph-api-key";
const client = new JiffyscanGraphClient(graphApiKey);

// Fetch network status
async function fetchNetworkStatus() {
    try {
        const response = await client.getNetworkStatus("base");
        console.log("Network Status:", response);
    } catch (error) {
        console.error("Error fetching network status:", error);
    }
}

// Fetch user operation details
async function fetchUserOpDetails() {
    try {
        const response = await client.getUserOp("sepolia", "0x7e4ba0a376476010d3e4ade7b5e5783a74174d3672c620c3148ddcc0f3a58e01");
        console.log("User Operation Details:", response);
    } catch (error) {
        console.error("Error fetching user operation details:", error);
    }
}

// Fetch address activity
async function fetchAddressActivity() {
    try {
        const response = await client.getAddressActivity("sepolia", "0x2bbac9aad155c87343070feedfd03a855c77e695", 1, 0, 0, 0);
        console.log("Address Activity:", response);
    } catch (error) {
        console.error("Error fetching address activity:", error);
    }
}

// Call the functions
fetchNetworkStatus();
fetchUserOpDetails();
fetchAddressActivity();
```

## API

### `getAddressActivityFromGraph`

This function retrieves address activity from the blockchain graph API.

#### Parameters

-   `network`: `NetworkType` - The network to query (e.g., 'mainnet').
-   `address`: `string` - The address to query.
-   `first`: `number` - The number of records to fetch.
-   `skip`: `number` - The number of records to skip.
-   `start_block`: `number` - The starting block number.
-   `end_block`: `number` - The ending block number.

#### Returns

-   `Promise<any>` - A promise that resolves to the address activity data.

### `getNetworkStatus`

This function fetches the current status of a specified network.

#### Parameters

-   `network`: `string` - The network to query (e.g., 'base').

#### Returns

-   `Promise<any>` - A promise that resolves to the network status data, including metadata about the current block.

### `getUserOp`

This function retrieves details of a specific user operation on the blockchain.

#### Parameters

-   `network`: `string` - The network to query (e.g., 'sepolia').
-   `userOpHash`: `string` - The hash of the user operation to query.

#### Returns

-   `Promise<any>` - A promise that resolves to the user operation details, including gas usage, transaction hash, and other relevant information.

## Contributing

Contributions are welcome! If you have any feature requests, suggestions, or find any bugs, please open an issue on the repository. You can also submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [Your Name](mailto:your.email@example.com).

```

```
