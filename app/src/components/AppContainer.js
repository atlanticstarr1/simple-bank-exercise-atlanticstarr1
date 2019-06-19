import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Box, Flex, Heading, Text, Card, Loader } from "rimble-ui";
import Header from "./Header";
import ConnectionBanner from "@rimble/connection-banner";
import NetworkIndicator from "@rimble/network-indicator";
import WalletBlock from "./WalletBlock";
import PrimaryCard from "./PrimaryCard";

const AppContainer = props => {
  const { drizzle } = drizzleReactHooks.useDrizzle();

  const drizzleState = drizzleReactHooks.useDrizzleState(
    drizzleState => drizzleState
  );
  console.log(drizzleState);

  const mainAccount = drizzleState.accounts[0];
  const accountBalWei = drizzleState.accountBalances[mainAccount]; //in wei

  console.log(drizzle);
  let accountBalEth =
    drizzle.web3.utils && drizzle.web3.utils.fromWei(accountBalWei, "ether");

  return (
    <Box>
      <Header />
      <Box maxWidth={"640px"} mx={"auto"} p={3}>
        <ConnectionBanner
          currentNetwork={drizzleState.web3.networkId}
          requiredNetwork={5777}
        />
      </Box>

      <Flex maxWidth={"640px"} mx={"auto"} p={3}>
        <Heading.h2 mr={3}>
          <span role="img" aria-label="Waving hand">
            👋
          </span>
        </Heading.h2>
        <Text>
          Hi there, see Rimble components in action with our demo Ethereum dApp.
          Change the value below to get started. Check out our repos – links are
          in the footer!
        </Text>
      </Flex>
      <Card maxWidth={"640px"} mx={"auto"} p={4}>
        <NetworkIndicator
          currentNetwork={drizzleState.web3.networkId}
          requiredNetwork={5777}
        />
      </Card>
      <WalletBlock
        account={mainAccount}
        accountBalance={accountBalEth}
        accountBalanceLow={accountBalEth < 1}
      />
      <PrimaryCard />
    </Box>
  );
};

export default AppContainer;
