import React, { useEffect } from "react";
import { Box, Text, Button, Card, Pill, Heading } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const InterestPayment = () => {
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
    <Card width={"450px"} mx={"auto"} px={4}>
      <Heading.h4>Interest Payments</Heading.h4>
      <Box>
        <Text mb={3}>Start or stop paying interest to customers.</Text>
        <Pill mb={3} color={payingInterest ? "green" : "danger"}>
          {payingInterest ? "PAYING" : "NOT PAYING"}
        </Pill>
      </Box>

      <Button
        variant={payingInterest && "danger"}
        onClick={toggleInterest}
        width={1 / 2}
      >
        {payingInterest ? "Stop Payments" : "Start Payments"}
      </Button>
    </Card>
  );
};
export default InterestPayment;
