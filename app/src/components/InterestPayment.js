import React from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Flex, Box, Text, Button, Card, Pill } from "rimble-ui";

const InterestPayment = () => {
  const { useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    account: drizzleState.accounts[0]
  }));
  const startPayment = useCacheSend("SimpleBank", "startPayments");
  const stopPayment = useCacheSend("SimpleBank", "stopPayments");
  const payingInterest = useCacheCall("SimpleBank", "running");

  // start interest payments
  const startInterest = () => {
    const { send, TXObjects } = startPayment;
    send();
  };

  // stop interest payments
  const stopInterest = () => {
    const { send, TXObjects } = stopPayment;
    send();
  };

  return (
    <Card maxWidth={"640px"} px={4} mx={"auto"}>
      <Text fontWeight={3} my={3}>
        Interest Payments
      </Text>
      <Flex alignItems={"flex-start"} pb={3}>
        <Box>
          <Pill color={payingInterest ? "green" : "danger"}>
            {payingInterest ? "PAYING" : "NOT PAYING"}
          </Pill>
          <Text fontSize={1} color="mid-gray">
            Total Interest Paid: {5} ETH
          </Text>
        </Box>
      </Flex>
      <Flex flexDirection={"row"}>
        <Button
          variant="success"
          size="small"
          onClick={startInterest}
          mr={1}
          disabled={payingInterest}
        >
          START Payments
        </Button>
        <Button.Outline
          variant="danger"
          size="small"
          onClick={stopInterest}
          disabled={!payingInterest}
        >
          STOP Payments
        </Button.Outline>
      </Flex>
    </Card>
  );
};
export default InterestPayment;
