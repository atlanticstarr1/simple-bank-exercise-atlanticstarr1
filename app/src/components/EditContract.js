import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Box, Text, Card, Heading } from "rimble-ui";
import EditInterestRate from "./EditInterestRate";
import EditMinimumBalance from "./EditMinimumBalance";

const EditContract = () => {
  const { useCacheCall } = drizzleReactHooks.useDrizzle();

  const interestRate = useCacheCall("SimpleBank", "interestRate");
  const minBalanceUsd = useCacheCall("SimpleBank", "minBalanceUsd");

  return (
    <Card maxWidth={"450px"} px={4} mx={"auto"}>
      <Heading.h4>Interest Rate and Minimum Balance</Heading.h4>
      <Box>
        <Text mb={4}>Change bank's interest rate and minimum balance</Text>
      </Box>
      <Box />
      {interestRate && <EditInterestRate rate={interestRate} />}
      {minBalanceUsd && <EditMinimumBalance balance={minBalanceUsd} />}
    </Card>
  );
};

export default EditContract;
