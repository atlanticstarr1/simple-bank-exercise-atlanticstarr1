import React from "react";
import { Box, Flex, Text, Loader } from "rimble-ui";
import ConnectionBanner from "@rimble/connection-banner";

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

const Loading = props => {
  if (props.drizzleStatus.initialized)
    // Load the dapp.
    return props.children;

  if (props.web3.status === "initialized")
    return <LoadStatus message="Loading contracts and accounts" />;

  if (props.web3.status === "failed")
    return (
      <Box maxWidth={"640px"} mx={"auto"} p={3}>
        <ConnectionBanner />
      </Box>
    );
};

export default Loading;
