import React from "react";
import { Card, Icon, Flex, Box, Heading, Text } from "rimble-ui";
import useBankContract from "../utils/useBankContract";

import AccountOverview from "./AccountOverview";

const WalletBlock = () => {
  const { account, accountBalEth } = useBankContract();
  const accountBalanceLow = accountBalEth < 1;
  return (
    <Card mx={"auto"} p={4}>
      <Flex>
        <Box flex={1 / 2}>
          <Heading.h4>Your Wallet</Heading.h4>
        </Box>
        <Box>
          <Icon color="#85bb65" name="MonetizationOn" size="60" />
        </Box>
        <Box alignSelf={"center"}>
          <Text
            fontSize={"2rem"}
            fontWeight={1}
            lineHeight={0.5}
            color={accountBalanceLow ? "red" : "mid-gray"}
          >
            {accountBalEth} ETH
          </Text>
        </Box>
      </Flex>
      <AccountOverview
        account={account}
        accountBalanceLow={accountBalanceLow}
        accountBalance={accountBalEth}
      />
    </Card>
  );
};

export default WalletBlock;
