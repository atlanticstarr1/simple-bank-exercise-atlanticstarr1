import React, { Component } from "react";
import { Card, Text, Button } from "rimble-ui";

import AccountOverview from "./AccountOverview";

const WalletBlock = props => {
  const handleConnectAccount = () => {};

  const renderContent = () => {
    if (props.account) {
      return (
        <AccountOverview
          account={props.account}
          accountBalanceLow={props.accountBalanceLow}
          accountBalance={props.accountBalance}
        />
      );
    } else {
      return (
        <Button onClick={() => handleConnectAccount()} width={1}>
          Connect your wallet
        </Button>
      );
    }
  };

  return (
    <Card maxWidth={"640px"} mx={"auto"} p={4}>
      <Text fontWeight={3} mb={3}>
        Wallet:
      </Text>
      {renderContent()}
    </Card>
  );
};

export default WalletBlock;
