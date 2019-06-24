import React from "react";
import { Flex, Box, Text, Card, Heading, Blockie, Icon } from "rimble-ui";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import CloseAccount from "./CloseAccount";
import ShowBankBalance from "./ShowBankBalance";

const BankAccount = ({ account }) => {
  return (
    <Card maxWidth={"640px"} px={4} mx={"auto"}>
      <Flex>
        <Box mb={5} flex={1 / 4}>
          <Icon color="tomato" name="AccountBalance" size="80" />
        </Box>
        <Box flex={1} my={3}>
          <Heading.h4>Bank Account</Heading.h4>
          <Text>Deposit and Withdraw Ether.</Text>
        </Box>
        {/* <Box>
          <Blockie opts={{ seed: account }} />
        </Box> */}
      </Flex>
      <Box mb={5}>
        <ShowBankBalance />
      </Box>
      <Flex>
        <Box flex={1} mr={3}>
          <Deposit />
        </Box>
        <Box flex={1} mr={3}>
          <Withdraw />
        </Box>
      </Flex>
      <Box py={3}>
        <CloseAccount />
      </Box>
    </Card>
  );
};
export default BankAccount;
