import React, { useEffect } from "react";
import { Box, Text, Button, Card, Flex, Pill, Heading } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const StartStopInterest = () => {
  const {
    account,
    startInterest,
    stopInterest,
    payingInterest
  } = useBankContract();

  const toggleInterest = () => {
    payingInterest
      ? stopInterest.send({ from: account })
      : startInterest.send({ from: account });
  };

  useEffect(() => {
    if (startInterest.status) {
      showTransactionToast(startInterest.status);
    }
  }, [startInterest.TXObjects.length, startInterest.status]);

  useEffect(() => {
    if (stopInterest.status) {
      showTransactionToast(stopInterest.status);
    }
  }, [stopInterest.TXObjects.length, stopInterest.status]);

  return (
    <Flex flexDirection="column">
      <Box mb={3}>
        <Text fontSize={"14px"} fontWeight={600} mb={3}>
          Interest Payments
        </Text>
        <Pill color={payingInterest ? "green" : "danger"} mb={2}>
          {payingInterest ? "ACTIVE" : "NOT ACTIVE"}
        </Pill>
      </Box>
      <Box>
        <Button
          variant={payingInterest && "danger"}
          onClick={toggleInterest}
          size={"small"}
        >
          {payingInterest ? "Stop Payments" : "Start Payments"}
        </Button>
      </Box>
    </Flex>
  );
};
export default StartStopInterest;
