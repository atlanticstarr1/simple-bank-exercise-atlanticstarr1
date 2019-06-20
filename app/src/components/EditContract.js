import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Box, Text, Card, Heading } from "rimble-ui";
import EditInterestRate from "./EditInterestRate";
import EditMinimumBalance from "./EditMinimumBalance";

const EditContract = () => {
  const { useCacheCall } = drizzleReactHooks.useDrizzle();

  const interestRate = useCacheCall("SimpleBank", "interestRate");
  const minBalanceEth = useCacheCall("SimpleBank", "minBalanceEth");
  const minBalanceUsd = useCacheCall("SimpleBank", "minBalanceUsd");

  return (
    <Card maxWidth={"640px"} px={4} mx={"auto"}>
      <Heading>Interest Rate and Minimum Balance</Heading>
      <Box>
        <Text mb={3}>Change bank's interest rate and minimum balance</Text>
      </Box>
      <Box>
        <Text>Interest Rate: {interestRate}</Text>
        <Text mb={3}>
          Min Balance: {minBalanceUsd} USD ( ~ {minBalanceEth} ETH)
        </Text>
      </Box>
      {interestRate && <EditInterestRate rate={interestRate} />}
      {minBalanceUsd && <EditMinimumBalance balance={minBalanceUsd} />}
    </Card>
  );
};

export default EditContract;
