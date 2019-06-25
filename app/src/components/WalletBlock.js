import React from "react";
import { Card, Icon, Flex, Box, Heading, Text } from "rimble-ui";

import AccountOverview from "./AccountOverview";

const WalletBlock = props => {
  return (
    <Card mx={"auto"} p={4}>
      <Flex>
        {/* <Box pb={4}>
          <Icon color="tomato" name="AccountBalanceWallet" size="80" />
        </Box> */}
        <Box flex={1 / 2}>
          <Heading.h4>Wallet</Heading.h4>
        </Box>
        <Box>
          <Icon color="#85bb65" name="MonetizationOn" size="60" />
        </Box>
        <Box alignSelf={"center"}>
          <Text
            fontSize={"2rem"}
            fontWeight={1}
            lineHeight={0.5}
            color={props.accountBalanceLow ? "red" : "mid-gray"}
          >
            {props.accountBalance} ETH
          </Text>
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
