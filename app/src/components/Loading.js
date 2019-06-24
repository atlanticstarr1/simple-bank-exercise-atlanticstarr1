import React from "react";
import { Box, Flex, Text, Loader, Flash } from "rimble-ui";

const LoadStatus = ({ message }) => (
  <Box
    maxWidth={"640px"}
    mx={"auto"}
    bg={"#f6f6fc"}
    p={3}
    display={["none", "block"]}
  >
    <Flex alignItems={"center"}>
      <Box position={"relative"} width={"4em"}>
        <Box>
          <Loader size={"3em"} />
        </Box>
      </Box>
      <Box>
        <Text fontWeight={4}>{message}...</Text>
        <Text fontWeight={2}>Please wait</Text>
      </Box>
    </Flex>
  </Box>
);

const LoadError = () => {
  return (
    <Flash my={3} variant="danger">
      This browser has no connection to the Ethereum network. Please use the
      Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or
      Parity.
    </Flash>
  );
};

export { LoadStatus, LoadError };
