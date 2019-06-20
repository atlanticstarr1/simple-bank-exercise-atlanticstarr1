import React, { useEffect } from "react";
import { drizzleReactHooks } from "drizzle-react";
import { Box, Text, Button, Card, Pill, Heading } from "rimble-ui";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const InterestPayment = () => {
  const { useCacheCall, useCacheSend } = drizzleReactHooks.useDrizzle();
  const start = useCacheSend("SimpleBank", "startPayments");
  const stop = useCacheSend("SimpleBank", "stopPayments");
  const payingInterest = useCacheCall("SimpleBank", "running");

  const toggleInterest = () => {
    payingInterest ? stop.send() : start.send();
  };

  useEffect(() => {
    if (start.status) {
      showTransactionToast(start.status);
    }
  }, [start.TXObjects.length, start.status]);

  useEffect(() => {
    if (stop.status) {
      showTransactionToast(stop.status);
    }
  }, [stop.TXObjects.length, stop.status]);

  return (
    <Card width={"450px"} mx={"auto"} px={4}>
      <Heading>Interest Payments</Heading>
      <Box>
        <Text mb={3}>START or STOP paying interest to customers.</Text>
        <Pill mb={3} color={payingInterest ? "green" : "danger"}>
          {payingInterest ? "PAYING" : "NOT PAYING"}
        </Pill>
      </Box>

      <Button
        variant={payingInterest ? "danger" : "success"}
        onClick={toggleInterest}
        width={1 / 2}
      >
        {payingInterest ? "Stop Payments" : "Start Payments"}
      </Button>
    </Card>
  );
};
export default InterestPayment;
