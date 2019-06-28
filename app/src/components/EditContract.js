import React from "react";
import { Box, Text, Card, Heading, Flex, Button } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import EditInterestRate from "./EditInterestRate";
import EditMinimumBalance from "./EditMinimumBalance";
import InterestPayment from "./InterestPayment";

const EditContract = () => {
  const { interestRate, minBalanceUsd } = useBankContract();

  return (
    <Card mx={"auto"}>
      <Heading.h4>Interest Rate & Minimum Balance</Heading.h4>
      <Box>
        <Text mb={4}>Change bank's interest rate and minimum balance.</Text>
      </Box>
      <Flex>
        <Box flex="1" mr={3}>
          {interestRate && <EditInterestRate rate={interestRate} />}
        </Box>
        <Box flex="1">
          {minBalanceUsd && <EditMinimumBalance balance={minBalanceUsd} />}
        </Box>
      </Flex>
    </Card>
  );
};

export default EditContract;
