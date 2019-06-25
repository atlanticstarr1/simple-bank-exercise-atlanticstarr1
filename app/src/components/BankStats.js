import React, { useEffect } from "react";
import { Heading, Box, Text, Button, Card, Pill } from "rimble-ui";
import useBankContract from "../utils/useBankContract";

const BankStats = () => {
  const {
    minBalanceEth,
    minBalanceUsd,
    interestRate,
    contractBalanceEth,
    contractAddress
  } = useBankContract();

  return (
    <Card width={"450px"} mx={"auto"} px={4}>
      <Heading.h4>Bank Features</Heading.h4>
      <Heading.h5>Our address: {contractAddress}</Heading.h5>
      <Box>
        <Text mb={3}>Why bank with us?</Text>
        <Pill mb={3} color="green">
          {interestRate}% INTEREST
        </Pill>
        <Pill mb={3} color="green">
          {minBalanceUsd} MIN DEPOSIT (~{minBalanceEth}) ETH
        </Pill>
      </Box>
      <Text>We are well funded.</Text>
      <Pill>{contractBalanceEth} ETH</Pill> Under Mangement
    </Card>
  );
};
export default BankStats;
