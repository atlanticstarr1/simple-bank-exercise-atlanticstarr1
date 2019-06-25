import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import ConnectionBanner from "@rimble/connection-banner";
import NetworkIndicator from "@rimble/network-indicator";
import { Box, Card, ToastMessage } from "rimble-ui";
import WalletBlock from "./WalletBlock";
import BankBlock from "./BankBlock";

const MainContent = () => {
  const { drizzle } = drizzleReactHooks.useDrizzle();
  const drizzleState = drizzleReactHooks.useDrizzleState(
    drizzleState => drizzleState
  );
  console.log(drizzleState);

  const account = drizzleState.accounts[0];
  const accountBal = drizzleState.accountBalances[account];

  let accountBalEth =
    accountBal && drizzle.web3.utils.fromWei(accountBal, "ether");
  const requiredNetwork = 5777;

  return (
    <Box>
      <Box mx={"auto"} p={3}>
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
      <WalletBlock
        account={account}
        accountBalance={accountBalEth}
        accountBalanceLow={accountBalEth < 1}
      />
      <BankBlock account={account} />

      <ToastMessage.Provider ref={node => (window.toastProvider = node)} />
    </Box>
  );
};

export default MainContent;
