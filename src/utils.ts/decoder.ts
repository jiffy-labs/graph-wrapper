import { JiffyscanUserOp } from "../common/types";

export const formatUserOpsToMatchJiffyscanOutput = (userOps: JiffyscanUserOp[]) => {
    if (userOps.length == 0) {
        return userOps;
    }
    for (let userOp of userOps) {
        userOp.preDecodedCallData = userOp.callData;
        userOp.callData = "";
    }
    return userOps;
}