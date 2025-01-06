import { getGraphUrl, NetworkType } from "../common/networks";

let HEADERS = {
    "Content-Type": "application/json",
};

export const getDataFromGraph = async (
    query: string,
    variables: any,
    network: NetworkType,
    apiKey: string
): Promise<any | null> => {
    const data = {
        query: query,
        variables: variables,
    };

    let resData;
    try {
        const url = getGraphUrl(network, apiKey);
        if (!url) {
            throw new Error('Network not supported');
        }
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                ...HEADERS,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        resData = await res.json();

        if (resData?.data) {
            resData = resData.data;
        } else {
            console.warn('No data found in response:', resData);
        }
    } catch (error) {
        console.error('Error fetching subgraph metadata:', error);
    }

    return resData;
};