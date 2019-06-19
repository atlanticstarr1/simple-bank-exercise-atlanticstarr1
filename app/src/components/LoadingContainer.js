import React from "react";
import { drizzleReactHooks } from "drizzle-react";
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
        <Text fontWeight={4}>{message}</Text>
        <Text fontWeight={2}>Please wait</Text>
      </Box>
    </Flex>
  </Box>
);

const LoadingContainer = ({ children }) => {
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    drizzleStatusInitialized: drizzleState.drizzleStatus.initialized,
    web3Status: drizzleState.web3.status,
    allAccounts: drizzleState.accounts
  }));

  if (drizzleState.web3Status === "failed")
    return (
      <Box maxWidth={"640px"} mx={"auto"} p={3}>
        <ConnectionBanner />
      </Box>
    );

  if (
    drizzleState.web3Status === "initialized" &&
    Object.keys(drizzleState.allAccounts).length === 0
  )
    return (
      <main className="container loading-screen">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>🦊</h1>
            <p>
              <strong>{"We can't find any Ethereum accounts!"}</strong> Please
              check and make sure Metamask or your browser are pointed at the
              correct network and your account is unlocked.
            </p>
          </div>
        </div>
      </main>
    );

  // load the dapp
  if (drizzleState.drizzleStatusInitialized) return children;

  return <LoadStatus message="Loading dapp" />;
};

export default LoadingContainer;
