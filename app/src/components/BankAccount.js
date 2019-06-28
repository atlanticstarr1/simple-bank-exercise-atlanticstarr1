import React from "react";
import { Flex, Box, Text, Card, Heading, Blockie, Icon } from "rimble-ui";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import CloseAccount from "./CloseAccount";
import ShowBankBalance from "./ShowBankBalance";

const BankAccount = ({ account }) => {
  return (
    <Card px={4} mx={"auto"}>
      <Flex>
        <Box mb={4} flex={1 / 4}>
          <Icon color="tomato" name="AccountBalance" size="80" />
        </Box>
        <Box flex={1} my={3}>
          <Heading.h4>Bank Account</Heading.h4>
          <Text>Deposit and Withdraw Ether.</Text>
        </Box>
      </Flex>
      <Box mb={4}>
        <ShowBankBalance />
      </Box>
      <Flex>
        <Box mr={3}>
          <Deposit />
        </Box>
        <Box mr={3}>
          <Withdraw />
        </Box>
        <Box alignSelf={"flex-end"}>
          <CloseAccount />
        </Box>
      </Flex>
    </Card>
  );
};
export default BankAccount;
