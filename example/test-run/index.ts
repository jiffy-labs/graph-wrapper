import { JiffyscanGraphClient } from "jiffyscan-graph-wrapper";

// Initialize the client with your Graph API key
const graphApiKey = process.env.GRAPH_API_KEY as string;
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
console.log(fetchNetworkStatus());
fetchUserOpDetails();
fetchAddressActivity();