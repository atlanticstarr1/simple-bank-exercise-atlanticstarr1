import React, { useEffect } from "react";
import { Heading, Box, Text, Flex, PublicAddress, Card, Pill } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import ethToUsd from "../utils/ethToUsd";

const BankStats = () => {
  const {
    minBalanceEth,
    minBalanceUsd,
    interestRate,
    contractBalanceEth,
    contractAddress,
    oneUsdInEther
  } = useBankContract();

  return (
    <Card width={"450px"} mx={"auto"} px={4}>
      <Heading.h4 mb={3}>Why bank with us?</Heading.h4>
      <Flex>
        <Box flex={1 / 3}>
          <Text>Get paid daily</Text>
          <Pill mb={3} color="primary">
            {interestRate}% INTEREST
          </Pill>
        </Box>
        <Box flex={2 / 3}>
          <Text>Minimum deposit</Text>
          <Pill mb={2} mr={1} color="primary">
            ${minBalanceUsd} USD
          </Pill>
          <Pill mb={3} color="primary">
            {minBalanceEth} ETH
          </Pill>
        </Box>
      </Flex>
      <Flex />
      <Text>Trusted with</Text>
      <Pill color="green" mb={3}>
        {contractBalanceEth} ETH (~{ethToUsd(oneUsdInEther, contractBalanceEth)}{" "}
        USD)
      </Pill>
      <PublicAddress address="0x99cb784f0429efd72wu39fn4256n8wud4e01c7d2" />
    </Card>
  );
};
export default BankStats;
