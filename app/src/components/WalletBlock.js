import React from "react";
import { Card, Icon, Flex, Box, Heading } from "rimble-ui";

import AccountOverview from "./AccountOverview";

const WalletBlock = props => {
  return (
    <Card maxWidth={"640px"} mx={"auto"} p={4}>
      <Flex>
        <Box mb={3} flex={1 / 4}>
          <Icon color="tomato" name="AccountBalanceWallet" size="80" />
        </Box>
        <Box my={3} flex={1}>
          <Heading.h4>Wallet</Heading.h4>
        </Box>
      </Flex>
      <AccountOverview
        account={props.account}
        accountBalanceLow={props.accountBalanceLow}
        accountBalance={props.accountBalance}
      />
    </Card>
  );
};

export default WalletBlock;
