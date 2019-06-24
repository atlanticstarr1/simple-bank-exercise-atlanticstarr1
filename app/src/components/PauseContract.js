import React, { useEffect } from "react";
import { Heading, Box, Text, Button, Card, Pill } from "rimble-ui";
import useBankContract from "../utils/useBankContract";
import { showTransactionToast } from "../utils/TransactionToastUtil";

const PauseContract = () => {
  const { isPaused, pauseContract, unpauseContract } = useBankContract();

  const togglePauseContract = () => {
    isPaused ? unpauseContract.send() : pauseContract.send();
  };

  useEffect(() => {
    if (pauseContract.status) {
      showTransactionToast(pauseContract.status);
    }
  }, [pauseContract.TXObjects.length, pauseContract.status]);

  useEffect(() => {
    if (unpauseContract.status) {
      showTransactionToast(unpauseContract.status);
    }
  }, [unpauseContract.TXObjects.length, unpauseContract.status]);

  return (
    <Card width={"450px"} mx={"auto"} px={4}>
      <Heading.h4>Circuit Breaker</Heading.h4>
      <Box>
        <Text mb={3}>Pause enrollment, deposits and interest payments.</Text>
        <Pill mb={3} color={isPaused ? "danger" : "green"}>
          {isPaused ? "PAUSED" : "UNPAUSED"}
        </Pill>
      </Box>

      <Button variant={!isPaused && "danger"} onClick={togglePauseContract}>
        {isPaused ? "Unpause Contract" : "Pause Contract"}
      </Button>
    </Card>
  );
};
export default PauseContract;
