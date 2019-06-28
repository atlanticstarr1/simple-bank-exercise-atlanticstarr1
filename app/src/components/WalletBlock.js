import React from "react";
import { Card, Icon, Flex, Box, Heading, Text } from "rimble-ui";
import useBankContract from "../utils/useBankContract";

import AccountOverview from "./AccountOverview";
import ShowBankBalance from "./ShowBankBalance";

const WalletBlock = () => {
  const { account, accountBalEth } = useBankContract();
  const accountBalanceLow = accountBalEth < 1;
  return (
    <Card mx={"auto"} p={4}>
      <Flex>
        <Box flex={1 / 2}>
          <Heading.h4>Your Wallet</Heading.h4>
        </Box>
        {/* <Box>
          <Icon color="#85bb65" name="AttachMoney" size="60" />
        </Box> */}
        <Box alignSelf={"center"} my={3}>
          <ShowBankBalance balanceEth={accountBalEth} />
        </Box>
      </Flex>
      <AccountOverview account={account} />
    </Card>
  );
};

export default WalletBlock;
