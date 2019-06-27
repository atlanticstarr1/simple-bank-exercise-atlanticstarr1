import React from "react";
import ConnectionBanner from "@rimble/connection-banner";
import NetworkIndicator from "@rimble/network-indicator";
import { Flex, Box, Card, ToastMessage } from "rimble-ui";
import WalletBlock from "./WalletBlock";
import BankBlock from "./BankBlock";
import BankStats from "./BankStats";
import { drizzleReactHooks } from "drizzle-react";
import { Web3Error, LoadStatus } from "./Loading";
import AdminView1 from "./AdminView1";

const MainContent = () => {
  const drizzleState = drizzleReactHooks.useDrizzleState(
    drizzleState => drizzleState
  );
  const { drizzleStatus, web3 } = drizzleState;
  console.log(drizzleState);
  const requiredNetwork = 5777;

  if (drizzleStatus.initialized) {
    return (
      <Flex flexDirection={"column"}>
        <Box flex={1}>
          <AdminView1 />
        </Box>
        <Box flex={1}>
          <BankStats />
          <WalletBlock />
          <BankBlock />
          <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
        </Box>
      </Flex>
    );
  }

  if (web3.status === "initialized")
    return (
      <>
        <Box mx={"auto"} p={1}>
          <ConnectionBanner
            currentNetwork={drizzleState.web3.networkId}
            requiredNetwork={requiredNetwork}
          />
        </Box>
        <Card mx={"auto"} p={4}>
          <NetworkIndicator
            currentNetwork={drizzleState.web3.networkId}
            requiredNetwork={requiredNetwork}
          />
        </Card>
        <LoadStatus message="Loading contracts and accounts" />
      </>
    );

  if (web3.status === "failed") return <Web3Error />;
  return <LoadStatus message="Loading web3" />;
};

export default MainContent;
