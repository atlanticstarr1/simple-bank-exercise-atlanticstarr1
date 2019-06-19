import React from "react";
import { Flash } from "rimble-ui";

const DrizzleError = () => {
  return (
    <Flash my={3} variant="danger">
      This browser has no connection to the Ethereum network. Please use the
      Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or
      Parity.
    </Flash>
  );
};

export default DrizzleError;
